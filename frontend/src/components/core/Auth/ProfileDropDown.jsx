import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../../hooks/useOnOneClick"
import { logout } from "../../../redux/api/operation/authAPI"
import Img from '../../common/Img';

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  return (
    <button className="relative hidden sm:flex outline-none" onClick={() => setOpen(!open)}>
      <div className="flex items-center gap-x-1 group">
        <Img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className={'aspect-square w-[30px] rounded-full object-cover border border-purple-500/50 group-hover:border-purple-400 transition-all duration-200'}
        />
        <AiOutlineCaretDown className={`text-sm text-purple-200 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`} />
      </div>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          ref={ref}
          className="absolute top-[135%] right-0 z- divide-y-[1px] divide-purple-800/50 overflow-hidden rounded-xl border border-purple-800/50 bg-purple-950/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Decorative Triangle Tip */}
          <div className="absolute -top-1 right-3 h-2 w-2 rotate-45 bg-purple-950 border-t border-l border-purple-800/50"></div>

          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full min-w-[140px] items-center gap-x-2 py-[12px] px-[16px] text-sm text-purple-100 hover:bg-purple-800/40 hover:text-white transition-all duration-200">
              <VscDashboard className="text-lg text-purple-400" />
              Dashboard
            </div>
          </Link>

          <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex w-full items-center gap-x-2 py-[12px] px-[16px] text-sm text-pink-400 hover:bg-pink-900/10 transition-all duration-200 cursor-pointer"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  )
}