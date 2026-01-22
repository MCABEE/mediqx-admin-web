"use client";
import React, { useEffect, useState } from "react";
import useLanguageStore from "@/app/lib/store/languageStore";
import Navlink from "@/components/dataManager/generalData/Navlink";
import Link from "next/link";

function AddLanguagesPage() {
  const {
    languages,
    isLoading,
    error,
    success,
    setLanguages,
    addLanguageInput,
    setLanguageValue,
    saveLanguages,
    resetSuccess,
  } = useLanguageStore();

  const [duplicateIndices, setDuplicateIndices] = useState([]);

  // Reset success and duplicates after success
  useEffect(() => {
    if (success) {
      setTimeout(resetSuccess, 2000);
      setDuplicateIndices([]);
    }
  }, [success, resetSuccess]);

  // Check local duplicates in real-time
  useEffect(() => {
    const seen = {};
    const duplicates = [];
    languages.forEach((lang, idx) => {
      const trimmed = lang.trim();
      if (trimmed) {
        if (seen[trimmed] !== undefined) {
          duplicates.push(idx, seen[trimmed]);
        } else {
          seen[trimmed] = idx;
        }
      }
    });
    setDuplicateIndices([...new Set(duplicates)]);
  }, [languages]);

  const handleSave = async () => {
    // Prevent saving if local duplicates exist
    if (duplicateIndices.length > 0) return;

    try {
      await saveLanguages();
    } catch (err) {
      // If API returns duplicates
      const apiDuplicates =
        err?.response?.data?.error?.details?.duplicates?.map((d) =>
          languages.findIndex((l) => l.trim() === d.value),
        ) || [];

      if (apiDuplicates.length > 0) {
        setDuplicateIndices(apiDuplicates);
      }
    }
  };

  return (
    <div>
      <Navlink />
      <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
          <div className="flex item-center gap-[50px]">
            <h1 className="text-[#3674B5]">Add</h1>
            <Link
              href="/controlpanel/data-manager/general-data/languages/manage-languages"
              className="text-black"
            >
              Manage
            </Link>
          </div>
          <button
            className="bg-[#196BA5] text-white text-3xl rounded-lg size-9 cursor-pointer"
            type="button"
            onClick={addLanguageInput}
          >
            +
          </button>
        </div>
      </div>

      <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
        <h1 className="text-black font-semibold py-[16px]">Add Languages</h1>
      </div>

      {languages.map((lang, idx) => {
        const isDuplicate = duplicateIndices.includes(idx);
        return (
          <div key={idx} className="bg-white flex gap-6 px-6 py-2 mt-2">
            <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">{`${(
              idx + 1
            )
              .toString()
              .padStart(2, "0")}`}</div>
            <input
              type="text"
              className={`w-[350px] py-2 px-4 rounded-[15px] outline-none ${
                isDuplicate
                  ? "border-red-500 border-1 bg-red-100"
                  : "border border-[#8888888c]"
              }`}
              placeholder="Enter Language"
              value={lang}
              onChange={(e) => setLanguageValue(idx, e.target.value)}
            />
          </div>
        );
      })}

      <button
        className={`bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-2 cursor-pointer ${
          duplicateIndices.length > 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleSave}
        disabled={isLoading || duplicateIndices.length > 0}
      >
        {isLoading ? "Saving..." : "Save"}
      </button>

      {(error || success) && (
        <div className="text-sm py-2 px-6">
          {error && <div className="text-red-500">{error}</div>}
          {success && (
            <div className="text-blue-500">Languages added successfully!</div>
          )}
        </div>
      )}
    </div>
  );
}

export default AddLanguagesPage;
