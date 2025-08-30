"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = () => {
  const pathname = usePathname();

  const isActive = (path) => pathname.startsWith(path);

  return (
    <div className="w-full bg-white border border-[#888888] text-base text-black font-semibold flex gap-[25px] px-6 pt-6 rounded-[15px]">
      <Link
        href="/controlpanel/data-manager/professionals-data/reg-nurses/add-reg-nurses"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          isActive(
            "/controlpanel/data-manager/professionals-data/reg-nurses/add-reg-nurses"
          ) ||
          isActive(
            "/controlpanel/data-manager/professionals-data/reg-nurses/manage-reg-nurses"
          )
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Reg Nurses
      </Link>
      <Link
        href="/controlpanel/data-manager/professionals-data/nursing-assistants/add-nursing-assistants"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          isActive(
            "/controlpanel/data-manager/professionals-data/nursing-assistants/add-nursing-assistants"
          ) ||
          isActive(
            "/controlpanel/data-manager/professionals-data/nursing-assistants/manage-nursing-assistants"
          )
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Nursing Assistants
      </Link>
      <Link
        href="/controlpanel/data-manager/professionals-data/technicians/add-technicians"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          isActive(
            "/controlpanel/data-manager/professionals-data/technicians/add-technicians"
          ) ||
          isActive(
            "/controlpanel/data-manager/professionals-data/technicians/manage-technicians"
          )
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Technicians
      </Link>
      <Link
        href="/controlpanel/data-manager/professionals-data/therapy/add-therapy"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          isActive(
            "/controlpanel/data-manager/professionals-data/therapy/add-therapy"
          ) ||
          isActive(
            "/controlpanel/data-manager/professionals-data/therapy/manage-therapy"
          )
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Therapy
      </Link>
      <Link
        href="/controlpanel/data-manager/professionals-data/ancillary/add-ancillary"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          isActive(
            "/controlpanel/data-manager/professionals-data/ancillary/add-ancillary"
          ) ||
          isActive(
            "/controlpanel/data-manager/professionals-data/ancillary/manage-ancillary"
          )
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Ancillary
      </Link>
      <Link
        href="/controlpanel/data-manager/professionals-data/doctors/add-doctors"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          isActive(
            "/controlpanel/data-manager/professionals-data/doctors/add-doctors"
          ) ||
          isActive(
            "/controlpanel/data-manager/professionals-data/doctors/manage-doctors"
          )
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Doctors
      </Link>
    </div>
  );
};

export default Navlink;
