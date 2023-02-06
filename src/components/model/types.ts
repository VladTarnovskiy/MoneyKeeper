export interface IUser {
  email: string;
  password: string;
  id?: number;
}

export interface IUserData {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}

export interface IRes {
  data: IUserData;
  status: number;
}
