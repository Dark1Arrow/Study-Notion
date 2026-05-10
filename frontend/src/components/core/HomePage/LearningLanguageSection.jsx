import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "./Button"

const LearningLanguageSection = () => {
    return (
        <div className='mt-[130px] mb-10'>
            <div className='flex flex-col gap-5 items-center'>

                {/* Heading */}
                <div className='text-3xl lg:text-4xl font-semibold text-center text-white'>
                    Your Swiss Knife for
                    <HighlightText text={" learning any language"} />
                </div>

                {/* Sub-heading - Updated to purple-tinted gray */}
                <div className='lg:text-center text-purple-200/60 mx-auto text-base font-medium lg:w-[70%] leading-relaxed'>
                    Using spin making learning multiple languages easy. With 20+ languages, 
                    realistic voice-over, progress tracking, custom schedules and more.
                </div>

                {/* Overlapping Images with Purple Shadows */}
                <div className='flex flex-col lg:flex-row items-center justify-center mt-8'>
                    <img
                        src={"/home/coding bg5.jpg"}
                        alt="KnowYourProgress"
                        className='object-contain lg:-mr-32 rounded-3xl shadow-[0_0_25px_rgba(147,51,234,0.15)] hover:z-50 transition-all duration-300'
                    />
                    <img
                        src={"/home/coding bg5.jpg"}
                        alt="CompareWithOthers"
                        className='object-contain rounded-3xl shadow-[0_0_25px_rgba(147,51,234,0.15)] z-10 hover:scale-105 transition-all duration-300'
                    />
                    <img
                        src={"/home/coding bg5.jpg"}
                        alt="PlanYourLesson"
                        className='object-contain lg:-ml-36 rounded-3xl shadow-[0_0_25px_rgba(147,51,234,0.15)] hover:z-50 transition-all duration-300'
                    />
                </div>

                {/* CTA Button */}
                <div className='w-fit mt-8'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div>
                            Learn more
                        </div>
                    </CTAButton>
                </div>

            </div>
        </div>
    )
}

export default LearningLanguageSection