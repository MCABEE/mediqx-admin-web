"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";
import LocationPickerPopup from "../staffManagement/addNewStaff/LocationPickerPopup";

/* -------------------- Reusable Inputs (same as Nurse modal) -------------------- */
const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
}) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      className="border border-gray-300 rounded-lg p-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 disabled:bg-gray-100"
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      value={value || ""}
      onChange={onChange}
      className="border border-gray-300 rounded-lg p-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
/* ----------------------------------------------------------------------------- */

export default function EditSupervisorBasicPopup({ show, onClose, supervisor }) {
  const {
    updateSupervisorPageOne,
    getSupervisorDetails, // 🔹 VIEW DETAILS API
  } = useSupervisorRegistrationStore();

  const [form, setForm] = useState({});
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  /* -------------------- Populate form from supervisor -------------------- */
  useEffect(() => {
    if (supervisor) {
      setForm({
        fullName: supervisor.fullName || "",
        gender: supervisor.gender || "",
        email: supervisor.email || "",
        mobileNumber: supervisor.mobileNumber || "",
        dob: supervisor.dob
          ? new Date(supervisor.dob).toISOString().split("T")[0]
          : "",
        latitude: supervisor.latitude || null,
        longitude: supervisor.longitude || null,
        mapLocation: supervisor.mapLocation || "",
        categoryByProfession: supervisor.categoryByProfession || "",
      });
    }
  }, [supervisor]);

  if (!show) return null;

  /* -------------------- Save + Refresh -------------------- */
  const handleSave = async () => {
    await updateSupervisorPageOne(supervisor.id, {
      fullName: form.fullName,
      gender: form.gender,
      email: form.email,
      mobileNumber: form.mobileNumber,
      dob: form.dob || null,
      latitude: form.latitude,
      longitude: form.longitude,
      mapLocation: form.mapLocation,
      categoryByProfession: form.categoryByProfession,
    });

    // ✅ REFRESH VIEW DETAILS (this updates UI instantly)
    await getSupervisorDetails(supervisor.id);

    onClose();
  };

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
            Edit Supervisor Details
          </h2>

          {/* Form */}
          <div className="space-y-4">
            <InputField
              label="Full Name"
              value={form.fullName}
              onChange={(e) =>
                setForm((p) => ({ ...p, fullName: e.target.value }))
              }
            />

            <InputField
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
            />

            <InputField
              label="Mobile Number"
              value={form.mobileNumber}
              disabled
            />

            <InputField
              label="Date of Birth"
              type="date"
              value={form.dob}
              onChange={(e) =>
                setForm((p) => ({ ...p, dob: e.target.value }))
              }
            />

            <SelectField
              label="Gender"
              value={form.gender}
              onChange={(e) =>
                setForm((p) => ({ ...p, gender: e.target.value }))
              }
              options={[
                { label: "Select gender", value: "" },
                { label: "MALE", value: "MALE" },
                { label: "FEMALE", value: "FEMALE" },
                { label: "OTHER", value: "OTHER" },
              ]}
            />

            <SelectField
              label="Category by Profession"
              value={form.categoryByProfession}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  categoryByProfession: e.target.value,
                }))
              }
              options={[
                { label: "Select category", value: "" },
                { label: "ADMIN", value: "ADMIN" },
                { label: "SUPERVISOR", value: "SUPERVISOR" },
                { label: "FIELD_STAFF", value: "FIELD_STAFF" },
              ]}
            />

            {/* Location */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Living Location
              </label>
              <button
                type="button"
                onClick={() => setShowLocationPopup(true)}
                className="border border-gray-300 rounded-lg p-2 text-sm text-left
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {form.mapLocation || "Pick location on map"}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200
                         text-gray-800 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-800 hover:bg-blue-700
                         text-white rounded-lg font-semibold"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Location Picker */}
      {showLocationPopup && (
        <LocationPickerPopup
          currentLat={form.latitude}
          currentLng={form.longitude}
          onClose={() => setShowLocationPopup(false)}
          onUpdated={(loc) =>
            setForm((p) => ({
              ...p,
              latitude: loc.latitude,
              longitude: loc.longitude,
              mapLocation: loc.mapLocation || loc.fullAddress,
            }))
          }
        />
      )}
    </>
  );
}
