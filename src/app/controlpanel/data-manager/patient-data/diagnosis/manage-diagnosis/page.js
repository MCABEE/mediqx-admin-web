"use client";
import React, { useEffect, useState } from "react";
import Navlink from "@/components/dataManager/patientData/Navlink";
import Link from "next/link";
import EditPopup from "@/components/dataManager/generalData/EditPopup";
import useDiagnosisStore from "@/app/lib/store/useDiagnosisStore";

function ConfirmDeletePopup({ diagnosisName, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-[#4f4f4f4c] backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-md w-[350px]">
        <h2 className="font-semibold text-lg mb-4">Confirm Deletion</h2>
        <p>
          Are you sure you want to delete the diagnosis{" "}
          <strong>{diagnosisName}</strong>?
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

function ManageDiagnosisPage() {
  const {
    listedDiagnoses,
    isLoading,
    error,
    page,
    totalPages,
    fetchDiagnosesList,
    setPage,
    updateDiagnosisById,
    deleteDiagnosisById,
  } = useDiagnosisStore();

  // To keep JSX consistent with store keys rename:
  const listedServices = listedDiagnoses;
  const fetchServices = fetchDiagnosesList;

  const [checkedItems, setCheckedItems] = useState([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editDiagnosisName, setEditDiagnosisName] = useState("");
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    fetchServices(page, 10);
  }, [page, fetchServices]);

  const handleCheckbox = (id) => {
    setCheckedItems((prev) => (prev.includes(id) ? [] : [id]));
  };

  useEffect(() => {
    if (checkedItems.length === 1) {
      const diagnosis = listedServices.find((d) => d.id === checkedItems[0]);
      setEditDiagnosisName(diagnosis?.diagnosis || "");
    } else {
      setEditDiagnosisName("");
      setApiError("");
    }
  }, [checkedItems, listedServices]);

  const handleDeleteConfirm = async () => {
    for (const id of checkedItems) {
      await deleteDiagnosisById(id);
    }
    setCheckedItems([]);
    setIsConfirmOpen(false);
  };

  const handleUpdate = async () => {
    if (checkedItems.length !== 1) return;
    if (!editDiagnosisName.trim()) {
      setApiError("Diagnosis is required");
      return;
    }
    setApiError("");
    try {
      await updateDiagnosisById(checkedItems[0], editDiagnosisName);
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
              href="/controlpanel/data-manager/patient-data/diagnosis/add-diagnosis"
              className="text-black"
            >
              Add
            </Link>
            <h1 className="text-[#3674B5]">Manage</h1>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
        <h1 className="text-black font-semibold py-[16px]">Manage Diagnosis</h1>
      </div>

      {isLoading ? (
        <div className="px-6 py-2 mt-2">Loading diagnoses...</div>
      ) : error ? (
        <div className="px-6 py-2 mt-2 text-red-500">{error}</div>
      ) : (
        <>
          {listedServices.map((diagnosis, idx) => (
            <div
              key={diagnosis.id}
              className="bg-white flex items-center gap-2 px-6 py-2 mt-2"
            >
              <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
                {(idx + 1 + (page - 1) * 10).toString().padStart(2, "0")}
              </div>
              <input
                type="text"
                className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
                value={diagnosis.diagnosis}
                readOnly
              />
              <input
                type="checkbox"
                className="size-6 rounded-[15px]"
                checked={checkedItems.includes(diagnosis.id)}
                onChange={() => handleCheckbox(diagnosis.id)}
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

          <div className="flex gap-3 mt-4 px-6">
            <button
              disabled={checkedItems.length !== 1}
              onClick={() => setIsEditPopupOpen(true)}
              className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 cursor-pointer"
            >
              Edit
            </button>
            <button
              disabled={checkedItems.length === 0}
              onClick={() => setIsConfirmOpen(true)}
              className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 cursor-pointer"
            >
              Remove
            </button>
          </div>

          {isEditPopupOpen && (
            <EditPopup
              heading="Diagnosis"
              value={editDiagnosisName}
              onChange={setEditDiagnosisName}
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
              diagnosisName={
                listedServices.find((d) => d.id === checkedItems[0])
                  ?.diagnosis || ""
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

export default ManageDiagnosisPage;
