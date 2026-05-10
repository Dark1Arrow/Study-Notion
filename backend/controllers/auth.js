import {User} from "../models/UsersModel.js";
import {Profile} from "../models/Profile.js";
import {OTP} from "../models/OTP.js";
import otpGenreator from "otp-generator"
import mailSender from "../utils/mailSender.js";
import otpTemplate from "../mail/template/emailVerificationTemplate.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passwordUpdate from "../mail/template/passwordUpdate.js";

const sendOTP = async (req, res) => {
    try {
        const { email } = req.body
        const checkUserPresent = await User.findOne({ email })

        if (checkUserPresent) {
            console.log("( when otp genrated) User alrady registered")
            return res.status(401).json({ success: false, message: "User is Already exist" })
        }

        const otp = otpGenreator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })
        console.log("your otp is : ", otp)

        const name = email.split('@')[0].split('.').map(part => part.replace(/\d+/g, '')).join(' ');
        console.log(name)

        await mailSender(email, "OTP verification email", otpTemplate(otp, name))

        const otpBody = OTP.create({ email, otp })

        res.status(201).json({ success: true, otpBody, message: "otp send successfully" })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            error: error.message,
            message: "Error while genrating otp"
        })
    }
}

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp } = req.body
        
        if (!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !otp) {
            return res.status(401).json({
                message: "All filds are requuired...",
                success: false
            })
        }

        if (password != confirmPassword) {
            return res.status(400).json({
                message: "Password and confirmed password are not match ...",
                success: false
            })
        }

        const checkUserAlreadyExist = await User.findOne({ email })

        if (checkUserAlreadyExist) {
            return res.status(400).json({
                message: "User already registered...",
                success: false
            })
        }

        const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1)

        if (!recentOtp || recentOtp.otp.length == 0) {
            return res.status(401).json({
                message: "OTP not found in data base ...",
                success: false
            })
        } else if (recentOtp.otp !== otp) {
            return res.status(401).json({
                message: "Invalid OTP...",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const profileDetails = await Profile.create({
            gender: null, contactNumber: contactNumber, about: null, dateOfBirth: null
        })

        // let approved = "";
        // approved === "Instructor" ? (approved = false) : (approved = true);

        const userData = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            contactNumber: contactNumber,
            accountType: accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        res.status(200).json({
            message: "User successfully Registor",
            success: true
        })
    } catch (error) {
        console.log("Error occur while resgistraion : ", error)
        res.status(400).json({
            message: "Error occur while resgistraion",
            error: error.message,
            success: false
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "All filds are required ...",
                success: false
            })
        }

        let user = await User.findOne({ email }).populate('additionalDetails')

        if (!user) {
            return res.status(400).json({
                message: "You are not registered with us...",
                success: false
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (isPasswordCorrect) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h"
            })
            
            user = user.toObject()
            user.token = token
            user.password = undefined
            
            const cookiesOptions = {
                expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            res.cookie('token', token, cookiesOptions).status(200).json({
                message: "User login Successfully",
                success: true,
                token,
                user
            })
        } else {
            return res.status(400).json({
                message: "Password not matched...",
                success: false
            })
        }

    } catch (error) {
        console.log("Error occure while login")
        res.status(400).json({
            message: "Error occure while Login",
            error: error.message,
            success: false
        })
    }
}

const changePassword = async (req,res) => {
    try {
        const { oldPassword , newPassword, confirmPassword} = req.body
        if(!oldPassword || !newPassword || !confirmPassword){
            return res.status(403).json({
                success: false,
                message: "All fileds are required"
            })
        }
        
        const userDetails = await User.findById(req.user.id)
        
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        )
        
        if(!isPasswordMatch){
            return res.status(401).json({
                success:false,
                message: "Old Password is incorrect"
            })
        }
        
        if(newPassword !== confirmPassword){
            return res.status(403).json({
                success:false,
                message: "Password and confirm password not match"
            })
        }
        console.log("hey")

        const hasedPassword = await bcrypt.hash(newPassword,10)

        const updatedUserDetails = await User.findByIdAndUpdate(req.user.id,
            {password: hasedPassword},
            {new: true})
        
        try {
            const emailResponse = await mailSender(updatedUserDetails.email,"User password updated successfully",passwordUpdate(
                updatedUserDetails.email,`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
            ))
        } catch (error) {
            console.log("Error occur while sending email : " , error)
            return res.status(500).json({
                success:false,
                message: "Error occur while sending email",
                error: error.message
            })
        }

        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })
    } catch (error) {
        console.log("Error occur whlie changing password : ", error)
        res.status(400).json({
            message: "Error occur while changing password",
            error: error.message,
            success: false
        })
    }
}

export {sendOTP, register, login , changePassword}