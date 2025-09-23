import axios from "axios";
import { Mutex } from "async-mutex";
import { store } from "@/redux/store";
import { setRefreshTokenAction } from "@/redux/slice/accountSlide";
import { notification } from "antd";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true, // cookie HttpOnly tự attach
});

const mutex = new Mutex();
const NO_RETRY_HEADER = "x-no-retry";

/** Refresh token (backend set cookie HttpOnly) */
const handleRefreshToken = async () => {
    return mutex.runExclusive(async () => {
        try {
            await instance.put("/api/v2/auth/refresh", {}, {
                headers: { [NO_RETRY_HEADER]: "true" },
            });
        } catch (err: any) {
            const message = err?.response?.data?.error ?? "Có lỗi xảy ra, vui lòng login.";
            store.dispatch(setRefreshTokenAction({ status: true, message }));
            throw err;
        }
    });
};

// Request interceptor
instance.interceptors.request.use((config) => {
    config.headers = config.headers || {};
    if (!config.headers.Accept) config.headers.Accept = "application/json";
    if (!config.headers["Content-Type"]) config.headers["Content-Type"] = "application/json; charset=utf-8";
    return config;
});

// Response interceptor
instance.interceptors.response.use(
    (res) => res.data,
    async (error) => {
        const originalConfig = error.config;

        // 401: retry after refresh
        if (
            originalConfig &&
            error.response?.status === 401 &&
            !originalConfig.headers[NO_RETRY_HEADER] &&
            !originalConfig.url?.endsWith("/login")
        ) {
            originalConfig.headers[NO_RETRY_HEADER] = "true";
            try {
                await handleRefreshToken();
                return instance.request(originalConfig);
            } catch (refreshErr) {
                return Promise.reject(refreshErr);
            }
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
