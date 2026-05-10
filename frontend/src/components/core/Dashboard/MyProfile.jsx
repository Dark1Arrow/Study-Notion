import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Img from "../../common/Img"
import IconBtn from "../../common/IconBtn"
import { RiEditBoxLine } from "react-icons/ri"
import formattedDate from "../../../../../backend/utils/formattedDate"

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Reusable glass container style
  const cardStyle = "flex rounded-2xl border border-purple-900/50 bg-gray-800 p-8 px-7 sm:px-12 backdrop-blur-sm shadow-[0_4px_30px_rgba(0,0,0,0.1)]"

  return (
    <div className="max-w-[1000px] mx-auto">
      <h1 className="mb-14 text-4xl font-medium text-white font-boogaloo text-center sm:text-left tracking-wide">
        My Profile
      </h1>

      {/* Section 1: Basic Info */}
      <div className={`items-center justify-between ${cardStyle}`}>
        <div className="flex items-center gap-x-4">
          <Img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover border-2 border-purple-500/30"
          />
          <div className="space-y-1">
            <p className="text-xl font-semibold text-white capitalize">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-purple-200/60 font-medium">
              {user?.email}
            </p>
          </div>
        </div>

        <IconBtn
          text="Edit"
          onClick={() => { navigate("/dashboard/settings") }}
          customClasses="bg-purple-600 hover:bg-purple-500 transition-all duration-300"
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      {/* Section 2: About */}
      <div className={`my-10 flex-col gap-y-6 ${cardStyle}`}>
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-white">About</p>
          <IconBtn
            text="Edit"
            onClick={() => { navigate("/dashboard/settings") }}
            customClasses="bg-purple-600 hover:bg-purple-500 transition-all duration-300"
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p className={`${user?.additionalDetails?.about ? "text-purple-50" : "text-purple-200/40"} text-sm font-medium leading-relaxed`}>
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>

      {/* Section 3: Personal Details */}
      <div className={`my-10 flex-col gap-y-10 ${cardStyle}`}>
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-white">Personal Details</p>
          <IconBtn
            text="Edit"
            onClick={() => { navigate("/dashboard/settings") }}
            customClasses="bg-purple-600 hover:bg-purple-500 transition-all duration-300"
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
          {/* Column 1 */}
          <div className="flex flex-col gap-y-6">
            <div>
              <p className="mb-2 text-sm text-purple-400 font-medium">First Name</p>
              <p className="text-sm font-semibold text-white capitalize">{user?.firstName}</p>
            </div>
            <div>
              <p className="mb-2 text-sm text-purple-400 font-medium">Account Type</p>
              <p className="text-sm font-semibold text-white capitalize">{user?.accountType}</p>
            </div>
            <div>
              <p className="mb-2 text-sm text-purple-400 font-medium">Email</p>
              <p className="text-sm font-semibold text-white">{user?.email}</p>
            </div>
            <div>
              <p className="mb-2 text-sm text-purple-400 font-medium">Gender</p>
              <p className="text-sm font-semibold text-white capitalize">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-y-6">
            <div>
              <p className="mb-2 text-sm text-purple-400 font-medium">Last Name</p>
              <p className="text-sm font-semibold text-white capitalize">{user?.lastName}</p>
            </div>
            <div>
              <p className="mb-2 text-sm text-purple-400 font-medium">Phone Number</p>
              <p className="text-sm font-semibold text-white capitalize">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-purple-400 font-medium">Date Of Birth</p>
              <p className="text-sm font-semibold text-white capitalize">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Add Date of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile