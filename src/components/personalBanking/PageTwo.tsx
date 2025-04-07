
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StepProps {
  formData: Record<string, any>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  errors?: Record<string, string>;
}

const PageTwo = ({ formData, handleChange, errors }: StepProps) => {
    return (

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="businessName">Business Name</Label>
        <Input id="businessName" name="businessName" placeholder="Business Name" value={formData.businessName || ""} onChange={handleChange} className="text-white mt-2"/>
        {errors?.businessName && <p className="text-red-500 text-sm">{errors.businessName}</p>}
      </div>

      <div>
        <Label htmlFor="businessAddress">Business Address</Label>
        <Input id="businessAddress" name="businessAddress" placeholder="Business Address" value={formData.businessAddress || ""} onChange={handleChange} className="text-white mt-2"/>
        {errors?.businessAddress && <p className="text-red-500 text-sm">{errors.businessAddress}</p>}
      </div>

      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input id="phoneNumber" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber || ""} onChange={handleChange} className="text-white mt-2"/>
        {errors?.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
      </div>

      <div>
        <Label htmlFor="businessEmail">Business Email</Label>
        <Input id="businessEmail" name="businessEmail" placeholder="Business Email" value={formData.businessEmail || ""} onChange={handleChange} className="text-white mt-2"/>
        {errors?.businessEmail && <p className="text-red-500 text-sm">{errors.businessEmail}</p>}
      </div>

      <div>
        <Label htmlFor="cacNumber">CAC Number</Label>
        <Input id="cacNumber" name="cacNumber" placeholder="CAC Number" value={formData.cacNumber || ""} onChange={handleChange} className="text-white mt-2"/>
        {errors?.cacNumber && <p className="text-red-500 text-sm">{errors.cacNumber}</p>}
      </div>

      <div>
        <Label htmlFor="lga">Local Government Area (L.G.A)</Label>
        <Input id="lga" name="lga" placeholder="Local Government Area (L.G.A)" value={formData.lga || ""} onChange={handleChange} className="text-white mt-2" />
        {errors?.lga && <p className="text-red-500 text-sm">{errors.lga}</p>}
      </div>

      <div>
        <Label htmlFor="state">State</Label>
        <Input id="state" name="state" placeholder="State" value={formData.state || ""} onChange={handleChange} className="text-white mt-2"/>
        {errors?.state && <p className="text-red-500 text-sm">{errors.state}</p>}
      </div>
    </div>
      );
    
}

export default PageTwo