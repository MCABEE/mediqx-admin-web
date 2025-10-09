"use client";
import React, { useEffect, useState } from "react";
import useLocationStore from "@/app/lib/store/locationStore";
import Navlink from "@/components/dataManager/generalData/Navlink";
import Link from "next/link";
import UploadExcelPopup from "@/components/dataManager/generalData/UploadExcelPopup";

function AddLocations() {
  const {
    locations,
    isLoading,
    error,
    success,
    addLocationInput,
    setLocationValue,
    saveLocations,
    resetSuccess,
    setError
  } = useLocationStore();

  const [uploadExcelPopup,setUploadExcelPopup]=useState(false)

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => resetSuccess(), 2000);
      return () => clearTimeout(timer);
    }
  }, [success, error, resetSuccess]);

  return (
    <div>
      <Navlink />

      {/* Header */}
      <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
          <div className="flex item-center gap-[50px]">
            <h1 className="text-[#3674B5]">Add</h1>
            <Link
              href="/controlpanel/data-manager/general-data/location/manage-location"
              className="text-black"
            >
              Manage
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button 
            className="bg-[#196BA5] text-white text-[16px] rounded-lg p-2 cursor-pointer"
            onClick={()=>setUploadExcelPopup(true)}
            >
              Upload Excel
            </button>
            <button
            className="bg-[#196BA5] text-white text-3xl rounded-lg size-9 cursor-pointer"
            type="button"
            onClick={addLocationInput}
          >
            +
          </button>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
        <h1 className="text-black font-semibold py-[16px]">Add Locations</h1>
      </div>

      {locations.map((loc, idx) => (
        <div
          key={idx}
          className="bg-white flex flex gap-4 px-6 py-2 mt-2 items-center"
        >
          <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
            {(idx + 1).toString().padStart(2, "0")}
          </div>

         <div className=" flex flex-wrap gap-4">
             <input
            type="text"
            className="border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
            placeholder="State"
            value={loc.state}
            onChange={(e) => setLocationValue(idx, "state", e.target.value)}
          />
          <input
            type="text"
            className="border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
            placeholder="District"
            value={loc.district}
            onChange={(e) => setLocationValue(idx, "district", e.target.value)}
          />
          <input
            type="text"
            className="border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
            placeholder="City"
            value={loc.city}
            onChange={(e) => setLocationValue(idx, "city", e.target.value)}
          />
          <input
            type="text"
            className="border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
            placeholder="Pincode"
            value={loc.pincode}
            maxLength={6}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setLocationValue(idx, "pincode", val);
            }}
          />
         </div>
        </div>
      ))}

      <button
        className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 my-4 cursor-pointer"
        onClick={saveLocations}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save"}
      </button>

      {error && <div className="text-red-600 my-2 px-6">{error}</div>}
      {success && (
        <div className="text-blue-600 mt-2 px-6">
          Location added successfully!
        </div>
      )}


      {
        uploadExcelPopup && (
          <UploadExcelPopup onClose={()=>setUploadExcelPopup(false)}/>
        )
      }
    </div>
  );
}

export default AddLocations;
