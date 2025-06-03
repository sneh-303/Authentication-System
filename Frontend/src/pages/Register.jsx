import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import GradientBackgroundLayout from "../utils/GradientBackgroundLayout";
import { Eye, EyeOff } from "lucide-react";
;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation rules: exactly 13 chars, 4 uppercase, 4 lowercase, 4 digits, 1 special char
    const passwordRules = [
      {
        regex: /^.{13}$/,
        message: "Password must be exactly 13 characters long.",
      },
      {
        regex: /(?:.*[A-Z]){4,}/,
        message: "Password must contain at least 4 uppercase letters.",
      },
      {
        regex: /(?:.*[a-z]){4,}/,
        message: "Password must contain at least 4 lowercase letters.",
      },
      {
        regex: /(?:.*[0-9]){4,}/,
        message: "Password must contain at least 4 digits.",
      },
      {
        regex: /[!@#$%^&*]/,
        message:
          "Password must contain at least 1 special character (!@#$%^&*).",
      },
    ];

    for (let rule of passwordRules) {
      if (!rule.regex.test(password)) {
        newErrors.password = rule.message;
        break; // Show only the first error
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (files) {
        formData.append("ProfilePicture", files);
      }
      
      await api.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Registered successfully! Please login.");
      setName("");
      setEmail("");
      setPassword("");
      setFiles(null);
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data.errors) {
        err.response.data.errors.forEach((error) => toast.error(error.msg));
      } else {
        toast.error(err.response?.data?.msg || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderError = (msg) => (
    <p className="text-sm text-red-500 mt-1 font-medium">{msg}</p>
  );

  return (
    <GradientBackgroundLayout>
      <div className="bg-white shadow-2xl rounded-3xl max-w-md w-full p-10 sm:p-14">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
          Create Your Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-8">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className={`w-full rounded-xl border px-5 py-3 placeholder-gray-400 focus:outline-none focus:ring-4 transition ${
                errors.name
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-purple-400 focus:border-purple-500"
              }`}
            />
            {errors.name && renderError(errors.name)}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className={`w-full rounded-xl border px-5 py-3 placeholder-gray-400 focus:outline-none focus:ring-4 transition ${
                errors.email
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-purple-400 focus:border-purple-500"
              }`}
            />
            {errors.email && renderError(errors.email)}
          </div>

          {/* File upload */}
          <div>
            <label
              htmlFor="ProfilePicture"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload Profile Picture
            </label>
            <input
              id="ProfilePicture"
              type="file"
              accept="image/*"
              onChange={(e) => setFiles(e.target.files[0])}
              disabled={loading}
              className="w-full rounded-xl border px-5 py-3 placeholder-gray-400 focus:outline-none focus:ring-4 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className={`w-full rounded-xl border px-5 py-3 pr-12 placeholder-gray-400 focus:outline-none focus:ring-4 transition ${
                errors.password
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-purple-400 focus:border-purple-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-[39px] right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && renderError(errors.password)}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl py-3 text-lg shadow-lg transition duration-300 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-700 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-purple-700 hover:text-purple-900 underline"
          >
            Log in
          </a>
        </p>
      </div>
    </GradientBackgroundLayout>
  );
};

export default Register;
  