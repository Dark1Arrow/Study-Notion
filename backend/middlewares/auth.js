import jwt from "jsonwebtoken";
import 'dotenv/config'

const auth = async (req, res, next) => {
    try {
        const token =
            req.body?.token ||
            req.cookies?.token ||
            req.header("Authorization")?.replace("Bearer", '').trim()
        console.log("hey token : ",token)
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is Missing"
            })
        }
        // console.log(token)
        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET)
            req.user = decode
        } catch (error) {
            console.log("Error while decoding token : ", error)
            return res.status(401).json({
                success: false,
                message: "Error while decoding token",
                error: error.message
            })
        }
        next()
    } catch (error) {
        console.log("Error while Token validation : ", error)
        return res.status(401).json({
            success: false,
            message: "Error while Token validation",
            error: error.message
        })
    }
}

const isInstructor = async (req, res, next) => {
    try {
        if (req.user?.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This page is protected only for instructor"
            })
        }
        next()
    } catch (error) {
        console.log("Error while chicking user account type is instructor")
        console.log(error)
        return res.status(500).json({
            success: true,
            error: error.message,
            message: "Error while chicking user account type is instructor"
        })
    }
}

const isAdmin = async (req, res, next) => {
    try {
        if (req.user?.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This page is protected only for Admin"
            })
        }
        next()
    } catch (error) {
        console.log("Error while chicking user account type is Admin")
        console.log(error)
        return res.status(500).json({
            success: true,
            error: error.message,
            message: "Error while chicking user account type is Admin"
        })
    }
}


const isStudent = async (req, res, next) => {
    try {
        if (req.user?.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This page is protected only for Student"
            })
        }
        next()
    } catch (error) {
        console.log("Error while chicking user account type is Student")
        console.log(error)
        return res.status(500).json({
            success: true,
            error: error.message,
            message: "Error while chicking user account type is Student"
        })
    }
}

export { auth, isInstructor,isAdmin,isStudent }