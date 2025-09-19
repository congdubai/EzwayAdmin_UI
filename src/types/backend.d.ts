export interface IBackendRes<T> {
    errorDesc: errorDesc;
    errorCode: number | string;
    data?: T;
}

export interface IRequestBody<T> {
    requestId: string;
    requestTime: string;
    data?: T;
}

export interface IModelPaginate<T> {
    meta: {
        page: number;
        pageSize: number;
        pages: number;
        total: number;
    },
    result: T[]
}

export interface IAccount {
    access_token: string;
    user: {
        id: string;
        email: string;
        name: string;
        role: {
            id: string;
            name: string;
            permissions: {
                id: string;
                name: string;
                apiPath: string;
                method: string;
                module: string;
            }[]
        }
    }
}

export interface IGetAccount extends Omit<IAccount, "access_token"> { }

export interface IRegistration {
    transId: string,
    type: string,
    createDate: string,
    updateDate: string,
    lastestRegistered: string,
    reviewStatus: boolean,
    reviewMessage: string,
    finalStatus: string,
    finalMessage: string,
    isDeleted: string,
    deletedDate: string,
    isFinish: boolean,
    subType: string
}