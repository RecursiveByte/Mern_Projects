import { useState,useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../context/myContext";
import axios from "axios";
import { toast } from "react-toastify";
import {getUserDetails} from "../utils/helper";

const Navbar = () => {
  const { user, setUser, setAdmin, isLogging, setIsLoggin } =
    useContext(myContext);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL;

  const checkAuth = async () => {
    try {
      const res = await axios.post(
        `${url}/isAuth`,
        {},
        { withCredentials: true }
      );
      if (res.data.isAuthenticated) {
        const userDetails = await getUserDetails();
        setIsLoggin(true);
        setUser({ ...user,name: userDetails.userData.name });
        if (res.data.role === "admin") {
          setAdmin({ name: res.data.name });
        }
      } else {
        setUser({ name: "" });
        setIsLoggin(false);
      }
    } catch (err) {
      setUser({ name: "" });
      setIsLoggin(false);
    }
  };

  
    

  useEffect(() => {
    checkAuth();
  }, []);

  const handleAuthClick = async () => {
    if (isLogging) {
      try {
        const res = await axios.post(
          `${url}/logout`,
          {},
          { withCredentials: true }
        );
        toast.success(res.data.message || "Logout successful");
      } catch (err) {
        toast.error("Logout failed");
      }

      setUser({ name: "" });
      setAdmin({ name: "" });
      setIsLoggin(false);
      navigate("/");
    } else {
      navigate("/userLogin");
    }
  };


  return (
    <nav className="bg-blue-600 w-screen h-[9vh] fixed text-white p-4 flex justify-between items-center shadow-md z-50">
      <div
        onClick={() => navigate("/")}
        className="text-2xl font-bold cursor-pointer"
      >
        📚BookVerse
      </div>

      <div className="flex items-center space-x-4">
        {isLogging && user.name && (
          <div className="bg-white text-blue-600 font-bold rounded-full w-8 h-8 flex items-center justify-center uppercase">
            {user.name.charAt(0)}
          </div>
        )}
        <button
          onClick={handleAuthClick}
          className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-blue-100 transition"
        >
          {isLogging ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;