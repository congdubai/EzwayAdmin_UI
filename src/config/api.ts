import { IAccount, ICommon, IGetAccount, IPaging, IRegistration, IResultResponse, ITransId, IAuthentication, IUser, IOcrDetail2Response } from "@/types/backend"
import axios from 'config/axios-customize';


// Auth
export const loginAPI = (employeeId: string, password: string) => {
    return axios.put<IAccount>('/api/v2/auth/login', { employeeId, password })
}

export const callVerifyToken = () => {
    return axios.get<IResultResponse<IAccount>>('/api/v2/auth/verify-token');
};

export const registerAPI = (user: IUser) => {
    return axios.post<IResultResponse<IUser>>('/api/v2/admin/register-account', user);
};

export const logoutAPI = () => {
    return axios.post<IResultResponse<any>>('/api/v2/auth/logout');
};

// Registration
export const callFetchRegistration = (body: any) => {
    return axios.post<IResultResponse<IRegistration[]>>(
        "/api/v2/registration/list",
        body
    );
};


// Ocr
export const callFetchOcrDetail = (transId: any) => {
    return axios.post<IResultResponse<ICommon>>('/api/v2/ocr/detail', transId);
};
export const callFetchOcrDetail2 = (transId: any) => {
    return axios.post<IOcrDetail2Response>('/api/v2/ocr/detail2', transId);
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
    return axios.get(`/api/v2/files/${category}`, {
        params: { imageName },
        responseType: 'blob',
    });
};

// Authentication
export const callFetchAuthentication = (body: any) => {
    return axios.post<IResultResponse<IAuthentication[]>>(
        "/api/v2/auth/list",
        body
    );
};
export const callFetchAuthDetail = (transId: any) => {
    return axios.post<IResultResponse<ICommon>>('/api/v2/auth/detail', transId);
};


