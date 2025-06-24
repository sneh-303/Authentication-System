import { useNavigate } from "react-router-dom";
import GradientBackgroundLayout from "../utils/GradientBackgroundLayout";


const Home = () => {
  const navigate = useNavigate();

  return (
    <GradientBackgroundLayout>
    {/* <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 flex items-center justify-center px-4"> */}
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to Authoryx</h1>
        <p className="text-gray-600 mb-8">Please choose an option to continue:</p>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate("/register")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            🆕 I'm New Here – Register
          </button>

          <button
            onClick={() => navigate("/login")}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg transition duration-300"
          >
            🔐 Already Registered – Login
          </button>
        </div>
      </div>
     {/* </div> */}
    </GradientBackgroundLayout>
  );
};

export default Home;











