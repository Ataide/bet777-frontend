import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import App from "./App";

import theme from "./theme";

import "./App.css";
import { StateContextProvider } from "./contexts";
import AuthMiddleware from "./middleware/AuthMiddleware";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <StateContextProvider>
          <AuthMiddleware>
            <App />
          </AuthMiddleware>
        </StateContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
