import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { COURSE_STATUS } from "../../../../../redux/constant"
import { resetCourseState, setStep } from "../../../../../redux/slices/courseSlice"
import { editCourseDetails } from "../../../../../redux/api/operation/courseDetailsApi"
import IconBtn from "../../../../common/IconBtn"

const index = () => {

  const { register, handleSubmit, setValue, getValues } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublished = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT &&
        getValues("public") === false)
    ) {
      goToCourses()
      return
    }
    const formData = new FormData()
    formData.append("courseId", course._id)
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT
    formData.append("status", courseStatus)
    setLoading(true)
    const result = await editCourseDetails(formData, token)
    if (result) {
      goToCourses()
    }
    setLoading(false)
  }

  const onSubmit = (data) => {
    handleCoursePublished()
  }

  return (
    <div className="rounded-md border-[1px] border-gray-700 bg-gray-800 p-6">
      <p className="text-2xl font-semibold text-gray-5">
        Publish Settings
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="public" className='inline-flex items-center text-lg'>
            <input 
            type='checkbox'
            id='public'
            {...register("public")}
            className="border-gray-300 h-4 w-4 rounded bg-gray-500 text-gray-400 focus:ring-2 focus:ring-gray-5"
             />
            <span className="ml-2 text-gray-400">
              Make this course as public
            </span>
          </label>
        </div>

        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type='button'
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-gray-300 py-[8px] px-[20px] font-semibold text-gray-900"
          >
            Back
          </button>
          <IconBtn disabled={loading} text="Save Changes"/>
        </div>
      </form>
    </div>
  )
}

export default index
