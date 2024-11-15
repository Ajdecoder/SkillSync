import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
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
    cover_Img: null, // For file uploads
    documents: null, // For file uploads
  });

  const updateForm = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <FormContext.Provider value={{ formData, updateForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
