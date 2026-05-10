import { Course } from "../models/Course.js"
import { Category } from "../models/Category.js"
import { deleteResourceFromCloudinary, uploadImageToCloudinary } from "../utils/imageUploader.js"
import { convertSecondsToDuration } from "../utils/secToDuration.js"
import { CourseProgress } from "../models/CourseProgress.js"
import { User } from "../models/UsersModel.js"
import { Section } from "../models/Section.js"
import { SubSection } from "../models/SubSection.js"


const createCourse = async (req, res) => {
    try {

        const { courseName, courseDescription, whatYouWillLearn, price, category, instructions: _intstruction, status, tag: _tag } = req.body

        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_intstruction)

        const thumbnail = req.files?.thumbnailImage

        console.log(courseName, courseDescription, whatYouWillLearn, price, category, thumbnail, instructions.length, tag.length)

        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail || !instructions.length || !tag.length) {
            res.status(400).json({
                success: false,
                message: "All fileds are required"
            })
        }

        if (!status || status === undefined) {
            status = "Draft"
        }

        const instructorId = req.user.id
        const categoryDetails = await Category.findById(category)
        console.log("hey")

        if (!categoryDetails) {
            return res.staus(401).json({
                success: false,
                message: "Category Details not found"
            })
        }

        const thumbnailDetails = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)

        const newCourse = await Course.create({
            courseName, courseDescription, instructor: instructorId, whatYouWillLearn, price, category: categoryDetails, tag, status, instructions, thumbnail: thumbnailDetails.secure_url, createdAt: Date.now()
        })

        await User.findByIdAndUpdate(
            instructorId,
            {
                $push: {
                    courses: newCourse._id
                }
            },
            { new: true }
        )

        await Category.findByIdAndUpdate(
            { _id: category },
            {
                $push: {
                    courses: newCourse._id
                }
            },
            { new: true }
        )

        res.status(200).json({
            success: true,
            data: newCourse,
            message: "New course created successfully"
        })

    } catch (error) {
        console.error("Error occur while creating course : ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error occur while creating course"
        })
    }
}

const getAllCourse = async (req, res) => {
    try {
        const allCourse = await Course.find({},
            {
                courseName: true, courseDescription: true, prize: true, thumbnail: true, instructor: true,
                ratingAndReview: true, studentsEnrolled: true
            }
        ).populate({
            path: "instructor",
            select: "fistName lastName email image"
        }).exec()

        return res.status(200).json({
            success: true,
            data: allCourse,
            message: "Data for all courses fetched successfully"
        })
    } catch (error) {
        console.log("Error occur while fetching all courses data: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error occur while fetching all courses data"
        })
    }
}

const getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body

        const courseDetails = await Course.findById({ _id: courseId })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails"
                }
            })
            .populate("category")
            // .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                    select: "-videoUrl"
                }
            })

        if (!courseDetails) {
            res.status(400).json({
                success: false,
                message: `could not found course by id ${courseId}`
            })
        }

        let totalDurationInSecond = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                let timeDurationInSecond = parseInt(subSection.timeDuration)
                totalDurationInSecond += timeDurationInSecond
            })
        })

        const toatalDuration = convertSecondsToDuration(totalDurationInSecond)

        res.status(200).json({
            success: true,
            data: {
                courseDetails,
                toatalDuration
            },
            message: "Course details fetched successfully"
        })

    } catch (error) {
        console.log("Error occur while fetching course details : ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error occur while fetching course details "
        })
    }
}

const getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body
        const userId = req.user.id

        const courseDetails = await Course.findById({ _id: courseId })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails"
                }
            })
            .populate("category")
            // .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            }).exec()

        let courseProgressCount = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId
        })

        if (!courseDetails) {
            res.staus(400).json({
                success: false,
                message: `Could not found full course details ${courseId}`
            })
        }

        let totalDurationInSeconds = 0

        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSecond = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSecond
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos ? courseProgressCount.completedVideos : [],
            }
        })
    } catch (error) {
        console.log("Error occur while fetching course details : ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error occur while fetching course details "
        })
    }
}

const editCourse = async (req, res) => {
    try {
        console.log(req.body)
        const { courseId } = req.body
        const update = req.body

        console.log("update: ", update.status)

        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({ error: "course not found" })
        }

        if (req.files) {
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)
            course.thumbnail = thumbnailImage.secure_url
        }

        for (const key in update) {
            if (Object.hasOwnProperty(key)) {
                if (key === "tag" || key === "instruction") {
                    course[key] = JSON.parse(update[key])
                } else {
                    course[key] = update[key]
                }
            }
        }

        if (update.status) {
            course.status = update.status
        }

        course.updatedAt = Date.now()
        await course.save()

        if (update.status ) {
            const currentStatus = course.status;
            const currentCategoryId = course.category.toString();

            // 1. If status changed to Draft, remove from current category
            if (currentStatus === "draft") {
                await Category.findByIdAndUpdate(currentCategoryId, {
                    $pull: { courses: courseId },
                });
            }
            
            // 2. If status changed to Published, add to current category
            if (currentStatus === "published") {
                console.log(currentStatus,currentCategoryId)
                const updatedCategory = await Category.findByIdAndUpdate(currentCategoryId, {
                    $addToSet: { courses: courseId } // $addToSet prevents duplicates
                },{new:true});
                console.log("hey Bro",updatedCategory)
            }

            // 3. Handle edge case: If category was changed while Published
            // if (oldCategoryId.toString() !== currentCategoryId.toString() && currentStatus === "Published") {
            //     // Remove from old category
            //     await Category.findByIdAndUpdate(oldCategoryId, {
            //         $pull: { courses: courseId },
            //     });
            // }
        }

        const updatedCourse = await Course.findById({ _id: courseId })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails"
                }
            })
            .populate("category")
            // .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            }).exec()

        return res.status(200).json({
            success: true,
            data: updatedCourse,
            message: "course updated successfully"
        })

    } catch (error) {
        console.log("Error occur while edit course details : ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error occur while edit course details "
        })
    }
}

const getInstructorCourse = async (req, res) => {
    try {
        const instructorId = req.user.id

        const instructorCourse = await Course.find({ instructor: instructorId }).sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            message: "courses made by instructor fetch successfully",
            data: instructorCourse
        })
    } catch (error) {
        console.log("Error occur while fetching instructor courses : ", error)
        res.status(500).json({
            success: false,
            message: "Failed to retrive instructor data",
            error: error.message
        })
    }
}

const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body

        const course = await Course.find(courseId)

        if (!course) {
            return res.status(200).json({ message: "course Not found" })
        }

        const stundentsEnrolled = course.studentsEnrolled
        for (const studentId of stundentsEnrolled) {
            await User.findById(studentId, {
                $pull: { courses: courseId },
            })
        }

        await deleteResourceFromCloudinary(course?.thumbnail)

        const courseSections = course.courseContent
        for (const sectionId of courseSections) {
            const section = await Section.findById(sectionId)
            if (section) {
                const subSections = section.subSection
                for (const subSectionId of subSections) {
                    const subSection = await SubSection.findById(subSectionId)
                    if (subSection) {
                        await deleteResourceFromCloudinary(subSection.videoUrl)
                    }
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }
            await Section.findByIdAndDelete(sectionId)
        }

        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        })
    } catch (error) {
        console.log("Error occur while deleting course details : ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error occur while deleting course details "
        })
    }
}

export { getInstructorCourse, createCourse, getAllCourse, getCourseDetails, getFullCourseDetails, deleteCourse, editCourse }