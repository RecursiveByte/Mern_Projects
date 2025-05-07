import React, { use } from 'react'
import { useState ,useEffect} from 'react'
import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import ResetPassword from './pages/ResetPassword'
import Login from './pages/Login'
import User from './pages/User'
import SignUp from './pages/SignUp'
import Navbar from './components/Navbar'
import PassResetByOtp from './pages/PassResetByOtp'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PassChange from './pages/PassChange'
import VerificationOtp from './pages/VerificationOtp'




const App = () => {

  const [isLogging, setIsLogging] = useState(false);
  const [firstLetter,setLetter] = useState("");



  return (
    <div >
        <Navbar isLogging={isLogging} firstLetter={firstLetter} setIsLogging={setIsLogging}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login  setIsLogging={setIsLogging} />}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/resetPassword" element={<ResetPassword setIsLogging={setIsLogging}/>}/>
        <Route path="/resetPasswordOtp" element={<PassResetByOtp/>}/>
        <Route path="/user" element={<User setLetter={setLetter} firstLetter={firstLetter} isLogging={isLogging} setIsLogging={setIsLogging}/>}/>
        <Route path="/changePass" element={<PassChange isLogging={isLogging}/>}/>
        <Route path="/verifyOtp" element={<VerificationOtp/>}/>
      </Routes>
      <ToastContainer
       position="top-right"
       autoClose={3000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="colored" 
      />
    </div>
    
  )
}

export default App