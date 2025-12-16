"use client";

import React, { useEffect, useState } from "react";
import useNurseStore from "@/app/lib/store/nurseStore";
import useManageProfessionalsStore from "@/app/lib/store/useManageProfessionalsStore";
import { AiOutlineClose } from "react-icons/ai";
import LocationPickerPopup from "../addNewStaff/LocationPickerPopup";

const InputField = ({ label, value, onChange, placeholder, error }) => (
  <div className="flex flex-col w-full">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder || `Enter ${label}`}
      className={`border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 ${
        error
          ? "border-red-500 focus:ring-red-400"
          : "border-gray-300 focus:ring-blue-500"
      }`}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

const EditExperiencePopup = ({ onClose, userId, role }) => {
  const { fetchItems, listedItems } = useManageProfessionalsStore();
  const {
    updateExperience,
    fetchNurseQualificationById,
    selectedNurseQualification,
  } = useNurseStore();

  const categoryRole =
    role === "REGISTERED_NURSE"
      ? "REG_NURSES"
      : role === "ANCILLARY_PERSONAL"
      ? "ANCILLARY"
      : role;

  const [form, setForm] = useState({
    qualificationId: "",
    experienceLevel: "",
    yearsOfExperience: 0,
    monthsOfExperience: 0,
    providerName: "",
    departmentId: "",
    providerAddress: "",
    startDate: "",
    endDate: "",
    onGoing: false,
    skills: [],
  });

  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [skills, setSkills] = useState([]);
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  // Fetch data
  useEffect(() => {
    if (userId) fetchNurseQualificationById(userId);
  }, [userId, fetchNurseQualificationById]);

  useEffect(() => {
    fetchItems("working-departments", 1, 50, categoryRole);
    fetchItems("skills", 1, 50, categoryRole);
  }, [categoryRole, fetchItems]);

  useEffect(() => {
    if (listedItems["working-departments"]) {
      setDepartments(
        listedItems["working-departments"].map((d) => ({
          label: d.workingDepartment,
          value: d.id,
        }))
      );
    }
  }, [listedItems["working-departments"]]);

  useEffect(() => {
    if (listedItems.skills) {
      setSkills(
        listedItems.skills.map((s) => ({
          label: s.skill,
          value: s.id,
        }))
      );
    }
  }, [listedItems.skills]);

  useEffect(() => {
    if (!selectedNurseQualification) return;

    const exp = selectedNurseQualification.experienceDetails?.[0] || {};

    setForm({
      qualificationId: exp.id,
      experienceLevel: selectedNurseQualification.experienceLevel || "FRESHER",
      yearsOfExperience: selectedNurseQualification.yearsOfExperience || 0,
      monthsOfExperience: selectedNurseQualification.monthsOfExperience || 0,
      providerName: exp.providerName || "",
      departmentId: exp.departmentId || "",
      providerAddress: exp.providerAddress || "",
      startDate: exp.startDate || "",
      endDate: exp.endDate || "",
      onGoing: exp.onGoing || false,
      skills: selectedNurseQualification.skills || [],
    });
  }, [selectedNurseQualification]);

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSkillChange = (skill, skillId) => {
    setForm((prev) => {
      const exists = prev.skills.some((s) => s.skillId === skillId);
      return {
        ...prev,
        skills: exists
          ? prev.skills.filter((s) => s.skillId !== skillId)
          : [...prev.skills, { skill, skillId }],
      };
    });
  };

  const toDateTime = (dateStr) =>
    dateStr ? new Date(dateStr).toISOString() : null;

  // 🔹 Validation logic
  const validateForm = () => {
    const newErrors = {};

    if (!form.experienceLevel)
      newErrors.experienceLevel = "Experience level is required.";

    if (form.experienceLevel === "EXPERIENCED") {
      if (!form.providerName.trim())
        newErrors.providerName = "Last hospital name is required.";
      if (!form.departmentId)
        newErrors.departmentId = "Please select a department.";
      if (!form.providerAddress.trim())
        newErrors.providerAddress = "Please select a location.";
      if (!form.startDate) newErrors.startDate = "Start date is required.";
      if (!form.onGoing && !form.endDate)
        newErrors.endDate = "End date is required.";
      if (!form.skills || form.skills.length === 0)
        newErrors.skills = "Please select at least one skill.";
    }

    if (form.experienceLevel === "FRESHER") {
      if (!form.skills || form.skills.length === 0)
        newErrors.skills = "Please select at least one skill.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Handle Submit
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const payload = {
        qualificationId: form.qualificationId,
        experienceLevel: form.experienceLevel,
        yearsOfExperience: Number(form.yearsOfExperience),
        monthsOfExperience: Number(form.monthsOfExperience),
        providerName: form.providerName,
        providerAddress: form.providerAddress,
        departmentId: form.departmentId,
        startDate: toDateTime(form.startDate),
        endDate: form.onGoing ? null : toDateTime(form.endDate),
        onGoing: form.onGoing,
        skills: form.skills.map((s) => ({
          skillId: s.skillId,
          skill: s.skill,
          ...(s.id && { id: s.id }),
        })),
      };

      await updateExperience(userId, payload);
      onClose();
    } catch (error) {
      console.error("Error updating experience:", error.message);
      setErrors({ general: "Failed to update experience. Please try again." });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-xl border border-gray-200">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
          onClick={onClose}
        >
          <AiOutlineClose className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">
          Edit Work Experience
        </h2>

        {/* Experience Level */}
        <div className="flex flex-col w-full mb-2">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Experience Level
          </label>
          <select
            value={form.experienceLevel}
            onChange={(e) => handleChange("experienceLevel", e.target.value)}
            className={`border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 ${
              errors.experienceLevel
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          >
            <option value="">Select Experience Level</option>
            <option value="FRESHER">Fresher</option>
            <option value="EXPERIENCED">Experienced</option>
          </select>
          {errors.experienceLevel && (
            <p className="text-xs text-red-500 mt-1">
              {errors.experienceLevel}
            </p>
          )}
        </div>

        {/* Years & Months */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Years of Experience"
            value={form.yearsOfExperience}
            onChange={(e) => handleChange("yearsOfExperience", e.target.value)}
          />
          <InputField
            label="Months of Experience"
            value={form.monthsOfExperience}
            onChange={(e) => handleChange("monthsOfExperience", e.target.value)}
          />
        </div>

        <InputField
          label="Last Hospital"
          value={form.providerName}
          onChange={(e) => handleChange("providerName", e.target.value)}
          error={errors.providerName}
        />

        {/* Department */}
        <div className="flex flex-col w-full mb-2">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <select
            value={form.departmentId}
            onChange={(e) => handleChange("departmentId", e.target.value)}
            className={`border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 ${
              errors.departmentId
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
          {errors.departmentId && (
            <p className="text-xs text-red-500 mt-1">{errors.departmentId}</p>
          )}
        </div>

        {/* Provider Address */}
        <div className="flex flex-col w-full mb-2">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <button
            type="button"
            onClick={() => setShowLocationPopup(true)}
            className={`w-full text-left border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 ${
              errors.providerAddress
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          >
            {form.providerAddress || "Select Location"}
          </button>
          {errors.providerAddress && (
            <p className="text-xs text-red-500 mt-1">
              {errors.providerAddress}
            </p>
          )}
        </div>

        {/* Dates */}
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
            className={`border rounded-md px-3 py-2 text-sm ${
              errors.startDate
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.startDate && (
            <p className="text-xs text-red-500 mt-1">{errors.startDate}</p>
          )}

          <label className="text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            value={form.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
            disabled={form.onGoing}
            className={`border rounded-md px-3 py-2 text-sm ${
              form.onGoing
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : errors.endDate
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.endDate && (
            <p className="text-xs text-red-500 mt-1">{errors.endDate}</p>
          )}

          <label className="inline-flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={form.onGoing}
              onChange={(e) => handleChange("onGoing", e.target.checked)}
            />
            <span className="text-sm text-gray-700">Currently Working</span>
          </label>
        </div>

        {/* Skills */}
        <p className="text-sm font-medium text-gray-700 mb-2 mt-6 border-t pt-4">
          Skills
        </p>
        <div
          className={`flex flex-wrap gap-6 p-2 border rounded-md ${
            errors.skills ? "border-red-500" : "border-gray-200"
          }`}
        >
          {skills.map((skill) => (
            <label
              key={skill.value}
              className="flex items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={form.skills.some((s) => s.skillId === skill.value)}
                onChange={() => handleSkillChange(skill.label, skill.value)}
              />
              {skill.label}
            </label>
          ))}
        </div>
        {errors.skills && (
          <p className="text-xs text-red-500 mt-1">{errors.skills}</p>
        )}

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

        {/* General error */}
        {errors.general && (
          <p className="text-sm text-red-600 text-center mt-4">
            {errors.general}
          </p>
        )}
      </div>

      {showLocationPopup && (
        <LocationPickerPopup
          currentLat={null}
          currentLng={null}
          onClose={() => setShowLocationPopup(false)}
          onUpdated={(loc) =>
            setForm((prev) => ({
              ...prev,
              providerAddress: loc.mapLocation || "",
            }))
          }
        />
      )}
    </div>
  );
};

export default EditExperiencePopup;
