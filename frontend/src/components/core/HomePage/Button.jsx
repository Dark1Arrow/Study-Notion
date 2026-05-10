import React from 'react'
import { Link } from "react-router-dom"

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold
        ${active 
          ? "bg-purple-600 text-white shadow-[2px_2px_12px_rgba(147,51,234,0.4)]" 
          : "bg-purple-950/40 text-purple-100 border border-purple-800/50"
        }
        hover:scale-95 hover:shadow-none transition-all duration-200
      `}>
        {children}
      </div>
    </Link>
  )
}

export default Button