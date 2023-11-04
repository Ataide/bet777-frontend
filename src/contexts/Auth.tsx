import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/AuthService";
interface AuthContextData {
  signed: boolean;
  user?: any | null;
  Login(user: any): Promise<any>;
  Logout(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<any | null>(null);
  const navigate = useNavigate();

  function Logout() {
    localStorage.removeItem("@bet777:user");
    localStorage.removeItem("@bet777:token");
    setUser(null);
  }

  const Login = async ({ email, password }) => {
    const response = await login({ email, password });
    if (response.status === 200) {
      const { token, user } = response.data;

      localStorage.clear();
      localStorage.setItem("@bet777:token", token);
      localStorage.setItem("@bet777:user", JSON.stringify(user));
      setUser(user);
    }
    return response;
  };

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("@bet777:user")!);

    if (!userLocal) {
      navigate("/");
      return;
    }

    setUser(userLocal);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
