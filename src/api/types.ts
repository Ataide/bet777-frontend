import { IWallet } from "../types";

export interface IUser {
  name: string;
  email: string;
  role: string;
  _id: string;
  id: string;
  favorites?: ISport[];
  profile: IProfile;
  wallet: IWallet;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ISport {
  id: string;
  name: string;
}

export interface IProfile {
  cpf: string;
  phone: string;
  birthday: string;
  pix_key: string;
  account_status: string;
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface IUserResponse extends IUser {}

// export interface IUserResponse  {
//   status: string;
//   data: {
//     user: IUser;
//   };
// }
