import React from "react";

const PastHires = ({
  userRole,
  activeTab,
  isEditing,
  profileData,
  updatedData,
  setUpdatedData,
  handleSubmit,
  handleEditClick,
}) => {
  const handlePastHireInputChange = (e, idx) => {
    const { name, value, type } = e.target;

    setUpdatedData((prevState) => {
      const newState = { ...prevState };
      const pastHires = [...(newState.pastHires || [])];
      if (!pastHires[idx]) pastHires[idx] = {};

      // Parse value based on type
      const parsedValue =
        type === "date" ? new Date(value).toISOString() : value;

      // Update the specific field
      const field = name.split(".")[2]; // Extract field name (e.g., candidateName, position)
      pastHires[idx][field] = parsedValue;

      newState.pastHires = pastHires;
      return newState;
    });
  };

  const handleAddItem = () => {
    setUpdatedData((prevState) => {
      const newState = { ...prevState };
      newState.pastHires = newState.pastHires || [];
      newState.pastHires.push({
        candidateName: "",
        position: "",
        hireDate: "",
        testimonial: "",
        status: "hired",
      });
      return newState;
    });
  };

  const handleRemoveItem = (index) => {
    setUpdatedData((prevState) => {
      const newState = { ...prevState };
      if (newState.pastHires?.length > index) {
        newState.pastHires.splice(index, 1);
      }
      return newState;
    });
  };

  return (
    <div>
      {userRole === "recruiter" && activeTab === "pastHires" && (
        <section className="profile-content mt-6 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Past Hires</h2>
          <div className="mt-6 space-y-6 text-gray-700">
            {isEditing.pastHires ? (
              <form onSubmit={(e) => handleSubmit(e, "pastHires")}>
                {updatedData.pastHires?.map((hire, idx) => (
                  <div
                    key={hire._id?.$oid || idx}
                    className="border p-4 rounded-lg space-y-4"
                  >
                    <div>
                      <label className="font-semibold">Candidate Name:</label>
                      <input
                        type="text"
                        name={`pastHires.${idx}.candidateName`}
                        value={hire.candidateName || ""}
                        onChange={(e) => handlePastHireInputChange(e, idx)}
                        className="border border-gray-300 p-2 rounded-lg w-full"
                        placeholder="Candidate Name"
                      />
                    </div>
                    <div>
                      <label className="font-semibold">Position:</label>
                      <input
                        type="text"
                        name={`pastHires.${idx}.position`}
                        value={hire.position || ""}
                        onChange={(e) => handlePastHireInputChange(e, idx)}
                        className="border border-gray-300 p-2 rounded-lg w-full"
                        placeholder="Position"
                      />
                    </div>
                    <div>
                      <label className="font-semibold">Hire Date:</label>
                      <input
                        type="date"
                        name={`pastHires.${idx}.hireDate`}
                        value={
                          hire.hireDate
                            ? new Date(hire.hireDate)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={(e) => handlePastHireInputChange(e, idx)}
                        className="border border-gray-300 p-2 rounded-lg w-full"
                      />
                    </div>
                    <div>
                      <label className="font-semibold">Testimonial:</label>
                      <textarea
                        name={`pastHires.${idx}.testimonial`}
                        value={hire.testimonial || ""}
                        onChange={(e) => handlePastHireInputChange(e, idx)}
                        className="border border-gray-300 p-2 rounded-lg w-full"
                        placeholder="Testimonial"
                      />
                    </div>
                    <div>
                      <label className="font-semibold">Status:</label>
                      <select
                        name={`pastHires.${idx}.status`}
                        value={hire.status || ""}
                        onChange={(e) => handlePastHireInputChange(e, idx)}
                        className="border border-gray-300 p-2 rounded-lg w-full bg-white"
                      >
                        <option value="hired">Hired</option>
                        <option value="not hired">Not Hired</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="text-red-500 mt-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg mt-4 mr-3"
                >
                  Add Past Hire
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg mt-4"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <div>
                {profileData.pastHires?.length ? (
                  profileData.pastHires.map((hire, idx) => (
                    <div key={hire._id?.$oid || idx} className="mt-4">
                      <li className="list-none text-green-800">Candidate {idx + 1}</li>
                      <p>
                        <strong>Candidate Name:</strong> {hire.candidateName}
                      </p>
                      <p>
                        <strong>Position:</strong> {hire.position}
                      </p>
                      <p>
                        <strong>Hire Date:</strong>{" "}
                        {new Date(hire.hireDate).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Testimonial:</strong> {hire.testimonial}
                      </p>
                      <p>
                        <strong>Status:</strong> {hire.status}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No past hires available.</p>
                )}
                {userRole === "recruiter" && (
                  <button
                    onClick={() => handleEditClick("pastHires")}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg mt-4"
                  >
                    Edit Past Hires
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default PastHires;
