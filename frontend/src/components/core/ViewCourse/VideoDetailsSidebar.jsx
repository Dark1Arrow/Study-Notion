import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from '../../common/IconBtn';
import { setCourseViewSidebar } from "../../../redux/slices/sidebarSlice"

import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { IoMdClose } from 'react-icons/io'
import { HiMenuAlt1 } from 'react-icons/hi'

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("") 
  const [videoBarActive, setVideoBarActive] = useState("") 
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch();

  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  const { courseViewSidebar } = useSelector(state => state.sidebar)

  useEffect(() => {
    ; (() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)
      const currentSubSectionIndx = courseSectionData?.[currentSectionIndx]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId = courseSectionData[currentSectionIndx]?.subSection?.[currentSubSectionIndx]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
  }, [courseSectionData, courseEntireData, location.pathname])

  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r border-purple-900/30 bg-[#0a0a0c]">
        {/* Sidebar Header */}
        <div className="mx-5 flex flex-col gap-y-4 border-b border-purple-900/20 py-5">
          <div className="flex w-full items-center justify-between">
            {/* Mobile Close Icon */}
            <div
              className="sm:hidden text-purple-400 cursor-pointer hover:text-purple-300 transition-colors"
              onClick={() => dispatch(setCourseViewSidebar(!courseViewSidebar))}
            >
              {courseViewSidebar ? <IoMdClose size={33} /> : <HiMenuAlt1 size={33} />}
            </div>

            {/* Back Button */}
            <button
              onClick={() => navigate(`/dashboard/enrolled-courses`)}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-purple-900/20 text-purple-200 hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-lg shadow-purple-900/20"
              title="back"
            >
              <IoIosArrowBack size={20} />
            </button>

            <IconBtn
              text="Add Review"
              onclick={() => setReviewModal(true)}
              customClasses="bg-gradient-to-r from-purple-600 to-violet-700 text-sm py-2 px-4 rounded-lg font-bold"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-lg font-bold text-purple-50 line-clamp-1">{courseEntireData?.courseName}</p>
            <div className="flex items-center gap-2 mt-1">
                <div className="h-1.5 flex-1 bg-purple-900/30 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-purple-500 transition-all duration-500" 
                        style={{ width: `${(completedLectures?.length / totalNoOfLectures) * 100}%` }}
                    />
                </div>
                <p className="text-xs font-bold text-purple-400">
                    {completedLectures?.length} / {totalNoOfLectures}
                </p>
            </div>
          </div>
        </div>

        {/* Sections and Subsections */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {courseSectionData.map((section, index) => (
            <div
              className="mt-2 cursor-pointer"
              onClick={() => setActiveStatus(section?._id)}
              key={index}
            >
              {/* Section Header */}
              <div className="flex justify-between bg-purple-950/10 border-y border-purple-900/10 px-5 py-4 hover:bg-purple-900/10 transition-colors">
                <div className="w-[70%] font-bold text-purple-100 italic">
                  {section?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-purple-400 uppercase tracking-tighter">
                    {section?.subSection.length} Lessons
                  </span>
                  <span className={`text-purple-300 transition-transform duration-300 ${activeStatus === section?._id ? "rotate-180" : "rotate-0"}`}>
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* Sub Sections */}
              {activeStatus === section?._id && (
                <div className="bg-black/40">
                  {section.subSection.map((topic, i) => (
                    <div
                      className={`relative flex gap-3 px-5 py-3 transition-all duration-200 border-l-4 ${
                        videoBarActive === topic._id
                        ? "bg-gradient-to-r from-purple-600/20 to-transparent border-purple-500 text-purple-50 font-bold"
                        : "border-transparent text-zinc-400 hover:bg-purple-900/5 hover:text-purple-200"
                      }`}
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                        setVideoBarActive(topic._id)
                        if(courseViewSidebar && window.innerWidth <= 640) dispatch(setCourseViewSidebar(false));
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        readOnly
                        className="accent-purple-500 w-4 h-4 cursor-pointer"
                      />
                      <span className="text-sm">{topic.title}</span>
                      
                      {/* Glow effect for active item */}
                      {videoBarActive === topic._id && (
                        <div className="absolute inset-y-0 left-0 w-1 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}