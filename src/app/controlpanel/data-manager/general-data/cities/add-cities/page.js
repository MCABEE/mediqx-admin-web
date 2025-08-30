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





// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import Navlink from "@/components/dataManager/generalData/Navlink";
// import Link from "next/link";
// import useCityStore from "@/app/lib/store/citiesStore";
// import useDistrictStore from "@/app/lib/store/districtsStore";

// function Page() {
//     const {
//       districts,
//       statesList,
     
//       isStatesLoading,
      
    
//       setDistrictValue,
     
     
//     } = useDistrictStore();
//   const {
//     cities,
//     districtsList,
//     selectedDistrictId,
//     isLoading,
//     isDistrictsLoading,
//     error,
//     success,
//     addCityInput, 
//     setCityValue,
//     saveCities,
//     resetSuccess,
//     fetchDistricts,
//     page,
//     totalPages,
//     setSelectedDistrictId,
//     districtsPage,
//     districtsTotalPages
//   } = useCityStore();

//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     fetchDistricts(1);
//   }, [fetchDistricts]);
  
//    const handleScroll = (e) => {
//     const { scrollTop, scrollHeight, clientHeight } = e.target;
//     if (
//       scrollTop + clientHeight >= scrollHeight - 5 &&
//       !isStatesLoading &&
//       page < totalPages
//     ) {
//       fetchStates(page + 1);
//     }
//   };


//  const handleDistrictScroll = (e) => {
//   const { scrollTop, scrollHeight, clientHeight } = e.target;
//   if (
//     scrollTop + clientHeight >= scrollHeight - 5 &&
//     !isDistrictsLoading &&
//     districtsPage < districtsTotalPages
//   ) {
//     fetchDistricts(districtsPage + 1);
//   }
// };


//   // Close dropdown on clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (success) {
//       const timer = setTimeout(() => resetSuccess(), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [success, resetSuccess]);
//   const selectedState =
//     statesList.find((s) => s.id === districts[0]?.stateId)?.name ||
//     "Select State";
//   return (
//     <div>
//       <Navlink />
//       <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
//         <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
//           <div className="flex item-center gap-[50px]">
//             <h1 className="text-[#3674B5]">Add</h1>
//             <Link href={"/controlpanel/data-manager/general-data/cities/manage-cities"} className="text-black">
//               Manage
//             </Link>
//           </div>
//           <button
//             className="bg-[#196BA5] text-white text-3xl rounded-lg size-9 cursor-pointer"
//             onClick={addCityInput}
//           >
//             +
//           </button>
//         </div>
//       </div>

//       <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
//         <h1 className="text-black font-semibold py-[16px] ">Add Cities</h1>
//       </div>
// <div className="flex gap-4 bg-white px-6 py-2 mt-2">
// <div className="" ref={dropdownRef}>
//         <div
//           className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] cursor-pointer bg-white"
//           onClick={() => setDropdownOpen(!dropdownOpen)}
//         >
//           {selectedState}
//         </div>

//         {dropdownOpen && (
//           <div
//             className="absolute mt-1 w-[350px] max-h-48 overflow-y-auto border border-[#8888888c] rounded-[15px] bg-white shadow-lg z-10"
//             onScroll={handleScroll}
//           >
//             {statesList.map((state) => (
//               <div
//                 key={state.id}
//                 className={`px-4 py-2 cursor-pointer hover:bg-[#C0D8F6] ${
//                   districts[0]?.stateId === state.id ? "bg-[#E6F0FF]" : ""
//                 }`}
//                 onClick={() => {
//                   districts.forEach((_, idx) =>
//                     setDistrictValue(idx, "stateId", state.id)
//                   );
//                   setDropdownOpen(false);
//                 }}
//               >
//                 {state.name}
//               </div>
//             ))}
//             {isStatesLoading && (
//               <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
//             )}
//           </div>
//         )}
//       </div>
//       {/* District select dropdown */}
//       <div className="" ref={dropdownRef}>
//         <div
//           className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] cursor-pointer bg-white"
//           onClick={() => setDropdownOpen(!dropdownOpen)}
//         >
//           {districtsList.find((d) => d.id === selectedDistrictId)?.name || "Select District"}
//         </div>
//         {dropdownOpen && (
//           <div
//             className="absolute mt-1 w-[350px] max-h-48 overflow-y-auto border border-[#8888888c] rounded-[15px] bg-white shadow-lg z-10"
//             onScroll={handleDistrictScroll}
//           >
//             {districtsList.map((district) => (
//               <div
//                 key={district.id}
//                 className={`px-4 py-2 cursor-pointer hover:bg-[#C0D8F6] ${
//                   selectedDistrictId === district.id ? "bg-[#E6F0FF]" : ""
//                 }`}
//                 onClick={() => {
//                   setSelectedDistrictId(district.id);
//                   setDropdownOpen(false);
//                 }}
//               >
//                 {district.name}
//               </div>
//             ))}
//             {isDistrictsLoading && (
//               <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
//             )}
//           </div>
//         )}
//       </div>
// </div>

