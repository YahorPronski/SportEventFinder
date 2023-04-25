import API from '../services/API';
import * as AuthService from './AuthService';

export const getAuthUser = async () => {
    const authUserId = await getAuthUserId();
    if (!authUserId) return;
    return getUserById(authUserId);
};

export const getUserById = async (userId) => {
    try {
        return (await API.get(`users/${userId}`, requestConfig())).data;
    } catch (error) {
        console.log(error);
    }
};

export const getAuthUserId = async () => {
    const userId = await getUserIdByAccessToken();
    if (userId) return userId;

    await refreshAuth();
    return getUserIdByAccessToken();
};

const requestConfig = () => {
    return {
        headers: AuthService.getAuthHeader()
    };
};