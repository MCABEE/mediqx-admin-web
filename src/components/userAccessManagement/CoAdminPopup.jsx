// "use client";

// import React, { useEffect, useState } from "react";
// import useUserAccessStore from "@/app/lib/store/useUserAccessStore";

// const PERMISSIONS = [
//   "HOME_ANALYTICS",
//   "STAFF_MANAGEMENT",
//   "AGENT_MANAGEMENT",
//   "SERVICE_BOOKINGS",
//   "CASES",
//   "PATIENT_MANAGEMENT",
//   "RATING_REVIEW",
//   "BILLING",
//   "REFERRAL_MANAGEMENT",
//   "DATA_MANAGER",
//   "NOTIFICATIONS",
//   "PRODUCT_MANAGEMENT",
//   "LEDGER_MANAGEMENT",
//   "USER_ACCESS_MANAGEMENT",
// ];

// export default function CoAdminPopup({ id, onClose }) {
//   const {
//     fetchCoAdminById,
//     selectedCoAdmin,
//     updateCoAdmin,
//     deleteCoAdmin,
//     loading,
//   } = useUserAccessStore();

//   const [edit, setEdit] = useState(false);
//   const [form, setForm] = useState(null);

//   useEffect(() => {
//     fetchCoAdminById(id);
//   }, [id]);

//   useEffect(() => {
//     if (selectedCoAdmin) {
//       setForm({
//         name: selectedCoAdmin.name,
//         role: selectedCoAdmin.role,
//         mobileNumber: selectedCoAdmin.mobileNumber,
//         permissions: selectedCoAdmin.permissions,
//       });
//     }
//   }, [selectedCoAdmin]);

//   if (!form) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//       <div className="bg-white rounded-[15px] p-6 w-[420px]">
//         <h1 className="font-semibold mb-3">
//           Co-Admin Details
//         </h1>

//         <input
//           disabled={!edit}
//           value={form.name}
//           onChange={(e) =>
//             setForm({ ...form, name: e.target.value })
//           }
//           className="w-full border p-2 rounded mb-2"
//         />

//         <input
//           disabled={!edit}
//           value={form.role}
//           onChange={(e) =>
//             setForm({ ...form, role: e.target.value })
//           }
//           className="w-full border p-2 rounded mb-2"
//         />

//         <input
//           disabled={!edit}
//           value={form.mobileNumber}
//           onChange={(e) =>
//             setForm({ ...form, mobileNumber: e.target.value })
//           }
//           className="w-full border p-2 rounded mb-2"
//         />

//         <div className="grid grid-cols-2 gap-2 my-3">
//           {PERMISSIONS.map((p) => (
//             <label key={p} className="flex gap-2">
//               <input
//                 type="checkbox"
//                 disabled={!edit}
//                 checked={form.permissions.includes(p)}
//                 onChange={() =>
//                   setForm((prev) => ({
//                     ...prev,
//                     permissions: prev.permissions.includes(p)
//                       ? prev.permissions.filter((x) => x !== p)
//                       : [...prev.permissions, p],
//                   }))
//                 }
//               />
//               {p}
//             </label>
//           ))}
//         </div>

//         <div className="flex justify-end gap-2 mt-4">
//           {!edit ? (
//             <button onClick={() => setEdit(true)}>
//               Edit
//             </button>
//           ) : (
//             <button
//               onClick={async () => {
//                 await updateCoAdmin(id, {
//                   personalDetails: {
//                     name: form.name,
//                     role: form.role,
//                     mobileNumber: form.mobileNumber,
//                   },
//                   permissions: form.permissions,
//                 });
//                 setEdit(false);
//                 onClose();
//               }}
//             >
//               Save
//             </button>
//           )}

//           <button
//             onClick={async () => {
//               await deleteCoAdmin(id);
//               onClose();
//             }}
//             className="text-red-500"
//           >
//             Delete
//           </button>

//           <button onClick={onClose}>Close</button>
//         </div>
//       </div>
//     </div>
//   );
// }






"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import useUserAccessStore from "@/app/lib/store/useUserAccessStore";