//       {/* City input rows */}
//       {cities.map((city, idx) => (
//         <div
//           key={idx}
//           className="bg-white flex gap-6 px-6 py-2 mt-2 items-center"
//         >
//           <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
//             {(idx + 1).toString().padStart(2, "0")}
//           </div>

//           <input
//             type="text"
//             placeholder="Enter City"
//             className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
//             value={city.name}
//             onChange={(e) => setCityValue(idx, "name", e.target.value)}
//           />
//         </div>
//       ))}

//       {/* Save button */}
//       <button
//         className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-2 cursor-pointer"
//         onClick={saveCities}
//         disabled={isLoading || !selectedDistrictId}
//       >
//         {isLoading ? "Saving..." : "Save"}
//       </button>

//       {error && (
//         <div className="text-red-600 mt-2 px-6 font-semibold">{error}</div>
//       )}
//       {success && (
//         <div className="text-blue-600 mt-2 px-6 font-semibold">
//           Cities added successfully!
//         </div>
//       )}
//     </div>
//   );
// }

// export default Page;







// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import Navlink from "@/components/dataManager/generalData/Navlink";
// import Link from "next/link";
// import useCityStore from "@/app/lib/store/citiesStore";
// import useDistrictStore from "@/app/lib/store/districtsStore";

// function Page() {
//   // State management for state and district selection
//   const {
//     statesList,
//     fetchStates,
//     isStatesLoading,
//     statesPage,
//     statesTotalPages,
//   } = useDistrictStore();

//   const {
//     cities,
//     districtsList,
//     selectedDistrictId,
//     isLoading,
//     isDistrictsLoading,
//     error,
//     success,
//     addCityInput,
//     setCityValue,
//     saveCities,
//     resetSuccess,
//     fetchDistricts,
//     setSelectedDistrictId,
//     districtsPage,
//     districtsTotalPages,
//   } = useCityStore();

//   // Local selection
//   const [selectedStateId, setSelectedStateId] = useState("");
//   const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
//   const [districtDropdownOpen, setDistrictDropdownOpen] = useState(false);
//   const stateDropdownRef = useRef(null);
//   const districtDropdownRef = useRef(null);

//   // Fetch states on mount
//   useEffect(() => {
//     fetchStates(1);
//   }, [fetchStates]);

//   // Whenever a state is selected, fetch its districts
//   useEffect(() => {
//     if (selectedStateId) {
//       fetchDistricts(1, selectedStateId); // fetchDistricts(page, stateId)
//       setSelectedDistrictId(""); // reset district selection
//     }
//   }, [selectedStateId, fetchDistricts, setSelectedDistrictId]);

//   // Infinite scroll for states
//   const handleStateScroll = (e) => {
//     const { scrollTop, scrollHeight, clientHeight } = e.target;
//     if (
//       scrollTop + clientHeight >= scrollHeight - 5 &&
//       !isStatesLoading &&
//       statesPage < statesTotalPages
//     ) {
//       fetchStates(statesPage + 1);
//     }
//   };

//   // Infinite scroll for districts
//   const handleDistrictScroll = (e) => {
//     if (!selectedStateId) return;
//     const { scrollTop, scrollHeight, clientHeight } = e.target;
//     if (
//       scrollTop + clientHeight >= scrollHeight - 5 &&
//       !isDistrictsLoading &&
//       districtsPage < districtsTotalPages
//     ) {
//       fetchDistricts(districtsPage + 1, selectedStateId);
//     }
//   };

//   // Close dropdowns on outside click
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
//         setStateDropdownOpen(false);
//       }
//       if (districtDropdownRef.current && !districtDropdownRef.current.contains(event.target)) {
//         setDistrictDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Success message timeout
//   useEffect(() => {
//     if (success) {
//       const timer = setTimeout(() => resetSuccess(), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [success, resetSuccess]);

//   const selectedStateLabel =
//     statesList.find((s) => s.id === selectedStateId)?.name || "Select State";
//   const selectedDistrictLabel =
//     districtsList.find((d) => d.id === selectedDistrictId)?.name || "Select District";

//   return (
//     <div>
//       <Navlink />
//       <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
//         <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
//           <div className="flex item-center gap-[50px]">
//             <h1 className="text-[#3674B5]">Add</h1>
//             <Link
//               href={"/controlpanel/data-manager/general-data/cities/manage-cities"}
//               className="text-black"
//             >
//               Manage
//             </Link>
//           </div>
//           <button
//             className="bg-[#196BA5] text-white text-3xl rounded-lg size-9 cursor-pointer"
//             onClick={addCityInput}
//           >
//             +
//           </button>
//         </div>
//       </div>

//       <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
//         <h1 className="text-black font-semibold py-[16px] ">Add Cities</h1>
//       </div>

//       <div className="flex gap-4 bg-white px-6 py-2 mt-2">

//         {/* State Dropdown */}
//         <div className="relative" ref={stateDropdownRef}>
//           <div
//             className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] cursor-pointer bg-white"
//             onClick={() => setStateDropdownOpen((open) => !open)}
//           >
//             {selectedStateLabel}
//           </div>
//           {stateDropdownOpen && (
//             <div
//               className="absolute mt-1 w-[350px] max-h-48 overflow-y-auto border border-[#8888888c] rounded-[15px] bg-white shadow-lg z-10"
//               onScroll={handleStateScroll}
//             >
//               {statesList.map((state) => (
//                 <div
//                   key={state.id}
//                   className={`px-4 py-2 cursor-pointer hover:bg-[#C0D8F6] ${
//                     selectedStateId === state.id ? "bg-[#E6F0FF]" : ""
//                   }`}
//                   onClick={() => {
//                     setSelectedStateId(state.id);
//                     setStateDropdownOpen(false);
//                   }}
//                 >
//                   {state.name}
//                 </div>
//               ))}
//               {isStatesLoading && (
//                 <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* District Dropdown (only enabled after state selected) */}
//         <div className="relative" ref={districtDropdownRef}>
//           <div
//             className={`w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] cursor-pointer bg-white ${
//               !selectedStateId ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             onClick={() => {
//               if (selectedStateId) setDistrictDropdownOpen((open) => !open);
//             }}
//           >
//             {selectedDistrictLabel}
//           </div>
//           {districtDropdownOpen && selectedStateId && (
//             <div
//               className="absolute mt-1 w-[350px] max-h-48 overflow-y-auto border border-[#8888888c] rounded-[15px] bg-white shadow-lg z-10"
//               onScroll={handleDistrictScroll}
//             >
//               {districtsList.map((district) => (
//                 <div
//                   key={district.id}
//                   className={`px-4 py-2 cursor-pointer hover:bg-[#C0D8F6] ${
//                     selectedDistrictId === district.id ? "bg-[#E6F0FF]" : ""
//                   }`}
//                   onClick={() => {
//                     setSelectedDistrictId(district.id);
//                     setDistrictDropdownOpen(false);
//                   }}
//                 >
//                   {district.name}
//                 </div>
//               ))}
//               {isDistrictsLoading && (
//                 <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* City input rows */}
//       {cities.map((city, idx) => (
//         <div
//           key={idx}
//           className="bg-white flex gap-6 px-6 py-2 mt-2 items-center"
//         >
//           <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
//             {(idx + 1).toString().padStart(2, "0")}
//           </div>
//           <input
//             type="text"
//             placeholder="Enter City"
//             className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
//             value={city.name}
//             onChange={(e) => setCityValue(idx, "name", e.target.value)}
//           />
//         </div>
//       ))}

