import { Category } from "../models/Category.js"

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
}

const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body

        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const categoriesDetails = await Category.create({
            name: name, description: description
        })

        res.status(200).json({
            success: true,
            message: "Category created successfully"
        })
    } catch (error) {
        console.log("Error occus while creating Category : ", error)
        res.status(500).json({
            success: false,
            message: "Error occus while creating Category",
            error: error.message
        })
    }
}

const showAllCategory = async (req, res) => {
    try {
        const allCategory = await Category.find({}, { name: true, description: true })

        res.status(200).json({
            success: true,
            data: allCategory,
            message: "All Category fetched successfully"
        })
    } catch (error) {
        console.log("Error occus while fetching Category : ", error)
        res.status(500).json({
            success: false,
            message: "Error occus while fetching Category",
        })
    }
}

const getCategoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body
        const selectdCategory = await Category.findById(categoryId)
        .populate({
            path: "courses",
            match: { status: "published" },
            // populate: "ratingAndReviews"
        }).exec()
        
        if (!selectdCategory) {
            return res.status(404).json({ success: false, message: "Category not found" })
        }
    
        if (selectdCategory.courses.length === 0) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "No courses found for the selected category"
            })
        }
        
        const categoriesExpectSelected = await Category.find({
            _id: { $ne: categoryId },
        })

        let diffrentCategory = await Category.findOne(
            categoriesExpectSelected[getRandomInt(categoriesExpectSelected.length)]
                ._id
        )
            .populate({
                path: "courses",
                match: { status: "Published" },
            })
            .exec()

        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor"
                },
            })
            .exec()

        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)

        res.status(200).json({
            success: true,
            data: {
                selectdCategory,
                diffrentCategory,
                mostSellingCourses
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Internal Server Error"
        })
    }
}

export { createCategory, showAllCategory, getCategoryPageDetails }