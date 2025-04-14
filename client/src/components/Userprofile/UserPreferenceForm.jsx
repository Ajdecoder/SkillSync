import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../Userprofile/Userpreference.css";
import { updateUserProfileByEmail } from "../../services/api";
import { useAuth } from "../context/AuthContext";
import { Save } from "lucide-react";


const UserPreferenceForm = ({ setUpdatedData, updatedData }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
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
    "Video Making/Editing",
    "Interior Design",
    "Python/Django Development",
    "UI/UX Design",
  ]);

  const [dropdownElements] = useState([
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
    "Video Making/Editing",
    "Interior Design",
    "Python/Django Development",
    "UI/UX Design",
    "Architecture",
    "Business/MBA",
    "Consultant",
    "Market/Business Research",
    "Search Engine Optimization (SEO)",
    "Social Media Marketing",
    "Strategy",
    "Telecalling",
    "Commerce",
    "Accounts",
    "Chartered Accountancy (CA)",
    "Company Secretary (CS)",
    "Proofreading",
    "Design",
    "Fashion Design",
    "Merchandise Design",
    "Engineering",
    "Aerospace Engineering",
    "Android App Development",
    "Biotechnology Engineering",
    "Blockchain Development",
    "Chemical Engineering",
    "Civil Engineering",
    "Cloud Computing",
    "Cyber Security",
    "Electrical Engineering",
    "Electronics Engineering",
    "Energy Science & Engineering",
    "Engineering Design",
    "Engineering Physics",
    "Game Development",
    "Information Technology",
    "iOS App Development",
    "Material Science",
    "Mechanical Engineering",
    "Metallurgical Engineering",
    "Mobile App Development",
    "Naval Architecture and Ocean Engineering",
    "Network Engineering",
    "Petroleum Engineering",
    "Quality Analyst",
    "Hospitality",
    "Culinary Arts",
    "Hotel Management",
    "Travel & Tourism",
    "Media",
    "Anchoring",
    "Animation",
    "Audio Making/Editing",
    "Cinematography",
    "Film Making",
    "Journalism",
    "Motion Graphics",
    "Photography",
    "Public Relations (PR)",
    "Transcription",
    "Translation",
    "Videography",
    "Science",
    "Biology",
    "Chemistry",
    "Dietetics/Nutrition",
    "Mathematics",
    "Medicine",
    "Pharmaceutical",
    "Physics",
    "Statistics",
    "Volunteering",
    "Fundraising",
    "Social Work",
    "Acting",
    "Agriculture & Food Engineering",
    "Bank",
    "Campus Ambassador",
    "Electric Vehicle",
    "Event Management",
    "Game Design",
    "Humanities",
    "Law",
    "Music",
    "Product Management",
    "Psychology",
    "Sports",
    "Subject Matter Expert (SME)",
  ]);

  const { loggedInUser, googleUser } = useAuth();
  const currentUser = loggedInUser || googleUser;

  const handleInterestSubmit = async () => {
    try {
      const updatedProfile = {
        ...updatedData,
        preferences: {
          ...updatedData.preferences,
          careerInterests: selectedInterests,
        },
      };
      setUpdatedData(updatedProfile);
      setIsEditing(true);
      await updateUserProfileByEmail(currentUser?.email, updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredAreas = areasOfInterest.filter((interest) =>
    interest.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter Dropdowns based on search query
  const filteredDropdowns = dropdownElements.filter((dEle) =>
    dEle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const preferencesfromDb = updatedData.preferences.careerInterests;

    return setSelectedInterests(preferencesfromDb);
  }, []);

  const handleToggleInterest = (interest) => {
    setSelectedInterests((prevInterests) =>
      prevInterests.includes(interest)
        ? prevInterests.filter((item) => item !== interest)
        : [...prevInterests, interest]
    );
  };

  const handleRemoveInterest = (interest) => {
    setSelectedInterests((prevInterests) =>
      prevInterests.filter((item) => item !== interest)
    );
  };

  return (
    <div className="preferences-container bg-white shadow-md border-2 max-w-3xl m-auto">
      <h2>Areas of Interest</h2>

      {/* Search input */}
      <div className="input-div bg-gray-100 p-4 rounded-lg shadow-inner">
        <label
          htmlFor="search-input"
          className="block text-sm font-medium text-gray-700"
        >
          Search Areas of Interest:
        </label>
        <input
          id="search-input"
          type="text"
          placeholder="Search for areas you want to work in or learn about"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full mt-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600 cursor-pointer bg-white shadow-md border-2"
        />
      </div>

      {/* Selected Interests */}
      <div className="chips-container mt-4">
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

      {/* List of Areas of Interest */}
      <div className="areas-list mt-4">
        {/* Conditional rendering based on search query */}
        {(searchQuery ? filteredDropdowns : filteredAreas).map(
          (interest, idx) => (
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
              <span className="add-chip">+</span>
            </motion.div>
          )
        )}
      </div>

      {/* Save Button */}
      <motion.button
        onClick={handleInterestSubmit}
        className="p-3 w-36 m-2 bg-sky-600 text-white rounded-lg flex items-center justify-center gap-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isEditing ? (
          "Saving..."
        ) : (
          <>
            <Save className="inline w-5 h-5" />
            Save
          </>
        )}
      </motion.button>
    </div>
  );
};

export default UserPreferenceForm;
