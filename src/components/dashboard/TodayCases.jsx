"use client";
import React from "react";

const TodayCases = ({ data }) => {
  if (!data) return null;

  const {
    toStart = 0,
    ongoing = 0,
    new: newCases = 0,
  } = data;

  return (
    <div className="bg-white py-7 rounded-2xl">
      {/* Header */}
      <div className="w-full flex justify-between border-b border-[#8888888c]">
        <p className="px-[71px] text-2xl text-[#333333] font-semibold pb-4">
          Today’s Cases
        </p>
      </div>

      {/* Stats */}
      <div className="px-[71px] pt-6 flex gap-[94px] font-semibold">
        <div className="flex flex-col text-[#333333] gap-3.5">
          <p className="text-base">To Start</p>
          <p className="text-[32px]">{toStart}</p>
        </div>

        <div className="flex flex-col text-[#333333] gap-3.5">
          <p className="text-base">Ongoing</p>
          <p className="text-[32px]">{ongoing}</p>
        </div>

        <div className="flex flex-col text-[#333333] gap-3.5">
          <p className="text-base">New</p>
          <p className="text-[32px]">{newCases}</p>
        </div>
      </div>
    </div>
  );
};

export default TodayCases;
