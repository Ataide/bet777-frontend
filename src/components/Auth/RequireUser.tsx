// import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { getMeFn } from "../../api/authApi";
import { useStateContext } from "../../contexts";
import FullScreenLoader from "../FullScreenLoader";

const RequireUser = () => {
  // const [cookies] = useCookies(["logged_in"]);
  const token = localStorage.getItem("@hest:token");
  const location = useLocation();
  const stateContext = useStateContext();

  const {
    isLoading,
    isFetching,
    data: user,
  } = useQuery(["authUser"], getMeFn, {
    retry: 1,
    select: (data) => data,
    onSuccess: (data) => {
      stateContext.dispatch({ type: "SET_USER", payload: data });
    },
  });

  const loading = isLoading || isFetching;

  if (loading) {
    return <FullScreenLoader />;
  }

  return Boolean(token) || user ? (
    // return (cookies.logged_in || user) &&
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireUser;
