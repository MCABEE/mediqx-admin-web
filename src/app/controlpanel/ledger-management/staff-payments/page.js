
"use client";

import React, { useEffect } from "react";
import Navlink from "@/components/ledgerManagement/Navlink";
import useStaffPaymentsStore from "@/app/lib/store/useStaffPaymentsStore";

function Page() {
  const {
    year,
    month,
    category,
    report,
    loading,
    error,
    setYear,
    setMonth,
    setCategory,
    fetchReport,
  } = useStaffPaymentsStore();

  useEffect(() => {
    fetchReport();
  }, [year, month, category]);

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

  const categories = [
    { label: "Select categories", value: "" },
    { label: "Registered Nurses", value: "REG_NURSES" },
    { label: "Assistant Nurses", value: "NURSING_ASSISTANTS" },
    { label: "Technicians", value: "TECHNICIANS" },
    { label: "Therapy", value: "THERAPY" },
    { label: "Ancillary", value: "ANCILLARY" },
    { label: "Doctors", value: "DOCTORS" },
  ];

  return (
    <div>
      <Navlink />

      {/* Filters */}
      <div className="w-full bg-white border border-[#8888888c] flex justify-between items-center px-6 py-4 mt-2 rounded-[15px]">
        <div className="flex gap-[10px]">
          {/* Year */}
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-[192px] h-[40px] rounded-[15px] border border-[#bbbbbb] px-4"
          >
            {[2023, 2024, 2025, 2026,2027,2028,2029,2030,2031,2032,2033,2034,2035].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          {/* Month */}
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="w-[192px] h-[40px] rounded-[15px] border border-[#bbbbbb] px-4"
          >
            {monthNames.map((m, i) => (
              <option key={i} value={i + 1}>
                {m}
              </option>
            ))}
          </select>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-[192px] h-[40px] rounded-[15px] border border-[#bbbbbb] px-4"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <h1 className="text-[16px] font-semibold">
          {year}, {monthNames[month - 1]}
        </h1>
      </div>

      {/* Loading */}
      {loading && <p className="text-center py-6">Loading...</p>}

      {/* Error */}
      {error && <p className="text-center text-red-600 py-6">{error}</p>}

      {/* Table */}
      {!loading && report && (
        <>
          <table className="w-full border-separate border-spacing-y-2 mt-4">
            <thead className="bg-[#C0D8F6]">
              <tr>
                <th className="rounded-l-2xl p-2">Staff Name</th>
                <th className="border-l-4 border-[#F0F4F9] p-2">
                  Working Days
                </th>
                <th className="border-l-4 border-[#F0F4F9] p-2">Duties</th>
                <th className="border-l-4 border-[#F0F4F9] p-2">Payment</th>
                <th className="border-l-4 border-[#F0F4F9] p-2">TDS</th>
                <th className="border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
                  Net Pay
                </th>
              </tr>
            </thead>

            <tbody>
              {report.payments?.map((row) => (
                <tr key={row.staffId} className="bg-white hover:bg-[#E8F1FD]">
                  <td className="p-2 text-center">{row.staffName}</td>
                  <td className="border-l-4 border-[#C0D8F6] p-2 text-center">
                    {row.workingDays}
                  </td>
                  <td className="border-l-4 border-[#C0D8F6] p-2 text-center">
                    {row.duties}
                  </td>
                  <td className="border-l-4 border-[#C0D8F6] p-2 text-center">
                    ₹{row.payment}
                  </td>
                  <td className="border-l-4 border-[#C0D8F6] p-2 text-center">
                    ₹{row.tds}
                  </td>
                  <td className="border-l-4 border-[#C0D8F6] p-2 text-center">
                    ₹{row.netPay}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="bg-[#C0D8F6] flex justify-between px-6 py-3 mt-4 rounded-md font-semibold">
            <span>Total Payment</span>
            <span>₹{report.totals?.totalPayment}</span>
          </div>

          <div className="bg-[#C0D8F6] flex justify-between px-6 py-3 mt-4 rounded-md font-semibold">
            <span>Total TDS</span>
            <span>₹{report.totals?.totalTds}</span>
          </div>

          <div className="bg-[#C0D8F6] flex justify-between px-6 py-3 mt-4 rounded-md font-semibold">
            <span>Total Net Pay</span>
            <span>₹{report.totals?.totalNetPay}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default Page;