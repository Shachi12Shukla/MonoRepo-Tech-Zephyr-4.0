import api from "./api";

export const signupUser = async (userData) => {
    const response = await api.post(
        "/auth/signup",
        userData
    );

    return response.data;
};

export const signinUser = async (userData) => {
    const response = await api.post(
        "/auth/signin",
        userData
    );

    return response.data;
};