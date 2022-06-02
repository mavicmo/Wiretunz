import React from "react";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Home from "./Pages/Home/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} /> */}
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
