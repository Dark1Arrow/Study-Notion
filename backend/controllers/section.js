import { Course } from "../models/Course.js"
import { Section } from "../models/Section.js"

const createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All Filds are required"
            })
        }

        const newSection = await Section.create({ sectionName })

        const updateCourse = await Course.findByIdAndUpdate(courseId, {
            $push: {
                courseContent: newSection._id
            }
        }, { new: true })

        const updatedCourseDetails = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            })

        res.status(200).json({
            success: true,
            updatedCourseDetails,
            message: "Section created successfully"
        })
    } catch (error) {
        console.log("Error occur while creating section : ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error occur while creating section"
        })
    }
}

const updateSection = async (req, res) => {
    try {
        const { sectionName, courseId, sectionId } = req.body

        if (!sectionId) {
            return res.status(400).json({
                success: false,
                message: "All Fields are required"
            })
        }

        await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true })

        const updatedCourseDetails = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            })

        res.status(200).json({
            success: true,
            updateSection,
            message: "Section Updated Successfully"
        })
    } catch (error) {
        console.log("Error occur while updating section : ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error occur while updating section"
        })
    }
}

const deleteSection = async (req, res) => {
    try {
        const { courseId, sectionId } = req.body

        await Section.findByIdAndDelete(sectionId)

        const updatedCourseDetails = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            })
        res.status(200).json({
            success: true,
            updatedCourseDetails,
            message: "Section Deleted successfully"
        })
    } catch (error) {
        console.log("Error occur while deleting section : ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error occur while deleting section"
        })
    }
}

export { createSection, updateSection, deleteSection }