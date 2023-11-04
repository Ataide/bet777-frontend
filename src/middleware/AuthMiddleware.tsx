import React from "react";
// import { useCookies } from "react-cookie";
import { useQuery } from "react-query";

import { getMeFn } from "../api/authApi";
import FullScreenLoader from "../components/FullScreenLoader";
import { useStateContext } from "../contexts";

type AuthMiddlewareProps = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  // const [cookies] = useCookies(["logged_in"]);
  const token = localStorage.getItem("@bet777:token");
  const stateContext = useStateContext();

  const query = useQuery(["authUser"], () => getMeFn(), {
    enabled: !token,
    select: (data) => data,
    onSuccess: (data) => {
      stateContext.dispatch({ type: "SET_USER", payload: data });
    },
  });

  if (query.isLoading && token) {
    return <FullScreenLoader />;
  }

  return children;
};

export default AuthMiddleware;
