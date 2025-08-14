import React from "react";

function ServiceDetails({ booking, formatDate, formatTime }) {
  if (!booking) return null;

  return (
    <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
      <div className="w-full h-[72px] flex items-center bg-white px-8 rounded-t-[15px] border-b-2">
        <h1 className="text-[16px] font-semibold text-black">
          Service Required
        </h1>
      </div>

      <div className="flex flex-col gap-[10px] p-8 text-[16px] text-black">
        <div className="flex">
          <span className="w-[200px] font-medium">Diagnosis</span>
          <span>{booking.diagnosis}</span>
        </div>

        <div className="flex">
          <span className="w-[200px] font-medium">Service Period from</span>
          <span>{formatDate(booking.startDate)}</span>
        </div>

        <div className="flex">
          <span className="w-[200px] font-medium">Service Type</span>
          <span>{booking.serviceType}</span>
        </div>

        <div className="flex">
          <span className="w-[200px] font-medium">Duration</span>
          <span>
            {booking.durationType} ({booking.durationValue} weeks)
          </span>
        </div>

        <div className="flex">
          <span className="w-[200px] font-medium">Frequency</span>
          <span>{booking.weekdays?.join(", ")}</span>
        </div>

        <div className="flex">
          <span className="w-[200px] font-medium">Flexibility</span>
          <span>{booking.flexibility}</span>
        </div>

        <div className="flex">
          <span className="w-[200px] font-medium">Time</span>
          <span>{formatTime(booking.startTime)}</span>
          &nbsp;-&nbsp;
          <span>{formatTime(booking.endTime)}</span>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
