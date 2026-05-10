import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link } from "react-router-dom"
import { login } from "../../../redux/api/operation/authAPI"

const Loginform = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const { email, password } = formData

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }
  
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <form onSubmit={handleOnSubmit} className="mt-6 w-full flex flex-col gap-y-5">
      {/* Email Input */}
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-purple-50">
          Email Address <sup className="text-pink-400">*</sup>
        </p>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="w-full rounded-lg bg-purple-950/20 border border-purple-900/50 p-[12px] text-purple-50 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200 placeholder:text-purple-200/30"
        />
      </label>

      {/* Password Input */}
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-purple-50">
          Password <sup className="text-pink-400">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          className="w-full rounded-lg bg-purple-950/20 border border-purple-900/50 p-[12px] text-purple-50 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200 placeholder:text-purple-200/30"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z- cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} className="fill-purple-300" />
          ) : (
            <AiOutlineEye fontSize={24} className="fill-purple-300" />
          )}
        </span>

        <Link to="/forget-password">
          <p className="mt-2 ml-auto max-w-max text-xs text-purple-400 hover:text-purple-300 transition-colors">
            Forgot password?
          </p>
        </Link>
      </label>
          
      {/* Submit Button */}
      <button 
        type="submit" 
        className="mt-6 rounded-xl bg-purple-600 py-[12px] px-[12px] font-semibold text-white shadow-[0_4px_14px_0_rgba(147,51,234,0.39)] hover:bg-purple-500 hover:scale-[0.98] transition-all duration-300"
      >
        Sign In
      </button>
    </form>
  )
}

export default Loginform