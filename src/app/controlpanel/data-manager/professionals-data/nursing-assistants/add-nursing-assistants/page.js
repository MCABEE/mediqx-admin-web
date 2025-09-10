"use client";
import React, { useEffect } from "react";
import Navlink from "@/components/dataManager/professionalsData.js/Navlink";
import Link from "next/link";
import useProfessionalsStore from "@/app/lib/store/useProfessionalsStore";

function AddRegNursesPage({ category = "NURSING_ASSISTANTS" }) {
  const {
    specializations,
    qualifications,
    workingDepartments,
    skills,
    isLoading,
    error,
    success,
    addSpecializationField,
    setSpecializationValue,
    addQualificationField,
    setQualificationValue,
    addWorkingDepartmentField,
    setWorkingDepartmentValue,
    addSkillField,
    setSkillValue,
    saveAllCategories,
    resetSuccess,
    resetInputs,
  } = useProfessionalsStore();

  useEffect(() => {
    resetInputs(); // Clear inputs fresh on mount to avoid showing old persisted inputs
  }, [resetInputs]);

  const handleAddField = (field) => {
    if (field === "specializations") addSpecializationField();
    else if (field === "qualifications") addQualificationField();
    else if (field === "workingDepartments") addWorkingDepartmentField();
    else if (field === "skills") addSkillField();
  };

  const handleInputChange = (field, idx, value) => {
    if (field === "specializations") setSpecializationValue(idx, value);
    else if (field === "qualifications") setQualificationValue(idx, value);
    else if (field === "workingDepartments")
      setWorkingDepartmentValue(idx, value);
    else if (field === "skills") setSkillValue(idx, value);
  };

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => resetSuccess(), 3000);
      return () => clearTimeout(timeout);
    }
  }, [success, resetSuccess]);

  return (
    <div>
      <Navlink />

      <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
          <div className="flex items-center gap-[50px]">
            <h1 className="text-[#3674B5]">Add</h1>
            <Link
              href={
                " /controlpanel/data-manager/professionals-data/nursing-assistants/manage-nursing-assistants"
              }
              className="text-black"
            >
              Manage
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
        <h1 className="text-black font-semibold py-[16px]">Add Reg Nurses</h1>
      </div>

      {/* Specializations */}
      <section className="p-6 bg-white mt-4 rounded shadow">
        <h2 className="text-black font-semibold mb-2">Specialization</h2>
        {specializations.map((val, idx) => (
          <div key={idx} className="flex items-center gap-6 mb-2">
            <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
              {String(idx + 1).padStart(2, "0")}
            </div>
            <input
              type="text"
              value={val}
              placeholder="Enter Specialization"
              disabled={isLoading}
              onChange={(e) =>
                handleInputChange("specializations", idx, e.target.value)
              }
              className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
            />
            {idx === specializations.length - 1 && (
              <button
                disabled={isLoading}
                onClick={() => handleAddField("specializations")}
                className="bg-[#196BA5] text-white text-xl rounded-lg size-7 cursor-pointer"
                aria-label="Add specialization field"
              >
                +
              </button>
            )}
          </div>
        ))}
      </section>

      {/* Qualifications */}
      <section className="p-6 bg-white mt-4 rounded shadow">
        <h2 className="text-[#000000] font-semibold mb-2">Qualification</h2>
        {qualifications.map((val, idx) => (
          <div key={idx} className="flex items-center gap-6 mb-2">
            <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
              {String(idx + 1).padStart(2, "0")}
            </div>
            <input
              type="text"
              value={val}
              placeholder="Enter Qualification"
              disabled={isLoading}
              onChange={(e) =>
                handleInputChange("qualifications", idx, e.target.value)
              }
              className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
            />
            {idx === qualifications.length - 1 && (
              <button
                disabled={isLoading}
                onClick={() => handleAddField("qualifications")}
                className="bg-[#196BA5] text-white text-xl rounded-lg size-7 cursor-pointer"
                aria-label="Add qualification field"
              >
                +
              </button>
            )}
          </div>
        ))}
      </section>

      {/* Working Departments */}
      <section className="p-6 bg-white mt-4 rounded shadow">
        <h2 className="text-[#000000] font-semibold mb-2">
          Working Departments
        </h2>
        {workingDepartments.map((val, idx) => (
          <div key={idx} className="flex items-center gap-6 mb-2">
            <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
              {String(idx + 1).padStart(2, "0")}
            </div>
            <input
              type="text"
              value={val}
              placeholder="Enter Working Department"
              disabled={isLoading}
              onChange={(e) =>
                handleInputChange("workingDepartments", idx, e.target.value)
              }
              className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
            />
            {idx === workingDepartments.length - 1 && (
              <button
                disabled={isLoading}
                onClick={() => handleAddField("workingDepartments")}
                className="bg-[#196BA5] text-white text-xl rounded-lg size-7 cursor-pointer"
                aria-label="Add working department field"
              >
                +
              </button>
            )}
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="p-6 bg-white mt-4 rounded shadow">
        <h2 className="text-[#000000] font-semibold mb-2">Skills</h2>
        {skills.map((val, idx) => (
          <div key={idx} className="flex items-center gap-6 mb-2">
            <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
              {String(idx + 1).padStart(2, "0")}
            </div>
            <input
              type="text"
              value={val}
              placeholder="Enter Skill"
              disabled={isLoading}
              onChange={(e) => handleInputChange("skills", idx, e.target.value)}
              className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
            />
            {idx === skills.length - 1 && (
              <button
                disabled={isLoading}
                onClick={() => handleAddField("skills")}
                className="bg-[#196BA5] text-white text-xl rounded-lg size-7 cursor-pointer"
                aria-label="Add skill field"
              >
                +
              </button>
            )}
          </div>
        ))}
      </section>

      <button
        onClick={() => saveAllCategories(category)}
        disabled={isLoading}
        className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-6 mx-6 cursor-pointer mb-4"
      >
        Save
      </button>

      {success && (
        <p className="text-blue-600 font-semibold px-6 my-4">
          Data saved successfully!
        </p>
      )}
      {error && (
        <p className="text-red-600 font-semibold px-6 mt-4 whitespace-pre-wrap">
          {error}
        </p>
      )}
    </div>
  );
}

export default AddRegNursesPage;
