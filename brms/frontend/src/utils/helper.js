import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;


export const getFinalData = async () => {

    try {
      const res = await axios.get(`${url}/finalData`);
      return res.data;
    } catch (err) {
      console.error("Failed to get final data:", err.response?.data?.message || err.message);
      return null;
    }
  };

  export const getUserDetails = async () => {
    try {
      const res = await axios.post(`${url}/userDetails`, {},{
        withCredentials: true, 
      });
  
      return res.data;
    } catch (error) {
      console.error("Failed to fetch user:", error.response?.data || error.message);
      return null;
    }
  };
  
