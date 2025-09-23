import { IAccount, ICommon, IGetAccount, IPaging, IRegistration, IResultResponse, ITransId, IAuthentication, IUser } from "@/types/backend"
import axios from 'config/axios-customize';


// Auth
export const loginAPI = (employeeId: string, password: string) => {
    return axios.put<IAccount>('/api/v1/auth/login', { employeeId, password })
}

export const callVerifyToken = () => {
    return axios.get<IResultResponse<IAccount>>('/api/v1/auth/verify-token');
};

export const registerAPI = (user: IUser) => {
    return axios.post<IResultResponse<IUser>>('/api/v1/admin/register-account', user);
};

export const logoutAPI = () => {
    return axios.post<IResultResponse<any>>('/api/v1/auth/logout');
};

// Registration
export const callFetchRegistration = (body: any) => {
    return axios.post<IResultResponse<IRegistration[]>>(
        "/api/v1/registration/list",
        body
    );
};


// Ocr
export const callFetchOcrDetail = (transId: any) => {
    return axios.post<IResultResponse<ICommon>>('/api/v2/ocr/detail', transId);
};


// CrossCheck
export const callFetchCrossCheckDetail = (transId: any) => {
    return axios.post<IResultResponse<ICommon>>('/api/v2/cross-check/detail', transId);
};

//FatchMatch
export const callFetchFaceMatchDetail = (transId: any) => {
    return axios.post<IResultResponse<ICommon>>('/api/v2/face-match/detail', transId);
};

// Image 
export const callFetchImage = (category: string, imageName: string) => {
    return axios.get(`/api/files/${category}`, {
        params: { imageName },
        responseType: 'blob',
    });
};

// Authentication
export const callFetchAuthentication = (body: any) => {
    return axios.post<IResultResponse<IAuthentication[]>>(
        "/api/v1/auth/list",
        body
    );
};
export const callFetchAuthDetail = (transId: any) => {
    return axios.post<IResultResponse<ICommon>>('/api/v1/auth/detail', transId);
};


