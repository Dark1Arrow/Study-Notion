import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { useNavigate, useParams } from "react-router-dom"

import "video-react/dist/video-react.css"
import { BigPlayButton, Player } from "video-react"

import { markLectureComplete } from "../../../redux/api/operation/courseDetailsApi"
import { updateCompletedLectures } from "../../../redux/slices/viewCourseSlice"
import { setCourseViewSidebar } from "../../../redux/slices/sidebarSlice"

import IconBtn from "../../common/IconBtn"
import { HiMenuAlt1 } from 'react-icons/hi'

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const playerRef = useRef(null)
  const dispatch = useDispatch()

  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState([])
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (!courseSectionData.length) return
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`)
      } else {
        const filteredData = courseSectionData.filter((course) => course._id === sectionId)
        const filteredVideoData = filteredData?.[0]?.subSection.filter((data) => data._id === subSectionId)
        if (filteredVideoData) setVideoData(filteredVideoData[0])
        setPreviewSource(courseEntireData.thumbnail)
        setVideoEnded(false)
      }
    })()
  }, [courseSectionData, courseEntireData, location.pathname])

  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)
    const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex((data) => data._id === subSectionId)
    return currentSectionIndx === 0 && currentSubSectionIndx === 0
  }

  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)
    const noOfSubsections = courseSectionData[currentSectionIndx].subSection.length
    const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex((data) => data._id === subSectionId)
    return currentSectionIndx === courseSectionData.length - 1 && currentSubSectionIndx === noOfSubsections - 1
  }

  const goToNextVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)
    const noOfSubsections = courseSectionData[currentSectionIndx].subSection.length
    const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId = courseSectionData[currentSectionIndx].subSection[currentSubSectionIndx + 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    } else {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
      const nextSubSectionId = courseSectionData[currentSectionIndx + 1].subSection[0]._id
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  const goToPrevVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)
    const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId = courseSectionData[currentSectionIndx].subSection[currentSubSectionIndx - 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    } else {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
      const prevSubSectionLength = courseSectionData[currentSectionIndx - 1].subSection.length
      const prevSubSectionId = courseSectionData[currentSectionIndx - 1].subSection[prevSubSectionLength - 1]._id
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureComplete({ courseId: courseId, subsectionId: subSectionId }, token)
    if (res) { dispatch(updateCompletedLectures(subSectionId)) }
    setLoading(false)
  }

  const { courseViewSidebar } = useSelector(state => state.sidebar)
  if (courseViewSidebar && window.innerWidth <= 640) return null;

  return (
    <div className="flex flex-col gap-5 text-purple-50 p-3">
      {/* Mobile Sidebar Toggle */}
      <div className="sm:hidden text-purple-400 absolute left-7 top-4 cursor-pointer z-50 transition-all hover:text-purple-300" 
           onClick={() => dispatch(setCourseViewSidebar(!courseViewSidebar))}>
        {!courseViewSidebar && <HiMenuAlt1 size={33} />}
      </div>

      <div className="relative group rounded-2xl overflow-hidden border border-purple-500/20 bg-black shadow-[0_0_50px_rgba(168,85,247,0.1)]">
        {!videoData ? (
          <img
            src={previewSource}
            alt="Preview"
            className="h-full w-full rounded-2xl object-cover"
          />
        ) : (
          <div className="relative aspect-video">
            <Player
              ref={playerRef}
              aspectRatio="16:9"
              playsInline
              autoPlay
              onEnded={() => setVideoEnded(true)}
              src={videoData?.videoUrl}
            >
              <BigPlayButton position="center" className="bg-purple-600 hover:bg-purple-500 border-none rounded-full scale-125" />
              
              {/* Overlay When Video Ends */}
              {videoEnded && (
                <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm transition-all duration-300">
                  <div className="flex flex-col gap-4 items-center">
                    {!completedLectures.includes(subSectionId) && (
                      <IconBtn
                        disabled={loading}
                        onclick={() => handleLectureCompletion()}
                        text={!loading ? "Mark As Completed" : "Saving..."}
                        customClasses="text-lg px-6 py-2 bg-gradient-to-r from-purple-600 to-violet-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                      />
                    )}
                    
                    <button
                      disabled={loading}
                      onClick={() => {
                        if (playerRef?.current) {
                          playerRef?.current?.seek(0);
                          playerRef?.current?.play();
                          setVideoEnded(false);
                        }
                      }}
                      className="px-8 py-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200 hover:bg-purple-900/40 transition-all"
                    >
                      Rewatch
                    </button>

                    <div className="flex gap-x-4 mt-6">
                      {!isFirstVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToPrevVideo}
                          className="px-6 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 transition-all"
                        >
                          Prev
                        </button>
                      )}
                      {!isLastVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToNextVideo}
                          className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-900/20 transition-all"
                        >
                          Next
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Player>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-3">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-100 to-purple-400 bg-clip-text text-transparent">
          {videoData?.title}
        </h1>
        <p className="text-purple-200/60 leading-relaxed max-w-4xl">
          {videoData?.description}
        </p>
      </div>
    </div>
  )
}

export default VideoDetails