import React from "react";

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  const isActive = currentCard === cardData?.heading;

  return (
    <div
      className={`w-[360px] lg:w-[30%] h-[300px] box-border cursor-pointer transition-all duration-300 rounded-xl
        ${isActive
          ? "bg-purple-700 shadow-[12px_12px_0_0] shadow-purple-500/20 text-white scale-105 z-10"
          : "bg-purple-950/20 border border-purple-900/50 text-purple-200 hover:bg-purple-900/30"
        }`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      {/* Top Content Section */}
      <div className={`border-b-[2px] border-dashed h-[80%] p-6 flex flex-col gap-3 
        ${isActive ? "border-purple-400/50" : "border-purple-900/50"}`}
      >
        <div className={`font-semibold text-[20px] transition-colors duration-300
          ${isActive ? "text-white" : "text-purple-50"}`}
        >
          {cardData?.heading}
        </div>

        <div className={`transition-colors duration-300
          ${isActive ? "text-purple-100" : "text-purple-200/60"}`}
        >
          {cardData?.description}
        </div>
      </div>

      {/* Footer Section */}
      <div
        className={`flex justify-between px-6 py-3 font-medium transition-colors duration-300
          ${isActive ? "text-white" : "text-purple-400"}`}
      >
        {/* Level */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers className={isActive ? "text-white" : "text-purple-400"} />
          <p>{cardData?.level}</p>
        </div>

        {/* Flow Chart / Lesson Number */}
        <div className="flex items-center gap-2 text-[16px]">
          <ImTree className={isActive ? "text-white" : "text-purple-400"} />
          <p>{cardData?.lessionNumber} Lessions</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;