"use client";
import React, { useState, useEffect } from "react";

export default function EditContactModal({
  show,
  contact,
  onChange,
  onCancel,
  onSave,
}) {
  const [districts, setDistricts] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const stateDistrictMap = {
      Kerala: ["Ernakulam", "Trivandrum", "Kozhikode"],
      Karnataka: ["Bangalore", "Mysore", "Mangalore"],
    };

    const selectedState = contact.address?.state;
    if (selectedState && stateDistrictMap[selectedState]) {
      setDistricts(stateDistrictMap[selectedState]);
    } else {
      setDistricts([]);
    }
  }, [contact.address?.state]);

  if (!show) return null;

  const handleFieldChange = (field, value) => {
    onChange({ ...contact, [field]: value });

    // Validate mobileNumber
    if (field === "mobileNumber") {
      const isValid = /^[0-9]{10}$/.test(value);
      setErrors((prev) => ({
        ...prev,
        mobileNumber: isValid ? null : "Mobile number must be 10 digits",
      }));
    }
  };

  const handleAddressChange = (field, value) => {
    const updatedAddress = {
      ...contact.address,
      [field]: value,
    };
    onChange({ ...contact, address: updatedAddress });

    // Validate pincode
    if (field === "pincode") {
      const isValid = /^[0-9]{6}$/.test(value);
      setErrors((prev) => ({
        ...prev,
        pincode: isValid ? null : "Pincode must be 6 digits",
      }));
    }
  };

  const handleSave = () => {
    // Check if there are any validation errors before saving
    if (errors.mobileNumber || errors.pincode) return;
    onSave();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#9f9e9e64] bg-opacity-50 backdrop-blur-xs animate-fadeIn"
      aria-modal="true"
      role="dialog"
      aria-labelledby="edit-contact-title"
    >
      <div className="h-[600px] bg-white rounded-xl shadow-2xl max-w-xl w-full p-8 space-y-6">
        <h2
          id="edit-contact-title"
          className="text-2xl font-semibold text-gray-900"
        >
          Edit Contact Details
        </h2>

        <div className="h-[420px] overflow-y-scroll pr-1">
          {/* Gender */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 text-gray-700 font-medium">Gender</label>
            <select
              value={contact.gender || ""}
              onChange={(e) => handleFieldChange("gender", e.target.value)}
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Full Name, Email, Mobile Number */}
          {["fullName", "email", "mobileNumber"].map((field) => (
            <div key={field} className="flex flex-col mb-4">
              <label className="mb-1 text-gray-700 font-medium capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="text"
                value={contact[field] || ""}
                onChange={(e) => handleFieldChange(field, e.target.value)}
                placeholder={`Enter ${field}`}
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <fieldset className="border-t border-gray-200 pt-4">
            {/* State */}
            <div className="flex flex-col mb-4">
              <label className="mb-1 text-gray-700 font-medium">State</label>
              <select
                value={contact.address?.state || ""}
                onChange={(e) => handleAddressChange("state", e.target.value)}
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select State</option>
                <option value="Kerala">Kerala</option>
                <option value="Karnataka">Karnataka</option>
              </select>
            </div>

            {/* District */}
            <div className="flex flex-col mb-4">
              <label className="mb-1 text-gray-700 font-medium">District</label>
              <select
                value={contact.address?.district || ""}
                onChange={(e) => handleAddressChange("district", e.target.value)}
                disabled={!contact.address?.state}
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-900 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select District</option>
                {districts.map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* City, LineFirst, LineSecond, Pincode */}
            {["city", "lineFirst", "lineSecond", "pincode"].map((field) => (
              <div key={field} className="flex flex-col mb-4">
                <label className="mb-1 text-gray-700 font-medium capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  value={contact.address?.[field] || ""}
                  onChange={(e) =>
                    handleAddressChange(field, e.target.value)
                  }
                  placeholder={`Enter ${field}`}
                  className="rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}
          </fieldset>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            onClick={onCancel}
            type="button"
            className="rounded-md border border-gray-300 px-5 py-2 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            type="button"
            className={`rounded-md px-5 py-2 text-white transition ${
              errors.mobileNumber || errors.pincode
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={!!(errors.mobileNumber || errors.pincode)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
