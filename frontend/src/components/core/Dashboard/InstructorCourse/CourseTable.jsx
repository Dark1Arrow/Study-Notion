import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteCourse, fetchInstructorCourses } from '../../../../redux/api/operation/courseDetailsApi'
import { Table, Thead, Tbody, Td, Th, Tr } from "react-super-responsive-table"
import {fromatDate} from "../../../../services/formatDate.js"
import { COURSE_STATUS } from '../../../../redux/constant.js'
import { FaCheck } from "react-icons/fa"
import { HiClock } from "react-icons/hi"
import { FiEdit2 } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import ConformationModel from "../../../common/ConformationModel.jsx"

const CourseTable = ({ courses, setCourses, loading, setLoading }) => {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [confirmationModel, setConfirmationModel] = useState(null)
  const TRUNCATE_LENGTH = 25

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    const toastId = toast.loading("Deleting...")
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModel(null)
    setLoading(false)
    toast.dismiss(toastId)
  }

  const skItem = () => {
    return (
      <div className="flex border-b border-purple-900/30 px-6 py-8 w-full">
        <div className='flex flex-1 gap-x-4'>
          <div className='h-[148px] min-w-[300px] rounded-xl bg-purple-900/20 animate-pulse'></div>
          <div className='flex flex-col w-[40%] space-y-3'>
            <div className="h-5 w-[50%] rounded-xl bg-purple-900/20 animate-pulse"></div>
            <div className="h-20 w-[60%] rounded-xl bg-purple-900/20 animate-pulse"></div>
            <div className="h-2 w-[20%] rounded-xl bg-purple-900/20 animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {loading ? (
        <div className="flex flex-col">
          {skItem()}
          {skItem()}
        </div>
      ) : (
        <Table className='rounded-2xl border border-purple-900/50 overflow-hidden'>
          <Thead>
            <Tr className="flex gap-x-10 border-b border-purple-900/50 bg-purple-900/20 px-6 py-4">
              <Th className="flex-1 text-left text-sm font-semibold uppercase text-purple-100">
                Course
              </Th>
              <Th className="text-left text-sm font-semibold uppercase text-purple-100">
                Duration
              </Th>
              <Th className="text-left text-sm font-semibold uppercase text-purple-100">
                Price
              </Th>
              <Th className="text-left text-sm font-semibold uppercase text-purple-100">
                Actions
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {courses?.length === 0 ? (
              <Tr>
                <Td className="py-20 text-center text-xl font-medium text-purple-200/50">
                  No Courses Found
                </Td>
              </Tr>
            ) : (
              courses?.map((course) => (
                <Tr key={course._id} className="flex gap-x-10 border-b border-purple-900/30 px-6 py-8 hover:bg-purple-900/10 transition-all duration-300">
                  <Td className="flex flex-1 gap-x-4 relative">
                    <img
                      src={course?.thumbnail}
                      alt={course?.courseName}
                      className="h-[148px] min-w-[270px] max-w-[270px] rounded-xl object-cover border border-purple-800/30 shadow-lg"
                    />
                    <div className='flex flex-col justify-center'>
                      <p className='text-xl font-semibold text-white capitalize'>{course?.courseName}</p>
                      <p className='text-sm text-purple-200/60 mt-2'>
                        {course.courseDescription.split(" ").length > TRUNCATE_LENGTH
                          ? course.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..."
                          : course.courseDescription}
                      </p>

                      <div className="flex flex-col gap-y-1 mt-4">
                        <p className="text-[11px] text-purple-300 font-medium">
                          Created: {fromatDate(course?.createdAt)}
                        </p>
                        {course.status === COURSE_STATUS.DRAFT ? (
                          <p className="mt-2 flex w-fit flex-row items-center gap-2 rounded-full bg-pink-900/20 border border-pink-500/30 px-3 py-[2px] text-[12px] font-medium text-pink-400">
                            <HiClock size={14}/>
                            Drafted
                          </p>
                        ) : (
                          <div className="mt-2 flex w-fit flex-row items-center gap-2 rounded-full bg-purple-900/40 border border-purple-500/40 px-3 py-[2px] text-[12px] font-medium text-purple-300">
                            <FaCheck size={12}/>
                            Published
                          </div>
                        )}
                      </div>
                    </div>
                  </Td>
                   
                  <Td className="text-sm font-medium text-purple-100 flex items-center">2hr 30min</Td>
                  <Td className="text-sm font-medium text-purple-100 flex items-center">₹{course.price}</Td>
                  <Td className="text-sm font-medium text-purple-100 flex items-center gap-x-3">
                    <button
                      disabled={loading}
                      onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                      title='Edit'
                      className="p-2 rounded-full bg-purple-800/20 text-purple-300 hover:bg-purple-600 hover:text-white transition-all duration-200"
                    >
                      <FiEdit2 size={18}/>
                    </button>
                    
                    <button
                      disabled={loading}
                      onClick={() => {
                        setConfirmationModel({
                          text1: "Delete this course?",
                          text2: "All videos and data related to this course will be permanently removed.",
                          btn1Text: !loading ? "Delete" : "Deleting...",
                          btn2Text: "Cancel",
                          btn1Handler: !loading ? () => handleCourseDelete(course?._id) : () => {},
                          btn2Handler: () => setConfirmationModel(null)
                        })
                      }}
                      title='Delete'
                      className="p-2 rounded-full bg-pink-900/10 text-pink-500 hover:bg-pink-600 hover:text-white transition-all duration-200"
                    >
                      <RiDeleteBin6Line size={18}/>
                    </button>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      )}

      {confirmationModel && <ConformationModel modelData={confirmationModel}/>}
    </>
  )
}

export default CourseTable