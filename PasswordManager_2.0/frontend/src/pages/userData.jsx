import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const UserData = () => {
  const [formData, setFormData] = useState({ passwordRef: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    try {
      const res = await axios.post(backendUrl + "/userdata", formData, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("User data saved successfully!");
      } else {
        toast.error(res.data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="formContainer w-screen h-screen text-black flex justify-center items-center bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#6d28d9]">
      <div className="form lg:w-1/5 bg-slate-900 rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="p-4 flex text-white flex-col gap-4">
            <h2 className="text-3xl font-bold text-center text-white">
              Enter User Data
            </h2>

            <div className="flex bg-[#333A5C] py-2 gap-2 rounded-full px-4">
              <img src="/assets/lock_icon.svg" />
              <input
                type="text"
                name="passwordRef"
                placeholder="Password Ref"
                value={formData.passwordRef}
                onChange={handleChange}
                className="outline-none bg-[#333A5C] w-full"
                required
              />
            </div>

            <div className="flex bg-[#333A5C] py-2 gap-2 rounded-full px-4">
              <img src="/assets/lock_icon.svg" />
              <input
                type="text"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="outline-none bg-[#333A5C] w-full"
                required
              />
            </div>

            <div className="login_btn_div flex justify-center items-center">
              <button
                type="submit"
                className="flex justify-center w-full h-full items-center px-5 py-2 bg-blue-600 rounded-4xl"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserData;
