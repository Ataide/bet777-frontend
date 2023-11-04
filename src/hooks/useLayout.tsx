import { useContext } from "react";

import { LayoutContext } from "../contexts/Layout";

export const useLayout = () => {
  const context = useContext(LayoutContext);
  return context;
};
