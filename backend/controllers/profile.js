import { User } from "../models/UsersModel.js"
import { Profile } from "../models/Profile.js"
import { Course } from "../models/Course.js"
import { CourseProgress } from "../models/CourseProgress.js"
import { uploadImageToCloudinary, deleteResourceFromCloudinary } from "../utils/imageUploader.js"
import { convertSecondsToDuration } from "../utils/secToDuration.js"
import { populate } from "dotenv"

const updateProfile = async (req, res) => {
    try {
        const { gender = "", dateOfBirth = "", about = "", contactNumber = "", firstName, lastName } = req.body

        const userId = req.user.id

        const userDetails = await User.findById(userId)
        const profileId = userDetails.additionalDetails
        const profileDetails = await Profile.findById(profileId)

        userDetails.firstName = firstName
        userDetails.lastName = lastName
        await userDetails.save()

        profileDetails.gender = gender
        profileDetails.dateOfBirth = dateOfBirth
        profileDetails.about = about
        profileDetails.contactNumber = contactNumber
        await profileDetails.save()

        const updatedUserDetails = await User.findById(userId)
            .populate({
                path: "additionalDetails"
            })

        res.status(200).json({
            success: true,
            updatedUserDetails,
            message: "User data updated successfully"
        })
    } catch (error) {
        console.log("Error occur while updating user : ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while updating profile"
        })
    }
}

const deleteAccount = async (res, req) => {
    try {
        const userId = req.user.id

        const userDetails = await User.findById(userId)
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        await deleteResourceFromCloudinary(userDetails.image)

        const userEnrolledCoursesId = userDetails.courses

        for (const courseId of userEnrolledCoursesId) {
            await Course.findByIdAndUpdate(courseId, {
                $pull: {
                    studentsEnrolled: userId
                }
            })
        }

        await Profile.findByIdAndDelete(userDetails.additionalDetails)
        await User.findByIdAndDelete(userId)

        res.status(200).json({
            success: true,
            message: "Account delete successfully"
        })

    } catch (error) {
        console.log("Error occur while deleting profile : ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while deleting profile"
        })
    }
}

const getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id

        const userDetails = await User.findById(userId).populate("additionalDetails").exec()

        res.status(200).json({
            success: true,
            data: userDetails,
            message: "User data fetched successfully"
        })
    } catch (error) {
        console.log("Error occur while fetching user details : ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while fetching user details"
        })
    }
}

const updateUserProfileImage = async (req, res) => {
    try {
        const profileImage = req.files?.profileImage
        const userId = req.user.id
        const image = await uploadImageToCloudinary(profileImage, process.env.FOLDER_NAME, 1000, 1000)
        // console.log("image",image)
        const updatedUserDetails = await User.findByIdAndUpdate(userId,
            { image: image.secure_url },
            { new: true },
        ).populate({
            path: "additionalDetails"
        })

        res.status(200).json({
            success: true,
            message: "Image successfully updated",
            data: updatedUserDetails
        })

    } catch (error) {
        console.log("Error while uploading image : ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while uploading image"
        })
    }
}

const instructorDashboard = async (req, res) => {
    try {
        const courseDetails = await Course.find({ instructor: req.user.id })

        const courseData = courseDetails.map((course) => {
            const totalStudentEnrolled = course.studentsEnrolled.length
            const totalAmountGenerated = totalStudentEnrolled * course.price

            const courseDataWithState = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentEnrolled,
                totalAmountGenerated
            }
            return courseDataWithState
        })

        res.status(200).json({
            success: true,
            courses: courseData,
            message: "Instructor Dashboard Data Fetched Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }
}

const getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id
        console.log(userId)
        let userDetails = await User.findById(userId )
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    },
                },
            })

        userDetails = userDetails.toObject()
console.log("HEY kj")
        var SubSectionLength = 0
        for (var i = 0; i < userDetails.length; i++) {
            let totalDurationSeconds = 0
            SubSectionLength = 0
            for (var j = 0; j < userDetails.course[i].courseContent.length; j++) {
                totalDurationSeconds += userDetails.courses[i].courseContent[
                    j
                ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)

                userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationSeconds)
                SubSectionLength += userDetails.courses[i].courseContent[j].subSection.length
            }

            let courseProgressCount = await CourseProgress.findOne({
                courseId: userDetails.courses[i]._id,
                userId: userId
            })

            courseProgressCount = courseProgressCount?.completedVideos.length

            if (SubSectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100
            } else {
                // To make it up to 2 decimal point
                const multiplier = Math.pow(10, 2)
                userDetails.courses[i].progressPercentage =
                    Math.round((courseProgressCount / SubSectionLength) * 100 * multiplier) / multiplier
            }
        }

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }

        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export { updateProfile, deleteAccount, getUserDetails, updateUserProfileImage, instructorDashboard , getEnrolledCourses }