"use client";
import React, { useEffect } from "react";
import Navlink from "@/components/dataManager/patientData/Navlink";
import Link from "next/link";
import useHealthStatusStore from "@/app/lib/store/useHealthStatusStore";

function AddHealthStatusPage() {
  const {
    servicesInputs,
    isLoading: loading,
    error,
    success,
    addServiceInput,
    setServiceInputValue,
    addServices,
    resetSuccess,
  } = useHealthStatusStore();

  const handleAddField = () => addServiceInput();

  const handleInputChange = (idx, value) => {
    setServiceInputValue(idx, value);
  };

  const handleSave = () => {
    addServices();
  };

  useEffect(() => {
    console.log("Success changed:", success);
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
              href="/controlpanel/data-manager/patient-data/health-status/manage-health-status"
              className="text-black"
            >
              Manage
            </Link>
          </div>
          <button
            className="bg-[#196BA5] text-white text-3xl rounded-lg size-9 cursor-pointer"
            onClick={handleAddField}
            aria-label="Add new health status"
            disabled={loading}
          >
            +
          </button>
        </div>
      </div>

      <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
        <h1 className="text-black font-semibold py-[16px]">
          Add Health Status
        </h1>
      </div>

      {servicesInputs.map((value, idx) => (
        <div key={idx} className="bg-white flex gap-6 px-6 py-2 mt-2">
          <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
            {String(idx + 1).padStart(2, "0")}
          </div>
          <input
            type="text"
            className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
            placeholder="Enter Health Status"
            value={value}
            disabled={loading}
            onChange={(e) => handleInputChange(idx, e.target.value)}
          />
        </div>
      ))}

      <button
        disabled={loading}
        onClick={handleSave}
        className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-2 cursor-pointer"
      >
        Save
      </button>

      {success && (
        <div className="text-blue-600 font-semibold mt-2">
          Health Statuses added successfully!
        </div>
      )}
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}

export default AddHealthStatusPage;
