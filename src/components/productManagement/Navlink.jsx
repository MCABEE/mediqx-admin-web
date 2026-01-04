"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = () => {
  const pathname = usePathname();

  return (
    <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex gap-[50px] px-6 pt-6 rounded-[15px]">
      <Link
        href="/controlpanel/product-management/manage-products"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname === "/controlpanel/product-management/manage-products"
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Manage Product
      </Link>
      <Link
        href="/controlpanel/product-management/add-products"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname === "/controlpanel/product-management/add-products"
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
        >
        {/* All Staff (Available) */}
        Add Product
      </Link>
      <Link
        href="/controlpanel/product-management/bookings"
       
         className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname === "/controlpanel/product-management/bookings" ||
          pathname.includes("/controlpanel/product-management/bookings-details")
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}

      >
       Bookings
      </Link>
    
    </div>
  );
};

export default Navlink;
