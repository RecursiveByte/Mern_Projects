import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children, onlyAdmin = false }) => {
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  const url = import.meta.env.VITE_BACKEND_URL;
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.post(`${url}/isAuth`, {},{
          withCredentials: true, 
        });

        const { isAuthenticated, role } = res.data;

        if (!isAuthenticated) {
          navigate("/");
          return;
        }

        if (onlyAdmin && role !== "admin") {
          navigate("/");
          return;
        }

        setIsAllowed(true);
      } catch (err) {
        console.error("Auth check failed:", err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate, onlyAdmin]);

  if (loading) return <div>Loading...</div>;

  return isAllowed ? children : null;
};

export default ProtectedRoute;
