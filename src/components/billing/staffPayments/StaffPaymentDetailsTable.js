// import React from 'react'

// function StaffPaymentDetailsTable() {
//   return (
//     <div>

//       <div className="px-[38px] mt-4 flex justify-between">
//         <div>
//             <h1 className="text-black font-semibold text-[20px]">
//             George Thomas
//         </h1>
//         <p className="text-black font-semibold">Regd Nurse</p>
//         </div>
//         <h1 className="text-black font-semibold text-[20px]">
//             2025, November
//         </h1>
//       </div>
//          {/* Table */}
//       <table className="w-full border-spacing-y-2 border-separate text-black mt-2">
//         <thead className="bg-[#C0D8F6]">
//           <tr>
//             <th className="text-base rounded-l-2xl p-2">Date</th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               Assigned Duty
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               Starting
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               Ending
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

//                 01,sunday

//             </td>
//             <td className="border-l-4 text-center border-[#C0D8F6] p-2">24 Hrs</td>
//             <td className="border-l-4 text-center border-[#C0D8F6] p-2">07.00 AM</td>
//             <td className="border-l-4 text-center border-[#C0D8F6] p-2">
//               08.10 PM
//             </td>
//             <td className="border-l-4 text-center border-[#C0D8F6] p-2">
//               3500.00
//             </td>
//             <td className="border-l-4 text-center border-[#C0D8F6] p-2">
//               32000.00
//             </td>
//           </tr>
//           <tr className="bg-white cursor-pointer hover:bg-[#E8F1FD] transition">
//             <td className="p-2 text-center">

//                 01,sunday

//             </td>
//             <td className="border-l-4 text-center border-[#C0D8F6] p-2">24 Hrs</td>
//             <td className="border-l-4 text-center border-[#C0D8F6] p-2">07.00 AM</td>
//             <td className="border-l-4 text-center border-[#C0D8F6] p-2">
//               08.10 PM
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
//   )
// }

// export default StaffPaymentDetailsTable

// "use client";

// import useStaffPaymentsStore from "@/app/lib/store/useStaffPaymentsStore";
// import { useParams } from "next/navigation";
// import React, { useEffect } from "react";

// function StaffPaymentDetailsTable() {
//   const { id: userId } = useParams();
//   console.log(userId);

//   const {
//     details,
    
//     loading,
//     error,
//     setUserId,
    
//     loadDetails,
//   } = useStaffPaymentsStore();

//   // Load data when ID or page changes
//   useEffect(() => {
//     if (userId) {
//       setUserId(userId);
//       loadDetails();
//     }
//   }, [userId]);
//   console.log(details);

 
//   const rows = details?.payments || [];
//   const totals = details?.totals;

//   return (
//     <div className=" mt-4">
//       {/* Loading */}
//       {loading && <p className="text-center py-4">Loading...</p>}

//       {/* Error */}
//       {error && <p className="text-center text-red-600 py-4">{error}</p>}

//       {/* Staff Header */}
//       {details && (
//         <div className="flex justify-between mb-4 px-10">
//           <div>
//             <h1 className="text-black font-semibold text-[20px]">
//               {details.staffName}
//             </h1>
//             <p className="text-black font-semibold pt-2">{details.role}</p>
//           </div>
//           {/* <h1 className="text-black font-semibold text-[20px]">
//             {details?.year}, {details?.month}
//           </h1> */}
//         </div>
//       )}

//       {/* Table */}
//       <table className="w-full border-spacing-y-2 border-separate text-black mt-2">
//         <thead className="bg-[#C0D8F6]">
//           <tr>
//             <th className="text-base rounded-l-2xl p-2">Date</th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               Assigned Duty
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               Starting
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               Ending
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
//               Net Pay
//             </th>
//           </tr>
//         </thead>

//         <tbody>
//           {rows.map((row, i) => (
//             <tr key={i} className="bg-white hover:bg-[#E8F1FD] transition">
//               <td className="p-2 text-center">{row.date}</td>
//               <td className="border-l-4 border-[#C0D8F6] p-2 text-center">
//                 {row.assignedDuty}
//               </td>
//               <td className="border-l-4 border-[#C0D8F6] p-2 text-center">
//                 {new Date(row.startTime).toLocaleTimeString("en-IN", {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </td>
//               <td className="border-l-4 border-[#C0D8F6] p-2 text-center">
//                 {new Date(row.endTime).toLocaleTimeString("en-IN", {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </td>
//               <td className="border-l-4 border-[#C0D8F6] p-2 text-center">
//                 {row.netPay}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

    

//       {/* Totals */}
//       {totals && (
//         <>
//         <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between px-[24px] rounded-md">
//             <h1>Total Duties</h1>
//             <h2 className="me-10">{totals.totalDuties}</h2>
//           </div>
//           <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between mt-[16px]  px-[24px] rounded-md">
//             <h1>Total Payment</h1>
//             <h2 className="me-10">{totals.totalPayment}</h2>
//           </div>

//           <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between px-[24px] mt-[16px] rounded-md">
//             <h1>Total TDS</h1>
//             <h2 className="me-10">{totals.totalTds}</h2>
//           </div>

