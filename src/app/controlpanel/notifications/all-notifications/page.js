"use client";

import React, { useEffect } from "react";
import Navlink from "@/components/notifications/Navlink";
import useNotificationStore from "@/app/lib/store/useNotificationStore";

export default function NotificationPage() {
  const {
    notifications,
    loading,
    year,
    month,
    page,
    totalPages,

    setYear,
    setMonth,
    setPage,
    clearFilters,
    fetchNotifications,
  } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [year, month, page]); // ✅ page added

  return (
    <div>
      <Navlink />

      {/* ===== FILTERS ===== */}
      <div className="w-full border border-[#cbc7c7] rounded-[15px] p-[22px] text-black mt-2 bg-white flex gap-4 items-center">
        <div>
          <label className="font-semibold">Year: </label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-[100px] h-[40px] rounded-[10px] text-[14px] border border-[#bbbbbb] outline-none px-4"
          >
            {[
              2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035,
            ].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Month: </label>
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="w-[60px] h-[40px] rounded-[10px] text-[14px] border border-[#bbbbbb] outline-none px-4"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={clearFilters}
          className="bg-[#2c64a0] text-white px-4 py-1 rounded ml-auto"
        >
          Clear Filters
        </button>
      </div>

      {/* ===== NOTIFICATION LIST ===== */}
      <div className="space-y-4 mt-4">
        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : notifications.length === 0 ? (
          <p className="text-center py-10">No notifications found</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className="w-full border border-[#d3cdcd] bg-white rounded-2xl"
            >
              <p className="text-[16px] text-black font-semibold border-b border-[#c5c1c1] px-8 py-[22px] mb-4">
                {n.totalRecipients}
              </p>

              <div className="ps-5 pe-[139px]">
                <p>Audience</p>
                <div className="flex gap-7 text-[16px] text-black py-2">
                  {n.audience.map((a, i) => (
                    <p key={i}>{a}</p>
                  ))}
                </div>

                <p className="text-[16px] text-[#333333] font-semibold pb-2.5">
                  {n.title}
                </p>

                <p className="text-[#333333] text-[16px]">{n.message}</p>

                <p className="pt-[13px] font-semibold">
                  Admin :<span className="font-normal"> {n.adminName}</span>
                </p>

                <p className="pt-[13px] pb-[36px] font-semibold">
                  Date :
                  <span className="font-normal">
                    {" "}
                    {new Date(n.date).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ===== PAGINATION ===== */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8 mb-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-[#C0D8F6] px-4 py-2 rounded text-black disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-[#C0D8F6] px-4 py-2 rounded text-black disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
