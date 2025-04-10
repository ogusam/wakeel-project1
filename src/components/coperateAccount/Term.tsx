import { useState, useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Terms = ({ onValidate }: { onValidate: (valid: boolean) => void }) => {
  const [accepted, setAccepted] = useState(() => {
    const saved = localStorage.getItem("terms-accepted");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("terms-accepted", JSON.stringify(accepted));
    onValidate(accepted);
  }, [accepted, onValidate]);


  const termsText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pretium, nisl nec tincidunt dignissim, nulla tellus interdum urna, vitae egestas lectus ipsum ac justo. Proin semper, mi et malesuada convallis, elit felis malesuada tortor, at tincidunt felis velit a nunc. Morbi efficitur porta enim, sit amet tincidunt purus ultrices a. Integer viverra tortor leo, eget porttitor leo posuere ut. Sed a mauris sem. Sed pharetra imperdiet elit, non condimentum erat malesuada eget. Proin ac sem ut erat rhoncus facilisis. Sed in viverra lorem. Integer vel lacus ac magna viverra dapibus sit amet a erat. Nam volutpat purus in neque scelerisque, at ullamcorper libero hendrerit. Mauris eu efficitur turpis. Curabitur at quam vel orci egestas feugiat in nec nulla. Donec ut ligula a erat egestas rutrum in eu justo. Curabitur eget purus sem. Quisque porta metus at augue tincidunt, nec feugiat ligula commodo. Vestibulum eget hendrerit leo. Morbi eget risus nec diam posuere consectetur. Nulla facilisi. Integer non purus eu eros posuere efficitur sit amet sit amet nibh. Donec scelerisque ipsum ut nisi suscipit, nec lacinia justo porta. Vestibulum mattis semper lacus, et congue justo malesuada vitae.`;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" checked={accepted} onCheckedChange={(val) => setAccepted(!!val)} />
        <label htmlFor="terms" className="text-sm">I accept the terms and conditions</label>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className="text-blue-600 underline text-sm">Read Terms</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[400px] overflow-y-auto text-sm">
            {termsText}
          </DialogContent>
        </Dialog>
      </div>
      {!accepted && <p className="text-red-600 text-sm">You must accept the terms and conditions to proceed.</p>}
    </div>
  );
};

  export default Terms;