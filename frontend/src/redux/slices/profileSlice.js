import { createSlice } from "@reduxjs/toolkit";
import { setLoading } from "./authSlice";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false
}

console.log(initialState)

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload
        },
        setUserLoading(state, value) {
            state.loading = value.payload
        }
    }
})

export const { setUser, setUserLoading } = profileSlice.actions
export default profileSlice.reducer