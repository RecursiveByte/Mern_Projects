import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import user from "../../../backend/models/user";

const User = ({ setIsLogging, isLogging, firstLetter, setLetter }) => {
  const [name, setName] = useState("");
  const [formData, setFormData] = useState({ passwordRef: "", password: "" });
  const [userEntries, setUserEntries] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [idx, setIdx] = useState(null); 
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getUserInfo = async () => {
    try {
      const res = await axios.get(`${backendUrl}/getData`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setName(res.data.data.name);
        setLetter(res.data.data.name.charAt(0).toUpperCase());
        setIsLogging(true);
        fetchUserEntries(); // fetch entries after setting login
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserEntries = async () => {
    try {
      const res = await axios.get(`${backendUrl}/userdata`, {
        withCredentials: true,
      });
      if (res.data.success) {
        console.log("this ",res.data.data);
        setUserEntries(res.data.data); // assuming res.data.data is an array of userData
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
      try {
        const res = await axios.post(`${backendUrl}/insertData`, formData, {
          withCredentials: true,
        });
        if (res.data.success) {
          toast.success("User data saved!");
          setFormData({ passwordRef: "", password: "" });
          fetchUserEntries();
        } else {
          toast.error(res.data.message || "Submission failed");
        }
      } catch (error) {
        toast.error(error.message);
      }
    
  };

  const handleDelete = async (index) => {
    const entryToDelete = userEntries[index];
    if (!entryToDelete || !entryToDelete._id) return;

    try {
      const res = await axios.post(
        `${backendUrl}/delete`,
        { _id: entryToDelete._id },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Entry deleted!");
        fetchUserEntries(); 
      } else {
        toast.error(res.data.message || "Failed to delete");
      }
    } catch (error) {
      toast.error("Error deleting entry");
    }
  };


  const handleUpdate = async (idx) => {
    try {
      const res = await axios.post(
        `${backendUrl}/update`,
        {
          _id: userEntries[idx]._id,
          passwordRef: formData.passwordRef,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );
  
      if (res.data.success) {
        toast.success("User data updated successfully!");
      } else {
        toast.error(res.data.message || "Something went wrong.");
      }
      setFormData({ passwordRef: "", password: "" });
      setIsEditing(false);
      fetchUserEntries(); 
    } catch (error) {
      toast.error("Update failed: " + error.message);
    }
  };
  


  const handleEdit = async (index) => {
    setFormData({
      passwordRef: userEntries[index].passwordRef,
      password: userEntries[index].password,
    });
    setIdx(index);
    setIsEditing(true);
     
  };
  

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="w-screen min-h-screen flex justify-center items-start py-10 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#6d28d9] text-white">
      <div className="lg:w-1/3 bg-slate-900 rounded-md p-6 shadow-lg relative top-10 ">
        <div className="text-center text-2xl font-bold mb-6">
          {isLogging ? `Welcome ${name}` : `You are not logged in`}
        </div>

        {isLogging && (
          <>
            <form  className="flex flex-col gap-4 ">
              <div className="flex bg-[#333A5C] py-2 gap-2 rounded-full px-4">
                <img src="/assets/lock_icon.svg" />
                <input
                  type="text"
                  name="passwordRef"
                  placeholder="Password Ref"
                  value={formData.passwordRef}
                  onChange={handleChange}
                  className="outline-none bg-[#333A5C] w-full text-white"
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
                  className="outline-none bg-[#333A5C] w-full text-white"
                  required
                />
              </div>

                  {isEditing ?                 
                  <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpdate(idx);
                  }}
                  className="bg-blue-600 text-white py-2 rounded-4xl font-semibold"
                >Update</button> : <button
                onClick={handleSubmit}
                type="submit"
                className="bg-blue-600 text-white py-2 rounded-4xl font-semibold">Submit</button>}
                
    
            </form>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-center">
                Your Saved Entries
              </h3>
              <div className="flex flex-col gap-2  pr-2">
                {userEntries.length > 0 ? (
                  userEntries.map((entry, index) => (
                    <div
                      key={index}
                      className="bg-[#1f2937] p-2 rounded-md flex justify-between items-center gap-2"
                    >
                      <div>
                        <p className="text-xl text-gray-300">
                          <span className="font-bold">Ref:</span>{" "}
                          {entry.passwordRef}
                        </p>
                        <p className="text-xl text-gray-400">
                          <span className="font-bold">Password:</span>{" "}
                          {entry.password}
                        </p>
                      </div>
                      <div className=" flex  gap-2 rounded-md ">
                        <button
                          onClick={() => handleEdit(index)}
                          className="bg-black p-1 flex justify-center items-center  rounded-md"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="click"
                            stroke="bold"
                            state="hover-line"
                            colors="primary:#ffffff,secondary:#2563EB"
                            style={{ width: "50px", height: "50px" }}
                          ></lord-icon>
                        </button>

                        <button
                          onClick={() => handleDelete(index)}
                          className="bg-black p-1 flex justify-center items-center  rounded-md"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/hwjcdycb.json"
                            trigger="click"
                            stroke="bold"
                            state="hover-line"
                            colors="primary:#ffffff,secondary:#2563EB"
                            style={{ width: "50px", height: "50px" }}
                          ></lord-icon>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center">No entries found.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default User;
