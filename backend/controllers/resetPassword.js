import { User } from "../models/UsersModel.js";
import mailSender from "../utils/mailSender.js";
import bcrypt from "bcryptjs";
import crypto from "crypto-js"


const resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Your email is not registered with us"
            })
        }

        const token = crypto.randomBytes(20).toString("hex")

        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { token: token, resetPasswordTokenExpires: Date.now() + 5 * 60 * 1000 },
            { returnDocument: 'after' }
        )

        const url = `http://localhost:5173/update-password/${token}`
        await mailSender(email, "Password reset Link", `Password reset link : ${url}`,)

        res.status(200).json({
            success: true,
            message: "Email send to your mail box, Please check your mail box and change your password"
        })

    } catch (error) {
        console.log("Error occur while changing password : ", error),
            res.status(500).json({
                success: false,
                error: error.message,
                message: "Errro occur while changing password"
            })
    }
}

const resetPassword = async (req, res) => {
    try {
        const token = req.body?.token || req.cookies?.token || req.header("Authorization")?.replace("Bearer", "")


        const { password, confirmPassword } = req.body

        if (!password || !confirmPassword || !token) {
            return res.status(401).json({
                success: false,
                message: "All fields are required...!"
            })
        }

        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Password and confirm password are different"
            })
        }

        const userDetails = await User.findOne({ token: token })

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        if (token != userDetails.token) {
            return res.json(400).json({
                success: false,
                message: "Password reset token is not matched"
            })
        }

        console.log("token : ", token)
        if ((!(userDetails.resetPasswordTokenExpires > Date.now()))) {
            return res.status(401).json({
                success: false,
                message: "Token is expire, please regenrete token"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.findOneAndUpdate(
            { token },
            { password: hashedPassword },
            { new: true }
        )

        res.status(200).json({
            success: true,
            message: "Password reset successfully"
        })

    } catch (error) {
        console.log("Errror occur while reseting passsword : ", error)
        res.status(401).json({
            success: true,
            message: "Errror occur while reseting passsword",
            error: error.message
        })
    }
}

export { resetPassword, resetPasswordToken }