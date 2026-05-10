import * as Icons from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { matchPath, useLocation } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { setOpenSideMenu } from "../../../redux/slices/sidebarSlice.js"
import { resetCourseState } from "../../../redux/slices/courseSlice.js"

const SidebarLinks = ({ link, iconName }) => {
  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const { openSideMenu, screenSize } = useSelector((state) => state.sidebar)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const handleClick = () => {
    dispatch(resetCourseState())
    // Close sidebar on mobile after clicking a link
    if (openSideMenu && screenSize <= 640) dispatch(setOpenSideMenu(false))
  }

  return (
    <NavLink
      to={link.path}
      onClick={handleClick}
      className={`relative px-8 py-3 text-sm font-medium transition-all duration-300 ${
        matchRoute(link.path)
          ? "bg-purple-800/30 text-purple-50 shadow-[inset_4px_0_0_0_#a855f7]"
          : "text-purple-200/60 hover:bg-purple-900/20 hover:text-purple-100"
      }`}
    >
      {/* Indicator Bar */}
      <span
        className={`absolute left-0 top-0 h-full w-[3px] bg-purple-500 shadow-[0_0_10px_#a855f7] transition-all duration-300 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="flex items-center gap-x-2">
        <Icon className={`text-lg transition-colors duration-300 ${
          matchRoute(link.path) ? "text-purple-300" : "text-purple-200/60"
        }`} />
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}

export default SidebarLinks