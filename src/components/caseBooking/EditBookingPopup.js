


"use client";
import React, { useState, useEffect } from "react";

const InputGroup = ({ label, type = "text", name, value, onChange }) => (
  <div className="flex flex-col gap-[6px]">
    <label className="text-sm font-medium text-[#1F2937]">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-sm"
    />
  </div>
);

const EditBookingPopup = ({ initialData, onClose, onSave }) => {
  const [form, setForm] = useState({
    diagnosis: "",
    startDate: "",
    serviceType: "",
    durationType: "",
    durationValue: "",
    weekdays: [],
    flexibility: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        startDate: initialData.startDate?.slice(0, 10),
        startTime: initialData.startTime?.slice(11, 16),
        endTime: initialData.endTime?.slice(11, 16),
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-xl font-semibold text-[#111827]">
            Edit Service Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl transition"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputGroup
            label="Diagnosis"
            name="diagnosis"
            value={form.diagnosis}
            onChange={handleChange}
          />
          <InputGroup
            label="Start Date"
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
          />
          <InputGroup
            label="Service Type"
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
          />
          <InputGroup
            label="Duration Type"
            name="durationType"
            value={form.durationType}
            onChange={handleChange}
          />
          <InputGroup
            label="Duration Value (weeks)"
            type="number"
            name="durationValue"
            value={form.durationValue}
            onChange={handleChange}
          />
          <InputGroup
            label="Start Time"
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
          />
          <InputGroup
            label="End Time"
            type="time"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-md bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookingPopup;