/* ---------------- Permissions ---------------- */
const PERMISSIONS = [
  { key: "HOME_ANALYTICS", label: "Home (Analytics)" },
  { key: "STAFF_MANAGEMENT", label: "Staff Management" },
  { key: "AGENT_MANAGEMENT", label: "Agent Management" },
  { key: "SERVICE_BOOKINGS", label: "Service Bookings" },
  { key: "CASES", label: "Cases" },
  { key: "PATIENT_MANAGEMENT", label: "Patient Management" },
  { key: "RATING_REVIEW", label: "Rating & Review" },
  { key: "BILLING", label: "Billing" },
  { key: "REFERRAL_MANAGEMENT", label: "Referral Management" },
  { key: "DATA_MANAGER", label: "Data Manager" },
  { key: "NOTIFICATIONS", label: "Notifications" },
  { key: "PRODUCT_MANAGEMENT", label: "Product Management" },
  { key: "LEDGER_MANAGEMENT", label: "Ledger Management" },
  { key: "USER_ACCESS_MANAGEMENT", label: "User Access Management" },
];

/* ---------------- Input ---------------- */
const InputField = ({ label, value, disabled, onChange }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      value={value || ""}
      disabled={disabled}
      onChange={onChange}
      className="border border-gray-300 rounded-lg p-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 disabled:bg-gray-100"
    />
  </div>
);

/* ---------------- Delete Confirmation ---------------- */
function DeleteConfirmPopup({ onCancel, onConfirm, loading }) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-6 w-[360px] shadow-xl">
        <h2 className="text-lg font-semibold mb-2">
          Delete Co-Admin?
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Main Popup ---------------- */
export default function CoAdminPopup({ id, onClose }) {
  const {
    fetchCoAdminById,
    selectedCoAdmin,
    updateCoAdmin,
    deleteCoAdmin,
    loading,
  } = useUserAccessStore();

  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    fetchCoAdminById(id);
  }, [id]);

  useEffect(() => {
    if (selectedCoAdmin) {
      setForm({
        name: selectedCoAdmin.name || "",
        email: selectedCoAdmin.email || "",
        role: selectedCoAdmin.role || "",
        mobileNumber: selectedCoAdmin.mobileNumber || "",
        permissions: selectedCoAdmin.permissions || [],
      });
    }
  }, [selectedCoAdmin]);

  if (!form) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div
          className="relative bg-white w-full max-w-2xl max-h-[90vh]
                     overflow-y-auto rounded-2xl p-6 shadow-xl
                     border border-gray-200"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <AiOutlineClose className="w-5 h-5" />
          </button>

          {/* Header */}
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Co-Admin Details
          </h2>

          {/* Form */}
          <div className="space-y-4">
            <InputField
              label="Name"
              value={form.name}
              disabled={!edit}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <InputField
              label="Email"
              value={form.email}
              disabled
            />

            <InputField
              label="Role / Designation"
              value={form.role}
              disabled={!edit}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            />

            <InputField
              label="Mobile Number"
              value={form.mobileNumber}
              disabled
            />

            {/* Permissions */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Permissions
              </label>

              <div className="grid grid-cols-2 gap-3">
                {PERMISSIONS.map((p) => (
                  <label
                    key={p.key}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      disabled={!edit}
                      checked={form.permissions.includes(p.key)}
                      onChange={() =>
                        setForm((prev) => ({
                          ...prev,
                          permissions: prev.permissions.includes(p.key)
                            ? prev.permissions.filter(
                                (x) => x !== p.key
                              )
                            : [...prev.permissions, p.key],
                        }))
                      }
                    />
                    {p.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200
                         text-gray-800 rounded-lg font-medium"
            >
              Close
            </button>

            {!edit ? (
              <button
                onClick={() => setEdit(true)}
                className="px-4 py-2 bg-blue-800 hover:bg-blue-700
                           text-white rounded-lg font-semibold"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={async () => {
                  await updateCoAdmin(id, {
                    personalDetails: {
                      name: form.name,
                      role: form.role,
                      mobileNumber: form.mobileNumber,
                    },
                    permissions: form.permissions,
                  });
                  setEdit(false);
                  onClose();
                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700
                           text-white rounded-lg font-semibold"
              >
                Save
              </button>
            )}

            <button
              onClick={() => setShowDelete(true)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700
                         text-white rounded-lg font-semibold"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* DELETE CONFIRM */}
      {showDelete && (
        <DeleteConfirmPopup
          loading={loading}
          onCancel={() => setShowDelete(false)}
          onConfirm={async () => {
            await deleteCoAdmin(id);
            setShowDelete(false);
            onClose();
          }}
        />
      )}
    </>
  );
}
