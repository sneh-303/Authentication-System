import Register from "./pages/Register"

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login' 
import Profile from './pages/Profile' 
import { Toaster } from 'react-hot-toast'
import Home from "./pages/Home" 
import Navbar from "./utils/Navbar"
import UserList from "./pages/UserList"
// import HttpModules from "./pages/HttpModules"
import Otp_Verification from "./pages/Otp_Verification"
function App() {



  return (
    <>
       <BrowserRouter>
    <Navbar/>
       <Routes>
        <Route path="/" element={<Home/>} ></Route>
        <Route path="/register" element={<Register/>} ></Route>
        <Route path="/login" element={<Login/>} ></Route>
        <Route path="/profile" element={<Profile/>} ></Route>
        <Route path="/userList" element={<UserList/>} ></Route>
        {/* <Route path="/httpmodule" element={<HttpModules/>} ></Route> */}
        <Route path="/otpverify" element={<Otp_Verification/>} ></Route>
       </Routes>
       </BrowserRouter>

      

    <Toaster position="top-right" reverseOrder={false} ></Toaster>
    </>
  )
}

export default App
