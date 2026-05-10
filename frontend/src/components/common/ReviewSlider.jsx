import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import Img from './Img';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

// Icons
import { FaStar } from "react-icons/fa"

// Get apiFunction and the endpoint
import { apiConnector } from "../../redux/api/apiConnector";
import { ratingsEndpoints } from "../../redux/api/api"

function ReviewSlider() {
  const [reviews, setReviews] = useState(null)
  const truncateWords = 15

  useEffect(() => {
    ; (async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      )
      if (data?.success) {
        setReviews(data?.data)
      }
    })()
  }, [])

  if (!reviews) return null;

  return (
    <div className="text-white">
      <div className="my-[50px] h-[200px] max-w-maxContentTab lg:max-w-maxContent mx-auto">
        <Swiper
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 bg-purple-950/20 border border-purple-900/50 p-4 text-[14px] min-h-[190px] rounded-xl transition-all duration-300 hover:border-purple-600/50 hover:bg-purple-900/30">
                  <div className="flex items-center gap-4">
                    <Img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-10 w-10 rounded-full object-cover border border-purple-500/30"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-purple-50 capitalize">
                        {`${review?.user?.firstName} ${review?.user?.lastName}`}
                      </h1>
                      <h2 className="text-[12px] font-medium text-purple-400/70">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>

                  <p className="font-medium text-purple-100/80 italic leading-relaxed">
                    "{review?.review.split(" ").length > truncateWords
                      ? `${review?.review.split(" ").slice(0, truncateWords).join(" ")} ...`
                      : `${review?.review}`}"
                  </p>

                  <div className="flex items-center gap-2 mt-auto">
                    <h3 className="font-bold text-purple-300">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#a855f7" // Bright purple star color
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider;