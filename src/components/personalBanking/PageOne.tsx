import { Label } from "@/components/ui/label";


function Tin({ formData, handleChange }: { formData: any; handleChange: any }) {
  
    return (
        <div>
        <Label htmlFor="Tin">Tin Number</Label>

      <input
        type="text"
        name="tin"
        value={formData.tin}
        onChange={handleChange}
        placeholder="Enter TIN Number"
        className="w-full p-2 border rounded mt-2 text-white"
      />
      </div>
    );
  }

  export default Tin