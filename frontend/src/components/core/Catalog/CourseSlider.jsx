import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/navigation"

import Course_Card from "./CourseCard"

function CourseSlider({ Courses }) {
  return (
    <div className="relative">
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-12 pt-4"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i} className="py-2">
              <Course_Card course={course} Height={"h-[220px]"} />
            </SwiperSlide>
          ))}
          
          {/* Custom Purple Pagination dots (handled via CSS in your global index.css) */}
        </Swiper>
      ) : (
        /* Minimal Skeleton Loader */
        <div className="flex gap-6 py-4">
          {[1, 2, 3].map((_, i) => (
            <div 
              key={i} 
              className={`h-[300px] w-full rounded-md bg-[#121212] animate-pulse ${i > 0 ? 'hidden md:block' : ''}`}
            >
              <div className="h-[200px] bg-zinc-900 rounded-t-md mb-4" />
              <div className="h-4 w-3/4 bg-zinc-900 mx-4 mb-2 rounded" />
              <div className="h-4 w-1/2 bg-zinc-900 mx-4 rounded" />
            </div>
          ))}
        </div>
      )}
      
      {/* Optional: Add this to your index.css to make Swiper dots purple */}
      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-pagination-bullet { background: #52525b !important; opacity: 1; }
        .swiper-pagination-bullet-active { background: #a855f7 !important; width: 24px !important; border-radius: 4px !important; transition: all 0.3s; }
      `}} />
    </div>
  )
}

export default CourseSlider