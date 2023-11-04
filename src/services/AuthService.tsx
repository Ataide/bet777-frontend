import axios from "axios";

import { ILoginRequest } from "../types";

// const apiUrl = "http://localhost/";
const apiUrl = "https://laravel-dj6v.frb.io/";

//Create a AuthService with login, register and forgot password methods.

export const login = ({ email, password }: ILoginRequest) => {
  return axios.post(apiUrl + "api/login", {
    email,
    password,
  });
};
