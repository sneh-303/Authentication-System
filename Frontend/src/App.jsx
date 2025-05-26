import Register from "./pages/Register"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login' 
import Profile from './pages/Profile' 
import { Toaster } from 'react-hot-toast'
import Home from "./pages/Home" 
function App() {


  return (
    <>
       <BrowserRouter>
       <Routes>
        <Route path="/" element={<Home/>} ></Route>
        <Route path="/register" element={<Register/>} ></Route>
        <Route path="/login" element={<Login/>} ></Route>
        <Route path="/profile" element={<Profile/>} ></Route>
       </Routes>
       </BrowserRouter>
    <Toaster position="top-right" reverseOrder={false} ></Toaster>
    </>
  )
}

export default App
