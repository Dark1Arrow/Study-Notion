import React from 'react'

const IconBtn = ({ text, onClick, children, disabled, outline = false, customClasses, type }) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`flex items-center justify-center outline-none transition-all duration-300
                ${outline 
                    ? "border border-purple-500 bg-transparent text-purple-100 hover:bg-purple-500/10" 
                    : "bg-purple-600 text-white shadow-[0_4px_14px_0_rgba(147,51,234,0.39)] hover:bg-purple-500 hover:scale-95"
                } 
                cursor-pointer gap-x-2 rounded-lg py-2 px-5 font-semibold disabled:bg-purple-900/50 disabled:cursor-not-allowed ${customClasses}`}
            type={type}
        >
            {
                children ? (
                    <>
                        <span>{text}</span>
                        <span className="text-lg">{children}</span>
                    </>
                ) : (
                    <span>{text}</span>
                )
            }
        </button>
    )
}

export default IconBtn