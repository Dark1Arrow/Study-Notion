import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { GiReturnArrow } from 'react-icons/gi'
import { MdOutlineVerified } from 'react-icons/md'
import { toast } from "react-toastify"

import ConfirmationModal from "../components/common/ConformationModel"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStar"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { fromatDate } from "../services/formatDate"
import { getCourseDetails } from "../redux/api/operation/courseDetailsApi"
import { buyCourse } from "../redux/api/operation/studentFeaturesApi"
import GetAvgRating from "../redux/avgRating"
import { ACCOUNT_TYPE } from '../redux/constant'
import { addToCart } from "../redux/slices/cartSlice"
import Img from './../components/common/Img'
import ConformationModel from "../components/common/ConformationModel"

function CourseDetails() {
  const { user, loading } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { paymentLoading } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { courseId } = useParams()

  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [isActive, setIsActive] = useState([])
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)

  useEffect(() => {
    const fetchCourseDetailsData = async () => {
      try {
        const res = await getCourseDetails(courseId)
        setResponse(res)
      } catch (error) {
        console.log("Could not fetch Course Details")
      }
    }
    fetchCourseDetailsData()
  }, [courseId])

  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews)
    setAvgReviewCount(count)

    let lectures = 0
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [response])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleActive = (id) => {
    setIsActive(!isActive.includes(id) ? isActive.concat([id]) : isActive.filter((e) => e !== id))
  }

  if (paymentLoading || loading || !response) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] p-8 flex flex-col gap-6 pt-24">
        <div className="h-12 w-2/3 bg-zinc-900 animate-pulse rounded-md" />
        <div className="h-6 w-1/2 bg-zinc-900 animate-pulse rounded-md" />
        <div className="h-96 w-full bg-zinc-900 animate-pulse rounded-xl mt-10" />
      </div>
    )
  }

  const {
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    instructor,
    studentsEnrolled,
    createdAt,
    tag
  } = response?.data?.courseDetails

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  const handleAddToCart = () => {
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructors cannot purchase courses.")
      return
    }
    if (token) {
      dispatch(addToCart(response?.data.courseDetails))
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

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-zinc-300 font-sans antialiased">
      {/* Hero Header */}
      <div className="relative bg-[#0d0d12] border-b border-purple-900/20">
        <div className="mx-auto box-content px-4 py-12 lg:w-[1260px] 2xl:relative">
          <div className="max-w-maxContentTab lg:mx-0 xl:max-w-[810px] flex flex-col gap-6">
            
            <button onClick={() => navigate(-1)} className="w-fit transition-transform hover:scale-110">
              <GiReturnArrow className="w-8 h-8 text-purple-500" />
            </button>

            <div className="lg:hidden w-full overflow-hidden rounded-2xl border border-white/5">
              <Img src={thumbnail} className="w-full object-cover" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              {courseName}
            </h1>
            
            <p className="text-zinc-400 text-lg max-w-2xl">
                {courseDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-purple-400 font-bold">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
              </div>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400">{studentsEnrolled.length} enrolled</span>
            </div>

            <div className="flex items-center gap-3">
              <Img src={instructor.image} className="h-10 w-10 rounded-full border border-purple-500/30" />
              <p className="text-sm">
                Created by <span className="text-white font-medium underline underline-offset-4 decoration-purple-500/50">{instructor.firstName} {instructor.lastName}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-xs uppercase tracking-widest text-zinc-500 font-bold">
              <span className="flex items-center gap-2"><BiInfoCircle className="text-purple-500" /> Updated {fromatDate(createdAt)}</span>
              <span className="flex items-center gap-2"><HiOutlineGlobeAlt className="text-purple-500" /> English</span>
            </div>

            {/* Mobile Actions */}
            <div className="flex flex-col gap-4 py-6 border-t border-white/5 lg:hidden">
              <p className="text-3xl font-bold text-white">₹{price}</p>
              <button onClick={handleBuyCourse} className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-bold transition-all">Buy Now</button>
              <button onClick={handleAddToCart} className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white py-3 rounded-md font-bold transition-all">Add to Cart</button>
            </div>
          </div>

          {/* Desktop Card */}
          <div className="hidden lg:block absolute right-4 top-12 w-[400px] z-20">
            
            <CourseDetailsCard 
              course={response?.data?.courseDetails} 
              setConfirmationModal={setConfirmationModal} 
              handleBuyCourse={handleBuyCourse} 
            />
          </div>
        </div>
      </div>

      <main className="mx-auto box-content px-4 py-12 lg:w-[1260px]">
        <div className="max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          
          {/* Learning Goals */}
          <section className="mb-16 border border-zinc-900 rounded-xl p-8 bg-[#0d0d12]">
            <h2 className="text-2xl font-bold text-white mb-6">What you'll learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm leading-relaxed">
              {whatYouWillLearn?.split('\n').map((line, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-purple-500 font-bold">{i + 1}.</span>
                  <p>{line}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Content Sections */}
          <section className="mb-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-white">Course Content</h2>
              <div className="flex gap-4 text-xs font-bold text-zinc-500 tracking-wider">
                <span>{courseContent.length} SECTIONS</span>
                <span>{totalNoOfLectures} LECTURES</span>
                <button onClick={() => setIsActive([])} className="text-purple-400 hover:text-purple-300">COLLAPSE ALL</button>
              </div>
            </div>
            <div className="border border-zinc-900 rounded-lg overflow-hidden">
              {courseContent?.map((section, index) => (
                <CourseAccordionBar course={section} key={index} isActive={isActive} handleActive={handleActive} />
              ))}
            </div>
          </section>

          {/* Instructor Bio */}
          <section className="pb-24 border-t border-zinc-900 pt-16">
            <h2 className="text-2xl font-bold text-white mb-8">Your Instructor</h2>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <Img src={instructor.image} className="h-24 w-24 rounded-full object-cover grayscale-[0.2]" />
              <div className="flex flex-col gap-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h3 className="text-xl font-bold text-white">{instructor.firstName} {instructor.lastName}</h3>
                  <MdOutlineVerified className="text-blue-400" />
                </div>
                <p className="text-zinc-500 max-w-xl text-sm leading-loose">
                  {instructor?.additionalDetails?.about || "Expert instructor dedicated to your success."}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    {  console.log(confirmationModal)}
      {confirmationModal && <ConformationModel modelData ={confirmationModal} />}
    </div>
  )
}

export default CourseDetails