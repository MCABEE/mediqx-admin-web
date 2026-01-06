import Navlink from '@/components/ambulances/Navlink'
import React from 'react'

function page() {
  return (
    <div>
        <Navlink/>

           {/* Filters */}
      <div className="w-full bg-white border border-[#8888888c] flex justify-between items-center px-6 py-4 mt-2 rounded-[15px]">
        <div className="flex gap-[10px]">
          <select
           
            className="w-[300px] h-[40px] rounded-[15px] border border-[#8888888c] outline-none px-4 text-[14px]"
          >
           <option value="">Ambulance Type</option>
          </select>

          <select
           className="w-[300px] h-[40px] rounded-[15px] border border-[#8888888c] outline-none px-4 text-[14px]"
          >
           <option value="">Vehicle Type</option>
          </select>
        </div>

       
      </div>

  <div className="w-full h-[48px] border border-[#8888888c] bg-white mt-2 rounded-[15px] flex items-center">
        <h1
         
          className="text-[16px] px-6 font-semibold cursor-pointer"
        >
          12 Results Found
        </h1>
      </div>

         <div className="mb-2 bg-white border border-[#BBBBBB] rounded-[15px] mt-2">
        <div className="flex border-b border-[#BBBBBB] py-4 w-full px-6">
          <p className="font-semibold">12</p>
        </div>

        <div className="flex p-6 gap-20">
          <div className="flex flex-col gap-[10px] text-[16px] font-semibold">
            <span>Ambulance Name</span>
            <span>Ambulance Type</span>
            <span>Vehicle Type</span>
            <span>Driver Name</span>
            <span>Mobile Number</span>
            <span>Email</span>
            <span>Customer Care</span>
            <span>Location</span>
          </div>

          <div className="flex flex-col gap-[10px] text-[16px]">
            <span>Divine Ambulance Service</span>
            <span>D Level ICU</span>
            <span>Force Traveller</span>
            <span>Maneesh Traveller</span>
            <span>8989898786</span>
            <span>NIL</span>
            <span>1234554323</span>
            <span>House no 6th
                North Nagar
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page