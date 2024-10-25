import React from "react";
import "./index.css";
import LoginForm from "./components/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import { ToastContainer } from "react-toast";
import ContactsTable from "./components/ContactsTable";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/contacts" element={<ContactsTable />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer delay={3000} position="top-right" />
    </div>
  );
};

export default App;
