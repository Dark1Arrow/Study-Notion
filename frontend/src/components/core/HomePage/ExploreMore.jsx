import React, { useState } from "react";
import { HomePageExplore } from "../../../../data/homePageScroll";
import CourseCard from "./CourseCard";
import HighlightText from "./HighlightText";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];


const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
   <div className="relative w-full">
      {/* Explore more section */}
      <div>
        <div className="text-3xl lg:text-4xl font-semibold text-center my-10 text-white">
          Unlock the
          <HighlightText text={"Power of Code"} />
          <p className="text-center text-purple-200/60 text-base lg:text-lg font-semibold mt-1">
            Learn to Build Anything You Can Imagine
          </p>
        </div>
      </div>

      {/* Tabs Section - Updated to Dark Purple Theme */}
      <div className="hidden lg:flex gap-3 -mt-5 mx-auto w-max bg-purple-950/40 border border-purple-900/50 text-purple-200 p-1 rounded-full font-medium shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        {tabsName.map((ele, index) => {
          return (
            <div
              className={`text-[16px] flex flex-row items-center gap-2 px-7 py-[7px] rounded-full transition-all duration-300 cursor-pointer 
                ${currentTab === ele
                  ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]"
                  : "text-purple-200/70 hover:bg-purple-900/40 hover:text-purple-50"
                }`}
              key={index}
              onClick={() => setMyCards(ele)}
            >
              {ele}
            </div>
          );
        })}
      </div>

      {/* Spacer for the overlapping cards */}
      <div className="hidden lg:block lg:h-[600px]">

      {/* Cards Group */}
      <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom- lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] lg:mb-0 mb-7 lg:px-0 px-3 z-20">
        {courses.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              cardData={ele}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
      </div>
    </div>
  );
}

export default ExploreMore;