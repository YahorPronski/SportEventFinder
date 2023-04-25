import { Navigate } from "react-router-dom";
import useAuthContext from "../../context/useAuthContext";

const Authorized = ({children}) => {
    const { userId } = useAuthContext();
    if (!userId) {
        return <Navigate to="/login" replace/>
    }
    return children;
};

export default Authorized;