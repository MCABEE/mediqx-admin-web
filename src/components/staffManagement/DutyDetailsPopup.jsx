"use client";

import { FiX } from "react-icons/fi";

export default function DutyDetailsPopup({ duty, onClose }) {
  if (!duty) return null;

  const {
    date,
    dutyStatus,
    dutyScheduleType,
    dutyStartTime,
    dutyEndTime,
  } = duty;

  const formatTime = (time) => {
    if (!time) return "-";
    const [h, m] = time.split(":");
    const hour = Number(h);
    const suffix = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${m} ${suffix}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[92%] sm:w-[520px] bg-white rounded-2xl overflow-hidden shadow-xl">
        {/* Header */}
        <div className="relative bg-[#FE1940] py-5">
          <h2 className="text-center text-white text-lg font-semibold">
            On Duty
          </h2>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-md p-1.5"
          >
            <FiX size={16} className="text-[#FF2D3D]" />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-10 text-center">
          <p className="text-gray-800 font-medium mb-10">
            This staff is currently{" "}
            <span className="font-semibold">On Duty</span>
          </p>

          <div className="flex flex-col gap-6 max-w-sm mx-auto text-left">
            {/* Date */}
            <Row
              label="Date"
              value={new Date(date).toLocaleDateString()}
            />

            {/* Duty Status */}
            <Row label="Duty Status" value={dutyStatus} />

            {/* Schedule */}
            <Row
              label="Duty Schedule"
              value={
                dutyScheduleType === "CUSTOM_HOURS"
                  ? "Custom Hours"
                  : dutyScheduleType.replaceAll("_", " ")
              }
            />

            {/* Time */}
            <Row
              label="Start Time"
              value={formatTime(dutyStartTime)}
            />

            <Row
              label="End Time"
              value={formatTime(dutyEndTime)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-700 font-medium">{label}</span>
      <span className="text-gray-900 font-semibold">{value}</span>
    </div>
  );
}
