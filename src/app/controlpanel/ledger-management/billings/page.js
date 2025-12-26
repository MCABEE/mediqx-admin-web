"use client";

import useStaffPaymentsStore from "@/app/lib/store/useStaffPaymentsStore";
import Navlink from "@/components/ledgerManagement/Navlink";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const router = useRouter();

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

  return (
    <div>
<Navlink/>
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

      <div className="w-full h-[104px] rounded-[15px] bg-white mt-2 flex justify-between">
        <div className="text-black font-semibold py-[24px] px-[37px]">
          <p className=" text-[16px]">Total Patients</p>
          <p className="text-[24px] text-center">125</p>
        </div>
        <div className="text-[#3674B5] font-semibold py-[24px] px-[37px]">
          <p className=" text-[16px]">Billing</p>
          <p className="text-[24px] text-center">125</p>
        </div>
        <div className="text-black font-semibold py-[24px] px-[37px]">
          <p className=" text-[16px]">Discounts</p>
          <p className="text-[24px] text-center">125</p>
        </div>
        <div className="text-black font-semibold py-[24px] px-[37px]">
          <p className=" text-[16px]">Net Revenue</p>
          <p className="text-[24px] text-center">125</p>
        </div>
      </div>

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
                <th className="text-base rounded-l-2xl p-2">Patient Name</th>
                <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                  Service Type
                </th>
                <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                  Payment
                </th>
                <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                  Discount
                </th>
                <th className="text-base border-l-4 rounded-r-2xl border-[#F0F4F9] p-2">
                  Net Pay
                </th>
              </tr>
            </thead>

            <tbody>
              {report.payments?.map((row) => (
                <tr
                  key={row.staffId}
                  className="bg-white cursor-pointer  hover:bg-[#E8F1FD] transition"
                  onClick={() =>
                    router.push(
                      `/controlpanel/billing/staff-payment-details/${row.staffId}?year=${year}&month=${month}`
                    )
                  }
                >
                  <td className="p-2 text-center">{row.staffName}</td>

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

export default page;