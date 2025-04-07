
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import pos from '../../assets/pos.png'
import { Link } from "react-router-dom";

export default function RequirementsPage() {
  return (
    <div className="
            bg-cover
            "
            style={{
                backgroundImage: `url(${pos})`
            }}
            >
    <div className="min-h-screen  flex items-center justify-center p-6">
      <Card className="w-full max-w-3xl p-6 shadow-xl rounded-2xl bg-white">
        <CardContent>
          
          <div className="mt-8 flex justify-end">
            <Button className="px-6 py-2  bg-[#B89B45]  hover:text-white"><Link to='/openaccount'>Open Account</Link></Button>
          </div>
          <h3 className=" font-bold mb-4">Registration Requirements</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Certificate of Registration</li>
            <li>Business email address</li>
            <li>Taxpayer Identification Number (TIN)</li>
            <li>
              Basic information about the business:
              <ul className="list-disc pl-6 mt-1 space-y-1 text-sm">
                <li>Business name</li>
                <li>Business address</li>
                <li>Business email and phone number</li>
                <li>Registration number</li>
              </ul>
            </li>
            <li>BVN of each signatory</li>
            <li>Valid and acceptable means of Identification for each signatory</li>
            <li>
              Basic information of each signatory/proprietor:
              <ul className="list-disc pl-6 mt-1 space-y-1 text-sm">
                <li>Name</li>
                <li>Place and date of birth</li>
                <li>Gender</li>
                <li>Address</li>
                <li>Telephone number</li>
              </ul>
            </li>
            <li>References</li>
          </ul>
          <div className="mt-8 flex justify-end">
          <Button className="px-6 py-2  bg-[#B89B45]  hover:text-white"><Link to='/openaccount'>Open Account</Link></Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
