// CompanyBenefits.js
import React from "react";

const CompanyBenefits = ({
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
      {userRole === "recruiter" && activeTab === "companyBenefits" && (
        <section className="profile-content mt-6 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">
            Company Benefits
          </h2>
          <div className="mt-6">
            {isEditing.companyBenefits ? (
              <form onSubmit={(e) => handleSubmit(e, "companyBenefits")}>
                <ul className="space-y-4">
                  {updatedData?.companyBenefits?.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="bg-gray-100 p-4 rounded-lg shadow-sm"
                    >
                      <div>
                        <input
                          type="text"
                          name={`companyBenefits.${idx}.benefitType`} // Adjusting the input name to target the correct index
                          value={benefit.benefitType}
                          onChange={(e) =>
                            handleInputChange(e, "companyBenefits", idx)
                          }
                          className="border border-gray-300 p-1 rounded-lg"
                          placeholder="Benefit Type"
                        />
                      </div>
                      <div>
                        <textarea
                          name={`companyBenefits.${idx}.description`}
                          value={benefit.description}
                          onChange={(e) =>
                            handleInputChange(e, "companyBenefits", idx)
                          }
                          className="border border-gray-300 p-1 rounded-lg w-full mt-2"
                          placeholder="Description"
                        />
                      </div>
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
                {profileData?.companyBenefits?.map((benefit, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-100 p-4 rounded-lg shadow-sm"
                  >
                    <p>
                      {benefit.benefitType} : {benefit.description}
                    </p>
                  </li>
                )) || "No benefits listed"}
              </ul>
            )}
            {!isEditing.companyBenefits && (
              <button
                onClick={() => handleEditClick("companyBenefits")}
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

export default CompanyBenefits;
