import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { fetchInstructorCourses } from '../../../redux/api/operation/courseDetailsApi'
import IconBtn from '../../common/IconBtn'
import { VscAdd } from "react-icons/vsc"
import CourseTable from './InstructorCourse/CourseTable'

const MyCourse = () => {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      const result = await fetchInstructorCourses(token)
      setLoading(false)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
  }, [token])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="max-w-[1000px] mx-auto">
      {/* Header Section */}
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-4xl font-medium text-white font-boogaloo tracking-wide">
          My Courses
        </h1>
        <IconBtn
          text="Add Course"
          onClick={() => navigate("/dashboard/add-course")}
          // customClasses="bg-purple-600 hover:bg-purple-500 transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.3)]"
        >
          <VscAdd className="font-bold" />
        </IconBtn>
      </div>

      {/* Course Table Section */}
      <div className="rounded-2xl border border-purple-900/50 bg-purple-950/10 backdrop-blur-sm overflow-hidden">
        {courses && (
          <CourseTable 
            courses={courses} 
            setCourses={setCourses} 
            loading={loading} 
            setLoading={setLoading} 
          />
        )}
        
        {!loading && courses.length === 0 && (
          <div className="py-20 text-center text-purple-200/50 font-medium">
            No courses found. Start by creating one!
          </div>
        )}
      </div>
    </div>
  )
}

export default MyCourse