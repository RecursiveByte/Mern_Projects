import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "react-toastify";
import myContext from "../context/myContext";

const UserLogin = () => {
  const { user, setUser,setIsLoggin,isLogging } = useContext(myContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const url = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${url}/login`,
        { email, password, role: "user" },
        { withCredentials: true }
      );

      setUser({name:res.data.user.name});
      setIsLoggin(true)
      toast.success("Login successful!");
      navigate("/UserDashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed");
      setEmail("");
      setPassword("");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {

    try {
      const res = await axios.post(
        `${url}/googleLogin`,
        {
          credentialResponse: credentialResponse,
        },
        { withCredentials: true }
      );
      setUser({ name: res.data.user.name});
      setIsLoggin(true)
      toast.success("Google login successful!");
      navigate("/userDashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Google login failed");
      console.error(
        "Google login backend error:",
        err.response?.data || err.message
      );
    }
  };

  const handleGoogleError = () => {
    console.log("Google login failed");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>

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
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <div className="flex justify-center w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 mt-4">
            Don't have an account?
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-500 hover:underline"
            >
              Register
            </span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Are you an admin?
            <span
              onClick={() => navigate("/adminLogin")}
              className="text-red-500 hover:underline"
            >
              Login here
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default UserLogin;
