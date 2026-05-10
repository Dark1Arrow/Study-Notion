import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import Tab from '../../common/Tab'
import { useState } from "react"
import { ACCOUNT_TYPE } from "../../../redux/constant"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { toast } from "react-toastify"
import { setSignupData } from "../../../redux/slices/authSlice"
import { sendOTP } from "../../../redux/api/operation/authAPI"

const SignupForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const { firstName, lastName, password, confirmPassword, email } = formData

  const handleOnchange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return;
    }
    const signupData = {
      ...formData,
      accountType
    }

    dispatch(setSignupData(signupData))
    dispatch(sendOTP(formData.email, navigate))

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  const tabData = [
    { id: 1, tabName: "Student", type: ACCOUNT_TYPE.STUDENT },
    { id: 2, tabName: "Instructor", type: ACCOUNT_TYPE.INSTRUCTOR },
  ]

  // Shared input style for consistency
  const inputStyle = "w-full rounded-lg bg-purple-950/20 border border-purple-900/50 p-[12px] text-purple-50 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200 placeholder:text-purple-200/30"

  return (
    <div className="flex flex-col gap-y-6">
      {/* Tab Component - Ensure your Tab component also uses purple accents! */}
      <Tab tabData={tabData} fields={accountType} setField={setAccountType} />

      <form onSubmit={handleOnSubmit} className="flex flex-col w-full gap-y-4">
        {/* First and Last Name row */}
        <div className="flex gap-x-4">
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] text-purple-50">
              First Name <sup className="text-pink-400">*</sup>
            </p>
            <input
              type="text"
              required
              name="firstName"
              value={firstName}
              onChange={handleOnchange}
              placeholder="Enter first name"
              className={inputStyle}
            />
          </label>

          <label className="w-full">
            <p className="mb-1 text-[0.875rem] text-purple-50">
              Last Name <sup className="text-pink-400">*</sup>
            </p>
            <input
              type="text"
              required
              name="lastName"
              value={lastName}
              onChange={handleOnchange}
              placeholder="Enter last name"
              className={inputStyle}
            />
          </label>
        </div>

        {/* Email */}
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] text-purple-50">
            Email Address <sup className="text-pink-400">*</sup>
          </p>
          <input
            type="email"
            required
            name="email"
            value={email}
            onChange={handleOnchange}
            placeholder="Enter email address"
            className={inputStyle}
          />
        </label>

        {/* Password Row */}
        <div className="flex gap-x-4">
          <label className="relative w-full">
            <p className="mb-1 text-[0.875rem] text-purple-50">
              Create Password <sup className="text-pink-400">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              required
              name="password"
              value={password}
              onChange={handleOnchange}
              placeholder="Enter password"
              className={inputStyle}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z- cursor-pointer text-purple-300 hover:text-purple-100 transition-colors"
            >
              {showPassword ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24} />}
            </span>
          </label>

          <label className="relative w-full">
            <p className="mb-1 text-[0.875rem] text-purple-50">
              Confirm Password <sup className="text-pink-400">*</sup>
            </p>
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnchange}
              placeholder="Confirm password"
              className={inputStyle}
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z- cursor-pointer text-purple-300 hover:text-purple-100 transition-colors"
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24} />}
            </span>
          </label>
        </div>

        {/* Themed Primary Button */}
        <button 
          type="submit" 
          className="mt-6 rounded-xl bg-purple-600 py-[12px] px-[12px] font-semibold text-white shadow-[0_4px_14px_0_rgba(147,51,234,0.39)] hover:bg-purple-500 hover:scale-[0.98] transition-all duration-300"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm