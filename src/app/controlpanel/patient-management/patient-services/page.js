"use client";
import Navlink from "@/components/patientManagement/Navlink";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const router = useRouter();
  return (
    <div>
      {/* <Navlink /> */}

      <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex ">
        <div
          onClick={() => router.back()}
          className="text-[16px] text-black border-r-2 border-[#F0F4F9] flex justify-center items-center px-[38px] cursor-pointer"
        >
          Back
        </div>
        <div className="w-full flex text-[16px] text-black justify-between items-center ps-[19px] pe-[73px]">
          <p className="font-semibold">{"Patient Name"}</p>
          <div className="flex justify-center items-center gap-[92px]">
            <p className="font-semibold">Banglore</p>
          </div>
        </div>
      </div>
      <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
        <div className="w-full h-[72px] flex items-center bg-white px-8 rounded-t-[15px] border-b-1 border-[#BBBBBB]">
          <h1 className="text-[16px] font-semibold text-black bg-[#C0D8F6] p-2 rounded-[4px]">
        01
          </h1>
        </div>

        <div className="flex flex-col gap-[10px] p-8 text-[16px] text-black">
          <div className="flex">
            <span className="w-[250px] font-medium">Diagnosis</span>
            <span>Nake uhuu</span>
          </div>
          <div className="flex">
            <span className="w-[250px] font-medium">Service Period from</span>
            <span>Male</span>
          </div>
          <div className="flex">
            <span className="w-[250px] font-medium">Single visit / periodically</span>
            <span>72</span>
          </div>
          <div className="flex">
            <span className="w-[250px] font-medium">Duration</span>
            <span>165cm, 72 kg</span>
          </div>
          <div className="flex">
            <span className="w-[250px] font-medium">Daily Schedule</span>
            <span>Name of the service</span>
          </div>
          <div className="flex">
            <span className="w-[250px] font-medium">
              Frequency
            </span>
            <span>uiu u yuyu</span>
          </div>
          <div className="flex">
            <span className="w-[250px] font-medium">Flexibility</span>
            <span>iuui uihui</span>
          </div>
          <div className="flex">
            <span className="w-[250px] font-medium">Time</span>
            <span>City</span>
          </div>
     
<Link  href={"/controlpanel/patient-management/case-history"}  className='w-[192px] h-[40px] rounded-[15px] text-white bg-[#3674B5] mt-8 flex items-center justify-center cursor-pointer'>            View Case History
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
