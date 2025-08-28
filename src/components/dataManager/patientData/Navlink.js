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
        href="/controlpanel/data-manager/patient-data/services/add-services"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          isActive("/controlpanel/data-manager/patient-data/services/add-services")||
          isActive("/controlpanel/data-manager/patient-data/services/manage-services")
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Services
      </Link>
      <Link
        href="/controlpanel/data-manager/patient-data/health-status/add-health-status"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          isActive("/controlpanel/data-manager/patient-data/health-status/add-health-status")||
          isActive("/controlpanel/data-manager/patient-data/health-status/manage-health-status")
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Health Status
      </Link>
      <Link
        href="/controlpanel/data-manager/patient-data/diagnosis/add-diagnosis"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          isActive("/controlpanel/data-manager/patient-data/diagnosis/add-diagnosis")||
          isActive("/controlpanel/data-manager/patient-data/diagnosis/manage-diagnosis")
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Diagnosis
      </Link>
    </div>
  );
};

export default Navlink;
