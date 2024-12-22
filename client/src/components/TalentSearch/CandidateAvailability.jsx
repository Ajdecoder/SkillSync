// CandidateAvailability.js
import React, { useState } from 'react';
import { useHireFormContext } from '../context/HireFormContext';

const CandidateAvailability = ({ nextStep, prevStep }) => {
    const { formData, handleFormDataChange } = useHireFormContext();
    const [availabilityOption, setAvailabilityOption] = useState(formData.availability || "");
    const [availableDate, setAvailableDate] = useState(formData.availableDate || "");

    const handleAvailabilityChange = (e) => {
        const value = e.target.value;
        setAvailabilityOption(value);
        handleFormDataChange({ availability: value });

        if (value !== "Available from") {
            setAvailableDate("");
            handleFormDataChange({ availableDate: "" });
        }
        console.log('formdata from candidateavailability',formData)
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setAvailableDate(date);
        handleFormDataChange({ availableDate: date });
        console.log("Date selected:", date);
        console.log('formdata from candidateavailability',formData)

    };

    return (
        <div className='p-4'>
            <h2 className="text-xl font-semibold mb-4">Candidate Availability</h2>

            <select
                value={availabilityOption}
                onChange={handleAvailabilityChange}
                className="border-gray-300 rounded-md mb-4 block w-full p-4 text-gray-900 border bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option value="">Select Availability</option>
                <option value="Immediately Available">Immediately Available</option>
                <option value="Available from">Available from</option>
            </select>

            {availabilityOption === "Available from" && (
                <input
                    type="date"
                    value={availableDate}
                    onChange={handleDateChange}
                    className="border-gray-300 rounded-md mb-4 block w-full p-4 text-gray-900 border bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            )}

            <div className="flex justify-between">
                <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={prevStep}>
                    Back
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={nextStep}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default CandidateAvailability;
