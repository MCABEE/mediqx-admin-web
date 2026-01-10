"use client";

import PaymentStructureTable from "@/components/billing/paymentStructure/PaymentStructureTable";
import React from "react";

function Page() {


  return (
    <div>
      {/* Top Tabs */}
      {/* <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex gap-[40px] px-6 pt-6 rounded-[15px]">
        {[
          "Regd Nurse",
          "Assistant Nurse",
          "Technicians",
          "Therapy",
          "Ancillary Pros",
        ].map((tab, i) => (
          <p
            key={i}
            className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
              i === 0 ? "border-b-8 border-[#3674B5]" : ""
            }`}
          >
            {tab}
          </p>
        ))}
      </div> */}

   <PaymentStructureTable/>
 
    </div>
  );
}

export default Page;
