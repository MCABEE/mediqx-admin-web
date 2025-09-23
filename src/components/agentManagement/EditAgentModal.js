"use client";
import React, { useState } from "react";

// 🔹 InputGroup reused with same style as Booking Popup
const InputGroup = ({ label, type = "text", name, value, onChange }) => (
  <div className="flex flex-col gap-[6px]">
    <label className="text-sm font-medium text-[#1F2937]">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md 
                 focus:outline-none focus:ring-2 focus:ring-[#2563EB] 
                 focus:border-transparent text-sm"
    />
  </div>
);

const EditAgentModal = ({ agent, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    agentId: agent?.agentId || "",
    addressId: agent?.addressId || "",
    fullName: agent?.fullName || "",
    gender: agent?.gender || "MALE",
    dob: agent?.dob ? new Date(agent.dob).toISOString().split("T")[0] : "",
    state: agent?.state || "",
    district: agent?.district || "",
    city: agent?.city || "",
    lineFirst: agent?.lineFirst || "",
    lineSecond: agent?.lineSecond || "",
    email: agent?.email || "",
    mobileNumber: agent?.mobileNumber || "",
    referralType: agent?.referralType || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave({
      ...formData,
      gender: formData.gender?.toUpperCase(),
      referralType: formData.referralType?.toUpperCase(),
      typeOfAgent: formData.typeOfAgent,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex justify-center items-center px-4 overflow-y-auto py-10">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 sm:p-8 max-h-full overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-xl font-semibold text-[#111827]">
            Edit Agent Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl transition cursor-pointer"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Agent Info Section */}
        <h3 className="text-lg font-semibold mb-4">Agent Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <InputGroup
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />

          {/* Gender */}
          <div className="flex flex-col gap-[6px]">
            <label className="text-sm font-medium text-[#1F2937]">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <InputGroup
            label="Date of Birth"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />

          <InputGroup
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />

          <InputGroup
            label="District"
            name="district"
            value={formData.district}
            onChange={handleChange}
          />

          <InputGroup
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />

          <InputGroup
            label="Address Line 1"
            name="lineFirst"
            value={formData.lineFirst}
            onChange={handleChange}
          />

          <InputGroup
            label="Address Line 2"
            name="lineSecond"
            value={formData.lineSecond}
            onChange={handleChange}
          />

          <InputGroup
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <InputGroup
            label="Phone Number"
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
        </div>

        {/* Agent Type Section */}
        <h3 className="text-lg font-semibold mb-4">Agent Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Referral Type */}
          <div className="flex flex-col gap-[6px]">
            <label className="text-sm font-medium text-[#1F2937]">
              Referral Type
            </label>
            <select
              name="referralType"
              value={formData.referralType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm"
            >
              <option value="STAFF">Staff</option>
              <option value="PATIENT">Patient</option>
              <option value="PATIENT_AND_STAFF">Both</option>
            </select>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-md bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAgentModal;
