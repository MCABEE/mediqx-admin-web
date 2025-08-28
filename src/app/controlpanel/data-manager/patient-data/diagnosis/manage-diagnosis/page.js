"use client"
import EditPopup from "@/components/dataManager/generalData/EditPopup";
import Navlink from "@/components/dataManager/patientData/Navlink";
import Link from "next/link";
import React, { useState } from "react";

function page() {
  const [isPopupOpen,setIsPopupOpen] = useState(false);
  return (
    <div>
      <Navlink />
      <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="w-full flex item-center justify-between pt-[23px] pb-[19px]">
          <div className=" flex items-center gap-[50px]">
            <Link href={" /controlpanel/data-manager/patient-data/diagnosis/add-diagnosis"} className="text-black">Add</Link>

            <h1 className="text-[#3674B5]">Manage</h1>
          </div>
         
        </div>
      </div>

      <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
<h1 className="text-black font-semibold py-[16px] ">Manage Diagnosis</h1>
      </div>
      <div className="bg-white flex  items-center gap-2 px-6 py-2 mt-2">
        <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">01</div>
            <input type="text" className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none" placeholder="Enter Diagnosis"/>
            <input type="checkbox" className="size-6 rounded-[15px]" />

      </div>
       <div className="bg-white flex  items-center gap-2 px-6 py-2 mt-2">
        <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">02</div>
            <input type="text" className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none" placeholder="Enter Diagnosis"/>
            <input type="checkbox" className="size-6 rounded-[15px]" />

      </div>
     <div className="flex gap-3">
       <button className="bg-[#196BA5] text-white  rounded-[15px] py-2 px-10 mt-2 cursor-pointer " 
       onClick={()=> setIsPopupOpen(true)}
       >
            Edit
          </button> 
          <button className="bg-[#196BA5] text-white  rounded-[15px] py-2 px-10 mt-2 cursor-pointer">
            Remove
          </button>
     </div>


     {
      isPopupOpen && (
        <EditPopup
        heading={"Diagnosis"} 
        onClose={()=>setIsPopupOpen(false)}
        />
      )
     }

    </div>
  );
}

export default page;
