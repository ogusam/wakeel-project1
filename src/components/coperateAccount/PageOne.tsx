import { useState, useEffect } from "react";
import { Input } from "../ui/input";
const TinNumber = ({ onValidate }: { onValidate: (valid: boolean) => void }) => {
  const [tinNumber, setTinNumber] = useState(() => {
    const saved = localStorage.getItem("step1-tin");
    return saved || "";
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    localStorage.setItem("step1-tin", tinNumber);
    onValidate(tinNumber.length === 11);
  }, [tinNumber, onValidate]);

  const handleInputChange = (value: string) => {
    setTinNumber(value);
    if (value.length !== 11) {
      setErrors({ tin: "TIN must be exactly 11 digits." });
    } else {
      setErrors({});
    }
  };

  return (
    <div>
      <label className="block mb-1">TIN Number</label>
      <Input
        type="text"
        value={tinNumber}
        onChange={(e) => handleInputChange(e.target.value)}
        maxLength={11}
      />
      {errors.tin && <p className="text-red-600 text-sm">{errors.tin}</p>}
    </div>
  );
};

  export default TinNumber;