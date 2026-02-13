import { motion } from "framer-motion";
import React, { useState } from "react";
import { updateUserProfileByEmail } from "../../../services/api";
import { FaEdit } from "react-icons/fa";

// Helper components for better organization
const SkillDisplay = ({ skills }) => (
  <div className="flex flex-wrap gap-2">
    {skills?.length > 0 ? (
      skills.map((skill, idx) => (
        <span
          key={idx}
          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
        >
          {skill}
        </span>
      ))
    ) : (
      <p className="text-gray-400 italic">No skills listed</p>
    )}
  </div>
);

const ExperienceDisplay = ({ experience }) => (
  <div className="space-y-4">
    {experience?.length > 0 ? (
      experience.map((exp, idx) => (
        <div
          key={idx}
          className="p-4 border rounded-lg bg-gray-50 hover:bg-white transition-colors"
        >
          <h4 className="text-lg font-medium text-gray-800">
            {exp.jobRole || "Untitled Position"} at{" "}
            <span className="text-blue-600">
              {exp.company || "Unknown Company"}
            </span>
            {exp?.duration && (
              <>
                {" "}
                (
                {exp.duration.start
                  ? `${new Date(exp.duration.start).toLocaleDateString(
                      "en-IN",
                      {
                        year: "numeric",
                        month: "short",
                      }
                    )}`
                  : "Start Date N/A"}{" "}
                -{" "}
                {exp.duration.end
                  ? `${new Date(exp.duration.end).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                    })}`
                  : "Present"}
                )
              </>
            )}
          </h4>
          {exp.description && (
            <p className="mt-2 text-gray-600">{exp.description}</p>
          )}
        </div>
      ))
    ) : (
      <div className="p-4 text-center text-gray-400 italic bg-gray-50 rounded-lg">
        No experience listed
      </div>
    )}
  </div>
);

const EducationDisplay = ({ education }) => (
  <div className="space-y-4">
    {education?.length > 0 ? (
      education.map((edu, idx) => (
        <div
          key={idx}
          className="p-4 border rounded-lg bg-gray-50 hover:bg-white transition-colors"
        >
          <h4 className="text-lg font-medium text-gray-800">
            {edu.degree || "Undisclosed Degree"}
          </h4>
          <p className="text-gray-600">
            {edu.institution || "Unknown Institution"}
          </p>
          {edu.year && (
            <p className="text-sm text-gray-500 mt-1">
              🎓 Graduated: {edu.year}
            </p>
          )}
        </div>
      ))
    ) : (
      <div className="p-4 text-center text-gray-400 italic bg-gray-50 rounded-lg">
        No education listed
      </div>
    )}
  </div>
);

const EditSkills = ({ skills, onChange, onSave, saving }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-700">Skills</h3>
    <textarea
      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
      value={skills?.join(", ") || ""}
      placeholder="e.g., JavaScript, React, Node.js"
      onChange={(e) => onChange("skills", null, e.target.value)}
      rows="3"
    />
    <div className="flex justify-end gap-3">
      <motion.button
        className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
        onClick={onSave}
        disabled={saving}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {saving ? "Saving..." : "Save Skills"}
      </motion.button>
    </div>
  </div>
);

