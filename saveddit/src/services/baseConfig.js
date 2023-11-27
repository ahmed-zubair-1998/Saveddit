import axios from "axios";

import { logout } from "../reducers/usernameReducer";
import store from "../store";


const getAuthHeader = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
        if (new Date(token.expires_on).getTime() > Date.now()) {
            return token.access_token
        }
        store.dispatch(logout())
    }
    return ''
}

const api = axios.create({
    baseURL: APP_BACKEND_URL,
    withCredentials: true
})

api.interceptors.request.use((config) => {
    config.headers.Authorization =  getAuthHeader()
    return config;
});

export default api
