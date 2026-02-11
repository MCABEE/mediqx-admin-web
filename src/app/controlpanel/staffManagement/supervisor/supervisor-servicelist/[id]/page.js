"use client";

import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSortDown } from "react-icons/fa";

function Page() {
  const router = useRouter();
  const { id: supervisorId } = useParams();

  const {
    supervisorName,
    services,
    totalServices,
    fetchSupervisorBilling,
    page,
    totalPages,
    loading,
    error,
  } = useSupervisorRegistrationStore();

  const [year, setYear] = useState("2026");
  const [month, setMonth] = useState("January");

  useEffect(() => {
    if (supervisorId) {
      fetchSupervisorBilling({
        supervisorId,
        year,
        month,
        page: 1,
        limit: 10,
      });
    }
  }, [supervisorId, year, month]);

  const handleRowClick = (serviceId) => {
    router.push(
      `/controlpanel/staffManagement/supervisor/supervisor-service-details/${serviceId}`,
    );
  };

  const handlePrev = () => {
    if (page > 1) {
      fetchSupervisorBilling({
        supervisorId,
        year,
        month,
        page: page - 1,
        limit: 10,
      });
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      fetchSupervisorBilling({
        supervisorId,
        year,
        month,
        page: page + 1,
        limit: 10,
      });
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <>
      {/* Back */}
      <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex items-center">
        <h1
          onClick={() => router.back()}
          className="text-[16px] px-[38px] font-semibold cursor-pointer"
        >
          Back
        </h1>
      </div>

      {/* Supervisor Name */}
      <div className="w-full  h-[48px] flex justify-between items-center  bg-[#C0D8F6] mt-2 rounded-t-[15px]  ">
        <h1 className="text-[16px] px-[38px] font-semibold">
          {supervisorName || "-"}
        </h1>
      </div>

      {/* Filters */}
      <div className="w-full bg-white border border-[#8888888c] flex justify-between items-center px-6 py-4 mt-2 rounded-[15px]">
        <div className="flex gap-[10px]">
          <div className="relative w-[192px]">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full h-[40px] rounded-[15px] border border-[#8888888c] outline-none px-4 appearance-none"
            >
              <option value="2026 ">2026</option>

              <option value="2025">2025</option>
            </select>
            <FaSortDown
              size={18}
              className="absolute right-4 top-1/2 -translate-y-[65%] text-gray-400 pointer-events-none"
            />
          </div>

          <div className="relative w-[192px]">
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-[192px] h-[40px] rounded-[15px] border border-[#8888888c] outline-none px-4 appearance-none"
            >
              {[
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
              ].map((m) => (
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

        <h1 className="text-[16px] font-semibold">{totalServices} services</h1>
      </div>

      {/* Table */}
      <table className="w-full border-spacing-y-2 border-separate text-black mt-2">
        <thead className="bg-[#C0D8F6]">
          <tr>
            <th className="p-2 rounded-l-2xl">No</th>
            <th className="p-2 border-l-4 border-[#F0F4F9]">Patient Name</th>
            <th className="p-2 border-l-4 border-[#F0F4F9]">Service</th>
            <th className="p-2 border-l-4 border-[#F0F4F9]">Products</th>
            <th className="p-2 border-l-4 border-[#F0F4F9] rounded-r-2xl">
              Billing
            </th>
          </tr>
        </thead>

        <tbody>
          {services.map((item, index) => (
            <tr
              key={item.serviceId}
              onClick={() => handleRowClick(item.serviceId)}
              className="bg-white cursor-pointer hover:bg-gray-100"
            >
              <td className="p-2">{(page - 1) * 10 + index + 1}</td>
              <td className="border-l-4 p-2 border-[#C0D8F6] hover:underline">
                {item.patientName}
              </td>
              <td className="border-l-4 border-[#C0D8F6] p-2">
                {item.service}
              </td>
              <td className="border-l-4 border-[#C0D8F6] p-2">
                {item.products}
              </td>
              <td className="border-l-4 border-[#C0D8F6] p-2">
                ₹ {item.billing}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between my-4 px-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`px-4 py-1 rounded text-white ${
            page === 1
              ? "bg-[#5F9DE9] opacity-50 cursor-not-allowed"
              : "bg-[#5F9DE9]"
          }`}
        >
          Prev
        </button>

        <span className="text-sm font-medium self-center">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className={`px-4 py-1 rounded text-white ${
            page === totalPages
              ? "bg-[#5F9DE9] opacity-50 cursor-not-allowed"
              : "bg-[#5F9DE9]"
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Page;
