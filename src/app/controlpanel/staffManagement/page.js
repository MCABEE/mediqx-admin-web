import Navlink from "@/components/staffManagement/Navlink";
import React from "react";
import Link from "next/link";
import Table from "@/components/staffManagement/newApplications/Table";

function page() {
  return (
    <div>
      <Navlink />
      <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex justify-between  px-6  rounded-[15px] mt-2  ">
        <div className="flex text-black font-semibold gap-[48px] pt-[23px] pb-[19px]">
          {/* <p>All</p> */}
          <p>Nurse</p>
          {/* <p>Paramedical</p>
          <p>Doctor</p>
          <p>Supervisor</p> */} 
        </div>
        {/* <div className="flex gap-2 justify-center items-center">
          <p className=" text-black font-semibold pt-[23px] pb-[19px]">Clear</p>
          <input type="checkbox" className="size-[20px] " />
        </div> */}
      </div>
      
<Table/>
    </div>
  );
}

export default page;
