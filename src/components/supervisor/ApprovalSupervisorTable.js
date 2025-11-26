"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

function ApprovalSupervisorTable() {
  const router = useRouter();
 
      const handleRowClick = (id) => {
     router.push(`/controlpanel/staffManagement/supervisor/supervisor-approval-details/${id}`);
   };
 
   return (
     <>
       {/* Total + Clear Filters */}
       <div className="w-full bg-white border border-[#8888888c] rounded-[15px] mt-2 pt-4 pb-4 px-6 text-black font-semibold text-[32px] flex justify-between items-center">
         <p>3</p>
         <button className="bg-[#C0D8F6] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#aac4ec]">
           Clear Filters
         </button>
       </div>
 
       {/* Table */}
       <div className="overflow-x-auto mt-2">
         <table className="w-full border-spacing-y-2 border-separate text-black">
           <thead className="bg-[#C0D8F6]">
             <tr>
               <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">
                 No
               </th>
               <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                 Name
               </th>
               <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                 Location
               </th>
               <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                 Gender
               </th>
               <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
                 Qualification
               </th>
             </tr>
 
             {/* Filters Row */}
 
             <tr className="bg-white border-b border-gray-200">
               <th></th>
               <th className="p-2 border-l-4 border-[#F0F4F9]">
                 <input
                   type="text"
                   placeholder="Search name"
                   className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#3674B5]"
                 />
               </th>
               <th className="p-2 border-l-4 border-[#F0F4F9]">
                 <input
                   type="text"
                   placeholder="Search location"
                   className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#3674B5]"
                 />
               </th>
               <th className="p-2 border-l-4 border-[#F0F4F9]">
                 <select className="border border-gray-300 rounded-md px-2 py-1 text-sm w-full outline-none focus:ring-1 focus:ring-[#3674B5]">
                   <option value="">All</option>
                   <option value="MALE">Male</option>
                   <option value="FEMALE">Female</option>
                   <option value="OTHER">Other</option>
                 </select>
               </th>
               <th className="p-2 border-l-4 border-[#F0F4F9] rounded-r-2xl">
                 <input
                   type="text"
                   placeholder="Search qualification"
                   className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#3674B5]"
                 />
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
 
         {/* Pagination */}
 
         <div className="flex justify-between my-4 gap-4">
           <button className="px-4 py-1 rounded bg-[#5f9de9] text-white disabled:opacity-50">
             Prev
           </button>
           <span className="text-sm font-medium self-center">Page 3 of 9</span>
           <button className="px-4 py-1 rounded bg-[#5f9de9] text-white disabled:opacity-50">
             Next
           </button>
         </div>
       </div>
     </>
   );
}

export default ApprovalSupervisorTable