//           <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between px-[24px] mt-[16px] rounded-md">
//             <h1>Total Net Pay</h1>
//             <h2 className="me-10">{totals.totalNetPay}</h2>
//           </div>
//         </>
//       )}
//       <button className="w-[240px] h-[48px] rounded-[12px] font-semibold text-black bg-[#FFC8AB] mt-[16px] ">
//         Download Report
//       </button>
//     </div>
//   );
// }

// export default StaffPaymentDetailsTable;













"use client";

import useStaffPaymentsStore from "@/app/lib/store/useStaffPaymentsStore";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function StaffPaymentDetailsTable() {
  const { id: userId } = useParams();
  const {
    details,
    loading,
    error,
    setUserId,
    loadDetails,
  } = useStaffPaymentsStore();

  useEffect(() => {
    if (userId) {
      setUserId(userId);
      loadDetails();
    }
  }, [userId]);

  const rows = details?.payments || [];
  const totals = details?.totals;

  // -----------------------------------------------------
  // ✅ PDF Download Function
  // -----------------------------------------------------
  const downloadPdf = () => {
    if (!details) return;

    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("Staff Payment Report", 14, 15);

    // Staff Details
    doc.setFontSize(12);
    doc.text(`Name: ${details.staffName}`, 14, 25);
    doc.text(`Role: ${details.role}`, 14, 32);

    // Table Data
    const tableRows = rows.map((row) => [
      row.date,
      row.assignedDuty,
      new Date(row.startTime).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      new Date(row.endTime).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      row.netPay,
    ]);

    autoTable(doc, {
      head: [["Date", "Duty", "Start", "End", "Net Pay"]],
      body: tableRows,
      startY: 40,
    });

    // Totals Section
    let finalY = doc.lastAutoTable.finalY + 10;

    doc.text("Totals:", 14, finalY);

    doc.text(
      `Total Duties: ${totals.totalDuties}`,
      14,
      (finalY += 8)
    );
    doc.text(
      `Total Payment: ${totals.totalPayment}`,
      14,
      (finalY += 8)
    );
    doc.text(
      `Total TDS: ${totals.totalTds}`,
      14,
      (finalY += 8)
    );
    doc.text(
      `Total Net Pay: ${totals.totalNetPay}`,
      14,
      (finalY += 8)
    );

    // Save PDF
    doc.save(`${details.staffName}_payment_report.pdf`);
  };

  // -----------------------------------------------------
  // UI
  // -----------------------------------------------------

  return (
    <div className="mt-4">

      {loading && <p className="text-center py-4">Loading...</p>}
      {error && <p className="text-center text-red-600 py-4">{error}</p>}

      {details && (
        <div className="flex justify-between mb-4 px-10">
          <div>
            <h1 className="text-black font-semibold text-[20px]">
              {details.staffName}
            </h1>
            <p className="text-black font-semibold pt-2">{details.role}</p>
          </div>
        </div>
      )}

      {/* TABLE */}
      <table className="w-full border-spacing-y-2 border-separate text-black mt-2">
        <thead className="bg-[#C0D8F6]">
          <tr>
            <th className="text-base rounded-l-2xl p-2">Date</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Assigned Duty
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Starting
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Ending
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
              Net Pay
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="bg-white hover:bg-[#E8F1FD] transition">
              <td className="p-2 text-center">{row.date}</td>

              <td className="border-l-4 border-[#C0D8F6] p-2 text-center">
                {row.assignedDuty}
              </td>

              <td className="border-l-4 border-[#C0D8F6] p-2 text-center">
                {new Date(row.startTime).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>

              <td className="border-l-4 border-[#C0D8F6] p-2 text-center">
                {new Date(row.endTime).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>

              <td className="border-l-4 border-[#C0D8F6] p-2 text-center">
                {row.netPay}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTALS */}
      {totals && (
        <>
          <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between px-[24px] rounded-md mt-4">
            <h1>Total Duties</h1>
            <h2 className="me-10">{totals.totalDuties}</h2>
          </div>

          <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between px-[24px] rounded-md mt-4">
            <h1>Total Payment</h1>
            <h2 className="me-10">{totals.totalPayment}</h2>
          </div>

          <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between px-[24px] rounded-md mt-4">
            <h1>Total TDS</h1>
            <h2 className="me-10">{totals.totalTds}</h2>
          </div>

          <div className="h-[48px] bg-[#C0D8F6] text-[16px] font-semibold text-black flex items-center justify-between px-[24px] rounded-md mt-4">
            <h1>Total Net Pay</h1>
            <h2 className="me-10">{totals.totalNetPay}</h2>
          </div>
        </>
      )}

      {/* DOWNLOAD BUTTON */}
      <button
        onClick={downloadPdf}
        className="w-[240px] h-[48px] rounded-[12px] font-semibold text-black bg-[#FFC8AB] cursor-pointer hover:bg-[#f5c4a9] mt-[16px]"
      >
        Download Report
      </button>
    </div>
  );
}

export default StaffPaymentDetailsTable;