//       {/* Save button */}
//       <button
//         className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-2 cursor-pointer"
//         onClick={saveCities}
//         disabled={isLoading || !selectedDistrictId}
//       >
//         {isLoading ? "Saving..." : "Save"}
//       </button>

//       {error && (
//         <div className="text-red-600 mt-2 px-6 font-semibold">{error}</div>
//       )}
//       {success && (
//         <div className="text-blue-600 mt-2 px-6 font-semibold">
//           Cities added successfully!
//         </div>
//       )}
//     </div>
//   );
// }

// export default Page;





// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import Navlink from "@/components/dataManager/generalData/Navlink";
// import Link from "next/link";
// import useCityStore from "@/app/lib/store/citiesStore";
// import useDistrictStore from "@/app/lib/store/districtsStore";

// function Page() {
//   // Zustand store hooks
//   const {
//     cities,
//     districtsList,
//     selectedDistrictId,
//     isLoading,
//     isDistrictsLoading,
//     error,
//     success,
//     addCityInput,
//     setCityValue,
//     saveCities,
//     resetSuccess,
//     fetchDistricts,
//     setSelectedDistrictId,
//     districtsPage,
//     districtsTotalPages,
//   } = useCityStore();

//   const {
//     statesList,
//     fetchStates,
//     isStatesLoading,
//     statesPage,
//     statesTotalPages,
//   } = useDistrictStore();

//   // Local UI state
//   const [selectedStateId, setSelectedStateId] = useState("");
//   const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
//   const [districtDropdownOpen, setDistrictDropdownOpen] = useState(false);
//   const stateDropdownRef = useRef(null);
//   const districtDropdownRef = useRef(null);

//   // Fetch states on mount
//   useEffect(() => {
//     fetchStates(1);
//   }, [fetchStates]);

//   // Fetch districts filtered by state
//   useEffect(() => {
//     if (selectedStateId) {
//       fetchDistricts(1, selectedStateId);
//       setSelectedDistrictId("");
//     }
//   }, [selectedStateId, fetchDistricts, setSelectedDistrictId]);

//   // State infinite scroll
//   const handleStateScroll = (e) => {
//     const { scrollTop, scrollHeight, clientHeight } = e.target;
//     if (
//       scrollTop + clientHeight >= scrollHeight - 5 &&
//       !isStatesLoading &&
//       statesPage < statesTotalPages
//     ) {
//       fetchStates(statesPage + 1);
//     }
//   };

//   // District infinite scroll
//   const handleDistrictScroll = (e) => {
//     if (!selectedStateId) return;
//     const { scrollTop, scrollHeight, clientHeight } = e.target;
//     if (
//       scrollTop + clientHeight >= scrollHeight - 5 &&
//       !isDistrictsLoading &&
//       districtsPage < districtsTotalPages
//     ) {
//       fetchDistricts(districtsPage + 1, selectedStateId);
//     }
//   };

//   // Outside click closes dropdowns
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
//         setStateDropdownOpen(false);
//       }
//       if (districtDropdownRef.current && !districtDropdownRef.current.contains(event.target)) {
//         setDistrictDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Timed success message
//   useEffect(() => {
//     if (success) {
//       const timer = setTimeout(() => resetSuccess(), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [success, resetSuccess]);

//   const selectedStateLabel =
//     statesList.find((s) => s.id === selectedStateId)?.name || "Select State";
//   const selectedDistrictLabel =
//     districtsList.find((d) => d.id === selectedDistrictId)?.name || "Select District";

