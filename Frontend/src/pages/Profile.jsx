import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchProfile } from "../api/axios";
import { useNavigate } from "react-router-dom";
import GradientBackgroundLayout from "../utils/GradientBackgroundLayout";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  // const SERVER_URL = "https://authentication-system-3-y5zg.onrender.com/api/auth/";
  // const SERVER_URL = `${import.meta.env.VITE_BACKEND_URL}`;
  // const SERVER_URL = `https://authentication-system-3-y5zg.onrender.com`;
  const SERVER_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiryTime = localStorage.getItem("tokenExpiry");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    if (!expiryTime || Date.now() > expiryTime) {
      toast.error("Session expired");
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      navigate("/login");
      return;
    }

    const timeoutId = setTimeout(() => {
      toast.error("Session expired");
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      navigate("/login");
      toast.success("You have been redirected to the login page");
    }, expiryTime - Date.now());

    fetchProfile()
      .then((res) => setProfile(res.data))

      .catch((err) => {
        const errorMsg = err.response?.data?.msg || err.message || "";
        if (errorMsg.toLowerCase().includes("token expired")) {
          // toast.error("Token Expired");
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiry");
          navigate("/login");
        } else {
          toast.error("Please Login First");
        }
      });
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <p className="text-gray-100 text-lg">Loading...</p>
      </div>
    );
  }
  const logoutHandle = () => {
    // e.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully");
  };
  return (
    <GradientBackgroundLayout>
      {/* <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4"> */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
          User Profile
        </h2>
        {/* logo */}
        <div className="flex justify-center">
          <Stack direction="row" spacing={2}>
            <Avatar
              alt="profile"
              src={`${SERVER_URL}${profile.ProfilePicture}`}
              sx={{
                width: 100,
                height: 100,
                border: "3px solid #6366F1", // Tailwind's purple-600
                borderRadius: "50%",
              }}
            />
          </Stack>
        </div>

        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Name:</span>
            <span>{profile.name}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Email:</span>
            <span>{profile.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">User ID:</span>
            <span className="text-xs text-gray-500">
              {profile.serialNumber}
            </span>
          </div>
          <div className="flex justify-between">
            <button
              onClick={logoutHandle}
              className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl py-3 text-lg shadow-lg transition duration-300 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </GradientBackgroundLayout>
  );
};

export default Profile;
