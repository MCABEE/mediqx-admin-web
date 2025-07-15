"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = () => {
  const pathname = usePathname();

  return (
    <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex gap-[50px] px-6 pt-6 rounded-[15px]">
      <Link
        href="/controlpanel/patient-management/ongoing-patients"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname.startsWith("/controlpanel/patient-management/ongoing-patients") ||
          pathname.startsWith("/controlpanel/patient-management/ongoing-patients")
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Ongoing Patients 
      </Link>

      <Link
        href=""
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4`}
      >
        To Be Start
      </Link>

      <Link
        href=""
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 `}
      >
       Completed Cases
      </Link>

     
    </div>
  );
};

export default Navlink;
