import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  }

  return (
    <div className="flex w-screen h-screen justify-center p-2 items-center bg-blue-50">
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-center"><img className="w-50 h-50" src="/assets/password.png"/></div>

      <div className="flex items-center">
        <div className=" flex flex-col sm:flex-row items-center  mx-auto">
          <h1 className="text-2xl text-center  sm:text-4xl font-bold">Welcome to Keyguardian!</h1>
          <img className="w-8 flex  h-8 " src="/assets/hand_wave.png" alt="wave" />
        </div>
      </div>

        <p className="font-medium text-xl text-center">
          Keyguardian is a password manager that helps you securely store and
          manage your passwords.
        </p>

        <div className="flex justify-center items-center">
          <button onClick={handleGetStarted} className="rounded-4xl border-1 bg-white hover:bg-blue-100 border-black p-2">
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
