// "use client";

// import Link from "next/link";
// import React from "react";

// function StaffPaymentsTable() {
//   return (
//     <div>
//       {/* Filter Section */}
//       <div className="w-full bg-white border border-[#8888888c] text-base text-black flex justify-between items-center px-6 py-4 mt-2 rounded-[15px]">
//         <div className="flex gap-[10px]">
//           <select className="w-[192px] h-[40px] rounded-[15px] text-[14px] border border-[#bbbbbb] outline-none px-4">
//             <option>Year</option>
//           </select>
//           <select className="w-[192px] h-[40px] rounded-[15px] text-[14px] border border-[#bbbbbb] outline-none px-4">
//             <option>Month</option>
//           </select>
//         </div>
//         <h1 className="text-black text-[16px] font-semibold">2025, November</h1>
//       </div>

//       {/* Table */}
//       <table className="w-full border-spacing-y-2 border-separate text-black mt-2">
//         <thead className="bg-[#C0D8F6]">
//           <tr>
//             <th className="text-base rounded-l-2xl p-2">Staff Name</th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               Working Days
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               Duties
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               Payment
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">TDS</th>
//             <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
//               Net Pay
//             </th>
//           </tr>
//         </thead>

//         <tbody>
//           {/* Example Row */}
//           <tr className="bg-white cursor-pointer hover:bg-[#E8F1FD] transition">
//             <td className="p-2 text-center">
//               <Link
//                 href="/controlpanel/billing/staff-payment-details"
//                 className="block w-full h-full"
//               >
//                 George Thomas
//               </Link>
//             </td>
//             <td className="border-l-4 text-center border-[#C0D8F6] p-2">24</td>
//             <td className="border-l-4 text-center border-[#C0D8F6] p-2">41</td>
//             <td className="border-l-4 text-center border-[#C0D8F6] p-2">
//               35500.00
//             </td>
//             <td className="border-l-4 text-center border-[#C0D8F6] p-2">
//               3500.00
//             </td>
//             <td className="border-l-4 text-center border-[#C0D8F6] p-2">
//               32000.00
//             </td>
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

//       {/* Totals */}
//       <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between px-[24px] rounded-md">
//         <h1>Total Payment</h1>
//         <h2 className="me-10">32000.00</h2>
//       </div>
//       <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between px-[24px] mt-[16px] rounded-md">
//         <h1>Total TDS</h1>
//         <h2 className="me-10">3200.00</h2>
//       </div>
//       <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between px-[24px] mt-[16px] rounded-md">
//         <h1>Total Net Pay</h1>
//         <h2 className="me-10">28800.00</h2>
//       </div>
//     </div>
//   );
// }

// export default StaffPaymentsTable;





// "use client";

// import useStaffPaymentsStore from "@/app/lib/store/useStaffPaymentsStore";
// import Link from "next/link";
// import React, { useEffect } from "react";

// function StaffPaymentsTable() {
//   const {
//     year,
//     month,
//     category,
//     loading,
//     error,
//     report,
//     setYear,
//     setMonth,
//     setCategory,
//     fetchReport,
//   } = useStaffPaymentsStore();

//   useEffect(() => {
//     fetchReport();
//   }, [year, month, category]);
// console.log(report);

//   return (
//     <div>
//       {/* Filter Section */}
//       <div className="w-full bg-white border border-[#8888888c] text-base text-black flex justify-between items-center px-6 py-4 mt-2 rounded-[15px]">
//         <div className="flex gap-[10px]">
          
//           {/* Year */}
//           <select
//             value={year}
//             onChange={(e) => setYear(Number(e.target.value))}
//             className="w-[192px] h-[40px] rounded-[15px] text-[14px] border border-[#bbbbbb] outline-none px-4"
//           >
//             {Array.from({ length: 5 }).map((_, i) => (
//               <option key={i} value={2023 + i}>
//                 {2023 + i}
//               </option>
//             ))}
//           </select>

//           {/* Month */}
//           <select
//             value={month}
//             onChange={(e) => setMonth(Number(e.target.value))}
//             className="w-[192px] h-[40px] rounded-[15px] text-[14px] border border-[#bbbbbb] outline-none px-4"
//           >
//             {[
//               "January","February","March","April","May","June",
//               "July","August","September","October","November","December",
//             ].map((m, i) => (
//               <option key={i} value={i + 1}>
//                 {m}
//               </option>
//             ))}
//           </select>

