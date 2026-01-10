import Navlink from '@/components/ambulances/Navlink'
import React from 'react'

function page() {
  return (
    <div>
        <Navlink/>

              <div className="mb-2 bg-white border border-[#BBBBBB] rounded-[15px] mt-2">
        <div className="flex border-b border-[#BBBBBB] py-4 w-full px-6">
          <p className="">Joined : 2025 December 29</p>
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
         <div className="flex border-t border-[#BBBBBB] py-4 w-full px-6">
          <div className="flex gap-4  py-[24px]">
          <button
   
            className="w-[192px] h-[40px] bg-[#FFD1D9] text-[#333333] flex justify-center items-center rounded-[15px] cursor-pointer"
          >
            Cancel Service
          </button>
          <button
           
            className="w-[192px] h-[40px] bg-white text-[#333333] border flex justify-center items-center rounded-[15px] cursor-pointer"
          >
            Edit Service
          </button>
          <button
           
            className="w-[192px] h-[40px] bg-[#09B438] text-white flex justify-center items-center rounded-[15px] cursor-pointer"
          >
            Confirm
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default page