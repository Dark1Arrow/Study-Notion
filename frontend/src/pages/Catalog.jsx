import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Footer from "../components/common/Footer"
import Course_Card from '../components/core/Catalog/CourseCard'
import Course_Slider from "../components/core/Catalog/CourseSlider"
import Loading from '../components/common/Loading';
import { getCatalogPageData } from '../redux/api/operation/pageAndComponentData'
import { fetchCourseCategories } from '../redux/api/operation/courseDetailsApi';
import { useDispatch } from "react-redux"

function Catalog() {
    const { catalogName } = useParams()
    const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null)
    const [categoryId, setCategoryId] = useState("")
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    // Fetch All Categories (Logic remains identical)
    useEffect(() => {
        ; (async () => {
            try {
                const res = await fetchCourseCategories();
                const category_id = res.filter(
                    (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
                )[0]._id
                setCategoryId(category_id)
            } catch (error) {
                console.log("Could not fetch Categories.", error)
            }
        })()
    }, [catalogName])

    useEffect(() => {
        if (categoryId) {
            ; (async () => {
                setLoading(true)
                try {
                    const res = await dispatch(getCatalogPageData(categoryId))
                    setCatalogPageData(res)
                } catch (error) {
                    console.log(error)
                }
                setLoading(false)
            })()
        }
    }, [categoryId, dispatch])

    if (loading) {
        return (
            <div className="grid min-h-screen place-items-center bg-[#050505]">
                <Loading />
            </div>
        )
    }

    if (!loading && !catalogPageData) {
        return (
            <div className="text-purple-200 text-3xl flex justify-center items-center min-h-screen bg-[#050505]">
                No Courses found for selected Category
            </div>)
    }

    return (
        <div className="bg-[#09090b] min-h-screen font-inter ">
            {/* Hero Section - Deep Purple Gradient */}
            <div className="px-10 relative overflow-hidden bg-gradient-to-b from-[#1a0b2e] to-[#09090b] border-b border-purple-900/30">
                <div className="mx-auto flex min-h-[300px] max-w-maxContentTab flex-col justify-center gap-4 px-4 lg:max-w-maxContent">
                    <nav className="flex items-center gap-2 text-sm font-medium text-purple-400/80">
                        <span>Home</span>
                        <span className="text-gray-600">/</span>
                        <span>Catalog</span>
                        <span className="text-gray-600">/</span>
                        <span className="text-purple-300 italic">
                            {catalogName?.replace("-", " ")}
                        </span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                        {catalogPageData?.selectdCategory?.name}
                    </h1>
                    <p className="max-w-[800px] text-lg text-gray-400 leading-relaxed">
                        {catalogPageData?.selectdCategory?.description}
                    </p>
                </div>
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full"></div>
            </div>

            {/* Section 1: Popular/New Tabs */}
            <div className="px-10 mx-auto box-content w-full max-w-maxContentTab px-4 py-16 lg:max-w-maxContent">
                <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-purple-600 pl-4">
                    Courses to get you started
                </h2>
                
                <div className="my-6 flex gap-x-6 border-b border-white/10 text-base font-medium">
                    <button
                        className={`pb-3 transition-all duration-300 ${active === 1
                            ? "border-b-2 border-purple-500 text-purple-400"
                            : "text-gray-500 hover:text-gray-300"
                            }`}
                        onClick={() => setActive(1)}
                    >
                        Most Popular
                    </button>
                    <button
                        className={`pb-3 transition-all duration-300 ${active === 2
                            ? "border-b-2 border-purple-500 text-purple-400"
                            : "text-gray-500 hover:text-gray-300"
                            }`}
                        onClick={() => setActive(2)}
                    >
                        New Releases
                    </button>
                </div>

                <div className="mt-8">
                    <Course_Slider
                        Courses={catalogPageData?.selectdCategory?.courses}
                    />
                </div>
            </div>

            {/* Section 2: Different Category */}
            <div className="px-10 bg-[#0c0c11] py-16">
                <div className="mx-auto box-content w-full max-w-maxContentTab px-4 lg:max-w-maxContent">
                    <h2 className="text-2xl font-bold text-white mb-8">
                        Top courses in <span className="text-purple-500">{catalogPageData?.diffrentCategory?.name}</span>
                    </h2>
                    <Course_Slider
                        Courses={catalogPageData?.diffrentCategory?.courses}
                    />
                </div>
            </div>

            {/* Section 3: Frequently Bought Grid */}
            <div className="px-10 mx-auto box-content w-full max-w-maxContentTab  py-20 lg:max-w-maxContent">
                <h2 className="text-2xl font-bold text-white mb-10 text-center lg:text-left">
                    Frequently Bought Together
                </h2>
                <div className="py-4">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
                        {catalogPageData?.mostSellingCourses
                            ?.slice(0, 4)
                            .map((course, i) => (
                                <div key={i} className="transition-transform duration-300 hover:scale-[1.02]">
                                    <Course_Card course={course} Height={"h-[350px]"} />
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Catalog