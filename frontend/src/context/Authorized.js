import useAuthContext from "./useAuthContext";

const Authorized = ({ children }) => {
    const { userId } = useAuthContext();

    return userId && children;
};

export default Authorized;