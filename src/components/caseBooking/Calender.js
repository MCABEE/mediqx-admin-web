"use client";
import Link from "next/link";
import { useState } from "react";

const Calendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const getColor = (status) => {
    switch (status) {
      case "leave":
        return "bg-red-300";
      case "available":
        return "bg-green-300";
      case "on-duty":
        return "bg-gray-300";
      default:
        return "bg-white";
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (month, year) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => ({
      date: i + 1,
      status: "on-duty", // Default status, modify as needed
    }));
  };

  const days = getDaysInMonth(selectedMonth, year);

  return (
    <div className="  bg-white border-[1px] border-[#BBBBBB] rounded-[15px] mt-4 mb-6">
      <div className="flex border-b border-[#BBBBBB] ">
        <Link href={"/controlpanel/caseBooking/assignStaff"}>
          <h1 className=" text-[#333333] text-[20px] py-[26px]  px-[38px] border-r border-[#BBBBBB]">
            Back
          </h1>
        </Link>
        <h1 className="font-semibold text-[#333333] text-[20px] py-[26px] px-[38px]">
          Nitheesh Kumar M
        </h1>
      </div>
      <div className="flex border-b border-[#BBBBBB] py-[20px] text-[16px]">
        <h1 className="font-semibold text-[#333333]    px-[38px]">
          Duty Schedule
        </h1>
        <h1 className=" text-[#333333] px-[38px]">
          2025 April 02 - 2025 April 17
        </h1>
        <h1 className=" text-[#333333] px-[38px]">24 Hrs</h1>
      </div>
      <div className="flex justify-between text-black  items-center mb-4 px-[38px] py-[15px] border-b border-[#BBBBBB] ">
        <h2 className="text-lg font-bold">
          {months[selectedMonth - 1]} {year}
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded-[5px] bg-[#F0F4F9]"></div>On Duty
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded-[5px] bg-[#FEC4BF]"></div>Leave
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded-[5px] bg-[#B6E9C4]"></div>Available
          </div>
        </div>
        <select
          className="p-2 border  outline-none border-[#BBBBBB] rounded-[15px]"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {months.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-7 gap-x-2 gap-y-3 px-[38px] py-8 text-black">
        {days.map((day) => (
          <div
            key={day.date}
            // className={`p-4 bg-[#B6E9C4] text-center rounded ${getColor(day.status)}`}
            className="p-4  text-center rounded bg-[#B6E9C4]"
          >
            {day.date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
