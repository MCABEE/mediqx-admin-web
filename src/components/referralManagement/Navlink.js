"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = () => {
  const pathname = usePathname();

  const isActive = (path) => pathname.startsWith(path); // Check if pathname starts with the given path

  return (
    <div className="w-full bg-white border border-[#888888] text-base text-black font-semibold flex gap-[72px] px-6 pt-6 rounded-[15px]">
     
      {/* <Link
        href="/controlpanel/referral-management/all-referrals"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          (isActive("/controlpanel/referral-management/all-referrals")||
          isActive("/controlpanel/referral-management/all-patient-referrals"))
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        All Referrals
      </Link> */}
            <Link
        href="/controlpanel/referral-management/staff-referrals"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          (isActive("/controlpanel/referral-management/staff-referrals")
          
        )
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
       Staff Referrals
      </Link>

             <Link
        href="/controlpanel/referral-management/patient-referrals"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          (isActive("/controlpanel/referral-management/patient-referrals")
          
        )
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
       Patient Referrals
      </Link>
      {/* <Link
        href="/controlpanel/referral-management/payment-structure"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          isActive("/controlpanel/referral-management/payment-structure")
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Payment Structure
      </Link> */}
    </div>
  );
};

export default Navlink;
