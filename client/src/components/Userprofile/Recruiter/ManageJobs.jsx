import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageJobs = ({
  userRole,
  activeTab,
  updatedData,
  setUpdatedData,
  handleSubmit, // Receive handleSubmit from the parent
}) => {
  const [localUpdatedData, setLocalUpdatedData] = useState(updatedData || {});
  const [editingJobIdx, setEditingJobIdx] = useState(null);
  const navigate = useNavigate();

  const isEditingJob = (idx) => editingJobIdx === idx;

  const handleEditClick = (idx) => {
    setEditingJobIdx(idx);
  };

  // Handle changes for job listings (job title, location, etc.)
  const handleJobListingChange = (e, idx, field, subfield) => {
    const { value } = e.target;
    const updatedJobListings = localUpdatedData.jobListings.map(
      (job, index) => {
        if (index === idx) {
          if (field === "salaryRange" && subfield) {
            return {
              ...job,
              salaryRange: {
                ...job.salaryRange,
                [subfield]: value,
              },
            };
          } else {
            return {
              ...job,
              [field]: subfield ? { ...job[field], [subfield]: value } : value,
            };
          }
        }
        return job;
      }
    );

    const updatedDataWithJobListings = {
      ...localUpdatedData,
      jobListings: updatedJobListings,
    };
    setLocalUpdatedData(updatedDataWithJobListings);
    setUpdatedData(updatedDataWithJobListings); // Update the parent state
  };

  // Handle changes for skills within job listings
  const handleSkillsChange = (e, idx, skillIdx) => {
    const { value } = e.target;
    const updatedJobListings = localUpdatedData.jobListings.map(
      (job, index) => {
        if (index === idx) {
          const updatedSkills = [...job.skillsRequired];
          updatedSkills[skillIdx] = value;
          return { ...job, skillsRequired: updatedSkills };
        }
        return job;
      }
    );

    const updatedDataWithJobListings = {
      ...localUpdatedData,
      jobListings: updatedJobListings,
    };
    setLocalUpdatedData(updatedDataWithJobListings);
    setUpdatedData(updatedDataWithJobListings); // Update the parent state
  };

  // Handle adding/removing skills
  const handleSkillArrayChange = (idx, skillIdx, action) => {
    const updatedJobListings = localUpdatedData.jobListings.map(
      (job, index) => {
        if (index === idx) {
          if (action === "add") {
            return {
              ...job,
              skillsRequired: [...job.skillsRequired, ""],
            };
          } else if (action === "remove") {
            const updatedSkills = job.skillsRequired.filter(
              (_, i) => i !== skillIdx
            );
            return { ...job, skillsRequired: updatedSkills };
          }
        }
        return job;
      }
    );

    const updatedDataWithJobListings = {
      ...localUpdatedData,
      jobListings: updatedJobListings,
    };
    setLocalUpdatedData(updatedDataWithJobListings);
    setUpdatedData(updatedDataWithJobListings); // Update the parent state
  };

  const handleSaveChanges = (e) => {
    setEditingJobIdx(false);
    setUpdatedData(localUpdatedData);
    handleSubmit(e);
  };

  return (
    <div>
      {userRole === "recruiter" && activeTab === "manage-jobs" && (
        <section className="profile-content mt-6 bg-white p-8 rounded-lg shadow-lg dark:text-black">
          <h2 className="text-2xl font-semibold text-gray-800">
            Manage Job Listings
          </h2>
          <div className="mt-6">
            <form onSubmit={(e) => handleSubmit(e, "jobListings")}>
              <ul className="space-y-4">
                {localUpdatedData?.jobListings?.map((job, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-100 p-4 rounded-lg shadow-sm"
                  >
                    {/* Job Title */}
                    <div>
                      <strong>Job Title:</strong>
                      {isEditingJob(idx) ? (
                        <input
                          type="text"
                          value={job?.jobTitle || ""}
                          onChange={(e) =>
                            handleJobListingChange(e, idx, "jobTitle")
                          }
                          className="border border-gray-300 p-2 rounded-lg w-full"
                          placeholder="Job Title"
                        />
                      ) : (
                        <p>{job?.jobTitle || "No title provided"}</p>
                      )}
                    </div>

                    {/* Location */}
                    <div className="mt-2">
                      <strong>Location:</strong>
                      {isEditingJob(idx) ? (
                        <input
                          type="text"
                          value={job?.location || ""}
                          onChange={(e) =>
                            handleJobListingChange(e, idx, "location")
                          }
                          className="border border-gray-300 p-2 rounded-lg w-full"
                          placeholder="Location"
                        />
                      ) : (
                        <p>{job?.location || "No location provided"}</p>
                      )}
                    </div>

                    {/* Skills Required */}
                    <div className="mt-4">
                      <strong>Skills Required:</strong>
                      {isEditingJob(idx) ? (
                        job?.skillsRequired?.map((skill, skillIdx) => (
                          <div
                            key={skillIdx}
                            className="flex items-center mt-2"
                          >
                            <input
                              type="text"
                              value={skill}
                              onChange={(e) =>
                                handleSkillsChange(e, idx, skillIdx)
                              }
                              className="border border-gray-300 p-2 rounded-lg w-full"
                              placeholder="Skill"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleSkillArrayChange(idx, skillIdx, "remove")
                              }
                              className="ml-2 px-2 py-1 bg-red-600 text-white rounded"
                            >
                              Remove
                            </button>
                          </div>
                        ))
                      ) : (
                        <p>
                          {job?.skillsRequired?.join(", ") ||
                            "No skills listed"}
                        </p>
                      )}
                      {isEditingJob(idx) && (
                        <button
                          type="button"
                          onClick={() =>
                            handleSkillArrayChange(idx, null, "add")
                          }
                          className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg"
                        >
                          Add Skill
                        </button>
                      )}
                    </div>

                    {/* Salary Range */}
                    <div className="mt-4">
                      <strong>Salary Range:</strong>
                      <div className="flex items-center space-x-4 mt-2">
                        {isEditingJob(idx) ? (
                          <>
                            <input
                              type="number"
                              value={job?.salaryRange?.min || ""}
                              onChange={(e) =>
                                handleJobListingChange(
                                  e,
                                  idx,
                                  "salaryRange",
                                  "min"
                                )
                              }
                              className="border border-gray-300 p-2 rounded-lg w-full"
                              placeholder="Min Salary"
                            />
                            <input
                              type="number"
                              value={job?.salaryRange?.max || ""}
                              onChange={(e) =>
                                handleJobListingChange(
                                  e,
                                  idx,
                                  "salaryRange",
                                  "max"
                                )
                              }
                              className="border border-gray-300 p-2 rounded-lg w-full"
                              placeholder="Max Salary"
                            />
                          </>
                        ) : (
                          <p>
                            ${job?.salaryRange?.min || "No min salary"} - $
                            {job?.salaryRange?.max || "No max salary"}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Edit Button */}
                    {!isEditingJob(idx) && (
                      <button
                        type="button"
                        onClick={() => handleEditClick(idx)}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg mt-4"
                      >
                        Edit
                      </button>
                    )}

                    {/* Save Button (Visible only when editing) */}
                    {isEditingJob(idx) && (
                     
                      <div className="flex items-center space-x-4 mt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                        onClick={(e) => handleSaveChanges(e)}
                      >
                        Save Changes
                      </button>
                    <button
                      type="button"
                      onClick={() => setEditingJobIdx(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                    )}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col items-end animate-bounce">
                <p className="font-bold ">Post New Opportunity:</p>
                <button
                  onClick={() => navigate("/requirements/add-opportunity")}
                  className="px-4 py-2 bg-slate-800 text-white rounded-md"
                >
                  Post New Opening
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};

export default ManageJobs;
