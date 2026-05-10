import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPasswordToken } from '../redux/api/operation/authAPI'
import { BiArrowBack } from "react-icons/bi"
import { Link } from 'react-router-dom'

const ForgetPassword = () => {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordToken(email, setEmailSent))
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className='spinner'></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-gray-5">
            {!email ? "Reset your password" : "Check email"}
          </h1>
          <div className="my-4 text-[1.125rem] leading-[1.625rem] text-gray-100">
            {!emailSent ? "Have no fear . we'll email your instructions to reset your password. If you dont have access to your email we can try account recovery" : <p>We have sent the reset email to <span className='text-yellow-200'>{email}</span></p>}
          </div>

          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-5">
                  Email address <span className='text-pink-200'>*</span>
                </p>
                <input
                  required
                  type='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email address'
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-gray-5 "
                />
              </label>
            )}
            <button type='submit' className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-gray-900">
              {!emailSent ? "Submit" : "Resend email"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login" className='flex items-center gap-2.5 justify-center'>
              <BiArrowBack /> Back to login
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgetPassword
