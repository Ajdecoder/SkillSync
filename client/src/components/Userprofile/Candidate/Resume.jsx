import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaUpload } from "react-icons/fa";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null); 

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click(); 
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center p-6 bg-white shadow-lg rounded-2xl w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4 dark:text-black">Upload Your Resume</h2>
      <div
        className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center cursor-pointer hover:bg-gray-50 transition"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <FaUpload size={40} className="text-gray-500 mb-2" />
        <p className="text-gray-600">Drag & Drop or Click to Upload</p>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {file && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-4 p-3 bg-gray-100 rounded-lg text-gray-700 w-full text-center"
        >
          <p className="whitespace-normal  break-words" >{file.name}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResumeUpload;
