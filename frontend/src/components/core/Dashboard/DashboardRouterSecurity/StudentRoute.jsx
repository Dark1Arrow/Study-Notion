import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../../../../redux/constant";

const StudentRoute = ({ children }) => {
    const { user } = useSelector((state) => state.profile )
    console.log(user)
    if (user?.accountType !== ACCOUNT_TYPE.STUDENT) {
        return <Navigate to="/dashboard/my-profile" />
    }
    return children
}

export default StudentRoute