import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className="text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white leading-relaxed">
        We are passionate about revolutionizing the way we learn. Our
        innovative platform <HighlightText text={"combines technology"} />,{" "}
        
        {/* Updated 'expertise' to a vibrant purple-to-pink gradient */}
        <span className="bg-gradient-to-b from-[#bc61f3] to-[#ff00ff] text-transparent bg-clip-text font-bold drop-shadow-[0_0_10px_rgba(188,97,243,0.3)]">
            {" "}
            expertise
        </span>
        , and community to create an
        
        {/* Updated 'unparalleled educational experience' to a deep purple-to-blue gradient */}
        <span className="bg-gradient-to-b from-[#8b23e1] to-[#12D8FA] text-transparent bg-clip-text font-bold drop-shadow-[0_0_10px_rgba(139,35,225,0.3)]">
            {" "}
            unparalleled educational experience.
        </span> 
    </div>
  )
}

export default Quote