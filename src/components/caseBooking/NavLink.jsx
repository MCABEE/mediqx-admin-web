"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = () => {
  const pathname = usePathname();

  return (
    <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex gap-[50px] px-6 pt-6 rounded-[15px]">
      {/* New Bookings */}
      <Link
        href="/controlpanel/caseBooking/newBooking"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname.startsWith("/controlpanel/caseBooking/newBooking") ||
          pathname.startsWith("/controlpanel/caseBooking/bookingDetails")
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        New Bookings
      </Link>

      {/* Create a Booking */}
      <Link
        href="/controlpanel/caseBooking/createBooking"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname === "/controlpanel/caseBooking/createBooking"
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Create a Booking
      </Link>

      {/* Confirmed Bookings */}
      <Link
        href="/controlpanel/caseBooking/confirmedBooking"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname.startsWith("/controlpanel/caseBooking/confirmedBooking") ||
          pathname.startsWith(
            "/controlpanel/caseBooking/confirmedBookingDetails"
          ) ||
          pathname.startsWith("/controlpanel/caseBooking/assignStaff") ||
          pathname.startsWith("/controlpanel/caseBooking/availabilityCalender")
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Confirmed Bookings
      </Link>

      {/* Cancelled Cases */}
      <Link
        href="/controlpanel/caseBooking/cancelledCase"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          pathname.startsWith("/controlpanel/caseBooking/cancelledCase")||
          pathname.startsWith(
            "/controlpanel/caseBooking/cancelled-case-details"
          ) 
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Cancelled Cases
      </Link>
    </div>
  );
};

export default Navlink;
