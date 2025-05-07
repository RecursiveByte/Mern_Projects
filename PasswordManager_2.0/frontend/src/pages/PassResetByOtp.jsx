import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const PassResetByOtp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);

  const navigate = useNavigate();


  const handleSubmit =async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    console.log("OTP Submitted: ", otpValue);

    try {
  
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.post(backendUrl + "/getOtp", { otp: otpValue }, { withCredentials: true });

      if(res.data.success) {
        toast.success(res.data.message);
        navigate("/changePass");
      }
      else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    if(isNaN(value))
        e.target.value = "";

    if (!isNaN(value) && value !== "") {
      otp[index] = value;
      setOtp([...otp]);
    }

    if(value && index < 5)
        inputsRef.current[index +1 ].focus();

};
console.log(inputsRef.current);

  useEffect(() => {
  }, [otp]);

  return (
    <div className="formContainer w-screen h-screen text-white flex justify-center items-center bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#6d28d9]">
      <div className="form max-w-screen w-[80%] sm:w-[60%] lg:w-[30%] xl:w-[20%] bg-slate-900 rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="p-4  flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-center text-white">
              Reset Password
            </h2>
            <p className="text-center text-white">
              Enter the OTP sent to your email
            </p>

            <div className="flex justify-center items-center gap-2">
              {otp.map((data, index) => (
                <input
                  ref ={ (el) => inputsRef.current[index] = el }
                  key={index}
                  type="text"
                  maxLength={1}
                  onChange={(e) => handleChange(e, index)}
                  className="w-7 h-7 sm:w-10 sm:h-10 text-center text-black font-bold text-xl bg-slate-600 rounded-md outline-none"
                />
              ))}
            </div>

            <div className="flex justify-center items-center w-full ">
              <button
                onClick={handleSubmit}
                type="submit"
                className="px-5 py-2 mt-2 w-50  bg-blue-600 text-white rounded-full "
              >
                Submit OTP
              </button>
            </div>

            <p className="text-center text-sm">
              Didn't receive OTP?{" "}
              <span className="underline cursor-pointer text-blue-400">
                Resend
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PassResetByOtp;
