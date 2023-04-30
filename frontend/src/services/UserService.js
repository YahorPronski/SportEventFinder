import API from '../services/API';
import * as AuthService from './AuthService';

export const getLoggedInUser = async () => {
    try {
        return (await API.get('users/current', requestConfig())).data;
    } catch (error) {
        console.log(error);
    }
};

export const getLoggedInUserId = async () => {
    const userId = await AuthService.validateAuth();
    if (userId) return userId;

    await AuthService.refreshAuth();
    return AuthService.validateAuth();
};

export const updateUserInfo = async (userInfo, onSuccess, onError) => {
    API.patch('users/current', userInfo, requestConfig())
        .then(onSuccess)
        .catch(onError);
};

export const updateUserPassword = async (passwords, onSuccess, onError) => {
    API.patch('users/current/password', passwords, requestConfig())
        .then(onSuccess)
        .catch(onError);
};

const requestConfig = () => {
    return {
        headers: AuthService.getAuthHeader()
    };
};