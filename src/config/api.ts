import { IAccount, ICommon, IGetAccount, IPaging, IRegistration, IResultResponse, ITransId } from "@/types/backend"
import axios from 'config/axios-customize';


export const callFetchAccount = () => {
    // return axios.get<IBackendRes<IGetAccount>>('/api/v1/auth/account')
}

export const callRefreshToken = () => {
    // return axios.get<IBackendRes<IAccount>>('/api/v1/auth/refresh')
}

export const callLogout = () => {
    // return axios.post<IBackendRes<string>>('/api/v1/auth/logout')
}

export const registerAPI = (fullName: string, email: string, password: string, otp: string, confirmPassword: string) => {
    // return axios.post<IBackendRes<IUser>>('/api/v1/auth/otp/register', { fullName, email, password, otp, confirmPassword })
}

export const loginAPI = (employeeId: string, password: string) => {
    return axios.put<IAccount>('/api/v1/auth/login', { employeeId, password })
}
export const callFetchRegistration = (body: any) => {
    return axios.post<IResultResponse<IRegistration[]>>(
        "/api/v1/registration/list",
        body
    );
};
export const callFetchOcrDetail = (transId: any) => {
    return axios.post<IResultResponse<ICommon>>('/api/v2/ocr/detail', transId);
};

export const callFetchImage = (category: string, imageName: string) => {
    return axios.get(`/api/files/${category}`, {
        params: { imageName },
        responseType: 'blob',
    });
};


