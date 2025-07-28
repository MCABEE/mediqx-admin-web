"use client";
import React from "react";

export default function Navlink({ tabs, selectedStatus, onStatusChange }) {
  const getTabClass = (status) =>
    selectedStatus === status
      ? "border-b-8 border-[#3674B5]"
      : "border-b-2 border-transparent";

  return (
    <div className="flex gap-[48px] pt-[23px]">
      {tabs?.map((tab) => (
        <p
          key={tab.value}
          onClick={() => onStatusChange(tab.value)}
          className={`cursor-pointer pb-4 ${getTabClass(tab.value)}`}
        >
          {tab.label}
        </p>
      ))}
    </div>
  );
}
