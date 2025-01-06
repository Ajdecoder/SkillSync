import React, { useState } from "react";

const TeamMembers = ({
  userRole,
  activeTab,
  isEditing,
  profileData,
  updatedData,
  handleInputChange,
  handleSubmit,
  handleEditClick,
  handleRemoveItem,
  handleAddItem,
}) => {
  const [editingMemberIndex, setEditingMemberIndex] = useState(null);

  // Handle start of edit mode for a team member
  const handleEditMember = (index) => {
    setEditingMemberIndex(index);
  };

  // Handle form submission for editing
  const handleSubmitEdit = (e, index) => {
    e.preventDefault();
    handleSubmit(e, "teamMembers"); // You should handle submitting the updated data here
    setEditingMemberIndex(null); // Exit edit mode after submission
  };

  // Extract the team member being edited
  const currentMember = updatedData.teamMembers[editingMemberIndex];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Team Members</h2>
      <div className="space-y-4">
        {profileData.teamMembers.map((member, idx) => (
          <div key={idx} className="border p-4 rounded-lg shadow-lg">
            {editingMemberIndex === idx ? (
              // Render Edit Form for Team Member
              <form
                onSubmit={(e) => handleSubmitEdit(e, idx)}
                className="space-y-4"
              >
                <h3 className="text-xl font-medium">Edit {member.name}</h3>
                <label className="block">
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={currentMember?.name || ""}
                    onChange={(e) => handleInputChange(e, "teamMembers")}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                  />
                </label>
                <label className="block">
                  LinkedIn:
                  <input
                    type="text"
                    name={`teamMembers.${idx}.linkedIn`} // Array of objects, using index and nested object field
                    value={member?.teamMembers?.[idx]?.linkedIn || ""}
                    onChange={(e) => handleInputChange(e, "teamMembers", idx)} // Pass the index of the array item
                    className="border border-gray-300 p-2 rounded-lg w-full"
                    placeholder="LinkedIn Profile"
                  />
                </label>
                <label className="block">
                  GitHub:
                  <input
                    type="url"
                    name="github"
                    value={currentMember?.github || ""}
                    onChange={(e) => handleInputChange(e, "teamMembers")}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                  />
                </label>
                <div className="space-x-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingMemberIndex(null)}
                    className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              // Display Team Member Info
              <div>
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
                    onClick={() => handleEditMember(idx)} // Use index instead of _id
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Edit
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {userRole === "recruiter" && (
        <button
          onClick={() => handleAddItem("teamMembers")}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Add New Member
        </button>
      )}
    </div>
  );
};

export default TeamMembers;
