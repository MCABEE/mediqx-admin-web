"use client";

import React from "react";
import useStateStore from "@/app/lib/store/stateStore";
import Navlink from "@/components/dataManager/generalData/Navlink";
import Link from "next/link";

function AddStatesPage() {
  const {
    states,
    isLoading,
    error,
    success,
    addStateInput,
    setStateValue,
    saveStates,
    resetSuccess,
  } = useStateStore();

  React.useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        resetSuccess();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, resetSuccess]);

  return (
    <div>
      <Navlink />
      <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
          <div className="flex item-center gap-[50px]">
            <h1 className="text-[#3674B5]">Add</h1>
            <Link
              href={
                "/controlpanel/data-manager/general-data/states/manage-states"
              }
              className="text-black"
            >
              Manage
            </Link>
          </div>
          <button
            className="bg-[#196BA5] text-white text-3xl rounded-lg size-9 cursor-pointer"
            type="button"
            onClick={addStateInput}
          >
            +
          </button>
        </div>
      </div>

      <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
        <h1 className="text-black font-semibold py-[16px]">Add States</h1>
      </div>

      {states.map((stateValue, idx) => (
        <div key={idx} className="bg-white flex gap-6 px-6 py-2 mt-2">
          <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
            {(idx + 1).toString().padStart(2, "0")}
          </div>
          <input
            type="text"
            className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
            placeholder="Enter State"
            value={stateValue}
            onChange={(e) => setStateValue(idx, e.target.value)}
          />
        </div>
      ))}

      <button
        className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-2 cursor-pointer"
        onClick={saveStates}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save"}
      </button>

      {error && <div className="text-red-600 mt-2 px-6">{error}</div>}
      {success && (
        <div className="text-blue-600 mt-2 px-6">
          States added successfully!
        </div>
      )}
    </div>
  );
}

export default AddStatesPage;
