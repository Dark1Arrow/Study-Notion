import { toast } from "react-toastify"
import { setUserLoading } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../api"

const { GET_USER_DETAILS_APi, GET_USER_ENROLLED_COURSE_API, GET_INSTRUCOTOR_DATA_API } = profileEndpoints

const getUserDetails = (token, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setUserLoading(true))

        try {
            const response = await apiConnector("GET", GET_USER_DETAILS_APi, null, { Authorization: `Bearer ${token}` })
            console.log("Get user profile details api", response)

            if (!response.data?.success) {
                throw new Error(response.data.message)
            }
            const userImage = response.data.data.image
                ? response.data.data.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
            dispatch(setUser({ ...response.data.data, image: userImage }))
        } catch (error) {
            dispatch(logout(navigate))
            console.log("Get user details api error : ", error)
            toast.error("Could not get user details")
        }
        toast.dismiss(toastId)
        dispatch(setUserLoading(false))
    }
}

const getUserEnrolledCourses = async (token) => {
    let result = []
    try {
        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSE_API, null, { Authorization: `Bearer ${token}` })

        console.log("Get user enrolled course api : ", response)
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data.data
    } catch (error) {
        console.log("Get user enrolled course api : ", error)
        toast.error("Could not get enrolled courses")
    }
    return result
}

const getInstructorData = async (token) => {
    let result = []
    try {
        const response = await apiConnector("Get", GET_INSTRUCOTOR_DATA_API, null, {
            Authorization: `Bearer ${token}`
        })
        console.log("Get instructor data api response : ", response)
        result = response?.data?.courses
    } catch (error) {
        console.log("Get instructor data api Error.. ", error)
        toast.Error("Could not get instructor data")
    }
    return result
}

export { getInstructorData, getUserDetails, getUserEnrolledCourses }

