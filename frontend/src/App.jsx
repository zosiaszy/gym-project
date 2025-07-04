import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import React from "react";
import Contact from "./pages/Contact";
import "./App.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Offer from "./pages/Offer";
import Calendar from "./components/Calendar";
import OrderHistory from "./components/OrderHistory";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/orders" element={<OrderHistory />} />
      </Routes>
    </>
  );
};

export default App;
