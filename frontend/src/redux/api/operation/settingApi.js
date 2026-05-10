import { toast } from "react-toastify"
import { apiConnector } from "../apiConnector"
import { settingsEndpoints } from "../api"
import { setUser } from "../../slices/profileSlice"

const {
    UPDATE_DISPLAY_PICTURE_API,
    DELETE_PROFILE_API,
    UPDATE_PROFILE_API,
    CANGE_PASSWORD_API
} = settingsEndpoints

const updateUserProfileImage = (token, formData) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            // console.log(formData) 
            const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            })
            // console.log("Update profile picture .... ", response)
            // console.log(response.data.data)
            if (!response.data.success) {
                throw new Error(response.error.message)
            }
            toast.success("Profile image update successfully")
            dispatch(setUser(response.data.data))

            localStorage.setItem("user", JSON.stringify(response.data.data))
        } catch (error) {
            console.log("Update profile image error ... ", error)
            toast.error("Error occur while updating profile picture")
        }
        toast.dismiss(toastId)
    }
}

const updateProfile = (token, formData) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
                Authorization: `Bearer ${token}`
            })
            console.log("Update profile details api ... ", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            const userImage = response.data?.updatedUserDetails?.image
                ? response.data.updatedUserDetails.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`

            dispatch(setUser({ ...response.data.updatedUserDetails, image: userImage }))

            localStorage.setItem("user", JSON.stringify({ ...response.data.updatedUserDetails, image: userImage }))
            toast.success("Profile details updated successfully")
        } catch (error) {
            console.log("Update profile details error ... ", error)
            toast.error("Error occur while updating profile details")
        }
        toast.dismiss(toastId)
    }
}

const changePassword = (token, formData) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")

        try {
            const response = await apiConnector("POST", CANGE_PASSWORD_API, formData, {
                Authorization: `Bearer ${token}`
            })
            console.log("Change password api response : ", response)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Password changed successfully")
        } catch (error) {
            console.log("Update profile details error ... ", error)
            toast.error("Error occur while updating profile details")
        }
        toast.dismiss(toastId)
    }
}

const deleteProfile = (token, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
                Authorization: `Bearer ${token}`
            })
            console.log("Delete profile response : ", response)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Delete profile successfully")
            dispatch(logout(navigate))
        } catch (error) {
            console.log("Update profile details error ... ", error)
            toast.error("Error occur while updating profile details")
        }
        toast.dismiss(toastId)
    }
}

export { updateProfile, updateUserProfileImage, changePassword, deleteProfile }