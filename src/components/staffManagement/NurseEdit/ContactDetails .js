"use client";

import React, { useEffect, useState } from "react";
import useNurseStore from "@/app/lib/store/nurseStore";
import useManageProfessionalsStore from "@/app/lib/store/useManageProfessionalsStore";
import { AiOutlineClose } from "react-icons/ai";
import LocationPickerPopup from "../addNewStaff/LocationPickerPopup";

const EditContactModal = ({ show, userId, onCancel, role,grading }) => {
  console.log(grading);
  
  const { updateNurseDetails, fetchNurseProfileById, selectedNurseProfile } =
    useNurseStore();
  const { fetchItems, listedItems } = useManageProfessionalsStore();

  const [qualifications, setQualifications] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [formData, setFormData] = useState({});

  const gradingOptions = [
  "GRADE_01",
  "GRADE_02",
  "GRADE_03",
  "GRADE_04",
  "GRADE_05",
  "GRADE_06",
  "GRADE_07",
];

  // Fetch nurse profile
  useEffect(() => {
    if (userId) fetchNurseProfileById(userId);
  }, [userId, fetchNurseProfileById]);
  console.log("newww", selectedNurseProfile);

  // When profile comes, set it to formData
  useEffect(() => {
    if (selectedNurseProfile) {
      setFormData({
        fullName: selectedNurseProfile.fullName || "",
        email: selectedNurseProfile.email || "",
        mobileNumber: selectedNurseProfile.mobileNumber || "",
        gender: selectedNurseProfile.gender || "",
        dob: selectedNurseProfile.dob || "",
        address: selectedNurseProfile.addresses?.[0] || {},

        educationQualifications:
          selectedNurseProfile.educationQualifications || [],

        specializations: selectedNurseProfile.specializations || [],

        workSchedule: selectedNurseProfile.workSchedule || "",
           // ONLY SET IF PROP EXISTS
            ...(grading
        ? {
            grading:
              selectedNurseProfile.grading || grading || "",
          }
        : {}),


      });
    }
  }, [selectedNurseProfile]);

  const categoryRole = (() => {
    if (role === "REGISTERED_NURSE") return "REG_NURSES";
    if (role === "ANCILLARY_PERSONAL") return "ANCILLARY";
    return role;
  })();

  // Fetch dropdown lists
  useEffect(() => {
    fetchItems("qualifications", 1, 50, categoryRole);
    fetchItems("specializations", 1, 50, categoryRole);
  }, [categoryRole, fetchItems]);

  useEffect(() => {
    if (listedItems.qualifications) {
      setQualifications(
        listedItems.qualifications.map((q) => ({
          label: q.qualification,
          value: q.id,
        }))
      );
    }
    if (listedItems.specializations) {
      setSpecializations(
        listedItems.specializations.map((s) => ({
          label: s.specialization,
          value: s.id,
        }))
      );
    }
  }, [listedItems]);

  if (!show) return null;

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleLocationUpdated = ({
    latitude,
    longitude,
    mapLocation,
    fullAddress,
  }) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        latitude,
        longitude,
        fullAddress: fullAddress || mapLocation,
      },
    }));
  };

  const handleSave = async () => {
    if (!formData.fullName || !formData.email || !formData.mobileNumber) {
      alert("Full Name, Email and Mobile Number are required");
      return;
    }

    const payload = {
      addressId: formData.address?.id || null,
      fullName: formData.fullName,
      gender: formData.gender,
      dob: formData.dob || null,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      educationQualifications: formData.educationQualifications,
      specializations: formData.specializations,
      workSchedule: formData.workSchedule,
      ...(formData.grading ? { grading: formData.grading } : {}),

      // Only send if address has been updated
      latitude: formData.address?.latitude,
      longitude: formData.address?.longitude,
      mapLocation: formData.address?.fullAddress,
    };

    try {
      await updateNurseDetails(userId, payload);
      onCancel();
    } catch (err) {
      console.error(err.message || "Failed to update nurse");
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-xl border border-gray-200">
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <AiOutlineClose className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Edit Nurse Details
          </h2>

          <div className="space-y-4">
            <InputField
              label="Full Name"
              value={formData.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
            <InputField
              label="Email"
              type="email"
              value={formData.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <InputField
              label="Mobile Number"
              value={formData.mobileNumber || ""}
              disabled={true}
              readOnly
            />
            <InputField
              label="Dob"
              type="date"
              value={
                formData.dob
                  ? new Date(formData.dob).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) => handleChange("dob", e.target.value)}
            />

            <SelectField
              label="Gender"
              value={formData.gender || ""}
              options={[
                { label: "Select gender", value: "" },
                { label: "MALE", value: "MALE" },
                { label: "FEMALE", value: "FEMALE" },
                { label: "OTHER", value: "OTHER" },
              ]}
              onChange={(e) => handleChange("gender", e.target.value)}
            />

            <SelectField
              label="Education Qualification"
              value={
                formData.educationQualifications?.[0]?.qualificationId || ""
              }
              onChange={(e) => {
                const selectedOption = qualifications.find(
                  (q) => q.value === e.target.value
                );

                if (selectedOption) {
                  setFormData((prev) => ({
                    ...prev,
                    educationQualifications: [
                      {
                        // If editing existing, keep its original id
                        id: prev.educationQualifications?.[0]?.id || null,
                        qualification: selectedOption.label,
                        qualificationId: selectedOption.value,
                      },
                    ],
                  }));
                } else {
                  // Clear selection
                  setFormData((prev) => ({
                    ...prev,
                    educationQualifications: [],
                  }));
                }
              }}
              options={[
                { label: "Select qualification", value: "" },
                ...qualifications,
              ]}
            />

            <SelectField
              label="Specialization"
              value={formData.specializations?.[0]?.specializationId || ""}
              onChange={(e) => {
                const selectedOption = specializations.find(
                  (s) => s.value === e.target.value
                );

                if (selectedOption) {
                  setFormData((prev) => ({
                    ...prev,
                    specializations: [
                      {
                        id: prev.specializations?.[0]?.id || null, // keep original id if exists
                        name: selectedOption.label,
                        specializationId: selectedOption.value,
                      },
                    ],
                  }));
                } else {
                  // Clear selection if default option is selected
                  setFormData((prev) => ({
                    ...prev,
                    specializations: [],
                  }));
                }
              }}
              options={[
                { label: "Select specialization", value: "" },
                ...specializations,
              ]}
            />

            <SelectField
              label="Work Schedule"
              value={formData.workSchedule || ""}
              onChange={(e) => handleChange("workSchedule", e.target.value)}
              options={[
                { label: "Select schedule", value: "" },
                { label: "FULL_TIME", value: "FULL_TIME" },
                { label: "PART_TIME", value: "PART_TIME" },
              ]}
            />

            {/* Location */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <button
                type="button"
                onClick={() => setShowLocationPopup(true)}
                className="border border-gray-300 rounded-lg p-2 text-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {formData.address?.fullAddress || "Pick location on map"}
              </button>
            </div>


            {grading && (
  <SelectField
    label="Grading"
    value={formData.grading || ""}
    onChange={(e) => handleChange("grading", e.target.value)}
    options={[
      { label: "Select grading", value: "" },
      ...gradingOptions.map((g) => ({ label: g, value: g })),
    ]}
  />
)}
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {showLocationPopup && (
        <LocationPickerPopup
          currentLat={formData.address?.latitude}
          currentLng={formData.address?.longitude}
          onClose={() => setShowLocationPopup(false)}
          onUpdated={handleLocationUpdated}
        />
      )}
    </>
  );
};

// Input & Select Fields
const InputField = ({
  label,
  value,
  onChange,
  disabled = false,
  type = "text",
  ...props
}) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
      placeholder={`Enter ${label.toLowerCase()}`}
      disabled={disabled}
      {...props}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((opt) => (
        <option key={opt.value || opt.label} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default EditContactModal;
