import React, { useState } from 'react';
import StepOne from './StepOne';  // Basic Info
import StepTwo from './StepTwo';  // Details
import StepThree from './StepThree';  // Job Details
import ReviewJobOpportunity from './ReviewAddJobOpportunity'; // Review Opportunity
import { WelcomeAddOpportunityPage } from './WelcomeAddOpportunityPage';

const AddOpportunityForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  // Move to the next step
  const nextStep = () => setStep((prevStep) => prevStep + 1);
  
  // Move to the previous step
  const prevStep = () => setStep((prevStep) => prevStep - 1);
  
  // Handle form submission
  const handleFinalSubmit = () => {
    console.log("Final submitted data:", formData);
    // Your submission logic (API call)
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleFinalSubmit}>
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
          <StepTwo
            nextStep={nextStep}
            prevStep={prevStep}
            setFormData={setFormData}
            formData={formData}
          />
        )}
        {step === 3 && (
          <StepThree
            nextStep={nextStep}
            prevStep={prevStep}
            setFormData={setFormData}
            formData={formData}
          />
        )}
        {step === 4 && (
          <ReviewJobOpportunity
            prevStep={prevStep}
            handleFinalSubmit={handleFinalSubmit}
            formData={formData}
          />
        )}
      </form>
    </div>
  );
};

export default AddOpportunityForm;
