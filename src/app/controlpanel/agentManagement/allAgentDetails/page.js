"use client";
import ManageReferralPopup from "@/components/agentManagement/ManageReferralPopup";
import Navlink from "@/components/agentManagement/Navlink";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const router = useRouter();

  const [manageReferral,setManageReferral] =useState(false);

  return (
    <div className="pb-4">
      <Navlink />
      <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex ">
        <div
          onClick={() => router.back()}
          className="text-[16px] text-black border-r-2 border-[#F0F4F9] flex justify-center items-center px-[38px]"
        >
          Back
        </div>
        <div className="w-full flex text-[16px] text-black justify-between items-center ps-[19px] pe-[73px]">
          <p className="font-semibold">{"Patient Name"}</p>
          <div className="flex justify-center items-center gap-[92px]">
            <p></p>
            <p>Direct</p>
          </div>
        </div>
      </div>

      <div className=" bg-white rounded-[15px] border border-[#BBBBBB] p-6 mt-2 flex justify-between">
        <div className="flex gap-4">
          <h1 className="text-black font-semibold text-[16px]">
            REFERRAL CODE:
          </h1>
          <p className="text-black font-semibold text-[16px]">APD25004</p>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-2">
            <h1 className="text-black font-semibold text-[16px]">REFERRALS:</h1>
            <p className="text-black font-semibold text-[16px]">24</p>
          </div>
          <div className="flex gap-2">
            <h1 className="text-black font-semibold text-[16px]">CONFIRMED:</h1>
            <p className="text-black font-semibold text-[16px]">17</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[15px] border border-[#BBBBBB] p-4 px-6 flex gap-6 mt-2">
        <h1 className="text-black font-semibold">Profile</h1>
        <h1 className="text-[#196BA5] font-semibold">Referrals</h1>
      </div>
      <div className="bg-white rounded-[15px] border border-[#BBBBBB] py-2  mt-2">
        <div className="flex border-b-1 border-b-[#BBBBBB] py-2 w-full px-4 gap-52">
          <div className="bg-[#C0D8F6] rounded-[4px] p-2 font-semibold text-black">
            24
          </div>
          <p className="text-[#666666] flex items-center">
            16 Aug 2025, 10:24 AM
          </p>
        </div>
        <div className="flex p-6 gap-16">
          <div className="flex flex-col gap-[10px] text-[16px]  text-black">
           <span className="text-[16px]  text-black">
        Type
        </span>
         <span className="text-[16px]  text-black">
        Full Name
        </span>
        <span className="text-[16px]  text-black">
        Qualification
        </span>
        <span className="text-[16px]  text-black">
        Contact Number
        </span>
        <span className="text-[16px]  text-black">
        Referral Status
        </span>
        <span className="text-[16px]  text-black">
        Referral Name
        </span>
     
        
        </div>
        <div className="flex flex-col gap-[10px] text-[16px]  text-black">
        <span className="text-[16px]  text-black">
        Mysuru, Karnataka
        </span>
        <span className="text-[16px]  text-black">
        healthcare professional
        </span>
        <span className="text-[16px]  text-black">
        Ajith Kumar
        </span>
        <span className="text-[16px]  text-black">
        ajithkumar@gmail.com
        </span>
        <span className="text-[16px]  text-black">
        -
        </span>
        <span className="text-[16px]  text-black">
       -
        </span>
       
        </div>
        </div>

        <button className="bg-[#3674B5] rounded-[15px] text-white px-8 py-2 mx-6" onClick={()=>setManageReferral(true)}>Manage</button>
      </div>
      <div className="bg-white rounded-[15px] border border-[#BBBBBB] py-2  mt-2">
        <div className="flex border-b-1 border-b-[#BBBBBB] py-2 w-full px-4 gap-52">
          <div className="bg-[#C0D8F6] rounded-[4px] p-2 font-semibold text-black">
            24
          </div>
          <p className="text-[#666666] flex items-center">
            16 Aug 2025, 10:24 AM
          </p>
        </div>
        <div className="flex p-6 gap-16">
          <div className="flex flex-col gap-[10px] text-[16px]  text-black">
           <span className="text-[16px]  text-black">
        Type
        </span>
         <span className="text-[16px]  text-black">
        Full Name
        </span>
        <span className="text-[16px]  text-black">
        Qualification
        </span>
        <span className="text-[16px]  text-black">
        Contact Number
        </span>
        <span className="text-[16px]  text-black">
        Referral Status
        </span>
        <span className="text-[16px]  text-black">
        Referral Name
        </span>
     
        
        </div>
        <div className="flex flex-col gap-[10px] text-[16px]  text-black">
        <span className="text-[16px]  text-black">
        Mysuru, Karnataka
        </span>
        <span className="text-[16px]  text-black">
        healthcare professional
        </span>
        <span className="text-[16px]  text-black">
        Ajith Kumar
        </span>
        <span className="text-[16px]  text-black">
        ajithkumar@gmail.com
        </span>
        <span className="text-[16px]  text-black">
        -
        </span>
        <span className="text-[16px]  text-black">
       -
        </span>
       
        </div>
        </div>

        <button className="bg-[#3674B5] rounded-[15px] text-white px-8 py-2 mx-6 cursor-pointer">Manage</button>
      </div>


      {
        manageReferral && (
          <ManageReferralPopup  onClose={()=>setManageReferral(false)}/>
        )
      }
    </div>
  );
};

export default page;
