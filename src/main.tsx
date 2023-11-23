import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider } from "@mui/material/styles";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br.js";
import App from "./App";

import theme from "./theme";

import "./App.css";
import { StateContextProvider } from "./contexts";
import AuthMiddleware from "./middleware/AuthMiddleware";
import CssBaseline from "@mui/material/CssBaseline";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <StateContextProvider>
            <AuthMiddleware>
              <App />
            </AuthMiddleware>
          </StateContextProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
