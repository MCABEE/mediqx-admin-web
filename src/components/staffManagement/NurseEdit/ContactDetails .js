"use client";
import useNurseStore from "@/app/lib/store/nurseStore";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";


const EditContactModal = ({ show, contact, onChange, userId, onCancel }) => {
  const { updateNurseDetails } = useNurseStore();
console.log(contact);

  if (!show) return null;

  const handleChange = (field, value) => {
    onChange({ ...contact, [field]: value });
  };

  const handleAddressChange = (field, value) => {
    onChange({
      ...contact,
      address: {
        ...contact.address,
        [field]: value,
      },
    });
  };

  const handleSave = async () => {
    const payload = {
      fullName: contact.fullName,
      gender: contact.gender,
      email: contact.email,
      mobileNumber: contact.mobileNumber,
      addressId: contact.address?.addressId,
      state: contact.address?.state,
      district: contact.address?.district,
      city: contact.address?.city,
      pincode: contact.address?.pincode,
      educationQualifications: [contact.educationQualifications],
      specializations: contact.specializations || [],
      workSchedule: contact.workSchedule,
    };

    try {
      await updateNurseDetails(userId, payload);
      onCancel(); // Close modal
    } catch (error) {
      console.log(error.message || "Failed to update nurse");
      
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-xl border border-gray-200">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition cursor-pointer"
        >
          <AiOutlineClose className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Edit Nurse Details
        </h2>

        <div className="space-y-4">
          <InputField label="Full Name" value={contact.fullName} onChange={(e) => handleChange("fullName", e.target.value)} />
          <InputField label="Email" type="email" value={contact.email} onChange={(e) => handleChange("email", e.target.value)} />
          <InputField label="Mobile Number" value={contact.mobileNumber} onChange={(e) => handleChange("mobileNumber", e.target.value)} />

          <SelectField
            label="Gender"
            value={contact.gender}
            options={[
              { label: "Select gender", value: "" },
              { label: "Male", value: "MALE" },
              { label: "Female", value: "FEMALE" },
              { label: "Other", value: "OTHER" },
            ]}
            onChange={(e) => handleChange("gender", e.target.value)}
          />

          <SelectField
            label="Education Qualification"
            value={contact.educationQualifications}
            onChange={(e) => handleChange("educationQualifications", e.target.value)}
            options={[
              { label: "MSc Nursing", value: "MSc Nursing" },
              { label: "BSc Nursing", value: "BSc Nursing" },
              { label: "BSc Nursing Pursuing", value: "BSc Nursing Pursuing" },
              { label: "Post BSc Nursing", value: "Post BSc Nursing" },
              { label: "GNM", value: "GNM" },
              { label: "GNM Pursuing", value: "GNM Pursuing" },
              { label: "ANM", value: "ANM" },
              { label: "GDA (General Duty Assistant)", value: "GDA (General Duty Assistant)" },
              { label: "PCA (Personal Care Assistant)", value: "PCA (Personal Care Assistant)" },
              { label: "DHA (Diploma in Health Assistant)", value: "DHA (Diploma in Health Assistant)" },
            ]}
          />

          <SelectField
            label="Specialization"
            value={contact.specializations || ""}
            onChange={(e) => handleChange("specializations", [e.target.value])}
            options={[
              { label: "Staff Nurse / Ward Nurse", value: "Staff Nurse / Ward Nurse" },
              { label: "ICU Nurse", value: "ICU Nurse / Critical Care Nurse" },
              { label: "ER Nurse", value: "ER Nurse / Trauma Nurse" },
              { label: "Pediatric Nurse", value: "Pediatric Nurse" },
            ]}
          />

          <SelectField
            label="Work Schedule"
            value={contact.workSchedule}
            options={[
              { label: "Select schedule", value: "" },
              { label: "Full Time", value: "FULL_TIME" },
              { label: "Part Time", value: "PART_TIME" },
            ]}
            onChange={(e) => handleChange("workSchedule", e.target.value)}
          />

          {/* Address Fields */}
          <div className="grid grid-cols-2 gap-4">
            <InputField label="State" value={contact.address?.state || ""} onChange={(e) => handleAddressChange("state", e.target.value)} />
            <InputField label="District" value={contact.address?.district || ""} onChange={(e) => handleAddressChange("district", e.target.value)} />
            <InputField label="City" value={contact.address?.city || ""} onChange={(e) => handleAddressChange("city", e.target.value)} />
            <InputField label="Pincode" value={contact.address?.pincode || ""} onChange={(e) => handleAddressChange("pincode", e.target.value)} />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white rounded-lg font-semibold transition cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Field
const InputField = ({ label, value, onChange, type = "text" }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
);

// Reusable Select Field
const SelectField = ({ label, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default EditContactModal;
