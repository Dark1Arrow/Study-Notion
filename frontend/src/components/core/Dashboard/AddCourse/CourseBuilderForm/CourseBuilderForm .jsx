import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useForm } from 'react-hook-form'
import { apiConnector } from '../../../../../redux/api/apiConnector'
import { createSection, updateSection } from '../../../../../redux/api/operation/courseDetailsApi'
import { setCourse, setEditCourse, setStep } from "../../../../../redux/slices/courseSlice"
import { toast } from 'react-toastify'
import IconBtn from "../../../../common/IconBtn"
import {IoAddCircleOutline} from "react-icons/io5"
import NestedView from './NestedView'
import {MdNavigateNext} from "react-icons/md"

const CourseBuilderForm = () => {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm()

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null)

  const onSubmit = async (data) => {
    setLoading(true)
    let result

    if (editSectionName) {
      result = await updateSection({ sectionName: data.sectionName, courseId: course._id, sectionId: editSectionName }, token)
    } else {
      result = await createSection({ sectionId: editSectionName, sectionName: data.sectionName, courseId: course._id }, token)
    }

    if (result) {
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
    }
    setLoading(false)
    return
  }

  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please at least one section")
      return
    }
    if (course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add atlest one lecture in each section")
      return
    }
    dispatch(setStep(3))
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  return (
    <div className='space-y-8 rounded-2xl border-[1px] border-gray-700 bg-gray-800 p-6'>
      <p className="text-2xl font-semibold text-gray-5">Course Builder</p>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <label className='flex flex-col space-y-2' htmlFor='sectionName'>
            Section Name <sup className='text-pink-200'>*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder='Add a Section to build your course'
            {...register("sectionName", { required: true })}
            className='form-style w-full'
          />
          {
            errors.sectionName && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Section Name is Required
              </span>
            )
          }
        </div>

        <div className='flex items-end gap-x-4'>
          <IconBtn
            type="submit"
            disabled={loading}
            outline={true}
            text= {editSectionName ? "Edit Section Name" : "Create Section"}
          >
            <IoAddCircleOutline size={20} className="text-yellow-50"/>
          </IconBtn>

          {editSectionName && (
            <button
              type = "button"
              onClick={cancelEdit}
              className="text-sm text-gray-300 underline"
            >
              Cancel Edit 
            </button>
          )}
        </div>
      </form>

      {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`rounded-md bg-gray-300 py-[8px] px-[20px] font-semibold text-gray-900`}
        >
          Back
        </button>
      </div>

      <IconBtn disabled={loading} text="Next" onClick={goToNext}>
        <MdNavigateNext/>
      </IconBtn>
    </div>
  )
}

export default CourseBuilderForm 
