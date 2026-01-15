"use client";

import React, { useEffect } from "react";
import Navlink from "@/components/ledgerManagement/Navlink";
import useLedgerStore from "@/app/lib/store/useLedgerStore";

export default function Page() {
  const {
    loading,
    error,
    data,
    year,
    month,
    filter,
    page,
    totalPages,
    setYear,
    setMonth,
    setFilter,
    setPage,
    fetchBookingSales,
  } = useLedgerStore();

  /* ---------------- SAFE DATA ---------------- */
  const bills = data?.bills || []; // from data.items
  const summary = data?.summary || {};
  const counts = data?.counts || {};

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
    setFilter("ALL");
    setPage(1);
  }, []);
  /* Set default filter on load */

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    fetchBookingSales();
  }, [year, month, filter, page]);

  return (
    <div className="mb-4">
      <Navlink />

      {/* ================= FILTER BAR ================= */}
      <div className="w-full bg-white border border-[#8888888c] flex justify-between items-center px-6 py-4 mt-2 rounded-[15px]">
        <div className="flex gap-3">
          {/* YEAR */}
          <select
            value={year}
            onChange={(e) => {
              setPage(1);
              setYear(Number(e.target.value));
            }}
            className="w-[192px] h-[40px] rounded-[15px] border border-[#8888888c] px-4 outline-none"
          >
            {[
              2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033,
              2034, 2035,
            ].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          {/* MONTH */}
          <select
            value={month}
            onChange={(e) => {
              setPage(1);
              setMonth(e.target.value);
            }}
            className="w-[192px] h-[40px] rounded-[15px] border border-[#8888888c] px-4 outline-none"
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

      {/* ================= SUMMARY TABS ================= */}
      <div className="w-full h-[104px] bg-white mt-2 flex rounded-[15px] cursor-pointer">
        {[
          { label: "Total Bookings", value: "ALL", count: counts.total },
          { label: "Sold", value: "SOLD", count: counts.sold },
          { label: "Cancelled", value: "CANCELLED", count: counts.cancelled },
          { label: "On Hold", value: "ON_HOLD", count: counts.onHold },
        ].map((tab) => (
          <div
            key={tab.value}
            onClick={() => {
              setPage(1);
              setFilter(tab.value);
            }}
            className={`py-6 px-9 font-semibold ${
              filter === tab.value ? "text-[#3674B5]" : "text-black"
            }`}
          >
            <p>{tab.label}</p>
            <p className="text-[24px] text-center">{tab.count ?? 0}</p>
          </div>
        ))}
      </div>

      {/* ================= LOADING ================= */}
      {loading && <p className="text-center py-6">Loading...</p>}

      {/* ================= ERROR ================= */}
      {error && <p className="text-center text-red-600 py-6">{error}</p>}

      {/* ================= TABLE ================= */}
      {!loading && bills.length > 0 && (
        <>
          <table className="w-full border-separate border-spacing-y-2 mt-4 text-black">
            <thead className="bg-[#C0D8F6]">
              <tr>
                <th className="rounded-l-2xl p-2">Patient Name</th>
                <th className="border-l-4 border-[#F0F4F9]  p-2">Product</th>
                <th className="border-l-4 border-[#F0F4F9]  p-2">
                  Bill Amount
                </th>
                <th className="border-l-4 border-[#F0F4F9]  p-2">Discount</th>
                <th className="border-l-4  border-[#F0F4F9] rounded-r-2xl p-2">
                  Net Pay
                </th>
              </tr>
            </thead>

            <tbody>
              {bills.map((row, index) => (
                <tr key={index} className="bg-white hover:bg-[#E8F1FD]">
                  <td className="p-2 text-center">{row.patientName}</td>
                  <td className="border-l-4 border-[#C0D8F6] text-center p-2">
                    {row.product?.length > 40
                      ? row.product.slice(0, 40) + "..."
                      : row.product}
                  </td>
                  <td className="border-l-4 border-[#C0D8F6] text-center p-2">
                    ₹{row.billAmount ?? row.payment ?? 0}
                  </td>
                  <td className="border-l-4 border-[#C0D8F6] text-center p-2">
                    ₹{row.discount ?? 0}
                  </td>
                  <td className="border-l-4 border-[#C0D8F6] text-center p-2">
                    ₹{row.netPay ?? 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ================= TOTALS ================= */}
          <div className="h-[48px] bg-[#C0D8F6] flex justify-between items-center px-6 rounded-md mt-4 font-semibold">
            <span>Total Bill Amount</span>
            <span>₹{summary.totalBillAmount ?? 0}</span>
          </div>

          <div className="h-[48px] bg-[#C0D8F6] flex justify-between items-center px-6 rounded-md mt-4 font-semibold">
            <span>Total Discount</span>
            <span>₹{summary.totalDiscount ?? 0}</span>
          </div>

          <div className="h-[48px] bg-[#C0D8F6] flex justify-between items-center px-6 rounded-md mt-4 font-semibold">
            <span>Total Net Pay</span>
            <span>₹{summary.totalNetPay ?? 0}</span>
          </div>

          {/* ================= PAGINATION ================= */}
          {totalPages > 1 && (
            <div className="flex justify-end gap-4 mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span className="font-semibold">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* ================= EMPTY ================= */}
      {!loading && bills.length === 0 && (
        <p className="text-center py-6 text-gray-500">No records found</p>
      )}
    </div>
  );
}
