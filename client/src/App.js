import React from "react";
import Login from "./Pages/Login/Login.js";
import SignUp from "./Pages/SignUp/SignUp.js";
import Songs from "./Pages/Songs/Songs.js";
import Home from "./Pages/Home/Home";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/songs" element={<Songs />} />
    </Routes>
  );
}

export default App;
