import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import pos from '../../assets/pos.png'
import altpay from '../../assets/altpay.jpeg'
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";
import PageFour from "./PageFour";
import PageOne from "./PageOne"
import PageFive from "./PageFive";
const steps = ["TIN Number", "Bussiness Info", "Signatory Info", "Upload Documents", "Terms & Condition"];

const PersonalBanking = () => 
    {
        const [currentStep, setCurrentStep] = useState(0);
        const [formData, setFormData] = useState<Record<string, any>>(() => {
            const savedData = localStorage.getItem("multiStepFormData");
            return savedData ? JSON.parse(savedData) : {};
          });
          const [errors, setErrors] = useState<Record<string, string>>({});
          const [otp, setOtp] = useState("");
  
  const [otpError, setOtpError] = useState("");
  const [resending, setResending] = useState(false);

  const [showOtpDialog, setShowOtpDialog] = useState(false);
  

          useEffect(() => {
            localStorage.setItem("multiStepFormData", JSON.stringify(formData));
          }, [formData]);

          const validateStep = (): boolean => {
            const stepErrors: Record<string, string> = {};
            if (currentStep === 1) {
              if (!formData.businessName) stepErrors.businessName = "Business name is required";
              if (!formData.businessAddress) stepErrors.businessAddress = "Business address is required";
              if (!formData.phoneNumber) stepErrors.phoneNumber = "Phone number is required";
              if (!formData.businessEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) stepErrors.businessEmail = "Valid email is required";
              if (!formData.cacNumber) stepErrors.cacNumber = "CAC number is required";
              if (!formData.lga) stepErrors.lga = "L.G.A is required";
              if (!formData.state) stepErrors.state = "State is required";
            }
            else if (currentStep === 2) {
                if (!formData.signatoryName) stepErrors.signatoryName = "Signatory name is required";
                if (!formData.bvn) stepErrors.bvn = "BVN is required";
                if (!formData.placeOfBirth) stepErrors.placeOfBirth = "Place of birth is required";
                if (!formData.gender) stepErrors.gender = "Gender is required";
                if (!formData.signatoryAddress) stepErrors.signatoryAddress = "Address is required";
                if (!formData.signatoryPhone) stepErrors.signatoryPhone = "Phone number is required";
                if (!formData.signatoryEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.signatoryEmail)) stepErrors.signatoryEmail = "Valid email is required";

                if (!formData.idDocument) stepErrors.idDocument = "ID document is required";
              }
            setErrors(stepErrors);
            return Object.keys(stepErrors).length === 0;
          };
          const handleNext = () => {
            if (validateStep()) {
              if (currentStep < steps.length - 1) {
                setCurrentStep(currentStep + 1);
              }
            }
          };
        
          const handleBack = () => {
            if (currentStep > 0) {
              setCurrentStep(currentStep - 1);
            }
          };
        
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value, files } = e.target;
            setFormData({ ...formData, [name]: files?.[0] ? URL.createObjectURL(files[0]) : value });
          };
      
          const handleCheckboxChange = (checked: boolean) => {
            setFormData({ ...formData, termsAccepted: checked });
          };
        
          const requestOtp = async () => {
            try {
              const res = await fetch("http://localhost:6000/registrations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.businessEmail }),
              });
              if (!res.ok) throw new Error("Failed to send OTP");
              toast.success(`OTP has been sent to your email: ${formData.businessEmail}`);
              setOtpSent(true);
              setShowOtpDialog(true);
            } catch (err) {
              alert("Error sending OTP");
            }
          };
        
          const handleSubmit = async () => {
            if (!validateStep()) return;
            await requestOtp();
          };
        
          const handleVerifyOtp = async () => {
            try {
              const res = await fetch("http://localhost:6000/requestotp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.businessEmail, otp }),
              });
              if (!res.ok) throw new Error("Invalid OTP");
              await fetch("API/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
              });
              alert("Form submitted successfully!");
              setShowOtpDialog(false);
            } catch (err) {
              setOtpError("OTP verification failed");
            }
          };
        
          const resendOtp = async () => {
            setResending(true);
            await requestOtp();
            setResending(false);
          };
        
{/*
          const handleSubmit = async () => {
            if (!validateStep()) return;
            try {
              const res = await fetch("https://example.com/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.businessEmail }),
              });
              if (!res.ok) throw new Error("Failed to send OTP");
              setOtpSent(true);
              setShowOtpDialog(true);
            } catch (err) {
              alert("Error sending OTP");
            }
          };
        
          const handleVerifyOtp = async () => {
            try {
              const res = await fetch("APITOVERIFY/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.businessEmail, otp }),
              });
              if (!res.ok) throw new Error("Invalid OTP");
              await fetch("API TO SUBMIT OTP/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
              });
              alert("Form submitted successfully, A network manager will contact you!");
              setShowOtpDialog(false);
            } catch (err) {
              setOtpError("OTP verification failed");
            }
          };

          const resendOtp = async () => {
            setResending(true);
            await requestOtp();
            setResending(false);
          };
        
        */}

        const renderStep = () => {
          switch (currentStep) {
            case 0:
              return <PageOne formData={formData} handleChange={handleChange} />;
            case 1:
              return <PageTwo formData={formData} handleChange={handleChange} errors={errors}/>;
            case 2:
              return <PageThree formData={formData} handleChange={handleChange} errors={errors}/>;
            case 3:
              return <PageFour formData={formData} handleChange={handleChange}/>;
            case 4:
             return <PageFive formData={formData} handleCheckboxChange={handleCheckboxChange} errors={errors} />;
            default:
              return null;
          }
        };
      
        return (
            <div className="
            bg-cover h-screen
            "
            style={{
                backgroundImage: `url(${pos})`
            }}
            >
            <div className="max-w-lg w-full mx-auto p-4 sm:p-6 shadow-lg">
                <div className="  justify-items-center"><img src={altpay} alt="" className="h-20"/></div>
      <div className="flex flex-wrap justify-between mb-4 gap-2 text-center sm:text-left">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`text-xs sm:text-sm font-medium flex-1 ${index === currentStep ? "text-[#B89B45]" : "text-white"}`}
          >
            {step}
          </div>
        ))}
      </div>
      <Progress value={(currentStep + 1) * (100 / steps.length)} className="h-2 bg-[#B89B45]" />
      <div className="my-6">{renderStep()}</div>
      <div className="flex justify-between pt-6">
        {currentStep > 0 && <Button variant="outline" onClick={handleBack}>Back</Button>}
        {currentStep < steps.length - 1 && <Button onClick={handleNext} className="bg-[#B89B45]">Next</Button>}
        {currentStep === steps.length - 1 && (
          <Button onClick={handleSubmit} disabled={!formData.termsAccepted} className="b-[#B89B45]">Submit</Button>
        )}
      </div>

      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent className="space-y-4">
          <Label htmlFor="otp">Enter OTP</Label>
          <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
          {otpError && <p className="text-red-500 text-sm">{otpError}</p>}
          <Button onClick={handleVerifyOtp}>Verify & Submit</Button>
          <Button variant="outline" onClick={resendOtp} disabled={resending}>
              {resending ? "Resending..." : "Resend OTP"}
            </Button>
        </DialogContent>
      </Dialog>
    </div>
    </div>
        );
      }
      

export default PersonalBanking