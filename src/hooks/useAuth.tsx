import { useContext } from "react";

import { AuthContext } from "../contexts/Auth";

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
