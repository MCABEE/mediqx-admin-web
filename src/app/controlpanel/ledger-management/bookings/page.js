
"use client";

import Navlink from "@/components/ledgerManagement/Navlink";
import React, { useState } from "react";
import { IoCheckmark } from "react-icons/io5";

export default function Page() {
  const [activeTab, setActiveTab] = useState("total");

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  return (
    <div>
        <Navlink/>
      {/* ------------------ Year + Month Filter ------------------ */}
      <div className="w-full bg-white border border-[#8888888c] flex justify-between items-center px-6 py-4 mt-2 rounded-[15px]">
        <div className="flex gap-[10px]">
          <select className="w-[192px] h-[40px] rounded-[15px] border px-4">
            {[2023, 2024, 2025, 2026, 2027].map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>

          <select className="w-[192px] h-[40px] rounded-[15px] border px-4">
            {monthNames.map((m, i) => (
              <option key={i}>{m}</option>
            ))}
          </select>
        </div>

        <h1 className="text-[16px] font-semibold">2024 Dec</h1>
      </div>

      {/* ------------------ SUMMARY CARDS ------------------ */}
      <div className="w-full h-[104px] rounded-[15px] bg-white mt-2 flex cursor-pointer">
        <div
          onClick={() => setActiveTab("total")}
          className={`py-[24px] px-[37px] font-semibold ${
            activeTab === "total" ? "text-[#3674B5]" : "text-black"
          }`}
        >
          <p>Total Bookings</p>
          <p className="text-[24px] text-center">125</p>
        </div>

        <div
          onClick={() => setActiveTab("confirmed")}
          className={`py-[24px] px-[37px] font-semibold ${
            activeTab === "confirmed" ? "text-[#3674B5]" : "text-black"
          }`}
        >
          <p>Confirmed</p>
          <p className="text-[24px] text-center">125</p>
        </div>

        <div
          onClick={() => setActiveTab("cancelled")}
          className={`py-[24px] px-[37px] font-semibold ${
            activeTab === "cancelled" ? "text-[#3674B5]" : "text-black"
          }`}
        >
          <p>Cancelled / Hold</p>
          <p className="text-[24px] text-center">125</p>
        </div>
      </div>

      {/* ------------------ TABLES ------------------ */}

      {/* ===== TOTAL BOOKINGS TABLE ===== */}
      {activeTab === "total" && (
          <table className="w-full border-spacing-y-2 border-separate text-black mt-4">
            <thead className="bg-[#C0D8F6]">
              <tr>
                <th className="text-base rounded-l-2xl p-2">Patient Name</th>
                <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                  Status
                </th>
                <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                  Direct
                </th>
                <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                  Referral
                </th>
                <th className="text-base border-l-4 rounded-r-2xl border-[#F0F4F9] p-2">
                  Referred By
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white cursor-pointer  hover:bg-[#E8F1FD] transition">
                <td className="p-2 text-center">
                  ertyu
                  {/* </Link> */}
                </td>

                <td className="border-l-4 text-center border-[#C0D8F6] p-2">
                  789
                </td>
                <td className="border-l-4 text-center border-[#C0D8F6] p-2">
                  <IoCheckmark />
                </td>
                <td className="border-l-4 text-center border-[#C0D8F6] p-2">
                  <IoCheckmark />
                </td>
                <td className="border-l-4 text-center border-[#C0D8F6] p-2">
                  789
                </td>
              </tr>
            </tbody>
          </table>
      )}

      {/* ===== CONFIRMED TABLE ===== */}
      {activeTab === "confirmed" && (
         <table className="w-full border-spacing-y-2 border-separate text-black mt-4">
          <thead className="bg-[#C0D8F6]">
            <tr>
              <th className="text-base rounded-l-2xl p-2">Patient Name</th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                Services
              </th>
              <th className="text-base border-l-4 rounded-r-2xl border-[#F0F4F9] p-2">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="bg-white cursor-pointer  hover:bg-[#E8F1FD] transition">
              <td className="p-2 text-center">
                hfhf
                {/* </Link> */}
              </td>

              <td className="border-l-4 text-center border-[#C0D8F6] p-2">
                23
              </td>

              <td className="border-l-4 text-center border-[#C0D8F6] p-2">
                123
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* ===== CANCELLED BOOKINGS TABLE ===== */}
      {activeTab === "cancelled" && (
         <table className="w-full border-spacing-y-2 border-separate text-black mt-4">
            <thead className="bg-[#C0D8F6]">
              <tr>
                <th className="text-base rounded-l-2xl p-2">Patient Name</th>
                <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                  Service
                </th>
                <th className="text-base border-l-4 rounded-r-2xl border-[#F0F4F9] p-2">
                  Referral
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white cursor-pointer  hover:bg-[#E8F1FD] transition">
                <td className="p-2 text-center">
                  ertyu
                  {/* </Link> */}
                </td>

                <td className="border-l-4 text-center border-[#C0D8F6] p-2">
                  345
                </td>

                <td className="border-l-4 text-center border-[#C0D8F6] p-2">
                  <IoCheckmark />
                </td>
              </tr>
            </tbody>
          </table>
      )}
    </div>
  );
}