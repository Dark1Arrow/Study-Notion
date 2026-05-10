import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePasswprd from './UpdatePasswprd'
import DeleteAccount from './DeleteAccount'

const Setting = () => {
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left">
        Edit Profile
      </h1>
    <ChangeProfilePicture />
        <EditProfile/>
      <UpdatePasswprd/>
      <DeleteAccount/>
    </>
  )
}

export default Setting
