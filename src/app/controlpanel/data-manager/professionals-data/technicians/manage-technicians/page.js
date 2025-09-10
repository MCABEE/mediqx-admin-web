"use client";

import React, { useEffect, useState } from "react";
import Navlink from "@/components/dataManager/professionalsData.js/Navlink";
import Link from "next/link";
import EditPopup from "@/components/dataManager/generalData/EditPopup";
import useManageProfessionalsStore from "@/app/lib/store/useManageProfessionalsStore";

function ManageProfessionalsPage() {
  const professionalCategory = "TECHNICIANS";

  const categories = [
    { key: "specializations", label: "Specialization" },
    { key: "qualifications", label: "Qualification" },
    { key: "working-departments", label: "Working Departments" },
    { key: "skills", label: "Skills" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0].key);

  const {
    listedItems,
    pagination,
    isLoading,
    error,
    success,
    fetchItems,
    setPage,
    updateItemId,
    deleteItemId,
    resetSuccess,
  } = useManageProfessionalsStore();

  const [checkedId, setCheckedId] = useState(null);
  const [checkedName, setCheckedName] = useState("");
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    fetchItems(
      selectedCategory,
      pagination[selectedCategory].page,
      pagination[selectedCategory].limit,
      professionalCategory
    );
    setCheckedId(null);
    setCheckedName("");
  }, [
    selectedCategory,
    pagination[selectedCategory].page,
    pagination[selectedCategory].limit,
    fetchItems,
    professionalCategory,
  ]);

  useEffect(() => {
    if (checkedId) {
      const selected = listedItems[selectedCategory]?.find(
        (i) => i.id === checkedId
      );
      if (!selected) return;
      const keyMap = {
        specializations: "specialization",
        qualifications: "qualification",
        "working-departments": "workingDepartment",
        skills: "skill",
      };
      setEditValue(selected[keyMap[selectedCategory]] || "");
      setCheckedName(selected[keyMap[selectedCategory]] || "");
    } else {
      setEditValue("");
      setCheckedName("");
    }
  }, [checkedId, listedItems, selectedCategory]);

  const handleCheckboxChange = (id) => {
    setCheckedId(id === checkedId ? null : id);
    setApiError("");
  };

  const handleUpdate = async () => {
    if (!checkedId) return;
    setApiError("");
    try {
      const keyMap = {
        specializations: "specialization",
        qualifications: "qualification",
        "working-departments": "workingDepartment",
        skills: "skill",
      };
      await updateItemId(
        selectedCategory,
        checkedId,
        { [keyMap[selectedCategory]]: editValue, category: professionalCategory, },
        professionalCategory
      );
      setIsEditPopupOpen(false);
      setCheckedId(null);
      resetSuccess();
    } catch (err) {
      setApiError(err.message || "Error updating item.");
    }
  };

  const handleDelete = async () => {
    if (!checkedId) return;
    try {
      await deleteItemId(selectedCategory, checkedId, professionalCategory);
      setCheckedId(null);
      setIsDeleteConfirmOpen(false);
    } catch (err) {
      console.error("Delete failed", err);
      setApiError(err.message || "Error deleting item.");
    }
  };

  return (
    <div>
      <Navlink />

      <div className="w-full bg-white border border-gray-300 text-base font-semibold flex gap-6 px-6 py-6 rounded-lg mt-2">
        {categories.map(({ key, label }) => (
          <h1
            key={key}
            className={`cursor-pointer font-semibold ${
              selectedCategory === key ? "text-[#196BA5]" : "text-black"
            }`}
            onClick={() => setSelectedCategory(key)}
          >
            {label}
          </h1>
        ))}
      </div>

      <div className="w-full bg-white border border-gray-300 text-base font-semibold flex justify-between px-6 rounded-lg mt-2">
        <div className="flex gap-8 items-center py-5">
          <Link
            href={
              "/controlpanel/data-manager/professionals-data/technicians/add-technicians"
            }
            className="text-black"
          >
            Add
          </Link>
          <h1 className="text-[#196BA5] font-semibold">Manage</h1>
        </div>
      </div>

      {isLoading && <p className="px-6 py-4">Loading...</p>}
      {error && <p className="px-6 py-4 text-red-600">{error}</p>}

      {!isLoading && !error && (
        <>
          {listedItems[selectedCategory]?.map((item, idx) => {
            const keyMap = {
              specializations: "specialization",
              qualifications: "qualification",
              "working-departments": "workingDepartment",
              skills: "skill",
            };
            const value = item[keyMap[selectedCategory]] || "";
            return (
              <div
                key={item.id}
                className="bg-white flex items-center gap-2 px-6 py-2 mt-2"
              >
                <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
                  {(
                    idx +
                    1 +
                    (pagination[selectedCategory].page - 1) *
                      pagination[selectedCategory].limit
                  )
                    .toString()
                    .padStart(2, "0")}
                </div>
                <input
                  className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
                  type="text"
                  value={value}
                  readOnly
                />
                <input
                  type="checkbox"
                  className="w-6 h-6 rounded"
                  checked={checkedId === item.id}
                  onChange={() => handleCheckboxChange(item.id)}
                />
              </div>
            );
          })}

          <div className="flex justify-center items-center gap-3 mt-4">
            <button
              disabled={pagination[selectedCategory].page <= 1}
              onClick={() =>
                setPage(selectedCategory, pagination[selectedCategory].page - 1)
              }
              className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {pagination[selectedCategory].page} of{" "}
              {pagination[selectedCategory].totalPages}
            </span>
            <button
              disabled={
                pagination[selectedCategory].page >=
                pagination[selectedCategory].totalPages
              }
              onClick={() =>
                setPage(selectedCategory, pagination[selectedCategory].page + 1)
              }
              className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <div className="flex gap-3 mt-4 px-6">
            <button
              disabled={!checkedId}
              onClick={() => setIsEditPopupOpen(true)}
              className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 cursor-pointer"
            >
              Edit
            </button>
            <button
              disabled={!checkedId}
              onClick={() => setIsDeleteConfirmOpen(true)}
              className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 cursor-pointer"
            >
              Remove
            </button>
          </div>
        </>
      )}

      {isEditPopupOpen && (
        <EditPopup
          heading={
            categories.find((c) => c.key === selectedCategory)?.label || "Edit"
          }
          value={editValue}
          onChange={setEditValue}
          onUpdate={handleUpdate}
          onClose={() => {
            setIsEditPopupOpen(false);
            setApiError("");
          }}
          apiError={apiError}
        />
      )}

      {isDeleteConfirmOpen && (
        <ConfirmPopup
          itemName={checkedName}
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteConfirmOpen(false)}
        />
      )}
    </div>
  );
}

function ConfirmPopup({ onConfirm, onCancel, itemName }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#3230306a] backdrop-blur-xs z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
        <p className="mb-4">
          Are you sure you want to delete <strong>{itemName}</strong>?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="border px-4 py-2 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageProfessionalsPage;
