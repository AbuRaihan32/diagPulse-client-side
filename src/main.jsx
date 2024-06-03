import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Router.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./Pages/Providers/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <div style={{fontFamily: 'Signika Negative'}}>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </div>
);
