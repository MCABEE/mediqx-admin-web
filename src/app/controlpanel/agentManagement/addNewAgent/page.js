import Navlink from "@/components/agentManagement/Navlink";
import React from "react";

function page() {
  return (
    <div>
      <Navlink />

      <div className="bg-white border  border-[#888888] rounded-[15px] my-2">
        <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">
          Basics
        </h1>
        <div className="flex flex-col gap-5 px-[39px]">
          <select className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 ">
            <option
              value=""
              className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] pe-4 "
            >
              Current Location
            </option>
          </select>
          <select className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 ">
            <option
              value=""
              className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] pe-4 "
            >
              Introduce yourself
            </option>
          </select>
        
          <input
            type="text"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
            placeholder="Full Name"
          />
          <input
            type="email"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
            placeholder="Email ID"
          />
          <input
            type="number"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
            placeholder="Mobile Number"
          />
          <input
            type="text"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
            placeholder="Pin Code"
          />
          <input
            type="text"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
            placeholder="Residential Address"
          />
        </div>

        <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">
        Verify yourself
        </h1>
        <div className="flex flex-col gap-5 px-[39px] mb-12">
        <label
            for="Any ID Proof (Govt ID)"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] ps-8 pe-4 flex items-center justify-between cursor-pointer"
          >
            Any ID Proof (Govt ID) <img src="/upload-btn.svg" alt="" />
            <input type="file" id="cv-upload" className="hidden" />
          </label>
          <label
            for="Photo"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] ps-8 pe-4 flex items-center justify-between cursor-pointer"
          >
           Photo <img src="/upload-btn.svg" alt="" />
            <input type="file" id="cv-upload" className="hidden" />
          </label>
          <button className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center">
            Upload
          </button>

          <span className=" text-[14px] text-[#3674B5] font-semibold ps-4 ">
            The Entry has been successfully submitted !
          </span>
        </div>
      </div>
    </div>
  );
}

export default page;
