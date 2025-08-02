import { useState ,useEffect} from "react";
import BooksSection from "../components/BooksSection";
import { getUserDetails } from "../utils/helper";

const UserDashboard = () => {
  // const url = import.meta.env.VITE_BACKEND_URL;

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
    <div>
      <h3 className="text-2xl relative top-20 text-center p-2 font-semibold text-blue-700">
        👋 Welcome back,{" "}
        <span className="text-gray-800">{user?.userData?.name}</span>!
      </h3>
      <BooksSection />
    </div>
  );
};

export default UserDashboard;
