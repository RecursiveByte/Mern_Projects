import React, { useState } from "react";
import myContext from "./myContext";

const MyContextProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "" });
  const [admin, setAdmin] = useState({ name: "" }); // Changed from Admin to admin
  const [isLogging, setIsLoggin] = useState(false);

  return (
    <myContext.Provider value={{ 
      isLogging, 
      setIsLoggin, 
      user, 
      setUser, 
      admin, 
      setAdmin 
    }}>
      {children}
    </myContext.Provider>
  );
};

export default MyContextProvider;