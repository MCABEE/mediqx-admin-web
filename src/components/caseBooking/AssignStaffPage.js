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

  // ✅ Extract patient details from URL params
  const bookingId = searchParams.get("bookingId");
  const fullName = searchParams.get("fullName");
  const from = searchParams.get("from");
  const service = searchParams.get("service");
  const schedule = searchParams.get("schedule");
  const gender = searchParams.get("gender");
  const language = searchParams.get("language"); // comma-separated string
  const location = searchParams.get("location");
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  const role = "NURSE";
  const durationValue = searchParams.get("durationValue");
  const durationType = searchParams.get("durationType");
  const frequency = searchParams.get("frequency"); // string or array
  const scheduleType = searchParams.get("scheduleType");
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");

  const [radius, setRadius] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Zustand store hooks
  const { assignNurse } = useBookingStore();
  const { users, fetchAssignableNurses, isLoading } = useNurseStore();



  const formatTime = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    const hours = date.getUTCHours(); // Use UTC hours
    const minutes = date.getUTCMinutes(); // Use UTC minutes
    const paddedHours = hours.toString().padStart(2, "0");
    const paddedMinutes = minutes.toString().padStart(2, "0");
    return `${paddedHours}:${paddedMinutes}`;
  };


  const buildParams = (override = {}) => {
    const baseParams = {
      page: currentPage,
      limit: 50,
      role,
      gender,
      // languages: language ? language.split(",").map((l) => l.trim()) : [],
      date: from,
      radius,
      centerLatitude: Number(latitude),
      centerLongitude: Number(longitude),
      durationType,
      durationValue,
      frequency: frequency
        ? Array.isArray(frequency)
          ? frequency
          : frequency.split(",").map((f) => f.trim())
        : [],
      scheduleType,
      ...override,
    };

    // ⏳ Only include start/end time for CUSTOM_HOURS
    if (scheduleType === "CUSTOM_HOURS") {
      baseParams.startTime = formatTime(startTime);
      baseParams.endTime = formatTime(endTime);
    }

    return baseParams;
  };

  // ✅ Fetch nurses when params change
  useEffect(() => {
    if (!from || !latitude || !longitude) {
      console.warn("⛔ Missing required query params for API call");
      return;
    }
    const params = buildParams();
    console.log("📤 Sending params from useEffect to store:", params);
    fetchAssignableNurses(params);
  }, [
    from,
    latitude,
    longitude,
    currentPage,
    fetchAssignableNurses,
    radius,
    role,
    gender,
    // language,
    durationType,
    durationValue,
    frequency,
    scheduleType,
    startTime,
    endTime,
  ]);

  // ✅ Assign nurse handler
  const handleAssign = async (userId) => {
    try {
      await assignNurse(bookingId, userId);
      router.push("/controlpanel/caseBooking/confirmedBooking");
    } catch (error) {
      console.error("❌ Failed to assign nurse:", error);
    }
  };

  // ✅ Radius change handler
  const handleApplyRadius = (value) => {
    setRadius(value);
    const params = buildParams({ radius: value });
    console.log("📤 Sending params from handleApplyRadius to store:", params);
    fetchAssignableNurses(params);
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
        nurses={users}
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
        onApplyRadius={handleApplyRadius}
      />
    </div>
  );
};

export default AssignStaffPage;
