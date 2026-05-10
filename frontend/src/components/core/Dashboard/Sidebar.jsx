import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loading from '../../common/Loading'
import { IoMdClose } from "react-icons/io"
import { HiMenuAlt1 } from "react-icons/hi"
import { setOpenSideMenu, setScreenSize } from '../../../redux/slices/sidebarSlice'
import SidebarLinks from './SidebarLinks'
import { sidebarLinks } from '../../../../data/dashboardLinks.js'
import { VscSignOut } from 'react-icons/vsc'
import ConformationModel from '../../common/ConformationModel.jsx'
import { logout } from '../../../redux/api/operation/authAPI.js'

const Sidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, loading: profileLoading } = useSelector((state) => state.profile)
    const { loading: authLoading } = useSelector((state) => state.auth)

    const [confirmationModel, setConfirmationModel] = useState()
    const { openSideMenu, screenSize } = useSelector((state) => state.sidebar)

    useEffect(() => {
        try {
            const handleResize = () => dispatch(setScreenSize())
            window.addEventListener("resize", handleResize)
            handleResize()
            return () => window.removeEventListener("resize", handleResize)
        } catch (error) {
            console.log(error)
        }
    }, [dispatch])

    useEffect(() => {
        if (screenSize <= 640) {
            dispatch(setOpenSideMenu(false))
        } else {
            dispatch(setOpenSideMenu(true))
        }
    }, [screenSize, dispatch])

    if (profileLoading || authLoading) {
        return (
            <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r border-purple-900/50 bg-purple-950/20">
                <Loading />
            </div>
        )
    }

    return (
        <>
            {/* Mobile Toggle Button */}
            <div 
                className="sm:hidden text-purple-200 absolute left-7 top-3 cursor-pointer z- hover:text-white transition-colors" 
                onClick={() => dispatch(setOpenSideMenu(!openSideMenu))}
            >
                {openSideMenu ? <IoMdClose size={33} /> : <HiMenuAlt1 size={33} />}
            </div>

            {openSideMenu && (
                <div className='flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r border-purple-900/50 bg-zinc-950 backdrop-blur-md py-10 z- transition-all duration-300'>
                    
                    <div className='flex flex-col mt-6'>
                        {sidebarLinks.map((link) => {
                            if (link.type && user?.accountType !== link.type) return null
                            return (
                                <SidebarLinks key={link.id} link={link} iconName={link.icon} />
                            )
                        })}
                    </div>

                    {/* Divider */}
                    <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-purple" />

                    <div className='flex flex-col'>
                        <SidebarLinks
                            link={{ name: "Settings", path: "/dashboard/settings" }}
                            iconName={"VscSettingsGear"}
                        />
                        
                        <button
                            onClick={() => setConfirmationModel({
                                text1: "Are you sure?",
                                text2: "You will be logged out of your account.",
                                btn1Text: "Logout",
                                btn2Text: "Cancel",
                                btn1Handler: () => dispatch(logout(navigate)),
                                btn2Handler: () => setConfirmationModel(null),
                            })}
                            className="transition-all duration-200"
                        >
                            <div className="flex items-center gap-x-2 px-8 py-2 text-sm font-medium text-purple-300 hover:bg-purple-800/30 hover:text-pink-400 transition-all">
                                <VscSignOut className='text-lg' />
                                <span>Logout</span>
                            </div>
                        </button>
                    </div>
                </div>
            )}

            {confirmationModel && <ConformationModel modelData={confirmationModel} />}
        </>
    )
}

export default Sidebar