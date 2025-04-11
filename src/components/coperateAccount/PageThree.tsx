import  { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { format } from "date-fns";

import { statesAndLGAs } from '../../lib/nigeria-data'



//const statesInNigeria = Object.keys(statesAndLGAs);


interface Step3FormData {
  firstName: string;
  lastName: string;
  otherNames: string;
  email: string;
  phone: string;
  dob: Date | null;
  birthPlace: string;
  gender: string;
  nin: string;
  bvn: string;
  passport: File | null;
  idCard: File | null;
  state: string;
  lga: string;
}

const Signatory = ({ onValidate }: { onValidate: (valid: boolean) => void }) => {
  const [signatories, setSignatories] = useState<Step3FormData[]>(() => {
    const saved = localStorage.getItem("step3Signatories");
    return saved ? JSON.parse(saved, (key, value) => (key === "dob" && value ? new Date(value) : value)) : [
      {
        firstName: "",
        lastName: "",
        otherNames: "",
        email: "",
        phone: "",
        dob: null,
        birthPlace: "",
        gender: "",
        nin: "",
        bvn: "",
        passport: null,
        idCard: null,
        state: "",
        lga: "",
      },
    ];
  });

  const [errors, setErrors] = useState<Record<number, Record<string, string>>>({});

  useEffect(() => {
    const allValid = signatories.every((form) =>
      form.firstName &&
      form.lastName &&
      form.email &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
      form.phone &&
      form.dob &&
      form.birthPlace &&
      form.gender &&
      form.nin && /^\d{11}$/.test(form.nin) &&
      form.bvn && /^\d{11}$/.test(form.bvn) &&
      form.passport &&
      form.idCard &&
      form.state &&
      form.lga
    );
    onValidate(allValid);
  }, [signatories, onValidate]);

  useEffect(() => {
    localStorage.setItem("step3Signatories", JSON.stringify(signatories));
  }, [signatories]);

  const handleChange = (index: number, key: keyof Step3FormData, value: any) => {
    const updated = [...signatories];
    if (key === "state") {
      updated[index].lga = ""; // reset LGA on state change
    }
    updated[index][key] = value;
    setSignatories(updated);

    setErrors((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [key]: !value
          ? "This field is required"
          : (key === "nin" || key === "bvn") && !/^\d{11}$/.test(value)
          ? `${key.toUpperCase()} must be 11 digits`
          : "",
        ...(key === "state" ? { lga: "This field is required" } : {}),
      },
    }));
  };

  const addSignatory = () => {
    setSignatories((prev) => [
      ...prev,
      {
        firstName: "",
        lastName: "",
        otherNames: "",
        email: "",
        phone: "",
        dob: null,
        birthPlace: "",
        gender: "",
        nin: "",
        bvn: "",
        passport: null,
        idCard: null,
        state: "",
        lga: "",
      },
    ]);
  };

  const removeSignatory = (index: number) => {
    const updated = [...signatories];
    updated.splice(index, 1);
    setSignatories(updated);
  };


  return (
    <div className="space-y-6">
      {signatories.map((form, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <h4 className="font-semibold">Signatory {index + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">First Name</label>
            <Input value={form.firstName} onChange={(e) => handleChange(index, "firstName", e.target.value)} />
            {errors[index]?.firstName && <p className="text-red-600 text-sm">{errors[index].firstName}</p>}
          </div>

          <div>
            <label className="block mb-1">Last Name</label>
            <Input value={form.lastName} onChange={(e) => handleChange(index, "lastName", e.target.value)} />
            {errors[index]?.lastName && <p className="text-red-600 text-sm">{errors[index].lastName}</p>}
          </div>

          <div>
            <label className="block mb-1">Other Names</label>
            <Input value={form.otherNames} onChange={(e) => handleChange(index, "otherNames", e.target.value)} />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <Input type="email" value={form.email} onChange={(e) => handleChange(index, "email", e.target.value)} />
            {errors[index]?.email && <p className="text-red-600 text-sm">{errors[index].email}</p>}
          </div>

          <div>
            <label className="block mb-1">Phone Number</label>
            <Input value={form.phone} onChange={(e) => handleChange(index, "phone", e.target.value)} />
            {errors[index]?.phone && <p className="text-red-600 text-sm">{errors[index].phone}</p>}
          </div>

          <div>
  <label className="block mb-1">Date of Birth</label>
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant={"outline"}
        className={`w-full justify-start text-left font-normal ${
          !form.dob ? "text-muted-foreground" : ""
        }`}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {form.dob ? format(form.dob, "PPP") : <span>Select date</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar
        mode="single"
        selected={form.dob ?? undefined}
        onSelect={(date) => handleChange(index, "dob", date)}
        captionLayout="dropdown"
        fromYear={1900}
        
        
      />
    </PopoverContent>
  </Popover>
  {errors[index]?.dob && <p className="text-red-600 text-sm">{errors[index].dob}</p>}
</div>


          <div>
            <label className="block mb-1">Place of Birth</label>
            <Input value={form.birthPlace} onChange={(e) => handleChange(index, "birthPlace", e.target.value)} />
            {errors[index]?.birthPlace && <p className="text-red-600 text-sm">{errors[index].birthPlace}</p>}
          </div>

          <div>
            <label className="block mb-1">Gender</label>
            <Select onValueChange={(val) => handleChange(index, "gender", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors[index]?.gender && <p className="text-red-600 text-sm">{errors[index].gender}</p>}
          </div>

          <div>
            <label className="block mb-1">NIN</label>
            <Input value={form.nin} onChange={(e) => handleChange(index, "nin", e.target.value)} />
            {errors[index]?.nin && <p className="text-red-600 text-sm">{errors[index].nin}</p>}
          </div>

          <div>
            <label className="block mb-1">BVN</label>
            <Input value={form.bvn} onChange={(e) => handleChange(index, "bvn", e.target.value)} />
            {errors[index]?.bvn && <p className="text-red-600 text-sm">{errors[index].bvn}</p>}
          </div>

          <div>
            <label className="block mb-1">Upload Passport</label>
            <Input type="file" onChange={(e) => handleChange(index, "passport", e.target.files?.[0] || null)} />
            {errors[index]?.passport && <p className="text-red-600 text-sm">{errors[index].passport}</p>}
          </div>

          <div>
            <label className="block mb-1">Upload Valid ID</label>
            <Input type="file" onChange={(e) => handleChange(index, "idCard", e.target.files?.[0] || null)} />
            {errors[index]?.idCard && <p className="text-red-600 text-sm">{errors[index].idCard}</p>}
          </div>

          <div>
            <label className="block mb-1">State</label>
            <Select onValueChange={(val) => handleChange(index, "state", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(statesAndLGAs).map((state) => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors[index]?.state && <p className="text-red-600 text-sm">{errors[index].state}</p>}
          </div>

          <div>
            <label className="block mb-1">LGA</label>
            <Select onValueChange={(val) => handleChange(index, "lga", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select LGA" />
              </SelectTrigger>
              <SelectContent>
                {(statesAndLGAs[form.state] || []).map((lga) => (
                  <SelectItem key={lga} value={lga}>{lga}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors[index]?.lga && <p className="text-red-600 text-sm">{errors[index].lga}</p>}
          </div>
          {signatories.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeSignatory(index)}
              >
                Remove Signatory
              </Button>
          )}
        </div>
        </div>
      ))}

      <Button onClick={addSignatory} className="bg-green-600">Add Signatory</Button>
      
    </div>
  );
};export default Signatory;
