import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Img from "../../../common/Img"
import IconBtn from "../../../common/IconBtn"
import { FiUpload } from "react-icons/fi"
import {updateUserProfileImage} from "../../../../redux/api/operation/settingApi.js"

const ChangeProfilePicture = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [previousSource, setPreviousSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
      fileInputRef.current.click()
  }

  const handleFileChange = (e) =>{
      const file = e.target.files[0]

      if(file){
        setProfileImage(file)
        previewFile(file)
      }
  }

  const previewFile = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPreviousSource(reader.result)
      }
  }

  const handleFileUpload = () => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("profileImage", profileImage)

      dispatch(updateUserProfileImage(token,formData)).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.log("Error message : ",error.message)
    }
  }

  useEffect(() => {
    if(profileImage){
      previewFile(profileImage)
    }
  },[profileImage])
  
  return (
    <div className="flex items-center justify-between rounded-md border-[1px] border-gray-700 bg-gray-800 p-8 px-3 sm:px-12 text-gray-5">
      <div className="flex items-center gap-x-4">
        <Img
          src={previousSource || user?.image}
          alt={`profile-${user?.firstName}`}
          className={"aspect-square w-[78px] rounded-full object-cover"}
        />
      </div>

      <div className="space-y-2">
        <p className="font-medium">Change Profile Picture</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png , image/gif , image/jpeg , image/jpg"
          />
          <button
            onClick={handleClick}
            disabled={loading}
            className="cursor-pointer rounded-md py-2 px-5 font-semibold bg-gray-200 text-gray-900 hover:bg-gray-900 hover:text-gray-200 duration-300"
          >
            Select
          </button>

          <IconBtn
            text={loading ? "Uploading..." : "Upload"}
            onClick={handleFileUpload}
          >
            {!loading && (
              <FiUpload className="text-lg"/>
            )}
          </IconBtn>
        </div>
      </div>
    </div>
  )
}

export default ChangeProfilePicture
