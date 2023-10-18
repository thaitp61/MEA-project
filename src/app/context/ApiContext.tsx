import axios from 'axios';
import { useSession } from "next-auth/react";
import { CompletionTriggerKind } from 'typescript';

const ApiContext = axios.create({
    baseURL: 'https://mea.monoinfinity.net/api/v1',
});


const getToken = () => {
    return localStorage.getItem('access_token');
};

// Thiết lập interceptor để tự động thêm token vào header
ApiContext.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default ApiContext;