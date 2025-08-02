import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import myContext from "../context/myContext";

const AdminLogin = () => {

  const {admin, setAdmin,setIsLoggin} = useContext(myContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const url = import.meta.env.VITE_BACKEND_URL;

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${url}/login`,
        { email, password,role: "admin" },
        { withCredentials: true }
      );

      setEmail("");
      setPassword("");
      toast.success("Admin login successful!");
      setAdmin({...admin,name: res.data.user.name, email: res.data.user.email});
      setIsLoggin(true);

      navigate("/adminDashboard");
    } catch (err) {
      console.error("Admin login error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleAdminLogin}
        className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full px-3 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Login as Admin
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
