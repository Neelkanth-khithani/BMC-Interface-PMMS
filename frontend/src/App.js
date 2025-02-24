import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Form from "./components/Form";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Monitor from "./components/Monitor";
import Map from "./components/Map";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/form" element={<Form />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/:constituency" element={<Dashboard />}>
        <Route path="profile" element={<Profile />} />
        <Route path="monitor" element={<Monitor />} />
        <Route path="map" element={<Map />} />
      </Route>
    </Routes>
  );
}

export default App;