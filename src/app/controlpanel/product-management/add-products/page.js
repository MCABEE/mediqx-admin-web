import Navlink from "@/components/productManagement/Navlink";
import React from "react";

function page() {
  return (
    <div>
      <Navlink />

      <div className="border border-[#f1d7d7] rounded-[15px] p-[23px] flex flex-col gap-[16px] bg-[#FFFFFF] mt-2">
        <p className="pb-[12px] font-semibold">Add Product Details</p>
        <input
          type="text"
          placeholder="Product Name"
          className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] text-[14px] text-black font-light px-[32px] outline-none"
        />
        <textarea
          placeholder="Description"
          name=""
          id=""
          className="w-[328px] h-[144px] border border-[#BBBBBB] rounded-[15px] text-[14px] text-black font-light px-[32px] outline-none pt-2"
        ></textarea>
        <select className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] text-[14px] text-black font-light px-[32px] outline-none bg-white">
          <option value="" disabled selected>
            Quantity
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <input
          type="text"
          placeholder="MRP Price"
          className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] text-[14px] text-black font-light px-[32px] outline-none"
        />
        <input
          type="text"
          placeholder="Discounted Price"
          className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] text-[14px] text-black font-light px-[32px] outline-none"
        />
        <input
          type="text"
          placeholder="Referral Commission Amount"
          className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] text-[14px] text-black font-light px-[32px] outline-none"
        />
        <input
          type="file"
          accept="image/*"
          className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] text-[14px] text-black font-light px-[16px] outline-none file:border-0 file:bg-transparent file:text-[14px] file:font-light"
        />
        <button className="w-[328px] h-[40px] bg-[#3674B5] border border-[#BBBBBB] rounded-[15px] text-[14px] text-white font-light px-[16px] outline-none file:border-0 file:bg-transparent file:text-[14px] file:font-light">
          Next
        </button>

        <p className="text-[14px] font-semibold text-black  ">
          Patient Health Status
        </p>
        <div className="grid grid-cols-2">
          <div className="flex gap-2 pt-4">
            <input type="checkbox" name="" id="" className="size-[20px]" />{" "}
            <span className="text-[16px] text-black ">
              Walkable with Support
            </span>
          </div>
          <div className="flex gap-2 pt-4">
            <input type="checkbox" name="" id="" className="size-[20px]" />{" "}
            <span className="text-[16px] text-black ">
              Walkable with Support
            </span>
          </div>
          <div className="flex gap-2 pt-4">
            <input type="checkbox" name="" id="" className="size-[20px]" />{" "}
            <span className="text-[16px] text-black ">
              Walkable with Support
            </span>
          </div>
          <div className="flex gap-2 pt-4">
            <input type="checkbox" name="" id="" className="size-[20px]" />{" "}
            <span className="text-[16px] text-black ">
              Walkable with Support
            </span>
          </div>
        </div>
        <p className="text-[14px] font-semibold text-black pt-[30px] ">
          Diagnosis
        </p>
        <div className="grid grid-cols-2">
          <div className="flex gap-2 pt-4">
            <input type="checkbox" name="" id="" className="size-[20px]" />{" "}
            <span className="text-[16px] text-black ">Advanced Dementia</span>
          </div>
          <div className="flex gap-2 pt-4">
            <input type="checkbox" name="" id="" className="size-[20px]" />{" "}
            <span className="text-[16px] text-black ">Advanced Dementia</span>
          </div>
          <div className="flex gap-2 pt-4">
            <input type="checkbox" name="" id="" className="size-[20px]" />{" "}
            <span className="text-[16px] text-black ">Advanced Dementia</span>
          </div>
          <div className="flex gap-2 pt-4">
            <input type="checkbox" name="" id="" className="size-[20px]" />{" "}
            <span className="text-[16px] text-black ">
              Walkable with Support
            </span>
          </div>
        </div>
        <button className="w-[328px] h-[40px] bg-[#3674B5] border border-[#BBBBBB] rounded-[15px] text-[14px] text-white font-light px-[16px] outline-none file:border-0 file:bg-transparent file:text-[14px] file:font-light my-[55px]">
          Save
        </button>
      </div>
    </div>
  );
}

export default page;
