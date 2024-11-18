import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Function to handle GET requests
export const get = (url) => {
    return api.get(url);
};

// Function to handle POST requests
export const post = (url, data) => {
    return api.post(url, data);
};

// Function to handle PUT requests
export const put = (url, data) => {
    return api.put(url, data);
};

// Function to handle DELETE requests
export const del = (url) => {
    return api.delete(url);
};

export default api;
