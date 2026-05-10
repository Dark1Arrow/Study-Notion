import React from 'react'

const HighlightText = ({ text }) => {
  return (
    <span className='font-bold bg-gradient-to-b from-[#bc61f3] via-[#8b23e1] to-[#4e0ca4] text-transparent bg-clip-text'>
      {" "}
      {text}
    </span>
  )
}

export default HighlightText