import {configureStore} from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/query/react"
import { apiSlice } from "./api/apiSlice.js"
import authReducer from "./slices/authSlice.js"
import profileReducer from "./slices/profileSlice.js"
import sidebarSlice from "./slices/sidebarSlice.js"
import courseSlice from "./slices/courseSlice.js"
import cartReducer from "./slices/cartSlice"
import viewCourseReducer from "./slices/viewCourseSlice.js"


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth: authReducer,
        profile: profileReducer,
        sidebar: sidebarSlice,
        course: courseSlice,
        viewCourse: viewCourseReducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)

export default store