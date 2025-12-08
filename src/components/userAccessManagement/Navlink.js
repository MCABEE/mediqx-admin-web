"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = () => {
  const pathname = usePathname();

  return (
    <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex gap-[50px] px-6 pt-6 rounded-[15px]">
      <Link
        href="/controlpanel/user-access-management/manage-co-admin"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
         
          pathname.includes(`/controlpanel/user-access-management/manage-co-admin`)
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Manage Co-Admin
      </Link>
      <Link
        href="/controlpanel/user-access-management/add-co-admin"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          
          pathname===("/controlpanel/user-access-management/add-co-admin")
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
       
        Add Co-Admin
      </Link>
   
    </div>
  );
};

export default Navlink;
