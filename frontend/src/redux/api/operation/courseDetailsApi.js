import { apiConnector } from "../apiConnector"
import { courseDetailsApi, categoriesAPi } from "../api"
import { toast } from "react-toastify"

const {
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    DELETE_COURSE_API,
    EDIT_COURES_API,
    CREATE_COURSE_API,
    GET_COURSE_DETAIL_API,
    GET_ALL_COURSE_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    LECTURE_COMPLETE_API,
    CREATE_RATING_API } = courseDetailsApi
const { SHOW_ALL_CATEGORIES_API } = categoriesAPi

const getAllCouses = async () => {
    const toastId = toast.loading("Loading...")
    let result = []

    try {
        const response = await apiConnector("GET", GET_ALL_COURSE_API)
        if (!response?.data?.success) {
            throw new Error("Could not fetch all course data")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("Get error while fetch all course data : ", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

const getCourseDetails = async (courseId) => {
    let result = null

    try {
        const response = await apiConnector("POST", GET_COURSE_DETAIL_API, { courseId })
        if (!response?.data?.success) {
            throw new Error("Erro occur while fetching get course detials ")
        }
        result = response.data
    } catch (error) {
        console.log("Get error while fetching course details : ", error)
        result = error.response.data
        // toast.error(error.message)
    }
    return result
}

const addCourseDetails = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result = null

    console.log("sdhjkism", data)

    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        if (!response?.data?.success) {
            throw new Error("Error occur white creating course")
        }
        result = response?.data?.data
        toast.success("Course Details Added Successfully")
    } catch (error) {
        console.log("Get error while creating course : ", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

const editCourseDetails = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result = null

    try {
        const response = await apiConnector("POST", EDIT_COURES_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log("Updated course response: ", response)

        if (!response?.data?.success) {
            throw new Error("Error occur while updating course detials")
        }
        result = response?.data?.data
        toast.success("Course details updated successfully")
    } catch (error) {
        console.log("Get error while updating course data : ", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

const fetchInstructorCourses = async (token) => {
    let result = []

    try {
        const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null, { Authorization: `Bearer ${token}` })
        console.log("Response of instructor courses details : ", Response)
        if (!response?.data?.success) {
            throw new Error("could not fetch instructor data")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("Error occur while fetching instructor courses details : ", error)
        toast.error(error.message)
    }
    return result
}

const deleteCourse = async (data, token) => {
    try {
        const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("Response of deleting course : ", response)
        if (!response?.data?.success) {
            throw new Error("Could not delete course")
        }
        toast.success("Delete course successfully")
    } catch (error) {
        console.log("Get error while fetch all course data : ", error)
        toast.error(error.message)
    }
}

const getFullCourseDetails = async (courseId, token) => {
    let result = null
    try {
        const response = await apiConnector("POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED, { courseId }, {
            Authorization: `Bearer ${token}`
        })
        console.log("Response of get full course detials api : ", response)
        if (!response?.data?.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data
    } catch (error) {
        console.log("Get error while fetch full course data : ", error)
        result = response.data.message
        // toast.error(error.message)
    }
    return result
}

const fetchCourseCategories = async () => {
    let result = []

    try {
        const response = await apiConnector("GET", SHOW_ALL_CATEGORIES_API)
        console.log("Show all categories api response : ", response)

        if (!response?.data?.success) {
            throw new Error("Error while fetching course categorie")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("Error while fetching course categorie", error)
        toast.success(error.message)
    }
    return result
}

const createSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")

    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("Create Section Response : ", response)
        if (!response?.data?.success) {
            throw new Error("Section not created")
        }

        result = response?.data?.updatedCourseDetails
        toast.success("Section created successfully")
    } catch (error) {
        console.log("Create section erro : ", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

const createSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")

    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("Create SubSection Response : ", response)
        if (!response?.data?.success) {
            throw new Error("Could Not add Lecture")
        }

        result = response?.data?.data
        toast.success("Lecture added successfully")
    } catch (error) {
        console.log("Create SubSection error : ", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

const updateSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")

    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("Update Section Response : ", response)
        if (!response?.data?.success) {
            throw new Error("Section not updated")
        }

        result = response?.data?.data
        toast.success("Section updated successfully")
    } catch (error) {
        console.log("Update section error : ", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

const updateSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")

    try {
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("Update SubSection Response : ", response)
        if (!response?.data?.success) {
            throw new Error("Could not update lecture")
        }

        result = response?.data?.data
        toast.success("Lecture updated successfully")
    } catch (error) {
        console.log("Update Subsection error : ", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

const deleteSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")

    try {
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("Delete Section Response : ", response)
        if (!response?.data?.success) {
            throw new Error("Section could not Deleted")
        }

        result = response?.data?.data
        toast.success("Section Deleted successfully")
    } catch (error) {
        console.log("Delete section error : ", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

const deleteSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")

    try {
        const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("Delete SubSection Response : ", response)
        if (!response?.data?.success) {
            throw new Error("SubSection could not deleted")
        }

        result = response?.data?.data
        toast.success("SubSection Deleted successfully")
    } catch (error) {
        console.log("Delete subSection error : ", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

const markLectureComplete = async (data, token) => {
    let result = false
    const toastId = toast.loading("Loading...")

    try {
        const response = await apiConnector("POST", LECTURE_COMPLETE_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("Mark Lecture complete api : ", response)
        if (!response?.data?.success) {
            throw new Error(response.data.error)
        }

        result = true
        toast.success("Rating Created successfully")
    } catch (error) {
        console.log("Ratung created api error : ", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

const createRating = async (data, token) => {
    let result = false
    const toastId = toast.loading("Loading...")

    try {
        const response = await apiConnector("POST", CREATE_RATING_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("Create Rating api : ", response)
        if (!response?.data?.success) {
            throw new Error("Could not Create rating")
        }

        result = true
        toast.success("Section created successfully")
    } catch (error) {
        console.log("Create section erro : ", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export { fetchInstructorCourses, getAllCouses, getCourseDetails, addCourseDetails, deleteCourse, getFullCourseDetails, editCourseDetails, fetchCourseCategories, createSection, createSubSection, updateSection, updateSubSection, deleteSection, deleteSubSection, markLectureComplete, createRating }