//           {/* Category */}
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-[192px] h-[40px] rounded-[15px] text-[14px] border border-[#bbbbbb] outline-none px-4"
//           >
//             <option value="all">All</option>
//             <option value="REG_NURSES">Regd Nurse</option>
//             <option value="NURSING_ASSISTANTS">Assistant Nurse</option>
//             <option value="TECHNICIANS">Technicians</option>
//             <option value="THERAPY">Therapy</option>
//             <option value="ANCILLARY">Ancillary Pros</option>
//           </select>
//         </div>

//         <h1 className="text-black text-[16px] font-semibold">
//           {year}, {[
//             "January","February","March","April","May","June",
//             "July","August","September","October","November","December",
//           ][month - 1]}
//         </h1>
//       </div>

//       {/* Loading */}
//       {loading && <p className="text-center py-4">Loading...</p>}

//       {/* Error */}
//       {error && <p className="text-center text-red-600 py-4">{error}</p>}

//       {/* Table */}
//       {!loading && report && (
//         <>
//           <table className="w-full border-spacing-y-2 border-separate text-black mt-2">
//             <thead className="bg-[#C0D8F6]">
//               <tr>
//                 <th className="text-base rounded-l-2xl p-2">Staff Name</th>
//                 <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//                   Working Days
//                 </th>
//                 <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//                   Duties
//                 </th>
//                 <th className="text-base border-l-4 border-[#F0F4F9] p-2">Payment</th>
//                 <th className="text-base border-l-4 border-[#F0F4F9] p-2">TDS</th>
//                 <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
//                   Net Pay
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {report.data?.map((row) => (
//                 <tr
//                   key={row.staffId}
//                   className="bg-white cursor-pointer hover:bg-[#E8F1FD] transition"
//                 >
//                   <td className="p-2 text-center">
//                     <Link
//                       href={`/controlpanel/billing/staff-payment-details?id=${row.staffId}`}
//                       className="block w-full h-full"
//                     >
//                       {row.staffName}
//                     </Link>
//                   </td>

//                   <td className="border-l-4 text-center border-[#C0D8F6] p-2">
//                     {row.totalWorkingDays}
//                   </td>

//                   <td className="border-l-4 text-center border-[#C0D8F6] p-2">
//                     {row.totalDuties}
//                   </td>

//                   <td className="border-l-4 text-center border-[#C0D8F6] p-2">
//                     {row.totalPayment}
//                   </td>

//                   <td className="border-l-4 text-center border-[#C0D8F6] p-2">
//                     {row.tds}
//                   </td>

//                   <td className="border-l-4 text-center border-[#C0D8F6] p-2">
//                     {row.netPay}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Totals */}
//           <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between px-[24px] rounded-md mt-4">
//             <h1>Total Payment</h1>
//             <h2 className="me-10">{report.totalPayment}</h2>
//           </div>

//           <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between px-[24px] mt-[16px] rounded-md">
//             <h1>Total TDS</h1>
//             <h2 className="me-10">{report.totalTds}</h2>
//           </div>

//           <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between px-[24px] mt-[16px] rounded-md">
//             <h1>Total Net Pay</h1>
//             <h2 className="me-10">{report.totalNetPay}</h2>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default StaffPaymentsTable;


// "use client";

// import useStaffPaymentsStore from "@/app/lib/store/useStaffPaymentsStore";
// import Link from "next/link";
// import React, { useEffect } from "react";

// function StaffPaymentsTable() {
//   const {
//     year,
//     month,
//     category,
//     loading,
//     error,
//     report,
//     setYear,
//     setMonth,
//     setCategory,
//     fetchReport,
//   } = useStaffPaymentsStore();

//   useEffect(() => {
//     fetchReport();
//   }, [year, month, category]);
// console.log(report);

//   const categories = [
//     { label: "ALL", value: "all" },
//     { label: "Regd Nurse", value: "REG_NURSES" },
//     { label: "Assistant Nurse", value: "NURSING_ASSISTANTS" },
//     { label: "Technicians", value: "TECHNICIANS" },
//     { label: "Therapy", value: "THERAPY" },
//     { label: "Ancillary Pros", value: "ANCILLARY" },
//   ];

//   return (
//     <div>
//       {/* Year + Month Filter */}
//       <div className="w-full bg-white border border-[#8888888c] text-base text-black flex justify-between items-center px-6 py-4 mt-2 rounded-[15px]">

//         <div className="flex gap-[10px]">

//           {/* Year */}
//           <select
//             value={year}
//             onChange={(e) => setYear(Number(e.target.value))}
//             className="w-[192px] h-[40px] rounded-[15px] text-[14px] border border-[#bbbbbb] outline-none px-4"
//           >
//             {Array.from({ length: 5 }).map((_, i) => (
//               <option key={i} value={2023 + i}>
//                 {2023 + i}
//               </option>
//             ))}
//           </select>

//           {/* Month */}
//           <select
//             value={month}
//             onChange={(e) => setMonth(Number(e.target.value))}
//             className="w-[192px] h-[40px] rounded-[15px] text-[14px] border border-[#bbbbbb] outline-none px-4"
//           >
//             {[
//               "January", "February", "March", "April", "May", "June",
//               "July", "August", "September", "October", "November", "December",
//             ].map((m, i) => (
//               <option key={i} value={i + 1}>
//                 {m}
//               </option>
//             ))}
//           </select>

//         </div>

//         <h1 className="text-black text-[16px] font-semibold">
//           {year},{" "}
//           {[
//             "January", "February", "March", "April", "May", "June",
//             "July", "August", "September", "October", "November", "December",
//           ][month - 1]}
//         </h1>
//       </div>

//       {/* Category Tabs */}
//       <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex gap-[40px] px-6 pt-6 rounded-[15px] mt-4">
//         {categories.map((tab, i) => (
//           <p
//             key={i}
//             onClick={() => setCategory(tab.value)}
//             className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4
//               ${category === tab.value ? "border-b-8 border-[#3674B5]" : ""}
//             `}
//           >
//             {tab.label}
//           </p>
//         ))}
//       </div>

//       {/* Loading */}
//       {loading && <p className="text-center py-4">Loading...</p>}

//       {/* Error */}
//       {error && <p className="text-center text-red-600 py-4">{error}</p>}

//       {/* Table */}
//       {!loading && report && (
//         <>
//           <table className="w-full border-spacing-y-2 border-separate text-black mt-4">
//             <thead className="bg-[#C0D8F6]">
//               <tr>
//                 <th className="text-base rounded-l-2xl p-2">Staff Name</th>
//                 <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//                   Working Days
//                 </th>
//                 <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//                   Duties
//                 </th>
//                 <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//                   Payment
//                 </th>
//                 <th className="text-base border-l-4 border-[#F0F4F9] p-2">TDS</th>
//                 <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
//                   Net Pay
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {report.payments?.map((row) => (
//                 <tr
//                   key={row.staffId}
//                   className="bg-white cursor-pointer hover:bg-[#E8F1FD] transition"
//                 >
//                   <td className="p-2 text-center">
//                     <Link
//                       href={`/controlpanel/billing/staff-payment-details?id=${row.staffId}`}
//                       className="block w-full h-full"
//                     >
//                       {row.staffName}
//                     </Link>
//                   </td>

//                   <td className="border-l-4 text-center border-[#C0D8F6] p-2">
//                     {row.workingDays}
//                   </td>

//                   <td className="border-l-4 text-center border-[#C0D8F6] p-2">
//                     {row.duties}
//                   </td>

//                   <td className="border-l-4 text-center border-[#C0D8F6] p-2">
//                     {row.payment}
//                   </td>

//                   <td className="border-l-4 text-center border-[#C0D8F6] p-2">
//                     {row.tds}
//                   </td>

//                   <td className="border-l-4 text-center border-[#C0D8F6] p-2">
//                     {row.netPay}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Totals */}
//           <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between px-[24px] rounded-md mt-4">
//             <h1>Total Payment</h1>
//             <h2 className="me-10">{report.totals?.totalPayment}</h2>
//           </div>

//           <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between px-[24px] mt-[16px] rounded-md">
//             <h1>Total TDS</h1>
//             <h2 className="me-10">{report.totals?.totalTds}</h2>
//           </div>

//           <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between px-[24px] mt-[16px] rounded-md">
//             <h1>Total Net Pay</h1>
//             <h2 className="me-10">{report.totals?.totalNetPay}</h2>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default StaffPaymentsTable;





"use client";

import useStaffPaymentsStore from "@/app/lib/store/useStaffPaymentsStore";
import Link from "next/link";
import React, { useEffect } from "react";

function StaffPaymentsTable() {
  const {
    year,
    month,
    category,
    loading,
    error,
    report,
    setYear,
    setMonth,
    setCategory,
    fetchReport,
  } = useStaffPaymentsStore();

  useEffect(() => {
    fetchReport();
  }, [year, month, category]);

  const categories = [
    { label: "ALL", value: "all" },
    { label: "Regd Nurse", value: "REG_NURSES" },
    { label: "Assistant Nurse", value: "NURSING_ASSISTANTS" },
    { label: "Technicians", value: "TECHNICIANS" },
    { label: "Therapy", value: "THERAPY" },
    { label: "Ancillary Pros", value: "ANCILLARY" },
  ];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <div>
      {/* Year + Month Filter */}
        <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex gap-[40px] px-6 pt-6 rounded-[15px] mt-4">
        {categories.map((tab, i) => (
          <p
            key={i}
            onClick={() => setCategory(tab.value)}
            className={`h-full box-border flex justify-center items-center text-base cursor-pointer px-2 pb-4
              ${category === tab.value ? "border-b-8 border-[#3674B5]" : ""}
            `}
          >
            {tab.label}
          </p>
        ))}
      </div>
      <div className="w-full bg-white border border-[#8888888c] text-base text-black flex justify-between items-center px-6 py-4 mt-2 rounded-[15px]">

        <div className="flex gap-[10px]">

          {/* Year Select */}
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-[192px] h-[40px] rounded-[15px] text-[14px] border border-[#bbbbbb] outline-none px-4"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <option key={i} value={2023 + i}>
                {2023 + i}
              </option>
            ))}
          </select>

          {/* Month Select */}
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="w-[192px] h-[40px] rounded-[15px] text-[14px] border border-[#bbbbbb] outline-none px-4"
          >
            {monthNames.map((m, i) => (
              <option key={i} value={i + 1}>
                {m}
              </option>
            ))}
          </select>

        </div>

        <h1 className="text-black text-[16px] font-semibold">
          {year}, {monthNames[month - 1]}
        </h1>
      </div>

      {/* Category Tabs */}
    

      {/* Loading */}
      {loading && <p className="text-center py-4">Loading...</p>}

      {/* Error */}
      {error && <p className="text-center text-red-600 py-4">{error}</p>}

      {/* Table Data */}
      {!loading && report && (
        <>
          <table className="w-full border-spacing-y-2 border-separate text-black mt-4">
            <thead className="bg-[#C0D8F6]">
              <tr>
                <th className="text-base rounded-l-2xl p-2">Staff Name</th>
                <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                  Working Days
                </th>
                <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                  Duties
                </th>
                <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                  Payment
                </th>
                <th className="text-base border-l-4 border-[#F0F4F9] p-2">TDS</th>
                <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
                  Net Pay
                </th>
              </tr>
            </thead>

            <tbody>
              {report.payments?.map((row) => (
                <tr
                  key={row.staffId}
                  className="bg-white cursor-pointer hover:bg-[#E8F1FD] transition"
                >
                  <td className="p-2 text-center">
                    <Link
                      href={`/controlpanel/billing/staff-payment-details?id=${row.staffId}`}
                      className="block w-full h-full"
                    >
                      {row.staffName}
                    </Link>
                  </td>

                  <td className="border-l-4 text-center border-[#C0D8F6] p-2">
                    {row.workingDays}
                  </td>

                  <td className="border-l-4 text-center border-[#C0D8F6] p-2">
                    {row.duties}
                  </td>

                  <td className="border-l-4 text-center border-[#C0D8F6] p-2">
                    {row.payment}
                  </td>

                  <td className="border-l-4 text-center border-[#C0D8F6] p-2">
                    {row.tds}
                  </td>

                  <td className="border-l-4 text-center border-[#C0D8F6] p-2">
                    {row.netPay}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between px-[24px] rounded-md mt-4">
            <h1>Total Payment</h1>
            <h2 className="me-10">{report.totals?.totalPayment}</h2>
          </div>

          <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between px-[24px] mt-[16px] rounded-md">
            <h1>Total TDS</h1>
            <h2 className="me-10">{report.totals?.totalTds}</h2>
          </div>

          <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between px-[24px] mt-[16px] rounded-md">
            <h1>Total Net Pay</h1>
            <h2 className="me-10">{report.totals?.totalNetPay}</h2>
          </div>
        </>
      )}
    </div>
  );
}

export default StaffPaymentsTable;
