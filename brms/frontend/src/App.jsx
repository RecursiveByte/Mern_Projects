import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';
import Navbar from "./components/Navbar";
import UserLogin from "./pages/UserLogin";
import UserDashboard from "./pages/UserDashboard";
import Signup from "./pages/SignUp";
import AdminDashboard from "./pages/AdminDashboard";
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRedirector from "./components/AuthRedirector";
import AdminViewBooks from "./pages/AdminViewBooks";
import AdminUpload from "./components/AdminUpload";
import CSVUploader from "./components/CsvUploader";

function App() {

  return (
    <>
      <Navbar  />
      <ToastContainer />
      <Routes >


        <Route path="/" element={<AuthRedirector />} />

        <Route path="/userLogin" element={<UserLogin  />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminLogin" element={ <AdminLogin/>} />
        <Route path="/AdminDashboard" element={ <ProtectedRoute onlyAdmin= {true}><AdminDashboard/></ProtectedRoute> } />
        <Route path="/UserDashboard" element={  <ProtectedRoute><UserDashboard/></ProtectedRoute>} />
        <Route path="/admin/viewBooks" element={  <ProtectedRoute><AdminViewBooks/></ProtectedRoute>} />
        <Route path="/admin/upload-image" element={  <ProtectedRoute><AdminUpload/></ProtectedRoute>} />
        <Route path="/admin/add-book" element={  <ProtectedRoute><CSVUploader/></ProtectedRoute>} />

      </Routes >
   </>
  );
}

export default App;
