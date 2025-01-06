import React from "react";

const CompanyOverview = ({
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
      {userRole === "recruiter" && activeTab === "companyOverview" && (
        <>
          <section className="profile-content mt-6 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800">
              Company Overview
            </h2>
            <div className="mt-6 space-y-6 text-gray-700">
              {isEditing.companyOverview ? (
                <form onSubmit={(e) => handleSubmit(e, "companyOverview")}>
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={updatedData?.companyOverview?.name || ""}
                      onChange={(e) => handleInputChange(e, "companyOverview")}
                      className="border border-gray-300 p-2 rounded-lg w-full"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <textarea
                      name="description"
                      value={updatedData?.companyOverview?.description || ""}
                      onChange={(e) => handleInputChange(e, "companyOverview")}
                      className="border border-gray-300 p-2 rounded-lg w-full mt-2"
                      placeholder="Company Description"
                    />
                  </div>
                  <div>
                    <input
                      type="url"
                      name="website"
                      value={updatedData?.companyOverview?.website || ""}
                      onChange={(e) => handleInputChange(e, "companyOverview")}
                      className="border border-gray-300 p-2 rounded-lg w-full mt-2"
                      placeholder="Company Website"
                    />
                  </div>
                  <div className="flex items-center space-x-4 mt-4">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEditClick("companyOverview")}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <p>
                    <strong>Company Name:</strong>{" "}
                    {profileData?.companyOverview?.name || "Not Provided"}
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {profileData?.companyOverview?.description ||
                      "Not Provided"}
                  </p>
                  <p>
                    <strong>Website:</strong>{" "}
                    {profileData?.companyOverview?.website || "Not Provided"}
                  </p>
                  <button
                    onClick={() => handleEditClick("companyOverview")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg mt-4"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </section>

          <section className="profile-content mt-6 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800">
              Social Links
            </h2>
            <div className="mt-6 space-y-6 text-gray-700">
              {isEditing.socialLinks ? (
                <form onSubmit={(e) => handleSubmit(e, "socialLinks")}>
                  <div>
                    <input
                      type="url"
                      name="linkedin"
                      value={updatedData?.companyOverview.socialLinks?.linkedin || ""}
                      onChange={(e) => handleInputChange(e, "companyOverview")}
                      className="border border-gray-300 p-2 rounded-lg w-full"
                      placeholder="LinkedIn URL"
                    />
                  </div>
                  <div>
                    <input
                      type="url"
                      name="twitter"
                      value={updatedData?.companyOverview.socialLinks?.twitter || ""}
                      onChange={(e) => handleInputChange(e, "companyOverview")}
                      className="border border-gray-300 p-2 rounded-lg w-full mt-2"
                      placeholder="Twitter URL"
                    />
                  </div>
                  <div>
                    <input
                      type="url"
                      name="facebook"
                      value={updatedData?.companyOverview.socialLinks?.facebook || ""}
                      onChange={(e) => handleInputChange(e, "companyOverview")}
                      className="border border-gray-300 p-2 rounded-lg w-full mt-2"
                      placeholder="Facebook URL"
                    />
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
                    <strong>LinkedIn:</strong>{" "}
                    {profileData?.companyOverview.socialLinks?.linkedin}
                    .companyOverview
                  </p>
                  <p>
                    <strong>Twitter:</strong>{" "}
                    {profileData?.companyOverview.socialLinks?.twitter}
                  </p>
                  <p>
                    <strong>Facebook:</strong>{" "}
                    {profileData?.companyOverview.socialLinks?.facebook}
                  </p>
                </div>
              )}
              {!isEditing.socialLinks && (
                <button
                  onClick={() => handleEditClick("socialLinks")}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg mt-4"
                >
                  Edit
                </button>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default CompanyOverview;
