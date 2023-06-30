import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import {useAuth} from '../context/AuthProvider.tsx'

const baseURL = "http://localhost:8000/api/v1/"

const useAxios = () => {
    const {authTokens, logoutUser, updateToken} = useAuth();

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: authTokens ? `Bearer ${authTokens.access}` : null,
            "Content-Type": "application/json",
        }
    });

    axiosInstance.interceptors.request.use(async request => {
        if (authTokens) {
            const decodedToken: any = jwt_decode(authTokens.access);
            const currentTime = dayjs().unix();
            if (decodedToken.exp < currentTime) {
                updateToken();
            }
        }

        return request;
    });

    axiosInstance.interceptors.response.use(response => {
            return response
        }, async error => {
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                await updateToken();
                return axiosInstance(originalRequest);
            }

            if (error.response.status === 401 && originalRequest._retry) {
                logoutUser();
                return Promise.reject(error);
            }

            return Promise.reject(error);
        }
    );

    return axiosInstance;
}

export default useAxios;