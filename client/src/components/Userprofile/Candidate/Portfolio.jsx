import { useState } from "react";
import { FaEdit } from "react-icons/fa";

export const Portfolio = ({
  profileData,
  isEditing,
  setIsEditing,
  handleSubmit,
  setUpdatedData,
  updatedData,
}) => {
  const [editedPortfolio, setEditedPortfolio] = useState(
    profileData?.portfolio || []
  );

  // Handle changes to portfolio items
  const handleInputChange = (index, field, value) => {
    const updatedPortfolio = [...editedPortfolio];
    updatedPortfolio[index] = {
      ...updatedPortfolio[index],
      [field]: value,
    };
    setEditedPortfolio(updatedPortfolio);
    setUpdatedData({
      ...updatedData,
      portfolio: updatedPortfolio,
    });
  };

  // Add a new portfolio item
  const handleAddPortfolioItem = () => {
    const newItem = { projectName: "", link: "" };
    const updatedPortfolio = [...editedPortfolio, newItem];
    setEditedPortfolio(updatedPortfolio);
    setUpdatedData({
      ...updatedData,
      portfolio: updatedPortfolio,
    });
  };

  // Remove a portfolio item
  const handleRemovePortfolioItem = (index) => {
    const updatedPortfolio = editedPortfolio.filter((_, idx) => idx !== index);
    setEditedPortfolio(updatedPortfolio);
    setUpdatedData({
      ...updatedData,
      portfolio: updatedPortfolio,
    });
  };

  const saveChanges = () => {
    handleSubmit("portfolio"); // Submit the changes
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div>
      {!isEditing ? (
        <section className="profile-content mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Portfolio</h2>
          <div className="mt-4 space-y-4">
            {updatedData?.portfolio?.length > 0 ? (
              updatedData.portfolio.map((portfolioItem, idx) => (
                <div key={idx} className="mb-4">
                  <p className="font-bold">Project Title:</p>
                  <p>{portfolioItem.title}</p>
                  <p className="font-bold">Link:</p>
                  <p>
                    <a
                      href={portfolioItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {portfolioItem.link}
                    </a>
                  </p>
                </div>
              ))
            ) : (
              <p>No portfolio available</p>
            )}
          </div>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit />
          </button>
        </section>
      ) : (
        <section className="profile-content mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Edit Portfolio</h2>
          <div className="mt-4 space-y-4">
            {editedPortfolio.map((portfolioItem, idx) => (
              <div key={idx} className="mb-4">
                <label className="font-bold block">Project Name:</label>
                <input
                  style={{
                    border: "0.5px solid",
                  }}
                  type="text"
                  className="w-full p-4 border rounded mb-2"
                  value={portfolioItem.title}
                  onChange={(e) =>
                    handleInputChange(idx, "title", e.target.value)
                  }
                  placeholder="Enter project name"
                />
                <label className="font-bold block">Link:</label>
                <input
                  style={{
                    border: "0.5px solid",
                  }}
                  type="text"
                  className="w-full p-4 border rounded"
                  value={portfolioItem.link}
                  onChange={(e) =>
                    handleInputChange(idx, "link", e.target.value)
                  }
                  placeholder="Enter project link"
                />
                <button
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => handleRemovePortfolioItem(idx)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
              onClick={handleAddPortfolioItem}
            >
              Add New Portfolio Item
            </button>
          </div>
          <div className="mt-4 flex gap-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={saveChanges} // Save changes and reflect immediately
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
