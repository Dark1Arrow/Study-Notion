import React from 'react'
import SignupForm from './SignupForm'
import Loginform from './Loginform'

const Template = ({title, description1, description2, image, formType}) => {
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-black">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
            
            {/* Left Side: Text and Form */}
            <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-white">
                    {title}
                </h1>
                <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
                    <span className="text-purple-200/70">{description1}</span>{" "}
                    <span className="font-edu-sa font-bold italic text-purple-400">
                        {description2}
                    </span>
                </p>

                {formType === "signup" ? <SignupForm/> : <Loginform/> }
            </div>

            {/* Right Side: Image with Decorative Glow */}
            <div className="relative mx-auto w-11/12 max-w-[550px] md:mx-0">
                {/* Background Purple Glow behind image */}
                <div className="absolute -top-10 -left-10 w-full h-full bg-purple-600/10 blur-[100px] rounded-full -z-10"></div>
                
                <img 
                    src={image} 
                    alt={formType} 
                    className="relative z-10 w-full h-full object-cover rounded-2xl shadow-[0_0_20px_rgba(139,35,225,0.2)]" 
                />
            </div>
        </div>
    </div>
  )
}

export default Template