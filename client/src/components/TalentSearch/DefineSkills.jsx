// DefineSkills.js
import React, { useState } from "react";
import { useHireFormContext } from "../context/HireFormContext";

const DefineSkills = ({ nextStep, prevStep }) => {
  const { formData, handleFormDataChange } = useHireFormContext();

  const [selectedSkills, setSelectedSkills] = useState(formData.skills || []);
  const [newSkill, setNewSkill] = useState("");

  const handleSkillChange = (e) => {
    const skill = e.target.value;
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleAddSkill = () => {
    if (newSkill && !selectedSkills.includes(newSkill)) {
      setSelectedSkills((prev) => [...prev, newSkill]);
      setNewSkill(""); // Clear input field after adding
    }
  };

  const handleSubmit = () => {
    handleFormDataChange({ skills: selectedSkills });
    nextStep();
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Define Skills</h2>

      {/* Select Skills */}
      <label className="block text-lg font-medium mb-4 text-gray-700">Select Skills</label>
      <div className="flex flex-wrap gap-4 mb-6">
        {["JavaScript", "React", "Node.js", "Python", "Django"].map((skill) => (
          <label key={skill} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={skill}
              checked={selectedSkills.includes(skill)}
              onChange={handleSkillChange}
              className="text-blue-500 focus:ring-blue-500"
            />
            <span className="text-gray-700">{skill}</span>
          </label>
        ))}
      </div>

      {/* Add a Custom Skill */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2 text-gray-700">Add a Custom Skill</label>
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter a skill"
            className="p-3  border-gray-300 rounded-md mb-4 block w-full p-4 text-gray-900 border  bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            onClick={handleAddSkill}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300 mb-4 "
          >
            Add
          </button>
        </div>
      </div>

      {/* Display Selected Skills */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Selected Skills:</h3>
        <ul className="list-disc list-inside flex flex-wrap gap-4 mt-2">
          {selectedSkills.map((skill, index) => (
            <li key={index} className="p-2 bg-gray-200 rounded-md text-gray-800">
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8">
        <button
          className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-colors duration-300"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300"
          onClick={handleSubmit}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DefineSkills;
