import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import  Navbar from "./components/common/Navigation"
function App() {

 
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <main className='py-3'>
        <Outlet/>
      </main>
    </div>
  )
}

export default App
