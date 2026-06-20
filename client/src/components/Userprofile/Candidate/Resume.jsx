import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaUpload } from "react-icons/fa";
import axios from "axios";
import { PORT_CLIENT } from "../../../commonClient";

const ResumeUpload = ({ user }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  // Handle drag & drop
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  // Handle upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${PORT_CLIENT}/api/user/profile/upload-resume/${user?._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 30000,
          withCredentials: true,
        }
      );

      console.log(" Upload Success:", response.data);
      alert("Resume uploaded successfully!");
      setFile(null);
    } catch (error) {
      console.error(" Upload failed:", error);
      alert("Error uploading resume!");
    } finally {
      setLoading(false);
    }
  };

  // File picker trigger
  const handleClick = () => fileInputRef.current.click();

  const handleRemove = () => setFile(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center p-6 bg-white shadow-lg rounded-2xl w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4 dark:text-black">
        Upload Your Resume
      </h2>

      <div
        className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center cursor-pointer hover:bg-gray-50 transition"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <FaUpload size={40} className="text-gray-500 mb-2" />
        <p className="text-gray-600">
          Drag & Drop or Click to Upload
        </p>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex items-center gap-4 mt-4">
        <h4 className="text-lg font-medium dark:text-black">
          {user?.resumeFileName || "No resume uploaded"}
        </h4>

        {user?.resume && (
          <a
            href={user.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-semibold hover:underline hover:text-blue-800"
          >
            View Resume
          </a>
        )}
      </div>

      {file && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-4 p-3 bg-gray-100 rounded-lg text-gray-700 w-full text-center"
        >
          <span className="flex justify-between items-center">
            <p className="truncate">{file.name}</p>
            <button
              onClick={handleRemove}
              className="p-2 rounded-full hover:bg-red-100 transition"
            >
              <FaTrash size={21} className="text-red-600" />
            </button>
          </span>

          {loading ? (
            <p className="mt-3 text-blue-600 font-medium animate-pulse">
              Uploading Resume...
            </p>
          ) : (
            <button
              onClick={handleUpload}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Upload Resume
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResumeUpload;
