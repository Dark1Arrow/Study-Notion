import React from "react";
import CTAButton from "./Button";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";

const CodeBlocks = ({
    position,
    heading,
    subheading,
    ctabtn1,
    ctabtn2,
    codeblock,
    backgroundGradient,
    codeColor,
}) => {
    return (
        <div className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10`}>

            {/* Section 1: Text Content */}
            <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
                {heading}

                {/* Sub Heading - Updated to themed purple-grey */}
                <div className="text-purple-200/60 text-base font-bold w-[85%] -mt-3">
                    {subheading}
                </div>

                {/* Button Group */}
                <div className="flex gap-7 mt-7">
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
                        <div className="flex items-center gap-2">
                            {ctabtn1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
                        {ctabtn2.btnText}
                    </CTAButton>
                </div>
            </div>

            {/* Section 2: Code Editor Look */}
            <div className="h-fit code-border border border-purple-900/50 bg-purple-950/10 backdrop-blur-sm rounded-xl flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px] shadow-[0_0_30px_rgba(147,51,234,0.1)]">

                {/* Background Glow Element */}
                <div className={`absolute ${backgroundGradient} opacity-20 blur-3xl w-full h-full -z-10`}></div>

                {/* Indexing - Updated to purple-400 */}
                <div className="text-center flex flex-col w-[10%] select-none text-purple-400/40 font-inter font-bold border-r border-purple-900/30 mr-2">
                    {[...Array(11)].map((_, i) => (
                        <p key={i}>{i + 1}</p>
                    ))}
                </div>

                {/* Codes Display */}
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
                    <TypeAnimation
                        sequence={[codeblock, 2000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        style={{
                            whiteSpace: "pre-line",
                            display: "block",
                            overflowX: "hidden",
                            fontSize: "14px", // Adjusted for better fit
                        }}
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default CodeBlocks;