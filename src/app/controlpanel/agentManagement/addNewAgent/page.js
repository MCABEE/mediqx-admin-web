// "use client";

// import useAgentStore from "@/app/lib/store/agentManagementStore";
// import Navlink from "@/components/agentManagement/Navlink";
// import React, { useState, useEffect } from "react";

// function Page() {
//   const { createAgent, successMessage, error, loading } = useAgentStore();

//   const initialState = {
//     typeOfAgent: "",
//     fullName: "",
//     gender: "",
//     dob: "",
//     referralType: "",
//     state: "",
//     district: "",
//     city: "",
//     lineFirst: "",
//     lineSecond: "",
//     email: "",
//     mobileNumber: "",
//     categoryByProfession: "AGENT", // default
//   };

//   const [formData, setFormData] = useState(initialState);
//   const [mobileError, setMobileError] = useState("");
//   const [dob, setDob] = useState("");
//   const [isFocused, setIsFocused] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "mobileNumber") {
//       const onlyDigits = value.replace(/\D/g, "");
//       if (onlyDigits.length > 10) return;
//       setFormData({ ...formData, mobileNumber: onlyDigits });
//       return;
//     }

//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.mobileNumber.length !== 10) {
//       setMobileError("Mobile number must be exactly 10 digits");
//       return;
//     }
//     setMobileError("");

//     const apiData = {
//       ...formData,
//       mobileNumber: `+91${formData.mobileNumber}`,
//     };

//     try {
//       await createAgent(apiData);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   useEffect(() => {
//     if (successMessage) {
//       setFormData(initialState);
//     }
//   }, [successMessage]);

//   return (
//     <div>
//       <Navlink />

//       <div className="bg-white border border-[#888888] rounded-[15px] my-2">
//         <form onSubmit={handleSubmit}>
//           <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">
//             Basics Information
//           </h1>

//           <div className="flex flex-col gap-5 px-[39px]">
//             <select
//               required
//               name="typeOfAgent"
//               value={formData.typeOfAgent}
//               onChange={handleChange}
//               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] outline-none rounded-[15px] ps-8 pe-4"
//             >
//               <option value="" className="text-gray-300">
//                 Type of Agent
//               </option>
//               <option value="INSTITUTION">Institution</option>
//               <option value="DOCTOR">Doctor</option>
//               <option value="HEALTHCARE_PROFESSIONAL">
//                 Healthcare professional
//               </option>
//               <option value="PUBLIC">Public</option>
//             </select>

//             <input
//               required
//               name="fullName"
//               type="text"
//               value={formData.fullName}
//               onChange={handleChange}
//               placeholder="Full Name"
//               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] outline-none placeholder:text-black ps-8 pe-4"
//             />

//             <select
//               required
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] outline-none placeholder:text-black  ps-8 pe-4"
//             >
//               <option value="">Gender</option>
//               <option value="MALE">Male</option>
//               <option value="FEMALE">Female</option>
//               <option value="OTHER">Other</option>
//             </select>

//             <div className="relative w-[328px]">
//               {isFocused ? (
//                 <input
//                   required
//                   type="date"
//                   name="dob"
//                   value={formData.dob}
//                   onChange={handleChange}
//                   onBlur={() => setIsFocused(false)}
//                   className="w-full h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] outline-none ps-8 pe-4"
//                   autoFocus
//                 />
//               ) : (
//                 <input
//                   type="text"
//                   name="dob-dummy"
//                   placeholder="Dob"
//                   value={
//                     formData.dob
//                       ? new Date(formData.dob).toLocaleDateString()
//                       : ""
//                   }
//                   onFocus={() => setIsFocused(true)}
//                   readOnly
//                   className="w-full h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] outline-none ps-8 pe-4 placeholder:text-black"
//                 />
//               )}
//             </div>

