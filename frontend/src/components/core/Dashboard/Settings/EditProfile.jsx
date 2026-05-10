import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from "../../../common/IconBtn"
import { updateProfile } from "../../../../redux/api/operation/settingApi"

const genders = ["Male", "Female", "Prefer not to say", "Other"]

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm()

  const submitProfileForm = async(data) => {
      try {
        dispatch(updateProfile(token,data))
      } catch (error) {
        console.log("Update profile error : " ,error)
      }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-gray-700 bg-gray-800 p-8 px-6 sm:px-12">
          <h2 className="text-lg font-semibold text-gray-50">
            Profile information
          </h2>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="label-style" >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter your first name"
                className="form-style"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {
                errors.firstName && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your first name.
                  </span>
                )
              }
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="label-style" >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter your last name"
                className="form-style"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {
                errors.lastName && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your last name.
                  </span>
                )
              }
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="label-style" >
                Date of birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-style"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your date of birth."
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of birth cannot be in the future."
                  }
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {
                errors.dateOfBirth && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    {errors.dateOafBirth.message}
                  </span>
                )
              }
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="label-style" >
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style"
                {...register("lastName", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((data, key) => {
                  return (
                    <option key={key} value={data}>
                      {data}
                    </option>
                  )
                })}
              </select>
              {
                errors.gender && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your gender.
                  </span>
                )
              }
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="label-style" >
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                className="form-style"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your contact number."
                  },
                  maxLength: { value: 12, message: "Invalid contact number" },
                  minLength: { value: 10, message: "Invalid contact number" }
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {
                errors.contactNumber && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    {errors.contactNumber.message}
                  </span>
                )
              }
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="label-style" >
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                className="form-style"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {
                errors.about && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    {errors.about.message}
                  </span>
                )
              }
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={() => navigate("/dashboard/my-profile")} className="cursor-pointer rounded-md bg-gray-700 py-2 px-5 font-semibold text-gray-50">
            Cancel
          </button>
          <IconBtn type="submit" text="save" />
        </div>

      </form>
    </>
  )
}

export default EditProfile
