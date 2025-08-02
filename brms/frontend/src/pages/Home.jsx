import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-300 to-blue-500 text-white p-10 space-y-6">
        <h1 className="text-5xl font-extrabold text-center">
          Welcome to BookVerse 📚
        </h1>
        <p className=" max-w-md text-2xl text-center">
          Discover, review, and rate your favorite books. Join our community of
          book lovers!
        </p>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <button
            onClick={() => navigate("/userLogin")}
            className="bg-white text-xl text-blue-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition"
          >
            User Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-white text-xl text-blue-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition"
          >
            User Signup
          </button>
        </div>
        <div>
          <p className="  text-xl  text-white  text-center">
            Are you an admin?
            <span
              onClick={() => navigate("/adminLogin")}
              className="text-black  hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
