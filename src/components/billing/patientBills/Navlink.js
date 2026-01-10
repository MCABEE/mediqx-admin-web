"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = () => {
  const pathname = usePathname();

  const isActive = (path) => pathname.startsWith(path); // Check if pathname starts with the given path

  return (
    <div className="w-full bg-white border border-[#888888] text-base text-black font-semibold flex gap-[72px] px-6 pt-6 rounded-[15px]">
     
      <Link
        href="/controlpanel/billing/patient-bills/by-dates"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          isActive("/controlpanel/billing/patient-bills/by-dates")||
          isActive("/controlpanel/data-manager/general-data/languages/manage-languages")
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        By Dates
      </Link>
       <Link
        href="/controlpanel/billing/patient-bills/by-patients"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          isActive("/controlpanel/billing/patient-bills/by-patients")||
          isActive("/controlpanel/data-manager/general-data/languages/manage-languages")
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        By Patients
      </Link>
      
    </div>
  );
};

export default Navlink;
