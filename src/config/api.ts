import { IAccount, IBackendRes, IGetAccount, IModelPaginate, IRegistration } from "@/types/backend"
import axios from 'config/axios-customize';

export const callFetchAccount = () => {
    return axios.get<IBackendRes<IGetAccount>>('/api/v1/auth/account')
}

export const callRefreshToken = () => {
    return axios.get<IBackendRes<IAccount>>('/api/v1/auth/refresh')
}

export const callLogout = () => {
    return axios.post<IBackendRes<string>>('/api/v1/auth/logout')
}
export const callFetchRegistration = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IRegistration>>>(`/api/v1/registration/list?${query}`)
}