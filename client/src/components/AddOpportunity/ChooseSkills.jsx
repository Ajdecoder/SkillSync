import React, { useState, useEffect } from "react";
import { useForm } from "../context/AddOpportunityFromContext";

const skillsList = [
  { skillName: "JavaScript" },
  { skillName: "React" },
  { skillName: "Node.js" },
  { skillName: "Python" },
  { skillName: "Machine Learning" },
  { skillName: "Data Analysis" },
  { skillName: "UI/UX Design" },
  { skillName: "DevOps" },
  { skillName: "Cloud Computing" },
  { skillName: "Cybersecurity" },
];

export const ChooseSkills = ({ nextStep, prevStep }) => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState("");
  const { formData, updateForm } = useForm();
  const [error, setError] = useState(""); // State to store error message

  // Initialize selected skills with form data if available
  useEffect(() => {
    if (formData.skills && formData.skills.length > 0) {
      setSelectedSkills(formData.skills);
    }
  }, [formData.skills]);

  const handleSkillClick = (skill) => {
    if (!selectedSkills.find((s) => s.skillName === skill.skillName)) {
      const updatedSkills = [...selectedSkills, skill];
      setSelectedSkills(updatedSkills);
      updateForm({ skills: updatedSkills }); // Update context
    }
  };

  const removeSkill = (skill) => {
    const updatedSkills = selectedSkills.filter(
      (s) => s.skillName !== skill.skillName
    );
    setSelectedSkills(updatedSkills);
    updateForm({ skills: updatedSkills }); // Update context
  };

  const addCustomSkill = () => {
    if (
      customSkill.trim() &&
      !selectedSkills.find((s) => s.skillName === customSkill)
    ) {
      const newSkill = { skillName: customSkill.trim() };
      const updatedSkills = [...selectedSkills, newSkill];
      setSelectedSkills(updatedSkills);
      updateForm({ skills: updatedSkills }); // Update context
      setCustomSkill("");
    }
  };

  // Validate that all required fields are filled
  const verifyAllFieldsAreFilled = () => {
    if (selectedSkills.length === 0) {
      setError("choose all required skills."); // Set error message
      return false;
    }
    setError(""); // Clear error message if validation passes
    return true;
  };

  const handleNextClick = () => {
    if (verifyAllFieldsAreFilled()) {
      nextStep(); // Proceed to next step if validation passes
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6 dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold text-gray-800 text-center dark:text-white">
        Skills Required
      </h1>
      {/* Selected Skills */}
      <div className="flex flex-wrap gap-2">
        {selectedSkills.map((skill) => (
          <div
            key={skill.skillName}
            className="flex items-center px-4 py-2 bg-gray-100 rounded-full shadow-sm text-sm cursor-pointer dark:bg-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            onClick={() => removeSkill(skill)}
          >
            {skill.skillName}
            <span className="ml-2 text-red-500 font-bold">&times;</span>
          </div>
        ))}
        {selectedSkills.length === 0 && (
          <p className="text-gray-500">No skills selected yet.</p>
        )}
      </div>
      {/* Skill Suggestions */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-700 dark:text-white">Suggested Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skillsList.map((skill) => (
            <button
              key={skill.skillName}
              className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full shadow-sm text-sm hover:bg-blue-200"
              onClick={() => handleSkillClick(skill)}
            >
              {skill.skillName}
            </button>
          ))}
        </div>
      </div>
      {/* Add Custom Skill */}
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-gray-700 dark:text-white">
          Add a Custom Skill
        </h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter a custom skill"
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={addCustomSkill}
            onKeyDown ={addCustomSkill}
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
          >
            Add Skill
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="shake-animated text-red-500 text-sm">{error}</p>
      )}

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNextClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ChooseSkills;
