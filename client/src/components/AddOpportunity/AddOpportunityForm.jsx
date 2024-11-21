import React, { useState } from 'react';
import AddBasicInfo from './AddBasicInfo';
import AddDetails from './AddDetails';
import AddConfirmation from './AddConfirmation';

const AddOpportunityForm = () => {
  const [step, setStep] = useState(1);
  const [opportunityData, setOpportunityData] = useState({});

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const submitOpportunity = () => {
    
    console.log("Opportunity submitted:", opportunityData);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {step === 1 && <AddBasicInfo nextStep={nextStep} setOpportunityData={setOpportunityData} />}
      {step === 2 && <AddDetails nextStep={nextStep} prevStep={prevStep} setOpportunityData={setOpportunityData} />}
      {step === 3 && <AddConfirmation opportunityData={opportunityData} submitOpportunity={submitOpportunity} />}
    </div>
  );
};

export default AddOpportunityForm;
