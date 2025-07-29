"use client";
import useNurseStore from "@/app/lib/store/nurseStore";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

// Reusable input field
const InputField = ({ label, value, onChange, placeholder }) => (
  <div className="flex flex-col w-full">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder || `Enter ${label}`}
      className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const EditExperiencePopup = ({
  qualifications,
  nurseData,
  onClose,
  userId,
}) => {
  console.log(qualifications);

  const departments = [
    "General Medicine",
    "ICU / Critical Care",
    "Emergency Department",
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Surgical Wards",
    "Gynecology & Obstetrics",
    "Neonatal ICU (NICU)",
    "Dialysis Unit",
    "Operation Theatre (OT)",
    "Anesthesia Unit",
    "Psychiatry",
    "ENT",
    "Dermatology",
    "Radiology",
    "Gastroenterology",
    "Infection Control",
  ];

  const nursingSkills = [
    "Vital signs monitoring",
    "Medication administration",
    "Patient hygiene & grooming",
    "Wound dressing & basic procedures",
    "Injections (IM, IV, SC)",
    "Catheterization",
    "IV cannulation & fluid management",
    "Feeding (oral, NG tube, PEG)",
    "Positioning & mobility support",
    "Emergency response (CPR, BLS)",
    "Bed making (sterile/occupied)",
    "Post-operative care",
    "Infection control practices",
    "Oxygen therapy management",
    "Record keeping & nursing documentation",
    "Assist in minor procedures",
    "Baby care / Mother care (Obstetric)",
    "Elderly care",
    "Communication skills",
    "Empathy and patience",
    "Time management",
    "Teamwork and collaboration",
    "Documentation accuracy",
    "Adaptability and problem-solving",
    "Cultural sensitivity",
    "Physical stamina and alertness",
    "Professional ethics and confidentiality",
    "Punctuality and responsibility",
    "Basic Life Support (BLS)",
    "Advanced Cardiac Life Support (ACLS)",
    "Infection Control Training",
    "Home Nursing Training",
    "First Aid Certification",
  ];

  const [form, setForm] = useState({
    qualificationId: "",
    experienceLevel: "",
    yearsOfExperience: "",
    monthsOfExperience: "",
    providerName: "",
    department: "",
    providerState: "",
    providerLocation: "",
    workingDuration: "",
    startDate: "",
    endDate: "",
    onGoing: false,
    skills: [],
  });

  console.log(form.startDate);

  useEffect(() => {
    setForm({
      qualificationId: qualifications.id,
      experienceLevel: nurseData.experienceLevel || "FRESHER",
      yearsOfExperience: nurseData.yearsOfExperience || 0,
      monthsOfExperience: nurseData.monthsOfExperience || 0,
      providerName: qualifications.providerName || "",
      department: qualifications.department || "",
      providerState: qualifications.providerState || "",
      providerLocation: qualifications.providerLocation || "",
      startDate: qualifications.startDate || "",
      endDate: qualifications.endDate || "",
      onGoing: qualifications.onGoing || false,
      skills: nurseData.skills || [],
    });
  }, [nurseData, qualifications]);

  const handleSkillChange = (skill) => {
    setForm((prev) => {
      const exists = prev.skills.includes(skill);
      return {
        ...prev,
        skills: exists
          ? prev.skills.filter((s) => s !== skill)
          : [...prev.skills, skill],
      };
    });
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  const middle = Math.ceil(nursingSkills.length / 2);
  const firstColumn = nursingSkills.slice(0, middle);
  const secondColumn = nursingSkills.slice(middle);

  const { updateExperience } = useNurseStore();

  const handleSubmit = async () => {
    try {
      const toDateTime = (dateStr) =>
        dateStr ? new Date(dateStr).toISOString() : null;
      const payload = {
        ...form,
        startDate: toDateTime(form.startDate),
        endDate: form.onGoing ? null : toDateTime(form.endDate),
      };

      await updateExperience(userId, payload);
      onClose();
    } catch (error) {
      console.error("Error updating experience:", error.message);
      alert("Failed to update experience: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-xl border border-gray-200">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
          onClick={onClose}
        >
          <AiOutlineClose className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">
          Edit Work Experience
        </h2>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Experience Level
            </label>
            <select
              value={form.experienceLevel}
              onChange={(e) => handleChange("experienceLevel", e.target.value)}
              className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Experience Level</option>
              <option value="FRESHER">Fresher</option>
              <option value="EXPERIENCED">Experienced</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Years of Experience"
              value={form.yearsOfExperience}
              onChange={(e) =>
                handleChange("yearsOfExperience", e.target.value)
              }
            />
            <InputField
              label="Months of Experience"
              value={form.monthsOfExperience}
              onChange={(e) =>
                handleChange("monthsOfExperience", e.target.value)
              }
            />
          </div>

          <InputField
            label="Last Hospital"
            value={form.providerName}
            onChange={(e) => handleChange("providerName", e.target.value)}
          />

          <label className="text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <select
            value={form.department}
            onChange={(e) => handleChange("department", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <InputField
            label="State"
            value={form.providerState}
            onChange={(e) => handleChange("providerState", e.target.value)}
          />
          <InputField
            label="Location"
            value={form.providerLocation}
            onChange={(e) => handleChange("providerLocation", e.target.value)}
          />
          <div className="flex flex-col gap-2 mb-4">
            <label className="text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            />

            <label className="text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              value={form.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              disabled={form.onGoing}
              className={`border border-gray-300 rounded-md px-3 py-2 text-sm ${
                form.onGoing
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : ""
              }`}
            />

            <label className="inline-flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={form.onGoing}
                onChange={(e) => handleChange("onGoing", e.target.checked)}
              />
              <span className="text-sm text-gray-700">Currently Working</span>
            </label>
          </div>

          <p className="text-sm font-medium text-gray-700 mb-4 mt-6 border-t-1 border-gray-300 pt-4">
            Skills
          </p>

          <div className="flex gap-10 flex-wrap">
            {[firstColumn, secondColumn].map((column, colIndex) => (
              <div
                key={colIndex}
                className="flex flex-col text-[16px] text-black font-light gap-[18px]"
              >
                {column.map((skill, index) => (
                  <label key={index} className="flex gap-[5px] items-center">
                    <input
                      type="checkbox"
                      className="size-[20px]"
                      checked={form.skills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                    />
                    <span>{skill}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-semibold cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditExperiencePopup;
