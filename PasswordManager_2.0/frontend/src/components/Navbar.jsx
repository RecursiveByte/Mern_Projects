import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import getData from "../modules/getData";
import { toast } from "react-toastify";

const Navbar = ({ isLogging, firstLetter, setIsLogging }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  console.log(firstLetter);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    
    setShowDropdown(!showDropdown);
  }

  const doGetData = async () => {
    const data = await getData();
   
    setIsVerified(data.data.isVerified);
    
  };

  useEffect(() => {
   
  }, [isVerified]);

useEffect(() => {
  if (isLogging) {
    doGetData();
  }
}, [isLogging]);


  const handleVerify = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const res = await axios.post(backendUrl + "/sendOtp",{}, {
        withCredentials: true,
      });
     
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/verifyOtp");
      } else toast.error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    try {
      const res = await axios.post(backendUrl + "/logout",{}, {
        withCredentials: true,
      });
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        setIsLogging(false);
        navigate("/");
      } else toast.error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="fixed   bg-slate-900 text-white shadow-md">
      <div className=" flex  w-screen  justify-between items-center p-4">
        <Link to="/">
          <div className="font-bold text-2xl  ">
            <span className=" text-green-500">Key</span>
            <span>Guardian</span>
          </div>
        </Link>
        {isLogging ? (
          <div className="group flex flex-col items-end top-4  absolute right-4 ">
            <div onClick={toggleDropdown} className="w-10 h-10 flex justify-center items-center text-2xl px-2 py-3 hover:bg-slate-950 bg-slate-800  rounded-full font-bold cursor-pointer ">
              {firstLetter}
            </div>

            {showDropdown && (
            <div className="rounded-md   bg-black p-1 font-medium">
              <div onClick={handleLogout} className=" p-2 cursor-pointer  ">
                Logout
              </div>

              {!isVerified && (
                <div onClick={handleVerify} className=" p-2 cursor-pointer  ">
                  Verify
                </div>
              )}
            </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <div
              className="hover:bg-slate-950 bg-slate-800 p-2 rounded-md font-bold cursor-pointer"
              to="/login"
            >
              Login
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
