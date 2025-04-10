import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import pos from '../assets/pos.png'
import altpay from '../assets/altpay.jpeg'
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  



export default function OldAccount() {
    const [step, setStep] = useState<number>(1);
    const [account, setAccount] = useState<string>("2020519785");
    const [accountName, setAccountName] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [maskedEmail, setMaskedEmail] = useState<string>("");
    const [companyName, setCompanyName] = useState<string>("");
    const [companyAddress, setCompanyAddress] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [lga, setLga] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [submissionMessage, setSubmissionMessage] = useState<string>("");

  

    const fetchMaskedEmail = async () => {
        try {
          const response = await fetch("api to fetch masked email");
          const data = await response.json();
          setMaskedEmail(data.maskedEmail);
        } catch (error) {
          console.error("Error fetching masked email:", error);
        }
      };

    const handleValidateAccount = async() => {
        if (account.trim() === "2020519785") {
            setAccountName("Sam Ogu");
            await fetchMaskedEmail();
            setIsOtpSent(true);
            setErrorMessage("");
            alert(`OTP has been sent to your email: ${maskedEmail}`);
          } else {
            setErrorMessage("Invalid account number. Please enter 2020519785.");
            setIsOtpSent(false);
          }
        };

        const handleResendOtp = async () => {
            if (account.trim() === "2020519785") {
              await fetchMaskedEmail();
              alert(`OTP Resent! OTP has been sent to your email: ${maskedEmail}`);
            }
          };

  const handleProceed = () => {
    if (otp.trim()) {
      setStep(2);
    }
  };

 
  const validatePageTwo = () => {
    const newErrors: { [key: string]: string } = {};
    if (!companyName) newErrors.companyName = "Company name is required";
    if (!companyAddress) newErrors.companyAddress = "Company address is required";
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Valid email is required";
    if (!lga) newErrors.lga = "L.G.A is required";
    if (!state) newErrors.state = "State is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 2 && !validatePageTwo()) return;
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    const formData = {
      account,
      companyName,
      companyAddress,
      phoneNumber,
      email,
      lga,
      state,
    };
    console.log("Submitting Form Data:", formData);
    try {
      const response = await fetch("my api will come here", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setSubmissionMessage("Form submitted successfully!");
      } else {
        setSubmissionMessage(result.message || "Submission failed.");
      }
    } catch (error) {
      setSubmissionMessage("An error occurred. Please try again.");
    }
  };


  return (
    <div
  
    >

    <div className="flex flex-col items-center justify-center min-h-screen p-4    bg-cover h-screen"
 style={{
                backgroundImage: `url(${pos})`
            }}>
      <div className="w-60 mb-2"><img src={altpay} alt=""/></div>
      <Card className="w-full max-w-150 p-4">
        <CardContent className="space-y-4">
          
          <div className="flex justify-between mb-4">
            <div className={cn(`w-1/2 text-center font-semibold ${step === 1 ? 'text-black' : 'text-gray-400'}`)}>Account Validation</div>
            <div className={`w-1/2 text-center font-semibold ${step === 2 ? 'text-blue-500' : 'text-gray-400'}`}>Company Information</div>
            <div className={`w-1/2 text-center font-semibold ${step === 3 ? 'text-blue-500' : 'text-gray-400'}`}>Terms and conditions</div>
          </div>
          <Progress value={(step / 3) * 100} className="h-2 bg-[#B89B45]" />
          {step === 1 && (
            <div className=" items-center justify-center ">
              <h2 className="text-xl font-semibold">Validate Account</h2>
              <Input
                placeholder="Enter your account number"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="mt-2"
              />
              {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
              <Button onClick={handleValidateAccount} className="mt-6 w-full h-12 bg-[#B89B45]">
                Validate Account
              </Button>
              
              {isOtpSent && (
                <div className="mt-4">
                    {accountName && <p className="text-green-500">Account Name: {accountName}</p>}
                  <Input
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="mt-2"
                  />
                  <div className="flex justify-between">
                  <div>
                  <Button onClick={handleResendOtp} variant="outline" className="mt-2 w-full">
                    Resend OTP
                  </Button>
                  </div>
                    <div>
                  <Button onClick={handleProceed} className="mt-2 w-full">
                    Proceed
                  </Button>
                  </div>
                  
                </div>
                </div>
              )}
            </div>
          )}
            {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Company Information :</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium">Company Name</label>
                  <Input value={companyName} onChange={e => setCompanyName(e.target.value)} />
                  {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium">Company Address</label>
                  <Input value={companyAddress} onChange={e => setCompanyAddress(e.target.value)} />
                  {errors.companyAddress && <p className="text-red-500 text-sm">{errors.companyAddress}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                  {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input value={email} onChange={e => setEmail(e.target.value)} />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium">L.G.A</label>
                  <Input value={lga} onChange={e => setLga(e.target.value)} />
                  {errors.lga && <p className="text-red-500 text-sm">{errors.lga}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium">State</label>
                  <Input value={state} onChange={e => setState(e.target.value)} />
                  {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <Button onClick={handleBack}>Back</Button>
                <Button onClick={handleNext} className="bg-[#B89B45]">Next</Button>
              </div>
            </div>
          )}

{step === 3 && (
            <div>
              <h2 className="text-xl font-semibold">Terms and Conditions</h2>
              <p className="text-sm text-gray-600">Please read and accept the terms and conditions before proceeding.</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mt-2">Read Terms and Conditions</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Terms and Conditions</DialogTitle>
                  </DialogHeader>
                  <p className="text-sm text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, 
                    sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet 
                    blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse 
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </p>
                </DialogContent>
              </Dialog>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                  className="mr-2"
                />
                <label htmlFor="terms" className="text-sm">I accept the terms and conditions</label>
              </div>
              <div className="flex justify-between mt-4">
                <Button onClick={handleBack}>Back</Button>
                <Button disabled={!termsAccepted} className={!termsAccepted ? "opacity-50 cursor-not-allowed" : "bg-[#B89B45]"} onClick={() => handleSubmit()}>Submit</Button>
              </div>
              {submissionMessage && <p className="text-green-500 mt-2">{submissionMessage}</p>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
