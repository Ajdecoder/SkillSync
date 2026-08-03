import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const HireTalentModal = ({ candidate, onClose }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryOffered, setSalaryOffered] = useState("");
  const [startDate, setStartDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      //   const response = await axios.post("/api/hire-candidate", {
      //     recruiterId: "RECRUITER_ID",  // Get from user session
      //     candidateId: candidate?._id,
      //     jobTitle,
      //     jobType,
      //     salaryOffered,
      //     startDate,
      //     message,
      //   });

      toast.success("Hiring request sent!", {
        autoClose: 1000,
      });
      onClose(); // Close modal after submission
    } catch (error) {
      console.error("Error sending hiring request", error);
      toast.error("Something went wrong.", {
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 dark:bg-gray-700 dark:text-white">
        <h2 className="text-xl font-bold mb-4">
          Hire {candidate?.name || "NA"}
        </h2>

        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />

        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="border p-2 rounded w-full mb-2 dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>

        <input
          type="number"
          placeholder="Salary Offered"
          value={salaryOffered}
          onChange={(e) => setSalaryOffered(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />

        <textarea
          placeholder="Message to Candidate (Optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />

        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default HireTalentModal;
