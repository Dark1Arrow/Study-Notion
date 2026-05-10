import { Link, useLocation, matchPath } from "react-router-dom"
import { useSelector } from "react-redux"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { fetchCourseCategories } from "../../redux/api/operation/courseDetailsApi"
import { useEffect, useState } from "react"
import { NavbarLinks } from "../../../data/navbarLinks"

import ProfileDropDown from "../core/Auth/ProfileDropDown"
import MobileProfileDropDown from "../core/Auth/MobileProfileDropDown"
import { MdKeyboardArrowDown } from "react-icons/md"

const Navigation = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart)
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    const [showNavbar, setShowNavbar] = useState('top');
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const controlNavbar = () => {
            if (window.scrollY > 200) {
                if (window.scrollY > lastScrollY) setShowNavbar('hide')
                else setShowNavbar('show')
            } else setShowNavbar('top')
            setLastScrollY(window.scrollY);
        }
        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY])

    return (
        <nav className={`relative z-50 flex h-16 w-full items-center justify-center border-b border-purple-900/30 text-white transition-all duration-300 backdrop-blur-md bg-black/70 ${showNavbar === 'hide' ? "-translate-y-full" : "translate-y-0"}`}>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-tighter hover:text-purple-400 transition-colors">
                    STUDY<span className="text-purple-500">NOTION</span>
                </Link>

                {/* Nav Links */}
                <ul className='hidden sm:flex gap-x-2'>
                    {NavbarLinks.map((link, index) => (
                        <li key={index}>
                            {link.title === "Catalog" ? (
                                <div className="group relative flex cursor-pointer items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 hover:bg-purple-900/20">
                                    <p className={`${matchRoute("/catalog/:catalogName") ? "text-purple-400 font-semibold" : "text-purple-100"}`}>
                                        {link.title}
                                    </p>
                                    <MdKeyboardArrowDown className="text-purple-300" />
                                    
                                    {/* Dropdown Menu */}
                                    <div className="invisible absolute left-[50%] top-[50%] z- flex w-[280px] translate-x-[-50%] translate-y-[3em] flex-col rounded-2xl bg-purple-950 border border-purple-800/50 p-4 text-purple-100 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                        <div className="absolute left-[50%] top-0 z- h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-purple-950 border-t border-l border-purple-800/50"></div>
                                        
                                        {loading ? (<p className="text-center py-4">Loading...</p>) : 
                                            subLinks?.length ? (
                                                <div className="flex flex-col gap-1">
                                                    {subLinks.map((subLink, i) => (
                                                        <Link key={i} to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                                            className="rounded-lg py-3 pl-4 hover:bg-purple-900/40 transition-colors">
                                                            <p>{subLink.name}</p>
                                                        </Link>
                                                    ))}
                                                </div>
                                            ) : (<p className="text-center py-4">No Courses Found</p>)
                                        }
                                    </div>
                                </div>
                            ) : (
                                <Link to={link?.path}>
                                    <p className={`py-2 px-4 rounded-xl transition-all duration-200 ${matchRoute(link?.path) ? "bg-purple-600/20 text-purple-400 font-semibold border border-purple-500/30" : "text-purple-100 hover:bg-purple-900/20"}`}>
                                        {link.title}
                                    </p>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Right Side: Auth/Cart */}
                <div className='flex gap-x-4 items-center'>
                    {user && user?.accountType !== "Instructor" && (
                        <Link to="/dashboard/cart" className="relative group">
                            <AiOutlineShoppingCart className="text-2xl text-purple-100 group-hover:text-purple-400 transition-colors" />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-purple-600 text-xs font-bold animate-bounce shadow-[0_0_10px_rgba(147,51,234,0.5)]">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    )}

                    {token === null && (
                        <>
                            <Link to="/login">
                                <button className={`px-5 py-2 rounded-xl transition-all duration-300 ${matchRoute('/login') ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]' : 'border border-purple-800 text-purple-100 hover:bg-purple-900/40'}`}>
                                    Log in
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className={`px-5 py-2 rounded-xl transition-all duration-300 ${matchRoute('/signup') ? 'bg-purple-600 text-white' : 'bg-white text-black hover:bg-purple-50'}`}>
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}

                    {token !== null && <ProfileDropDown />}
                    {token !== null && <div className="sm:hidden"><MobileProfileDropDown /></div>}
                </div>
            </div>
        </nav>
    )
}

export default Navigation