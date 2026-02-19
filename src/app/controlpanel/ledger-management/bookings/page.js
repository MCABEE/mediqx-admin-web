"use client";

import Navlink from "@/components/ledgerManagement/Navlink";
import useLedgerStore from "@/app/lib/store/useLedgerStore";
import React, { useEffect } from "react";
import { IoCheckmark } from "react-icons/io5";
import { FaSortDown } from "react-icons/fa";

export default function Page() {
  const {
    bookings,
    counts,
    loading,
    year,
    month,
    filter,
    page,
    totalPages,
    setYear,
    setMonth,
    setFilter,
    setPage,
    fetchBookings,
  } = useLedgerStore();

  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  /* Set default filter on load */

  useEffect(() => {
    setFilter("ALL");
    setPage(1);
  }, []);

  /* Fetch on change */
  useEffect(() => {
    fetchBookings();
  }, [year, month, filter, page]);

  return (
    <div>
      <Navlink />

      {/* -------- YEAR + MONTH -------- */}
      <div className="w-full bg-white border border-[#8888888c]  flex justify-between px-6 py-4 mt-2 rounded-[15px]">
        <div className="flex gap-3">
          <div className="relative w-[192px]">
            <select
              value={year}
              onChange={(e) => {
                setPage(1);
                setYear(Number(e.target.value));
              }}
              className="w-[192px] h-[40px] rounded-[15px] border border-[#8888888c]  px-4 appearance-none"
            >
              {[
                2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032,
                2033, 2034, 2035,
              ].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <FaSortDown
              size={18}
              className="absolute right-4 top-1/2 -translate-y-[65%] text-gray-400 pointer-events-none"
            />
          </div>

          <div className="relative w-[192px]">
            <select
              value={month}
              onChange={(e) => {
                setPage(1);
                setMonth(e.target.value);
              }}
              className="w-[192px] h-[40px] rounded-[15px] border border-[#8888888c]  px-4 appearance-none"
            >
              {monthNames.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <FaSortDown
              size={18}
              className="absolute right-4 top-1/2 -translate-y-[65%] text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        <h1 className="font-semibold capitalize">
          {year} {month}
        </h1>
      </div>

      {/* -------- SUMMARY CARDS (WITH COUNTS) -------- */}
      <div className="w-full h-[104px] bg-white mt-2 flex rounded-[15px] cursor-pointer">
        <div
          onClick={() => {
            setPage(1);
            setFilter("ALL");
          }}
          className={`py-6 px-9 font-semibold ${
            filter === "ALL" ? "text-[#3674B5]" : "text-black"
          }`}
        >
          <p>Total Bookings</p>
          <p className="text-[24px] text-center">{counts.total}</p>
        </div>

        <div
          onClick={() => {
            setPage(1);
            setFilter("CONFIRMED");
          }}
          className={`py-6 px-9 font-semibold ${
            filter === "CONFIRMED" ? "text-[#3674B5]" : "text-black"
          }`}
        >
          <p>Confirmed</p>
          <p className="text-[24px] text-center">{counts.confirmed}</p>
        </div>

        <div
          onClick={() => {
            setPage(1);
            setFilter("CANCELLED_OR_HOLD");
          }}
          className={`py-6 px-9 font-semibold ${
            filter === "CANCELLED_OR_HOLD" ? "text-[#3674B5]" : "text-black"
          }`}
        >
          <p>Cancelled / Hold</p>
          <p className="text-[24px] text-center">{counts.cancelledOrHold}</p>
        </div>
      </div>

      {/* -------- TABLE -------- */}
      {!loading && (
        <table className="w-full border-separate border-spacing-y-2 my-4">
          <thead className="bg-[#C0D8F6]">
            <tr>
              <th className="rounded-l-2xl p-2">Patient Name</th>
              <th className="border-l-4 border-[#F0F4F9] p-2">Service</th>
              <th className="border-l-4 border-[#F0F4F9] p-2">Direct </th>

              <th className="border-l-4 border-[#F0F4F9] p-2">Referral</th>
              <th className="border-l-4 border-[#F0F4F9] p-2">Status</th>

              <th className="border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
                Referred By
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="bg-white hover:bg-[#E8F1FD]">
                <td className="text-center p-2">{b.patientName}</td>
                <td className="border-l-4  border-[#C0D8F6] text-center p-2">
                  {b.services?.length > 40
                    ? b.services.slice(0, 40) + "..."
                    : b.services}
                </td>
                <td className="border-l-4  border-[#C0D8F6] text-center p-2 ps-8">
                  {b.direct === true ? (
                    <IoCheckmark className="text-[16px]" />
                  ) : (
                    ""
                  )}
                </td>
                <td className="border-l-4  border-[#C0D8F6] text-center p-2 ps-8">
                  {b.referral === true ? (
                    <IoCheckmark className="text-[16px]" />
                  ) : (
                    ""
                  )}
                </td>
                <td className="border-l-4  border-[#C0D8F6] text-center p-2">
                  {b.status}
                </td>
                <td className="border-l-4  border-[#C0D8F6] text-center p-2">
                  {b.referredBy === null ? "" : b.referredBy}
                </td>
              </tr>
            ))}

            {bookings.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {!loading && totalPages > 1 && (
        <div className="flex justify-between items-center gap-4 mt-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 rounded-md border disabled:opacity-50 bg-blue-400 text-white"
          >
            Prev
          </button>

          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded-md border disabled:opacity-50 bg-blue-400 text-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
