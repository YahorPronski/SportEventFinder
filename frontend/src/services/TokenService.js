const AUTH_TOKENS = "authTokens";

export const getTokens = () => {
    const authTokens = localStorage.getItem(AUTH_TOKENS);
    if (!authTokens) return;
    return JSON.parse(authTokens);
};

export const saveTokens = (tokens) => {
    localStorage.setItem(AUTH_TOKENS, JSON.stringify(tokens));
};

export const removeTokens = () => {
    localStorage.removeItem(AUTH_TOKENS);
};