//   return (
//     <div>
//       <Navlink />
//       <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
//         <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
//           <div className="flex item-center gap-[50px]">
//             <h1 className="text-[#3674B5]">Add</h1>
//             <Link href={"/controlpanel/data-manager/general-data/cities/manage-cities"} className="text-black">
//               Manage
//             </Link>
//           </div>
//           <button
//             className="bg-[#196BA5] text-white text-3xl rounded-lg size-9 cursor-pointer"
//             onClick={addCityInput}
//           >
//             +
//           </button>
//         </div>
//       </div>

//       <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
//         <h1 className="text-black font-semibold py-[16px] ">Add Cities</h1>
//       </div>

//       {/* State/District Select */}
//       <div className="flex gap-4 bg-white px-6 py-2 mt-2">
//         {/* State Dropdown */}
//         <div className="relative" ref={stateDropdownRef}>
//           <div
//             className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] cursor-pointer bg-white"
//             onClick={() => setStateDropdownOpen((o) => !o)}
//           >
//             {selectedStateLabel}
//           </div>
//           {stateDropdownOpen && (
//             <div
//               className="absolute mt-1 w-[350px] max-h-48 overflow-y-auto border border-[#8888888c] rounded-[15px] bg-white shadow-lg z-10"
//               onScroll={handleStateScroll}
//             >
//               {statesList.map((state) => (
//                 <div
//                   key={state.id}
//                   className={`px-4 py-2 cursor-pointer hover:bg-[#C0D8F6] ${
//                     selectedStateId === state.id ? "bg-[#E6F0FF]" : ""
//                   }`}
//                   onClick={() => {
//                     setSelectedStateId(state.id);
//                     setStateDropdownOpen(false);
//                     console.log(selectedStateId);
                    
//                   }}
//                 >
//                   {state.name}
//                 </div>
//               ))}
//               {isStatesLoading && (
//                 <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
//               )}
//             </div>
//           )}
//         </div>
//         {/* District Dropdown */}
//         <div className="relative" ref={districtDropdownRef}>
//           <div
//             className={`w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] cursor-pointer bg-white ${
//               !selectedStateId ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           onClick={() => {
//       if (selectedStateId) {
//         console.log("District dropdown opened. Using stateId:", selectedStateId);
//         setDistrictDropdownOpen((o) => !o);
//       }
//     }}
//           >
//             {selectedDistrictLabel}
//           </div>
//           {districtDropdownOpen && selectedStateId && (
//             <div
//               className="absolute mt-1 w-[350px] max-h-48 overflow-y-auto border border-[#8888888c] rounded-[15px] bg-white shadow-lg z-10"
//               onScroll={handleDistrictScroll}
//             >
//               {districtsList.map((district) => (
//                 <div
//                   key={district.id}
//                   className={`px-4 py-2 cursor-pointer hover:bg-[#C0D8F6] ${
//                     selectedDistrictId === district.id ? "bg-[#E6F0FF]" : ""
//                   }`}
//                   onClick={() => {
//                     setSelectedDistrictId(district.id);
//                     setDistrictDropdownOpen(false);
//                   }}
//                 >
//                   {district.name}
//                 </div>
//               ))}
//               {isDistrictsLoading && (
//                 <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* City input rows */}
//       {cities.map((city, idx) => (
//         <div
//           key={idx}
//           className="bg-white flex gap-6 px-6 py-2 mt-2 items-center"
//         >
//           <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
//             {(idx + 1).toString().padStart(2, "0")}
//           </div>
//           <input
//             type="text"
//             placeholder="Enter City"
//             className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
//             value={city.name}
//             onChange={(e) => setCityValue(idx, "name", e.target.value)}
//           />
//         </div>
//       ))}

//       {/* Save button */}
//       <button
//         className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-2 cursor-pointer"
//         onClick={saveCities}
//         disabled={isLoading || !selectedDistrictId}
//       >
//         {isLoading ? "Saving..." : "Save"}
//       </button>

