import { useState, useEffect } from 'react';
import AuthContext from './AuthContext'
import * as UserService '../services/UserService'

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [contextLoaded, setContextLoaded] = useState(false);

    const updateAuthContext = async () => {
        setUserId(await UserService.getAuthUserId());
    }

    useEffect(() => {
        updateAuthContext().then(() => setContextLoaded(true));
    }, []);

    return <AuthContext.Provider value={{ userId, updateAuthContext }}>{contextLoaded && children}</AuthContext.Provider>;
};

export default AuthProvider