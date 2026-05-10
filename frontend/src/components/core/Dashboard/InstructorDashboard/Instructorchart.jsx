import React, { useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend);

const Instructorchart = ({ courses }) => {
    const [currChart, setCurrChart] = useState("students")

    // Generates shades of purple and indigo for a cohesive look
    const generateThemeColors = (numColors) => {
        const colors = []
        for (let i = 0; i < numColors; i++) {
            const hue = Math.floor(Math.random() * (280 - 240) + 240); // Range of Purples/Indigos
            const saturation = Math.floor(Math.random() * (80 - 60) + 60);
            const lightness = Math.floor(Math.random() * (70 - 40) + 40);
            colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
        }
        return colors
    }

    const chartDataStudents = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentEnrolled),
                backgroundColor: generateThemeColors(courses.length),
                borderColor: '#161D29', // Rich Black border for segments
                borderWidth: 2,
            }
        ]
    }

    const chartIncomeData = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountGenerated),
                backgroundColor: generateThemeColors(courses.length),
                borderColor: '#161D29',
                borderWidth: 2,
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#AFB2BF', // text-richblack-300
                    font: { size: 12, family: 'Inter' }
                }
            }
        }
    }

    return (
        <div className="flex flex-1 flex-col gap-y-4 rounded-2xl border border-purple-900/30 bg-richblack-800 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="flex items-center justify-between">
                <p className="text-xl font-bold text-richblack-5 tracking-wide">Visualize Statistics</p>
                <div className="flex gap-x-2 bg-richblack-900 p-1 rounded-lg border border-richblack-700">
                    <button
                        onClick={() => setCurrChart("students")}
                        className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all duration-300 ${
                            currChart === "students"
                                ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]"
                                : "text-richblack-300 hover:text-purple-200"
                        }`}
                    >
                        Students
                    </button>
                    <button
                        onClick={() => setCurrChart("income")}
                        className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all duration-300 ${
                            currChart === "income"
                                ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]"
                                : "text-richblack-300 hover:text-purple-200"
                        }`}
                    >
                        Income
                    </button>
                </div>
            </div>

            <div className="relative mx-auto mt-4 aspect-square h-[300px] w-full">
                <Pie
                    key={currChart}
                    data={currChart === "students" ? chartDataStudents : chartIncomeData}
                    options={options}
                />
            </div>

            {/* Bottom Insight Section */}
            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-richblack-700 pt-4">
                <div className="text-center">
                    <p className="text-sm text-richblack-400">Total Courses</p>
                    <p className="text-lg font-bold text-purple-400">{courses.length}</p>
                </div>
                <div className="text-center">
                    <p className="text-sm text-richblack-400">Primary Focus</p>
                    <p className="text-lg font-bold text-purple-400 capitalize">{currChart}</p>
                </div>
            </div>
        </div>
    )
}

export default Instructorchart

// const Instructorchart = ({ courses }) => {
//     const [currChart, setCurrChart] = useState("students")

//     const genrateRandomColors = (numColors) => {
//         const colors = []
//         for (let i = 0; i < numColors; i++) {
//             const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
//             colors.push(color)
//         }
//         return colors
//     }

//     const chartDataStudents = {
//         labels: courses.map((course) => course.courseName),
//         datasets: [
//             {
//                 data: courses.map((course) => course.totalStudentEnrolled),
//                 backgroundColor: genrateRandomColors(courses.length),
//             }
//         ]
//     }

//     const chartIncomeData = {
//         labels: courses.map((course) => course.courseName),
//         datasets: [
//             {
//                 data: courses.map((course) => course.totalAmountGenerated),
//                 backgroundColor: genrateRandomColors(courses.length),
//             }
//         ]
//     }

//     const options = {
//         maintainAspectRatio: false
//     }


//     return (
//         <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-gray-800 p-6">
//             <p className="text-lg font-bold text-gray-50">Visualize</p>

//             <div className="space-x-4 font-semibold">
//                 {/* Button to switch to the "students" chart */}
//                 <button
//                     onClick={() => setCurrChart("students")}
//                     className={`rounded-sm p-1 px-3 transition-all duration-200 ${currChart === "students"
//                         ? "bg-gray-700 text-yellow-50"
//                         : "text-yellow-400"
//                         }`}
//                 >
//                     Students
//                 </button>

//                 {/* Button to switch to the "income" chart */}
//                 <button
//                     onClick={() => setCurrChart("income")}
//                     className={`rounded-sm p-1 px-3 transition-all duration-200 ${currChart === "income"
//                         ? "bg-gray-700 text-yellow-50"
//                         : "text-yellow-400"
//                         }`}
//                 >
//                     Income
//                 </button>
//             </div>

//             <div className="relative mx-auto aspect-square h-full w-full">
//                 {/* Render the Pie chart based on the selected chart */}
//                 <Pie
//                     data={currChart === "students" ? chartDataStudents : chartIncomeData}
//                     options={options}
//                 />
//             </div>
//         </div>
//     )
// }

// export default Instructorchart
