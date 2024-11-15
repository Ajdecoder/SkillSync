import React, { createContext, useState, useContext } from 'react';

// Create the context
const HireFormContext = createContext();

// Custom hook to access the form context
export const useHireFormContext = () => useContext(HireFormContext);

// Provider component
export const HireFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    jobType: '',
    skills: [],
    availability: '',
    requirements: '',
    description: '',
    compensation: '',
    contactInfo: { email: '', phone: '' },  
  });

  const handleFormDataChange = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));

  };

  return (
    <HireFormContext.Provider value={{ formData, handleFormDataChange }}>
      {/* {console.log("Form Data Here---->",formData)} */}
      {children}
    </HireFormContext.Provider>
  );
};
