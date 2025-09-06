import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "../pages/Home"; // adjust the import path if needed

const AuthRedirector = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.post(`${url}/isAuth`, {}, { withCredentials: true });
        const { isAuthenticated, role } = res.data;

        if (isAuthenticated) {
          if (role === "admin") {
            navigate("/AdminDashboard");
          } else if (role === "user") {
            navigate("/UserDashboard");
          }
        } 
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // if (loading) return <div>Loading...</div>;

  return <Home />;
};

export default AuthRedirector;
