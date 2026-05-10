import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Provider, useSelector } from "react-redux"
import store from "./redux/store.js"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import CoursesDetails from "./pages/CoursesDetails"
import Catalog from "./pages/Catalog"
import OpenRoute from './components/core/Auth/OpenRoute.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import VerifyEmail from './pages/VerifyEmail.jsx'
import ForgetPassword from './pages/ForgetPassword.jsx'
import UpdatePassword from './pages/UpdatePassword.jsx'
import ProtectedRoute from './components/core/Auth/ProtectedRoute.jsx'
import Dashboard from "./pages/Dashboard.jsx"
import MyProfile from './components/core/Dashboard/MyProfile.jsx'
import Setting from './components/core/Dashboard/Settings/Setting.jsx'
import Cart from './components/core/Dashboard/Cart/Cart.jsx'
import EnrollCourses from './components/core/Dashboard/EnrollCourses.jsx'
import StudentRoute from "./components/core/Dashboard/DashboardRouterSecurity/StudentRoute.jsx"
import Instructor from './components/core/Dashboard/Instructor.jsx'
import InstructorRoutes from './components/core/Dashboard/DashboardRouterSecurity/InstructorRoutes.jsx'
import AddCourse from './components/core/Dashboard/AddCourse/AddCourse.jsx'
import MyCourse from './components/core/Dashboard/MyCourse.jsx'
import EditCourse from './components/core/Dashboard/EditCourse/EditCourse.jsx'
import ViewCourse from './pages/ViewCourse.jsx'
import VideoDetails from './components/core/ViewCourse/VideoDetails.jsx'
import ErrorDisplay from "./pages/ErrorElement.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
            errorElement: <ErrorDisplay />,
      },
      {
        path: "/about",
        element: <About />,
            errorElement: <ErrorDisplay />,
      },
      {
        path: "/contact",
        element: <Contact />,
            errorElement: <ErrorDisplay />,
      },
      {
        path: "/courses/:courseId",
        element: <CoursesDetails />,
            errorElement: <ErrorDisplay />,
      },
      {
        path: "/catalog/:catalogName",
        element: <Catalog />,
            errorElement: <ErrorDisplay />,
      },

      // Open route for non loged user 
      {
        path: "/signup",
        element: <OpenRoute />,
        children: [
          {
            index: true,
            element: <SignUp />,
            errorElement: <ErrorDisplay />,
          }
        ]
      },
      {
        path: "/login",
        element: <OpenRoute />,
        children: [
          {
            index: true,
            element: <Login />,
            errorElement: <ErrorDisplay />,
          }
        ]
      },
      {
        path: "/verify-email",
        element: <OpenRoute />,
        children: [
          {
            index: true,
            element: <VerifyEmail />,
            errorElement: <ErrorDisplay />,
          }
        ]
      },
      {
        path: "/forget-password",
        element: <OpenRoute />,
        children: [
          {
            index: true,
            element: <ForgetPassword />,
            errorElement: <ErrorDisplay />,
          }
        ]
      },
      {
        path: "/update-password/:id",
        element: <OpenRoute />,
        children: [
          {
            index: true,
            element: <UpdatePassword />,
            errorElement: <ErrorDisplay />,
          }
        ]
      },

      // Dashboard routes

      {
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/dashboard/my-profile",
            element: <MyProfile />,
            errorElement: <ErrorDisplay />,
          },
          {
            path: "/dashboard/settings",
            element: <Setting />,
            errorElement: <ErrorDisplay />,
          },
          // Student route
          {
            path: "/dashboard/cart",
            element: <StudentRoute><Cart /></StudentRoute>,
            errorElement: <ErrorDisplay />,
          },
          {
            path: "/dashboard/enrolled-courses",
            element: <StudentRoute><EnrollCourses /></StudentRoute>,
            errorElement: <ErrorDisplay />,
          },
          // Instructor route
          {
            path: "/dashboard/instructor",
            element: <InstructorRoutes><Instructor /></InstructorRoutes>,
            errorElement: <ErrorDisplay />,
          },
          {
            path: "/dashboard/add-course",
            element: <InstructorRoutes><AddCourse /></InstructorRoutes>,
            errorElement: <ErrorDisplay />,
          },
          {
            path: "/dashboard/my-courses",
            element: <InstructorRoutes><MyCourse /></InstructorRoutes>,
            errorElement: <ErrorDisplay />,
          },
          {
            path: "/dashboard/edit-course/:courseId",
            element: <InstructorRoutes><EditCourse /></InstructorRoutes>,
            errorElement: <ErrorDisplay />,
          },
        ]
      },

      // Watching course lecture 
      {
        element: (
          <ProtectedRoute>
            <ViewCourse />
          </ProtectedRoute>
        ),
        children: [
          // Use the spread operator to conditionally add the object
          {
              path: "view-course/:courseId/section/:sectionId/sub-section/:subSectionId",
              element: <VideoDetails />,
            errorElement: <ErrorDisplay />,
            }
        ]
      },

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer autoClose={3000} />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
