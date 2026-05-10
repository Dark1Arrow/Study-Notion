import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { getInstructorData } from "../../../redux/api/operation/profileApi"
import { fetchInstructorCourses } from '../../../redux/api/operation/courseDetailsApi'
import { Link } from 'react-router-dom'
import Instructorchart from './InstructorDashboard/Instructorchart'
import Img from "../../common/Img"

const Instructor = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)

      if (instructorApiData.length) setInstructorData(instructorApiData)
      if (result) {
        setCourses(result)
      }
      setLoading(false)
    })()
  }, [token])

  const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0)
  const totalStudent = instructorData?.reduce((acc, curr) => acc + curr.totalStudentEnrolled, 0)

  // Shared card style
  const glassCard = "rounded-2xl border border-purple-900/50 bg-purple-950/20 backdrop-blur-sm p-6"

  const skItem = () => {
    return (
      // <div className="mt-5 w-full flex flex-col gap-y-6 animate-pulse">
      //   <div className={`flex gap-x-5 ${glassCard} border-dashed`}>
      //     <div className='flex-1 h-[300px] rounded-xl bg-purple-900/20'></div>
      //     <div className='w-[250px] h-[300px] rounded-xl bg-purple-900/20 sm:flex hidden'></div>
      //   </div>
      //   <div className={`h-[250px] ${glassCard} bg-purple-900/10`}></div>
      // </div>
      <div></div>
    )
  }

  return (
    <div className="max-w-[1000px] mx-auto pb-10">
      <div className='space-y-2 mb-8'>
        <h1 className="text-3xl font-bold text-white font-boogaloo tracking-wide text-center sm:text-left">
          Hii {user?.firstName} 👋
        </h1>
        <p className="font-medium text-purple-200/60 text-center sm:text-left">
          Let's see how your courses are performing today.
        </p>
      </div>

      {loading ? (
        skItem()
      ) : courses.length > 0 ? (
        <div className="space-y-6">
          {/* Main Stats Row */}
          <div className="flex flex-col lg:flex-row gap-6 min-h-[450px]">
            {/* Chart Area */}
            <div className={`flex-1 ${glassCard}`}>
              {totalAmount > 0 || totalStudent > 0 ? (
                <Instructorchart courses={instructorData} />
              ) : (
                <div className="flex h-full flex-col items-center justify-center">
                  <p className="text-lg font-bold text-white">Visualize</p>
                  <p className="mt-4 text-xl font-medium text-purple-200/40">
                    Not Enough Data To Visualize
                  </p>
                </div>
              )}
            </div>

            {/* Statistics Column */}
            <div className={`lg:min-w-[280px] flex flex-col justify-between ${glassCard}`}>
              <p className="text-xl font-bold text-white">Statistics</p>
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-sm font-medium text-purple-400 uppercase tracking-wider">Total Courses</p>
                  <p className="text-4xl font-bold text-white mt-1 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                    {courses.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-400 uppercase tracking-wider">Total Students</p>
                  <p className="text-4xl font-bold text-white mt-1 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                    {totalStudent}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-400 uppercase tracking-wider">Total Income</p>
                  <p className="text-4xl font-bold text-white mt-1 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                    ₹{totalAmount?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Courses Section */}
          <div className={glassCard}>
            <div className="flex items-center justify-between mb-6">
              <p className="text-xl font-bold text-white">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="text-sm font-semibold text-purple-400 hover:text-purple-300 hover:underline transition-all">
                  View All
                </p>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="group flex flex-col">
                  <div className="overflow-hidden rounded-2xl border border-purple-800/30">
                    <Img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="h-[201px] w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-4 px-1">
                    <p className="text-md font-semibold text-white truncate capitalize">
                      {course.courseName}
                    </p>
                    <div className="mt-2 flex items-center gap-x-2 text-sm text-purple-200/50">
                      <span>{course.studentsEnrolled?.length || 0} Students</span>
                      <span>|</span>
                      <span className="text-purple-300 font-semibold">₹{course.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={`mt-10 py-20 flex flex-col items-center justify-center ${glassCard}`}>
          <p className="text-2xl font-bold text-white">
            You have not created any courses yet
          </p>
          <Link to="/dashboard/add-course" className="mt-6">
            <button className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all transform hover:scale-105">
              Create your first course
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Instructor