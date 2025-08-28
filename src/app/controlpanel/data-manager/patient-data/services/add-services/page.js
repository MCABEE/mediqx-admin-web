import Navlink from "@/components/dataManager/patientData/Navlink";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div>
      <Navlink/>
      <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
          <div className=" flex item-center gap-[50px]">
            <h1 className="text-[#3674B5]">Add</h1>
            <Link href={" /controlpanel/data-manager/patient-data/services/manage-services"} className="text-black">Manage</Link>
          </div>
          <button className="bg-[#196BA5] text-white text-3xl rounded-lg size-9 cursor-pointer">
            +
          </button>
        </div>
      </div>

      <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
<h1 className="text-black font-semibold py-[16px] ">Add Services</h1>
      </div>
      <div className="bg-white flex gap-6 px-6 py-2 mt-2">
        <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">01</div>
            <input type="text" className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none" placeholder="Enter Service"/>
      </div>
       <div className="bg-white flex gap-6 px-6 py-2 mt-2">
        <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">02</div>
            <input type="text" className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none" placeholder="Enter Service"/>
      </div>
      <button className="bg-[#196BA5] text-white  rounded-[15px] py-2 px-10 mt-2 cursor-pointer">
            Save
          </button>

    </div>
  );
}

export default page;