//             <select
//               required
//               name="referralType"
//               value={formData.referralType}
//               onChange={handleChange}
//               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] outline-none  ps-8 pe-4"
//             >
//               <option value="">Referral Type</option>
//               <option value="STAFF">Staff</option>
//               <option value="PATIENT">Patient</option>
//               <option value="PATIENT_AND_STAFF">Both</option>
//             </select>

//             <h1 className="text-[16px] font-semibold text-black">
//               Current Location
//             </h1>

//             <input
//               required
//               name="state"
//               type="text"
//               value={formData.state}
//               onChange={handleChange}
//               placeholder="State"
//               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] outline-none placeholder:text-black  ps-8 pe-4"
//             />
//             <input
//               required
//               name="district"
//               type="text"
//               value={formData.district}
//               onChange={handleChange}
//               placeholder="District"
//               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] outline-none placeholder:text-black  ps-8 pe-4"
//             />
//             <input
//               required
//               name="city"
//               type="text"
//               value={formData.city}
//               onChange={handleChange}
//               placeholder="Area / Location"
//               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] outline-none placeholder:text-black  ps-8 pe-4"
//             />
//           </div>

//           <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">
//             Address and Contact
//           </h1>
//           <div className="flex flex-col gap-5 px-[39px] mb-12">
//             <input
//               required
//               name="lineFirst"
//               type="text"
//               value={formData.lineFirst}
//               onChange={handleChange}
//               placeholder="Address Line 1"
//               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] outline-none placeholder:text-black  ps-8 pe-4"
//             />
//             <input
//               required
//               name="lineSecond"
//               type="text"
//               value={formData.lineSecond}
//               onChange={handleChange}
//               placeholder="Address Line 2"
//               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] outline-none placeholder:text-black  ps-8 pe-4"
//             />

//             <input
//               required
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] outline-none placeholder:text-black  ps-8 pe-4"
//             />

//             <input
//               required
//               name="mobileNumber"
//               type="text"
//               value={formData.mobileNumber}
//               onChange={handleChange}
//               placeholder="Mobile Number (10 digits)"
//               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] outline-none placeholder:text-black  ps-8 pe-4"
//             />
//             {mobileError && (
//               <span className="text-[13px] text-red-700 ps-2">
//                 {mobileError}
//               </span>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center cursor-pointer"
//             >
//               {loading ? "Submitting..." : "Submit"}
//             </button>

//             {successMessage && (
//               <span className="text-[14px] text-[#3674B5] font-semibold ps-4">
//                 {successMessage}
//               </span>
//             )}
//             {error && (
//               <span className="text-[14px] text-red-700 font-semibold ps-4">
//                 {error}
//               </span>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Page;









// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import useAgentStore from "@/app/lib/store/agentManagementStore";
// import Navlink from "@/components/agentManagement/Navlink";

// function Page() {
//   const {
//     createAgent,
//     successMessage,
//     error,
//     loading,
//     fetchLocationByPincode,
//     locationResults,
//     locationLoading,
//     locationError,
//   } = useAgentStore();

//   const [formData, setFormData] = useState({
//     typeOfAgent: "",
//     fullName: "",
//     gender: "",
//     dob: "",
//     referralType: "",
//     state: "",
//     district: "",
//     city: "",
//     lineFirst: "",
//     lineSecond: "",
//     email: "",
//     mobileNumber: "",
//     pincode: "",
//     houseNameOrNumber:"",
//     categoryByProfession: "AGENT", // default
//   });

//   const [mobileError, setMobileError] = useState("");
//   const [isFocused, setIsFocused] = useState(false);
//   const debounceTimeout = useRef(null);

//   // 🔹 Debounced API call for Pincode Search
//   useEffect(() => {
//     const pincode = formData.pincode;
//     if (pincode.length !== 2) return;

//     if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

//     debounceTimeout.current = setTimeout(async () => {
//       console.log("Fetching locations for pincode:", pincode);
//       await fetchLocationByPincode(pincode);
//     }, 500);

//     return () => {
//       if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
//     };
//   }, [formData.pincode, fetchLocationByPincode]);

