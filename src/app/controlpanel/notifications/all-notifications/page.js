import Navlink from '@/components/notifications/Navlink'
import React from 'react'

function page() {
  return (
    <div>
        <Navlink/>
          <div className="w-full border border-[#d3cdcd] bg-white rounded-2xl">
        <p className="text-[16px] text-black font-semibold border-b border-[#c5c1c1] px-8 py-[22px] mb-4">
          12
        </p>

        <div className="ps-5 pe-[139px]  ">
          <p>Audience</p>
          <div className="flex gap-7 text-[16px] text-black py-2 ">
            <p>Registered Nurses</p>
            <p>Assistant Nurses</p>
          </div>
          <p className="text-[16px] text-[#333333] font-semibold pb-2.5">
            Glucometers help you understand
          </p>
          <p className="text-[#333333] text-[16px]">
            Glucometers help you understand which foods or activities are
            responsible for the increase or decrease in the levels of your blood
            sugar. They help you monitor sugar levels, and assist you in
            controlling your diabetes from reaching dangerous levels.
          </p>
          <p className="pt-[13px] font-semibold">
            Admin :<span className="font-normal"> Anil Joseph</span>
          </p>
          <p className="pt-[13px] pb-[36px] font-semibold">
            Date :<span className="font-normal"> 08-12-2025</span>
          </p>
        </div>
      </div>

      <div className="w-full border border-[#d3cdcd] bg-white mt-5 rounded-2xl">
        <p className="text-[16px] text-black font-semibold border-b border-[#c5c1c1] px-8 py-[22px] mb-4">
          12
        </p>

        <div className="ps-5 pe-[139px]  ">
          <p>Audience</p>
          <div className="flex gap-7 text-[16px] text-black py-2 ">
            <p>Registered Nurses</p>
            <p>Assistant Nurses</p>
          </div>
          <p className="text-[16px] text-[#333333] font-semibold pb-2.5">
            Glucometers help you understand
          </p>
          <p className="text-[#333333] text-[16px]">
            Glucometers help you understand which foods or activities are
            responsible for the increase or decrease in the levels of your blood
            sugar. They help you monitor sugar levels, and assist you in
            controlling your diabetes from reaching dangerous levels.
          </p>
          <p className="pt-[13px] font-semibold">
            Admin :<span className="font-normal"> Anil Joseph</span>
          </p>
          <p className="pt-[13px] pb-[36px] font-semibold">
            Date :<span className="font-normal"> 08-12-2025</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default page