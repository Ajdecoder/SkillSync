import React, { useState, useEffect } from "react";

const TeamMembers = ({ userRole, handleSubmit, setUpdatedData ,updatedData }) => {
  const [teamMembers, setTeamMembers] = useState(updatedData.teamMembers || []);
  const [editingIndex, setEditingIndex] = useState(null); // Track the index of the member being edited

  useEffect(() => {
    // Whenever profileData.teamMembers changes, update local state
    setTeamMembers(updatedData.teamMembers || []);
  }, [updatedData.teamMembers]);

  // Handle changes for inputs directly within the component
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers[index] = { ...updatedTeamMembers[index], [name]: value };
    setTeamMembers(updatedTeamMembers); // Update the state with new values
  };

  // Handle adding a new team member
  const handleAddNewMember = () => {
    const newMember = { name: "", linkedIn: "", github: "" }; // New member structure
    setTeamMembers([...teamMembers, newMember]); // Append new member to the list
  };

  // Handle removing a team member
  const handleRemoveMember = (index) => {
    const updatedTeamMembers = teamMembers.filter((_, idx) => idx !== index);
    setTeamMembers(updatedTeamMembers); // Remove member by index
  };

  // Handle edit button click (toggle edit mode)
  const handleEditClick = (index) => {
    setEditingIndex(index); // Set the index of the member to edit
  };

  // Handle form submission (save changes)
  const handleFormSubmit = (e) => {
    // Pass updated team members back to parent via setUpdatedData
    setUpdatedData((prevData) => ({
      ...prevData,
      teamMembers: teamMembers,
    }));
    // Call handleSubmit for any additional logic (e.g., API calls)
    handleSubmit(e);
    setEditingIndex(null); // Close edit mode after submission
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Team Members</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="space-y-4">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="border p-4 rounded-lg shadow-lg">
              {editingIndex === idx ? (
                // Show the form for the selected team member to edit
                <>
                  <h3 className="text-xl font-semibold">Edit Team Member {idx + 1}</h3>
                  <label className="block">
                    Name:
                    <input
                      type="text"
                      name="name"
                      value={member.name}
                      onChange={(e) => handleChange(e, idx)}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                    />
                  </label>
                  <label className="block">
                    Role:
                    <input
                      type="text"
                      name="teamMemberRole"
                      value={member.teamMemberRole}
                      onChange={(e) => handleChange(e, idx)}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                      placeholder="Member Role"
                    />
                  </label>
                  <label className="block">
                    LinkedIn:
                    <input
                      type="text"
                      name="linkedIn"
                      value={member.linkedIn}
                      onChange={(e) => handleChange(e, idx)}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                      placeholder="LinkedIn Profile"
                    />
                  </label>
                  <label className="block">
                    GitHub:
                    <input
                      type="url"
                      name="github"
                      value={member.github}
                      onChange={(e) => handleChange(e, idx)}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                      placeholder="GitHub Profile"
                    />
                  </label>
                  
                  <div className="space-x-4 mt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"

                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingIndex(null)} // Close edit mode
                      className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                // Display the team member info and Edit button
                <>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-blue-600">
                    <a
                      href={member.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </p>
                  <p className="text-blue-600">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </p>
                  {userRole === "recruiter" && (
                    <button
                      type="button"
                      onClick={() => handleEditClick(idx)} // Trigger edit mode for the specific member
                      className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(idx)}
                    className="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="space-x-4 mt-4">
          <button
            type="button"
            onClick={handleAddNewMember}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Add New Member
          </button>
        </div>  
      </form>
    </div>
  );
};

export default TeamMembers;