//   // 🔹 Handle all input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "mobileNumber") {
//       const onlyDigits = value.replace(/\D/g, "");
//       if (onlyDigits.length > 10) return;
//       setFormData({ ...formData, mobileNumber: onlyDigits });
//       return;
//     }

//     if (name === "pincode") {
//       const onlyDigits = value.replace(/\D/g, "");
//       setFormData({ ...formData, pincode: onlyDigits });
//       return;
//     }

//     setFormData({ ...formData, [name]: value });
//   };

//   // 🔹 When user clicks a location result
//   const handleSelectLocation = (loc) => {
//     setFormData({
//       ...formData,
//       state: loc.state,
//       district: loc.district,
//       city: loc.city,
//       pincode: loc.pincode,
//     });
//   };

//   // 🔹 Handle Form Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.mobileNumber.length !== 10) {
//       setMobileError("Mobile number must be exactly 10 digits");
//       return;
//     }
//     setMobileError("");

//     const apiData = {
//       ...formData,
//       mobileNumber: `+91${formData.mobileNumber}`,
//     };

//     try {
//       await createAgent(apiData);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   useEffect(() => {
//     if (successMessage) {
//       setFormData({
//         typeOfAgent: "",
//         fullName: "",
//         gender: "",
//         dob: "",
//         referralType: "",
//         state: "",
//         district: "",
//         city: "",
//         lineFirst: "",
//         lineSecond: "",
//         email: "",
//         mobileNumber: "",
//         pincode: "",
//         houseNameOrNumber:"",
//         categoryByProfession: "AGENT",
//       });
//     }
//   }, [successMessage]);

//   return (
//     <div>
//       <Navlink />

//       <div className="bg-white border border-[#888888] rounded-[15px] my-2">
//         <form onSubmit={handleSubmit}>
//           <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">
//             Basics Information
//           </h1>

//           <div className="flex flex-col gap-5 px-[39px]">
//             <select
//               required
//               name="typeOfAgent"
//               value={formData.typeOfAgent}
//               onChange={handleChange}
//               className="w-[328px] h-[40px] text-black text-[14px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
//             >
//               <option value="">Type of Agent</option>
//               <option value="INSTITUTION">Institution</option>
//               <option value="DOCTOR">Doctor</option>
//               <option value="HEALTHCARE_PROFESSIONAL">
//                 Healthcare professional
//               </option>
//               <option value="PUBLIC">Public</option>
//             </select>

//             <input
//               required
//               name="fullName"
//               type="text"
//               value={formData.fullName}
//               onChange={handleChange}
//               placeholder="Full Name"
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
//             />

//             <select
//               required
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
//             >
//               <option value="">Gender</option>
//               <option value="MALE">Male</option>
//               <option value="FEMALE">Female</option>
//               <option value="OTHER">Other</option>
//             </select>

//             <div className="relative w-[328px]">
//               {isFocused ? (
//                 <input
//                   required
//                   type="date"
//                   name="dob"
//                   value={formData.dob}
//                   onChange={handleChange}
//                   onBlur={() => setIsFocused(false)}
//                   className="w-full h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
//                   autoFocus
//                 />
//               ) : (
//                 <input
//                   type="text"
//                   name="dob-dummy"
//                   placeholder="Dob"
//                   value={
//                     formData.dob
//                       ? new Date(formData.dob).toLocaleDateString()
//                       : ""
//                   }
//                   onFocus={() => setIsFocused(true)}
//                   readOnly
//                   className="w-full h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
//                 />
//               )}
//             </div>

//             <select
//               required
//               name="referralType"
//               value={formData.referralType}
//               onChange={handleChange}
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
//             >
//               <option value="">Referral Type</option>
//               <option value="STAFF">Staff</option>
//               <option value="PATIENT">Patient</option>
//               <option value="PATIENT_AND_STAFF">Both</option>
//             </select>

//             <h1 className="text-[16px] font-semibold text-black">
//               Current Location
//             </h1>

