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
        href="/controlpanel/data-manager/general-data/languages/add-languages"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          isActive("/controlpanel/data-manager/general-data/languages/add-languages")||
          isActive("/controlpanel/data-manager/general-data/languages/manage-languages")
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Languages
      </Link>
      <Link
        href="/controlpanel/data-manager/general-data/states/add-states"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          isActive("/controlpanel/data-manager/general-data/states/add-states")||
          isActive("/controlpanel/data-manager/general-data/states/manage-states")

            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        States
      </Link>
       <Link
        href="/controlpanel/data-manager/general-data/districts/add-districts"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          isActive("/controlpanel/data-manager/general-data/districts/add-districts")||
          isActive("/controlpanel/data-manager/general-data/districts/manage-districts")

            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Districts
      </Link>
       <Link
        href="/controlpanel/data-manager/general-data/cities/add-cities"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          isActive("/controlpanel/data-manager/general-data/cities/add-cities")||
          isActive("/controlpanel/data-manager/general-data/cities/manage-cities")

            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Cities
      </Link>
    </div>
  );
};

export default Navlink;
