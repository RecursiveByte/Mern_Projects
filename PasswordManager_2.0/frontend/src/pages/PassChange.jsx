import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

const ChangePassword = ({isLogging}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    reEnterPass: ""
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBackToLogin = () => navigate("/login");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    if (formData.password !== formData.reEnterPass) {
      toast.error("Passwords don't match");
      return;
    }

    try {

      const res = await axios.post(backendUrl + "/changePassword",formData,{ withCredentials: true });

      console.log(res);
      
      if (res.data.success) {
        toast.success("Password changed successfully");

        navigate("/login");
      } else {
        toast.error(res.data.message || "Failed to change password");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (

    <div className="formContainer w-screen h-screen text-black flex justify-center items-center bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#6d28d9]">
      {isLogging ? 
      <div className="form lg:w-1/5 bg-slate-900 rounded-md">
        <form>
          <div className="p-4 flex text-white flex-col gap-4">
            <h2 className="text-3xl font-bold text-center text-white">
              New Password
            </h2>

            <div className="flex bg-[#333A5C] py-2 gap-2 rounded-full px-4">
              <img src="/assets/lock_icon.svg" />
              <input
                type="password"
                name="password"
                placeholder="New Password"
                onChange={handleChange}
                className="outline-none bg-[#333A5C] w-full"
              />
            </div>

            <div className="flex bg-[#333A5C] py-2 gap-2 rounded-full px-4">
              <img src="/assets/lock_icon.svg" />
              <input
                type="password"
                name="reEnterPass"
                placeholder="Re-enter Password"
                onChange={handleChange}
                className="outline-none bg-[#333A5C] w-full"
              />
            </div>

            <div className="change_password_btn_div flex justify-center items-center">
              <button
              type="button"
                onClick={handleChangePassword}
                className="flex justify-center w-full h-full items-center px-5 py-2 bg-blue-600 rounded-4xl"
              >
                Change Password
              </button>
            </div>

            <p className="text-center">
              Remember your password?{" "}
              <span
                onClick={handleBackToLogin}
                className="underline text-blue-500 cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
:<div className="text-4xl text-white"> unauthorized </div>}
    </div>
  );
};

export default ChangePassword;