import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import GradientBackgroundLayout from "../utils/GradientBackgroundLayout";
import { loginUser } from "../api/axios";
import api from "../api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      const { token, expiryTimeStamp } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiry", expiryTimeStamp * 1000);
        toast.success("Login successful!");
        navigate("/profile");
      }
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.msg || "Login failed";
      toast.error(msg);

      // Redirect to OTP page if unverified
      const unverified = err.response?.data?.showVerifyButton;
      if (err.response?.status === 403 && unverified) {
        toast("Redirecting to OTP verification...");
        navigate("/otpverify", { state: { email } });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackgroundLayout>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-xl border px-5 py-3 focus:ring-4 focus:ring-purple-400 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-3">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-xl border px-5 py-3 focus:ring-4 focus:ring-purple-400 transition"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl py-3 text-lg shadow-lg hover:brightness-110 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-700 text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="font-semibold text-purple-700 hover:text-purple-900 underline">
            Sign Up
          </a>
        </p>
      </div>
    </GradientBackgroundLayout>
  );
};

export default Login;
