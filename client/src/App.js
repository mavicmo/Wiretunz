import React from "react";
import { useState } from "react";
import Login from "./Pages/Login/Login.js";
import SignUp from "./Pages/SignUp/SignUp.js";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import { Routes, Route } from "react-router-dom";
function App() {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("_id"));
  console.log(currentUser);
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
