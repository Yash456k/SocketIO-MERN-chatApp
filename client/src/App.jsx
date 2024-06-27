import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FirebaseLogin from "./components/FirebaseLogin";
import Chat from "./components/Chat";
import Home from "./components/Home";
import Login from "./components/Login";
import "./App.css";
import TestTrial from "./components/TestTrial";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/login" element={<FirebaseLogin />} />
        <Route path="/trial" element={<TestTrial />} />
        <Route path="/chat" element={<Chat />} />
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </>
  );
}

export default App;
