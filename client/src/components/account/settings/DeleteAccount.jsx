import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DeleteAccount = () => {

    const loggedInUser = useAuth()
    console.log('yes i recieved loggedinusr', loggedInUser)

  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  // Handle reason input change
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    // Here you would add the logic to handle account deletion
    alert("Account Deleted:", loggedInUser.email);
    navigate("/goodbye"); // Redirect to a Goodbye page after deletion
  };

  return (
    <div className="delete-account-container p-6 bg-gray-100 min-h-screen flex flex-col justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800">Delete My Account</h1>
        <p className="text-lg text-gray-700 mt-4">
          {loggedInUser.name} we’re sorry to see you go.
        </p>
        <p className="text-gray-700 mt-2">
          Please note that deleting your account is irreversible, and all the
          data associated with your {loggedInUser.email} account (including
          access to certification and other resources) will be permanently deleted.
        </p>

        <div className="mt-4">
          <label className="block text-gray-700 font-medium" htmlFor="reason">
            Before you leave, please tell us why you'd like to delete your
            SkillSync account. This information will help us improve. (Optional)
          </label>
          <textarea
            id="reason"
            className="mt-2 p-2 w-full border-solid border-2 border-black rounded-lg "
            placeholder="Your feedback matters"
            rows="4"
            value={reason}
            onChange={handleReasonChange}
          ></textarea>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={handleDeleteAccount}
            className="px-6 py-2 bg-red-500 text-white rounded-md font-semibold"
          >
            Delete Account
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
