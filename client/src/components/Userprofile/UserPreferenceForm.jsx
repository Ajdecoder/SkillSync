import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../Userprofile/Userpreference.css";

const UserPreferenceForm = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [areasOfInterest] = useState([
    "Web Development",
    "Programming",
    "Javascript Development",
    "Sales",
    "Data Entry",
    "Digital Marketing",
    "Graphic Design",
    "Marketing",
    "Human Resources (HR)",
    "General Management",
    "Software Development",
    "Finance",
    "Content Writing",
    "Operations",
    "Project Management",
    "Software Testing",
    "Data Science",
    "Teaching",
    "Client Servicing",
    "Teaching",
    "Video Making/Editing",
    "Interior Design",
    "Python/Django Development",
    "UI/UX Design",
  ]);

  // Toggle selection of interest
  const handleToggleInterest = (interest) => {
    setSelectedInterests((prevInterests) => {
      if (prevInterests.includes(interest)) {
        return prevInterests.filter((item) => item !== interest); // Remove interest
      } else {
        return [...prevInterests, interest]; // Add interest
      }
    });
  };

  // Remove selected interest manually
  const handleRemoveInterest = (interest) => {
    setSelectedInterests((prevInterests) =>
      prevInterests.filter((item) => item !== interest)
    );
  };

  useEffect(() => {
    setSelectedInterests(selectedInterests);
  }, [selectedInterests]);

  return (
    <div className="preferences-container bg-white shadow-md border-[2px] max-w-4xl m-auto ">
      <h2>Areas of Interest</h2>

      {/* Search box */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Areas..."
          className="search-input"
        />
      </div>

      {/* Selected Interests */}
      <div className="chips-container">
        {selectedInterests.length > 0 ? (
          selectedInterests.map((interest, idx) => (
            <motion.div
              key={idx}
              className="chip"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleRemoveInterest(interest)}
            >
              {interest}
              <span className="remove-chip">x</span>
            </motion.div>
          ))
        ) : (
          <p className="p-4">Popular career interests</p>
        )}
      </div>

      {/* List of areas of interest to select from */}
      <div className="areas-list">
        {areasOfInterest.map((interest, idx) => (
          <motion.div
            key={idx}
            className={`area-item ${
              selectedInterests.includes(interest) ? "selected" : ""
            }`}
            onClick={() => handleToggleInterest(interest)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {interest}
            <span className="remove-chip">+</span>
          </motion.div>
        ))}
      </div>
      <motion.button
        className="p-3 w-36 m-3 bg-sky-600 "
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Save
      </motion.button>
    </div>
  );
};

export default UserPreferenceForm;
