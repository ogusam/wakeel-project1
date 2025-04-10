import { createElement, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Stepper from "./Stepper";
import TinNumber from "./PageOne";
import CompanyInfo from "./PageTwo";
import Signatory from "./PageThree";
import Documents from "./PageFour";
import Terms from "./Term";
import pos from '../../assets/pos.png'
import altpay from '../../assets/altpay.jpeg'


const steps = [TinNumber, CompanyInfo, Signatory, Documents, Terms];

const CBankingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isStepValid, setIsStepValid] = useState(false);

  const Steps = steps[currentStep];

  const resetForm = () => {
    localStorage.removeItem("step1");
    localStorage.removeItem("step2");
    localStorage.removeItem("step3");
    localStorage.removeItem("step4-documents");
    localStorage.removeItem("step5-accepted");
  };


  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsStepValid(false);
    } else {
      const step1 = JSON.parse(localStorage.getItem("step1-tin") || "{}");
      const step2 = JSON.parse(localStorage.getItem("step2-form") || "{}");
      const step3 = JSON.parse(localStorage.getItem("step3Signatories") || "{}");
      const step4 = JSON.parse(localStorage.getItem("registration_documents") || "{}");
      const accepted = JSON.parse(localStorage.getItem("step5-accepted") || "true");

      const payload = {
        ...step1,
        ...step2,
        ...step3,
        documents: step4,
        termsAccepted: accepted,
      };

      console.log("Form Payload:", payload);

      try {
        const response = await fetch("myapi/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to submit form");
        }

        alert("Form submitted successfully!");
        resetForm();
        setCurrentStep(0);
        setIsStepValid(false);
      } catch (error) {
        console.error("Submission error:", error);
        alert("There was an error submitting the form.");
      }
    }
  };


  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div 
    className="
            bg-cover h-screen
            "
            style={{
                backgroundImage: `url(${pos})`,
                height:`150vh`
            }}
    >
    <div className="max-w-xl mx-auto mt-0 bg-none">
    <div className="  justify-items-center"><img src={altpay} alt="" className="h-20 mb-4"/></div>

      <Card>
        <CardContent className="p-6">
          <Stepper currentStep={currentStep} />
          <div className="mb-6">
            {createElement(Steps, { onValidate: setIsStepValid })}
          </div>
          <div className="flex justify-between">
            <Button onClick={handleBack} disabled={currentStep === 0} className="">
              Back
            </Button>
            <Button onClick={handleNext} disabled={!isStepValid} className="bg-[#B89B45]">
              {currentStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default CBankingForm;
