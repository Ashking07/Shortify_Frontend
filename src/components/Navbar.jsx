import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../utils/auth";
import { useUser } from "../context/useUser";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const { setName } = useUser();

  const handleLogout = () => {
    logoutUser();
    setName("");
    setIsMobileMenuOpen(false);
  };

  const navLinks = (
    <>
      <Link
        to="/"
        className="block md:inline px-3 py-2 rounded transition-all duration-300 text-white hover:scale-105 hover:text-blue-400 hover:bg-white/10"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Home
      </Link>

      {token ? (
        <>
          <Link
            to="/dashboard"
            className="block md:inline px-3 py-2 rounded transition-all duration-300 text-white hover:scale-105 hover:text-blue-400 hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Shorten_URL
          </Link>
          <Link
            to="/my-links"
            className="block md:inline px-3 py-2 rounded transition-all duration-300 text-white hover:scale-105 hover:text-blue-400 hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            My_Links
          </Link>
          <button
            onClick={handleLogout}
            className="block md:inline bg-red-600 hover:bg-red-700 px-4 py-1 mt-1 md:mt-0 rounded-md"
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          to="/login"
          className="block md:inline px-3 py-2 rounded transition-all duration-300 text-white hover:scale-105 hover:text-blue-400 hover:bg-white/10"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Login
        </Link>
      )}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md shadow-md text-white py-4 px-6">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          Shortify 🚀
        </Link>

        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-4">{navLinks}</div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-2">{navLinks}</div>
      )}
    </nav>
  );
};

export default Navbar;
