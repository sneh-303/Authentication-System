

import { useState } from "react";
import api from '../api/axios';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import GradientBackgroundLayout from "./GradientBackgroundLayout";

const Register = () => {
  // debugger
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", { name, email, password });
      toast.success("Registered successfully! Please login.");
      setName(''); // for clearing details after success register
      setEmail('');
      setPassword('');
      navigate('/login')
    } catch (err) {
  if (err.response && err.response.data.errors) {
    err.response.data.errors.forEach(error => {
      toast.error(error.msg);
    });
  } else {
    toast.error(err.response?.data?.msg || "Registration failed");
  }
}

    finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackgroundLayout>
    <div>
      <div className="bg-white shadow-2xl rounded-3xl max-w-md w-full p-10 sm:p-14">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
          Create Your Account
        </h1>
        <form onSubmit={handleRegister} className="space-y-8">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-xl border border-gray-300 px-5 py-3 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-500 transition"
            />
          </div>

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
              placeholder="Create a password"
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
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-700 text-sm">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-purple-700 hover:text-purple-900 underline">
            Log in
          </a>
        </p>
      </div>
    </div>
    </GradientBackgroundLayout>
  );
};

export default Register;








// import { useState } from "react";
// import api from '../api/axios';
// import toast from 'react-hot-toast';
// import {useNavigate} from 'react-router-dom'
// import GradientBackgroundLayout from "./GradientBackgroundLayout";

// const Register = () => {
//   // debugger
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const navigate = useNavigate();

//   const validateForm = () => {
//   const newErrors = {};

//   if (!/^[a-zA-Z0-9 ]{3,16}$/.test(name)) {
//     newErrors.name = "Username should be 3-16 characters and shouldn't include special characters!";
//   }

//   if (!/^\S+@\S+\.\S+$/.test(email)) {
//     newErrors.email = "It should be a valid email address!";
//   }

//   if (
//     !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(password)
//   ) {
//     newErrors.password =
//       "Password should be 8–20 characters and include at least 1 letter, 1 number and 1 special character!";
//   }

//   setErrors(newErrors);
//   return Object.keys(newErrors).length === 0;
// };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//      if (!validateForm()) return;
//     setLoading(true);
//     try {
//       await api.post("/auth/register", { name, email, password });
//       toast.success("Registered successfully! Please login.");
//       setName(''); // for clearing details after success register
//       setEmail('');
//       setPassword('');
//       navigate('/login')
//     } catch (err) {
//   if (err.response && err.response.data.errors) {
//     err.response.data.errors.forEach(error => {
//       toast.error(error.msg);
//     });
//   } else {
//     toast.error(err.response?.data?.msg || "Registration failed");
//   }
// }

//     finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <GradientBackgroundLayout>
//     <div>
//       <div className="bg-white shadow-2xl rounded-3xl max-w-md w-full p-10 sm:p-14">
//         <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
//           Create Your Account
//         </h1>
//         <form onSubmit={handleRegister} className="space-y-8">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
//               Full Name
//             </label>
//             <input
//               id="name"
//               type="text"
//               placeholder="Your full name"
//               value={name}
//               onChange={e => setName(e.target.value)}
//               required
//               disabled={loading}
//               className="w-full rounded-xl border border-gray-300 px-5 py-3 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-500 transition"
//             />
//             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
//               Email Address
//             </label>
//             <input
//               id="email"
//               type="email"
//               placeholder="you@example.com"
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//               required
//               disabled={loading}
//               className="w-full rounded-xl border border-gray-300 px-5 py-3 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-500 transition"
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-3">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               placeholder="Create a password"
//               value={password}
//               onChange={e => setPassword(e.target.value)}
//               required
//               disabled={loading}
//               className="w-full rounded-xl border border-gray-300 px-5 py-3 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-500 transition"

//             />
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//           </div>
        
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl py-3 text-lg shadow-lg transition duration-300 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed`}
//           >
//             {loading ? "Creating Account..." : "Register"}
//           </button>
//         </form>

//         <p className="mt-8 text-center text-gray-700 text-sm">
//           Already have an account?{' '}
//           <a href="/login" className="font-semibold text-purple-700 hover:text-purple-900 underline">
//             Log in
//           </a>
//         </p>
//       </div>
//     </div>
//     </GradientBackgroundLayout>
//   );
// };

// export default Register;




