import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import ReactStars from "react-rating-stars-component"
import { useSelector } from "react-redux"

import { createRating } from "../../../redux/api/operation/courseDetailsApi"
import IconBtn from '../../common/IconBtn';
import Img from '../../common/Img';

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
  }, [setValue])

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating)
  }

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )
    setReviewModal(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-black/60 backdrop-blur-md">
      <div className="my-10 w-11/12 max-w-[600px] rounded-2xl border border-purple-500/20 bg-[#0a0a0c] shadow-2xl shadow-purple-500/10">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-purple-900/40 to-violet-950/40 p-5 border-b border-purple-500/10">
          <p className="text-xl font-bold text-purple-50">Add Your Review</p>
          <button 
            onClick={() => setReviewModal(false)}
            className="hover:rotate-90 transition-transform duration-200"
          >
            <RxCross2 className="text-2xl text-purple-200" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4 mb-8">
            <Img
              src={user?.image}
              alt={user?.firstName + " profile"}
              className="aspect-square w-[55px] rounded-full object-cover border-2 border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
            />
            <div className="">
              <p className="font-bold text-purple-50 capitalize">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs font-medium text-purple-300/60 uppercase tracking-widest">
                Posting Publicly
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center"
          >
            <div className="mb-6 bg-purple-900/10 p-3 rounded-xl border border-purple-500/10">
                <ReactStars
                count={5}
                onChange={ratingChanged}
                size={32}
                activeColor="#a855f7" // Purple stars
                emptyIcon={<i className="far fa-star"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                />
            </div>

            <div className="flex w-full flex-col space-y-2">
              <label
                className="text-sm font-semibold text-purple-200/80"
                htmlFor="courseExperience"
              >
                Share your experience <sup className="text-pink-400">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="What did you think of the course?..."
                {...register("courseExperience", { required: true })}
                className="w-full min-h-[140px] rounded-xl bg-purple-950/20 border border-purple-500/20 p-4 text-purple-50 placeholder:text-purple-300/30 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all resize-none"
              />
              {errors.courseExperience && (
                <span className="ml-1 text-xs font-medium text-pink-400">
                  Please add your feedback to submit
                </span>
              )}
            </div>

            {/* Modal Buttons */}
            <div className="mt-8 flex w-full justify-end gap-x-3">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="rounded-xl border border-purple-900/50 bg-transparent px-6 py-2.5 font-bold text-purple-300 hover:bg-purple-900/20 transition-all"
              >
                Cancel
              </button>
              <IconBtn 
                text="Post Review" 
                customClasses="bg-gradient-to-r from-purple-600 to-violet-700 px-8 rounded-xl font-bold hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}