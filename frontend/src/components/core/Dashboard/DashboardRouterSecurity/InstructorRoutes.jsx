import { useSelector } from "react-redux"
import { ACCOUNT_TYPE } from "../../../../redux/constant"
import { Navigate } from "react-router-dom"

const InstructorRoutes = ({ children }) => {
    const { user } = useSelector((state) => state.profile)
    // console.log(user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR)

    if (user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR) {
        return <Navigate to="/dashboard/my-profile" />
    } else {
        return children
    }
}

export default InstructorRoutes
