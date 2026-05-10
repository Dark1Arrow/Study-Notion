import { useEffect, useRef, useState } from "react"
import CourseSubSectionAccordion from "./CourseSubSectionAccordion"
import { IoMdArrowDropdown } from "react-icons/io"

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null)
  const [active, setActive] = useState(false)
  const [sectionHeight, setSectionHeight] = useState(0)

  useEffect(() => {
    setActive(isActive?.includes(course._id))
  }, [isActive, course._id])

  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0)
  }, [active])

  return (
    <div className="overflow-hidden border-b border-white/5 bg-[#0d0d12] transition-all duration-200">
      <div
        className={`flex cursor-pointer items-start justify-between px-7 py-5 transition-colors duration-300 hover:bg-[#16161e] ${
          active ? "bg-[#16161e]" : ""
        }`}
        onClick={() => handleActive(course._id)}
      >
        <div className="flex items-center gap-3">
          <i
            className={`text-purple-500 transition-transform duration-300 ${
              active ? "rotate-180" : "rotate-0"
            }`}
          >
            <IoMdArrowDropdown size={22} />
          </i>
          <p className={`text-sm font-medium transition-colors ${active ? "text-purple-400" : "text-zinc-200"}`}>
            {course?.sectionName}
          </p>
        </div>
        
        <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">
          <span>{`${course.subSection.length || 0} Lectures`}</span>
        </div>
      </div>

      <div
        ref={contentEl}
        className="relative h-0 overflow-hidden bg-[#09090b] transition-[height] duration-[0.35s] ease-in-out"
        style={{ height: sectionHeight }}
      >
        <div className="flex flex-col border-t border-white/5">
          {course?.subSection?.map((subSec, i) => (
            <div key={i} className="border-b border-white/5 last:border-none">
                <CourseSubSectionAccordion subSec={subSec} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}