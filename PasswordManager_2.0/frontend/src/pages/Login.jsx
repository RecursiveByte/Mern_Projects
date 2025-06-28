import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

const Login = ({setIsLogging}) => {


  const navigate = useNavigate();


  const [formData,setFormData] = useState({email:"",password:""});

  const handleChange = (e) => {
    let {name,value} = e.target;
    
    setFormData((prevData) => ({ ...prevData,[name]:value}));
    }



  const handleSignUp = () => navigate("/signup");

  const handleForgotPassword = () => navigate("/resetPassword");

    const handleLogin = async (e) => {

      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      e.preventDefault();
    
      try {
          const res = await axios.post(backendUrl + "/login",formData,{withCredentials:true});
        
         
          if(res.data.success)
          {
           // toast.success(res.data.message);
            navigate("/user")
            setIsLogging(true);
          }
          
          else
            toast.error(res.data.message);

      } catch (error) {
        toast.error(error.message )
      }
    }

  return (
    <div className="formContainer w-screen h-screen text-black flex justify-center items-center bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#6d28d9]">
      <div className="form lg:w-1/5 bg-slate-900 rounded-md">
        <form>
          <div className="p-4 flex text-white flex-col gap-4">
            <h2 className="text-3xl font-bold text-center text-white">
              Login
            </h2>

            <div className="flex bg-[#333A5C] py-2 gap-2 rounded-full px-4">
              <img src="/assets/mail_icon.svg" />
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="outline-none bg-[#333A5C] w-full"
              />
            </div>

            <div className="flex bg-[#333A5C] py-2 gap-2 rounded-full px-4">
              <img src="/assets/lock_icon.svg" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="outline-none bg-[#333A5C] rounded-full w-full"
              />
            </div>

            <p onClick={handleForgotPassword} className="relative ml-2 text-blue-500 cursor-pointer">Forgot Password?</p>

            <div className="login_btn_div flex justify-center items-center">
              <button onClick={handleLogin} className="flex justify-center w-full h-full items-center px-5 py-2 bg-blue-600 rounded-4xl">
                Login
              </button>
            </div>

            <p className="text-center">
              Don't have an account?
              <span onClick={handleSignUp} className="underline text-blue-500 cursor-pointer">
                Sign up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
