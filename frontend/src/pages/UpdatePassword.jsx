import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { resetPassword } from "../redux/api/operation/authAPI"
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { Link } from "react-router-dom"
import { BiArrowBack } from "react-icons/bi"

const UpdatePassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const { loading } = useSelector((state) => state.auth)
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { password, confirmPassword } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const token = location.pathname.split("/").at(-1)
        dispatch(resetPassword(password, confirmPassword, token, navigate))
    }
    return (
        <div  className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className="max-w-[500px] p-4 lg:p-8">
                    <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-gray-5">
                        Choose new password
                    </h1>

                    <p className="my-4 text-[1.125rem] leading-[1.625rem] text-gray-100">
                        Almost done. Enter your new password and your're all set
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        <label className="relative">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-5">
                                New Password <sup className="text-pink-200">*</sup>
                            </p>
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                                placeholder="Enter your password "
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-gray-5 "
                            />
                            <span className="absolute right-3 top-[38px] z-[10] cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
                                {showPassword ? (
                                    <AiOutlineEyeInvisible />
                                ) : (
                                    <AiOutlineEye />
                                )}
                            </span>
                        </label>
                        <label className="mt-3 block relative">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-5">
                                Confirm Password <sup className="text-pink-200">*</sup>
                            </p>
                            <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder="Enter your confirm password "
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-gray-5 "
                            />
                            <span className="absolute right-3 top-[38px] z-[10] cursor-pointer" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                {showConfirmPassword ? (
                                    <AiOutlineEyeInvisible />
                                ) : (
                                    <AiOutlineEye />
                                )}
                            </span>
                        </label>
                        <button onClick={handleOnSubmit} className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-gray-900">
                                Reset Password
                        </button>
                    </form>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/login">
                                <p className="flex items-center gap-x-2 text-gray-5">
                                    <BiArrowBack/> Back to login
                                </p>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UpdatePassword
