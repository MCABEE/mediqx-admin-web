"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = () => {
  const pathname = usePathname();

  return (
    <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex gap-[50px] px-6 pt-6 rounded-[15px]">
      <Link
        href="/controlpanel/staffManagement"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname === "/controlpanel/staffManagement" ||
          pathname.includes(`/controlpanel/staffManagement/staffDetails/`)
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        New Applications
      </Link>
      <Link
        href="/controlpanel/staffManagement/allStaff"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname === "/controlpanel/staffManagement/allStaff" ||
          pathname.includes("/controlpanel/staffManagement/allStaffDetails/")
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        {/* All Staff (Available) */}
        Confirmed Staff
      </Link>
      <Link
        href="/controlpanel/staffManagement/availabilityCalendar"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname === "/controlpanel/staffManagement/availabilityCalendar"
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Availability Calendar
      </Link>
      <Link
        href="/controlpanel/staffManagement/addNewStaff"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname === "/controlpanel/staffManagement/addNewStaff"
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Add New Staff
      </Link>
    </div>
  );
};

export default Navlink;
