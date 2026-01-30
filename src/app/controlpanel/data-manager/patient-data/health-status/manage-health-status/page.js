"use client";
import React, { useEffect, useState } from "react";
import Navlink from "@/components/dataManager/patientData/Navlink";
import Link from "next/link";
import EditPopup from "@/components/dataManager/generalData/EditPopup";
import useHealthStatusStore from "@/app/lib/store/useHealthStatusStore";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

function ConfirmDeletePopup({ statusName, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-[#4f4f4f4c] backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-md w-[350px]">
        <h2 className="font-semibold text-lg mb-4">Confirm Deletion</h2>
        <p>
          Are you sure you want to delete the status{" "}
          <strong>{statusName}</strong>?
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

function ManageHealthStatusPage() {
  const {
    listedServices,
    isLoading,
    error,
    page,
    totalPages,
    fetchServices,
    setPage,
    updateServiceById,
    deleteServiceById,
  } = useHealthStatusStore();

  const [checkedItems, setCheckedItems] = useState([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editStatusName, setEditStatusName] = useState("");
  const [search, setSearch] = useState("");

  const [apiError, setApiError] = useState("");

  useEffect(() => {
    fetchServices(page, 10, search);
  }, [page, search, fetchServices]);

  useEffect(() => {
    if (checkedItems.length === 1) {
      const status = listedServices.find((s) => s.id === checkedItems[0]);
      setEditStatusName(status?.status || "");
    } else {
      setEditStatusName("");
      setApiError("");
    }
  }, [checkedItems, listedServices]);

  const handleDeleteConfirm = async () => {
    for (const id of checkedItems) {
      await deleteServiceById(id);
    }
    setCheckedItems([]);
    setIsConfirmOpen(false);
  };

  const handleUpdate = async () => {
    if (checkedItems.length !== 1) return;
    if (!editStatusName.trim()) {
      setApiError("Health Status is required");
      return;
    }
    setApiError("");
    try {
      await updateServiceById(checkedItems[0], editStatusName);
      setIsEditPopupOpen(false);
      setCheckedItems([]);
    } catch (error) {
      setApiError(error.message || "An error occurred.");
    }
  };

  return (
    <div>
      <Navlink />
      <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
          <div className="flex items-center gap-[50px]">
            <Link
              href="/controlpanel/data-manager/patient-data/health-status/add-health-status"
              className="text-black"
            >
              Add
            </Link>
            <h1 className="text-[#3674B5]">Manage</h1>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between items-center bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
        <h1 className="text-black font-semibold py-[16px]">
          Manage Health Status
        </h1>
        <input
          type="search"
          placeholder="Search health status"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset pagination on search
          }}
          className="w-[300px] px-4 py-2 border bg-white border-[#BBBBBB] rounded-[15px] outline-none"
        />
      </div>

      {isLoading ? (
        <div className="px-6 py-2 mt-2">Loading health statuses...</div>
      ) : error ? (
        <div className="px-6 py-2 mt-2 text-red-500">{error}</div>
      ) : (
        <>
          {listedServices.map((status, idx) => (
            <div
              key={status.id}
              className="bg-white flex items-center gap-2 px-6 py-2 mt-2"
            >
              <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
                {(idx + 1 + (page - 1) * 10).toString().padStart(2, "0")}
              </div>
              <input
                type="text"
                className="w-[300px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
                value={status.status}
                readOnly
              />
              {/* ACTION ICONS */}
              <div className="flex items-center gap-4 ms-2">
                {/* Edit */}
                <button
                  onClick={() => {
                    setCheckedItems([status.id]);
                    setEditStatusName(status.status);
                    setIsEditPopupOpen(true);
                  }}
                  className="text-[#196BA5] hover:scale-110 transition cursor-pointer"
                  title="Edit"
                >
                  <FiEdit2 size={18} />
                </button>

                {/* Delete */}
                <button
                  onClick={() => {
                    setCheckedItems([status.id]);
                    setIsConfirmOpen(true);
                  }}
                  className="text-red-600 hover:scale-110 transition cursor-pointer"
                  title="Delete"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
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

          {isEditPopupOpen && (
            <EditPopup
              heading="Health Status"
              value={editStatusName}
              onChange={setEditStatusName}
              onUpdate={handleUpdate}
              onClose={() => {
                setIsEditPopupOpen(false);
                setApiError("");
              }}
              apiError={apiError}
            />
          )}

          {isConfirmOpen && checkedItems.length === 1 && (
            <ConfirmDeletePopup
              statusName={
                listedServices.find((s) => s.id === checkedItems[0])?.status ||
                ""
              }
              onConfirm={handleDeleteConfirm}
              onCancel={() => setIsConfirmOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ManageHealthStatusPage;
