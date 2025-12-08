import Navlink from "@/components/userAccessManagement/Navlink";
import React from "react";

function page() {
  return (
    <div>
      <Navlink />
      <div className="border-[#888888c3] border-1 bg-white rounded-[15px] my-2 pb-20">
        <div className="px-8 py-4  flex flex-col gap-y-3">
          <h1 className="text-black font-semibold text-[14px]">Add Co Admin</h1>
          <input
            type="text"
            placeholder="Name"
            className="w-[328px] h-[40px] border-[#BBBBBB] border-1 rounded-[15px] px-4 outline-none placeholder:text-[14px]"
          />
          <input
            type="text"
            placeholder="Role/Designation"
            className="w-[328px] h-[40px] border-[#BBBBBB] border-1 rounded-[15px] px-4 outline-none placeholder:text-[14px]"
          />
          <input
            type="text"
            placeholder="Email ID"
            className="w-[328px] h-[40px] border-[#BBBBBB] border-1 rounded-[15px] px-4 outline-none placeholder:text-[14px]"
          />
          <input
            type="number"
            placeholder="Mobile Number"
            className="w-[328px] h-[40px] border-[#BBBBBB] border-1 rounded-[15px] px-4 outline-none placeholder:text-[14px]"
          />
          <button className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px]">
            Next
          </button>
        </div>

        <div className="px-8 py-3  flex flex-col gap-y-3">
          <h1 className="text-black font-semibold text-[14px]">
            Login Credentials
          </h1>
          <input
            type="text"
            placeholder="Login Email ID"
            className="w-[328px] h-[40px] border-[#BBBBBB] border-1 rounded-[15px] px-4 outline-none placeholder:text-[14px]"
          />
          <input
            type="text"
            placeholder="Create password"
            className="w-[328px] h-[40px] border-[#BBBBBB] border-1 rounded-[15px] px-4 outline-none placeholder:text-[14px]"
          />
          <input
            type="text"
            placeholder="Confirm password"
            className="w-[328px] h-[40px] border-[#BBBBBB] border-1 rounded-[15px] px-4 outline-none placeholder:text-[14px]"
          />

          <button className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px]">
            Next
          </button>
        </div>
        <h1 className="text-black font-semibold text-[14px] px-8 mt-4">
          Manage Permissions
        </h1>

        <div className="px-8 py-3  grid grid-cols-2 gap-y-3">
          <div className="flex gap-2 items-center">
            <input type="checkbox" name="" id="" className="size-5" />
            Home (Analytics)
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" name="" id="" className="size-5" />
            Billing
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" name="" id="" className="size-5" />
            Staff Management (HR)
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" name="" id="" className="size-5" />
            Referral Management
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" name="" id="" className="size-5" />
            Agent Management
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" name="" id="" className="size-5" />
            Staff Management (HR)
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" name="" id="" className="size-5" />
            Staff Management (HR)
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" name="" id="" className="size-5" />
            Staff Management (HR)
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" name="" id="" className="size-5" />
            Staff Management (HR)
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" name="" id="" className="size-5" />
            Staff Management (HR)
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" name="" id="" className="size-5" />
            Staff Management (HR)
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" name="" id="" className="size-5" />
            Staff Management (HR)
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" name="" id="" className="size-5" />
            Home (Analytics)
          </div>
        </div>
        <button className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] ms-8 my-2">
          Save
        </button>
      </div>
    </div>
  );
}

export default page;