//       {error && (
//         <div className="text-red-600 mt-2 px-6 font-semibold">{error}</div>
//       )}
//       {success && (
//         <div className="text-blue-600 mt-2 px-6 font-semibold">
//           Cities added successfully!
//         </div>
//       )}
//     </div>
//   );
// }

// export default Page;









"use client";
import React, { useEffect, useRef, useState } from "react";
import Navlink from "@/components/dataManager/generalData/Navlink";
import Link from "next/link";
import useCityStore from "@/app/lib/store/citiesStore";
import useDistrictStore from "@/app/lib/store/districtsStore";

function Page() {
  // Zustand store hooks
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
    setSelectedDistrictId,
    districtsPage,
    districtsTotalPages,
  } = useCityStore();

  const {
    statesList,
    fetchStates,
    isStatesLoading,
    statesPage,
    statesTotalPages,
  } = useDistrictStore();

  // Local UI state
  const [selectedStateId, setSelectedStateId] = useState("");
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState(false);
  const stateDropdownRef = useRef(null);
  const districtDropdownRef = useRef(null);

  // Fetch states on mount
  useEffect(() => {
    fetchStates(1);
  }, [fetchStates]);

  // Fetch districts filtered by state
  useEffect(() => {
    if (selectedStateId) {
      console.log("State ID changed to:", selectedStateId); // Log updated state id
      fetchDistricts(1, selectedStateId);
      setSelectedDistrictId("");
    }
  }, [selectedStateId, fetchDistricts, setSelectedDistrictId]);

  // State infinite scroll
  const handleStateScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (
      scrollTop + clientHeight >= scrollHeight - 5 &&
      !isStatesLoading &&
      statesPage < statesTotalPages
    ) {
      fetchStates(statesPage + 1);
    }
  };

  // District infinite scroll
  const handleDistrictScroll = (e) => {
    if (!selectedStateId) return;
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (
      scrollTop + clientHeight >= scrollHeight - 5 &&
      !isDistrictsLoading &&
      districtsPage < districtsTotalPages
    ) {
      fetchDistricts(districtsPage + 1, selectedStateId);
    }
  };

  // Outside click closes dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
        setStateDropdownOpen(false);
      }
      if (districtDropdownRef.current && !districtDropdownRef.current.contains(event.target)) {
        setDistrictDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Timed success message
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => resetSuccess(), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, resetSuccess]);

  const selectedStateLabel =
    statesList.find((s) => s.id === selectedStateId)?.name || "Select State";
  const selectedDistrictLabel =
    districtsList.find((d) => d.id === selectedDistrictId)?.name || "Select District";

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

      {/* State/District Select */}
      <div className="flex gap-4 bg-white px-6 py-2 mt-2">
        {/* State Dropdown */}
        <div className="relative" ref={stateDropdownRef}>
          <div
            className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] cursor-pointer bg-white"
            onClick={() => setStateDropdownOpen((o) => !o)}
          >
            {selectedStateLabel}
          </div>
          {stateDropdownOpen && (
            <div
              className="absolute mt-1 w-[350px] max-h-48 overflow-y-auto border border-[#8888888c] rounded-[15px] bg-white shadow-lg z-10"
              onScroll={handleStateScroll}
            >
              {statesList.map((state) => (
                <div
                  key={state.id}
                  className={`px-4 py-2 cursor-pointer hover:bg-[#C0D8F6] ${
                    selectedStateId === state.id ? "bg-[#E6F0FF]" : ""
                  }`}
                  onClick={() => {
                    setSelectedStateId(state.id);
                    setStateDropdownOpen(false);
                  }}
                >
                  {state.name}
                </div>
              ))}
              {isStatesLoading && (
                <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
              )}
            </div>
          )}
        </div>
        {/* District Dropdown */}
        <div className="relative" ref={districtDropdownRef}>
          <div
            className={`w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] cursor-pointer bg-white ${
              !selectedStateId ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => {
              if (selectedStateId) {
                setDistrictDropdownOpen((o) => !o);
              }
            }}
          >
            {selectedDistrictLabel}
          </div>
          {districtDropdownOpen && selectedStateId && (
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
                    setDistrictDropdownOpen(false);
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
