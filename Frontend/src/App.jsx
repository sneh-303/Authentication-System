import Register from "./pages/Register"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login' 
import Profile from './pages/Profile' 
import { Toaster } from 'react-hot-toast'
import Home from "./pages/Home" 
import Navbar from "./utils/Navbar"
import UserList from "./pages/UserList"
import HttpModules from "./pages/HttpModules"
import { TransitionProvider } from "./utils/Gsap/TransitionContext"
import TransitionComponent from "./utils/Gsap/Transition"
function App() {



  return (
    <>
       {/* <BrowserRouter> */}
    {/* <Navbar/> */}
       {/* <Routes> */}
        {/* <Route path="/" element={<Home/>} ></Route> */}
        {/* <Route path="/register" element={<Register/>} ></Route> */}
        {/* <Route path="/login" element={<Login/>} ></Route> */}
        {/* <Route path="/profile" element={<Profile/>} ></Route> */}
        {/* <Route path="/userList" element={<UserList/>} ></Route> */}
        {/* <Route path="/httpmodule" element={<HttpModules/>} ></Route> */}
       {/* </Routes> */}
       {/* </BrowserRouter> */}

      <BrowserRouter>
       <TransitionProvider>
            <Navbar/>
        <Routes>
        <Route path="/" element={<TransitionComponent><Home/></TransitionComponent>} ></Route>
        <Route path="/register" element={<TransitionComponent><Register/></TransitionComponent>} ></Route>
        <Route path="/login" element={<TransitionComponent><Login/></TransitionComponent>} ></Route>
        <Route path="/profile" element={<TransitionComponent><Profile/></TransitionComponent>} ></Route>
        <Route path="/userList" element={<TransitionComponent><UserList/></TransitionComponent>} ></Route>
        <Route path="/httpmodule" element={<TransitionComponent><HttpModules/></TransitionComponent>} ></Route>
       </Routes>
       </TransitionProvider>
       </BrowserRouter>

    <Toaster position="top-right" reverseOrder={false} ></Toaster>
    </>
  )
}

export default App
