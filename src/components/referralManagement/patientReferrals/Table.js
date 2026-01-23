"use client";

import useReferralManagementStore from "@/app/lib/store/staffReferralStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const PatientReferralTable = () => {
  const {
    referralsPatient,
    totalPages,
    loading,
    error,
    fetchAgentPatientReferrals,
  } = useReferralManagementStore();

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("ALL");
  const [referredBy, setReferredBy] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [search, setSearch] = useState("");
  const limit = 10;

  const goToNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const goToPrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const clearFilters = () => {
    setReferredBy("");
    setServiceType("");
    setSearch("");
    setStatus("ALL");
    setPage(1);
  };

  useEffect(() => {
    fetchAgentPatientReferrals(
      page,
      limit,
      status,
      referredBy,
      serviceType,
      search,
    );
  }, [
    page,
    status,
    referredBy,
    serviceType,
    search,
    fetchAgentPatientReferrals,
  ]);

  // ✅ Group by created date
  const groupedReferrals =
    referralsPatient?.reduce((acc, ref) => {
      const dateKey = new Date(ref.createdAt).toISOString().split("T")[0]; // YYYY-MM-DD

      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(ref);

      return acc;
    }, {}) || {};

  return (
    <div>
      {/* ✅ Header */}
      <div className="w-full flex justify-between items-center bg-white border border-[#8888888c] rounded-[15px] mt-2 pt-4 pb-4 px-6 text-black font-semibold text-[16px]">
        <p className="font-semibold text-[32px]">
          {referralsPatient?.length || 0}
        </p>
        <button
          onClick={clearFilters}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
        >
          Clear Filters
        </button>
      </div>

      {/* ✅ Table */}
      <table className="w-full border-spacing-y-2 border-separate text-black mt-2">
        <thead className="bg-[#C0D8F6]">
          <tr>
            <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">No</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Referred By
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Status
            </th>
            {/* <th className="text-base border-l-4 border-[#F0F4F9] p-2">Service Type</th> */}
            <th className="text-base border-l-4 border-[#F0F4F9] p-2 ">
              Service Type
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2 rounded-r-2xl">
              Source
            </th>
          </tr>

          {/* ✅ Filters Row */}
          <tr className="bg-white border-b border-gray-200">
            <th></th>
            <th className="p-2 border-l-4 border-[#F0F4F9]">
              <input
                type="text"
                placeholder="Search referred by"
                value={referredBy}
                onChange={(e) => setReferredBy(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#3674B5]"
              />
            </th>

            <th className="p-2 border-l-4 border-[#F0F4F9]">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#3674B5]"
              >
                <option value="ALL">All</option>
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </th>

            <th className="p-2 border-l-4 border-[#F0F4F9]">
              <input
                type="text"
                placeholder="Search service type"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#3674B5]"
              />
            </th>
            {/* 
            <th className="p-2 border-l-4 border-[#F0F4F9]">
              <input
                type="text"
                placeholder="Search patient name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#3674B5]"
              />
            </th> */}
            <th className="p-2 border-l-4 border-[#F0F4F9]"></th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan={5} className="text-center p-4">
                Loading...
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={5} className="text-center text-red-600 p-4">
                {error}
              </td>
            </tr>
          )}
          {!loading && Object.keys(groupedReferrals).length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No referrals found
              </td>
            </tr>
          )}

          {!loading &&
            Object.entries(groupedReferrals).map(([date, refs], dateIndex) => (
              <React.Fragment key={dateIndex}>
                <tr>
                  <td
                    colSpan="5"
                    className="rounded-t-2xl p-2 bg-[#C0D8F6] text-[16px] font-semibold"
                  >
                    {new Date(date).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                      weekday: "long",
                    })}
                  </td>
                </tr>

                {refs.map((ref, index) => {
                  const url = `/controlpanel/referral-management/patient-referrals-details/${ref.id}`;
                  return (
                    <Link
                      key={`${ref.id}-${index}`}
                      href={url}
                      passHref
                      legacyBehavior
                    >
                      <tr
                        className="bg-white cursor-pointer hover:bg-blue-100"
                        tabIndex={0}
                        role="link"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            window.location.href = url;
                          }
                        }}
                      >
                        <td className="p-2">
                          {(page - 1) * limit + index + 1}
                        </td>
                        <td className="border-l-4 border-[#C0D8F6] p-2">
                          {ref.referredBy}
                        </td>
                        <td className="border-l-4 border-[#C0D8F6] p-2">
                          {ref.referralStatus || "-"}
                        </td>
                        <td className="border-l-4 border-[#C0D8F6] p-2">
                          {ref.serviceType || "-"}
                        </td>
                        <td className="border-l-4 border-[#C0D8F6] p-2">
                          {ref.referralSourceType || "-"}
                        </td>
                      </tr>
                    </Link>
                  );
                })}
              </React.Fragment>
            ))}
        </tbody>
      </table>

      {/* ✅ Pagination */}
      <div className="flex justify-between items-center mt-4 mb-2">
        <button
          disabled={page === 1}
          onClick={goToPrevPage}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={goToNextPage}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PatientReferralTable;
