"use client";

import Navlink from "@/components/ambulances/Navlink";
import React, { useEffect, useState } from "react";
import useAmbulanceStore from "@/app/lib/store/useAmbulanceStore";

export default function Page() {
  const {
    ambulances,
    totalCount,
    totalPages, // make sure store exposes this
    loading,
    fetchAmbulances,
  } = useAmbulanceStore();

  const DEFAULT_FILTERS = {
    filter: "ACTIVE",
    ambulanceType: "",
    vehicleType: "",
  };

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchAmbulances(currentPage, filters);
  }, [currentPage]);

  const handleFilterChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    setCurrentPage(1);
    fetchAmbulances(1, updated);
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
    fetchAmbulances(1, DEFAULT_FILTERS);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    fetchAmbulances(page, filters);
  };

  return (
    <div>
      <Navlink />

      {/* FILTERS */}
      <div className="w-full bg-white border border-[#8888888c] flex justify-between items-center px-6 py-4 mt-2 rounded-[15px]">
        <div className="flex gap-[10px]">
          <select
            value={filters.ambulanceType}
            onChange={(e) =>
              handleFilterChange("ambulanceType", e.target.value)
            }
            className="w-[300px] h-[40px] rounded-[15px] border border-[#8888888c] outline-none px-4 text-[14px]"
          >
            <option value="">Ambulance Type</option>
            <option value="BASIC_LIFE_SUPPORT">Basic Life Support</option>
            <option value="CARDIAC_AMBULANCE">Cardiac Ambulance</option>
            <option value="ICU_LEVEL_1">ICU Level 1</option>
            <option value="ICU_LEVEL_2">ICU Level 2</option>
            <option value="ICU_LEVEL_3">ICU Level 3</option>
          </select>

          <select
            value={filters.vehicleType}
            onChange={(e) => handleFilterChange("vehicleType", e.target.value)}
            className="w-[300px] h-[40px] rounded-[15px] border border-[#8888888c] outline-none px-4 text-[14px]"
          >
            <option value="">Vehicle Type</option>
            <option value="MARUTI_OMNI">Maruti Omni</option>
            <option value="FORCE_TRAVELLER">Force Traveller</option>
            <option value="TATA_WINGER_AMBULANCE">Tata Winger</option>
            <option value="TOYOTA_HIACE">Toyota Hiace</option>
          </select>

          <button
            onClick={handleReset}
            className="h-[40px] px-6 rounded-[15px] bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300"
          >
            Reset
          </button>
        </div>
      </div>

      {/* RESULT COUNT */}
      <div className="w-full h-[48px] border border-[#8888888c] bg-white mt-2 rounded-[15px] flex items-center">
        <h1 className="text-[16px] px-6 font-semibold">
          {totalCount} Results Found
        </h1>
      </div>

      {/* LOADING */}
      {loading && <p className="text-center mt-4 text-gray-500">Loading...</p>}

      {/* LIST */}
      {!loading &&
        ambulances.map((item, index) => (
          <div
            key={item.id}
            className="mb-2 bg-white border border-[#BBBBBB] rounded-[15px] mt-2"
          >
            <div className="flex border-b border-[#BBBBBB] py-4 w-full px-6">
              <p className="font-semibold">
                {(currentPage - 1) * 10 + index + 1}
              </p>
            </div>

            {/* <div className="flex p-6 gap-20">
              <div className="flex flex-col gap-[10px] text-[16px] font-semibold">
                <span>Ambulance Name</span>
                <span>Ambulance Type</span>
                <span>Vehicle Type</span>
                <span>Driver Name</span>
                <span>Mobile Number</span>
                <span>Email</span>
                <span>Customer Care</span>
                <span>Location</span>
              </div>

              <div className="flex flex-col gap-[10px] text-[16px]">
                <span>{item.ambulanceName || "-"}</span>
                <span>{item.ambulanceType}</span>
                <span>{item.vehicleType}</span>
                <span>{item.fullName}</span>
                <span>{item.mobileNumber}</span>
                <span>{item.email || "NIL"}</span>
                <span>{item.customerCareNumber || "NIL"}</span>
                <span>{item.mapLocation || "NIL"}</span>
              </div>
            </div> */}

            <div className="flex p-6 gap-10">
              {/* LABELS */}
              <div className="font-semibold flex flex-col gap-2 w-[250px]">
                <span>Ambulance Name</span>
                <span>Ambulance Type</span>
                <span>Vehicle Type</span>
                <span>Driver Name</span>
                <span>Mobile Number</span>
                <span>Email</span>
                <span>Customer Care</span>
                <span>Location</span>
              </div>

              {/* VALUES */}
              <div className="flex flex-col gap-2 flex-1 break-words">
                <span>{item.ambulanceName || "-"}</span>
                <span>{item.ambulanceType || "-"}</span>
                <span>{item.vehicleType || "-"}</span>
                <span>{item.fullName || "-"}</span>
                <span>{item.mobileNumber || "-"}</span>
                <span>{item.email || "NIL"}</span>
                <span>{item.customerCareNumber || "NIL"}</span>
                <span>{item.mapLocation || "NIL"}</span>
              </div>
            </div>
          </div>
        ))}
      {!loading && ambulances.length === 0 && (
        <div className="w-full bg-white border border-[#BBBBBB] rounded-[15px] mt-4 py-10 text-center">
          <p className="text-[16px] text-gray-500 font-medium">
            No ambulances found
          </p>
        </div>
      )}

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
