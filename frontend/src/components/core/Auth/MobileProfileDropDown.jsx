import { useRef, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../../hooks/useOnOneClick"
import Img from './../../common/Img';
import { logout } from "../../../redux/api/operation/authAPI"

import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { AiOutlineCaretDown, AiOutlineHome } from "react-icons/ai"
import { MdOutlineContactPhone } from "react-icons/md"
import { TbMessage2Plus } from "react-icons/tb"
import { PiNotebook } from "react-icons/pi"
import { fetchCourseCategories } from '../../../redux/api/operation/courseDetailsApi';

export default function MobileProfileDropDown() {
    const { user } = useSelector((state) => state.profile)
    if (!user) return null

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ref = useRef(null)

    const [open, setOpen] = useState(false)
    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    useOnClickOutside(ref, () => setOpen(false))

    const fetchSublinks = async () => {
        try {
            setLoading(true)
            const res = await fetchCourseCategories();
            setSubLinks(res);
        } catch (error) {
            console.log("Could not fetch the category list = ", error);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchSublinks();
    }, [])

    return (
        <button className="relative sm:hidden outline-none" onClick={() => setOpen(!open)}>
            <div className="flex items-center gap-x-1">
                <Img
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className={'aspect-square w-[30px] rounded-full object-cover border border-purple-500/50'}
                />
                <AiOutlineCaretDown className={`text-sm text-purple-200 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`} />
            </div>

            {open && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    ref={ref}
                    className="absolute min-w-[180px] top-[135%] right-0 z- overflow-hidden rounded-xl border border-purple-800/50 bg-purple-950/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-200"
                >
                    {/* User Info Header (Mobile optimization) */}
                    <div className="px-4 py-3 border-b border-purple-800/50 bg-purple-900/20">
                        <p className="text-xs font-semibold text-purple-300 uppercase tracking-wider">Account</p>
                        <p className="text-sm font-medium text-white truncate">{user?.firstName} {user?.lastName}</p>
                    </div>

                    <div className="flex flex-col py-1">
                        <Link to="/dashboard/my-profile" onClick={() => setOpen(false)} className="flex w-full items-center gap-x-2 py-3 px-4 text-sm text-purple-100 hover:bg-purple-800/40 transition-all">
                            <VscDashboard className="text-lg text-purple-400" />
                            Dashboard
                        </Link>

                        <Link to='/' onClick={() => setOpen(false)} className="flex w-full items-center gap-x-2 py-3 px-4 text-sm text-purple-100 hover:bg-purple-800/40 transition-all border-t border-purple-800/20">
                            <AiOutlineHome className="text-lg text-purple-400" />
                            Home
                        </Link>

                        <Link to='/' onClick={() => setOpen(false)} className="flex w-full items-center gap-x-2 py-3 px-4 text-sm text-purple-100 hover:bg-purple-800/40 transition-all">
                            <PiNotebook className="text-lg text-purple-400" />
                            Catalog
                        </Link>

                        <Link to='/about' onClick={() => setOpen(false)} className="flex w-full items-center gap-x-2 py-3 px-4 text-sm text-purple-100 hover:bg-purple-800/40 transition-all border-t border-purple-800/20">
                            <TbMessage2Plus className="text-lg text-purple-400" />
                            About Us
                        </Link>

                        <Link to='/contact' onClick={() => setOpen(false)} className="flex w-full items-center gap-x-2 py-3 px-4 text-sm text-purple-100 hover:bg-purple-800/40 transition-all">
                            <MdOutlineContactPhone className="text-lg text-purple-400" />
                            Contact Us
                        </Link>

                        <div
                            onClick={() => {
                                dispatch(logout(navigate))
                                setOpen(false)
                            }}
                            className="flex w-full items-center gap-x-2 py-3 px-4 text-sm text-pink-400 hover:bg-pink-900/10 transition-all border-t border-purple-800/50 mt-1"
                        >
                            <VscSignOut className="text-lg" />
                            Logout
                        </div>
                    </div>
                </div>
            )}
        </button>
    )
}