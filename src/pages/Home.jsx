// pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/useUser.jsx";

const Home = () => {
  const token = localStorage.getItem("token");
  const { name } = useUser();

  return (
    <div className="bg-gradient-to-br from-gray-900 to-slate-700 min-h-screen text-white flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex items-start justify-center px-6 pt-16 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to <span className="text-blue-400">Shortify!</span> {name}
          </h1>
          <p className="text-lg mb-10">
            A simple and secure URL shortening service. Easily manage and share
            your links.
          </p>

          {/* Flow Steps */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 md:p-10 text-left shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              How It Works
            </h2>
            <ol className="space-y-4 list-decimal list-inside text-white/90 text-base leading-relaxed">
              <li>User submits a long URL.</li>
              <li>The backend generates a unique short hash.</li>
              <li>The hash is stored in the database with the original URL.</li>
              <li>A short URL is returned (e.g., shortify.com/abcde).</li>
              <li>
                Visiting the short URL redirects the user to the original URL.
              </li>
            </ol>
          </div>

          {/* Buttons */}
          <div className="flex justify-center items-center gap-4 mt-10 relative group">
            <Link
              to={token ? "/dashboard" : "#"}
              className={`px-6 py-3 font-semibold rounded-lg transition shadow-md ${
                token
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  : "bg-gray-600 cursor-not-allowed text-white/70"
              }`}
              disabled={!token}
            >
              Let’s Shorten Some URLs for You!
            </Link>

            {!token && (
              <>
                <Link
                  to="/login"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-white"
                >
                  Login
                </Link>

                {/* Tooltip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs text-white bg-black/80 px-3 py-1 rounded shadow-lg z-20 opacity-0 group-hover:opacity-100 transition">
                  Login first to enable
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
