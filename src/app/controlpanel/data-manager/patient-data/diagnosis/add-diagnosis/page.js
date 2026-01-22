"use client";
import React, { useEffect, useState } from "react";
import Navlink from "@/components/dataManager/patientData/Navlink";
import Link from "next/link";
import useDiagnosisStore from "@/app/lib/store/useDiagnosisStore";

function AddDiagnosisPage() {
  const {
    diagnosisInputs,
    isLoading: loading,
    error,
    success,
    addDiagnosisInput,
    setDiagnosisInputValue,
    addDiagnoses,
    resetSuccess,
  } = useDiagnosisStore();

  const [duplicateNames, setDuplicateNames] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear duplicates on mount / refresh
  useEffect(() => {
    resetSuccess();
    setDuplicateNames([]);
  }, []);

  // Watch for backend duplicate errors
  useEffect(() => {
    if (error?.details?.duplicates) {
      const dups = error.details.duplicates.map((d) => d.value.toLowerCase());
      setDuplicateNames(dups);
    } else {
      setDuplicateNames([]);
    }
  }, [error]);

  const handleAddField = () => addDiagnosisInput();

  const handleInputChange = (idx, value) => {
    setDiagnosisInputValue(idx, value);
    setDuplicateNames((prev) => prev.filter((n) => n !== value.toLowerCase()));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    await addDiagnoses();
    setIsSubmitting(false);
  };

  // Reset success after 3 seconds
  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => resetSuccess(), 3000);
      return () => clearTimeout(timeout);
    }
  }, [success, resetSuccess]);

  return (
    <div>
      <Navlink />

      {/* Header Section */}
      <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
          <div className="flex items-center gap-[50px]">
            <h1 className="text-[#3674B5]">Add</h1>
            <Link
              href="/controlpanel/data-manager/patient-data/diagnosis/manage-diagnosis"
              className="text-black"
            >
              Manage
            </Link>
          </div>
          <button
            className="bg-[#196BA5] text-white text-3xl rounded-lg size-9 cursor-pointer"
            onClick={handleAddField}
            type="button"
            aria-label="Add new diagnosis"
            disabled={isSubmitting}
          >
            +
          </button>
        </div>
      </div>

      {/* Section Title */}
      <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
        <h1 className="text-black font-semibold py-[16px]">Add Diagnosis</h1>
      </div>

      {/* Inputs */}
      {diagnosisInputs.map((value, idx) => {
        const isDuplicate = duplicateNames.includes(value.trim().toLowerCase());
        return (
          <div key={idx} className="bg-white flex gap-6 px-6 py-2 mt-2">
            <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
              {String(idx + 1).padStart(2, "0")}
            </div>
            <input
              type="text"
              className={`w-[350px] py-2 px-4 rounded-[15px] outline-none border ${
                isDuplicate
                  ? "border-red-500 bg-red-50"
                  : "border-[#8888888c] bg-white"
              }`}
              placeholder="Enter Diagnosis"
              value={value}
              // allow typing even after duplicate error
              disabled={isSubmitting && !error}
              onChange={(e) => handleInputChange(idx, e.target.value)}
            />
          </div>
        );
      })}

      {/* Save Button */}
      <button
        className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-2 cursor-pointer"
        onClick={handleSave}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save"}
      </button>

      {/* Success Message */}
      {success && (
        <div className="text-blue-600 font-semibold mt-2">
          Diagnoses added successfully!
        </div>
      )}

      {/* Error Message */}
      {error?.message && (
        <div className="text-red-500 mt-2">
          {typeof error.message === "string"
            ? error.message
            : error.message?.message || "Something went wrong."}
        </div>
      )}
    </div>
  );
}

export default AddDiagnosisPage;
