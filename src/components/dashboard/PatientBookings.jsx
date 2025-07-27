

"use client";
import React, { useEffect, useState } from "react";
import { GoArrowUp } from "react-icons/go";
import axios from "axios";

const PatientBookings = () => {
  const [data, setData] = useState({
    total: 0,
    confirmed: 0,
    cancelled: 0,
    ongoing: 0,
    completed: 0,
    growth: 0,
    month: "",
  });

 

  return (
    <div className=" bg-white py-10 rounded-2xl">
      {/* Header */}
      <div className="px-[71px] w-full flex justify-between border-b border-[#8888888c]">
        <div className="flex flex-col gap-5 text-[#333333] font-semibold">
          <p className="text-2xl">Patient Bookings</p>
          <p className="text-[32px]">{data.total}</p>
        </div>
        <div className="flex justify-center items-center flex-col">
          <div className="text-[#09B438] flex gap-1">
            <GoArrowUp className="size-9" />
            <p className="text-2xl pt-2">{data.growth}%</p>
          </div>
          <div className="text-[#333333] text-base font-semibold">
            <p>{data.month}</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="pt-6 flex justify-between text-base font-semibold px-[71px]">
        {[
          { label: "Confirmed", value: data.confirmed },
          { label: "Cancelled", value: data.cancelled },
          { label: "Ongoing", value: data.ongoing },
          { label: "Completed", value: data.completed },
        ].map((item, index) => (
          <div key={index} className="flex flex-col text-[#333333] gap-3.5">
            <p className="text-base">{item.label}</p>
            <p className="text-[32px]">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientBookings;
