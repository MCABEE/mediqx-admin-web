// "use client";

// import React, { useState, useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import useBookingStore from "@/app/lib/store/bookingStore";
// import useNurseStore from "@/app/lib/store/nurseStore";
// import AssignStaffTable from "./AssignStaffTable";
// import Navlink from "./NavLink";
// import LocationMap from "./LocationMap";

// const AssignStaffPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // ✅ Extract patient details from URL params
//   const bookingId = searchParams.get("bookingId");
//   const fullName = searchParams.get("fullName");
//   const from = searchParams.get("from");
//   const service = searchParams.get("service");
//   const schedule = searchParams.get("schedule");
//   const gender = searchParams.get("gender");
//   const language = searchParams.get("language"); // comma-separated string
//   const location = searchParams.get("location");
//   const latitude = searchParams.get("latitude");
//   const longitude = searchParams.get("longitude");
//   const role = "NURSE";
//   const durationValue = searchParams.get("durationValue");
//   const durationType = searchParams.get("durationType");
//   const frequency = searchParams.get("frequency"); // string or array
//   const scheduleType = searchParams.get("scheduleType");
//   const startTime = searchParams.get("startTime");
//   const endTime = searchParams.get("endTime");

//   const [radius, setRadius] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   // ✅ Zustand store hooks
//   const { assignNurse } = useBookingStore();
//   const { users, fetchAssignableNurses, isLoading } = useNurseStore();




//   const formatTime = (isoString) => {
//     if (!isoString) return "-";
//     const date = new Date(isoString);
//     const hours = date.getUTCHours(); // Use UTC hours
//     const minutes = date.getUTCMinutes(); // Use UTC minutes
//     const paddedHours = hours.toString().padStart(2, "0");
//     const paddedMinutes = minutes.toString().padStart(2, "0");
//     return `${paddedHours}:${paddedMinutes}`;
//   };


//   // const buildParams = (override = {}) => {
//   //   const baseParams = {
//   //     page: currentPage,
//   //     limit: 50,
//   //     role,
//   //     gender,
//   //     // languages: language ? language.split(",").map((l) => l.trim()) : [],
//   //     date: from,
//   //     radius,
//   //     centerLatitude: Number(latitude),
//   //     centerLongitude: Number(longitude),
//   //     durationType,
//   //     durationValue,
//   //     frequency: frequency
//   //       ? Array.isArray(frequency)
//   //         ? frequency
//   //         : frequency.split(",").map((f) => f.trim())
//   //       : [],
//   //     scheduleType,
//   //     ...override,
//   //   };

//   //   // ⏳ Only include start/end time for CUSTOM_HOURS
//   //   if (scheduleType === "CUSTOM_HOURS") {
//   //     baseParams.startTime = formatTime(startTime);
//   //     baseParams.endTime = formatTime(endTime);
//   //   }

//   //   return baseParams;
//   // };

//   // ✅ Fetch nurses when params change
  

// const buildParams = (override = {}) => {
//   let parsedFrequency = [];
//   if (frequency) {
//     if (Array.isArray(frequency)) {
//       parsedFrequency = frequency;
//     } else {
//       parsedFrequency = frequency.split(",").map((f) => f.trim());
//     }
//   }

//   // ⚡ If only one frequency, send as string
//   const formattedFrequency =
//     parsedFrequency.length === 1 ? parsedFrequency[0] : parsedFrequency;

//   const baseParams = {
//     page: currentPage,
//     limit: 50,
//     role,
//     gender,
//     date: from,
//     radius,
//     centerLatitude: Number(latitude),
//     centerLongitude: Number(longitude),
//     durationType,
//     durationValue,
//     frequency: formattedFrequency, // 👈 Final value here
//     scheduleType,
//     ...override,
//   };

//   if (scheduleType === "CUSTOM_HOURS") {
//     baseParams.startTime = formatTime(startTime);
//     baseParams.endTime = formatTime(endTime);
//   }

//   return baseParams;
// };




//   useEffect(() => {
//     if (!from || !latitude || !longitude) {
//       console.warn("⛔ Missing required query params for API call");
//       return;
//     }
//     const params = buildParams();
//     console.log("📤 Sending params from useEffect to store:", params);
//     fetchAssignableNurses(params);
//   }, [
//     from,
//     latitude,
//     longitude,
//     currentPage,
//     fetchAssignableNurses,
//     radius,
//     role,
//     gender,
//     // language,
//     durationType,
//     durationValue,
//     frequency,
//     scheduleType,
//     startTime,
//     endTime,
//   ]);

//   // ✅ Assign nurse handler
//   const handleAssign = async (userId) => {
//     try {
//       await assignNurse(bookingId, userId);
//       router.push("/controlpanel/caseBooking/confirmedBooking");
//     } catch (error) {
//       console.error("❌ Failed to assign nurse:", error);
//     }
//   };

//   // ✅ Radius change handler
//   const handleApplyRadius = (value) => {
//     setRadius(value);
//     const params = buildParams({ radius: value });
//     console.log("📤 Sending params from handleApplyRadius to store:", params);
//     fetchAssignableNurses(params);
//   };

//   return (
//     <div>
//       <Navlink />

//       {/* Header */}
//       <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex">
//         <div className="text-[16px] text-black border-r-2 border-[#F0F4F9] flex justify-center items-center px-[38px]">
//           <button onClick={() => router.back()} className="cursor-pointer">
//             Back
//           </button>
//         </div>
//         <div className="w-full flex text-[16px] text-black justify-between items-center ps-[19px] pe-[73px]">
//           <p className="font-semibold">{fullName}</p>
//         </div>
//       </div>

//       {/* Patient Details */}
//       <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
//         <div className="h-[72px] flex items-center px-8 border-b-2">
//           <h1 className="text-[16px] font-semibold text-black">
//             Patient Details
//           </h1>
//         </div>
//         <div className="grid grid-cols-2 gap-y-[10px] p-8 text-[16px] text-black">
//           <span className="font-medium">Service Period (From)</span>
//           <span>{from?.split("T")[0]}</span>

//           <span className="font-medium">Service Required</span>
//           <span>{service}</span>

//           <span className="font-medium">Daily Schedule</span>
//           <span>{schedule}</span>

//           <span className="font-medium">Staff Preference</span>
//           <span>{gender}</span>

//           <span className="font-medium">Language</span>
//           <span>{language}</span>

//           <span className="font-medium">Location</span>
//           <span>{location}</span>
//         </div>
//       </div>

//       {/* Map */}
//       <LocationMap
//         latitude={latitude}
//         longitude={longitude}
//         fullName={fullName}
//         nurses={users}
//       />

//       {/* Table */}
//       <AssignStaffTable
//         nurses={users}
//         isLoading={isLoading}
//         onSelectNurse={handleAssign}
//         radius={radius}
//         setRadius={setRadius}
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//         onApplyRadius={handleApplyRadius}
//       />
//     </div>
//   );
// };

// export default AssignStaffPage;










// "use client";

// import React, { useState, useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import useBookingStore from "@/app/lib/store/bookingStore";
// import useNurseStore from "@/app/lib/store/nurseStore";
// import AssignStaffTable from "./AssignStaffTable";
// import Navlink from "./NavLink";
// import LocationMap from "./LocationMap";

// const AssignStaffPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // ✅ Extract patient details from URL params
//   const bookingId = searchParams.get("bookingId");
//   const fullName = searchParams.get("fullName");
//   const from = searchParams.get("from");
//   const service = searchParams.get("service");
//   const schedule = searchParams.get("schedule");
//   const gender = searchParams.get("gender");
//   const languageParams = searchParams.getAll("language"); // ✅ multiple languages
//   const location = searchParams.get("location");
//   const latitude = searchParams.get("latitude");
//   const longitude = searchParams.get("longitude");
//   const role = "NURSE";
//   const durationValue = searchParams.get("durationValue");
//   const durationType = searchParams.get("durationType");
//   const frequencyParams = searchParams.getAll("frequency"); // ✅ multiple frequencies
//   const scheduleType = searchParams.get("scheduleType");
//   const startTime = searchParams.get("startTime");
//   const endTime = searchParams.get("endTime");

//   const [radius, setRadius] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   // ✅ Zustand store hooks
//   const { assignNurse } = useBookingStore();
//   const { users, fetchAssignableNurses, isLoading } = useNurseStore();

//   // ✅ Format time helper
//   const formatTime = (isoString) => {
//     if (!isoString) return "-";
//     const date = new Date(isoString);
//     const hours = date.getUTCHours();
//     const minutes = date.getUTCMinutes();
//     return `${hours.toString().padStart(2, "0")}:${minutes
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   // ✅ Build params as object (let Axios serialize)
//   const buildParams = (override = {}) => {
//     const baseParams = {
//       page: currentPage,
//       limit: 50,
//       role,
//       gender,
//       date: from,
//       radius,
//       centerLatitude: Number(latitude),
//       centerLongitude: Number(longitude),
//       durationType,
//       durationValue,
//       frequency: frequencyParams, // ✅ array → will serialize as freq=A&freq=B
//       language: languageParams, // ✅ array
//       scheduleType,
//       ...override,
//     };

//     // Only include start/end time if CUSTOM_HOURS
//     if (scheduleType === "CUSTOM_HOURS") {
//       baseParams.startTime = formatTime(startTime);
//       baseParams.endTime = formatTime(endTime);
//     }

//     return baseParams;
//   };

//   // ✅ Fetch nurses when params change
//   useEffect(() => {
//     if (!from || !latitude || !longitude) {
//       console.warn("⛔ Missing required query params for API call");
//       return;
//     }

//     const params = buildParams();
//     console.log("📤 Sending params from useEffect:", params);

//     // Pass as object, store/axios will handle serialization
//     fetchAssignableNurses(params);
//   }, [
//     from,
//     latitude,
//     longitude,
//     currentPage,
//     fetchAssignableNurses,
//     radius,
//     role,
//     gender,
//     durationType,
//     durationValue,
//     frequencyParams,
//     languageParams,
//     scheduleType,
//     startTime,
//     endTime,
//   ]);

//   // ✅ Assign nurse handler
//   const handleAssign = async (userId) => {
//     try {
//       await assignNurse(bookingId, userId, {
//         frequency: frequencyParams, // ✅ include frequency in payload if needed
//         languages: languageParams,
//       });
//       router.push("/controlpanel/caseBooking/confirmedBooking");
//     } catch (error) {
//       console.error("❌ Failed to assign nurse:", error);
//     }
//   };

//   // ✅ Radius change handler
//   const handleApplyRadius = (value) => {
//     setRadius(value);
//     const params = buildParams({ radius: value });
//     console.log("📤 Sending params from handleApplyRadius:", params);

//     fetchAssignableNurses(params);
//   };

//   return (
//     <div>
//       <Navlink />

//       {/* Header */}
//       <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex">
//         <div className="text-[16px] text-black border-r-2 border-[#F0F4F9] flex justify-center items-center px-[38px]">
//           <button onClick={() => router.back()} className="cursor-pointer">
//             Back
//           </button>
//         </div>
//         <div className="w-full flex text-[16px] text-black justify-between items-center ps-[19px] pe-[73px]">
//           <p className="font-semibold">{fullName}</p>
//         </div>
//       </div>

//       {/* Patient Details */}
//       <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
//         <div className="h-[72px] flex items-center px-8 border-b-2">
//           <h1 className="text-[16px] font-semibold text-black">
//             Patient Details
//           </h1>
//         </div>
//         <div className="grid grid-cols-2 gap-y-[10px] p-8 text-[16px] text-black">
//           <span className="font-medium">Service Period (From)</span>
//           <span>{from?.split("T")[0]}</span>

//           <span className="font-medium">Service Required</span>
//           <span>{service}</span>

//           <span className="font-medium">Daily Schedule</span>
//           <span>{schedule}</span>

//           <span className="font-medium">Staff Preference</span>
//           <span>{gender}</span>

//           <span className="font-medium">Language</span>
//           <span>{languageParams.join(", ")}</span>

//           <span className="font-medium">Location</span>
//           <span>{location}</span>
//         </div>
//       </div>

//       {/* Map */}
//       <LocationMap
//         latitude={latitude}
//         longitude={longitude}
//         fullName={fullName}
//         nurses={users}
//       />

//       {/* Table */}
//       <AssignStaffTable
//         nurses={users}
//         isLoading={isLoading}
//         onSelectNurse={handleAssign}
//         radius={radius}
//         setRadius={setRadius}
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//         onApplyRadius={handleApplyRadius}
//       />
//     </div>
//   );
// };

// export default AssignStaffPage;






"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  const frequencyRaw = searchParams.getAll("frequency"); // array or []
  const languageRaw = searchParams.getAll("language");   // array or []
  const location = searchParams.get("location");
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  const role = "";
  const durationValue = searchParams.get("durationValue");
  const durationType = searchParams.get("durationType");
  const scheduleType = searchParams.get("scheduleType");
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");

  // Memoize frequency and language to stabilize dependencies
  const frequencyParams = useMemo(() => frequencyRaw, [frequencyRaw.join(",")]);
  const languageParams = useMemo(() => languageRaw, [languageRaw.join(",")]);

  const [radius, setRadius] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Zustand store hooks
  const { assignNurse } = useBookingStore();
  const { users, fetchAssignableNurses, isLoading } = useNurseStore();

  // Format time helper
  const formatTime = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  // Build params object for API call
  const buildParams = (override = {}) => {
    const baseParams = {
      page: currentPage,
      limit: 50,
      role,
      gender,
      date: from,
      radius,
      centerLatitude: Number(latitude),
      centerLongitude: Number(longitude),
      durationType,
      durationValue,
      frequency: frequencyParams,
      language: languageParams,
      scheduleType,
      ...override,
    };

    if (scheduleType === "CUSTOM_HOURS") {
      baseParams.startTime = formatTime(startTime);
      baseParams.endTime = formatTime(endTime);
    }

    return baseParams;
  };

  // Fetch nurses when dependencies change
  useEffect(() => {
    if (!from || !latitude || !longitude) {
      console.warn("⛔ Missing required query params for API call");
      return;
    }

    const params = buildParams();
    fetchAssignableNurses(params);
  }, [
    from,
    latitude,
    longitude,
    currentPage,
    radius,
    role,
    gender,
    durationType,
    durationValue,
    scheduleType,
    startTime,
    endTime,
    // Depend on stable frequency and language memos
    frequencyParams,
    languageParams,
    fetchAssignableNurses, // assuming stable or defined by store
  ]);

  // Handle nurse assignment
  const handleAssign = async (userId) => {
    try {
      await assignNurse(bookingId, userId, {
        frequency: frequencyParams,
        languages: languageParams,
      });
      router.push("/controlpanel/caseBooking/confirmedBooking");
    } catch (error) {
      console.error("❌ Failed to assign nurse:", error);
    }
  };

  // Handle radius change
  const handleApplyRadius = (value) => {
    setRadius(value);
    const params = buildParams({ radius: value });
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
          <h1 className="text-[16px] font-semibold text-black">Patient Details</h1>
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
          <span>{languageParams.join(", ")}</span>

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
