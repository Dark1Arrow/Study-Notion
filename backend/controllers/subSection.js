import { Course } from "../models/Course.js"
import { Section } from "../models/Section.js"
import { SubSection } from "../models/SubSection.js"
import { uploadImageToCloudinary } from "../utils/imageUploader.js"


const createSubSection = async (req, res) => {
    try {
        const { title, description, sectionId } = req.body

        console.log("videoFile : ")
        const videoFile = req.files?.video
        console.log(videoFile)

        if (!title || !description || !sectionId || !videoFile) {
            return res.status(400).json({
                success: false,
                message: "All filds are required"
            })
        }

        const videoFileDetails = await uploadImageToCloudinary(videoFile, process.env.FOLDER_NAME)

        const subSectionDetails = await SubSection.create({ title, timeDuration: videoFileDetails.duration, description, videoUrl: videoFileDetails.secure_url })

        const sectionDetails = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { subSection: subSectionDetails._id } },
            { new: true }
        ).populate("subSection")

        res.status(200).json({
            success: true,
            sectionDetails,
            message: "Subsection successfully created"
        })

    } catch (error) {
        console.log("Error occur while creating Subsection : ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error occur while creating Subsection"
        })
    }
}

const updateSubSection = async (req, res) => {
    try {
        const { title, description, subSectionId, sectionId } = req.body

        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: "Subsection Id is required to update subsetion"
            })
        }

        const subSection = await SubSection.findById(subSectionId)
        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "Subsection not found"
            })
        }

        if (title) {
            subSection.title = title
        }
        if (description) {
            subSection.description = description
        }

        if (req.files && req.files.videoFile !== undefined) {
            const videoFile = req.files.videoFile
            const uploadVideo = await uploadImageToCloudinary(videoFile, process.env.FOLDER_NAME)
            subSection.videoUrl = uploadVideo.secure_url
            subSection.timeDuration = uploadVideo.duration
        }

        await subSection.save()

        const updatedSubsection = await Section.findById(sectionId).populate("subSection")

        res.status(200).json({
            success: true,
            data: updateSubSection,
            message: "Subsection updated successfully"
        })
    } catch (error) {
        console.log("Error occur while updating Subsection : ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error occur while updating Subsection"
        })
    }
}

const deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    subSection: subSectionId
                }
            }
        )

        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

        if (!subSection) {
            return res.status(404).json({
                success: true,
                message: "SubSection not found"
            })
        }

        const updateSection = await Section.findById(sectionId).populate("subSection")

        res.status(200).json({
            success: true,
            data: updateSection,
            message: "SubSection deleted successfully"
        })
    } catch (error) {
        console.log("Error occur while deleting Subsection : ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error occur while deleting Subsection"
        })
    }
}

export { createSubSection, updateSubSection, deleteSubSection }