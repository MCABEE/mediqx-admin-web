"use client";

import React, { useEffect, useState } from "react";
import Navlink from "@/components/ambulances/Navlink";
import EditAmbulancePopup from "@/components/ambulances/EditAmbulancePopup";
import useAmbulanceStore from "@/app/lib/store/useAmbulanceStore";
import ConfirmationPopup from "@/components/ambulances/ConfirmationPopup";

function Page() {
  const {
    ambulances,
    loading,
    totalPages,
    fetchAmbulances,
    deleteAmbulance,
    approveAmbulance,
    actionLoading,
  } = useAmbulanceStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [editData, setEditData] = useState(null);

  const [confirmPopup, setConfirmPopup] = useState({
    open: false,
    type: null, // "CONFIRM" | "CANCEL"
    ambulance: null,
  });

  useEffect(() => {
    fetchAmbulances(currentPage, { filter: "ALL" });
  }, [currentPage]);

  const handleConfirmAction = async () => {
    const { type, ambulance } = confirmPopup;

    if (!ambulance) return;

    if (type === "CANCEL") {
      await deleteAmbulance(ambulance.id);
    }

    if (type === "CONFIRM") {
      await approveAmbulance(ambulance.id);
    }

    setConfirmPopup({ open: false, type: null, ambulance: null });
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!ambulances?.length) {
    return <div className="text-center mt-10">No ambulances found</div>;
  }

  return (
    <div>
      <Navlink />

      {/* LIST */}
      <div className="mt-4 flex flex-col gap-4">
        {ambulances.map((ambulance) => (
          <div
            key={ambulance.id}
            className="bg-white border border-[#BBBBBB] rounded-[15px]"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center border-b border-[#BBBBBB] px-6 py-4">
              <span className="font-semibold">
                Joined :{" "}
                {new Date(ambulance.createdAt).toLocaleDateString("en-IN")}
              </span>

              <button
                onClick={() => setEditData(ambulance)}
                className="w-[192px] h-[40px] bg-white text-[#333333] border flex justify-center items-center rounded-[15px] cursor-pointer"
              >
                Edit Service
              </button>
            </div>

            {/* DETAILS */}
            <div className="flex p-6 gap-10">
              {/* LABELS */}
              <div className="font-semibold flex flex-col gap-2 w-[220px]">
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
                <span>{ambulance.ambulanceName || "-"}</span>
                <span>{ambulance.ambulanceType || "-"}</span>
                <span>{ambulance.vehicleType || "-"}</span>
                <span>{ambulance.fullName || "-"}</span>
                <span>{ambulance.mobileNumber || "-"}</span>
                <span>{ambulance.email || "NIL"}</span>
                <span>{ambulance.customerCareNumber || "NIL"}</span>
                <span>{ambulance.mapLocation || "NIL"}</span>
              </div>
            </div>

            {/* FOOTER ACTIONS */}
            <div className="flex gap-4 border-t border-[#BBBBBB] px-6 py-4">
              <button
                onClick={() =>
                  setConfirmPopup({
                    open: true,
                    type: "CANCEL",
                    ambulance,
                  })
                }
                className="w-[192px] h-[40px] bg-[#FFD1D9] text-[#333333] flex justify-center items-center rounded-[15px] cursor-pointer"
              >
                Cancel Service
              </button>

              <button
                onClick={() =>
                  setConfirmPopup({
                    open: true,
                    type: "CONFIRM",
                    ambulance,
                  })
                }
                className="w-[192px] h-[40px] bg-[#09B438] text-white flex justify-center items-center rounded-[15px] cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {/* {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const p = index + 1;
            return (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`px-4 py-2 border rounded ${
                  p === currentPage
                    ? "bg-blue-800 text-white"
                    : "bg-white"
                }`}
              >
                {p}
              </button>
            );
          })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )} */}

      {totalPages > 1 && (
        <div className="flex justify-between items-center gap-4 my-8">
          {/* PREV */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          {/* PAGE INFO */}
          <span className="font-medium text-[14px]">
            Page <span className="font-semibold">{currentPage}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </span>

          {/* NEXT */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* EDIT POPUP */}
      {editData && (
        <EditAmbulancePopup
          ambulance={editData}
          onClose={() => setEditData(null)}
        />
      )}

      {/* CONFIRM / CANCEL POPUP */}
      <ConfirmationPopup
        open={confirmPopup.open}
        title={
          confirmPopup.type === "CONFIRM"
            ? "Confirm Ambulance Service"
            : "Cancel Ambulance Service"
        }
        message={
          confirmPopup.type === "CONFIRM"
            ? `Are you sure you want to confirm ${confirmPopup.ambulance?.ambulanceName}?`
            : `Are you sure you want to cancel ${confirmPopup.ambulance?.ambulanceName}?`
        }
        confirmText={confirmPopup.type === "CONFIRM" ? "Confirm" : "Cancel"}
        onConfirm={handleConfirmAction}
        onCancel={() =>
          setConfirmPopup({ open: false, type: null, ambulance: null })
        }
        loading={actionLoading}
      />
    </div>
  );
}

export default Page;
