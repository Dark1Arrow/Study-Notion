import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"

import { addToCart } from "../../../redux/slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../redux/constant"
import Img from './../../common/Img';

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructors cannot purchase courses.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add to cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  const isEnrolled = user && course?.studentsEnrolled?.includes(user?._id);

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-[#111115] border border-white/5 p-5 text-zinc-300 shadow-2xl shadow-purple-900/10">
      {/* Course Image with subtle glow */}
      <div className="relative group overflow-hidden rounded-xl border border-white/10">
        <Img
          src={ThumbnailImage}
          alt={course?.courseName}
          className="max-h-[300px] min-h-[180px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60" />
      </div>

      <div className="px-2">
        <div className="pb-4 text-3xl font-bold text-white tracking-tighter">
          ₹{CurrentPrice}
        </div>

        <div className="flex flex-col gap-3">
          <button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-all duration-200 active:scale-95"
            onClick={isEnrolled ? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse}
          >
            {isEnrolled ? "Go To Course" : "Buy Now"}
          </button>
          
          {!isEnrolled && (
            <button 
              onClick={handleAddToCart} 
              className="w-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white font-bold py-3 rounded-lg transition-all duration-200"
            >
              Add to Cart
            </button>
          )}
        </div>

        <p className="pb-6 pt-4 text-center text-[11px] uppercase tracking-widest text-zinc-500 font-medium">
          30-Day Money-Back Guarantee
        </p>

        <div className="space-y-4">
          <p className="text-sm font-bold text-white uppercase tracking-wider">
            Requirements :
          </p>
          <div className="flex flex-col gap-2">
            {course?.instructions?.map((item, i) => (
              <p className="flex items-start gap-2 text-xs leading-relaxed text-zinc-400" key={i}>
                <BsFillCaretRightFill className="text-purple-500 mt-1 shrink-0" />
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/5">
          <button
            className="flex items-center justify-center gap-2 w-full py-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
            onClick={handleShare}
          >
            <FaShareSquare size={14} /> Share this course
          </button>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailsCard