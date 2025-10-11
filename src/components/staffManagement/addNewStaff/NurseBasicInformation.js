// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import useNurseRegistrationStore from "@/app/lib/store/nurseRegistrationStore";
// import useDistrictStore from "@/app/lib/store/districtsStore";
// import useCityStore from "@/app/lib/store/citiesStore";

// const NurseBasicInformation = ({setCategoryByProfession ,onComplete }) => {
//   // Form state
//   const [formData, setFormData] = useState({
//     categoryByProfession: "",
//     fullName: "",
//     gender: "",
//     email: "",
//     mobileNumber: "",
//     state: "",
//     district: "",
//     city: "",
//     pincode: "",
//     referralCode: "",
//     dob: "",
//   });

//   // Store hooks
//   const { registerNurse, isLoading, successData, error } = useNurseRegistrationStore();
//   const { statesList, fetchStates, isStatesLoading, statesPage, statesTotalPages } = useDistrictStore();
//   const {
//     districtsList,
//     fetchDistricts,
//     isDistrictsLoading,
//     districtsPage,
//     districtsTotalPages,
//   } = useCityStore();
//   const {
//     scrollListedCities,
//     fetchCities,
//     isCitiesLoading,
//     citiesPage,
//     citiesTotalPages,
//     scrollFetchCities
//   } = useCityStore();

//   // console.log(scrollListedCities);
//   console.log("districtsList:", districtsList);

//   // Selection state & menu toggles
//   const [selectedStateId, setSelectedStateId] = useState("");
//   const [selectedDistrictId, setSelectedDistrictId] = useState("");
//   const [selectedCityId, setSelectedCityId] = useState("");
//   const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
//   const [districtDropdownOpen, setDistrictDropdownOpen] = useState(false);
//   const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

//   // Validation and UI states
//   const [validationErrors, setValidationErrors] = useState({});
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);

//   // Refs for dropdown menus
//   const stateDropdownRef = useRef(null);
//   const districtDropdownRef = useRef(null);
//   const cityDropdownRef = useRef(null);

//   // Initial fetch for states
//   useEffect(() => {
//     fetchStates(1);
//   }, [fetchStates]);

//   // Fetch districts when state changes
//   useEffect(() => {
//     if (selectedStateId) {
//       fetchDistricts(1, selectedStateId);
//       setFormData((prev) => ({ ...prev, state: selectedStateId, district: "", city: "" }));
//       setSelectedDistrictId("");
//       setSelectedCityId("");
//     }
//   }, [selectedStateId, fetchDistricts]);

//   // Fetch cities when district changes
//   useEffect(() => {
//     if (selectedDistrictId) {
//       scrollFetchCities(1, selectedDistrictId);
//       setFormData((prev) => ({ ...prev, district: selectedDistrictId, city: "" }));
//       setSelectedCityId("");
//     }
//   }, [selectedDistrictId, fetchCities]);

//   // Handle option selection and field changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "mobileNumber") {
//       if (!/^\d*$/.test(value) || value.length > 10) return;
//     }
//     if (name === "pincode") {
//       if (!/^\d*$/.test(value) || value.length > 6) return;
//     }
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//      if (name === "categoryByProfession" && setCategoryByProfession) {
//       setCategoryByProfession(value);
//     }
//   };

// const selectedStateLabel = (statesList || []).find((s) => s.id === selectedStateId)?.name || "Select State";
// const selectedDistrictLabel = (districtsList || []).find((d) => d.id === selectedDistrictId)?.name || "Select District";
// const selectedCityLabel = (scrollListedCities || []).find((c) => c.id === selectedCityId)?.name || "Select City";

//   // Dropdown menu infinite scroll handlers
//   const handleStateScroll = (e) => {
//     const { scrollTop, scrollHeight, clientHeight } = e.target;
//     if (
//       scrollTop + clientHeight >= scrollHeight - 10 &&
//       !isStatesLoading &&
//       statesPage < statesTotalPages
//     ) {
//       fetchStates(statesPage + 1);
//     }
//   };

//   const handleDistrictScroll = (e) => {
//     const { scrollTop, scrollHeight, clientHeight } = e.target;
//     if (
//       scrollTop + clientHeight >= scrollHeight - 10 &&
//       !isDistrictsLoading &&
//       districtsPage < districtsTotalPages
//     ) {
//       fetchDistricts(districtsPage + 1, selectedStateId);
//     }
//   };

//   const handleCityScroll = (e) => {
//     const { scrollTop, scrollHeight, clientHeight } = e.target;
//     if (
//       scrollTop + clientHeight >= scrollHeight - 10 &&
//       !isCitiesLoading &&
//       citiesPage < citiesTotalPages
//     ) {
//       fetchCities(citiesPage + 1, selectedDistrictId);
//     }
//   };

//   // Handle menu close on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         stateDropdownRef.current &&
//         !stateDropdownRef.current.contains(event.target)
//       ) {
//         setStateDropdownOpen(false);
//       }
//       if (
//         districtDropdownRef.current &&
//         !districtDropdownRef.current.contains(event.target)
//       ) {
//         setDistrictDropdownOpen(false);
//       }
//       if (
//         cityDropdownRef.current &&
//         !cityDropdownRef.current.contains(event.target)
//       ) {
//         setCityDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Select handlers
//   const selectState = (id) => {
//     setSelectedStateId(id);
//     setStateDropdownOpen(false);
//   };
//   const selectDistrict = (id) => {
//     setSelectedDistrictId(id);
//     setDistrictDropdownOpen(false);
//   };
//   const selectCity = (id) => {
//     setSelectedCityId(id);
//     setCityDropdownOpen(false);
//     setFormData((prev) => ({ ...prev, city: id }));
//   };

//   // Form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = {};
//     if (formData.mobileNumber.length !== 10) errors.mobileNumber = "Mobile number must be exactly 10 digits.";
//     if (formData.pincode.length !== 6) errors.pincode = "Pincode must be exactly 6 digits.";
//     if (!formData.city) errors.city = "City is required.";
//     if (Object.keys(errors).length > 0) {
//       setValidationErrors(errors);
//       return;
//     }
//     setValidationErrors({});
//     const finalData = { ...formData,
//     stateId: selectedStateId,
//     districtId: selectedDistrictId,
//     cityId: selectedCityId,
//     mobileNumber: `+91${formData.mobileNumber}` };
//      delete finalData.state;
//   delete finalData.district;
//   delete finalData.city;
//     try {
//       await registerNurse(finalData);
//       setIsSubmitted(true);
//       onComplete ()
//     } catch (err) {
//       // Error handled in store
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">
//           Basic Information
//         </h1>
//         <div className="flex flex-col gap-5 px-[39px] mb-12">
//           {/* Gender */}
//           <select name="gender" value={formData.gender} onChange={handleChange} required
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none">
//             <option value="" disabled>Gender</option>
//             <option value="MALE">Male</option>
//             <option value="FEMALE">Female</option>
//             <option value="OTHER">Other</option>
//           </select>
//           {/* Profession category */}
//           <select name="categoryByProfession" value={formData.categoryByProfession} onChange={handleChange} required
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none">
//             <option value="" disabled>Category by profession</option>
//             <option value="REGISTERED_NURSE">Registered Nurse</option>
//             <option value="NURSING_ASSISTANTS">Nursing Assistants</option>
//             <option value="TECHNICIANS">Technicians</option>
//             <option value="THERAPY">Therapy</option>
//             <option value="ANCILLARY_PERSONAL">Ancillary Personal</option>
//           </select>
//           <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black " />
//           <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email ID" required
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px]  outline-none placeholder:text-black" />
//           <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange}
//             placeholder="Phone Number" maxLength={10} required
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px]  outline-none placeholder:text-black" />
//           {validationErrors.mobileNumber && (
//             <span className="text-[13px] text-red-500 ps-2">{validationErrors.mobileNumber}</span>
//           )}
//           <input type={isFocused ? "date" : "text"} name="dob" value={formData.dob} onChange={handleChange}
//             placeholder="Date of Birth" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
//             required className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black" />

//           {/* State Dropdown (Infinite scroll) */}
//           <div className="relative" ref={stateDropdownRef}>
//             <div
//               className="w-[328px] border border-[#BBBBBB] ps-8 text-[14px] py-2 px-4 rounded-[15px] cursor-pointer bg-white"
//               onClick={() => setStateDropdownOpen((o) => !o)}>
//               {selectedStateLabel}
//             </div>
//             {stateDropdownOpen && (
//               <div
//                 className="absolute mt-1 w-[328px] max-h-48 text-[14px]  overflow-y-auto border border-[#BBBBBB] rounded-[15px] bg-white shadow-lg z-10"
//                 onScroll={handleStateScroll}
//                 style={{ maxHeight: 200, overflowY: 'auto' }}>
//                 {statesList.map(state => (
//                   <div
//                     key={state.id}
//                     className={`px-4 py-2 cursor-pointer hover:bg-[#C0D8F6] ${selectedStateId === state.id ? "bg-[#E6F0FF]" : ""}`}
//                     onClick={() => selectState(state.id)}>
//                     {state.name}
//                   </div>
//                 ))}
//                 {isStatesLoading && (
//                   <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* District Dropdown (Infinite scroll) */}
//           {/* <div className="relative" ref={districtDropdownRef}>
//             <div
//               className={`w-[328px] border border-[#BBBBBB] py-2 px-4 rounded-[15px] cursor-pointer bg-white ${!selectedStateId ? "opacity-50 cursor-not-allowed" : ""}`}
//               onClick={() => {
//                 if (selectedStateId) setDistrictDropdownOpen((o) => !o);
//               }}>
//               {selectedDistrictLabel}
//             </div>
//             {districtDropdownOpen && selectedStateId && (
//               <div
//                 className="absolute mt-1 w-[328px] max-h-48 overflow-y-auto border border-[#BBBBBB] rounded-[15px] bg-white shadow-lg z-10"
//                 onScroll={handleDistrictScroll}
//                 style={{ maxHeight: 200, overflowY: 'auto' }}>
//                 {districtsList.map(district => (
//                   <div
//                     key={district.id}
//                     className={`px-4 py-2 cursor-pointer hover:bg-[#C0D8F6] ${selectedDistrictId === district.id ? "bg-[#E6F0FF]" : ""}`}
//                     onClick={() => selectDistrict(district.id)}>
//                     {district.name}
//                   </div>
//                 ))}
//                 {isDistrictsLoading && (
//                   <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
//                 )}
//               </div>
//             )}
//           </div> */}

// <div className="relative" ref={districtDropdownRef}>
//   <div
//     className={`w-[328px] border border-[#BBBBBB] ps-8 text-[14px] py-2 px-4 rounded-[15px] cursor-pointer bg-white ${!selectedStateId ? "opacity-50 cursor-not-allowed" : ""}`}
//     onClick={() => {
//       if (selectedStateId) setDistrictDropdownOpen((o) => !o);
//     }}>
//     {selectedDistrictLabel}
//   </div>
//   {districtDropdownOpen && selectedStateId && (
//     <div
//       className="absolute mt-1 w-[328px] max-h-48 ps-8 text-[14px] overflow-y-auto border border-[#BBBBBB] rounded-[15px] bg-white shadow-lg z-10"
//       onScroll={handleDistrictScroll}
//       style={{ maxHeight: 200, overflowY: 'auto' }}
//     >
//       {isDistrictsLoading ? (
//         <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
//       ) : !districtsList || districtsList.length === 0 ? (
//         <div className="px-4 py-2 text-sm text-gray-500">No districts found</div>
//       ) : (
//         districtsList.map((district) => (
//           <div
//             key={district.id}
//             className={`px-4 py-2 cursor-pointer hover:bg-[#C0D8F6] ${
//               selectedDistrictId === district.id ? "bg-[#E6F0FF]" : ""
//             }`}
//             onClick={() => selectDistrict(district.id)}
//           >
//             {district.name}
//           </div>
//         ))
//       )}
//     </div>
//   )}
// </div>

//           {/* City Dropdown (Infinite scroll) */}
//           {/* <div className="relative" ref={cityDropdownRef}>
//             <div
//               className={`w-[328px] border border-[#BBBBBB] py-2 px-4 rounded-[15px] cursor-pointer bg-white ${!selectedDistrictId ? "opacity-50 cursor-not-allowed" : ""}`}
//               onClick={() => {
//                 if (selectedDistrictId) setCityDropdownOpen((o) => !o);
//               }}>
//               {selectedCityLabel}
//             </div>
//             {cityDropdownOpen && selectedDistrictId && (
//               <div
//                 className="absolute mt-1 w-[328px] max-h-48 overflow-y-auto border border-[#BBBBBB] rounded-[15px] bg-white shadow-lg z-10"
//                 onScroll={handleCityScroll}
//                 style={{ maxHeight: 200, overflowY: 'auto' }}>
//                 {scrollListedCities.map(city => (
//                   <div
//                     key={city.id}
//                     className={`px-4 py-2 cursor-pointer hover:bg-[#C0D8F6] ${selectedCityId === city.id ? "bg-[#E6F0FF]" : ""}`}
//                     onClick={() => selectCity(city.id)}>
//                     {city.name}
//                   </div>
//                 ))}
//                 {isCitiesLoading && (
//                   <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
//                 )}
//               </div>
//             )}
//             {validationErrors.city && (
//               <span className="text-[13px] text-red-500 ps-2">{validationErrors.city}</span>
//             )}
//           </div> */}

//           <div className="relative" ref={cityDropdownRef}>
//   <div
//     className={`w-[328px] border border-[#BBBBBB] ps-8 text-[14px] py-2 px-4 rounded-[15px] cursor-pointer bg-white ${!selectedDistrictId ? "opacity-50 cursor-not-allowed" : ""}`}
//     onClick={() => {
//       if (selectedDistrictId) setCityDropdownOpen((o) => !o);
//     }}>
//     {selectedCityLabel}
//   </div>
//   {cityDropdownOpen && selectedDistrictId && (
//     <div
//       className="absolute mt-1 w-[328px] max-h-48 ps-8 text-[14px] overflow-y-auto border border-[#BBBBBB] rounded-[15px] bg-white shadow-lg z-10"
//       onScroll={handleCityScroll}
//       style={{ maxHeight: 200, overflowY: 'auto' }}>
//       {isCitiesLoading ? (
//         <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
//       ) : !scrollListedCities || scrollListedCities.length === 0 ? (
//         <div className="px-4 py-2 text-sm text-gray-500">No cities found</div>
//       ) : (
//         scrollListedCities.map(city => (
//           <div
//             key={city.id}
//             className={`px-4 py-2 cursor-pointer hover:bg-[#C0D8F6] ${selectedCityId === city.id ? "bg-[#E6F0FF]" : ""}`}
//             onClick={() => selectCity(city.id)}>
//             {city.name}
//           </div>
//         ))
//       )}
//     </div>
//   )}
//   {validationErrors.city && (
//     <span className="text-[13px] text-red-500 ps-2">{validationErrors.city}</span>
//   )}
// </div>

//           {/* Remaining inputs */}
//           <input type="text" name="pincode" value={formData.pincode} onChange={handleChange}
//             placeholder="Pin Code" maxLength={6} required
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px]  outline-none placeholder:text-black" />
//           {validationErrors.pincode && (
//             <span className="text-[13px] text-red-500 ps-2">{validationErrors.pincode}</span>
//           )}
//           <input type="text" name="referralCode" value={formData.referralCode} onChange={handleChange}
//             placeholder="Referral Code"
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px]  outline-none placeholder:text-black" />

//           {/* Submit button */}
//           <button
//             type="submit"
//             disabled={isLoading || isSubmitted}
//             className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center opacity-100 disabled:opacity-50 cursor-pointer">
//             {isLoading ? "Submitting..." : isSubmitted ? "Submitted" : "Next"}
//           </button>
//           {successData && (
//             <span className="text-[14px] text-[#3674B5] font-semibold ps-4">
//               The Entry has been successfully submitted!
//             </span>
//           )}
//           {error && (
//             <span className="text-[14px] text-red-500 font-semibold ps-4">
//               {error}
//             </span>
//           )}
//         </div>
//       </div>
//     </form>
//   );
// };

// export default NurseBasicInformation;

"use client";
import React, { useState } from "react";
import useNurseRegistrationStore from "@/app/lib/store/nurseRegistrationStore";
import LocationPickerPopup from "./LocationPickerPopup";

const NurseBasicInformation = ({ setCategoryByProfession, onComplete }) => {
  // Form state
  const [formData, setFormData] = useState({
    categoryByProfession: "",
    fullName: "",
    gender: "",
    email: "",
    mobileNumber: "",
    referralCode: "",
    dob: "",
  });

  // Location state
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
    mapLocation: "",
  });
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  // Store hooks
  const { registerNurse, isLoading, successData, error } =
    useNurseRegistrationStore();

  // Validation and UI states
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Handle option selection and field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobileNumber") {
      if (!/^\d*$/.test(value) || value.length > 10) return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "categoryByProfession" && setCategoryByProfession) {
      setCategoryByProfession(value);
    }
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (formData.mobileNumber.length !== 10)
      errors.mobileNumber = "Mobile number must be exactly 10 digits.";
    if (!location.latitude || !location.longitude) {
      errors.location = "Please select a location.";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    const finalData = {
      ...formData,
      mobileNumber: `+91${formData.mobileNumber}`,
      latitude: location.latitude,
      longitude: location.longitude,
      mapLocation: location.mapLocation,
    };

    try {
      await registerNurse(finalData);
      setIsSubmitted(true);
      onComplete();
    } catch (err) {
      // Error handled in store
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">
          Basic Information
        </h1>
        <div className="flex flex-col gap-5 px-[39px] mb-12">
          {/* Gender */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none"
          >
            <option value="" disabled>
              Gender
            </option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>

          {/* Profession category */}
          <select
            name="categoryByProfession"
            value={formData.categoryByProfession}
            onChange={handleChange}
            required
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none"
          >
            <option value="" disabled>
              Category by profession
            </option>
            <option value="REGISTERED_NURSE">Registered Nurse</option>
            <option value="NURSING_ASSISTANTS">Nursing Assistants</option>
            <option value="TECHNICIANS">Technicians</option>
            <option value="THERAPY">Therapy</option>
            <option value="ANCILLARY_PERSONAL">Ancillary Personal</option>
          </select>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black "
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email ID"
            required
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px]  outline-none placeholder:text-black"
          />
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            maxLength={10}
            required
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px]  outline-none placeholder:text-black"
          />
          {validationErrors.mobileNumber && (
            <span className="text-[13px] text-red-500 ps-2">
              {validationErrors.mobileNumber}
            </span>
          )}

          <input
            type={isFocused ? "date" : "text"}
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="Date of Birth"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black"
          />

          {/* Location input (clickable, opens popup) */}
          <input
            type="text"
            value={location.mapLocation || ""}
            placeholder="Select Location"
            onClick={() => setShowLocationPopup(true)}
            readOnly
            required
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black cursor-pointer bg-white"
          />
          {validationErrors.location && (
            <span className="text-[13px] text-red-500 ps-2">
              {validationErrors.location}
            </span>
          )}

          <input
            type="text"
            name="referralCode"
            value={formData.referralCode}
            onChange={handleChange}
            placeholder="Referral Code"
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px]  outline-none placeholder:text-black"
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading || isSubmitted}
            className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center opacity-100 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Submitting..." : isSubmitted ? "Submitted" : "Next"}
          </button>
          {successData && (
            <span className="text-[14px] text-[#3674B5] font-semibold ps-4">
              The Entry has been successfully submitted!
            </span>
          )}
          {error && (
            <span className="text-[14px] text-red-500 font-semibold ps-4">
              {error}
            </span>
          )}
        </div>
      </div>

      {/* Location popup */}
      {showLocationPopup && (
        <LocationPickerPopup
          currentLat={location.latitude}
          currentLng={location.longitude}
          bookingId={null} // not required here
          onClose={() => setShowLocationPopup(false)}
          onUpdated={(coords) => {
            // coords = { latitude, longitude, mapLocation }
            setLocation(coords);
            setShowLocationPopup(false);
          }}
        />
      )}
    </form>
  );
};

export default NurseBasicInformation;
