"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

function page() {
        const router = useRouter();
    
         const handleRowClick = (id) => {
        router.push(`/controlpanel/staffManagement/supervisor/supervisor-service-details/${id}`);
      };
    
  return (
    <>
         <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex items-center">
        <h1
          onClick={() => router.back()}
          className="text-[16px] text-black px-[38px] font-semibold cursor-pointer"
        >
          Back
        </h1>
       
      </div>
      <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-t-[15px] flex items-center">
        <h1
          className="text-[16px] text-black px-[38px] font-semibold cursor-pointer"
        >
          Tibin
        </h1>
       
      </div>
       <div className="w-full bg-white border border-[#8888888c] text-base text-black flex justify-between items-center px-6 py-4 mt-2 rounded-[15px]">
        <div className="flex gap-[10px]">
          <select className="w-[192px] h-[40px] rounded-[15px] text-[14px] border border-[#bbbbbb] outline-none px-4">
            <option>Year</option>
          </select>
          <select className="w-[192px] h-[40px] rounded-[15px] text-[14px] border border-[#bbbbbb] outline-none px-4">
            <option>Month</option>
          </select>
        </div>
        <h1 className="text-black text-[16px] font-semibold">03 services</h1>
      </div>
         <table className="w-full border-spacing-y-2 border-separate text-black">
          <thead className="bg-[#C0D8F6]">
            <tr>
              <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">
                No
              </th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                Patient Name
              </th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                Service 
              </th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                Products
              </th>
              <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
                Billing
              </th>
            </tr>


  
          </thead>
          <tbody>
            <tr
              onClick={() => handleRowClick("cmha9avo9000ala01xb93wwwe")}
              className="bg-white cursor-pointer hover:bg-gray-100"
            >
              <td className="p-2">1</td>
              <td className="border-l-4 border-[#C0D8F6] p-2 hover:underline">
                Sevv
              </td>
              <td className="border-l-4 border-[#C0D8F6] p-2">keke</td>
              <td className="border-l-4 border-[#C0D8F6] p-2">male</td>
              <td className="border-l-4 border-[#C0D8F6] p-2">bhyu hjh hj</td>
            </tr>
          </tbody>
        </table>


    </>
  )
}

export default page