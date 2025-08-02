import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../utils/helper";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    const data = await getUserDetails();
    setUser(data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
  }, [user]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Admin Control Panel
        </h2>
        <h3 className="text-xl sm:text-2xl text-center mb-6 font-semibold text-blue-700">
          👋 Welcome back,{" "}
          <span className="text-gray-800">{user?.userData?.name}</span>!
        </h3>

        <div className="flex flex-col sm:flex-row justify-center items-stretch gap-6">
          {/* View Books Button */}
          <button
            onClick={() => navigate("/admin/viewBooks")}
            className="bg-blue-500 hover:bg-blue-600 w-full sm:w-40 text-white text-lg rounded-lg px-6 py-2"
          >
            📚 View Books
          </button>

          {/* Add Book & Note Section */}
          <div className="flex flex-col gap-4 w-full sm:w-2/3">
            <button
              onClick={() => navigate("/admin/add-book")}
              className="bg-green-500 hover:bg-green-600 w-full h-10 text-white rounded-lg"
            >
              ➕ Add Book
            </button>

            <div className="bg-gray-50 rounded-xl shadow-inner p-4 border border-gray-300 text-sm">
              <p className="text-gray-700 font-medium">
                To edit or delete books ,please use the{" "}
                <span className="text-blue-600 font-semibold">View Books</span>{" "}
                section.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/admin/upload-image")}
            className="w-full sm:w-80 h-12 bg-purple-500 hover:bg-purple-600 text-white text-lg rounded-lg"
          >
            🖼️ Upload Images
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
