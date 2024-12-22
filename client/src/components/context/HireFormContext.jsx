import React, { createContext, useState, useContext } from 'react';

const HireFormContext = createContext();

export const useHireFormContext = () => useContext(HireFormContext);

export const HireFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({  
    jobType: '',
    skills: [],
    requirements: '',
    jobDescription: '',
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
      {children}
    </HireFormContext.Provider>
  );
};
