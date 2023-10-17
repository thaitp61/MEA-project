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
        // const token = getToken(eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQwNzdkN2ZlLTI4MGUtZWRiYi1kYzVkLWJjNTY0ZmQ1ZTQ2YyIsInR5cGUiOiJBVVRIIiwiZXhwaXJlZEF0IjoxNzAwMTIyODIwNzYxLCJpYXQiOjE2OTc1MzA4MjB9.lWlaKsOF4_Ks9GKKaGuTZ6pDBAWHz7ryyULngBxDev8);
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQwNzdkN2ZlLTI4MGUtZWRiYi1kYzVkLWJjNTY0ZmQ1ZTQ2YyIsInR5cGUiOiJBVVRIIiwiZXhwaXJlZEF0IjoxNzAwMTIyODIwNzYxLCJpYXQiOjE2OTc1MzA4MjB9.lWlaKsOF4_Ks9GKKaGuTZ6pDBAWHz7ryyULngBxDev8';

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