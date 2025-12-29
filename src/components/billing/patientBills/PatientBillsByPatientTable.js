// import Link from 'next/link'
// import React from 'react'

// function PatientBillsByPatientTable() {
//   return (
//     <div>
//           {/* Table */}
//       <table className="w-full border-spacing-y-2 border-separate text-black mt-2">
//         <thead className="bg-[#C0D8F6]">
//           <tr>
//             <th className="text-base rounded-l-2xl p-2">Patient Name</th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               Services
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               Payment
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               Discount
//             </th>
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
//                 href="/controlpanel/billing/patient-bills/patient-bills-details"
//                 className="block w-full h-full"
//               >
//                 George Thomas
//               </Link>
//             </td>
//             <td className="border-l-4 text-center border-[#C0D8F6] p-2">24</td>
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
//     </div>
//   )
// }

// export default PatientBillsByPatientTable










"use client";

import usePatientBillsStore from "@/app/lib/store/patientBillingStore";
import Link from "next/link";
import { useEffect } from "react";

export default function PatientBillsByPatientTable() {
  const { bills, fetchBills, page, totalPages, loading } =
    usePatientBillsStore();

  useEffect(() => {
    fetchBills(1);
  }, []);

  return (
    <div>
      {/* TABLE */}
      <table className="w-full border-spacing-y-2 border-separate text-black mt-2">
        <thead className="bg-[#C0D8F6]">
          <tr>
            <th className="p-2">Patient Name</th>
            <th className="p-2">Services</th>
            <th className="p-2">Payment</th>
            <th className="p-2">Discount</th>
            <th className="p-2">Net Pay</th>
          </tr>
        </thead>

        <tbody>
          {bills.map((item) => (
            <tr
              key={item.patientId}
              className="bg-white hover:bg-[#E8F1FD] transition"
            >
              <td className="p-2">
                <Link
                  href={`/controlpanel/billing/patient-bills/patient-bills-details/${item.patientId}`}
                  className="text-blue-600 hover:underline"
                >
                  {item.patientName}
                </Link>
              </td>
              <td className="p-2 text-center">{item.servicesCount}</td>
              <td className="p-2 text-center">{item.payment}</td>
              <td className="p-2 text-center">{item.discount}</td>
              <td className="p-2 text-center">{item.netPay}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => fetchBills(page - 1)}
          className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => fetchBills(page + 1)}
          className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
