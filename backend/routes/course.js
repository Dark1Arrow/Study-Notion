import express from "express"

const router = express.Router()

import { auth, isInstructor, isAdmin, isStudent } from "../middlewares/auth.js"
import { getInstructorCourse, createCourse, getAllCourse, getCourseDetails, getFullCourseDetails, deleteCourse, editCourse } from "../controllers/course.js"
import { createCategory, showAllCategory, getCategoryPageDetails } from "../controllers/category.js"
import { createSection, updateSection, deleteSection } from "../controllers/section.js"
import { createSubSection, updateSubSection, deleteSubSection } from "../controllers/subSection.js"
import { createRating, getAllRatingReview, getAverageRating } from "../controllers/ratingAndReview.js"
import { updatedCourseProgress } from "../controllers/courseProgress.js"

// course can be created by instructor

// Create Course 
router.post("/createCourse", auth, isInstructor, createCourse)
// Get Instructor Course
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourse)
// Edit Course details
router.post("/editCourse", auth, isInstructor, editCourse)
// Delete course Details
router.delete("/deleteCourse", auth, isInstructor, deleteCourse)

// Get Course Details
router.post("/getCourseDetails", getCourseDetails)
// Get all courses
router.get("/getAllCourses", getAllCourse)
// Get full course details
router.post("/getFullCourseDetails", auth, getFullCourseDetails)

// Create Category
router.post("/createCategory", auth, isAdmin, createCategory)
// Show all Categories
router.get("/showAllCategories", showAllCategory)
// Get category page details
router.post("/getCategoryPageDetails", getCategoryPageDetails)

// Create Section 
router.post("/addSection",auth,isInstructor,createSection)
// Update Section
router.post("/updateSection",auth,isInstructor,updateSection)
// Delete Section
router.post("/deleteSection",auth,isInstructor,deleteSection)

// Create SubSection
router.post("/addSubSection",auth,isInstructor,createSubSection)
// Update Section
router.post("/updateSubSection",auth,isInstructor,updateSubSection)
// Delete Section
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection)

// Create Rating
router.post("/createRating",auth,isStudent,createRating)
// Get Avrage Rating
router.get("./getAverageRating",getAverageRating)
// Get All Rating
router.get("./getAverageRating",getAverageRating)

// Updated course progress
router.post("/updateCourseProgress",auth,isStudent,updatedCourseProgress)

export default router