import API from '../services/API';
import * as TokenService from './TokenService';

export const login = (credentials, onSuccess, onError) => {
    API.post('auth/login', credentials)
        .then((response) => {
            TokenService.saveTokens(response.data);
            onSuccess(response);
        })
        .catch(onError);
};

export const logout = () => {
    TokenService.removeTokens();
};

export const register = (userData, onSuccess, onError) => {
    API.post('auth/register', userData)
        .then(onSuccess)
        .catch(onError);
};

export const validateAuth = async () => {
    const accessToken = TokenService.getTokens()?.accessToken;
    if (!accessToken) return;
    try {
        return (await API.post('auth/validate',
            {
                accessToken: accessToken
            }
        )).data;
    } catch (error) {
        console.log(error);
    }
};

export const refreshAuth = async () => {
    const refreshToken = TokenService.getTokens()?.refreshToken;
    if (!refreshToken) return;
    try {
        const response = await API.post('auth/refresh',
            {
                refreshToken: refreshToken
            }
        );
        TokenService.saveTokens(response.data);
    } catch (error) {
        console.log(error);
    }
};

export const getAuthHeader = () => {
    const tokens = TokenService.getTokens();
    if (!tokens) return;
    return {
        Authorization: `${tokens.type} ${tokens.accessToken}`
    };
};
