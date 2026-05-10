import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { changePassword } from '../../../../redux/api/operation/settingApi'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import IconBtn from '../../../common/IconBtn'

const UpdatePasswprd = () => {

  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const submitPasswordForm = async (data) => {
    console.log("password data" ,data)
    try {
      await dispatch(changePassword(token, data))
    } catch (error) {
      console.log("Change Password error : ", error)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-gray-700 bg-gray-800 p-8 px-6 sm:px-12">
          <h2 className="text-lg font-semibold text-gray-5">Password</h2>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="oldPassword" className='label-style'>
                Current Password
              </label>

              <input
                type={showOldPassword ? "text" : "password"}
                name='oldPassword'
                id='oldPassword'
                placeholder='Enter your old password'
                className='form-style'
                {...register("oldPassword", { required: true })}
              />

              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className='absolute right-3 top-[38px] z-[10] cursor-pointer'
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fill='#AFB2BF' fontSize={24} />
                ) : (
                  <AiOutlineEye fill='#AFB2BF' fontSize={24} />
                )}

                {errors.oldPassword && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your old Password
                  </span>
                )}
              </span>
            </div>

            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newPassword" className='label-style'>
                New Password
              </label>

              <input
                type={showNewPassword ? "text" : "password"}
                name='newPassword'
                id='newPassword'
                placeholder='Enter new password'
                className='form-style'
                {...register("newPassword", { required: true })}
              />

              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className='absolute right-3 top-[38px] z-[10] cursor-pointer'
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fill='#AFB2BF' fontSize={24} />
                ) : (
                  <AiOutlineEye fill='#AFB2BF' fontSize={24} />
                )}

                {errors.newPassword && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter new Password
                  </span>
                )}
              </span>
            </div>

            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="confirmPassword" className='label-style'>
                Confirm Password
              </label>

              <input
                type={showConfirmPassword ? "text" : "password"}
                name='confirmPassword'
                id='confirmPassword'
                placeholder='Enter confirm password'
                className='form-style'
                {...register("confirmPassword", { required: true })}
              />

              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className='absolute right-3 top-[38px] z-[10] cursor-pointer'
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fill='#AFB2BF' fontSize={24} />
                ) : (
                  <AiOutlineEye fill='#AFB2BF' fontSize={24} />
                )}

                {errors.confirmPassword && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter confirm Password
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {navigate("/dashboard/my-profile")}}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update"/>
        </div>
      </form>
    </>
  )
}

export default UpdatePasswprd
