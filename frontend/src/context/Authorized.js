import { Navigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";

const Authorized = ({redirect, children}) => {
    const { userId } = useAuthContext();
    if (!userId && redirect) {
        return <Navigate to={redirect} replace/>;
    } else if (!userId) {
        return null;
    }
    return children;
};

export default Authorized;