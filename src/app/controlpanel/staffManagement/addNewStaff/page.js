"use client";
import AddNurseAvailability from "@/components/staffManagement/addNewStaff/AddNurseAvailability";
import NurseBasicInformation from "@/components/staffManagement/addNewStaff/NurseBasicInformation";
import NurseExperinceDetails from "@/components/staffManagement/addNewStaff/NurseExperinceDetails";
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
          <h1 className="text-[16px] font-semibold text-black py-[18px]">
            Upload your Registration / Experience Certificates
          </h1>
          <div className="flex flex-col gap-5 mb-4">
            <label
              for="cv-upload"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] ps-8 pe-4 flex items-center justify-between cursor-pointer"
            >
              Nursing Certificate <img src="/upload-btn.svg" alt="" />
              <input type="file" id="cv-upload" className="hidden" />
            </label>
            <label
              for="cv-upload"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] ps-8 pe-4 flex items-center justify-between cursor-pointer"
            >
              Council Registration <img src="/upload-btn.svg" alt="" />
              <input type="file" id="cv-upload" className="hidden" />
            </label>
            <label
              for="cv-upload"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] ps-8 pe-4 flex items-center justify-between cursor-pointer"
            >
              Experience Certificates <img src="/upload-btn.svg" alt="" />
              <input type="file" id="cv-upload" className="hidden" />
            </label>
            <label
              for="cv-upload"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] ps-8 pe-4 flex items-center justify-between cursor-pointer"
            >
              Photo <img src="/upload-btn.svg" alt="" />
              <input type="file" id="cv-upload" className="hidden" />
            </label>
          </div>

         
         <div className="flex gap-x-[20px]">
  

    <AddNurseAvailability/>



</div>

        
        </div>
      </div>
    </div>
  );
}

export default page;
