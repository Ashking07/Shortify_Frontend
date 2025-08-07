import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCopy, FaTrash } from "react-icons/fa";

// Base URL from environment variable
const backendBaseURL = import.meta.env.VITE_BACKEND_URL;

const MyLinks = () => {
  const [rawUrls, setRawUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [urlToDelete, setUrlToDelete] = useState(null);

  const token = localStorage.getItem("token");
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await axios.get(
          `${backendBaseURL}/api/urls/user/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRawUrls(res.data);
      } catch (err) {
        setError("Failed to fetch URLs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, [userID, token]);

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard!");
  };

  const confirmDelete = (shortCode) => {
    setUrlToDelete(shortCode);
    setShowModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`${backendBaseURL}/api/urls/${urlToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRawUrls((prev) => prev.filter((url) => url.shortCode !== urlToDelete));
      toast.success("URL deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete the URL.");
    } finally {
      setShowModal(false);
      setUrlToDelete(null);
    }
  };

  const urlsByCategory = rawUrls.reduce((acc, url) => {
    const category = url.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(url);
    return acc;
  }, {});

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f172a]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-white text-lg">Loading your links...</p>
        </div>
      </div>
    );

  if (error)
    return <div className="text-red-400 mt-10 text-center">{error}</div>;

  return (
    <div className="min-h-screen px-4 py-8 bg-[#0f172a] text-white">
      <h2 className="text-3xl font-semibold text-center mb-8">
        📌 My Shortened Links
      </h2>

      <div className="space-y-10">
        {Object.entries(urlsByCategory).map(([category, urls]) => (
          <div key={category} className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold border-b border-gray-700 pb-2 mb-4">
              {category}
            </h3>

            {urls.map((url) => (
              <div
                key={url._id}
                className="bg-gray-700 p-4 mb-4 rounded-lg flex flex-col gap-3"
              >
                {/* Long URL + Delete */}
                <div className="flex justify-between items-center">
                  <p className="text-base text-gray-300 break-all">
                    {url.originalUrl}
                  </p>
                  <button
                    onClick={() => confirmDelete(url.shortCode)}
                    className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md flex items-center gap-2 transition"
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>

                {/* Short URL + Copy */}
                <div className="flex justify-between items-center">
                  {/* Short URL */}
                  <a
                    href={`${backendBaseURL}/api/${url.shortCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 break-all"
                  >{`${backendBaseURL}/api/${url.shortCode}`}</a>

                  <div className="flex items-center gap-4">
                    {/* Click Counter with Tooltip */}
                    <div className="relative group">
                      <div className="px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white text-sm shadow-sm flex items-center gap-1">
                        👁️ <span className="font-semibold">{url.clicks}</span>
                      </div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black/80 text-white text-xs px-4 py-1.5 rounded-lg shadow-md z-20 transition-all duration-300 ease-in-out whitespace-nowrap">
                        {`Clicked ${url.clicks} time${
                          url.clicks !== 1 ? "s" : ""
                        }`}
                      </div>
                    </div>

                    {/* Copy Button */}
                    <button
                      onClick={() =>
                        handleCopy(`${backendBaseURL}/api/${url.shortCode}`)
                      }
                      className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded flex items-center gap-2 transition"
                    >
                      <FaCopy />
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-[90%] max-w-md text-white">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this URL?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLinks;
