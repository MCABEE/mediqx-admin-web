"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = () => {
  const pathname = usePathname();

  return (
    <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex gap-[50px] px-6 pt-6 rounded-[15px]">
      <Link
        href="/controlpanel/staffManagement/supervisor/supervisor-active"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname === "/controlpanel/staffManagement" ||
          pathname.includes(`/controlpanel/staffManagement/supervisor/supervisor-active`)
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Supervisor (Active)
      </Link>
      <Link
        href=""
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          
          pathname===("/")
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
       
        All Supervisor
      </Link>
      <Link
        href="/controlpanel/staffManagement/supervisor/supervisor-approval"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname === "/controlpanel/staffManagement/supervisor/supervisor-approval"
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        For Approvals
      </Link>
      <Link
        href="/controlpanel/staffManagement/supervisor/add-supervisor"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname === "/controlpanel/staffManagement/supervisor/add-supervisor"
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Add a supervisor
      </Link>
    </div>
  );
};

export default Navlink;
