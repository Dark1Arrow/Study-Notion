import React from 'react'
import Img from '../../common/Img';
import { motion } from 'framer-motion'
import { fadeIn } from '../../common/motionFrameVarient';

// Import Icons from react-icons for a cleaner look
import { MdOutlineSecurity, MdOutlineFactCheck, MdOutlineSync, MdOutlinePsychology } from "react-icons/md";

const timeline = [
    {
        Logo: <MdOutlineSecurity />,
        heading: "Leadership",
        Description: "Fully committed to the success company",
    },
    {
        Logo: <MdOutlineFactCheck />,
        heading: "Responsibility",
        Description: "Students will always be our top priority",
    },
    {
        Logo: <MdOutlineSync />,
        heading: "Flexibility",
        Description: "The ability to switch is an important skill",
    },
    {
        Logo: <MdOutlinePsychology />,
        heading: "Solve the problem",
        Description: "Code your way to a solution",
    },
];

const TimelineSection = () => {
    return (
        <div className="py-20">
            <div className='flex flex-col lg:flex-row gap-16 items-center'>

                {/* Left Section - Timeline List */}
                <motion.div
                    variants={fadeIn('right', 0.1)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.1 }}
                    className='w-full lg:w-[45%] flex flex-col'>
                    {
                        timeline.map((element, index) => {
                            return (
                                <div className='flex flex-row gap-6 relative pb-10' key={index}>
                                    
                                    {/* The Vertical Dashed Line */}
                                    {index !== timeline.length - 1 && (
                                        <div className='absolute left-[25px] top-[50px] w-[1px] h-[calc(100%-40px)] border-l border-dashed border-purple-800'></div>
                                    )}

                                    {/* Logo Container */}
                                    <div className='w-[50px] h-[50px] rounded-full bg-purple-950/50 border border-purple-500/30 flex justify-center items-center text-purple-400 text-2xl shadow-[0_0_15px_rgba(168,85,247,0.1)] z-10 backdrop-blur-sm'>
                                        {element.Logo}
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        <h2 className='font-bold text-[18px] text-purple-50'>{element.heading}</h2>
                                        <p className='text-base text-purple-200/60'>{element.Description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </motion.div>

                {/* Right Section - Image & Stats Card */}
                <motion.div
                    variants={fadeIn('left', 0.1)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.1 }}
                    className='relative'>

                    <div className='relative shadow-[0_0_50px_rgba(147,51,234,0.15)] rounded-3xl overflow-hidden'>
                        <Img src={"/home/coding bg5.jpg"}
                            alt="timelineImage"
                            className='object-cover h-fit scale-x-[-1] w-[550px] rounded-3xl'
                        />
                        {/* Purple Overlay to blend image into theme */}
                        <div className="absolute inset-0 bg-purple-900/10 mix-blend-multiply"></div>
                    </div>

                    {/* Stats Floating Card - Updated to Purple Theme */}
                    <div className='absolute bg-purple-600 flex flex-col lg:flex-row text-white uppercase py-7 lg:py-10
                            left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)]'>
                        
                        <div className='flex flex-row gap-5 items-center border-b lg:border-b-0 lg:border-r border-purple-400/50 px-7 lg:px-14 pb-5 lg:pb-0'>
                            <p className='text-3xl lg:text-4xl font-bold'>10</p>
                            <p className='text-purple-200 text-xs lg:text-sm max-w-[70px]'>Years of Experience</p>
                        </div>

                        <div className='flex gap-5 items-center px-7 lg:px-14 pt-5 lg:pt-0'>
                            <p className='text-3xl lg:text-4xl font-bold'>250</p>
                            <p className='text-purple-200 text-xs lg:text-sm max-w-[70px]'>Types of Courses</p>
                        </div>

                    </div>

                </motion.div>
            </div>
        </div>
    )
}

export default TimelineSection;