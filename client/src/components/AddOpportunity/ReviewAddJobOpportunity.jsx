import React, { useState, useEffect } from "react";
import { useForm } from "../context/AddOpportunityFromContext";
import axios from "axios";
import { PORT_CLIENT } from "../../commonClient";
import { toast, ToastContainer } from "react-toastify";
import { addOpportunity, getUserProfileByEmail } from "../../services/api";
import NotificationToasts from "../common/Toast/Toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ReviewJobOpportunity = ({ prevStep }) => {
  const { formData, updateForm } = useForm();
  const [editMode, setEditMode] = useState(false);
  const [localFormData, setLocalFormData] = useState({
    skills: [{ skillName: "" }],
    ...formData,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState("success");
  const [payloadRecruiterId, setPayloadRecruiterId] = useState(null);
  const [payloadJobId, setPayloadJobId] = useState(null);

  const navigate = useNavigate();
  const { loggedInUser,googleUser } = useAuth();

  const currentUser = loggedInUser || googleUser;


  // Check if the form is complete or needs more data
  useEffect(() => {
    const isValid =
      localFormData.title &&
      localFormData.company_name &&
      localFormData.company_website &&
      localFormData.ph_no &&
      localFormData.location &&
      localFormData.type &&
      localFormData.minSalary &&
      localFormData.maxSalary &&
      localFormData.desc_requirement;
    setIsFormValid(isValid);
  }, [localFormData]);

  const handleInputChange = (field, value) => {
    setLocalFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSkillsInputChange = (field, value, index = null) => {
    if (field === "skills") {
      const updatedSkills = [...localFormData.skills];
      updatedSkills[index].skillName = value; // Update the specific skill
      setLocalFormData({ ...localFormData, skills: updatedSkills });
    } else {
      setLocalFormData({ ...localFormData, [field]: value });
    }
  };

  useEffect(() => {
    if (!currentUser?.email) return;

    const fetchBookmarkedTalents = async () => {
      try {
        const response = await getUserProfileByEmail(loggedInUser.email);
        const recruiterId = response?.data?.recruiterProfile?._id || [];
        setPayloadRecruiterId(recruiterId);
      } catch (error) {
        console.error("Error fetching bookmarked talents:", error);
      }
    };

    fetchBookmarkedTalents();
  });

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // Prevent form submission reload
    updateForm(localFormData); // Update global form context

    // Check if all required fields are included in payload
    const {
      title,
      company_name,
      company_website,
      ph_no,
      location,
      maxSalary,
      minSalary,
      desc_requirement,
      skills,
      requirement_type,
    } = localFormData;

    if (
      !title ||
      !company_name ||
      !company_website ||
      !ph_no ||
      !location ||
      !requirement_type ||
      !minSalary ||
      !maxSalary ||
      !desc_requirement ||
      !skills.length
    ) {
      setToastMessage("Please fill in all required fields.");
      setToastType("info");
      return;
    }

    try {
      setIsSubmitting(true);

      // Construct the payload
      const payload = {
        action: "job_posted",
        payload: {
          skills: localFormData.skills.map((skill) => ({
            skillName: skill.skillName,
          })),
          title: localFormData.title,
          company_name: localFormData.company_name,
          company_website: localFormData.company_website,
          ph_no: localFormData.ph_no,
          email: localFormData.email,
          location: localFormData.location,
          requirement_type: localFormData.requirement_type,
          minSalary: localFormData.minSalary,
          maxSalary: localFormData.maxSalary,
          desc_requirement: localFormData.desc_requirement,
          recruiterDetails: payloadRecruiterId,
        },
      };

      const response = await addOpportunity(payload);
      setPayloadJobId(response.data.id);
      console.log(response.data.id);
      console.log(payloadJobId);
      const updatedPayload = {
        ...payload,
        payload: {
          ...payload.payload,
          jobId: response.data.id, // Include the jobId here
        },
      };
      await addOpportunity(updatedPayload);
      setToastMessage("Form Submitted Successfully");
      setToastType("success");
      setIsSubmitting(false);
      navigate('/')
    } catch (error) {
      console.error("Error Submitting Form:", error);
      setToastMessage("Error Submitting Form");
      setToastType("error");
    } finally {
      setIsSubmitting(false);
      navigate('/');
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSaveChanges = (e) => {
    setEditMode(false); // Proceed with saving the changes
    handleSubmit(); // Call the submit function to handle form data
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-5 mb-5 dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
        {editMode ? "Edit Your Job Listing" : "Review Your Job Listing"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {" "}
        {/* Wrapping with form */}
        {/* Job Title */}
        <div className="border-b p-4">
          <h3 className="text-xl font-semibold text-gray-700">Job Title</h3>
          {editMode ? (
            <input
              type="text"
              value={localFormData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full border rounded p-2 text-gray-600"
            />
          ) : (
            <p className="text-gray-600">{localFormData.title || "N/A"}</p>
          )}
        </div>
        {/* Company Name */}
        <div className="border-b p-4">
          <h3 className="text-xl font-semibold text-gray-700">Company Name</h3>
          {editMode ? (
            <input
              type="text"
              value={localFormData.company_name}
              onChange={(e) =>
                handleInputChange("company_name", e.target.value)
              }
              className="w-full border rounded p-2 text-gray-600"
            />
          ) : (
            <p className="text-gray-600">
              {localFormData.company_name || "N/A"}
            </p>
          )}
        </div>
        {/* Company Website */}
        <div className="border-b p-4">
          <h3 className="text-xl font-semibold text-gray-700">
            Company Website
          </h3>
          {editMode ? (
            <input
              type="text"
              value={localFormData.company_website}
              onChange={(e) =>
                handleInputChange("company_website", e.target.value)
              }
              className="w-full border rounded p-2 text-gray-600"
            />
          ) : (
            <p className="text-gray-600">
              {localFormData.company_website || "N/A"}
            </p>
          )}
        </div>
        {/* Phone Number */}
        <div className="border-b p-4">
          <h3 className="text-xl font-semibold text-gray-700">Phone Number</h3>
          {editMode ? (
            <input
              type="text"
              value={localFormData.ph_no}
              onChange={(e) => handleInputChange("ph_no", e.target.value)}
              className="w-full border rounded p-2 text-gray-600"
            />
          ) : (
            <p className="text-gray-600">{localFormData.ph_no || "N/A"}</p>
          )}
        </div>
        {/* Location */}
        <div className="border-b p-4">
          <h3 className="text-xl font-semibold text-gray-700">Location</h3>
          {editMode ? (
            <input
              type="text"
              value={localFormData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="w-full border rounded p-2 text-gray-600"
            />
          ) : (
            <p className="text-gray-600">{localFormData.location || "N/A"}</p>
          )}
        </div>
        {/* Job Type */}
        <div className="border-b p-4">
          <h3 className="text-xl font-semibold text-gray-700">Job Type</h3>
          {editMode ? (
            <input
              type="text"
              value={localFormData.requirement_type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              className="w-full border rounded p-2 text-gray-600"
            />
          ) : (
            <p className="text-gray-600">
              {localFormData.requirement_type || "N/A"}
            </p>
          )}
        </div>
        {/* Salary Range */}
        <div className="border-b p-4">
          <h3 className="text-xl font-semibold text-gray-700">Salary Range</h3>
          {editMode ? (
            <input
              type="text"
              value={localFormData.salaryRange}
              onChange={(e) => handleInputChange("salaryRange", e.target.value)}
              className="w-full border rounded p-2 text-gray-600"
            />
          ) : (
            <p className="text-gray-600">
              {localFormData.minSalary || "N/A"} -
              {localFormData.maxSalary || "N/A"}
            </p>
          )}
        </div>
        {/* Job Description */}
        <div className="border-b p-4">
          <h3 className="text-xl font-semibold text-gray-700">
            Job Description
          </h3>
          {editMode ? (
            <input
              type="text"
              value={localFormData.desc_requirement}
              onChange={(e) =>
                handleInputChange("desc_requirement", e.target.value)
              }
              className="w-full border rounded p-2 text-gray-600"
            />
          ) : (
            <p className="text-gray-600">
              {localFormData.desc_requirement || "N/A"}
            </p>
          )}
        </div>
        {/* Skills */}
        <div className="border-b p-4">
          <h3 className="text-xl font-semibold text-gray-700">Skills</h3>
          {editMode ? (
            <div>
              {localFormData.skills.map((skill, index) => (
                <input
                  key={index}
                  type="text"
                  value={skill.skillName || ""}
                  onChange={(e) =>
                    handleSkillsInputChange("skills", e.target.value, index)
                  }
                  className="w-full border rounded p-2 text-gray-600 mb-2"
                />
              ))}
              <button
                type="button"
                onClick={() =>
                  setLocalFormData({
                    ...localFormData,
                    skills: [...localFormData.skills, { skillName: "" }],
                  })
                }
                className="bg-blue-500 text-white rounded px-4 py-2 mt-2"
              >
                Add Skill
              </button>
            </div>
          ) : (
            <p className="text-gray-600">
              {localFormData.skills
                ?.map((skill) => skill.skillName)
                .join(", ") || "N/A"}
            </p>
          )}
        </div>
        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          {/* Back Button */}
          <button
            type="button" // Prevent form submission
            className="bg-gray-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-600 transition duration-300"
            onClick={(e) => {
              prevStep(); // Call the previous step functionx`
            }}
          >
            Back
          </button>

          {/* Submit/Save Changes Button */}
          <button
            type="button" // Prevent form submission
            className={`${
              editMode
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-green-500 hover:bg-green-600"
            } text-white px-6 py-3 rounded-md shadow-md transition duration-300`}
            onClick={editMode ? handleSaveChanges : handleSubmit} // Call respective functions
            disabled={isSubmitting}
          >
            {editMode
              ? "Save Changes"
              : isSubmitting
              ? "Submitting..."
              : "Submit"}
          </button>

          {/* Edit Button */}
          {!editMode && (
            <button
              type="button" // Prevent form submission
              className="bg-yellow-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-yellow-600 transition duration-300"
              onClick={(e) => {
                toggleEditMode(); // Toggle edit mode
              }}
            >
              Edit
            </button>
          )}
        </div>
      </form>
      {toastMessage && (
        <NotificationToasts
          message={toastMessage}
          type={toastType}
          autoClose={1500}
          position="top-right"
          theme="dark"
        />
      )}
    </div>
  );
};

export default ReviewJobOpportunity;
