// components/caseBooking/CancelPopup.jsx
"use client";
import React from "react";

const CancelPopup = ({ bookingId, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-[#0000004f] backdrop-blur-xs flex justify-center items-center z-50">
      <div className="bg-white rounded-[15px] p-6 w-[360px] shadow-lg">
        <h2 className="text-lg font-semibold text-black mb-4">
          Are you sure you want to cancel this service?
        </h2>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-[10px] cursor-pointer"
          >
            No
          </button>
          <button
            onClick={() => onConfirm(bookingId)}
            className="bg-[#FF4D4F] text-white px-4 py-2 rounded-[10px] cursor-pointer"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelPopup;
