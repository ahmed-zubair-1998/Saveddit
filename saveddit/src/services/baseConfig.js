import axios from "axios";

const api = axios.create({
    baseURL: APP_BACKEND_URL,
    withCredentials: true
})

export default api
