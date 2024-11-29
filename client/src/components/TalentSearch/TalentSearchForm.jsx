import React, { useEffect, useState, useRef } from "react";
import JobTypeCategory from "./JobTypeCategory";
import DefineSkills from "./DefineSkills";
import CandidateAvailability from "./CandidateAvailability";
import AdditionalRequirements from "./AdditionalRequirements";
import JobDescription from "./JobDescription";
import ContactInformation from "./ContactInformation";
import ReviewSubmit from "./ReviewSubmit";
import CompensationBenefits from "./CompensationBenefits";
import { useHireFormContext } from "../context/HireFormContext";

const TalentSearchForm = () => {
  const { handleFormDataChange } = useHireFormContext();
  const [step, setStep] = useState(1);

  // Track the previous step using useRef
  const prevStepRef = useRef(step);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  useEffect(() => {
    // Log steps only when step changes
    if (step !== prevStepRef.current) {
      console.log("Previous Step ====>", prevStepRef.current);
      console.log("Next Step ====>", step);

      // Update the ref with the current step
      prevStepRef.current = step;
    }
  }, [step]);

  return (
    <div>
      {step === 1 && <JobTypeCategory nextStep={nextStep} />}
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
        <ReviewSubmit handleFormDataChange={handleFormDataChange} prevStep={prevStep} />
      )}
    </div>
  );
};

export default TalentSearchForm;
