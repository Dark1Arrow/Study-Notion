import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../redux/api/operation/courseDetailsApi'
import { setCourse } from '../../../../../redux/slices/courseSlice'
import { toast } from 'react-toastify'
import { RxCross2 } from 'react-icons/rx'
import Upload from "../Upload"
import IconBtn from '../../../../common/IconBtn'

const SubSectionModel = ({ modelData, setModelData, add = false, view = false, edit = false }) => {

  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm()

  const dispatch = useDispatch()
  const [loading, setLoading] = useState()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modelData.title)
      setValue("lectureDesc", modelData.description)
      setValue("lectureVideo", modelData.videoUrl)
    }
  }, [])

  const isFormUpdated = () => {
    const currentValue = getValues()

    if (
      currentValue.lectureTitle !== modelData.title ||
      currentValue.lectureDesc !== modelData.description ||
      currentValue.lectureVideo !== modelData.videoUrl
    ) {
      return true
    }
    return false
  }

  const handleEditSubSection = async () => {
    const currentValues = getValues()
    const formData = new FormData()

    formData.append("sectionId", modelData.sectionId)
    formData.append("subSectionId", modelData._id)
    if (currentValues.lectureTitle !== modelData.title) {
      formData.append("title", currentValues.lectureTitle)
    }
    if (currentValues.lectureDesc !== modelData.description) {
      formData.append("description", currentValues.lectureDesc)
    }
    if (currentValues.lectureVideo !== modelData.videoUrl) {
      formData.append("video", currentValues.lectureVideo)
    }
    setLoading(true)
    const result = await updateSubSection(formData, token)
    if (result) {
      const updateCourseSection = course.courseContent.map((section) =>
        section._id === modelData.sectionId ? result : section)

      const updateCourse = { ...course, courseContent: updateCourseSection }
      dispatch(setCourse(updateCourse))
    }
    setModelData(null)
    setLoading(false)
  }

  const onSubmit = async (data) => {
    if (view) return
    if (edit) {
      if (!isFormUpdated) {
        toast.error("No changes made to form")
      } else {
        handleEditSubSection()
      }
      return
    }

    const formData = new FormData()
    formData.append("sectionId", modelData)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("video", data.lectureVideo)
    setLoading(true)

    const result = await createSubSection(formData,token)
    if(result){
      const updatedCourseContent = course.courseContent.map((section) => 
      section._id === modelData ? result : section)
      const updatedCourse = {...course, courseContent: updatedCourseContent}
      dispatch(setCourse(updatedCourse))
    }
    setModelData(null)
    setLoading(false)
  }
  return (
    <div className='className="fixed inset-0 z-[1000] !mt-0 grid h-screen  place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm"'>
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-gray-400 bg-gray-800">
        <div className="flex items-center justify-between rounded-t-lg bg-gray-700 p-5">
          <p className="text-xl font-semibold text-gray-5">
            {view && "view"}{edit && "Edit"}{add && "Add"} Lecture
          </p>
          <button onClick={() => (!loading ? setModelData(null) : {})}>
            <RxCross2 className='text-2xl text-gray-50'/>
          </button>
        </div>
        <form 
         onSubmit={handleSubmit(onSubmit)}
         className="space-y-8 px-8 py-10"
        >
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modelData.videoUrl : null}
            editData={edit ? modelData.videoUrl : null}
          />

          <div className="flex flex-col space-y-2">
            <label htmlFor="lectureTitle" className="text-sm text-gray-50">
                Lecture Title {!view && <sup className='text-pink-200'>*</sup>}
            </label>
            <input 
              disabled={view || loading}
              id="lectureTitle"
              placeholder='Enter Your lecture'
              {...register("lectureTitle", {required: true})}
              className='form-style w-full'
             />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Title is Required
              </span>
            )}
          </div>

            <div className="flex flex-col space-y-2">
            <label htmlFor="lectureDesc" className="text-sm text-gray-50">
                Lecture Description{' '} {!view && <sup className='text-pink-200'>*</sup>}
            </label>
            <textarea 
              disabled={view || loading}
              id="lectureDesc"
              placeholder='Enter Your lecture Description'
              {...register("lectureDesc", {required: true})}
              className="form-style resize-x-none min-h-[130px] w-full"
             />
            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is Required
              </span>
            )}
          </div>
            {!view && (
              <div className='flex justify-end'>
                <IconBtn 
                  disabled={loading}
                  text={loading? "Loading..." : edit? "Save Changes" : "Save"}
                />
              </div>
            )}
        </form>
      </div>
    </div>
  )
}

export default SubSectionModel
