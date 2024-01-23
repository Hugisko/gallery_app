import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/Context";
import { CacheProvider } from "./context/Cache";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <CacheProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CacheProvider>
    </AppProvider>
  </React.StrictMode>
);
