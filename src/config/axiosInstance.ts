import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        "Content-Type": "application/json"
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    // Add Authorization token to headers if available
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config;
},
    (error) => {
        // Handle request errors
        return Promise.reject(error)
    });


// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Any status code in the range of 2xx will trigger this function
        return response;
    },
    (error) => {
        // Handle errors
        if (error.response && error.response.status === 401) {
            // If unauthorized, handle token expiration or redirection to login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;