const EditExperience = ({
  experience,
  onChange,
  onAdd,
  onRemove,
  onSave,
  saving,
}) => {
  const formatDateForInput = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Experience</h3>
      <div className="space-y-6 border-t p-6">
        {experience?.map((exp, idx) => (
          <div key={idx} className="p-4 border rounded-lg bg-gray-50 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300"
                value={exp.jobRole}
                placeholder="Job Title *"
                onChange={(e) =>
                  onChange("experience", "jobRole", e.target.value, idx)
                }
              />
              <input
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300"
                value={exp.company}
                placeholder="Company *"
                onChange={(e) =>
                  onChange("experience", "company", e.target.value, idx)
                }
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm text-gray-500">
                    Start Date
                  </label>
                  <input
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300"
                    type="date"
                    value={formatDateForInput(exp?.duration?.start) || ""}
                    onChange={(e) =>
                      onChange("experience", "startDate", e.target.value, idx)
                    }
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm text-gray-500">
                    End Date
                  </label>
                  <input
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300"
                    type="date"
                    value={formatDateForInput(exp?.duration?.end) || ""}
                    onChange={(e) =>
                      onChange("experience", "endDate", e.target.value, idx)
                    }
                  />
                </div>
              </div>

              <textarea
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300"
                value={exp.description}
                placeholder="Description"
                onChange={(e) =>
                  onChange("experience", "description", e.target.value, idx)
                }
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                className="text-red-500 hover:text-red-700 flex items-center gap-1"
                onClick={() => onRemove("experience", idx)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="flex flex-row-reverse center justify-between items-center gap-4">
          <motion.button
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 block "
            onClick={onSave}
            disabled={saving}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {saving ? "Saving..." : "Save Experience"}
          </motion.button>

          <button
            className=" text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-2"
            onClick={() => onAdd("experience")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            Add Experience
          </button>
        </div>
      </div>
    </div>
  );
};

const EditEducation = ({
  education,
  onChange,
  onAdd,
  onRemove,
  onSave,
  saving,
}) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-700">Education</h3>
    <div className="space-y-6 border-t p-6">
      {education?.map((edu, idx) => (
        <div key={idx} className="p-4 border rounded-lg bg-gray-50 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300"
              value={edu.degree}
              placeholder="Degree *"
              onChange={(e) =>
                onChange("education", "degree", e.target.value, idx)
              }
            />
            <input
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300"
              value={edu.institution}
              placeholder="Institution *"
              onChange={(e) =>
                onChange("education", "institution", e.target.value, idx)
              }
            />
            <input
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300"
              value={edu.year}
              placeholder="Graduation Year"
              onChange={(e) =>
                onChange("education", "year", e.target.value, idx)
              }
            />
          </div>
          <button
            className="text-red-500 hover:text-red-700 flex items-center gap-1"
            onClick={() => onRemove("education", idx)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Remove
          </button>
        </div>
      ))}

      <div className="flex flex-row-reverse center justify-between items-center gap-4">
        <motion.button
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          onClick={onSave}
          disabled={saving}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {saving ? "Saving..." : "Save Education"}
        </motion.button>

        <button
          className=" text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-2"
          onClick={() => onAdd("education")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
          Add Education
        </button>
      </div>
    </div>
  </div>
);

export const SkillsAndExperience = ({
  profileData,
  isEditing,
  setIsEditing,
}) => {
  const [updatedData, setUpdatedData] = useState(profileData);
  const [saving, setSaving] = useState(false);

  const handleInputChange = (section, field, value, idx = null) => {
    console.log('runs',section, field, value, idx)
    if (section === "skills") {
      setUpdatedData({
        ...updatedData,
        skills: value.split(", ").filter((skill) => skill.trim() !== ""),
      });
      return;
    }

    if (idx !== null) {
      const updatedSection = [...updatedData[section]];
      if (field === "startDate" || field === "endDate") {
        updatedSection[idx] = {
          ...updatedSection[idx],
          duration: {
            ...updatedSection[idx].duration,
            [field === "startDate" ? "start" : "end"]: value,
          },
        };
      } else {
        updatedSection[idx][field] = value;
      }
      setUpdatedData({ ...updatedData, [section]: updatedSection });
    } else {
      setUpdatedData({ ...updatedData, [section]: value });
    }
  };

  const handleAddEntry = (section) => {
    const newEntry =
      section === "experience"
        ? {
            jobRole: "",
            company: "",
            duration: { start: "", end: "" },
            description: "",
          }
        : section === "education"
        ? { degree: "", institution: "", year: "" }
        : null;

    if (newEntry) {
      setUpdatedData({
        ...updatedData,
        [section]: [...(updatedData[section] || []), newEntry],
      });
    }
  };

  const handleRemoveEntry = (section, idx) => {
    const updatedSection = [...updatedData[section]];
    updatedSection.splice(idx, 1);
    setUpdatedData({ ...updatedData, [section]: updatedSection });
  };

  const validateSection = (section) => {
    if (section === "skills") return true;

    const requiredFields = {
      experience: ["jobRole", "company"],
      education: ["degree", "institution"],
    };

    return updatedData[section].every((entry) =>
      requiredFields[section].every((field) => entry[field]?.trim())
    );
  };

  const handleSaveSection = async (section) => {
    if (!validateSection(section)) {
      alert(`Please fill all required fields in ${section}`);
      return;
    }

    setSaving(true);
    try {
      const response = await updateUserProfileByEmail(profileData.email, {
        [section]: updatedData[section],
      });

      if (response.status === 200) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to update ${section}: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!isEditing ? (
        <section className="mt-6 bg-white p-6 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            Skills & Experience
          </h2>
          <div className="space-y-8">
            {/* Skills */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                <span className="mr-2">🛠 Skills</span>
              </h3>
              <SkillDisplay skills={updatedData?.skills} />
            </div>

            {/* Experience */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                <span className="mr-2">💼 Experience</span>
              </h3>
              <ExperienceDisplay experience={updatedData?.experience} />
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                <span className="mr-2">🎓 Education</span>
              </h3>
              <EducationDisplay education={updatedData?.education} />
            </div>
          </div>

          <motion.button
            className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            onClick={() => setIsEditing(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEdit />
            Edit Profile
          </motion.button>
        </section>
      ) : (
        <section className="mt-6 bg-white p-8 rounded-lg shadow-md dark:text-black ">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            Edit Skills & Experience
          </h2>
          <div className="space-y-8">
            <EditSkills
              skills={updatedData.skills}
              onChange={handleInputChange}
              onSave={() => handleSaveSection("skills")}
              saving={saving}
            />

            <EditExperience
              experience={updatedData.experience}
              onChange={handleInputChange}
              onAdd={handleAddEntry}
              onRemove={handleRemoveEntry}
              onSave={() => handleSaveSection("experience")}
              saving={saving}
            />

            <EditEducation
              education={updatedData.education}
              onChange={handleInputChange}
              onAdd={handleAddEntry}
              onRemove={handleRemoveEntry}
              onSave={() => handleSaveSection("education")}
              saving={saving}
            />
          </div>

          <div className="flex justify-end gap-4 mt-8 border-t pt-6">
            <motion.button
              className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              onClick={() => setIsEditing(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
          </div>
        </section>
      )}
    </div>
  );
};