//             {/* 🔹 Pincode Input with Auto Search */}
//             <div className="w-[328px] relative">
//               <input
//                 type="text"
//                 name="pincode"
//                 placeholder="Enter Pincode"
//                 value={formData.pincode}
//                 onChange={handleChange}
//                 className="w-full h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
//               />

//               {locationLoading && (
//                 <div className="text-gray-500 text-sm mt-1">Searching...</div>
//               )}
//               {locationError && (
//                 <div className="text-red-500 text-sm mt-1">{locationError}</div>
//               )}

//               {locationResults.length > 0 && (
//                 <div className="border rounded mt-1 max-h-40 overflow-auto bg-white absolute w-full z-10">
//                   {locationResults.map((loc) => (
//                     <div
//                       key={loc.id}
//                       onClick={() => handleSelectLocation(loc)}
//                       className="cursor-pointer px-2 py-1 hover:bg-gray-200"
//                     >
//                       {loc.city}, {loc.district}, {loc.state} - {loc.pincode}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <input
//               required
//               name="state"
//               type="text"
//               value={formData.state}
//               onChange={handleChange}
//               placeholder="State"
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 mt-2"
//             />
//             <input
//               required
//               name="district"
//               type="text"
//               value={formData.district}
//               onChange={handleChange}
//               placeholder="District"
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 mt-2"
//             />
//             <input
//               required
//               name="city"
//               type="text"
//               value={formData.city}
//               onChange={handleChange}
//               placeholder="City"
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 mt-2"
//             />
//           </div>

//           {/* 🔹 Address & Contact Section */}
//           <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">
//             Address and Contact
//           </h1>
//           <div className="flex flex-col gap-5 px-[39px] mb-12">
//             <input
//               required
//               name="houseNameOrNumber"
//               type="text"
//               value={formData.houseNameOrNumber}
//               onChange={handleChange}
//               placeholder="House Name Or Number"
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
//             />
//             <input
//               required
//               name="lineFirst"
//               type="text"
//               value={formData.lineFirst}
//               onChange={handleChange}
//               placeholder="Address Line 1"
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
//             />
//             <input
//               required
//               name="lineSecond"
//               type="text"
//               value={formData.lineSecond}
//               onChange={handleChange}
//               placeholder="Address Line 2"
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
//             />

//             <input
//               required
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
//             />

//             <input
//               required
//               name="mobileNumber"
//               type="text"
//               value={formData.mobileNumber}
//               onChange={handleChange}
//               placeholder="Mobile Number (10 digits)"
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
//             />
//             {mobileError && (
//               <span className="text-[13px] text-red-700 ps-2">
//                 {mobileError}
//               </span>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center cursor-pointer"
//             >
//               {loading ? "Submitting..." : "Submit"}
//             </button>

//             {successMessage && (
//               <span className="text-[14px] text-[#3674B5] font-semibold ps-4">
//                 {successMessage}
//               </span>
//             )}
//             {error && (
//               <span className="text-[14px] text-red-700 font-semibold ps-4">
//                 {error}
//               </span>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Page;




// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import useAgentStore from "@/app/lib/store/agentManagementStore";
// import Navlink from "@/components/agentManagement/Navlink";

// function Page() {
//   const {
//     createAgent,
//     successMessage,
//     error,
//     loading,
//     fetchLocationByPincode,
//     locationResults,
//     locationLoading,
//     locationError,
//   } = useAgentStore();

//   const [formData, setFormData] = useState({
//     typeOfAgent: "",
//     fullName: "",
//     gender: "",
//     dob: "",
//     referralType: "",
//     state: "",
//     district: "",
//     city: "",
//     lineFirst: "",
//     lineSecond: "",
//     email: "",
//     mobileNumber: "",
//     pincode: "",
//     pincodeDisplay:"",
//     houseNameOrNumber: "",
//     categoryByProfession: "AGENT", 
//   });

//   const [mobileError, setMobileError] = useState("");
//   const [isFocused, setIsFocused] = useState(false);
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const debounceTimeout = useRef(null);

