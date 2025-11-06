// import Link from 'next/link'
// import React from 'react'

// function page() {
//   return (
//     <div>
//        <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex gap-[50px] px-6 pt-6 rounded-[15px]">

//      <p className='h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 border-b-8 border-[#3674B5]'>
//       Regd Nurse
//      </p>
//        <p className='h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 '>
//       Assistant Nurse
//      </p>
//        <p className='h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 '>
//       Technicians
//      </p>
//        <p className='h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 '>
//       Therapy
//      </p>  <p className='h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 '>
//       Ancillary Pros
//      </p>
//     </div>
//        <div className="w-full bg-white border border-[#8888888c] text-base text-black  flex  justify-between items-center px-6 py-4 mt-4 rounded-[15px]">
// <div className='flex gap-[10px] '>
//   <select name="" id="" className='w-[192px] h-[40px] rounded-[15px] text-[14px] border border-[#bbbbbb] outline-none px-4'>
//   <option value="" >Gradient </option>
// </select>
// <select name="" id="" className='w-[192px] h-[40px] rounded-[15px] text-[14px] border border-[#bbbbbb] outline-none px-4'>
//   <option value="" >Duty Schedule</option>
// </select>
// </div>
// <button className='size-[40px] bg-[#3674B5] text-white text-xl rounded-[10px]'>+</button>
// </div>
//     </div>
//   )
// }

// export default page

// "use client";

// import AddPaymentPopup from "@/components/billing/AddPaymentPopup";
// import React, { useState } from "react";

// function Page() {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   return (
//     <div className="">
//       {/* Top Tabs */}
//       <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex gap-[40px] px-6 pt-6 rounded-[15px]">
//         {[
//           "Regd Nurse",
//           "Assistant Nurse",
//           "Technicians",
//           "Therapy",
//           "Ancillary Pros",
//         ].map((tab, i) => (
//           <p
//             key={i}
//             className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
//               i === 0 ? "border-b-8 border-[#3674B5]" : ""
//             }`}
//           >
//             {tab}
//           </p>
//         ))}
//       </div>

//       {/* Filter Section */}
//       <div className="w-full bg-white border border-[#8888888c] text-base text-black flex justify-between items-center px-6 py-4 mt-4 rounded-[15px]">
//         <div className="flex gap-[10px]">
//           <select className="w-[192px] h-[40px] rounded-[15px] text-[14px] border border-[#bbbbbb] outline-none px-4">
//             <option>Gradient</option>
//           </select>
//           <select className="w-[192px] h-[40px] rounded-[15px] text-[14px] border border-[#bbbbbb] outline-none px-4">
//             <option>Duty Schedule</option>
//           </select>
//         </div>
//         <button
//           onClick={() => setIsPopupOpen(true)}
//           className="size-[40px] bg-[#3674B5] text-white text-xl rounded-[10px]"
//         >
//           +
//         </button>
//       </div>

//       <table className="w-full border-spacing-y-2 border-separate text-black mt-4">
//         <thead className="bg-[#C0D8F6]">
//           <tr>
//             <th className="text-base rounded-l-2xl p-2">Services</th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//            Charge
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               Final Bill
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//              Staff Pay
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//              S. Referral
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
//               P. Referral
//             </th>
//           </tr>
//         </thead>

//         <tbody>
//           <tr className="bg-white">
//             <td className="p-2">huihuihuihuiy</td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">nkjhujygf</td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">jkhyhgf</td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">hhjb</td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">hhjb</td>

//             <td className="border-l-4 border-[#C0D8F6] p-2">hjvh</td>
//           </tr>
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="flex justify-between my-4 gap-4">
//         <button className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50">
//           Previous
//         </button>
//         <span className="text-black font-semibold text-lg">2 / 3</span>
//         <button className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50">
//           Next
//         </button>
//       </div>

//       {/* Add Payment Popup */}
//       {isPopupOpen && <AddPaymentPopup onClose={() => setIsPopupOpen(false)} />}
//     </div>
//   );
// }

// export default Page;












"use client";

import PaymentStructureTable from "@/components/billing/paymentStructure/PaymentStructureTable";
import React from "react";

function Page() {


  return (
    <div>
      {/* Top Tabs */}
      <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex gap-[40px] px-6 pt-6 rounded-[15px]">
        {[
          "Regd Nurse",
          "Assistant Nurse",
          "Technicians",
          "Therapy",
          "Ancillary Pros",
        ].map((tab, i) => (
          <p
            key={i}
            className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
              i === 0 ? "border-b-8 border-[#3674B5]" : ""
            }`}
          >
            {tab}
          </p>
        ))}
      </div>

   <PaymentStructureTable/>
    </div>
  );
}

export default Page;
