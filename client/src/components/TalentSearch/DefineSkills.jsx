// DefineSkills.js
import React, { useState } from "react";
import { useHireFormContext } from "../context/HireFormContext";

const DefineSkills = ({ nextStep, prevStep }) => {


    const {formData, handleFormDataChange} = useHireFormContext()


  const [selectedSkills, setSelectedSkills] = useState(formData.skills || []);
  const [newSkill, setNewSkill] = useState("");

  const handleSkillChange = (e) => {
    const skill = e.target.value;
    setSelectedSkills((prev) => {
      if (prev.includes(skill)) {
        return prev.filter((s) => s !== skill);
      } else {
        return [...prev, skill];
      }
    });
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
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Define Skills</h2>

      <label className="block mb-2 text-xl p-2">Select Skills</label>
      <div className="mb-4 flex">
        <label>
          <input
            type="checkbox"
            value="JavaScript"
            checked={selectedSkills.includes("JavaScript")}
            onChange={handleSkillChange}
            className="mr-2"
          />
          JavaScript
        </label>
        <label>
          <input
            type="checkbox"
            value="React"
            checked={selectedSkills.includes("React")}
            onChange={handleSkillChange}
            className="mr-2"
          />
          React
        </label>
        <label>
          <input
            type="checkbox"
            value="Node.js"
            checked={selectedSkills.includes("Node.js")}
            onChange={handleSkillChange}
            className="mr-2"
          />
          Node.js
        </label>


        <label className="mb-2">
    <input
      type="checkbox"
      value="Python"
      checked={selectedSkills.includes("Python")}
      onChange={handleSkillChange}
      className="mr-2"
    />
    Python
  </label>

  <label className="mb-2">
    <input
      type="checkbox"
      value="Django"
      checked={selectedSkills.includes("Django")}
      onChange={handleSkillChange}
      className="mr-2"
    />
    Django
  </label>

      </div>

      <div className="mb-4">
        <label className="block mb-2 text-xl p-2">Add a Custom Skill</label>
        <div className="flex items-center">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter a skill"
            className="p-2 border border-cyan-300 rounded-md w-full"
          />
          <button
            onClick={handleAddSkill}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add
          </button>
        </div>
      </div>

      {/* Display selected skills */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Selected Skills:</h3>
        <ul className="list-disc list-inside flex justify-center gap-11">
          {selectedSkills.map((skill, index) => (
            <li key={index} className="ml-4 p-1">
              {skill}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleSubmit}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DefineSkills;
