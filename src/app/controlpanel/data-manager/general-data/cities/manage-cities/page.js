"use client";
import React, { useEffect, useState, useRef } from "react";
import Navlink from "@/components/dataManager/generalData/Navlink";
import Link from "next/link";
import useCityStore from "@/app/lib/store/citiesStore";
import EditPopup from "@/components/dataManager/generalData/EditPopup";

function ConfirmDeletePopup({ cityName, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-[#4f4f4f4c] backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-md w-[350px]">
        <h2 className="font-semibold text-lg mb-4">Confirm Deletion</h2>
        <p>
          Are you sure you want to delete the city <strong>{cityName}</strong>?
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function ManageCitiesPage() {
  const {
    listedCities,
    isLoading,
    error,
    success,
    page,
    totalPages,
    fetchCities,
    setPage,
    checkedIds,
    toggleCheckedId,
    updateCityById,
    deleteCityById,
    resetSuccess,
    districtsList,
    fetchDistricts,
    districtsPage,
    districtsTotalPages,
    isDistrictsLoading,
    selectedDistrictId,
    setSelectedDistrictId,
  } = useCityStore();

  // Infinite dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Edit/delete popup
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [apiError, setApiError] = useState("");

  // Initial districts list for dropdown
  useEffect(() => {
    fetchDistricts(1);
  }, [fetchDistricts]);

  // Infinite scroll inside district dropdown
  const handleDistrictScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (
      scrollTop + clientHeight >= scrollHeight - 5 &&
      !isDistrictsLoading &&
      districtsPage < districtsTotalPages
    ) {
      fetchDistricts(districtsPage + 1);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch cities filtered by districtId
  useEffect(() => {
    fetchCities(page, selectedDistrictId || null);
  }, [page, selectedDistrictId, fetchCities]);

  // Reset success/error on timeout
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => resetSuccess(), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, resetSuccess]);

  // Handle checkbox selection
  const handleCheckbox = (id) => {
    toggleCheckedId(id);
  };

  // Sync edit input when selection changes
  useEffect(() => {
    if (checkedIds.length === 1) {
      const selected = listedCities.find((c) => c.id === checkedIds[0]);
      setEditName(selected?.name || "");
      setApiError("");
    } else {
      setEditName("");
      setApiError("");
    }
  }, [checkedIds, listedCities]);

  const handleUpdate = async () => {
    if (checkedIds.length !== 1) return;
    setApiError("");
    try {
      await updateCityById(
        checkedIds[0],
        { name: editName },
        selectedDistrictId,
        page
      );
      setIsEditOpen(false);
    } catch (error) {
      setApiError(error.message || "Failed to update city.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (checkedIds.length !== 1) return;
    await deleteCityById(checkedIds[0], selectedDistrictId, page);
    setIsDeleteConfirmOpen(false);
  };

  return (
    <div>
      <Navlink />
      
      <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
          <div className="flex item-center gap-[50px]">
            <Link
              href={"/controlpanel/data-manager/general-data/cities/add-cities"}
              className="text-black"
            >
              Add
            </Link>
            <h1 className="text-[#3674B5]">Manage</h1>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
        <h1 className="text-black font-semibold py-[16px]">Manage Cities</h1>
      </div>

      {/* District dropdown filter */}
      <div className="relative bg-white px-6 py-2 mt-2" ref={dropdownRef}>
        <div
          className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] cursor-pointer bg-white select-none"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {districtsList.find((d) => d.id === selectedDistrictId)?.name ||
            "Select District"}
        </div>
        {dropdownOpen && (
          <div
            className="absolute mt-1 w-[350px] max-h-48 overflow-y-auto border border-[#8888888c] rounded-[15px] bg-white shadow-lg z-10"
            onScroll={handleDistrictScroll}
          >
            {districtsList.map((district) => (
              <div
                key={district.id}
                className={`px-4 py-2 cursor-pointer hover:bg-[#C0D8F6] ${
                  selectedDistrictId === district.id ? "bg-[#E6F0FF]" : ""
                }`}
                onClick={() => {
                  setSelectedDistrictId(district.id);
                  setDropdownOpen(false);
                  setPage(1); // reset page on filter change
                }}
              >
                {district.name}
              </div>
            ))}
            {isDistrictsLoading && (
              <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
            )}
          </div>
        )}
      </div>

      {/* Cities list */}
      {isLoading ? (
        <div className="px-6 py-2 mt-2">Loading cities...</div>
      ) : error ? (
        <div className="px-6 py-2 mt-2 text-red-500">{error}</div>
      ) : (
        <>
          {listedCities.map((city, idx) => (
            <div
              key={city.id}
              className="bg-white flex items-center gap-2 px-6 py-2 mt-2"
            >
              <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
                {(idx + 1 + (page - 1) * 10).toString().padStart(2, "0")}
              </div>
              <input
                type="text"
                className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
                value={city.name}
                readOnly
              />
              <input
                type="checkbox"
                className="size-6 rounded-[15px]"
                checked={checkedIds.includes(city.id)}
                onChange={() => handleCheckbox(city.id)}
              />
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 my-6 px-6">
            <button
              disabled={checkedIds.length !== 1}
              className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 cursor-pointer"
              onClick={() => setIsEditOpen(true)}
            >
              Edit
            </button>
            <button
              disabled={checkedIds.length !== 1}
              className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 cursor-pointer"
              onClick={() => setIsDeleteConfirmOpen(true)}
            >
              Remove
            </button>
          </div>

          {/* Edit popup */}
          {isEditOpen && (
            <EditPopup
              heading="City"
              value={editName}
              onChange={setEditName}
              onUpdate={handleUpdate}
              onClose={() => setIsEditOpen(false)}
              apiError={apiError}
            />
          )}

          {/* Delete confirmation */}
          {isDeleteConfirmOpen && checkedIds.length === 1 && (
            <ConfirmDeletePopup
              cityName={listedCities.find((c) => c.id === checkedIds[0])?.name}
              onConfirm={handleDeleteConfirm}
              onCancel={() => setIsDeleteConfirmOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ManageCitiesPage;