//   //  Debounced API call for Pincode Search
//   useEffect(() => {
//     const pincode = formData.pincodeDisplay;
//     if (!pincode) {
//       setDropdownVisible(false);
//       return;
//     }

//     if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

//     debounceTimeout.current = setTimeout(async () => {
//       await fetchLocationByPincode(pincode);
//       setDropdownVisible(true);
//     }, 500);

//     return () => {
//       if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
//     };
//   }, [formData.pincode, fetchLocationByPincode]);

//   // 🔹 Handle all input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "mobileNumber") {
//       const onlyDigits = value.replace(/\D/g, "");
//       if (onlyDigits.length > 10) return;
//       setFormData({ ...formData, mobileNumber: onlyDigits });
//       return;
//     }

//     if (name === "pincode") {
//       const onlyDigits = value.replace(/\D/g, "");
//       setFormData({ ...formData, pincode: onlyDigits });
//       return;
//     }

//     setFormData({ ...formData, [name]: value });
//   };

//   //  When user clicks a location result
//   const handleSelectLocation = (loc) => {
//     setFormData({
//       ...formData,
//       state: loc.state,
//       district: loc.district,
//       city: loc.city,
//       pincode: loc.id,          
//     pincodeDisplay: loc.pincode
//     });
//     setDropdownVisible(false); // Close dropdown
//   };

//   // 🔹 Handle Form Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.mobileNumber.length !== 10) {
//       setMobileError("Mobile number must be exactly 10 digits");
//       return;
//     }
//     setMobileError("");

//     const apiData = {
//       ...formData,
//       mobileNumber: `+91${formData.mobileNumber}`,
//     };

//     try {
//       await createAgent(apiData);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   // 🔹 Reset form on success
//   useEffect(() => {
//     if (successMessage) {
//       setFormData({
//         typeOfAgent: "",
//         fullName: "",
//         gender: "",
//         dob: "",
//         referralType: "",
//         state: "",
//         district: "",
//         city: "",
//         lineFirst: "",
//         lineSecond: "",
//         email: "",
//         mobileNumber: "",
//         pincode: "",
//         houseNameOrNumber: "",
//         categoryByProfession: "AGENT",
//       });
//     }
//   }, [successMessage]);

//   return (
//     <div>
//       <Navlink />

//       <div className="bg-white border border-[#888888] rounded-[15px] my-2">
//         <form onSubmit={handleSubmit}>
//           <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">
//             Basics Information
//           </h1>

//           <div className="flex flex-col gap-5 px-[39px]">
//             {/* Type of Agent */}
//             <select
//               required
//               name="typeOfAgent"
//               value={formData.typeOfAgent}
//               onChange={handleChange}
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
//             >
//               <option value="">Type of Agent</option>
//               <option value="INSTITUTION">Institution</option>
//               <option value="DOCTOR">Doctor</option>
//               <option value="HEALTHCARE_PROFESSIONAL">
//                 Healthcare professional
//               </option>
//               <option value="PUBLIC">Public</option>
//             </select>

//             {/* Full Name */}
//             <input
//               required
//               name="fullName"
//               type="text"
//               value={formData.fullName}
//               onChange={handleChange}
//               placeholder="Full Name"
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
//             />

//             {/* Gender */}
//             <select
//               required
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
//             >
//               <option value="">Gender</option>
//               <option value="MALE">Male</option>
//               <option value="FEMALE">Female</option>
//               <option value="OTHER">Other</option>
//             </select>

//             {/* DOB */}
//             <div className="relative w-[328px]">
//               {isFocused ? (
//                 <input
//                   required
//                   type="date"
//                   name="dob"
//                   value={formData.dob}
//                   onChange={handleChange}
//                   onBlur={() => setIsFocused(false)}
//                   className="w-full h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
//                   autoFocus
//                 />
//               ) : (
//                 <input
//                   type="text"
//                   name="dob-dummy"
//                   placeholder="Dob"
//                   value={
//                     formData.dob
//                       ? new Date(formData.dob).toLocaleDateString()
//                       : ""
//                   }
//                   onFocus={() => setIsFocused(true)}
//                   readOnly
//                   className="w-full h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
//                 />
//               )}
//             </div>

