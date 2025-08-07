// components/Footer.jsx
import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
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
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none"
            />
            <textarea
              rows="4"
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
