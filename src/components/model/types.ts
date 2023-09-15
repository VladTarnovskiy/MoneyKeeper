export interface IUser {
  email: string;
  password: string;
}

export interface IUserReq {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}

export interface IUserData {
  token: string;
  id: number;
}

export interface IUserDataReq {
  email: string;
  password: string;
  id: number;
}

export interface IRes {
  data: IUserData;
  status: number;
}

export interface PostJsonResponse<T> {
  status: number;
  message: string;
  data?: T;
}

export interface ISetting {
  name: string;
  lang: string;
  theme: string;
  currency: string;
  userId: number;
}

export interface ISettingReq {
  name: string;
  lang: string;
  theme: string;
  currency: string;
  userId: number;
  id: number;
}

export interface ITransaction {
  type: string;
  category: string;
  subcategory: string;
  description: string;
  date: string;
  time: string;
  sum: number;
  userId: number;
}

export interface ITransactionReq {
  type: string;
  category: string;
  subcategory: string;
  description: string;
  date: string;
  time: string;
  sum: number;
  userId: number;
  id: number;
}