//             {/* Referral Type */}
//             <select
//               required
//               name="referralType"
//               value={formData.referralType}
//               onChange={handleChange}
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
//             >
//               <option value="">Referral Type</option>
//               <option value="STAFF">Staff</option>
//               <option value="PATIENT">Patient</option>
//               <option value="PATIENT_AND_STAFF">Both</option>
//             </select>

//             {/* Pincode Search */}
//             <h1 className="text-[16px] font-semibold text-black">
//               Current Location
//             </h1>
//             <div className="w-[328px] relative">
//               <input
//                 type="text"
//                 name="pincode"
//                 placeholder="Enter Pincode"
//                 value={formData.pincodeDisplay}
//                  onChange={(e) =>
//     setFormData({ ...formData, pincodeDisplay: e.target.value })
//   }
//                 className="w-full h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
//               />

//               {locationLoading && (
//                 <div className="text-gray-500 text-sm mt-1">Searching...</div>
//               )}
//               {locationError && (
//                 <div className="text-red-500 text-sm mt-1">{locationError}</div>
//               )}
//                 {!locationLoading &&
//     formData.pincode &&
//     dropdownVisible &&
//     locationResults.length === 0 &&
//     !locationError && (
//       <div className="text-gray-500 text-sm mt-1">No locations found for this pincode.</div>
//     )}

//               {dropdownVisible && locationResults.length > 0 && (
//                 <div className="border rounded mt-1 max-h-40 overflow-auto bg-white absolute w-full z-10">
//                   {locationResults.map((loc) => (
//                     <div
//                       key={loc.id}
//                       onClick={() => handleSelectLocation(loc)}
//                       className="cursor-pointer px-2 py-1 hover:bg-gray-200"
//                     >
//                       {loc.city}, {loc.district}, {loc.state} - {loc.pincode}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* State / District / City (Read-only) */}
//             <input
//               required
//               name="state"
//               type="text"
//               value={formData.state}
//               readOnly
//               placeholder="State"
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4  bg-gray-100 outline-none"
//             />
//             <input
//               required
//               name="district"
//               type="text"
//               value={formData.district}
//               readOnly
//               placeholder="District"
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4  bg-gray-100 outline-none"
//             />
//             <input
//               required
//               name="city"
//               type="text"
//               value={formData.city}
//               readOnly
//               placeholder="City"
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4  bg-gray-100 outline-none"
//             />
//           </div>

//           {/* Address & Contact Section */}
//           <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">
//             Address and Contact
//           </h1>
//           <div className="flex flex-col gap-5 px-[39px] mb-12">
//             <input
//               required
//               name="houseNameOrNumber"
//               type="text"
//               value={formData.houseNameOrNumber}
//               onChange={handleChange}
//               placeholder="House Name Or Number"
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
//             />
//             <input
//               required
//               name="lineFirst"
//               type="text"
//               value={formData.lineFirst}
//               onChange={handleChange}
//               placeholder="Address Line 1"
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
//             />
//             <input
//               required
//               name="lineSecond"
//               type="text"
//               value={formData.lineSecond}
//               onChange={handleChange}
//               placeholder="Address Line 2"
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
//             />

//             {/* Email & Mobile */}
//             <input
//               required
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
//             />
//             <input
//               required
//               name="mobileNumber"
//               type="text"
//               value={formData.mobileNumber}
//               onChange={handleChange}
//               placeholder="Mobile Number (10 digits)"
//               className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
//             />
//             {mobileError && (
//               <span className="text-[13px] text-red-700 ps-2">{mobileError}</span>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center cursor-pointer"
//             >
//               {loading ? "Submitting..." : "Submit"}
//             </button>

