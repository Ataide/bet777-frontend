import axios from "axios";
import { LoginInput } from "../components/dialogs/login.dialog";
import { RegisterInput } from "../components/steppers/register";
import { GenericResponse, ILoginResponse, IUserResponse } from "./types";
import { toast } from "react-toastify";

export const BASE_URL = "http://localhost/";
export const DOMAIN_URL = "http://localhost";
// export const BASE_URL = "https://laravel-dj6v.frb.io/";
// export const DOMAIN_URL = "https://laravel-dj6v.frb.io";

export const FORGOTPASSWORD_URL = `${BASE_URL}forgot-password`;

export const authApi = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";
authApi.defaults.headers.common["Accept"] = "application/json";

export const refreshAccessTokenFn = async () => {
  const response = await authApi.get<ILoginResponse>("api/refresh");
  return response.data;
};

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("@bet777:token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    //console.log(error);
    const originalRequest = error.config;

    if (error.code.includes("ERR_NETWORK")) {
      toast.error("Sem conexão com API.");
    }

    if (error.response) {
      const errMessage = error.response.data.message as string;

      if (errMessage.includes("not logged in") && !originalRequest._retry) {
        originalRequest._retry = true;
        await refreshAccessTokenFn();
        return authApi(originalRequest);
      }

      if (errMessage.includes("Unauthenticated.")) {
        localStorage.removeItem("@bet777:token");
        window.location.href = "/";
      }

      if (error.response.data.message.includes("not refresh")) {
        document.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export const signUpUserFn = async (user: RegisterInput) => {
  const response = await authApi.post<ILoginResponse>("api/register", user);
  return response.data;
};

export const loginUserFn = async (user: LoginInput) => {
  const response = await authApi.post<ILoginResponse>("api/login", user);
  return response.data;
};

export const updateProfileUserFn = async (user: any) => {
  const response = await authApi.post<GenericResponse>(
    "api/update-profile",
    user
  );
  return response.data;
};

export const verifyEmailFn = async (verificationCode: string) => {
  const response = await authApi.get<GenericResponse>(
    `auth/verifyemail/${verificationCode}`
  );
  return response.data;
};

export const logoutUserFn = async () => {
  const response = await authApi.get<GenericResponse>("api/logout");
  return response.data;
};

export const getMeFn = async () => {
  const response = await authApi.get<IUserResponse>("api/me");
  return response.data;
};
