"use client";
import Navlink from "@/components/caseBooking/NavLink";
import React, { useState } from "react";

const page = () => {
  const [fromType, setFromType] = useState("text");
  const [toType, setToType] = useState("text");

  return (
<>
<Navlink/>
    <div className=" w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">

      <div className="w-full h-[72px] flex items-center bg-white px-8 rounded-t-[15px] border-b-2">
        <h1 className="text-[16px] font-semibold text-black">
          Patient Details
        </h1>
      </div>
      <div className="px-8 text-[14px] text-black font-light flex flex-col gap-4">
        <input
          type="text"
          placeholder="Patient Name"
          className="w-[328px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px] mt-[24px] outline-none placeholder:text-black"
        />
        <div className="flex gap-1">
          <select
            name=""
            id=""
            className="w-[160px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px]"
          >
            <option value="" selected disabled>
              Gender
            </option>
          </select>
          <select
            name=""
            id=""
            className="w-[160px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px]"
          >
            <option value="" selected disabled>
              Age
            </option>
            <option value="">1</option>
          </select>
        </div>
        <div className="flex gap-1">
          <select
            name=""
            id=""
            className="w-[160px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px]"
          >
            <option value="" selected disabled>
              Height (CM)
            </option>
          </select>
          <select
            name=""
            id=""
            className="w-[160px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px]"
          >
            <option value="" selected disabled>
              Weight (Kg)
            </option>
            <option value="">1</option>
          </select>
        </div>
        <input
          type="text"
          placeholder=" Diagnosis"
          className="w-[328px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px] outline-none placeholder:text-black"
        />
        <select
          name=""
          id=""
          className="w-[328px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px]"
        >
          <option value="" selected disabled>
            Current Health Status / Activity
          </option>
        </select>
        <select
          name=""
          id=""
          className="w-[328px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px]"
        >
          <option value="" selected disabled>
            Now Patient stayed at
          </option>
        </select>
        <textarea
          name=""
          id=""
          placeholder="Residential Address with PIN"
          className="w-[328px] h-[96px] rounded-[15px] border border-[#BBBBBB] ps-[32px]  placeholder:text-black py-2"
        ></textarea>
        <input
          type="text"
          placeholder="Contact Person (Relative) Name"
          className="w-[328px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px]  outline-none placeholder:text-black"
        />
        <select
          name=""
          id=""
          className="w-[328px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px]"
        >
          <option value="" selected disabled>
            Relationship with patient
          </option>
          <option value="">1</option>
        </select>
        <input
          type="text"
          placeholder="Email ID"
          className="w-[328px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px] outline-none placeholder:text-black"
        />
        <input
          type="text"
          placeholder="Mobile Number"
          className="w-[328px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px] outline-none placeholder:text-black"
        />
      </div>
      <h1 className="text-[16px] font-semibold text-black ps-[32px] py-[15px]">
        Preferred Language
      </h1>
      <div className="flex gap-4 ps-[32px] text-black font-light">
        <div className="flex gap-2">
          <input type="checkbox" name="" id="" />
          Hindi
        </div>
        <div className="flex gap-2">
          <input type="checkbox" name="" id="" />
          Kannada
        </div>
        <div className="flex gap-2">
          <input type="checkbox" name="" id="" />
          English
        </div>
      </div>
      <div className="flex gap-4 ps-[32px] text-black mt-2 font-light">
        <div className="flex gap-2">
          <input type="checkbox" name="" id="" />
          Malayalam
        </div>
        <div className="flex gap-2">
          <input type="checkbox" name="" id="" />
          Tamil
        </div>
        <div className="flex gap-2">
          <input type="checkbox" name="" id="" />
          Telugu
        </div>
      </div>
      <h1 className="text-[16px] font-semibold text-black ps-[32px] py-[15px]">
        Service Details
      </h1>
      <div className="flex flex-col ps-[32px] gap-4">
        <select
          name=""
          id=""
          className="w-[328px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px] text-black"
        >
          <option value="" selected disabled>
            Service Required
          </option>
          <option value="">1</option>
        </select>
        <select
          name=""
          id=""
          className="w-[328px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px] text-black"
        >
          <option value="" selected disabled>
            Daily Schedule
          </option>
          <option value="">1</option>
        </select>

        <input
          type={fromType}
          placeholder="Service Period (From)"
          onFocus={() => setFromType("date")}
          onBlur={(e) => {
            if (!e.target.value) setFromType("text");
          }}
          className="w-[328px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px] outline-none placeholder:text-black"
        />

        <input
          type={toType}
          placeholder="Service Period (To)"
          onFocus={() => setToType("date")}
          onBlur={(e) => {
            if (!e.target.value) setToType("text");
          }}
          className="w-[328px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px] outline-none placeholder:text-black"
        />
      </div>
      <h1 className="text-[16px] font-semibold text-black ps-[32px] py-[15px]">
      Preferred Staff
      </h1>
      <select
          name=""
          id=""
          className="w-[328px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px] text-black ms-8"
        >
          <option value="" selected disabled>
          Male / Female
          </option>
          <option value="">Male</option>
          <option value="">Female</option>

        </select>
        <button className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center ms-8 mt-4">
            Upload
          </button>

          <p className=" text-[14px] text-[#3674B5] font-semibold ps-4 ms-8 pt-4 mb-[200px]">
            The Entry has been successfully submitted !
          </p>
    </div>
    </>
  );
};

export default page;