//             {successMessage && (
//               <span className="text-[14px] text-[#3674B5] font-semibold ps-4">
//                 {successMessage}
//               </span>
//             )}
//             {error && (
//               <span className="text-[14px] text-red-700 font-semibold ps-4">
//                 {error}
//               </span>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Page;







"use client";

import React, { useState, useEffect, useRef } from "react";
import useAgentStore from "@/app/lib/store/agentManagementStore";
import Navlink from "@/components/agentManagement/Navlink";

function Page() {
  const {
    createAgent,
    successMessage,
    error,
    loading,
    fetchLocationByPincode,
    locationResults,
    locationLoading,
    locationError,
  } = useAgentStore();

  const [formData, setFormData] = useState({
    typeOfAgent: "",
    fullName: "",
    gender: "",
    dob: "",
    referralType: "",
    state: "",
    district: "",
    city: "",
    lineFirst: "",
    lineSecond: "",
    email: "",
    mobileNumber: "",
    pincode: "", // will hold ID
    pincodeDisplay: "", // will hold visible pincode
    houseNameOrNumber: "",
    categoryByProfession: "AGENT",
  });

  const [mobileError, setMobileError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const debounceTimeout = useRef(null);

  // ✅ Debounced API call for Pincode Search
  useEffect(() => {
    const pincode = formData.pincodeDisplay;
    if (!pincode) {
      setDropdownVisible(false);
      return;
    }

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      await fetchLocationByPincode(pincode);
      setDropdownVisible(true);
    }, 500);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [formData.pincodeDisplay, fetchLocationByPincode]); // ✅ fixed dependency

  // 🔹 Handle all input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobileNumber") {
      const onlyDigits = value.replace(/\D/g, "");
      if (onlyDigits.length > 10) return;
      setFormData({ ...formData, mobileNumber: onlyDigits });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // ✅ When user clicks a location result
  const handleSelectLocation = (loc) => {
    setFormData({
      ...formData,
      state: loc.state,
      district: loc.district,
      city: loc.city,
      pincode: loc.id, // send ID
      pincodeDisplay: loc.pincode, // show readable pincode
    });
    setDropdownVisible(false); // Close dropdown
  };

  // 🔹 Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.mobileNumber.length !== 10) {
      setMobileError("Mobile number must be exactly 10 digits");
      return;
    }
    setMobileError("");

    const apiData = {
      ...formData,
      mobileNumber: `+91${formData.mobileNumber}`,
    };

    console.log("Submitting Data:", apiData); // ✅ verify pincode ID sent

    try {
      await createAgent(apiData);
    } catch (err) {
      console.error(err.message);
    }
  };

  // 🔹 Reset form on success
  useEffect(() => {
    if (successMessage) {
      setFormData({
        typeOfAgent: "",
        fullName: "",
        gender: "",
        dob: "",
        referralType: "",
        state: "",
        district: "",
        city: "",
        lineFirst: "",
        lineSecond: "",
        email: "",
        mobileNumber: "",
        pincode: "",
        pincodeDisplay: "",
        houseNameOrNumber: "",
        categoryByProfession: "AGENT",
      });
    }
  }, [successMessage]);

  return (
    <div>
      <Navlink />

      <div className="bg-white border border-[#888888] rounded-[15px] my-2">
        <form onSubmit={handleSubmit}>
          <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">
            Basics Information
          </h1>

          <div className="flex flex-col gap-5 px-[39px]">
            {/* Type of Agent */}
            <select
              required
              name="typeOfAgent"
              value={formData.typeOfAgent}
              onChange={handleChange}
              className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
            >
              <option value="">Type of Agent</option>
              <option value="INSTITUTION">Institution</option>
              <option value="DOCTOR">Doctor</option>
              <option value="HEALTHCARE_PROFESSIONAL">
                Healthcare professional
              </option>
              <option value="PUBLIC">Public</option>
            </select>

            {/* Full Name */}
            <input
              required
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
            />

            {/* Gender */}
            <select
              required
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
            >
              <option value="">Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>

            {/* DOB */}
            <div className="relative w-[328px]">
              {isFocused ? (
                <input
                  required
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  onBlur={() => setIsFocused(false)}
                  className="w-full h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
                  autoFocus
                />
              ) : (
                <input
                  type="text"
                  name="dob-dummy"
                  placeholder="Dob"
                  value={
                    formData.dob
                      ? new Date(formData.dob).toLocaleDateString()
                      : ""
                  }
                  onFocus={() => setIsFocused(true)}
                  readOnly
                  className="w-full h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
                />
              )}
            </div>

            {/* Referral Type */}
            <select
              required
              name="referralType"
              value={formData.referralType}
              onChange={handleChange}
              className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
            >
              <option value="">Referral Type</option>
              <option value="STAFF">Staff</option>
              <option value="PATIENT">Patient</option>
              <option value="PATIENT_AND_STAFF">Both</option>
            </select>

            {/* Pincode Search */}
            <h1 className="text-[16px] font-semibold text-black">
              Current Location
            </h1>
            <div className="w-[328px] relative">
              <input
                type="text"
                name="pincodeDisplay"
                placeholder="Enter Pincode"
                value={formData.pincodeDisplay}
                onChange={(e) =>
                  setFormData({ ...formData, pincodeDisplay: e.target.value })
                }
                className="w-full h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
              />

              {locationLoading && (
                <div className="text-gray-500 text-sm mt-1">Searching...</div>
              )}
              {locationError && (
                <div className="text-red-500 text-sm mt-1">{locationError}</div>
              )}
              {!locationLoading &&
                formData.pincodeDisplay &&
                dropdownVisible &&
                locationResults.length === 0 &&
                !locationError && (
                  <div className="text-gray-500 text-sm mt-1">
                    No locations found for this pincode.
                  </div>
                )}

              {dropdownVisible && locationResults.length > 0 && (
                <div className="border rounded mt-1 max-h-40 overflow-auto bg-white absolute w-full z-10">
                  {locationResults.map((loc) => (
                    <div
                      key={loc.id}
                      onClick={() => handleSelectLocation(loc)}
                      className="cursor-pointer px-2 py-1 hover:bg-gray-200"
                    >
                      {loc.city}, {loc.district}, {loc.state} - {loc.pincode}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* State / District / City (Read-only) */}
            <input
              required
              name="state"
              type="text"
              value={formData.state}
              readOnly
              placeholder="State"
              className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 bg-gray-100 outline-none"
            />
            <input
              required
              name="district"
              type="text"
              value={formData.district}
              readOnly
              placeholder="District"
              className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 bg-gray-100 outline-none"
            />
            <input
              required
              name="city"
              type="text"
              value={formData.city}
              readOnly
              placeholder="City"
              className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 bg-gray-100 outline-none"
            />
          </div>

          {/* Address & Contact Section */}
          <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">
            Address and Contact
          </h1>
          <div className="flex flex-col gap-5 px-[39px] mb-12">
            <input
              required
              name="houseNameOrNumber"
              type="text"
              value={formData.houseNameOrNumber}
              onChange={handleChange}
              placeholder="House Name Or Number"
              className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
            />
            <input
              required
              name="lineFirst"
              type="text"
              value={formData.lineFirst}
              onChange={handleChange}
              placeholder="Address Line 1"
              className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
            />
            <input
              required
              name="lineSecond"
              type="text"
              value={formData.lineSecond}
              onChange={handleChange}
              placeholder="Address Line 2"
              className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
            />

            {/* Email & Mobile */}
            <input
              required
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
            />
            <input
              required
              name="mobileNumber"
              type="text"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number (10 digits)"
              className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 pe-4 outline-none"
            />
            {mobileError && (
              <span className="text-[13px] text-red-700 ps-2">
                {mobileError}
              </span>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center cursor-pointer"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

            {successMessage && (
              <span className="text-[14px] text-[#3674B5] font-semibold ps-4">
                {successMessage}
              </span>
            )}
            {error && (
              <span className="text-[14px] text-red-700 font-semibold ps-4">
                {error}
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
