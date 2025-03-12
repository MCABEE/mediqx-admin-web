"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = () => {
  const pathname = usePathname();

  return (
    <div className="w-full bg-white border border-[#888888] text-base text-black font-semibold flex gap-[72px] px-6 pt-6 rounded-[15px]">
      <Link
        href="/"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname === "/"
            ? "border-b-8 border-[#1982FE]"
            : "border-b-2 border-transparent"
        }`}
      >
        New Applications
      </Link>
      <Link
        href="/"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname === "/"
            ? "border-b-8 border-[#1982FE]"
            : "border-b-2 border-transparent"
        }`}
      >
        All Staff (Available)
      </Link>
      <Link
        href="/"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname === "/"
            ? "border-b-8 border-[#1982FE]"
            : "border-b-2 border-transparent"
        }`}
      >
        Availability Calendar
      </Link>
      <Link
        href="/"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname === "/"
            ? "border-b-8 border-[#1982FE]"
            : "border-b-2 border-transparent"
        }`}
      >
        Add New Staff
      </Link>
    </div>
  );
};

export default Navlink;
