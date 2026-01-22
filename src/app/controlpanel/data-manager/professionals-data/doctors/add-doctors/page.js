"use client";
import React, { useEffect, useState } from "react";
import Navlink from "@/components/dataManager/professionalsData.js/Navlink";
import Link from "next/link";
import useProfessionalsStore from "@/app/lib/store/useProfessionalsStore";

function AddRegNursesPage({ category = "DOCTORS" }) {
  const {
    specializations,
    qualifications,
    workingDepartments,
    skills,
    backendDuplicates,
    isLoading,
    addSpecializationField,
    setSpecializationValue,
    addQualificationField,
    setQualificationValue,
    addWorkingDepartmentField,
    setWorkingDepartmentValue,
    addSkillField,
    setSkillValue,
    saveAllCategories,
    resetInputs,
  } = useProfessionalsStore();

  // Local messages per field type
  const [localMessages, setLocalMessages] = useState({
    specializations: null,
    qualifications: null,
    workingDepartments: null,
    skills: null,
  });

  useEffect(() => {
    resetInputs(); // Clear inputs on mount
  }, [resetInputs]);

  const handleInputChange = (field, idx, value) => {
    if (field === "specializations") setSpecializationValue(idx, value);
    else if (field === "qualifications") setQualificationValue(idx, value);
    else if (field === "workingDepartments") setWorkingDepartmentValue(idx, value);
    else if (field === "skills") setSkillValue(idx, value);
  };

  const handleAddField = (field) => {
    if (field === "specializations") addSpecializationField();
    else if (field === "qualifications") addQualificationField();
    else if (field === "workingDepartments") addWorkingDepartmentField();
    else if (field === "skills") addSkillField();
  };

  // Save specific category and show message under its button
  const handleSave = async (type) => {
    try {
      const store = useProfessionalsStore.getState();
      const tempFields = {
        specializations: type === "specializations" ? store.specializations : [""],
        qualifications: type === "qualifications" ? store.qualifications : [""],
        workingDepartments: type === "workingDepartments" ? store.workingDepartments : [""],
        skills: type === "skills" ? store.skills : [""],
      };

      useProfessionalsStore.setState({ ...store, ...tempFields, error: null, success: false });

      await saveAllCategories(category);

      const { backendDuplicates, success, error } = useProfessionalsStore.getState();

      if (success) {
        setLocalMessages((prev) => ({
          ...prev,
          [type]: { type: "success", text: `${type} saved successfully!` },
        }));
      } else if (backendDuplicates[type] && backendDuplicates[type].length > 0) {
        setLocalMessages((prev) => ({
          ...prev,
          [type]: {
            type: "duplicate",
            text: `Duplicate ${type} found: ${backendDuplicates[type].join(", ")}`,
          },
        }));
      } else if (error) {
        setLocalMessages((prev) => ({
          ...prev,
          [type]: { type: "error", text: `Failed to save ${type}: ${error}` },
        }));
      }

      setTimeout(() => setLocalMessages((prev) => ({ ...prev, [type]: null })), 4000);
    } catch (e) {
      console.error(e);
      setLocalMessages((prev) => ({ ...prev, [type]: { type: "error", text: `Failed to save ${type}` } }));
    }
  };

  const renderInput = (arr, backendDups, fieldName, addField, placeholder) =>
    arr.map((val, idx) => {
      const isBackendDuplicate = backendDups?.includes(val.trim().toLowerCase());
      return (
        <div key={idx} className="flex items-center gap-6 mb-2">
          <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
            {String(idx + 1).padStart(2, "0")}
          </div>
          <input
            type="text"
            value={val}
            placeholder={placeholder}
            disabled={isLoading}
            onChange={(e) => handleInputChange(fieldName, idx, e.target.value)}
            className={`w-[350px] py-2 px-4 rounded-[15px] outline-none border ${
              isBackendDuplicate ? "border-red-500 bg-red-50" : "border-[#8888888c]"
            }`}
          />
          {idx === arr.length - 1 && (
            <button
              disabled={isLoading}
              onClick={() => handleAddField(fieldName)}
              className="bg-[#196BA5] text-white text-xl rounded-lg size-7 cursor-pointer"
            >
              +
            </button>
          )}
        </div>
      );
    });

  return (
    <div>
      <Navlink />

      <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
          <div className="flex items-center gap-[50px]">
            <h1 className="text-[#3674B5]">Add</h1>
            <Link
              href={
                "/controlpanel/data-manager/professionals-data/doctors/manage-doctors"
              }

            className="text-black"
            >
              Manage
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
        <h1 className="text-black font-semibold py-[16px]">Add Nursing Assistants</h1>
      </div>

      {/* Sections */}
      <section className="p-6 bg-white mt-4 rounded shadow">
        <h2 className="text-black font-semibold mb-2">Specializations</h2>
        {renderInput(specializations, backendDuplicates.specializations, "specializations", addSpecializationField, "Enter Specialization")}
        <button
          onClick={() => handleSave("specializations")}
          disabled={isLoading}
          className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-3 cursor-pointer"
        >
          Save Specializations
        </button>
        {localMessages.specializations && (
          <p className={`font-semibold px-6 my-2 ${localMessages.specializations.type === "success" ? "text-blue-600" : "text-red-600"}`}>
            {localMessages.specializations.text}
          </p>
        )}
      </section>

      <section className="p-6 bg-white mt-4 rounded shadow">
        <h2 className="text-black font-semibold mb-2">Qualifications</h2>
        {renderInput(qualifications, backendDuplicates.qualifications, "qualifications", addQualificationField, "Enter Qualification")}
        <button
          onClick={() => handleSave("qualifications")}
          disabled={isLoading}
          className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-3 cursor-pointer"
        >
          Save Qualifications
        </button>
        {localMessages.qualifications && (
          <p className={`font-semibold px-6 my-2 ${localMessages.qualifications.type === "success" ? "text-blue-600" : "text-red-600"}`}>
            {localMessages.qualifications.text}
          </p>
        )}
      </section>

      <section className="p-6 bg-white mt-4 rounded shadow">
        <h2 className="text-black font-semibold mb-2">Working Departments</h2>
        {renderInput(workingDepartments, backendDuplicates.workingDepartments, "workingDepartments", addWorkingDepartmentField, "Enter Working Department")}
        <button
          onClick={() => handleSave("workingDepartments")}
          disabled={isLoading}
          className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-3 cursor-pointer"
        >
          Save Working Departments
        </button>
        {localMessages.workingDepartments && (
          <p className={`font-semibold px-6 my-2 ${localMessages.workingDepartments.type === "success" ? "text-blue-600" : "text-red-600"}`}>
            {localMessages.workingDepartments.text}
          </p>
        )}
      </section>

      <section className="p-6 bg-white mt-4 rounded shadow mb-4">
        <h2 className="text-black font-semibold mb-2">Skills</h2>
        {renderInput(skills, backendDuplicates.skills, "skills", addSkillField, "Enter Skill")}
        <button
          onClick={() => handleSave("skills")}
          disabled={isLoading}
          className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-3 cursor-pointer"
        >
          Save Skills
        </button>
        {localMessages.skills && (
          <p className={`font-semibold px-6 my-2 ${localMessages.skills.type === "success" ? "text-blue-600" : "text-red-600"}`}>
            {localMessages.skills.text}
          </p>
        )}
      </section>
    </div>
  );
}

export default AddRegNursesPage;
