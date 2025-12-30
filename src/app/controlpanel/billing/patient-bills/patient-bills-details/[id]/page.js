"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import usePatientBillsStore from "@/app/lib/store/patientBillingStore";

export default function Page() {
  const router = useRouter();
  const { id: patientId } = useParams();

  const {
    services,
    fetchServices,
    page,
    totalPages,
    loading,
    setStatus,
    patient,
    total,
  } = usePatientBillsStore();

  const [selected, setSelected] = useState("Services Ongoing");

  const tabs = [
    "Services Ongoing",
    "To be start",
    "Completed",
    "Products",
    "All",
  ];

  const STATUS_MAP = {
    "Services Ongoing": "ASSIGNED",
    "To be start": "APPROVED",
    Completed: "COMPLETED",
    Products: "ALL",
    All: "ALL",
  };

  useEffect(() => {
    if (!patientId) return;

    setStatus(STATUS_MAP[selected]);
    fetchServices({ patientId, page: 1 });
  }, [selected, patientId]);

  return (
    <div>
      {/* Back Button */}
      <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex items-center">
        <h1
          onClick={() => router.back()}
          className="text-[16px] text-black px-[38px] font-semibold cursor-pointer"
        >
          Back
        </h1>
      </div>

      <div className="px-[38px] mt-4 flex justify-between">
        <div>
          <h1 className="text-black font-semibold text-[20px]">
            {patient.name}
          </h1>
          <p className="text-black font-semibold">
            {patient.gender}, {patient.age}Yrs
          </p>
        </div>
        <div>
          {/* <h1 className="text-black font-semibold text-[20px]">
           {total} Services
        </h1> */}
        </div>
      </div>
      {/* Tabs */}
      <div className="flex border-4 border-[#F0F4F9] font-semibold rounded-[15px] w-full bg-white mt-4 overflow-hidden">
        {tabs.map((tab, index) => (
          <div
            key={tab}
            onClick={() => setSelected(tab)}
            className={`flex-1 text-center py-[15px] cursor-pointer ${
              selected === tab
                ? "bg-[#3674B5] text-white"
                : "bg-white text-black"
            } ${index !== 0 ? "border-l-4 border-[#F0F4F9]" : ""}`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Table */}
      <table className="w-full border-spacing-y-2 border-separate text-black mt-2">
        <thead className="bg-[#C0D8F6]">
          <tr>
            <th className="text-base rounded-l-2xl p-2">No</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Service
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Duration
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Net Pay
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">Paid</th>
            <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
              Balance
            </th>
          </tr>
        </thead>

        <tbody>
          {services.map((item, index) => (
            <tr
              key={item.serviceId}
              onClick={() =>
                router.push(
                  `/controlpanel/billing/patient-bills/patient-bill-detailView/${item.serviceId}`
                )
              }
              className="bg-white cursor-pointer hover:bg-[#E8F1FD]"
            >
              <td className="p-2  text-center ">{index + 1}</td>
              <td className="p-2 border-l-4 text-center border-[#C0D8F6]">
                {item.serviceTypeName}
              </td>
              <td className="p-2 border-l-4 text-center border-[#C0D8F6]">
                {item.duration}
              </td>
              <td className="p-2 border-l-4 text-center border-[#C0D8F6]">
                ₹{item.netPay}
              </td>
              <td className="p-2 border-l-4 text-center border-[#C0D8F6]">
                ₹{item.paid}
              </td>
              <td className="p-2 border-l-4 text-center border-[#C0D8F6]">
                ₹{item.balance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between my-4">
        <button
          disabled={page === 1 || loading}
          onClick={() => fetchServices({ patientId, page: page - 1 })}
          className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-semibold">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages || loading}
          onClick={() => fetchServices({ patientId, page: page + 1 })}
          className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}