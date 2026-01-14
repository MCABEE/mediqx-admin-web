"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = () => {
  const pathname = usePathname();

  return (
    <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex gap-[50px] px-6 pt-6 rounded-[15px]">
      <Link
        href="/controlpanel/ledger-management/bookings"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname === "/controlpanel/ledger-management/bookings"
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Bookings
      </Link>
      <Link
        href="/controlpanel/ledger-management/billings"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname === "/controlpanel/ledger-management/billings"
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
        >
        Billings
      </Link>
      {/* <Link
        href="/controlpanel/ledger-management/medical-notes"
       
         className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname === "/controlpanel/ledger-management/medical-notes" ||
          pathname.includes("/controlpanel/ledger-management/medical-notes")
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}

      >
       Medical Notes
      </Link> */}
       <Link
        href="/controlpanel/ledger-management/staff-payments"
       
         className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname === "/controlpanel/ledger-management/staff-payments" ||
          pathname.includes("/controlpanel/ledger-management/staff-payments")
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}

      >
       Staff & payments
      </Link>
       <Link
        href="/controlpanel/ledger-management/products"
       
         className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname === "/controlpanel/ledger-management/products" ||
          pathname.includes("/controlpanel/ledger-management/products")
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}

      >
       Products
      </Link>
    
    </div>
  );
};

export default Navlink;
