"use client";

import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import useAmbulanceStore from "@/app/lib/store/useAmbulanceStore";
import LocationPickerPopup from "../staffManagement/addNewStaff/LocationPickerPopup";
import { FaSortDown } from "react-icons/fa";

function EditAmbulancePopup({ ambulance, onClose }) {
  const { updateAmbulance, fetchAmbulances } = useAmbulanceStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  /* ---------------- FORM STATE ---------------- */
  const [form, setForm] = useState({
    ambulanceName: ambulance.ambulanceName || "",
    ambulanceType: ambulance.ambulanceType || "",
    vehicleType: ambulance.vehicleType || "",
    fullName: ambulance.fullName || "",
    email: ambulance.email || "",
    mobileNumber: ambulance.mobileNumber?.replace("+91", "") || "",
    customerCareNumber: ambulance.customerCareNumber?.replace("+91", "") || "",
  });

  const [location, setLocation] = useState({
    latitude: ambulance.latitude || "",
    longitude: ambulance.longitude || "",
    mapLocation: ambulance.mapLocation || "",
  });

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only digits for phone fields
    if (
      (name === "mobileNumber" || name === "customerCareNumber") &&
      (!/^\d*$/.test(value) || value.length > 10)
    ) {
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const newErrors = {};

    if (!form.ambulanceName)
      newErrors.ambulanceName = "Ambulance name required";
    if (!form.ambulanceType) newErrors.ambulanceType = "Select ambulance type";
    if (!form.vehicleType) newErrors.vehicleType = "Select vehicle type";
    if (!form.fullName) newErrors.fullName = "Driver name required";

    if (!form.mobileNumber || form.mobileNumber.length !== 10)
      newErrors.mobileNumber = "Enter valid 10 digit number";

    if (form.customerCareNumber && form.customerCareNumber.length !== 10)
      newErrors.customerCareNumber = "Must be 10 digits";

    if (!location.latitude || !location.longitude)
      newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);

    const payload = {
      ...form,
      mobileNumber: `+91${form.mobileNumber}`,
      customerCareNumber: form.customerCareNumber
        ? `+91${form.customerCareNumber}`
        : "",
      latitude: location.latitude,
      longitude: location.longitude,
      mapLocation: location.mapLocation,
    };

    try {
      await updateAmbulance(ambulance.id, payload);

      // Refresh list once
      //   await fetchAmbulances(1, { filter: "ALL" });

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="relative bg-white w-full max-w-2xl rounded-2xl p-6 shadow-xl border border-gray-200">
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <AiOutlineClose className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Edit Ambulance Service
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {/* Ambulance Name */}
            <Input
              label="Ambulance Name"
              name="ambulanceName"
              value={form.ambulanceName}
              onChange={handleChange}
              error={errors.ambulanceName}
            />

            {/* Ambulance Type */}
            <Select
              label="Ambulance Type"
              name="ambulanceType"
              value={form.ambulanceType}
              onChange={handleChange}
              error={errors.ambulanceType}
              options={[
                { label: "Select", value: "" },
                { label: "Basic Life Support", value: "BASIC_LIFE_SUPPORT" },
                { label: "Cardiac Ambulance", value: "CARDIAC_AMBULANCE" },
                { label: "ICU Level 1", value: "ICU_LEVEL_1" },
                { label: "ICU Level 2", value: "ICU_LEVEL_2" },
                { label: "ICU Level 3", value: "ICU_LEVEL_3" },
              ]}
            />

            {/* Vehicle Type */}
            <Select
              label="Vehicle Type"
              name="vehicleType"
              value={form.vehicleType}
              onChange={handleChange}
              error={errors.vehicleType}
              options={[
                { label: "Select", value: "" },
                { label: "Maruti Omni", value: "MARUTI_OMNI" },
                { label: "Force Traveller", value: "FORCE_TRAVELLER" },
                { label: "Tata Winger", value: "TATA_WINGER_AMBULANCE" },
                { label: "Toyota Hiace", value: "TOYOTA_HIACE" },
              ]}
            />

            {/* Driver Name */}
            <Input
              label="Driver Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />

            {/* Mobile */}
            <PhoneInput
              label="Mobile Number"
              name="mobileNumber"
              value={form.mobileNumber}
              onChange={handleChange}
              error={errors.mobileNumber}
            />

            {/* Email */}
            <Input
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            {/* Customer Care */}
            <PhoneInput
              label="Customer Care Number"
              name="customerCareNumber"
              value={form.customerCareNumber}
              onChange={handleChange}
              error={errors.customerCareNumber}
            />

            {/* Location */}
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Location
              </label>
              <button
                type="button"
                onClick={() => setShowLocationPopup(true)}
                className="w-full border border-gray-300 rounded-lg p-2 text-left text-sm"
              >
                {location.mapLocation || "Pick location on map"}
              </button>
              {errors.location && (
                <p className="text-red-500 text-xs mt-1">{errors.location}</p>
              )}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* LOCATION PICKER */}
      {showLocationPopup && (
        <LocationPickerPopup
          currentLat={location.latitude}
          currentLng={location.longitude}
          bookingId={null}
          onClose={() => setShowLocationPopup(false)}
          onUpdated={(coords) => {
            setLocation(coords);
            setShowLocationPopup(false);
          }}
        />
      )}
    </>
  );
}

/* ---------- SMALL UI HELPERS ---------- */

const Input = ({ label, error, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 mb-1 block">
      {label}
    </label>
    <input
      {...props}
      className="w-full border border-gray-300 rounded-lg p-2 text-sm"
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const Select = ({ label, options, error, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 mb-1 block">
      {label}
    </label>
    <div className="relative w-full">
      <select
        {...props}
        className="w-full border border-gray-300 rounded-lg p-2 text-sm appearance-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <FaSortDown
        size={18}
        className="absolute right-4 top-1/2 -translate-y-[65%] text-gray-400 pointer-events-none"
      />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const PhoneInput = ({ label, error, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 mb-1 block">
      {label}
    </label>
    <div className="flex gap-2">
      <span className="px-3 py-2 border rounded-lg text-sm bg-gray-50">
        +91
      </span>
      <input
        {...props}
        className="flex-1 border border-gray-300 rounded-lg p-2 text-sm"
      />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default EditAmbulancePopup;
