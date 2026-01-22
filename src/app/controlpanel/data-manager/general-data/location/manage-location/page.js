"use client";

import React, { useEffect, useState } from "react";
import Navlink from "@/components/dataManager/generalData/Navlink";
import Link from "next/link";
import useLocationStore from "@/app/lib/store/locationStore";

function ConfirmDeletePopup({ location, onConfirm, onCancel }) {
  if (!location) return null;

  return (
    <div className="fixed inset-0 bg-[#4f4f4f4c] backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-md w-[400px]">
        <h2 className="font-semibold text-lg mb-4">Confirm Deletion</h2>
        <p>
          Are you sure you want to delete location{" "}
          <strong>
            {location.state}, {location.district}, {location.city}
          </strong>
          ?
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

function ManageLocations() {
  const {
    listedLocations,
    fetchLocations,
    page,
    totalPages,
    setPage,
    checkedIds,
    setCheckedIds,
    updateLocationById,
    deleteLocationById,
    isLoading,
    error,
  } = useLocationStore();

  const [editData, setEditData] = useState({
    state: "",
    district: "",
    city: "",
    pincode: "",
  });
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [duplicateError, setDuplicateError] = useState(false); // highlight fields

  useEffect(() => {
    fetchLocations(page, 10);
  }, [page, fetchLocations]);

  useEffect(() => {
    if (checkedIds.length === 1) {
      const loc = listedLocations.find((l) => l.id === checkedIds[0]);
      setEditData({ ...loc });
    } else {
      setEditData({ state: "", district: "", city: "", pincode: "" });
    }
  }, [checkedIds, listedLocations]);

  const handleCheckbox = (id) => {
    setCheckedIds(checkedIds.includes(id) ? [] : [id]);
  };

  const handleUpdate = async () => {
    setMessage("");
    setDuplicateError(false);

    if (
      !editData.state ||
      !editData.district ||
      !editData.city ||
      !/^\d{6}$/.test(editData.pincode)
    ) {
      setMessage("All fields are required and pincode must be 6 digits");
      return;
    }

    if (checkedIds.length !== 1) return;

    try {
      await updateLocationById(checkedIds[0], editData);
      // ✅ only close if no error
      setEditPopupOpen(false);
      setCheckedIds([]);
      setMessage("Location updated successfully!");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      // stay open and show duplicate message
      setMessage(err.message);
      if (err.message.toLowerCase().includes("already exists")) {
        setDuplicateError(true);
      }
    }
  };

  const handleDelete = async () => {
    if (checkedIds.length !== 1) return;
    await deleteLocationById(checkedIds[0]);
    setConfirmPopupOpen(false);
    setCheckedIds([]);
    setMessage("Location deleted successfully!");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div>
      <Navlink />

      <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="flex items-center gap-[50px] pt-[23px] pb-[19px]">
          <Link
            href="/controlpanel/data-manager/general-data/location/add-location"
            className="text-black"
          >
            Add
          </Link>
          <h1 className="text-[#3674B5]">Manage</h1>
        </div>
      </div>

      <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
        <h1 className="text-black font-semibold py-[16px]">Manage Locations</h1>
      </div>

      {isLoading ? (
        <div className="px-6 py-2 mt-2">Loading locations...</div>
      ) : error ? (
        <div className="px-6 py-2 mt-2 text-red-500">{error}</div>
      ) : (
        <>
          {listedLocations.map((loc, idx) => (
            <div
              key={loc.id}
              className="bg-white flex items-center gap-2 px-6 py-2 mt-2 flex-wrap"
            >
              <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
                {(idx + 1 + (page - 1) * 10).toString().padStart(2, "0")}
              </div>

              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  value={loc.state}
                  readOnly
                  className="w-[150px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
                />
                <input
                  type="text"
                  value={loc.district}
                  readOnly
                  className="w-[150px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
                />
                <input
                  type="text"
                  value={loc.city}
                  readOnly
                  className="w-[150px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
                />
                <input
                  type="text"
                  value={loc.pincode}
                  readOnly
                  className="w-[100px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
                />
              </div>

              <input
                type="checkbox"
                className="size-6 rounded-[15px]"
                checked={checkedIds.includes(loc.id)}
                onChange={() => handleCheckbox(loc.id)}
              />
            </div>
          ))}

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

          <div className="flex gap-3 my-6 px-6">
            <button
              className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 cursor-pointer"
              disabled={checkedIds.length !== 1}
              onClick={() => setEditPopupOpen(true)}
            >
              Edit
            </button>
            <button
              className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 cursor-pointer"
              disabled={checkedIds.length !== 1}
              onClick={() => setConfirmPopupOpen(true)}
            >
              Remove
            </button>
          </div>

          {/* {message && <div className="text-blue-600 mt-2 px-6">{message}</div>} */}

          {editPopupOpen && (
            <div className="fixed inset-0 h-full w-full bg-[#4f4f4f4c] backdrop-blur-sm flex justify-center items-center">
              <div className="bg-[#F0F4F9] w-[400px] space-y-4 rounded-[24px] p-6">
                <div className="flex justify-between">
                  <h2 className="font-semibold text-lg mb-4">Edit Location</h2>
                  <button
                    onClick={() => setEditPopupOpen(false)}
                    className="bg-black rounded size-6 text-white text-xs cursor-pointer hover:bg-[#00000090]"
                  >
                    X
                  </button>
                </div>

                {["state", "district", "city", "pincode"].map((field) => (
                  <input
                    key={field}
                    className={`text-base px-4 rounded-[15px] w-full h-[40px] border ${
                      useLocationStore.getState().duplicateIndexes.includes(0)
                        ? "border-red-500"
                        : "border-[#BBBBBB]"
                    } bg-white outline-none`}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={editData[field]}
                    maxLength={field === "pincode" ? 6 : undefined}
                    onChange={(e) => {
                      const val =
                        field === "pincode"
                          ? e.target.value.replace(/\D/g, "")
                          : e.target.value;
                      setEditData({ ...editData, [field]: val });
                      setMessage("");
                    }}
                  />
                ))}

                {message && (
                  <div className="text-red-600 mt-2 text-center">{message}</div>
                )}

                <button
                  onClick={handleUpdate}
                  className="w-full bg-[#196BA5] text-white rounded-[15px] h-[40px] mt-4 mb-8 cursor-pointer"
                >
                  Update
                </button>
              </div>
            </div>
          )}

          {confirmPopupOpen && (
            <ConfirmDeletePopup
              location={listedLocations.find((l) => l.id === checkedIds[0])}
              onConfirm={handleDelete}
              onCancel={() => setConfirmPopupOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ManageLocations;
