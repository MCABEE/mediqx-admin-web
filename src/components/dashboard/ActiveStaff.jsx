"use client";
import React from "react";

const ActiveStaff = ({ data }) => {
  if (!data) return null;

  const {
    total = 0,
    dutyOngoing = 0,
  } = data;

  return (
    <div className="bg-white pt-[29px] w-1/2 rounded-2xl">
      {/* Header */}
      <div className="px-[71px] w-full flex justify-between border-b border-[#8888888c]">
        <div className="flex flex-col gap-5 text-[#333333] font-semibold">
          <p className="text-base">Active Staff Strength</p>
          <p className="text-[32px]">{total}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-[71px] pt-6 flex gap-[94px] font-semibold">
        <div className="flex flex-col text-[#333333] gap-3.5">
          <p className="text-base">Duty Ongoing</p>
          <p className="text-[32px]">{dutyOngoing}</p>
        </div>
      </div>
    </div>
  );
};

export default ActiveStaff;
