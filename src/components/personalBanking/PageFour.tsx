
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StepProps {
  formData: Record<string, any>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
  
}

function PageFour({ handleChange }: StepProps) {
    const documents = ["cacDocument", "document1", "document2", "document3", "document4", "document5", "document6", "document7"];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc, index) => (
            <div key={doc}>
              <Label htmlFor={doc}>{doc === "cacDocument" ? "CAC Document" : `Document ${index}`}</Label>
              <Input id={doc} name={doc} type="file" onChange={handleChange} />
            </div>
          ))}
        </div>
      );
    }

  export default PageFour;