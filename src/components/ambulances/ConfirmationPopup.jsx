"use client";

import React from "react";

function ConfirmationPopup({
  open,
  title,
  message,
  confirmText = "Confirm",
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[420px] rounded-[16px] shadow-lg p-6">
        {/* TITLE */}
        <h2 className="text-[18px] font-semibold mb-2">{title}</h2>

        {/* MESSAGE */}
        <p className="text-[14px] text-gray-600 mb-6">{message}</p>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-5 py-2 border rounded-[10px] text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            No
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-5 py-2 rounded-[10px] text-white ${
              confirmText === "Cancel"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-[#09B438] hover:bg-green-700"
            } disabled:opacity-50`}
          >
            {loading ? "Please wait..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPopup;
