import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`,
    timeout: 2000,
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use( (config) => {
    const token = localStorage.getItem("token");

    if(token){
        config.headers.token = token;
    }

    return config;

}, (error) => {
    return Promise.reject(error);
})

export default api;