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
    company_website: "",
    email: "",
    ph_no: "",
    location: "",
    type: "",
    salaryRange: "",
    desc_requirement: "",
    address: "",
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
