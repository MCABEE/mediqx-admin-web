import React from "react";

const daysOfWeek = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const formatTime = (timeStr) => {
  if (!timeStr) return "";
  const [hours, minutes] = timeStr.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour.toString().padStart(2, "0")}:${minutes} ${ampm}`;
};

const AvailabilitySchedule = ({ availabilities }) => {
  return (
    <div>
      <h1 className="text-[16px] font-semibold text-black mt-4 pb-[18px]">
        Available Time Schedule
      </h1>
      <div className="flex gap-x-[12px]">
        {/* Day labels */}
        <div className="flex flex-col text-[16px] text-black font-light gap-[18px]">
          {daysOfWeek.map((day) => (
            <span key={day}>{day.charAt(0) + day.slice(1).toLowerCase()}</span>
          ))}
        </div>

        {/* Availability status */}
        <div className="flex flex-col text-[16px] text-black font-light gap-[18px]">
          {daysOfWeek.map((day) => {
            const availability = availabilities.find((a) => a.weekday === day);
            const isAvailable = availability?.isAvailable;
            return (
              <span key={day} className="flex gap-4 items-center">
                <img
                  src={
                    isAvailable
                      ? "/available-btn.svg"
                      : "/not-available-btn.svg"
                  }
                  alt=""
                />
                <span
                  className={isAvailable ? "text-[#09B438]" : "text-[#FE1940]"}
                >
                  {isAvailable ? "Available" : "NA"}
                </span>
              </span>
            );
          })}
        </div>

        {/* Slot One Start */}
        <div className="flex flex-col text-[16px] text-black font-light gap-[18px] ps-8">
          {daysOfWeek.map((day) => {
            const availability = availabilities.find((a) => a.weekday === day);
            const time = availability?.slotOneStart
              ? formatTime(availability.slotOneStart)
              : "";
            return (
              <span
                key={day}
                className="border-b-[1px] border-b-[#BBBBBB] min-w-[100px] h-[24px] flex items-center"
              >
                {time}
              </span>
            );
          })}
        </div>

        {/* Slot One End */}
        <div className="flex flex-col text-[16px] text-black font-light gap-[18px] ps-8">
          {daysOfWeek.map((day) => {
            const availability = availabilities.find((a) => a.weekday === day);
            const time = availability?.slotOneEnd
              ? formatTime(availability.slotOneEnd)
              : "";
            return (
              <span
                key={day}
                className="border-b-[1px] border-b-[#BBBBBB] min-w-[100px] h-[24px] flex items-center"
              >
                {time}
              </span>
            );
          })}
        </div>

        {/* Slot Two Start */}
        <div className="flex flex-col text-[16px] text-black font-light gap-[18px] ps-8">
          {daysOfWeek.map((day) => {
            const availability = availabilities.find((a) => a.weekday === day);
            const time = availability?.slotTwoStart
              ? formatTime(availability.slotTwoStart)
              : "";
            return (
              <span
                key={day}
                className="border-b-[1px] border-b-[#BBBBBB] min-w-[100px] h-[24px] flex items-center"
              >
                {time}
              </span>
            );
          })}
        </div>

        {/* Slot Two End */}
        <div className="flex flex-col text-[16px] text-black font-light gap-[18px] ps-8">
          {daysOfWeek.map((day) => {
            const availability = availabilities.find((a) => a.weekday === day);
            const time = availability?.slotTwoEnd
              ? formatTime(availability.slotTwoEnd)
              : "";
            return (
              <span
                key={day}
                className="border-b-[1px] border-b-[#BBBBBB] min-w-[100px] h-[24px] flex items-center"
              >
                {time}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AvailabilitySchedule;
