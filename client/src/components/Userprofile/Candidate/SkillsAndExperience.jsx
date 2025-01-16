import { motion } from "framer-motion";
import React, { useState } from "react";

export const SkillsAndExperience = ({
  profileData,
  isEditing,
  setIsEditing,
  handleSubmit,
}) => {
  const [editedData, setEditedData] = useState(profileData);

  const handleInputChange = (section, field, value, idx = null) => {
    if (idx !== null) {
      const updatedSection = [...editedData[section]];
      updatedSection[idx][field] = value;
      setEditedData({ ...editedData, [section]: updatedSection });
    } else {
      setEditedData({ ...editedData, [section]: value });
    }
  };

  const handleAddEntry = (section) => {
    const newEntry =
      section === "experience"
        ? { JobRole: "", company: "", duration: "", description: "" }
        : section === "education"
        ? { degree: "", institution: "", year: "" }
        : ""; // No default entry for skills as it's a string array.

    setEditedData({
      ...editedData,
      [section]: [...editedData[section], newEntry],
    });
  };

  const handleRemoveEntry = (section, idx) => {
    const updatedSection = [...editedData[section]];
    updatedSection.splice(idx, 1);
    setEditedData({ ...editedData, [section]: updatedSection });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!isEditing ? (
        <section className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">
            Skills & Experience
          </h2>
          <div className="mt-6 space-y-6">
            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Skills</h3>
              <p className="mt-2 text-gray-600">
                {profileData?.skills?.join(", ") || "No skills listed"}
              </p>
            </div>
            {/* Experience */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Experience
              </h3>
              <ul className="mt-2 space-y-4">
                {profileData?.experience?.map((exp, idx) => (
                  <li
                    key={idx}
                    className="p-4 border rounded-lg bg-gray-50 shadow-sm"
                  >
                    <h4 className="text-lg font-medium text-gray-800">
                      {exp.JobRole} at{" "}
                      <span className="italic text-blue-600">
                        {exp.company}
                      </span>
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">{exp.duration}</p>
                    <p className="text-gray-600">
                      <strong>Description:</strong> {exp.description || "N/A"}
                    </p>
                  </li>
                )) || <p>No experience listed</p>}
              </ul>
            </div>
            {/* Education */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Education</h3>
              <ul className="mt-2 space-y-2">
                {profileData?.education?.map((edu, idx) => (
                  <li key={idx} className="text-gray-600">
                    <span className="font-medium">{edu.degree}</span> from{" "}
                    <span className="italic">{edu.institution}</span> (
                    {edu.year})
                  </li>
                )) || <p>No education listed</p>}
              </ul>
            </div>
          </div>
          <motion.button
            className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
            onClick={() => setIsEditing(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Edit
          </motion.button>
        </section>
      ) : (
        <section className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">
            Edit Skills & Experience
          </h2>
          <div className="mt-6 space-y-6">
            {/* Edit Skills */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Skills</h3>
              <textarea
                className="mt-2 w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                value={editedData.skills.join(", ")}
                placeholder="Enter skills separated by commas"
                onChange={(e) =>
                  handleInputChange("skills", null, e.target.value.split(", "))
                }
              />
            </div>
            {/* Edit Experience */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Experience
              </h3>
              {editedData.experience.map((exp, idx) => (
                <div key={idx} className="mt-4 space-y-2 p-4 border rounded-lg">
                  <input
                    className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                    value={exp.JobRole}
                    placeholder="Job Role"
                    onChange={(e) =>
                      handleInputChange(
                        "experience",
                        "JobRole",
                        e.target.value,
                        idx
                      )
                    }
                  />
                  <input
                    className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                    value={exp.company}
                    placeholder="Company"
                    onChange={(e) =>
                      handleInputChange(
                        "experience",
                        "company",
                        e.target.value,
                        idx
                      )
                    }
                  />
                  <input
                    className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                    value={exp.duration}
                    placeholder="Duration"
                    onChange={(e) =>
                      handleInputChange(
                        "experience",
                        "duration",
                        e.target.value,
                        idx
                      )
                    }
                  />
                  <textarea
                    className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                    value={exp.description}
                    placeholder="Description"
                    onChange={(e) =>
                      handleInputChange(
                        "experience",
                        "description",
                        e.target.value,
                        idx
                      )
                    }
                  />
                  <button
                    className="text-red-500 mt-2"
                    onClick={() => handleRemoveEntry("experience", idx)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                className="mt-4 text-blue-500"
                onClick={() => handleAddEntry("experience")}
              >
                + Add Experience
              </button>
            </div>
            {/* Edit Education */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Education</h3>
              {editedData.education.map((edu, idx) => (
                <div key={idx} className="mt-4 space-y-2">
                  <input
                    className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                    value={edu.degree}
                    placeholder="Degree"
                    onChange={(e) =>
                      handleInputChange(
                        "education",
                        "degree",
                        e.target.value,
                        idx
                      )
                    }
                  />
                  <input
                    className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                    value={edu.institution}
                    placeholder="Institution"
                    onChange={(e) =>
                      handleInputChange(
                        "education",
                        "institution",
                        e.target.value,
                        idx
                      )
                    }
                  />
                  <input
                    className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                    value={edu.year}
                    placeholder="Year"
                    onChange={(e) =>
                      handleInputChange(
                        "education",
                        "year",
                        e.target.value,
                        idx
                      )
                    }
                  />
                  <button
                    className="text-red-500 mt-2"
                    onClick={() => handleRemoveEntry("education", idx)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                className="mt-4 text-blue-500"
                onClick={() => handleAddEntry("education")}
              >
                + Add Education
              </button>
            </div>
          </div>
          <div className="flex justify-end mt-6 space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
              onClick={() => handleSubmit(editedData, "SkillsAndExperience")}
            >
              Save
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-4 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </motion.button>
          </div>
        </section>
      )}
    </div>
  );
};
