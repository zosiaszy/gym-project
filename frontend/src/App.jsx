import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import React from "react";
import Contact from "./pages/Contact";
import "./App.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/register" element={<SignUp />} />

        <Route path="/login" element={<SignIn />} />
      </Routes>
    </>
  );
};

export default App;
