"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

function page() {
    const router = useRouter();
  
  return (
    <div>
       <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex items-center">
        <h1
          onClick={() => router.back()}
          className="text-[16px] text-black px-[38px] font-semibold cursor-pointer"
        >
          Back
        </h1>
      </div>

      {/* Header */}
      <div className="px-[38px] mt-4 flex justify-between ">
        <div>
          <h1 className="text-black font-semibold text-[20px]">Nandakumar P</h1>
          <p className="text-black font-semibold">Male, 58Yrs</p>
        </div>
      </div>
      <div className='flex rounded-[15px] h-[48px] mt-2'>
        <div className='bg-[#3674B5] rounded-l-[15px] w-[30%] text-white flex justify-center items-center'>
          Services Ongoing
        </div>
         <div className='bg-[#C0D8F6] w-[70%] text-black border-l-4 border-[#F0F4F9] rounded-r-[15px] flex items-center ps-6'>
          12 Hrs day Assistance
        </div>
      </div>



      <div className="bg-white border border-[#999999] rounded-[15px] mt-4 mb-6 pb-4">
           
      
      
              {/* Basic Details */}
              <div className=" pt-[15px]">
              
               
                
                {/* Experience */}
                <h1 className="text-[16px] font-semibold text-black pb-[18px] px-[39px] border-b-[#999999] border-b-1 ">
                  Experience details
                </h1>
                <div className="flex flex-col text-black font-light gap-[18px] px-[39px] my-4">
                  <div className="flex gap-[18px]">
                    <span className="w-[280px]">Diagnosis</span>
                    <span>
                     A sample diagnosys
                    </span>
                  </div>
                  <div className="flex gap-[18px]">
                    <span className="w-[280px]">Service Type</span>
                    <span>12 Hr Day Assistance</span>
                  </div>
                  <div className="flex gap-[18px]">
                    <span className="w-[280px]">Schedule</span>
                    <span>12hr Day</span>
                  </div>
                  <div className="flex gap-[18px]">
                    <span className="w-[280px]">Duration</span>
                    <span className="flex-1"> 02 Weeks</span>
                  </div>
                   <div className="flex gap-[18px]">
                    <span className="w-[280px]">Start Date</span>
                    <span className="flex-1"> 13-11-2025</span>
                  </div> <div className="flex gap-[18px]">
                    <span className="w-[280px]">End Date</span>
                    <span className="flex-1"> 27-11-2025</span>
                  </div> <div className="flex gap-[18px]">
                    <span className="w-[280px]">Payment</span>
                    <span className="flex-1"> 45000.00</span>
                  </div> <div className="flex gap-[18px]">
                    <span className="w-[280px]">Discount</span>
                    <span className="flex-1"> 5000.00</span>
                  </div> <div className="flex gap-[18px]">
                    <span className="w-[280px]">Sanctioned by</span>
                    <span className="flex-1"> Anil Joseph</span>
                  </div> <div className="flex gap-[18px]">
                    <span className="w-[280px]">Net Payment</span>
                    <span className="flex-1">40000.00</span>
                  </div>
                  <div className="flex gap-[18px]">
                    <span className="w-[280px]">Advance Pay</span>
                    <span className="flex-1"> 20000.00</span>
                  </div>
                   <div className="flex gap-[18px]">
                    <span className="w-[280px]">Assigned Staff</span>
                    <span className="flex-1"> Jeffin Mathew</span>
                  </div> <div className="flex gap-[18px]">
                    <span className="w-[280px]">Supervisor</span>
                    <span className="flex-1"> Mohandas K</span>
                  </div>
      
      
                  
                </div>
      
              
              </div>
              
                  </div>
            
      
             
         

    </div>
  )
}

export default page