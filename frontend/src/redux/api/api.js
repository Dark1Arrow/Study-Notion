import { COURSE_URL, PROFILE_URL, USER_URL,PAYMENT_URL } from "../constant";

export const userEndpoints = {
    SENDOTP_API: `${USER_URL}/send-otp`,
    SIGNUP_API: `${USER_URL}/signup`,
    LOGIN_API: `${USER_URL}/login`,
    RESETPASSTOKEN_API: `${USER_URL}/reset-password-token`,
    RESETPASSWORD_API: `${USER_URL}/reset-password`
}

export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: `${PROFILE_URL}/updateUserProfileImage`,
    UPDATE_PROFILE_API: `${PROFILE_URL}/update-profile`,
    CANGE_PASSWORD_API: `${USER_URL}/change-password`,
    DELETE_PROFILE_API: `${PROFILE_URL}/delete-profile`
}

export const profileEndpoints = {
    GET_USER_DETAILS_APi: `${PROFILE_URL}/getUserDetails`,
    GET_USER_ENROLLED_COURSE_API: `${PROFILE_URL}/getEnrolledCourses`,
    GET_INSTRUCOTOR_DATA_API: `${PROFILE_URL}/instructorDashboard`,
}

export const courseDetailsApi = {
    GET_ALL_COURSE_API: `${COURSE_URL}/getAllCourses`,
    GET_COURSE_DETAIL_API: `${COURSE_URL}/getCourseDetails`,
    EDIT_COURES_API: `${COURSE_URL}/editCourse`,
    CREATE_COURSE_API: `${COURSE_URL}/createCourse`,
    DELETE_COURSE_API: `${COURSE_URL}/deleteCourse`,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED: `${COURSE_URL}/getFullCourseDetails`,
    GET_ALL_INSTRUCTOR_COURSES_API: `${COURSE_URL}/getInstructorCourses`,
    CREATE_SECTION_API: `${COURSE_URL}/addSection`,
    UPDATE_SECTION_API: `${COURSE_URL}/updateSection`,
    DELETE_SECTION_API: `${COURSE_URL}/deleteSection`,
    CREATE_SUBSECTION_API: `${COURSE_URL}/addSubSection`,
    UPDATE_SUBSECTION_API: `${COURSE_URL}/updateSubSection`,
    DELETE_SUBSECTION_API: `${COURSE_URL}/deleteSubSection`,
    CREATE_RATING_API: `${COURSE_URL}/createRating`,
    CREATE_RATING_API: `${COURSE_URL}/createRating`,
    LECTURE_COMPLETE_API : `${COURSE_URL}/updateCourseProgress`
}

export const categoriesAPi = {
    CREATE_CATEGORY_API: `${COURSE_URL}/createCategory`,
    SHOW_ALL_CATEGORIES_API: `${COURSE_URL}/showAllCategories`,
    GET_CATEGORY_PAGE_DETAILS: `${COURSE_URL}/getCategoryPageDetails`,
}

// Catelog page data 
export const catalogData = {
    CATALOGDATA_API : `${COURSE_URL}/getCategoryPageDetails`
}

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: `${COURSE_URL}/course/getReviews`,
}

export const studentEndpoints = {
  COURSE_PAYMENT_API: `${PAYMENT_URL}/capturePayment`,
  COURSE_VERIFY_API: `${PAYMENT_URL}/verifyPayment`,
  SEND_PAYMENT_SUCCESS_EMAIL_API: `${PAYMENT_URL}/sendPaymentSuccessEmail`,
}