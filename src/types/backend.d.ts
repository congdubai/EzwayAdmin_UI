export interface IPaging {
    pageSize: number;
    pageIndex: number;
    total: number;
    countTotal: boolean;
}

export interface IResultResponse<T> {
    resultCode: string;
    resultDesc: string;
    paging?: IPaging;
    data: T;
}

export interface IRegistration {
    id: string | null;
    transId: string;
    type: string | null;
    createDate: string;
    updateDate: string;
    lastestRegistered: sttring;
    reviewStatus: boolean | null;
    reviewMessage: string | null;
    finalStatus: string;
    finalMessage: string | null;
    isDeleted: string;
    deletedDate: string | null;
    isFinish: boolean;
    subType: string | null;
}

export interface IAuthentication {
    transId: string;
    custNo: string;        // CIF
    custId: string;
    type: string;
    choiceOne: boolean | null;
    // frontImage?: string;
    // depthImage?: string;
    ekycTransId: string | null;
    finalStatus: string;
    finalMessage: string | null;
    createDate: string;    // map từ Timestamp (ISO string)
    updateDate: string;    // map từ Timestamp (ISO string)
}


export interface IAccount {
    data: {
        accessToken: string;
        refreshToken: string;
        fullName: string;
        role: string;
        branch: string | null;
        userId: string;
    };
    resultCode: string;
    resultDesc: string;
}

export interface IGetAccount extends Omit<IAccount, "access_token"> { }


export interface ICommon {
    transId: string;
    image1: string;
    image2: string;
    result: string;
}

export interface ITransId {
    transId: string;
}

export interface IUser {
    employeeId: string;
    password: string;
    fullName: string;
    email: string;
    role: string;
}
