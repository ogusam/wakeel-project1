import { cn } from "@/lib/utils";


const steps = ["TIN", "Company Info", "Signatory Info", "Document Upload", "Terms"];

const Stepper = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex justify-between mb-6">
      {steps.map((step, index) => (
                      <div key={index} className="flex flex-col items-center">

        <div
          key={index}
          className={cn(
                    "w-8 h-8 flex items-center justify-center rounded-full border-2",
                    index <= currentStep ? "bg-[#B89B45] text-white border-[#000000]" : "bg-white border-gray-400"

          )}
        >
                            {index + 1}
          </div>
          <span className="text-sm mt-2">{step}</span>

        </div>
      ))}
    </div>
  );
};

export default Stepper;