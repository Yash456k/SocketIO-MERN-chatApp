import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CounterProvider } from "./context/Counter.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "https://socketio-mern-chatapp.onrender.com";

// http://localhost:5173
//  https://socketio-mern-chatapp.onrender.com

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="578976465958-g8ndp7oo66hr82r15abjjp9q9adbhqu2.apps.googleusercontent.com">
      <CounterProvider>
        <App />
      </CounterProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);
