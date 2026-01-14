"use client";

import React, { useEffect } from "react";
import Navlink from "@/components/ledgerManagement/Navlink";
import useLedgerStore from "@/app/lib/store/useLedgerStore";

function Page() {
  const {
    loading,
    error,
    report, // ✅ FIX
    year,
    month,
    setYear,
    setMonth,
    fetchReport,
  } = useLedgerStore();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    fetchReport();
  }, [year, month]);

  // ✅ FIXED DATA ACCESS
  const bills = report?.rows || [];
  const summary = report?.totals || {};

  return (
    <div>
      <Navlink />

      {/* -------- FILTER BAR -------- */}
      <div className="w-full bg-white border border-[#8888888c]  flex justify-between items-center px-6 py-4 mt-2 rounded-[15px]">
        <div className="flex gap-3">
          {/* YEAR */}
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-[192px] h-[40px] rounded-[15px] border border-[#8888888c]  px-4"
          >
            {[2023, 2024, 2025, 2026, 2027,2028,2029,230,2031,2032,2033,2034,2035].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          {/* MONTH */}
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-[192px] h-[40px] rounded-[15px] border border-[#8888888c]  px-4"
          >
            {monthNames.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <h1 className="font-semibold">
          {year}, {month}
        </h1>
      </div>

      {/* -------- SUMMARY -------- */}
      <div className="w-full h-[104px] rounded-[15px] bg-white mt-2 flex justify-between">
        {[
          { label: "Total Patients", value: summary.totalPatients },
          { label: "Total Services", value: summary.totalServices },
          { label: "Billing", value: summary.totalPayment },
          { label: "Net Revenue", value: summary.totalNetPay },
        ].map((item, i) => (
          <div key={i} className="py-6 px-9 font-semibold">
            <p className="text-[16px]">{item.label}</p>
            <p className="text-[24px] text-center">{item.value ?? 0}</p>
          </div>
        ))}
      </div>

      {/* -------- LOADING -------- */}
      {loading && <p className="text-center py-4">Loading...</p>}

      {/* -------- ERROR -------- */}
      {error && <p className="text-center text-red-600 py-4">{error}</p>}

      {/* -------- TABLE -------- */}
      {!loading && bills.length > 0 && (
        <>
          <table className="w-full border-separate border-spacing-y-2 mt-4">
            <thead className="bg-[#C0D8F6]">
              <tr>
                <th className="rounded-l-2xl p-2 border-[#F0F4F9]">
                  Patient Name
                </th>
                <th className="border-l-4 p-2 border-[#F0F4F9]">
                  Service Type
                </th>
                <th className="border-l-4 p-2 border-[#F0F4F9]">Payment</th>
                <th className="border-l-4 p-2 border-[#F0F4F9]">Discount</th>
                <th className="border-l-4 rounded-r-2xl p-2 border-[#F0F4F9]">
                  Net Pay
                </th>
              </tr>
            </thead>

            <tbody>
              {bills.map((row) => (
                <tr key={row.patientId} className="bg-white hover:bg-[#E8F1FD]">
                  <td className="p-2 text-center">{row.patientName}</td>
                  <td className="border-l-4 border-[#C0D8F6] text-center p-2">
                    {row.serviceTypeName}
                  </td>
                  <td className="border-l-4 border-[#C0D8F6] text-center p-2">
                    ₹{row.payment}
                  </td>
                  <td className="border-l-4 border-[#C0D8F6] text-center p-2">
                    ₹{row.discount}
                  </td>
                  <td className="border-l-4 border-[#C0D8F6] text-center p-2">
                    ₹{row.netPay}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* -------- TOTALS -------- */}
          <div className="h-[48px] bg-[#C0D8F6] flex justify-between items-center px-6 rounded-md mt-4 font-semibold">
            <span>Total Payment</span>
            <span>₹{summary.totalPayment ?? 0}</span>
          </div>

          <div className="h-[48px] bg-[#C0D8F6] flex justify-between items-center px-6 rounded-md mt-4 font-semibold">
            <span>Total Discount</span>
            <span>₹{summary.totalDiscount ?? 0}</span>
          </div>

          <div className="h-[48px] bg-[#C0D8F6] flex justify-between items-center px-6 rounded-md mt-4 font-semibold">
            <span>Total Net Pay</span>
            <span>₹{summary.totalNetPay ?? 0}</span>
          </div>
        </>
      )}

      {!loading && bills.length === 0 && (
        <p className="text-center py-6 text-gray-500">No records found</p>
      )}
    </div>
  );
}

export default Page;