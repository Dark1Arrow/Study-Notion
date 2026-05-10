import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Loading from "../components/common/Loading.jsx"
import { useEffect } from 'react'
import Sidebar from "../components/core/Dashboard/Sidebar.jsx"


const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth || {})
  const { loading: profileLoading } = useSelector((state) => state.profile || {})

  if (authLoading || profileLoading) {
    return (
      <div className='mt-10'>
        <Loading />
      </div>
    )
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)] '>
      <Sidebar />
      <div className='h-[calc(100vh-3.5rem)] overflow-auto w-full'>
        <div className='mx-auto w-11/12 max-w-[1000px] py-10 '>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
