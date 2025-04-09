import Calendar from "@/components/staffManagement/Calendar";
import Navlink from "@/components/staffManagement/Navlink";
import React from "react";

function page() {
  return (
    <div>
      <Navlink />
      <div className="w-full bg-white border border-[#888888] text-base text-black font-semibold placeholder:font-light flex justify-between gap-[50px] px-6  pb-4 pt-6 rounded-[15px] mt-4">
        <input
          type="search"
          className="w-[297px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
          placeholder="Search Employee"
        />
        <select
          name=""
          id=""
          className="w-[192px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] px-2"
        >
          <option
            value="Current Location"
            selected
            disabled
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none"
          >
            Month
          </option>
          <option
            value="Current Location"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none"
          >
            January
          </option>
          <option
            value="Current Location"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none"
          >
            Februray
          </option>
          <option
            value="Current Location"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none"
          >
            March
          </option>
          <option
            value="Current Location"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none"
          >
            April
          </option>
          <option
            value="Current Location"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none"
          >
            May
          </option>
          <option
            value="Current Location"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none"
          >
            June
          </option>
          <option
            value="Current Location"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none"
          >
            July
          </option>
          <option
            value="Current Location"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none"
          >
            August
          </option>
          <option
            value="Current Location"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none"
          >
            September
          </option>
          <option
            value="Current Location"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none"
          >
            October
          </option>
          <option
            value="Current Location"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none"
          >
            November
          </option>
          <option
            value="Current Location"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none"
          >
            December
          </option>
        </select>
      </div>

      <Calendar />
    </div>
  );
}

export default page;
