import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <div className="min-h-screen bg-transparent p-4 sm:p-8">
      {/* Header Section */}
      <div className="mb-8 border-b border-purple-900/50 pb-6">
        <h1 className="bg-gradient-to-r from-purple-400 to-violet-600 bg-clip-text text-4xl font-bold text-transparent font-boogaloo text-center sm:text-left">
          Your Shopping Cart
        </h1>
        <p className="mt-2 text-lg font-medium text-purple-200/60">
          {totalItems} {totalItems === 1 ? "Course" : "Courses"} in Cart
        </p>
      </div>

      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-12 gap-y-10 lg:flex-row">
          {/* List of Courses Container */}
          <div className="flex-1 w-full rounded-2xl border border-purple-900/30 bg-black/40 p-6 backdrop-blur-sm shadow-xl shadow-purple-900/10">
            <RenderCartCourses />
          </div>

          {/* Checkout/Summary Sidebar */}
          <div className="w-full lg:w-[400px] sticky top-8 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-gray-900 to-black p-6 shadow-2xl shadow-purple-500/20">
            <RenderTotalAmount />
          </div>
        </div>
      ) : (
        <div className="mt-20 flex flex-col items-center justify-center space-y-4">
          <div className="rounded-full bg-purple-900/20 p-6">
             <svg className="w-16 h-16 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="Open-Cart-Icon-Path-Here" />
             </svg>
          </div>
          <p className="text-center text-2xl font-semibold text-purple-100/80">
            Your cart is feeling a bit light!
          </p>
          <button className="rounded-full bg-purple-600 px-8 py-2 text-white hover:bg-purple-700 transition-all">
            Explore Courses
          </button>
        </div>
      )}
    </div>
  )
}