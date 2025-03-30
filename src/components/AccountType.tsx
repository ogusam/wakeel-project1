import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


 function AccountType() {
  const [bankingType, setBankingType] = useState("personal");
  const navigate = useNavigate();

  const handleSelection = (value: string) => {
    setBankingType(bankingType);
    if (value === "personal") {
      navigate("/personal-banking");
    } else if (value === "corporate") {
      navigate("/corporate-banking");
    }
  };

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold mb-4">Select Banking Type</h1>
      <Select onValueChange={handleSelection}>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Choose an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="personal">Personal Banking</SelectItem>
          <SelectItem value="corporate">Corporate Banking</SelectItem>
        </SelectContent>
      </Select>
      
    </div>
  );
}


export default AccountType;