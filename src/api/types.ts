export interface IUser {
  name: string;
  email: string;
  role: string;
  _id: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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
