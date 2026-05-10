import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModel"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullCourseDetails } from "../redux/api/operation/courseDetailsApi"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../redux/slices/viewCourseSlice"

import { setCourseViewSidebar } from "../redux/slices/sidebarSlice"
import { ACCOUNT_TYPE } from "../redux/constant"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)

  // get Full Details Of Course
  useEffect(() => {
    ;(async () => {
      const courseData = await getFullCourseDetails(courseId, token)
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
      dispatch(setEntireCourseData(courseData.courseDetails))
      dispatch(setCompletedLectures(courseData.completedVideos))
      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
    })()
  }, [])

  // handle sidebar for small devices
  const { courseViewSidebar } = useSelector((state) => state.sidebar)
  const [screenSize, setScreenSize] = useState(undefined)

  // set curr screen Size
  useEffect(() => {
    const handleScreenSize = () => setScreenSize(window.innerWidth)
    window.addEventListener("resize", handleScreenSize)
    handleScreenSize()
    return () => window.removeEventListener("resize", handleScreenSize)
  }, [])

  // close / open sidebar according screen size
  useEffect(() => {
    if (screenSize <= 640) {
      dispatch(setCourseViewSidebar(false))
    } else dispatch(setCourseViewSidebar(true))
  }, [screenSize, dispatch])

  return (
    <>
      {user?.accountType === ACCOUNT_TYPE.STUDENT ? (
        <div className="relative flex min-h-[calc(100vh-3.5rem)] bg-[#000814]">
          {/* Sidebar Section with Purple Border Right */}
          {courseViewSidebar && (
            <div className="border-r border-purple-900/30 bg-black/20 backdrop-blur-sm transition-all duration-300">
              <VideoDetailsSidebar setReviewModal={setReviewModal} />
            </div>
          )}

          {/* Main Content Area */}
          <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto custom-scrollbar">
            {/* Subtle Gradient background behind video content */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative mx-auto max-w-[1200px] py-10 px-6 mt-14">
              <Outlet />
            </div>
          </div>

          {/* Review Modal with Purple Backdrop Glow */}
          {reviewModal && (
            <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-purple-950/20 backdrop-blur-md">
               <CourseReviewModal setReviewModal={setReviewModal} />
            </div>
          )}
        </div>
      ) : (
        <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center text-purple-200">
          Access Denied. Students Only.
        </div>
      )}
    </>
  )
}