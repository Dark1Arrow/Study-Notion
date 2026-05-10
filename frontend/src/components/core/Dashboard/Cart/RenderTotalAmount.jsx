import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import IconBtn from "../../../common/IconBtn"
import { buyCourse } from "../../../../redux/api/operation/studentFeaturesApi"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = async () => {
    const courses = cart.map((course) => course._id)
    await buyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className="min-w-[280px] rounded-2xl border border-purple-500/30 bg-gradient-to-b from-purple-900/20 to-black/50 p-6 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)]">
      {/* Label */}
      <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-purple-300/70">
        Total Amount
      </p>
      
      {/* Price with neon effect */}
      <p className="mb-6 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-200">
        ₹ {total}
      </p>

      {/* Checkout Button */}
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-500 hover:to-violet-600 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-purple-900/40 border border-purple-400/20"
      />

      {/* Trust Badge / Footer Note */}
      <p className="mt-4 text-center text-xs text-purple-400/50">
        Secure checkout powered by Razorpay
      </p>
    </div>
  )
}