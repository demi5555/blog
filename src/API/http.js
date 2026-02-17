import axios from "axios";

const api = axios.create({
    baseURL: 'http://blogs2.csm.linkpc.net/api/v1',
})

// Attach token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // always get latest token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle 401 globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token invalid or expired
            localStorage.removeItem('token'); // remove token
            alert('Session expired. Please login again.');
            window.location.href = '/login'; // redirect to login
        }
        return Promise.reject(error);
    }
);

export default api;
