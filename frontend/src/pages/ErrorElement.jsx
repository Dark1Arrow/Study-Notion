import React from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';
import { VscRefresh, VscHome } from "react-icons/vsc"; // Optional: adding icons for better UX

const ErrorElement = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[450px] w-full p-8 rounded-2xl border border-purple-900/30 bg-richblack-900 relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600/10 blur-[100px] pointer-events-none" />

      {/* Glassmorphism Container */}
      <div className="z-10 flex flex-col items-center text-center">
        <div className="mb-6 p-4 rounded-full bg-purple-900/20 border border-purple-500/30 text-purple-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
          </svg>
        </div>

        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-500 mb-3">
          Execution Interrupted
        </h2>
        
        <p className="max-w-md text-richblack-300 font-medium mb-8 leading-relaxed italic">
          "{error.statusText || error.message || "An unexpected runtime error occurred."}"
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            onClick={() => navigate(0)}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all duration-300 active:scale-95"
          >
            <VscRefresh className="text-lg" />
            Try Again
          </button>
          
          <button
            onClick={() => navigate("/dashboard/my-profile")}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-richblack-800 text-purple-100 border border-purple-900/50 rounded-xl hover:bg-richblack-700 transition-all duration-300"
          >
            <VscHome className="text-lg" />
            Return Home
          </button>
        </div>
      </div>

      {/* Subtle Bottom Border Accent */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
    </div>
  );
};

export default ErrorElement;