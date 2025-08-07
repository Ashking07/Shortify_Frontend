import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "../context/useUser.jsx";

const backendBaseURL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const { name } = useUser();

  // const handleShorten = async () => {
  //   setError("");
  //   if (!originalUrl) return setError("Please enter a valid URL.");

  //   try {
  //     setLoading(true);
  //     const res = await axios.post(
  //       "http://localhost:8080/api/shorten",
  //       { originalUrl },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const shortUrl = res.data.shortUrl;
  //     setShortenedUrls((prev) => [...prev, { originalUrl, shortUrl }]);
  //     setOriginalUrl("");
  //   } catch (err) {
  //     console.error(err);
  //     setError(err.response?.data?.error || "Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleShorten = async () => {
    setError("");
    if (!originalUrl) {
      toast.error("Please enter a valid URL.");
      return;
    }

    setLoading(true);

    try {
      const res = await toast.promise(
        axios.post(
          `${backendBaseURL}/shorten`,
          { originalUrl },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        {
          loading: "Shortening URL...",
          success: "URL shortened!",
          error: "Failed to shorten URL.",
        }
      );

      const shortUrl = res.data.shortUrl;
      setShortenedUrls((prev) => [...prev, { originalUrl, shortUrl }]);
      setOriginalUrl("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Shorten your URL {name}</h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter long URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="flex-1 px-4 py-2 rounded bg-gray-700 text-white"
          />
          <button
            onClick={handleShorten}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            {loading ? "Just a Sec" : "Shorten"}
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mt-8 text-left">
          {shortenedUrls.length > 0 && (
            <h3 className="text-xl font-semibold mb-2">Your Shortened URLs:</h3>
          )}
          <ul className="space-y-2">
            {shortenedUrls.map((item, idx) => (
              <li key={idx} className="bg-gray-800 p-3 rounded">
                <div className="text-sm text-gray-300">{item.originalUrl}</div>
                <a
                  href={item.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  {item.shortUrl}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
