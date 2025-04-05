import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Stepper from "./Stepper";
import TinNumber from "./PageOne";
import CompanyInfo from "./PageTwo";
import Signatory from "./PageThree";
import Documents from "./PageFour";
import Terms from "./Term";

const steps = [TinNumber, CompanyInfo, Signatory, Documents, Terms];

const CBankingForm =() => {
  const [currentStep, setCurrentStep] = useState(0);

  const Steps = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardContent className="p-6">
          <Stepper currentStep={currentStep} />
          <div className="mb-6">
            <Steps />
          </div>
          <div className="flex justify-between">
            <Button onClick={handleBack} disabled={currentStep === 0} className="">
              Back
            </Button>
            <Button onClick={handleNext} className="bg-[#B89B45]">
              {currentStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CBankingForm;
