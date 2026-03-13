import React, { useState } from "react";
import { useForm } from "../context/AddOpportunityFromContext";

const StepOne = ({ nextStep }) => {
  const { formData, updateForm } = useForm();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateForm({ [name]: value });
  };

  const validateFields = () => {
    const requiredFields = ["requirement_type", "title", "company_name"];
    const isValid = requiredFields.every((field) => formData[field]?.trim());

    if (!isValid) {
      setError("Please fill all required fields");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) nextStep();
  };

  // Form field configuration
  const formFields = [
    {
      type: "select",
      name: "requirement_type",
      label: "Requirement Type",
      required: true,
      options: [ "Full-Time", "Part-Time", "Contract", "Internship"],
      placeholder: "Select requirement type",
    },
    {
      type: "text",
      name: "title",
      label: "Title",
      required: true,
      placeholder: "Enter job title",
    },
    {
      type: "text",
      name: "company_name",
      label: "Company Name",
      required: true,
      placeholder: "Enter company name",
    },
    {
      type: "url",
      name: "company_website",
      label: "Company Website",
      required: false,
      placeholder: "Enter company website (optional)",
    },
  ];

  return (
    <div className="max-w-md mx-auto p-6  dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300 bg-[#d3d3d3]">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Step 1: Basic Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {formFields.map((field) => (
          <div key={field.name}>
            <label className="text-sm font-medium text-gray-700 mb-2 dark:text-white flex gap-1">
              <h2 className="text-gray-700 mb-2 dark:text-white" >{field.label}{" "}</h2>
              {field.required && (
                <span className="text-red-500 dark:text-white">*</span>
              )}
            </label>

            {field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required={field.required}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg 
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                          transition-all duration-200 shadow-sm"
              >
                {field.options.map((option) => (
                  <option
                    key={option}
                    value={option}
                    className="dark:bg-gray-700"
                  >
                    {option || field.placeholder}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required={field.required}
                placeholder={field.placeholder}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg 
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                          placeholder-gray-500 dark:placeholder-gray-400
                          transition-all duration-200 shadow-sm"
              />
            )}
          </div>
        ))}

        {error && (
          <div className="animate-shake text-red-500 dark:text-red-400 text-sm py-2 px-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex justify-end pt-3">
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 
                      text-white font-medium rounded-lg shadow-md
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                      transition-all duration-200 transform hover:scale-[1.02]"
          >
            Next Step →
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
