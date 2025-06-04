"use client";
import AddNurseAvailability from "@/components/staffManagement/addNewStaff/AddNurseAvailability";
import NurseBasicInformation from "@/components/staffManagement/addNewStaff/NurseBasicInformation";
import NurseExperinceDetails from "@/components/staffManagement/addNewStaff/NurseExperinceDetails";
import UploadCertificate from "@/components/staffManagement/addNewStaff/UploadCertificate";
import Navlink from "@/components/staffManagement/Navlink";
import React, { useState } from "react";

function page() {




  return (
    <div>
      <Navlink />

      <div className="w-full bg-white border border-[#888888] text-base text-black font-semibold flex gap-[50px] px-6 pt-6 pb-4 rounded-[15px] mt-4">
        <div className="flex text-black font-semibold gap-[48px]">
          <p>Nurse</p>
          <p>Paramedical</p>
          <p>Doctor</p>
          <p>Supervisor</p>
        </div>

        {/* <span className="h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4">
          Referral
        </span> */}
      </div>

      <div className="bg-white border-[1px] border-[#BBBBBB] rounded-[15px] mt-4 mb-6">
        <NurseBasicInformation/>

       <div>
        <NurseExperinceDetails/>
       </div>

        <div className="px-[39px] pt-[15px]">
       <UploadCertificate/>

         
         <div className="flex gap-x-[20px]">
  

    <AddNurseAvailability/>



</div>

        
        </div>
      </div>
    </div>
  );
}

export default page;
