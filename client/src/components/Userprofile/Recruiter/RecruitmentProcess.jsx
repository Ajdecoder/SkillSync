// RecruitmentProcess.js
import React from "react";

const RecruitmentProcess = ({
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
  return (
    <div>
      {userRole === "recruiter" && activeTab === "recruitmentProcess" && (
        <section className="profile-content mt-6 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">
            Recruitment Process
          </h2>
          <div className="mt-6 space-y-6 text-gray-700">
            {isEditing.recruitmentProcess ? (
              <form onSubmit={(e) => handleSubmit(e, "recruitmentProcess")}>
                {/* Application Review */}
                <div>
                  <input
                    type="text"
                    name="applicationReview"
                    value={
                      updatedData?.recruitmentProcess?.applicationReview || ""
                    }
                    onChange={(e) => handleInputChange(e, "recruitmentProcess")}
                    className="border border-gray-300 p-2 rounded-lg w-full"
                    placeholder="Application Review Status"
                  />
                </div>

                {/* Description */}
                <div>
                  <textarea
                    name="description"
                    value={updatedData?.recruitmentProcess?.description || ""}
                    onChange={(e) => handleInputChange(e, "recruitmentProcess")}
                    className="border-2 border-black p-2 rounded-lg w-full mt-2"
                    placeholder="Recruitment Process Description"
                    style={{ border: "1px solid" }}
                  />
                </div>

                {/* Timeline */}
                <div>
                  <input
                    type="text"
                    name="timeline"
                    value={updatedData?.recruitmentProcess?.timeline || ""}
                    onChange={(e) => handleInputChange(e, "recruitmentProcess")}
                    className="border border-gray-300 p-2 rounded-lg w-full mt-2"
                    placeholder="Timeline"
                  />
                </div>

                {/* Interview Stages */}
                <div>
                  <label className="font-semibold">Interview Stages:</label>
                  <ul className="space-y-2 mt-2">
                    {updatedData?.recruitmentProcess?.interviewStages?.map(
                      (stage, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <input
                            type="text"
                            name={`interviewStages.${idx}`}
                            value={stage}
                            onChange={(e) =>
                              handleInputChange(e, "recruitmentProcess")
                            }
                            className="border border-gray-300 p-2 rounded-lg w-full"
                            placeholder="Interview Stage"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveItem("interviewStages", idx)
                            }
                            className="text-red-500"
                          >
                            Remove
                          </button>
                        </li>
                      )
                    )}
                  </ul>
                  <button
                    type="button"
                    onClick={() => handleAddItem("interviewStages")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg mt-2"
                  >
                    Add Stage
                  </button>
                </div>

                {/* Assessment Types */}
                <div>
                  <label className="font-semibold">Assessment Types:</label>
                  <ul className="space-y-2 mt-2">
                    {updatedData?.recruitmentProcess?.assessmentTypes?.map(
                      (assessment, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <input
                            type="text"
                            name={`assessmentTypes.${idx}`}
                            value={assessment}
                            onChange={(e) =>
                              handleInputChange(e, "recruitmentProcess")
                            }
                            className="border border-gray-300 p-2 rounded-lg w-full"
                            placeholder="Assessment Type"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveItem("assessmentTypes", idx)
                            }
                            className="text-red-500"
                          >
                            Remove
                          </button>
                        </li>
                      )
                    )}
                  </ul>
                  <button
                    type="button"
                    onClick={() => handleAddItem("assessmentTypes")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg mt-2"
                  >
                    Add Assessment Type
                  </button>
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg mt-4"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <div>
                <p>
                  <strong>Application Review:</strong>{" "}
                  {profileData?.recruitmentProcess?.applicationReview}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {profileData?.recruitmentProcess?.description}
                </p>
                <p>
                  <strong>Timeline:</strong>{" "}
                  {profileData?.recruitmentProcess?.timeline}
                </p>

                <p>
                  <strong>Interview Stages:</strong>
                </p>
                <ul>
                  {profileData?.recruitmentProcess?.interviewStages?.map(
                    (stage, idx) => <li key={idx}>{stage}</li>
                  ) || "No interview stages listed"}
                </ul>

                <p>
                  <strong>Assessment Types:</strong>
                </p>
                <ul>
                  {profileData?.recruitmentProcess?.assessmentTypes?.map(
                    (assessment, idx) => <li key={idx}>{assessment}</li>
                  ) || "No assessment types listed"}
                </ul>
              </div>
            )}

            {!isEditing.recruitmentProcess && (
              <button
                onClick={() => handleEditClick("recruitmentProcess")}
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

export default RecruitmentProcess;
