import React, { useEffect, useState } from "react"
import { FaStar } from "react-icons/fa"
import { Link } from "react-router-dom"
import GetAvgRating from "../../../redux/avgRating"
import Img from '../../common/Img';

function CourseCard({ course, Height }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])

  return (
    <Link to={`/courses/${course._id}`} className="group block">
      <div className="flex flex-col gap-3">
        {/* Sharp, Clean Image */}
        <div className="relative overflow-hidden rounded-md bg-[#121212]">
          <Img
            src={course?.thumbnail}
            alt={course?.courseName}
            className={`${Height} w-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-300`}
          />
        </div>

        {/* Content - No borders or boxes */}
        <div className="flex flex-col gap-1 px-1">
          <h3 className="text-base font-medium text-zinc-100 group-hover:text-purple-400 transition-colors duration-200">
            {course?.courseName}
          </h3>
          
          <p className="text-xs text-zinc-500 lowercase">
            by {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>

          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1 text-purple-500">
              <span className="text-xs font-bold">{avgReviewCount || 0}</span>
              <FaStar size={10} />
            </div>
            <span className="text-[10px] text-zinc-600 uppercase tracking-widest">
              {course?.ratingAndReviews?.length} ratings
            </span>
          </div>

          <p className="text-sm font-semibold text-zinc-200 mt-1">
            ₹{course?.price}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard