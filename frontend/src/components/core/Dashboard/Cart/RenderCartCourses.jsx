import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"

import { removeFromCart } from "../../../../redux/slices/cartSlice"
import Img from '../../../common/Img';

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-1 flex-col">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className={`flex w-full flex-wrap items-start justify-between gap-6 transition-all duration-300 hover:bg-purple-900/10 p-4 rounded-xl ${
            indx !== cart.length - 1 && "border-b border-purple-800/30 pb-6"
          } ${indx !== 0 && "mt-6"} `}
        >
          <div className="flex flex-1 flex-col gap-4 xl:flex-row">
            {/* Course Thumbnail with a subtle purple border */}
            <div className="relative group">
              <Img
                src={course?.thumbnail}
                alt={course?.courseName}
                className="h-[148px] w-[220px] rounded-lg object-cover border border-purple-500/20 group-hover:border-purple-500/50 transition-all"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <p className="text-xl font-semibold text-purple-50">
                {course?.courseName}
              </p>
              <p className="text-sm text-purple-300/70">
                {course?.category?.name}
              </p>
              
              <div className="flex items-center gap-2">
                <span className="text-violet-400 font-bold">4.5</span>
                <ReactStars
                  count={5}
                  value={course?.ratingAndReviews?.length || 5}
                  size={20}
                  edit={false}
                  activeColor="#a855f7" // Purple-500 color
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <span className="text-purple-300/50">
                  ({course?.ratingAndReviews?.length} Ratings)
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-4">
            {/* Price with a subtle neon glow */}
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-purple-400 to-violet-200 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
              ₹ {course?.price}
            </p>

            {/* Delete Button with modern styling */}
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="group flex items-center gap-x-2 rounded-lg border border-purple-900/50 bg-purple-950/30 py-2 px-4 text-pink-400 hover:bg-pink-900/20 hover:border-pink-500/50 transition-all"
            >
              <RiDeleteBin6Line className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Remove</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}