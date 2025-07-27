"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import useBookingStore from "@/app/lib/store/bookingStore";
import useNurseStore from "@/app/lib/store/nurseStore";

import AssignStaffTable from "./AssignStaffTable";
import Navlink from "./NavLink";
import LocationMap from "./LocationMap";

const AssignStaffPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Get patient details from URL params
  const bookingId = searchParams.get("bookingId");
  const fullName = searchParams.get("fullName");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const service = searchParams.get("service");
  const schedule = searchParams.get("schedule");
  const gender = searchParams.get("gender");
  const language = searchParams.get("language");
  const location = searchParams.get("location");
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");

  const [radius, setRadius] = useState(10); // default radius
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Zustand stores
  const { assignNurse } = useBookingStore();
  const { users, fetchAssignableNurses, isLoading } = useNurseStore();

  // ✅ Fetch data initially when page or params change
  useEffect(() => {
    const params = {
      page: currentPage,
      limit: 50,
      from,
      to,
      radius,
      centerLatitude: latitude,
      centerLongitude: longitude,
    };
    fetchAssignableNurses(params);
  }, [
    from,
    to,
    latitude,
    longitude,
    currentPage,
    fetchAssignableNurses,
    radius,
  ]);

  // ✅ Assign nurse
  const handleAssign = async (userId) => {
    try {
      await assignNurse(bookingId, userId);
      router.push("/controlpanel/caseBooking/confirmedBooking");
    } catch (error) {
      console.error("Failed to assign nurse.");
    }
  };

  // ✅ Called when user selects a radius
  const handleApplyRadius = (value) => {
    setRadius(value); // Update state for UI
    const params = {
      page: currentPage,
      limit: 50,
      from,
      to,
      radius: value, // Use clicked value
      centerLatitude: latitude,
      centerLongitude: longitude,
    };
    fetchAssignableNurses(params); // Fetch API immediately
  };

  return (
    <div>
      <Navlink />

      {/* Header */}
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

      {/* Patient Details */}
      <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
        <div className="h-[72px] flex items-center px-8 border-b-2">
          <h1 className="text-[16px] font-semibold text-black">
            Patient Details
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-y-[10px] p-8 text-[16px] text-black">
          <span className="font-medium">Service Period (From)</span>
          <span>{from?.split("T")[0]}</span>

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

      {/* Map */}
      <LocationMap
        latitude={latitude}
        longitude={longitude}
        fullName={fullName}
        nurses={users} // updates when API refetches
      />

      {/* Table */}
      <AssignStaffTable
        nurses={users}
        isLoading={isLoading}
        onSelectNurse={handleAssign}
        radius={radius}
        setRadius={setRadius}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onApplyRadius={handleApplyRadius} // Pass correct handler
      />
    </div>
  );
};

export default AssignStaffPage;
