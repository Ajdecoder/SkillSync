import React, { useState } from "react";
import StepOne from "./StepOne"; // Basic Info
import StepTwo from "./StepTwo"; // Details
import StepThree from "./StepThree"; // Job Details
import ReviewJobOpportunity from "./ReviewAddJobOpportunity"; // Review Opportunity
import { WelcomeAddOpportunityPage } from "./WelcomeAddOpportunityPage";
import { ChooseSkills } from "./ChooseSkills";

// AddOpportunityForm.jsx
const AddOpportunityForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);


  return (
    <div className="max-w-4xl mx-auto p-4">
        {step === 0 && (
          <WelcomeAddOpportunityPage
            nextStep={nextStep}
            setFormData={setFormData}
          />
        )}
        {step === 1 && (
          <StepOne
            nextStep={nextStep}
            setFormData={setFormData}
            formData={formData}
          />
        )}
        {step === 2 && (
          <ChooseSkills
            nextStep={nextStep}
            prevStep={prevStep}
            setFormData={setFormData}
            formData={formData}
          />
        )}
        {step === 3 && (
          <StepTwo
            nextStep={nextStep}
            prevStep={prevStep}
            setFormData={setFormData}
            formData={formData}
          />
        )}
        {step === 4 && (
          <StepThree
            nextStep={nextStep}
            prevStep={prevStep}
            setFormData={setFormData}
            formData={formData}
          />
        )}
        {step === 5 && (
          <ReviewJobOpportunity
            prevStep={prevStep}
            formData={formData}
          />
        )}
    </div>
  );
};

export default AddOpportunityForm;
