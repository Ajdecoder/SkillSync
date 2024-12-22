import React, { useState } from "react";
import { useHireFormContext } from "../context/HireFormContext";

const ContactInformation = ({ nextStep, prevStep }) => {
  const { formData, handleFormDataChange } = useHireFormContext();

  const [contactInfo, setContactInfo] = useState(formData.contactInfo);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    handleFormDataChange({ contactInfo });
    nextStep();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
      <input
        type="text"
        name="email"
        value={contactInfo.email || ""}
        onChange={handleContactChange}
        className="border-gray-300 rounded-md mb-4 block w-full p-4 text-gray-900 border  bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Email"
      />
      <input
        type="number"
        name="phone"
        value={contactInfo.phone || ""}
        onChange={handleContactChange}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 dark:bg-gray-700 text-white"
        placeholder="Phone Number"
      />

      <div className="flex justify-between">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleSubmit}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ContactInformation;
