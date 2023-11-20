import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export const useApp = () => {
  const context = useContext(AppContext);
  return context;
};
