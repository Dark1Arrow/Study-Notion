import mongoose from "mongoose"
import { Course } from "../models/Course.js"
import { RatingAndReview } from "../models/RatingAndReview.js"



const createRating = async (req, res) => {
    try {
        const { rating, review, courseId } = req.body

        const userId = req.user.id

        if (!rating || !review || !courseId) {
            return res.status(401).josn({
                success: true,
                message: "All filds are required"
            })
        }

        const courseDetails = await Course.findOne(
            { _id: courseId },
            {
                studentsEnrolled: { $elemMatch: { $eq: userId } }
            }
        )

        if (!courseDetails) {
            return res.status(404).json({
                success: true,
                message: "Student not enrolled in the course"
            })
        }

        const alreadyReviwed = await RatingAndReview.findOne(
            { course: courseId }, { user: userId }
        )

        if (alreadyReviwed) {
            return res.status(404).json({
                success: true,
                message: "Course is already reviwed by the user"
            })
        }

        const ratingReview = await RatingAndReview.create({
            user: userId, course: courseId, rating, review
        })

        const updateCourseDetails = await Course.findByIdAndUpdate({ _id: courseId },
            {
                $push: {
                    ratingAndReview: ratingReview._id
                }
            }, { new: true }
        )

        res.status(200).json({
            success: true,
            data: ratingReview,
            message: "Rating And Review created successfully"
        })
    } catch (error) {
        console.log("Error occur while createing Rating And Review : ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error occur while createing Rating And Review"
        })
    }
}

const getAverageRating = async (req, res) => {
    try {
        const courseId = req.body.courseId

        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                }
            }
        ])

        if (result.length > 0) {
            return res.status(200).status({
                success: true,
                ratingReview: result[0].averageRating
            })
        }

        return res.status(200).json({
            success:true,
            message : "Avrage rating is 0, no rating given till now",
            averageRating: 0
        })
    } catch (error) {
        console.log("Error occur while get Average Rating: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error occur while get Average Rating"
        })
    }
}

const getAllRatingReview = async (req,res) => {
    try {
        const allReviews = await RatingAndReview.find({})
        .sort({rating:"desc"})
        .populate({
            path: "user",
            select: "firstName lastName email image"
        })
        .populate({
            path: "course",
            select: "courseName"
        })
        .exec()

        return res.status(200).json({
            success: true,
            data: allReviews,
            message: "All Reviews fetched successfully"
        }) 

    } catch (error) {
        console.log("Error occur while fetching All Rating And Review : ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error occur while fetching All Rating And Review"
        })
    }
}

export {createRating, getAllRatingReview, getAverageRating}