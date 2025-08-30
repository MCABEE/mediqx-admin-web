"use client";
import React, { useEffect, useState, useRef } from "react";
import useDistrictStore from "@/app/lib/store/districtsStore";
import Navlink from "@/components/dataManager/generalData/Navlink";
import Link from "next/link";

function Page() {
  const {
    districts,
    statesList,
    isLoading,
    isStatesLoading,
    error,
    success,
    addDistrictInput,
    setDistrictValue,
    saveDistricts,
    resetSuccess,
    fetchStates,
    page, 
    totalPages,
  } = useDistrictStore();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchStates(1); // load first page
  }, [fetchStates]);

  // Infinite scroll inside dropdown
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (
      scrollTop + clientHeight >= scrollHeight - 5 &&
      !isStatesLoading &&
      page < totalPages
    ) {
      fetchStates(page + 1);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    if (success) {
      const timer = setTimeout(() => resetSuccess(), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, resetSuccess]);

  const selectedState =
    statesList.find((s) => s.id === districts[0]?.stateId)?.name ||
    "Select State";

  return (
    <div>
      <Navlink />
      <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
          <div className="flex item-center gap-[50px]">
            <h1 className="text-[#3674B5]">Add</h1>
            <Link
              href="/controlpanel/data-manager/general-data/districts/manage-districts"
              className="text-black"
            >
              Manage
            </Link>
          </div>
          <button
            className="bg-[#196BA5] text-white text-3xl rounded-lg size-9 cursor-pointer"
            onClick={addDistrictInput}
          >
            +
          </button>
        </div>
      </div>

      {/* Section header */}
      <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
        <h1 className="text-black font-semibold py-[16px]">Add Districts</h1>
      </div>

      {/* Custom Dropdown */}
      <div className="bg-white px-6 py-2 mt-2" ref={dropdownRef}>
        <div
          className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] cursor-pointer bg-white"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {selectedState}
        </div>

        {dropdownOpen && (
          <div
            className="absolute mt-1 w-[350px] max-h-48 overflow-y-auto border border-[#8888888c] rounded-[15px] bg-white shadow-lg z-10"
            onScroll={handleScroll}
          >
            {statesList.map((state) => (
              <div
                key={state.id}
                className={`px-4 py-2 cursor-pointer hover:bg-[#C0D8F6] ${
                  districts[0]?.stateId === state.id ? "bg-[#E6F0FF]" : ""
                }`}
                onClick={() => {
                  districts.forEach((_, idx) =>
                    setDistrictValue(idx, "stateId", state.id)
                  );
                  setDropdownOpen(false);
                }}
              >
                {state.name}
              </div>
            ))}
            {isStatesLoading && (
              <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
            )}
          </div>
        )}
      </div>

      {/* District rows */}
      {districts.map((district, idx) => (
        <div
          key={idx}
          className="bg-white flex gap-6 px-6 py-2 mt-2 items-center"
        >
          <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
            {(idx + 1).toString().padStart(2, "0")}
          </div>

          <input
            type="text"
            className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
            placeholder="Enter District"
            value={district.name}
            onChange={(e) => setDistrictValue(idx, "name", e.target.value)}
          />
        </div>
      ))}

      {/* Save button */}
      <button
        className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-2 cursor-pointer"
        onClick={saveDistricts}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save"}
      </button>

      {error && <div className="text-red-600 mt-2 px-6">{error}</div>}
      {success && (
        <div className="text-blue-600 mt-2 px-6">
          Districts added successfully!
        </div>
      )}
    </div>
  );
}

export default Page;
