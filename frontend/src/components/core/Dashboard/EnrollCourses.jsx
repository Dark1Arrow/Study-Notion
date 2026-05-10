import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUserEnrolledCourses } from "../../../redux/api/operation/profileApi"
import Img from "../../common/Img"
import ProgressBar from "@ramonak/react-progress-bar"

const EnrollCourses = () => {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [enrolledCourses, setEnrolledCourses] = useState(null)

  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token)
      setEnrolledCourses(res)
    } catch (error) {
      console.log("Could not fetch enrolled courses")
    }
  }

  useEffect(() => {
    getEnrolledCourses()
  }, [])

  // Enhanced Purple Skeleton Loader
  const sklItem = () => {
    return (
      <div className="flex border border-purple-900/30 px-5 py-4 w-full bg-black/20 animate-pulse">
        <div className="flex flex-1 gap-x-4">
          <div className='h-14 w-14 rounded-lg bg-purple-900/40'></div>
          <div className="flex flex-col w-[40%] space-y-3">
            <div className="h-3 w-[60%] rounded-xl bg-purple-900/40"></div>
            <div className="h-2 w-[80%] rounded-xl bg-purple-800/20"></div>
          </div>
        </div>
        <div className="flex flex-[0.4] flex-col space-y-3">
          <div className="h-2 w-[30%] rounded-xl bg-purple-900/40"></div>
          <div className="h-2 w-[50%] rounded-xl bg-purple-800/20"></div>
        </div>
      </div>
    )
  }

  if (enrolledCourses?.length === 0) {
    return (
      <div className="grid h-[50vh] w-full place-content-center text-center">
        <p className="text-purple-100/60 text-3xl font-semibold">
          You haven't embarked on any learning journeys yet.
        </p>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-violet-600 bg-clip-text text-transparent font-boogaloo text-center sm:text-left">
        Enrolled Courses
      </h1>

      <div className="my-8 overflow-hidden rounded-2xl border border-purple-900/30 bg-black/40 backdrop-blur-sm shadow-xl">
        {/* Table Headings */}
        <div className="flex bg-gradient-to-r from-purple-900/50 to-violet-950/50 text-purple-100 font-semibold">
          <p className="w-[45%] px-5 py-4">Course Name</p>
          <p className="w-1/4 px-2 py-4 hidden sm:block">Duration</p>
          <p className="flex-1 px-2 py-4">Progress</p>
        </div>

        {/* Loading State */}
        {!enrolledCourses && (
          <div className="flex flex-col">
            {sklItem()} {sklItem()} {sklItem()}
          </div>
        )}

        {/* Course Rows */}
        {enrolledCourses?.map((course, i, arr) => (
          <div
            key={i}
            className={`flex flex-col sm:flex-row sm:items-center border-t border-purple-900/20 hover:bg-purple-900/10 transition-colors duration-300 ${
              i === arr.length - 1 ? "rounded-b-2xl" : ""
            }`}
          >
            {/* Course Info Section */}
            <div
              className="flex sm:w-[45%] cursor-pointer items-center gap-4 px-5 py-4"
              onClick={() => {
                navigate(
                  `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                )
              }}
            >
              <Img
                src={course.thumbnail}
                alt="course_img"
                className="h-14 w-14 rounded-lg object-cover border border-purple-500/20"
              />
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-purple-50 group-hover:text-purple-400">
                  {course.courseName}
                </p>
                <p className="text-xs text-purple-300/60 leading-relaxed">
                  {course.courseDescription.length > 60
                    ? `${course.courseDescription.slice(0, 60)}...`
                    : course.courseDescription}
                </p>
              </div>
            </div>

            {/* Duration Section */}
            <div className="px-5 py-2 sm:w-1/4 sm:px-2 sm:py-4 text-purple-200/80 text-sm font-medium">
               <span className="sm:hidden text-purple-400/50 text-xs uppercase mr-2">Duration:</span>
               {course?.totalDuration}
            </div>

            {/* Progress Section */}
            <div className="flex flex-1 flex-col gap-2 px-5 py-4 sm:px-2">
              <div className="flex justify-between items-center text-xs">
                <p className="text-purple-300/80">Progress: {course.progressPercentage || 0}%</p>
              </div>
              <ProgressBar
                completed={course.progressPercentage || 0}
                height="10px"
                isLabelVisible={false}
                bgColor="#a855f7" // Vibrant Purple
                baseBgColor="#2e1065" // Deep Purple/Black
                transitionDuration="1s"
                className="shadow-[0_0_10px_rgba(168,85,247,0.2)]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EnrollCourses