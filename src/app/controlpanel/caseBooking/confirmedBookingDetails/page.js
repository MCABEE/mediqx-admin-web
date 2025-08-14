import Navlink from "@/components/caseBooking/NavLink";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <Navlink />
      <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex ">
        <Link
          href={"/controlpanel/caseBooking/confirmedBooking"}
          className="text-[16px] text-black border-r-2 border-[#F0F4F9] flex justify-center items-center px-[38px]"
        >
          Back
        </Link>
        <div className="w-full flex text-[16px] text-black justify-between items-center ps-[19px] pe-[73px] ">
          <p className="font-semibold">Pradeep Kumar N</p>
          <div className="flex justify-center items-center gap-[92px]">
            <p>12 April</p>
            <p>Direct</p>
          </div>
        </div>
      </div>
      <div className=" w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
        <div className="w-full h-[72px] flex items-center bg-white px-8 rounded-t-[15px] border-b-2">
          <h1 className="text-[16px] font-semibold text-black">
            Patient Details
          </h1>
        </div>
        <div className="flex gap-10 p-8">
          <div className="flex flex-col gap-[10px] text-[16px]  text-black">
            <span className="text-[16px]  text-black">Patient Name</span>
            <span className="text-[16px]  text-black">Gender</span>
            <span className="text-[16px]  text-black">Age</span>
            <span className="text-[16px]  text-black">Height, Weight</span>
            <span className="text-[16px]  text-black">Diagnosis</span>
            <span className="text-[16px]  text-black">
              Current Health Status / Activity
            </span>
            <span className="text-[16px]  text-black">Now Patient at</span>
            <span className="text-[16px]  text-black">Residential Address</span>
            <span className="text-[16px]  text-black">Contact person</span>
            <span className="text-[16px]  text-black">
              Relationship with patient
            </span>
            <span className="text-[16px]  text-black">Email ID</span>
            <span className="text-[16px]  text-black">Mobile Number</span>
          </div>
          <div className="flex flex-col gap-[10px] text-[16px]  text-black">
            <span className="text-[16px]  text-black">Krishnakumar P</span>
            <span className="text-[16px]  text-black">Male</span>
            <span className="text-[16px]  text-black">56</span>
            <span className="text-[16px]  text-black">175cm, 64 Kg</span>
            <span className="text-[16px]  text-black">Osteoarthritis</span>
            <span className="text-[16px]  text-black">Walk with Support</span>
            <span className="text-[16px]  text-black">Residence</span>
            <span className="text-[16px]  text-black">
              325A, Lane B, Rajaji Road SN Puram, North Sector, Bengaluru Pin -
              650 005
            </span>
            <span className="text-[16px]  text-black">Ajith Krishnakumar</span>
            <span className="text-[16px]  text-black">Son</span>
            <span className="text-[16px]  text-black">
              ajithk1996@gmail.com
            </span>
            <span className="text-[16px]  text-black">8989056458</span>
          </div>
        </div>
        <div className=" text-black text-[16px] ">
          <p className=" px-8 font-semibold border-b-1 border-[#BBBBBB] pb-[18px]">
            Preferred Languages
          </p>
          <div className="flex  gap-[180px] text-[16px]  text-black pt-[15px] pb-[19px] px-8">
            <span className="text-[16px]  text-black">Languages</span>
            <span className="text-[16px]  text-black">Kannada, English</span>
          </div>
        </div>
      </div>

      <div className=" w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
        <div className="w-full h-[72px] flex items-center bg-white px-8 rounded-t-[15px] border-b-2">
          <h1 className="text-[16px] font-semibold text-black">
            Service Required
          </h1>
        </div>
        <div className="flex gap-10 p-8">
          <div className="flex flex-col gap-[10px] text-[16px]  text-black">
            <span className="text-[16px]  text-black">Service Required</span>
            <span className="text-[16px]  text-black">Daily Schedule</span>
            <span className="text-[16px]  text-black">
              Service period (From)
            </span>
            <span className="text-[16px]  text-black">Service period (To)</span>
          </div>
          <div className="flex flex-col gap-[10px] text-[16px]  text-black">
            <span className="text-[16px]  text-black">Nursing Assistant</span>

            <span className="text-[16px]  text-black">24 hrs</span>

            <span className="text-[16px]  text-black">02 April 2025</span>
            <span className="text-[16px]  text-black">17 April 2025</span>
          </div>
        </div>
      </div>
      <div className=" w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
        <div className="w-full h-[72px] flex items-center bg-white px-8 rounded-t-[15px] border-b-2">
          <h1 className="text-[16px] font-semibold text-black">
            Service Required
          </h1>
        </div>
        <div className="flex gap-10 p-8">
          <div className="flex flex-col gap-[10px] text-[16px]  text-black">
            <span className="text-[16px]  text-black">Staff Preference</span>
          </div>
          <div className="flex flex-col gap-[10px] text-[16px]  text-black">
            <span className="text-[16px]  text-black">Male</span>
          </div>
        </div>
      </div>
      <div className=" w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
        <div className="w-full h-[72px] flex justify-between items-center bg-[#C0D8F6] px-8 rounded-t-[15px] border-b-2">
          <h1 className="text-[16px] font-semibold text-black">Referred By</h1>
          <h1 className="text-[16px] font-semibold text-black">08</h1>
        </div>
        <div className="flex gap-10 p-8">
          <div className="flex flex-col gap-[10px] text-[16px]  text-black ">
            <span className="text-[16px]  text-black">Agent Details</span>
          </div>
          <div className="flex flex-col gap-[10px] text-[16px]  text-black">
            <span className="text-[16px]  text-black">Madan Mohan</span>
            <span className="text-[16px]  text-black">
              Indiranagar, Bengaluru
            </span>

            <span className="text-[16px]  text-black">8089 258 569</span>
          </div>
        </div>
      </div>
      <div className=" w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB] mb-[200px]">
        <div className="w-full h-[72px] flex items-center bg-[#C0D8F6] px-8 rounded-t-[15px] border-b-2"></div>
        <div className="flex gap-8 px-[39px] py-[24px] ">
          <Link href={"/controlpanel/caseBooking/assignStaff"}>
            <button className="w-[192px] h-[40px] bg-[#3674B5] text-white flex justify-center items-center rounded-[15px] cursor-pointer">
              Assign Staff
            </button>
          </Link>
          <button className="w-[192px] h-[40px] bg-white text-black border flex justify-center items-center rounded-[15px]">
            Edit Service
          </button>
          <button className="w-[192px] h-[40px] bg-[#FFD1D9] text-black flex justify-center items-center rounded-[15px]">
            Cancel Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
