import express from "express"
import {auth, isInstructor} from "../middlewares/auth.js"
import {updateProfile,deleteAccount,getUserDetails, updateUserProfileImage, instructorDashboard, getEnrolledCourses} from "../controllers/profile.js"

const router = express.Router()


router.put("/update-profile",auth,updateProfile)
router.delete("/delete-profile",auth,deleteAccount)
router.get("/getUserDetails",auth,getUserDetails)

router.put("/updateUserProfileImage" ,auth, updateUserProfileImage)

router.get("/instructorDashboard", auth, isInstructor , instructorDashboard)
router.get("/getEnrolledCourses", auth , getEnrolledCourses)

export default router