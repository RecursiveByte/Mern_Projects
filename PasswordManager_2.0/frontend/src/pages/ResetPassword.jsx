import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const ResetPassword = ({setIsLogging}) => {
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");


  const [formData, setFormData] = useState({ email: "" });

  const handleChange = (e) => {
    let {name,value} = e.target;
    
    setFormData((prevData) => ({ ...prevData,[name]:value}));
    }

  const handleReset = async (e) => {
    e.preventDefault();
    
    try {

      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      
      const res = await axios.post(backendUrl + "/sendOtpPasswordReset",formData,{ withCredentials: true });
      
      if(res.data.success) {
        toast.success(res.data.message);
        setIsLogging(true);
        navigate("/resetPasswordOtp");
      }
      else {
        toast.error(res.data.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="formContainer w-screen h-screen text-black flex justify-center items-center bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#6d28d9]">
      <div className="form lg:w-1/5 bg-slate-900 rounded-md">
        <form>
          <div className="p-4 flex text-white flex-col gap-4">
            <h2 className="text-3xl font-bold text-center text-white">
              Reset Password
            </h2>

            <div className="flex bg-[#333A5C] py-2 gap-2 rounded-full px-4">
              <img src="/assets/mail_icon.svg" />
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="outline-none bg-[#333A5C] w-full"
              />
            </div>

            <div className="reset_btn_div flex justify-center items-center">
              <button onClick={handleReset} className="flex justify-center w-full h-full items-center px-5 py-2 bg-blue-600 rounded-4xl">
                Send Reset otp
              </button>
            </div>

            <p className="text-center">
              Remember your password?
              <span onClick={handleLogin} className="underline text-blue-500 cursor-pointer">
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
