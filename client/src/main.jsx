import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CounterProvider } from "./context/Counter.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { getGoogleClientId } from './utils/env';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const clientId = getGoogleClientId();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={clientId}>
      <CounterProvider>
        <App />
      </CounterProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);