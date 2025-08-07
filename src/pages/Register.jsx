import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendBaseURL = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${backendBaseURL}/auth/register`, formData);
      console.log("Registered:", res.data);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed", err);
      setError(err.response?.data?.error || "Registration error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            name="username"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
