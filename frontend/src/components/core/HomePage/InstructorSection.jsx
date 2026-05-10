import React from 'react'
import HighlightText from './/HighlightText'
import CTAButton from "./Button"
import { FaArrowRight } from 'react-icons/fa'
import Img from '../../common/Img';

import { motion } from 'framer-motion'
import { scaleUp } from '../../common/motionFrameVarient';

const InstructorSection = () => {
  return (
    <div className='mt-16'>
      <div className='flex flex-col-reverse lg:flex-row gap-10 lg:gap-20 items-center'>

        {/* Image Section with Purple Shadow */}
        <motion.div
          variants={scaleUp}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.1 }}
          className='lg:w-[50%]'
        >
          <div className='relative'>
            <Img
              src={"/home/coding bg5.jpg"}
              alt="Instructor"
              className='rounded-3xl shadow-[20px_20px_0px_0px] shadow-purple-600/20 object-cover'
            />
            {/* Subtle glow behind the image */}
            <div className='absolute -z-10 inset-0 bg-purple-600/10 blur-3xl rounded-full'></div>
          </div>
        </motion.div>

        {/* Text Section */}
        <div className='lg:w-[50%] flex flex-col'>
          <h1 className='text-3xl lg:text-4xl font-semibold w-[60%] mb-4 text-white leading-tight'>
            Become an <br />
            <HighlightText text={"Instructor"} />
          </h1>

          <p className='font-medium text-[16px] w-[90%] text-purple-200/70 mb-12 leading-relaxed'>
            Instructors from around the world teach millions of students on StudyNotion. 
            We provide the tools and skills to teach what you love. Join our community of 
            experts and share your knowledge globally.
          </p>

          <div className='w-fit'>
            <CTAButton active={true} linkto={"/signup"}>
              <div className='flex flex-row gap-2 items-center'>
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>

      </div>
    </div>
  )
}

export default InstructorSection