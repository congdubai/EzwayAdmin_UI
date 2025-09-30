import axios from "axios";
import { store } from "@/redux/store";
import { setRefreshTokenAction } from "@/redux/slice/accountSlide";
import { notification } from "antd";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true, // nếu backend set cookie HttpOnly
});

// Request interceptor
instance.interceptors.request.use((config) => {
    config.headers = config.headers || {};
    if (!config.headers.Accept) config.headers.Accept = "application/json";
    if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json; charset=utf-8";
    }
    return config;
});

// Response interceptor
instance.interceptors.response.use(
    (res) => res.data,
    async (error) => {
        // Nếu token hết hạn -> logout luôn
        if (error.response?.status === 401) {
            store.dispatch(setRefreshTokenAction({
                status: true,
                message: "Phiên đăng nhập đã hết hạn, vui lòng login lại.",
            }));

            // redirect về login
            window.location.href = "/login";
            return;
        }

        // 403: Forbidden
        if (error.response?.status === 403) {
            notification.error({
                message: error?.response?.data?.message ?? "",
                description: error?.response?.data?.error ?? "",
            });
        }

        return Promise.reject(error);
    }
);

export default instance;
