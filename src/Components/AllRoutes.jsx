import React from "react";
import { Routes, Route } from "react-router-dom";
import { Chat } from "./Chat";
import { Login } from "./Login";
export const AllRoutes = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </>
  );
};
