import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUser } from "../context/useUser.jsx";
import { Link } from "react-router-dom";

const backendBaseURL = import.meta.env.VITE_BACKEND_URL;
//Updated above in Vercel and here too

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { setName } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${backendBaseURL}/auth/login`, {
        email,
        password,
      });

      const { token, userID, name } = res.data;

      // Save token & userID to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userID", userID);
      // localStorage.setItem("name", name);
      setName(name);

      toast.success("Login Successful!", {
        duration: 2000,
      });
      navigate("/"); // Redirect To Home
    } catch (err) {
      console.error("Login failed", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white px-4">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
        >
          Login
        </button>

        <p className="text-center text-sm mt-8 text-gray-300">
          Don&apos;t have an account?
          <br />
          <Link
            to="/register"
            className="mt-3 inline-block bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-5 py-2 rounded-md shadow transition duration-300"
          >
            Create an Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
