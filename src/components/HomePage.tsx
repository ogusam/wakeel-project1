import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import altpay from '../assets/altpay.jpeg'
import pos from '../assets/pos.png'                              
import { useState } from "react";
 function HomePage() {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="flex h-screen items-center  justify-center bg-black p-4">
    <div className="w-1/2 hidden md:block  "><img src={pos} alt=""/></div>
        
        
      <div className="flex flex-col w-full max-w-md space-y-4 p-6  items-center justify-center">
      <div className="flex items-center justify-center"><img src={altpay} alt="" className="w-50"/></div>
        <h2 className=" text-2xl bolder text-center text-white">Select <span className="text-[#B89B45]">Account</span>  Type</h2>
       {!showOptions ? (
        <div className="flex flex-col gap-2">
        <Button className="w-90  bg-[#B89B45] text-white hover:text-white hover:bg-[#B89B45]" onClick={() => setShowOptions(true)}>New account</Button>
        <Link to='account'><Button className="w-90 bg-white text-black hover:bg-white">Existing Account</Button></Link>
        </div>
       ) : (
        <>
            <Button className="w-full bg-[#B89B45] hover:bg-[#ffff] hover:text-black" variant="default"><Link to='/personalBanking'>Personal Banking</Link></Button>
            <Button className="w-full hover:bg-[#B89B45]"  variant="outline"><Link to='/cbanking'>Corporate Banking</Link></Button>
          </>
       )
        }
      </div>
    </div>
    
  );
}

export default HomePage