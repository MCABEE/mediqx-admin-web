import Navlink from "@/components/agentManagement/Navlink";
import React from "react";

function page() {
  return (
    <div>
      <Navlink />

      <div className="bg-white border  border-[#888888] rounded-[15px] my-2">
        <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">
          Basics Information 
        </h1>
        <div className="flex flex-col gap-5 px-[39px]">
          <select className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 ">
            <option
              value=""
              >
              Type of Agent
            </option>
            <option value="">Institution</option>
            <option value="">Doctor</option>
            <option value="">Healthcare professional</option>
            <option value="">Public</option>
          </select>

        <input
            type="text"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
            placeholder="Full Name"
          />



          <select className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 ">
            <option
              value=""
              className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] pe-4 "
            >
              Gender
            </option>
          </select>
        
        
          <input
            type="date"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
            placeholder="Email ID"
          />

          
          <select className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 ">
            <option
              value=""
              className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] pe-4 "
            >
              Referral Type
            </option>
            <option value="">Staff</option>
            <option value="">Patient</option>
            <option value="">Both</option>
          </select>



           <h1 className="text-[16px] font-semibold text-black">
          Current Location 
        </h1>
        <select className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 ">
            <option
              value=""
              className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] pe-4 "
            >
              State
            </option>
          </select>
          <select className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 ">
            <option
              value=""
              className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] pe-4 "
            >
              District
            </option>
          </select>
          <input
            type="text"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
            placeholder="Area / Location"
          />
         
        </div>

        <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">
        Address and Contact
        </h1>
        <div className="flex flex-col gap-5 px-[39px] mb-12">
       
         <input
            type="text"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
            placeholder="Address Line 1"
          />
           <input
            type="text"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
            placeholder="Address Line 2"
          />
           <input
            type="email"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
            placeholder="Email"
          />
          <input
            type="number"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
            placeholder="Mobile Number"
          />
          <button className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center">
            Submit
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
