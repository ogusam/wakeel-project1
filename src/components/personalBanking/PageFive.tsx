import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";


function PageFive({ formData, handleCheckboxChange, errors }: StepProps) {
    const termsText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Curabitur lacinia nunc vel libero laoreet, id tristique purus dapibus. 
    Etiam eget sapien rutrum, rhoncus massa nec, ultrices felis. 
    Sed tristique congue purus, sed tincidunt diam fermentum vel. 
    Fusce nec bibendum sapien. Proin et urna et ipsum vestibulum vulputate. 
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
    Vivamus tincidunt metus vel tortor suscipit, nec commodo arcu gravida. 
    Suspendisse potenti. Maecenas porttitor, lacus eget feugiat vulputate, nisl augue luctus massa, vitae sodales orci eros at augue. 
    Integer a metus nulla. Donec euismod risus libero, vel gravida metus faucibus eget. 
    Pellentesque id commodo nunc. Pellentesque habitant morbi tristique senectus et netus. 
    Quisque iaculis nulla ac enim volutpat, sed sagittis tortor pharetra. 
    Curabitur tempor est id turpis vulputate, vitae bibendum purus ornare.`;
  
    return (
      <div className="space-y-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Read Terms and Conditions</Button>
          </DialogTrigger>
          <DialogContent>
            <div className="max-h-[400px] overflow-y-auto whitespace-pre-wrap text-sm text-gray-700">
              {termsText}
            </div>
          </DialogContent>
        </Dialog>
  
        <div className="flex items-center space-x-2">
          <Checkbox
            id="termsAccepted"
            checked={formData.termsAccepted || false}
            onCheckedChange={handleCheckboxChange}
          />
          <Label htmlFor="termsAccepted">I accept the terms and conditions</Label>
        </div>
        {errors?.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}
      </div>
    );
  }
  
  
  export default PageFive;