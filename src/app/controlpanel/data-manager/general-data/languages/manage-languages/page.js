"use client";
import React, { useEffect, useState } from "react";
import useLanguageStore from "@/app/lib/store/languageStore";
import Navlink from "@/components/dataManager/generalData/Navlink";
import Link from "next/link";
import EditPopup from "@/components/dataManager/generalData/EditPopup";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

function ConfirmDeletePopup({ id, languageName, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-[#4f4f4f4c] backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-md w-[350px]">
        <h2 className="font-semibold text-lg mb-4">Confirm Deletion</h2>
        <p>
          Are you sure you want to delete the language{" "}
          <strong>{languageName}</strong>?
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

function ManageLanguagesPage() {
  const {
    listedLanguages,
    isLoading,
    error,
    page,
    totalPages,
    fetchLanguages,
    setPage,
    deleteLanguageById,
    updateLanguageById,
  } = useLanguageStore();

  const [checkedItems, setCheckedItems] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editLanguage, setEditLanguage] = useState("");
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    fetchLanguages(page, 10);
  }, [page, fetchLanguages]);

  // Synchronize edit input when selection changes
  useEffect(() => {
    if (checkedItems.length === 1) {
      const lang = listedLanguages.find((l) => l.id === checkedItems[0]);
      setEditLanguage(lang?.language || "");
    } else {
      setEditLanguage("");
    }
  }, [checkedItems, listedLanguages]);

  const handleDeleteConfirm = async () => {
    for (const id of checkedItems) {
      await deleteLanguageById(id);
    }
    setCheckedItems([]);
    setIsConfirmOpen(false);
  };

  const handleUpdate = async () => {
    if (checkedItems.length !== 1) return;
    setApiError("");
    try {
      await updateLanguageById(checkedItems[0], editLanguage);
      setIsPopupOpen(false);
      setCheckedItems([]);
    } catch (error) {
      let message = "";
      if (
        (error.response?.data?.message &&
          error.response.data.message
            .toLowerCase()
            .includes("unique constraint failed")) ||
        (typeof error.message === "string" &&
          error.message.toLowerCase().includes("unique constraint failed"))
      ) {
        message = "This language already exists.";
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      } else {
        message = "An unexpected error occurred.";
      }
      setApiError(message);
    }
  };

  return (
    <div>
      <Navlink />
      <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="w-full flex item-center justify-between pt-[23px] pb-[19px]">
          <div className="flex items-center gap-[50px]">
            <Link
              href={
                "/controlpanel/data-manager/general-data/languages/add-languages"
              }
              className="text-black"
            >
              Add
            </Link>
            <h1 className="text-[#3674B5]">Manage</h1>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
        <h1 className="text-black font-semibold py-[16px]">Manage Languages</h1>
      </div>

      {isLoading ? (
        <div className="px-6 py-2 mt-2">Loading languages...</div>
      ) : error ? (
        <div className="px-6 py-2 mt-2 text-red-500">{error}</div>
      ) : (
        <>
          {listedLanguages.map((lang, idx) => (
            <div
              key={lang.id}
              className="bg-white flex items-center gap-2 px-6 py-2 mt-2"
            >
              <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
                {(idx + 1 + (page - 1) * 10).toString().padStart(2, "0")}
              </div>
              <input
                type="text"
                className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
                value={lang.language}
                readOnly
              />
              <div className="flex items-center gap-4 ms-2">
                {/* Edit */}
                <button
                  onClick={() => {
                    setCheckedItems([lang.id]);
                    setEditLanguage(lang.language);
                    setIsPopupOpen(true);
                  }}
                  className="text-[#196BA5] hover:scale-110 transition cursor-pointer"
                  title="Edit"
                >
                  <FiEdit2 size={18} />
                </button>

                {/* Delete */}
                <button
                  onClick={() => {
                    setCheckedItems([lang.id]);
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

          {/* Edit Popup */}

          {isPopupOpen && (
            <EditPopup
              heading={"Language"}
              value={editLanguage}
              onChange={setEditLanguage}
              onUpdate={handleUpdate}
              onClose={() => {
                setIsPopupOpen(false);
                setApiError(""); // clear error on close
              }}
              apiError={apiError} // pass error into popup only
            />
          )}

          {/* Delete Confirmation Popup */}
          {isConfirmOpen && checkedItems.length === 1 && (
            <ConfirmDeletePopup
              id={checkedItems[0]}
              languageName={
                listedLanguages.find((lang) => lang.id === checkedItems[0])
                  ?.language || ""
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

export default ManageLanguagesPage;
