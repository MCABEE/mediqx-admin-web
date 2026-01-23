"use client";

import React, { useEffect, useState } from "react";
import usePaymentStructureStore from "@/app/lib/store/usePaymentStructureStore";
import AddPaymentPopup from "./AddPaymentPopup";
import ViewPaymentPopup from "./ViewPaymentPopup";

// enums (keep in sync with API frontend values)
const CATEGORY_OPTIONS = [
  "GRADE_01",
  "GRADE_02",
  "GRADE_03",
  "GRADE_04",
  "GRADE_05",
  "GRADE_06",
  "GRADE_07",
];

const DUTY_OPTIONS = [
  "SHIFT_24_HOURS",
  "DAY_SHIFT_12_HOURS",
  "NIGHT_SHIFT_12_HOURS",
  "SHIFT_FLEXIBLE_HOURS",
];

// Map tabs (display text) to role values used by the API/store.
const TABS = [
  { label: "Regd Nurse", role: "REG_NURSES" },
  { label: "Assistant Nurse", role: "NURSING_ASSISTANTS" },
  { label: "Technicians", role: "TECHNICIANS" },
  { label: "Therapy", role: "THERAPY" },
  { label: "Ancillary Pros", role: "ANCILLARY" },
];

export default function PaymentStructureTable() {
  const {
    structures,
    page,
    totalPages,
    loading,
    error,
    limit,
    role, // current selected role from store
    category,
    dutySchedule,
    fetchStructures,
    setRole,
    setCategory,
    setDutySchedule,
    setLimit,
    removeStructure,
  } = usePaymentStructureStore();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [view, setView] = useState({ open: false, item: null });

  // Ensure list loads when relevant filters change
  useEffect(() => {
    fetchStructures(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, category, dutySchedule, limit]);

  const onDelete = async (id) => {
    if (!confirm("Delete this payment structure?")) return;
    try {
      await removeStructure(id);
      // store will re-fetch after deletion
    } catch (err) {
      alert("Delete failed: " + (err?.message || err));
    }
  };

  // active tab index (for styling)
  const activeTabIndex = TABS.findIndex((t) => t.role === role);
  const activeIndex = activeTabIndex === -1 ? 0 : activeTabIndex;

  return (
    <div>
      {/* Top Tabs */}
      <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex gap-[24px] px-4 pt-4 rounded-[15px]">
        {TABS.map((tab) => {
          const isActive = tab.role === role;
          return (
            <button
              key={tab.role}
              onClick={() => setRole(tab.role)}
              className={`h-full box-border flex items-center text-base cursor-pointer px-3 pb-3 rounded-t-md transition ${
                isActive
                  ? "border-b-8 border-[#3674B5] text-[#3674B5] font-semibold"
                  : "text-black/80 hover:text-[#3674B5]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Filters + Add */}
      <div className="w-full bg-white border border-[#8888888c] text-base text-black flex justify-between items-center px-6 py-4 mt-3 rounded-[15px]">
        <div className="flex gap-[10px] items-center">
          <select
            value={category || ""}
            onChange={(e) => setCategory(e.target.value || "")}
            className="w-[192px] h-[40px] rounded-[10px] text-[14px] border border-[#bbbbbb] outline-none px-4"
          >
            <option value="">Select Category</option>
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={dutySchedule || ""}
            onChange={(e) => setDutySchedule(e.target.value || "")}
            className="w-[192px] h-[40px] rounded-[10px] text-[14px] border border-[#bbbbbb] outline-none px-4"
          >
            <option value="">Select Duty</option>
            {DUTY_OPTIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setCategory("");
              setDutySchedule("");
              fetchStructures(1);
            }}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
          >
            Clear
          </button>
        </div>

        <div>
          <button
            onClick={() => setIsAddOpen(true)}
            className="size-[40px] bg-[#3674B5] text-white text-xl rounded-[10px]"
            title="Add payment structure"
          >
            +
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-black border-separate border-spacing-y-2">
          <thead className="bg-[#C0D8F6]">
            <tr>
              <th className="text-base rounded-l-2xl p-2">Services</th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">Charge</th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">Final Bill</th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">Staff Pay</th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">S. Referral</th>
              <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">P. Referral</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-red-600">
                  {error}
                </td>
              </tr>
            ) : structures.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center">
                  No records found
                </td>
              </tr>
            ) : (
              structures.map((s) => {
                const id = s.id ?? s._id;
                // determine role to pass: prefer s.role if present, otherwise current selected role
                const itemRole = s.role ?? role;

                return (
                  <tr
                    key={id}
                    className="bg-white cursor-pointer hover:bg-[#E8F1FD] transition"
                    onClick={() => setView({ open: true, item: { ...s, id, role: itemRole } })}
                  >
                    {/* SERVICE */}
                    <td className="p-2 text-center">{s.serviceType?? "-"}</td>

                    {/* CHARGE */}
                    <td className="border-l-4 border-[#C0D8F6] p-2 text-center">₹{s.basePrice ?? s.charge ?? "-"}</td>

                    {/* FINAL BILL */}
                    <td className="border-l-4 border-[#C0D8F6] p-2 text-center">₹{s.finalBill ?? "-"}</td>

                    {/* STAFF PAY */}
                    <td className="border-l-4 border-[#C0D8F6] p-2 text-center">₹{s.staffPayment ?? s.staffPayAmount ?? "-"}</td>

                    {/* STAFF REFERRAL */}
                    <td className="border-l-4 border-[#C0D8F6] p-2 text-center">₹{s.staffReferralPayment ?? s.staffReferralValue ?? "-"}</td>

                    {/* PATIENT REFERRAL */}
                    <td className="border-l-4 border-[#C0D8F6] p-2 text-center">₹{s.patientReferralPayment ?? s.patientReferralValue ?? "-"}</td>

                    {/* (Optional) ACTIONS - commented out; if you re-enable, stopPropagation to avoid row click */}
                    {false && (
                      <td className="border-l-4 border-[#C0D8F6] p-2 text-center">
                        <button
                          className="mr-2 px-2 py-1 bg-[#3674B5] text-white rounded"
                          onClick={(e) => {
                            e.stopPropagation();
                            setView({ open: true, item: { ...s, id, role: itemRole } });
                          }}
                        >
                          View
                        </button>

                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center my-4">
        <div>
          <button
            onClick={() => fetchStructures(Math.max(1, page - 1))}
            disabled={page <= 1}
            className="px-3 py-1 bg-[#C0D8F6] rounded disabled:opacity-50 mr-2"
          >
            Previous
          </button>
          <button
            onClick={() => fetchStructures(Math.min(totalPages || 1, page + 1))}
            disabled={page >= (totalPages || 1)}
            className="px-3 py-1 bg-[#C0D8F6] rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div>
          <span className="text-black font-semibold">{page} / {totalPages || 1}</span>
        </div>
      </div>

      {/* Popups */}
      {isAddOpen && <AddPaymentPopup onClose={() => setIsAddOpen(false)} />}
      {view.open && (
        <ViewPaymentPopup
          payment={view.item} // contains id and role now
          onClose={() => setView({ open: false, item: null })}
        />
      )}
    </div>
  );
}
