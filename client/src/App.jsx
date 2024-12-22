import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FirebaseLogin from "./components/FirebaseLogin";
import Chat from "./components/Chat";
import Home from "./components/Home";
import "./App.css";
import GroupCreationModal from "./components/GroupCreationModal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/login" element={<FirebaseLogin />} />
        <Route path="/trial" element={<GroupCreationModal />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
