import React from "react"
import { HiOutlineVideoCamera } from "react-icons/hi"

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div className="group transition-colors duration-200 hover:bg-[#1a1a24]/50">
      <div className="flex justify-between items-center px-7 py-3">
        <div className="flex items-center gap-3">
          <span className="text-purple-500 group-hover:scale-110 transition-transform duration-200">
            <HiOutlineVideoCamera size={18} />
          </span>
          <p className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">
            {subSec?.title}
          </p>
        </div>
        
        {/* Optional: Add duration if your subSec data has it */}
        {subSec?.duration && (
            <span className="text-[10px] text-zinc-600 font-medium">
                {subSec.duration}
            </span>
        )}
      </div>
    </div>
  )
}

export default CourseSubSectionAccordion