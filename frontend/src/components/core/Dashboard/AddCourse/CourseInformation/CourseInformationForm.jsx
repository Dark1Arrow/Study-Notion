import React, { useEffect, useState } from 'react'
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import ChipInput from "./ChipInput"
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { editCourseDetails, fetchCourseCategories ,addCourseDetails} from '../../../../../redux/api/operation/courseDetailsApi'
import Upload from "../Upload"
import { toast } from 'react-toastify'
import RequirementsField from "./RequirementsField"
import IconBtn from "../../../../common/IconBtn"
import { MdNavigateNext } from "react-icons/md"
import {COURSE_STATUS} from "../../../../../redux/constant"
import { setCourse, setStep } from '../../../../../redux/slices/courseSlice'

const CourseInformationForm = () => {

    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm()

    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { course, editCourse } = useSelector((state) => state.course)
    const [loading, setLoaidng] = useState(false)
    const [courseCategories, setCourseCategories] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            setLoaidng(true)
            const categories = await fetchCourseCategories()
            if (categories.length > 0) {
                setCourseCategories(categories)
            }
            setLoaidng(false)
        }
        if (editCourse) {
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        }
        getCategories()
    }, [])

    const isFormUpdated = () => {
        const currentValues = getValues()
        if (
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail
        ) {
            return true
        }
        return false
    }

    const onSubmit = async (data) => {
        console.log("hey")
        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues()
                const formData = new FormData()

                formData.append("courseId", course._id)
                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle)
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc)
                }
                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice)
                }
                if (currentValues.courseTags.toString() !== course.tags.toString()) {
                    formData.append("tag", JSON.stringify(data.courseTags))
                }
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits)
                }
                if (currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory)
                }
                if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseRequirements))
                }
                if (currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", JSON.stringify(data.courseImage))
                }

                setLoaidng(true)
                const result = await editCourseDetails(formData, token)
                setLoaidng(false)

                if (result) {
                    dispatch(setStep(2))
                    dispatch(setCourse(result))
                }
            } else {
                toast.error("No changes made to the form")
            }
            return
        }

        const formData = new FormData()
        formData.append("courseName",data.courseTitle)
        formData.append("courseDescription",data.courseShortDesc)
        formData.append("price",data.coursePrice)
        formData.append("tag",JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn",data.courseBenefits)
        formData.append("category",data.courseCategory)
        formData.append("status",COURSE_STATUS.DRAFT)
        formData.append("instructions",JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage",data.courseImage)
        console.log(data.courseImage)
        setLoaidng(true)
        const result = await addCourseDetails(formData,token)
        if(result){
            dispatch(setStep(2))
            dispatch(setCourse(result))
        }
        setLoaidng(false)
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8 relative rounded-md border-[1px] border-gray-700 bg-gray-800 p-6 "
            >
                <div className='flex flex-col space-y-2 '>
                    <label className="text-sm text-gray-50" htmlFor='courseTitle'>
                        Course Title <sup className='text-pink-200'>*</sup>
                    </label>
                    <input
                        id='courseTitle'
                        placeholder='Enter your course title'
                        {...register("courseTitle", { required: true })}
                        className='form-style w-full'
                    />
                    {errors.courseTitle && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course title is required
                        </span>
                    )}
                </div>

                <div className='flex flex-col space-y-2 '>
                    <label className="text-sm text-gray-50" htmlFor='courseShortDesc'>
                        Course Short Description <sup className='text-pink-200'>*</sup>
                    </label>
                    <textarea
                        id='courseShortDesc'
                        placeholder='Enter Description'
                        {...register("courseShortDesc", { required: true })}
                        className='form-style resize-x-none min-h-[130px] w-full'
                    />
                    {errors.courseShortDesc && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course description is required
                        </span>
                    )}
                </div>

                <div className='flex flex-col space-y-2'>
                    <label className="text-sm text-gray-50" htmlFor='coursePrice'>
                        Course Price <sup className='text-pink-200'>*</sup>
                    </label>
                    <div className='relative'>
                        <input
                            id='coursePrice'
                            placeholder='Enter course price'
                            {...register("coursePrice", {
                                required: true,
                                valueAsNumber: true,
                                pattern: {
                                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                }
                            })}
                            className='form-style w-full pl-12! '
                        />
                        <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-gray-400" />
                    </div>
                    {errors.coursePrice && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course price is required
                        </span>
                    )}
                </div>

                <div className='flex flex-col space-y-2 '>
                    <label className="text-sm text-gray-50" htmlFor='courseCategory'>
                        Course Category <sup className='text-pink-200'>*</sup>
                    </label>
                    <select
                        {...register("courseCategory", { required: true })}
                        defaultValue=""
                        id='courseCategory'
                        className='w-full cursor-pointer form-style'
                    >
                        <option value="" disabled>
                            Choose a Category
                        </option>
                        {!loading &&
                            courseCategories?.map((category, index) => (
                                <option value={category?._id} key={index}>
                                    {category.name}
                                </option>
                            ))}
                    </select>
                    {errors.courseCategory && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course Category is required
                        </span>
                    )}
                </div>

                <ChipInput
                    label="Tags"
                    name="courseTags"
                    placeholder="Enter Tags and press Enter or comma"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                />

                <Upload
                    name="courseImage"
                    label="Course Thumbnail"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    editData={editCourse ? course?.thumbnail : null}
                />
                <div className='flex flex-col space-y-2'>
                    <label className='text-sm text-gray-50' htmlFor="courseBenefits">
                        Benfits of Course <sup className='text-pink-200'>*</sup>
                    </label>
                    <textarea
                        id='courseBenefits'
                        placeholder='Enter benefits of the course'
                        {...register("courseBenefits", { required: true })}
                        className='form-style resize-x-none w-full min-h-[130px]'
                    />
                    {errors.courseBenefits && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Benefits of the course is required
                        </span>
                    )}
                </div>

                <RequirementsField
                    name="courseRequirements"
                    label="Requirements/Instructions"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                />

                <div className='flex justify-end gap-x-2'>
                    {editCourse && (
                        <button
                            onClick={() => dispatch(setStep(2))}
                            disabled={loading}
                            className={`flex cursor-pointer items-center gap-x-2 rounded-md py-[8px] px-[20px] font-semibold text-gray-900 bg-gray-300 hover:bg-gray-900 hover:text-gray-300 duration-300`}
                        >
                            Continue Without Saving
                        </button>
                    )}
                    <IconBtn
                        disabled={loading}
                        type ="submit"
                        // onClick={() => dispatch(editCourse(true))}
                        text={!editCourse ? "Next" : "Save Changes"}
                    >
                        <MdNavigateNext />
                    </IconBtn>
                </div>
            </form>
        </>
    )
}

export default CourseInformationForm
