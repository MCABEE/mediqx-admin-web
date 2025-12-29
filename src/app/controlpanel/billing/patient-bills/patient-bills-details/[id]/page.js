// "use client"
// import React from 'react'
// import { useRouter } from "next/navigation";

// function page() {
//     const router = useRouter();
//   return (
//     <div>
//             <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex items-center">
//         <h1
//           onClick={() => router.back()}
//           className="text-[16px] text-black px-[38px] font-semibold cursor-pointer"
//         >
//           Back
//         </h1>

//       </div>

//       <div className="px-[38px] mt-4 flex justify-between">
//         <div>
//             <h1 className="text-black font-semibold text-[20px]">
//             Nandakumar P
//         </h1>
//         <p className="text-black font-semibold">Male, 58Yrs</p>
//         </div>

//       </div>
//       {/* <div className='flex justify-evenly items-center border border-[#888888] gap-10 font-semibold text-black rounded-[15px] w-full bg-white' >
// <p className='text-white bg-[#367485] h-full rounded-l-[15px] py-[15px] '>Services Ongoing</p>
// <p className='py-[15px] px-4'>To be start</p>
// <p className='border-l-[#F0F4F9] border-l-4 py-[15px] px-4'>Completed</p>
// <p className='border-l-[#F0F4F9] border-l-4 py-[15px] px-4'>Products</p>
// <p className='border-l-[#F0F4F9] border-l-4 py-[15px] px-4'>All</p>

//       </div> */}
//       <div className="flex justify-evenly items-center border border-[#888888] font-semibold text-black rounded-[15px] w-full bg-white mt-4 overflow-hidden">
//   <p className="text-white bg-[#367485] py-[15px] px-4 w-full text-center cursor-pointer">
//     Services Ongoing
//   </p>
//   <p className="py-[15px] px-4 w-full text-center cursor-pointer border-l border-l-[#F0F4F9]">
//     To be start
//   </p>
//   <p className="py-[15px] px-4 w-full text-center cursor-pointer border-l border-l-[#F0F4F9]">
//     Completed
//   </p>
//   <p className="py-[15px] px-4 w-full text-center cursor-pointer border-l border-l-[#F0F4F9]">
//     Products
//   </p>
//   <p className="py-[15px] px-4 w-full text-center cursor-pointer border-l border-l-[#F0F4F9]">
//     All
//   </p>
// </div>

//     </div>
//   )
// }

// export default page

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [selected, setSelected] = useState("Services Ongoing");

  const tabs = [
    "Services Ongoing",
    "To be start",
    "Completed",
    "Products",
    "All",
  ];

  return (
    <div>
      {/* Back Button */}
      <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex items-center">
        <h1
          onClick={() => router.back()}
          className="text-[16px] text-black px-[38px] font-semibold cursor-pointer"
        >
          Back
        </h1>
      </div>

      {/* Header */}
      <div className="px-[38px] mt-4 flex justify-between">
        <div>
          <h1 className="text-black font-semibold text-[20px]">Nandakumar P</h1>
          <p className="text-black font-semibold">Male, 58Yrs</p>
        </div>
      </div>

      {/* Tabs (one perfect line) */}
      <div className="flex border-4 border-[#F0F4F9] font-semibold text-black rounded-[15px] w-full bg-white mt-4 overflow-hidden">
        {tabs.map((tab, index) => (
          <div
            key={tab}
            onClick={() => setSelected(tab)}
            className={`flex-1 text-center py-[15px] cursor-pointer transition-all duration-200 ${
              selected === tab
                ? "bg-[#367485] text-white"
                : "bg-white text-black"
            } ${index !== 0 ? "border-l-4 border-l-[#F0F4F9]" : ""}`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Example content area */}
      <div className="">
        {selected === "Services Ongoing" && (
          <>
            <table className="w-full border-spacing-y-2 border-separate text-black mt-2">
              <thead className="bg-[#C0D8F6]">
                <tr>
                  <th className="text-base rounded-l-2xl p-2">No</th>
                  <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                    Service
                  </th>
                  <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                    Duration
                  </th>
                  <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                    Net Pay
                  </th>
                  <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                    Paid
                  </th>
                  <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
                    Balance
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* Example Row */}

                <tr
                  onClick={() =>
                    router.push(
                      "/controlpanel/billing/patient-bills/patient-bill-detailView"
                    )
                  }
                  className="bg-white cursor-pointer hover:bg-[#E8F1FD] transition"
                >
                  <td className="p-2 text-center">01</td>
                  <td className="border-l-4 text-center border-[#C0D8F6] p-2">
                    12 hrs Day Assistance
                  </td>
                  <td className="border-l-4 text-center border-[#C0D8F6] p-2">
                    15 Days
                  </td>
                  <td className="border-l-4 text-center border-[#C0D8F6] p-2">
                    ₹7000.00
                  </td>
                  <td className="border-l-4 text-center border-[#C0D8F6] p-2">
                    ₹100.00
                  </td>
                  <td className="border-l-4 text-center border-[#C0D8F6] p-2">
                    ₹5000.00
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between my-4 gap-4">
              <button className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50">
                Previous
              </button>
              <span className="text-black font-semibold text-lg">2 / 3</span>
              <button className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50">
                Next
              </button>
            </div>
       </>
        )}
        {selected === "To be start" && (
          <p className="text-black mt-4">Showing upcoming services...</p>
        )}
        {selected === "Completed" && (
          <p className="text-black mt-4">Showing completed services...</p>
        )}
        {selected === "Products" && (
          <p className="text-black mt-4">Showing purchased products...</p>
        )}
        {selected === "All" && (
          <p className="text-black mt-4">Showing all records...</p>
        )}
      </div>
    </div>
  );
}
