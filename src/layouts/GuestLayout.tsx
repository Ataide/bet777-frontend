import { Outlet } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

export default function GuestLayout() {
  return (
    <>
      <CssBaseline />
      <Outlet />
    </>
  );
}
