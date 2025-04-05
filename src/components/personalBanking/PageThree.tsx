
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



 const PageThree = ({ formData, handleChange, errors }: StepProps)=>
     {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
        <Label htmlFor="signatoryName">Signatory Name</Label>
        <Input id="signatoryName" name="signatoryName" placeholder="Full Name" value={formData.signatoryName || ""} onChange={handleChange} />
        {errors?.signatoryName && <p className="text-red-500 text-sm">{errors.signatoryName}</p>}
            </div>
            <div>
              <Label htmlFor="bvn">BVN</Label>
              <Input id="bvn" name="bvn" placeholder="BVN" value={formData.bvn || ""} onChange={handleChange} className="text-white"/>
              {errors?.bvn && <p className="text-red-500 text-sm">{errors.bvn}</p>}
            </div>
      
            <div>
              <Label htmlFor="placeOfBirth">Place of Birth</Label>
              <Input id="placeOfBirth" name="placeOfBirth" placeholder="Place of Birth" value={formData.placeOfBirth || ""} onChange={handleChange} className="text-white"/>
              {errors?.placeOfBirth && <p className="text-red-500 text-sm">{errors.placeOfBirth}</p>}
            </div>
      
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Input id="gender" name="gender" placeholder="Gender" value={formData.gender || ""} onChange={handleChange} className="text-white"/>
              {errors?.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>
      
            <div>
              <Label htmlFor="signatoryAddress">Address</Label>
              <Input id="signatoryAddress" name="signatoryAddress" placeholder="Address" value={formData.signatoryAddress || ""} onChange={handleChange} className="text-white"/>
              {errors?.signatoryAddress && <p className="text-red-500 text-sm">{errors.signatoryAddress}</p>}
            </div>
      
            <div>
              <Label htmlFor="signatoryPhone">Phone Number</Label>
              <Input id="signatoryPhone" name="signatoryPhone" placeholder="Phone Number" value={formData.signatoryPhone || ""} onChange={handleChange} className="text-white"/>
              {errors?.signatoryPhone && <p className="text-red-500 text-sm">{errors.signatoryPhone}</p>}
            </div>
            <div>
             <Label htmlFor="businessEmail"> Email</Label>
            <Input id="signatoryEmail" name="signatoryEmail" placeholder=" Email" value={formData.signatoryEmail || ""} onChange={handleChange} className="text-white" />
             {errors?.signatoryEmail && <p className="text-red-500 text-sm">{errors.signatoryEmail}</p>}
            </div>

            <div>
              <Label htmlFor="idDocument">ID Document</Label>
              <Input id="idDocument" name="idDocument" type="file" onChange={handleChange} />
              {errors?.idDocument && <p className="text-red-500 text-sm">{errors.idDocument}</p>}
            </div>
          </div>
        );
      }
      
export default PageThree;