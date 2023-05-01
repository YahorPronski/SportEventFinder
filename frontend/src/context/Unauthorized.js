import useAuthContext from "./useAuthContext";

const Unauthorized = ({ children }) => {
    const { userId } = useAuthContext();

    return !userId && children;
};

export default Unauthorized;