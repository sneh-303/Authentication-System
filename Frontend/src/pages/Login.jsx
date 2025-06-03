import { useState } from "react";
import api from '../api/axios';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import GradientBackgroundLayout from "../utils/GradientBackgroundLayout";
import { loginUser } from "../api/axios";
const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // const response=await api.post("/auth/login", { email, password }); // api from axios
      const response = await loginUser({ email, password });

      const {token, expiryTimeStamp} = response.data;
      if(token){
        localStorage.setItem('token', token); // <-- store token her
        localStorage.setItem('tokenExpiry', expiryTimeStamp * 1000); // <-- store token her
        toast.success("Login successfully!");
        console.log("expiryTimeStamp (from backend):", expiryTimeStamp);
        console.log("Converted to ms:", expiryTimeStamp * 1000);
        console.log("Current time:", Date.now());
        navigate('/profile')

      }
      else{
        toast.error("something went wrong. ")
      }
      // setName(''); // for clearing details after success login
      // setEmail('');
      // setPassword('');
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackgroundLayout>
     {/* <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 flex items-center justify-center px-4"> */}
      <div className="bg-white shadow-2xl rounded-3xl max-w-md w-full p-10 sm:p-14">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
          Login To Your Account
        </h1>
        <form onSubmit={handleLogin} className="space-y-8">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-xl border border-gray-300 px-5 py-3 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-500 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-3">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-xl border border-gray-300 px-5 py-3 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl py-3 text-lg shadow-lg transition duration-300 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {loading ? "Logging in Account..." : "Login"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-700 text-sm">
          Not have an account?{' '}
          <a href="/register" className="font-semibold text-purple-700 hover:text-purple-900 underline">
            Sign Up
          </a>
        </p>
      </div>
    {/* </div> */}
    </GradientBackgroundLayout>
  );
};

export default Login;









