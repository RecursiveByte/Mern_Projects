import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UserSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const url = import.meta.env.VITE_BACKEND_URL;

  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post(
        `${url}/register`,
        { name, email, password, role: "user" },
        { withCredentials: true }
      );
      
      toast.success(res.data.message || "Signup successful! Please login.");
      setEmail("");
      setPassword("");
      navigate("/userLogin");
    } catch (err) {
      const message = err.response?.data?.message || "Signup failed";
      console.error("Signup error:", message);
      toast.error(message);
    }
  };
  


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Create an Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-3 py-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
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
          onClick={handleSignup}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <a href="/userLogin" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Are you an admin?{" "}
            <a href="/admin-login" className="text-red-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default UserSignup;
