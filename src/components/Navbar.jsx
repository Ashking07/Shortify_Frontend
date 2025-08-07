// components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../utils/auth";
import { useUser } from "../context/useUser";

const Navbar = () => {
  // const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { setName } = useUser();

  const handleLogout = () => {
    logoutUser(); // This clears token and redirects
    setName("");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md shadow-md text-white py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-white">
        Shortify 🚀
      </Link>
      <div className="space-x-4">
        <Link
          to="/"
          className="relative px-3 py-2 rounded transition-all duration-300 ease-in-out text-white hover:scale-105 hover:text-blue-400 hover:backdrop-blur-sm hover:bg-white/10"
        >
          Home
        </Link>

        {token ? (
          <>
            <Link
              to="/dashboard"
              className="relative px-3 py-1 rounded transition-all duration-300 ease-in-out text-white hover:scale-105 hover:text-blue-400 hover:backdrop-blur-sm hover:bg-white/10"
            >
              Shorten_URL
            </Link>
            <Link
              to="/my-links"
              className="relative px-3 py-1 rounded transition-all duration-300 ease-in-out text-white hover:scale-105 hover:text-blue-400 hover:backdrop-blur-sm hover:bg-white/10"
            >
              My_Links
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="relative px-3 py-2 rounded transition-all duration-300 ease-in-out text-white hover:scale-105 hover:text-blue-400 hover:backdrop-blur-sm hover:bg-white/10"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
