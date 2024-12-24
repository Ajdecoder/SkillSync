import React, { useState } from "react";
import VerifyEmail from "./VerifyEmail";
import OTPInput from "./OTPInput";
import ChangePassword from "./ChangePass";

const ChangePasswordForm = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  console.log("Parent Step in ChangePasswordForm:", step); // Log step value in parent

  return (
    <div>
      {step === 1 && (
        <VerifyEmail nextStep={nextStep} step={step} />
      )}
      {step === 2 && <OTPInput nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <ChangePassword prevStep={prevStep} />}
    </div>
  );
};

export default ChangePasswordForm;
