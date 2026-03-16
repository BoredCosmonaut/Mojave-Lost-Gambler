import axios from 'axios'

const api = axios.create({
    baseURL:process.env.VUE_APP_API_BASE_URL,
    withCredentials:true
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('mojave_access_key');
    console.log("AXIOS_SENDING_TOKEN:", token);
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config
}, (err) => {
    return Promise.reject(err)
});

export default api;