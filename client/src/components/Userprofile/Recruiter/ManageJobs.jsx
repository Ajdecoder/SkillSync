import React from "react";

const ManageJobs = ({
  userRole,
  activeTab,
  isEditing,
  profileData,
  updatedData,
  handleInputChange,
  handleSubmit,
  handleEditClick,
}) => {
  return (
    <div>
      {userRole === "recruiter" && activeTab === "manage-jobs" && (
        <section className="profile-content mt-6 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">
            Manage Job Listings
          </h2>
          <div className="mt-6">
            {isEditing.jobListings ? (
              <form onSubmit={(e) => handleSubmit(e, "jobListings")}>
                <ul className="space-y-4">
                  {updatedData?.jobListings?.map((job, idx) => (
                    <li
                      key={idx}
                      className="bg-gray-100 p-4 rounded-lg shadow-sm"
                    >
                      <input
                        type="text"
                        name={`jobListings.${idx}.jobTitle`} // Array of objects, using index
                        value={updatedData?.jobListings?.[idx]?.jobTitle || ""}
                        onChange={(e) =>
                          handleInputChange(e, "jobListings", idx)
                        } // Pass the index of the array item
                        className="border border-gray-300 p-2 rounded-lg w-full"
                        placeholder="Job Title"
                      />

                      <textarea
                        name={`jobListings.${idx}.description`} // Name for updating description
                        value={job?.description || ""} // Bound value for description
                        onChange={
                          (e) => handleInputChange(e, "jobListings", idx) // Handling change for description
                        }
                        className="border border-gray-300 p-2 rounded-lg w-full mt-2"
                        placeholder="Job Description"
                      />
                      <input
                        type="text"
                        name={`jobListings.${idx}.location`} // Name for updating location
                        value={job?.location || ""} // Bound value for location
                        onChange={
                          (e) => handleInputChange(e, "jobListings", idx) // Handling change for location
                        }
                        className="border border-gray-300 p-2 rounded-lg w-full mt-2"
                        placeholder="Location"
                      />
                    </li>
                  ))}
                </ul>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg mt-4"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <ul className="space-y-4">
                {profileData?.jobListings?.map((job, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-100 p-4 rounded-lg shadow-sm"
                  >
                    <p className="text-lg font-semibold">{job.jobTitle}</p>
                    <p>{job.description}</p>
                    <p>{job.location}</p>
                  </li>
                )) || "No job listings available"}
              </ul>
            )}
            {!isEditing.jobListings && (
              <button
                onClick={() => handleEditClick("jobListings")}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg mt-4"
              >
                Edit
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default ManageJobs;
