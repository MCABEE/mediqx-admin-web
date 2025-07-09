"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";

import useBookingStore from "@/app/lib/store/bookingStore";
import AssignStaffTable from "./AssignStaffTable";
import Navlink from "./NavLink";

const AssignStaffPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const bookingId = searchParams.get("bookingId");
  const fullName = searchParams.get("fullName");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const service = searchParams.get("service");
  const schedule = searchParams.get("schedule");
  const gender = searchParams.get("gender");
  const language = searchParams.get("language");
  const location = searchParams.get("location");

  const { assignNurse } = useBookingStore();

  const handleAssign = async (userId) => {
    try {
      await assignNurse(bookingId, userId);
    } catch (error) {
      console.error("Failed to assign nurse.");
    }
  };

  return (
    <div>
      <Navlink/>
      <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex">
        <div className="text-[16px] text-black border-r-2 border-[#F0F4F9] flex justify-center items-center px-[38px]">
          <button onClick={() => router.back()} className="cursor-pointer">
            Back
          </button>
        </div>
        <div className="w-full flex text-[16px] text-black justify-between items-center ps-[19px] pe-[73px]">
          <p className="font-semibold">{fullName}</p>
        </div>
      </div>

      <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
        <div className="h-[72px] flex items-center px-8 border-b-2">
          <h1 className="text-[16px] font-semibold text-black">Patient Details</h1>
        </div>
        <div className="grid grid-cols-2 gap-y-[10px] p-8 text-[16px] text-black">
          <span className="font-medium">Service Period (From)</span>
          <span>{from?.split("T")[0]}</span>
          {/* <span className="font-medium">Service Period (To)</span>
          <span>{to}</span> */}
          <span className="font-medium">Service Required</span>
          <span>{service}</span>
          <span className="font-medium">Daily Schedule</span>
          <span>{schedule}</span>
          <span className="font-medium">Staff Preference</span>
          <span>{gender}</span>
          <span className="font-medium">Language</span>
          <span>{language}</span>
          <span className="font-medium">Location</span>
          <span>{location}</span>
        </div>
      </div>

      <AssignStaffTable bookingId={bookingId} onSelectNurse={handleAssign} />
    </div>
  );
};

export default AssignStaffPage;
