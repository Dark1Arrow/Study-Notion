import express from "express"
const router = express.Router()

// Controllers 
import { sendOTP, changePassword, login, register } from "../controllers/auth.js"

// ResetPassword Controller
import { resetPassword, resetPasswordToken } from "../controllers/resetPassword.js"

// Middleware
import { auth } from "../middlewares/auth.js"

// Authentication Routes

router.post("/signup", register)
router.post("/login" , login)
router.post("/send-otp", sendOTP)
router.post("/change-password", auth, changePassword) 

// Reset Password

router.post("/reset-password-token",resetPasswordToken)
router.post("/reset-password",resetPassword)

export default router