import React, { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const backendBaseURL = import.meta.env.VITE_BACKEND_URL;

const Footer = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const email = localStorage.getItem("email");

    if (!email || !feedback.trim()) {
      toast.warn("Please login and enter valid feedback.");
      return;
    }

    try {
      const res = await axios.post(`${backendBaseURL}/feedback`, {
        email,
        feedback,
      });

      toast.success(res.data.message);
      setFeedback(""); // Clear textarea
    } catch (err) {
      console.error("Error submitting feedback:", err);
      toast.error("Failed to send feedback. Try again.");
    }
  };

  return (
    <footer
      className="mt-24 bg-white/10 backdrop-blur-lg text-white py-10 px-6 rounded-t-3xl shadow-inner"
      id="feedback"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Socials */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            My Social Media Handles
          </h2>
          <div className="flex space-x-4 text-3xl">
            <a
              href="https://github.com/Ashking07"
              target="_blank"
              className="hover:text-blue-400"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/ashkap10/"
              target="_blank"
              className="hover:text-blue-400"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">
            Feel Free To Drop A Feedback 👋
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <textarea
              rows="4"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your feedback"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-medium"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="text-center text-sm mt-10 text-white/70">
        &copy; {new Date().getFullYear()} Shortify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
