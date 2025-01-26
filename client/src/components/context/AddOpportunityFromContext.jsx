// context/FormProvider.js
import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const useForm = () => {
  return useContext(FormContext);
};

export const AddOpportunityFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    title: "",
    company_name: "",
    maxSalary:0,
    minSalary:0,
    company_website: "",
    email: "",
    skills: [],
    ph_no: "",
    location: "",
    requirement_type: "",
    desc_requirement: "",
  });

  const updateForm = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <FormContext.Provider value={{ formData, updateForm }}>
      {children}
    </FormContext.Provider>
  );
};
