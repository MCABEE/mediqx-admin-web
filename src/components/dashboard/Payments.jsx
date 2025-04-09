import React from 'react'
import { GoArrowDown } from "react-icons/go";

const Payments = () => {
  return (
    <div className='bg-white py-[29px] w-1/2 rounded-2xl '>
           <div className="px-[71px] w-full flex justify-between border-b border-[#8888888c]">
                <div className="flex flex-col gap-5 text-[#333333] font-semibold">
                  <p className="text-base">Payments</p>
                  <p className="text-[32px]">275800</p>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <div className="text-[#FE1940] flex gap-1">
                    <GoArrowDown className="size-9" />
                    <p className="text-2xl pt-2">08%</p>
                  </div>
                  <div className="text-[#333333] text-base font-semibold">
                    <p>2025 April</p>
                  </div>
                </div>
              </div>
           
              <div className='px-[71px] pt-6 flex gap-[94px] font-semibold'>
      <div className='flex flex-col text-[#333333] gap-3.5'>
      <p className='text-base'>Referral Payments</p>
      <p className='text-[32px]'>27450</p>
      </div>
              </div>
    </div>
  )
}

export default Payments