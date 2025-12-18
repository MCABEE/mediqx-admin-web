import Navlink from "@/components/productManagement/Navlink";
import React from "react";

function page() {
  return (
    <div>
      <Navlink />
     <div className="w-full h-full py-4 bg-white mt-4 border border-[#f4eded] rounded-[15px]">
        <p className="text-[20px] text-black font-semibold pt-[19px] px-[24px]">
          Glucometer
        </p>
        <div className="px-[24px] pt-[18px] flex gap-[11px]">
          <img src="/glucometer.svg" alt="" className="size-[120px] rounded-[8px]" />
          <div>
            <p className="text-[14px] text-[#333333] pe-[120px]">
              Glucometers help you understand which foods or activities are
              responsible for the increase or decrease in the levels of your
              blood sugar. They help you monitor sugar levels, and assist you in
              controlling your diabetes from reachin
            </p>
            <p className="text-[14px] text-black pt-[14px] ">
              Quantity/Unit: 01
            </p>
            <div className="flex gap-[53px] pt-[14px] text-black text-[14px]">
              <p>Price: 600.00 </p>
              <p className="text-[#008F27]">Discounted Price: 550.00</p>
            </div>
          </div>
        </div>
        <div className="px-[23px] py-4">
          <p className="text-[14px] text-black font-semibold">
            Patient Health Status
          </p>
          <div className="flex gap-[31px] text-black text-[16px]">
            <p>Walkable with Support</p>

            <p>Sepsis</p>
            <p>Hospice care</p>
          </div>
          <p className="text-[14px] text-black font-semibold pt-[13px]">
            Diagnosis
          </p>
          <div className="flex gap-[31px] text-black text-[16px]">
            <p>Advanced Dementia</p>

            <p>Sepsis</p>
            <p>Hospice care</p>
          </div>
        </div>
        <div className="flex gap-1.5 justify-end pe-4">
          <button className="w-[96px] h-[40px] border  bg-[#3674B5] rounded-[15px] text-white">
            Edit
          </button>
          <button className="w-[96px] h-[40px] border  bg-[#FF0000] rounded-[15px] text-white">
            Delete
          </button>
        </div>
      </div>
      <div className="w-full h-full py-4 bg-white mt-4 border border-[#f4eded] rounded-[15px]">
        <p className="text-[20px] text-black font-semibold pt-[19px] px-[24px]">
          Glucometer
        </p>
        <div className="px-[24px] pt-[18px] flex gap-[11px]">
          <img src="/glucometer.svg" alt="" className="size-[120px] rounded-[8px]" />
          <div>
            <p className="text-[14px] text-[#333333] pe-[120px]">
              Glucometers help you understand which foods or activities are
              responsible for the increase or decrease in the levels of your
              blood sugar. They help you monitor sugar levels, and assist you in
              controlling your diabetes from reachin
            </p>
            <p className="text-[14px] text-black pt-[14px] ">
              Quantity/Unit: 01
            </p>
            <div className="flex gap-[53px] pt-[14px] text-black text-[14px]">
              <p>Price: 600.00 </p>
              <p className="text-[#008F27]">Discounted Price: 550.00</p>
            </div>
          </div>
        </div>
        <div className="px-[23px] py-4">
          <p className="text-[14px] text-black font-semibold">
            Patient Health Status
          </p>
          <div className="flex gap-[31px] text-black text-[16px]">
            <p>Walkable with Support</p>

            <p>Sepsis</p>
            <p>Hospice care</p>
          </div>
          <p className="text-[14px] text-black font-semibold pt-[13px]">
            Diagnosis
          </p>
          <div className="flex gap-[31px] text-black text-[16px]">
            <p>Advanced Dementia</p>

            <p>Sepsis</p>
            <p>Hospice care</p>
          </div>
        </div>
        <div className="flex gap-1.5 justify-end pe-4">
          <button className="w-[96px] h-[40px] border  bg-[#3674B5] rounded-[15px] text-white">
            Edit
          </button>
          <button className="w-[96px] h-[40px] border  bg-[#FF0000] rounded-[15px] text-white">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
