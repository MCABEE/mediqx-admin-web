// import Navlink from "@/components/dataManager/generalData/Navlink";
// import Link from "next/link";
// import React from "react";

// function page() {
//   return (
//     <div>
//       <Navlink />
//       <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
//         <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
//           <div className=" flex item-center gap-[50px]">
//             <h1 className="text-[#3674B5]">Add</h1>
//             <Link href={" /controlpanel/data-manager/general-data/cities/manage-cities"} className="text-black">Manage</Link>
//           </div>
//           <button className="bg-[#196BA5] text-white text-3xl rounded-lg size-9 cursor-pointer">
//             +
//           </button>
//         </div>
//       </div>

//       <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
// <h1 className="text-black font-semibold py-[16px] ">Add Cities</h1>
//       </div>
//         <div className="bg-white  px-6 py-2 mt-2">
//             <select className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none">
//                 <option value="">Select District</option>
//                 <option value="">Kerala</option>
//             </select>
        
//       </div>
//       <div className="bg-white flex gap-6 px-6 py-2 mt-2">
//         <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">01</div>
//             <input type="text" className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none" placeholder="Enter Cities"/>
//       </div>
//        <div className="bg-white flex gap-6 px-6 py-2 mt-2">
//         <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">02</div>
//             <input type="text" className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none" placeholder="Enter Cities"/>
//       </div>
//       <button className="bg-[#196BA5] text-white  rounded-[15px] py-2 px-10 mt-2 cursor-pointer">
//             Save
//           </button>

//     </div>
//   );
// }

// export default page;





"use client";
import React, { useEffect, useRef, useState } from "react";
import Navlink from "@/components/dataManager/generalData/Navlink";
import Link from "next/link";
import useCityStore from "@/app/lib/store/citiesStore";

function Page() {
  const {
    cities,
    districtsList,
    selectedDistrictId,
    isLoading,
    isDistrictsLoading,
    error,
    success,
    addCityInput,
    setCityValue,
    saveCities,
    resetSuccess,
    fetchDistricts,
    page,
    totalPages,
    setSelectedDistrictId,
    districtsPage,
    districtsTotalPages
  } = useCityStore();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchDistricts(1);
  }, [fetchDistricts]);

 const handleDistrictScroll = (e) => {
  const { scrollTop, scrollHeight, clientHeight } = e.target;
  if (
    scrollTop + clientHeight >= scrollHeight - 5 &&
    !isDistrictsLoading &&
    districtsPage < districtsTotalPages
  ) {
    fetchDistricts(districtsPage + 1);
  }
};


  // Close dropdown on clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => resetSuccess(), 3000);
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
            <Link href={"/controlpanel/data-manager/general-data/cities/manage-cities"} className="text-black">
              Manage
            </Link>
          </div>
          <button
            className="bg-[#196BA5] text-white text-3xl rounded-lg size-9 cursor-pointer"
            onClick={addCityInput}
          >
            +
          </button>
        </div>
      </div>

      <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
        <h1 className="text-black font-semibold py-[16px] ">Add Cities</h1>
      </div>

      {/* District select dropdown */}
      <div className="bg-white px-6 py-2 mt-2" ref={dropdownRef}>
        <div
          className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] cursor-pointer bg-white"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {districtsList.find((d) => d.id === selectedDistrictId)?.name || "Select District"}
        </div>
        {dropdownOpen && (
          <div
            className="absolute mt-1 w-[350px] max-h-48 overflow-y-auto border border-[#8888888c] rounded-[15px] bg-white shadow-lg z-10"
            onScroll={handleDistrictScroll}
          >
            {districtsList.map((district) => (
              <div
                key={district.id}
                className={`px-4 py-2 cursor-pointer hover:bg-[#C0D8F6] ${
                  selectedDistrictId === district.id ? "bg-[#E6F0FF]" : ""
                }`}
                onClick={() => {
                  setSelectedDistrictId(district.id);
                  setDropdownOpen(false);
                }}
              >
                {district.name}
              </div>
            ))}
            {isDistrictsLoading && (
              <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
            )}
          </div>
        )}
      </div>

      {/* City input rows */}
      {cities.map((city, idx) => (
        <div
          key={idx}
          className="bg-white flex gap-6 px-6 py-2 mt-2 items-center"
        >
          <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
            {(idx + 1).toString().padStart(2, "0")}
          </div>

          <input
            type="text"
            placeholder="Enter City"
            className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
            value={city.name}
            onChange={(e) => setCityValue(idx, "name", e.target.value)}
          />
        </div>
      ))}

      {/* Save button */}
      <button
        className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-2 cursor-pointer"
        onClick={saveCities}
        disabled={isLoading || !selectedDistrictId}
      >
        {isLoading ? "Saving..." : "Save"}
      </button>

      {error && (
        <div className="text-red-600 mt-2 px-6 font-semibold">{error}</div>
      )}
      {success && (
        <div className="text-blue-600 mt-2 px-6 font-semibold">
          Cities added successfully!
        </div>
      )}
    </div>
  );
}

export default Page;
