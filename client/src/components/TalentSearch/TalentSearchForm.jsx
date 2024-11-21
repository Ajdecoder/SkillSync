import React, { useState } from "react";
import JobTypeCategory from "./JobTypeCategory";
import DefineSkills from "./DefineSkills";
import CandidateAvailability from "./CandidateAvailability";
import AdditionalRequirements from "./AdditionalRequirements";
import JobDescription from "./JobDescription";
import CompensationBenefits from "./CompensationBenefits";
import ContactInformation from "./ContactInformation";
import ReviewSubmit from "./ReviewSubmit";
import { useHireFormContext } from "../context/HireFormContext";

const TalentSearchForm = () => {
    
  const {handleFormDataChange} = useHireFormContext()

  const [step, setStep] = useState(1);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div>

      {step === 1 && (
        <JobTypeCategory
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <DefineSkills
          nextStep={nextStep}
          prevStep={prevStep}
          handleFormDataChange={handleFormDataChange}
        />
      )}
      {step === 3 && (
        <CandidateAvailability
          nextStep={nextStep}
          prevStep={prevStep}
          handleFormDataChange={handleFormDataChange}
        />
      )}
      {step === 4 && (
        <AdditionalRequirements
          nextStep={nextStep}
          prevStep={prevStep}
          handleFormDataChange={handleFormDataChange}
        />
      )}
      {step === 5 && (
        <JobDescription
          nextStep={nextStep}
          prevStep={prevStep}
          handleFormDataChange={handleFormDataChange}
        />
      )}
      {step === 6 && (
        <CompensationBenefits
          nextStep={nextStep}
          prevStep={prevStep}
          handleFormDataChange={handleFormDataChange}
        />
      )}
      {step === 7 && (
        <ContactInformation
          nextStep={nextStep}
          prevStep={prevStep}
          handleFormDataChange={handleFormDataChange}
        />
      )}
      {step === 8 && (
        <ReviewSubmit
          handleFormDataChange={handleFormDataChange}
        />
      )}
    </div>
  );
};

export default TalentSearchForm;
