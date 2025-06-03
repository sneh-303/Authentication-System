import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path ? "text-purple-600 font-semibold" : "text-gray-700";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-purple-600">
          <Link to="/">MyApp</Link>
        </div>
        <div className="space-x-6">
          <Link to="/register" className={`${isActive("/register")} hover:text-purple-800`}>
            Register
          </Link>
          <Link to="/login" className={`${isActive("/login")} hover:text-purple-800`}>
            Login
          </Link>
          <Link to="/profile" className={`${isActive("/profile")} hover:text-purple-800`}>
            Profile
          </Link>
          <Link to="/userList" className={`${isActive("/userList")} hover:text-purple-800`}>
            UserList
          </Link>
          <Link to="/httpmodule" className={`${isActive("/httpmodule")} hover:text-purple-800`}>
            HttpModules
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
