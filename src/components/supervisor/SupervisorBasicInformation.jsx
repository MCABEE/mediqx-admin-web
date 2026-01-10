// "use client";
// import React, { useState } from "react";
// import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";
// import LocationPickerPopup from "../staffManagement/addNewStaff/LocationPickerPopup";

// const SupervisorBasicInformation = ({ onComplete, setCategoryByProfession }) => {
//   const [formData, setFormData] = useState({
//     categoryByProfession: "",
//     fullName: "",
//     gender: "",
//     email: "",
//     mobileNumber: "",
//     referralCode: "",
//     dob: "",
//   });

//   const [location, setLocation] = useState({ latitude: "", longitude: "", mapLocation: "" });
//   const [showLocationPopup, setShowLocationPopup] = useState(false);
//   const [validationErrors, setValidationErrors] = useState({});
//   const [isFocused, setIsFocused] = useState(false);

//   const { registerSupervisor, isLoading, successData, error } = useSupervisorRegistrationStore();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "mobileNumber") {
//       if (!/^\d*$/.test(value) || value.length > 10) return;
//     }
//     setFormData((p) => ({ ...p, [name]: value }));
//     if (name === "categoryByProfession" && setCategoryByProfession) {
//       setCategoryByProfession(value);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errs = {};
//     if (!formData.fullName) errs.fullName = "Full name is required.";
//     if (!formData.gender) errs.gender = "Gender is required.";
//     if (formData.mobileNumber.length !== 10) errs.mobileNumber = "Phone must be 10 digits.";
//     if (!location.latitude || !location.longitude) errs.location = "Please choose a location.";

//     if (Object.keys(errs).length) {
//       setValidationErrors(errs);
//       return;
//     }
//     setValidationErrors({});

//     const payload = {
//       categoryByProfession: formData.categoryByProfession,
//       fullName: formData.fullName,
//       gender: formData.gender,
//       email: formData.email,
//       mobileNumber: `+91${formData.mobileNumber}`,
//       referralCode: formData.referralCode || undefined,
//       dob: formData.dob || undefined,
//       latitude: Number(location.latitude) || 0,
//       longitude: Number(location.longitude) || 0,
//       mapLocation: location.mapLocation || "",
//     };

//     try {
//       await registerSupervisor(payload);
//       onComplete?.(); // move to next step
//     } catch (err) {
//       // error stored in the store; optionally show local message as well
//       console.error("Registration error:", err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2 className="text-lg font-semibold py-4">Basic Information</h2>

//       <select name="gender" value={formData.gender} onChange={handleChange} required className="w-[328px] h-[40px] border rounded-lg px-3">
//         <option value="" disabled>Gender</option>
//         <option value="MALE">Male</option>
//         <option value="FEMALE">Female</option>
//         <option value="OTHER">Other</option>
//       </select>

//       <select name="categoryByProfession" value={formData.categoryByProfession} onChange={handleChange} className="w-[328px] h-[40px] border rounded-lg px-3 mt-3">
      
//         <option value="REGISTERED_NURSE">Registered Nurse</option>
//             <option value="NURSING_ASSISTANTS">Nursing Assistants</option>
//             <option value="TECHNICIANS">Technicians</option>
//             <option value="THERAPY">Therapy</option>
//             <option value="ANCILLARY_PERSONAL">Ancillary Personal</option>
//       </select>

//       <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="w-[328px] h-[40px] border rounded-lg px-3 mt-3" />
//       <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email ID" className="w-[328px] h-[40px] border rounded-lg px-3 mt-3" />
//       <input name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="Phone Number" maxLength={10} className="w-[328px] h-[40px] border rounded-lg px-3 mt-3" />
//       {validationErrors.mobileNumber && <p className="text-red-500">{validationErrors.mobileNumber}</p>}

//       <input
//         type={isFocused ? "date" : "text"}
//         name="dob"
//         value={formData.dob}
//         onChange={handleChange}
//         placeholder="Date of Birth"
//         onFocus={() => setIsFocused(true)}
//         onBlur={() => setIsFocused(false)}
//         className="w-[328px] h-[40px] border rounded-lg px-3 mt-3"
//       />

//       <input
//         type="text"
//         value={location.mapLocation || ""}
//         placeholder="Select Location"
//         onClick={() => setShowLocationPopup(true)}
//         readOnly
//         className="w-[328px] h-[40px] border rounded-lg px-3 mt-3 cursor-pointer bg-white"
//       />
//       {validationErrors.location && <p className="text-red-500">{validationErrors.location}</p>}

//       <input name="referralCode" value={formData.referralCode} onChange={handleChange} placeholder="Referral Code" className="w-[328px] h-[40px] border rounded-lg px-3 mt-3" />

//       <button type="submit" disabled={isLoading} className="mt-5 w-[328px] h-[40px] bg-[#3674B5] text-white rounded-lg">
//         {isLoading ? "Submitting..." : "Next"}
//       </button>

//       {error && <p className="text-red-600 mt-2">{error}</p>}
//       {successData && <p className="text-green-600 mt-2">Registered — continuing...</p>}

//       {showLocationPopup && (
//         <LocationPickerPopup
//           currentLat={location.latitude}
//           currentLng={location.longitude}
//           onClose={() => setShowLocationPopup(false)}
//           onUpdated={(coords) => {
//             setLocation(coords);
//             setShowLocationPopup(false);
//           }}
//         />
//       )}
//     </form>
//   );
// };

// export default SupervisorBasicInformation;










// "use client";
// import React, { useState } from "react";
// import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";
// import LocationPickerPopup from "../staffManagement/addNewStaff/LocationPickerPopup";

// const SupervisorBasicInformation = ({ onComplete, setCategoryByProfession }) => {
//   const [formData, setFormData] = useState({
//     categoryByProfession: "",
//     fullName: "",
//     gender: "",
//     email: "",
//     mobileNumber: "",
//     referralCode: "",
//     dob: "",
//   });

//   const [location, setLocation] = useState({ latitude: "", longitude: "", mapLocation: "" });
//   const [showLocationPopup, setShowLocationPopup] = useState(false);

//   // UI / validation states
//   const [validationErrors, setValidationErrors] = useState({});
//   const [isFocused, setIsFocused] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false); // prevents re-submit after success
//   const [submitting, setSubmitting] = useState(false); // local locking to prevent double submits

//   const { registerSupervisor, isLoading, successData, error } = useSupervisorRegistrationStore();

//   const emailRegex =
//     // simple email regex sufficient for client-side validation
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "mobileNumber") {
//       // allow only digits and max 10 chars
//       if (!/^\d*$/.test(value) || value.length > 10) return;
//     }
//     setFormData((p) => ({ ...p, [name]: value }));
//     if (name === "categoryByProfession" && setCategoryByProfession) {
//       setCategoryByProfession(value);
//     }
//     // clear validation error for this field while user types
//     setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
//   };

//   const validateAll = () => {
//     const errs = {};

//     if (!formData.categoryByProfession) errs.categoryByProfession = "Please select a profession category.";
//     if (!formData.fullName || formData.fullName.trim().length < 3) errs.fullName = "Full name must be at least 3 characters.";
//     if (!formData.gender) errs.gender = "Please select gender.";
//     if (!formData.email || !emailRegex.test(formData.email)) errs.email = "Please enter a valid email address.";
//     if (!formData.mobileNumber || formData.mobileNumber.length !== 10) errs.mobileNumber = "Mobile number must be exactly 10 digits.";
//     // DOB should be a date string; ensure not empty and a valid date in the past
//     if (!formData.dob) {
//       errs.dob = "Please provide date of birth.";
//     } else {
//       const d = new Date(formData.dob);
//       if (Number.isNaN(d.getTime())) errs.dob = "Invalid date of birth.";
//       else {
//         const now = new Date();
//         if (d > now) errs.dob = "Date of birth cannot be in the future.";
//       }
//     }
//     if (!location.latitude || !location.longitude || !location.mapLocation) {
//       errs.location = "Please select a location.";
//     }

//     return errs;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (submitting || isLoading || isSubmitted) return;

//     // trim inputs
//     setFormData((p) => ({
//       ...p,
//       fullName: p.fullName?.trim(),
//       email: p.email?.trim(),
//       referralCode: p.referralCode?.trim(),
//       mobileNumber: p.mobileNumber?.trim(),
//     }));

//     const errs = validateAll();
//     if (Object.keys(errs).length > 0) {
//       setValidationErrors(errs);
//       return;
//     }
//     setValidationErrors({});
//     setSubmitting(true);

//     const payload = {
//       categoryByProfession: formData.categoryByProfession,
//       fullName: formData.fullName,
//       gender: formData.gender,
//       email: formData.email,
//       mobileNumber: `+91${formData.mobileNumber}`,
//       referralCode: formData.referralCode || undefined,
//       dob: formData.dob || undefined,
//       latitude: Number(location.latitude) || 0,
//       longitude: Number(location.longitude) || 0,
//       mapLocation: location.mapLocation || "",
//     };

//     try {
//       await registerSupervisor(payload);
//       setIsSubmitted(true);
//       onComplete?.();
//     } catch (err) {
//       // store sets `error`; also show local console
//       console.error("Registration error:", err);
//     } finally {
//       setSubmitting(false);
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
//           <select
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             required
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none"
//           >
//             <option value="" disabled>
//               Gender
//             </option>
//             <option value="MALE">Male</option>
//             <option value="FEMALE">Female</option>
//             <option value="OTHER">Other</option>
//           </select>
//           {validationErrors.gender && <span className="text-[13px] text-red-500 ps-2">{validationErrors.gender}</span>}

//           {/* Profession category */}
//           <select
//             name="categoryByProfession"
//             value={formData.categoryByProfession}
//             onChange={handleChange}
//             required
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none"
//           >
//             <option value="" disabled>
//               Category by profession
//             </option>
//             <option value="REGISTERED_NURSE">Registered Nurse</option>
//             <option value="NURSING_ASSISTANTS">Nursing Assistants</option>
//             <option value="TECHNICIANS">Technicians</option>
//             <option value="THERAPY">Therapy</option>
//             <option value="ANCILLARY_PERSONAL">Ancillary Personal</option>
//           </select>
//           {validationErrors.categoryByProfession && (
//             <span className="text-[13px] text-red-500 ps-2">{validationErrors.categoryByProfession}</span>
//           )}

//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             placeholder="Full Name"
//             required
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black "
//           />
//           {validationErrors.fullName && <span className="text-[13px] text-red-500 ps-2">{validationErrors.fullName}</span>}

//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email ID"
//             required
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px]  outline-none placeholder:text-black"
//           />
//           {validationErrors.email && <span className="text-[13px] text-red-500 ps-2">{validationErrors.email}</span>}

//           <input
//             type="text"
//             name="mobileNumber"
//             value={formData.mobileNumber}
//             onChange={handleChange}
//             placeholder="Phone Number"
//             maxLength={10}
//             required
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px]  outline-none placeholder:text-black"
//           />
//           {validationErrors.mobileNumber && (
//             <span className="text-[13px] text-red-500 ps-2">{validationErrors.mobileNumber}</span>
//           )}

//           <input
//             type={isFocused ? "date" : "text"}
//             name="dob"
//             value={formData.dob}
//             onChange={handleChange}
//             placeholder="Date of Birth"
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => setIsFocused(false)}
//             required
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black"
//           />
//           {validationErrors.dob && <span className="text-[13px] text-red-500 ps-2">{validationErrors.dob}</span>}

//           {/* Location input (clickable, opens popup) */}
//           <input
//             type="text"
//             value={location.mapLocation || ""}
//             placeholder="Select Location"
//             onClick={() => setShowLocationPopup(true)}
//             readOnly
//             required
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black cursor-pointer bg-white"
//           />
//           {validationErrors.location && (
//             <span className="text-[13px] text-red-500 ps-2">{validationErrors.location}</span>
//           )}

//           <input
//             type="text"
//             name="referralCode"
//             value={formData.referralCode}
//             onChange={handleChange}
//             placeholder="Referral Code"
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px]  outline-none placeholder:text-black"
//           />

//           {/* Submit button */}
//           <button
//             type="submit"
//             disabled={isLoading || isSubmitted || submitting}
//             className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center opacity-100 disabled:opacity-50 cursor-pointer"
//           >
//             {isLoading || submitting ? "Submitting..." : isSubmitted ? "Submitted" : "Next"}
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

//       {/* Location popup */}
//       {showLocationPopup && (
//         <LocationPickerPopup
//           currentLat={location.latitude}
//           currentLng={location.longitude}
//           bookingId={null} // not required here
//           onClose={() => setShowLocationPopup(false)}
//           onUpdated={(coords) => {
//             // coords = { latitude, longitude, mapLocation }
//             setLocation(coords);
//             setShowLocationPopup(false);
//             // clear location validation if any
//             setValidationErrors((prev) => ({ ...prev, location: undefined }));
//           }}
//         />
//       )}
//     </form>
//   );
// };

// export default SupervisorBasicInformation;






// "use client";
// import React, { useState } from "react";
// import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";
// import LocationPickerPopup from "../staffManagement/addNewStaff/LocationPickerPopup";

// const SupervisorBasicInformation = ({ onComplete, setCategoryByProfession }) => {
//   const [formData, setFormData] = useState({
//     categoryByProfession: "",
//     fullName: "",
//     gender: "",
//     email: "",
//     mobileNumber: "",
//     referralCode: "",
//     dob: "",
//   });

//   const [location, setLocation] = useState({ latitude: "", longitude: "", mapLocation: "" });
//   const [showLocationPopup, setShowLocationPopup] = useState(false);
//   const [validationErrors, setValidationErrors] = useState({});
//   const [isFocused, setIsFocused] = useState(false);
//   const [isClicked, setIsClicked] = useState(false);

//   const { registerSupervisor, isLoading, successData, error } = useSupervisorRegistrationStore();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "mobileNumber") {
//       // allow only digits up to 10 characters
//       if (!/^\d*$/.test(value) || value.length > 10) return;
//     }
//     setFormData((p) => ({ ...p, [name]: value }));
//     if (name === "categoryByProfession" && setCategoryByProfession) {
//       setCategoryByProfession(value);
//     }
//   };

//   const validate = () => {
//     const errs = {};
//     if (!formData.categoryByProfession) errs.categoryByProfession = "Please select category.";
//     if (!formData.fullName || formData.fullName.trim().length < 2) errs.fullName = "Full name is required (min 2 chars).";
//     if (!formData.gender) errs.gender = "Please select gender.";
//     if (!formData.email) {
//       errs.email = "Email is required.";
//     } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
//       errs.email = "Enter a valid email address.";
//     }
//     if (!formData.mobileNumber || formData.mobileNumber.length !== 10) errs.mobileNumber = "Phone must be exactly 10 digits.";
//     if (!formData.dob) errs.dob = "Date of birth is required.";
//     if (!location.latitude || !location.longitude || !location.mapLocation) errs.location = "Please choose a location.";
//     return errs;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isClicked) return;
//     const errs = validate();
//     if (Object.keys(errs).length) {
//       setValidationErrors(errs);
//       return;
//     }
//     setValidationErrors({});
//     setIsClicked(true);

//     const payload = {
//       categoryByProfession: formData.categoryByProfession,
//       fullName: formData.fullName.trim(),
//       gender: formData.gender,
//       email: formData.email.trim(),
//       mobileNumber: `+91${formData.mobileNumber}`,
//       referralCode: formData.referralCode || undefined,
//       dob: formData.dob,
//       latitude: Number(location.latitude) || 0,
//       longitude: Number(location.longitude) || 0,
//       mapLocation: location.mapLocation || "",
//     };

//     try {
//       await registerSupervisor(payload);
//       onComplete?.();
//     } catch (err) {
//       // store sets `error`; keep local logging
//       console.error("registerSupervisor error:", err);
//     } finally {
//       setIsClicked(false);
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
//           <select
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             required
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none"
//           >
//             <option value="" disabled>
//               Gender
//             </option>
//             <option value="MALE">Male</option>
//             <option value="FEMALE">Female</option>
//             <option value="OTHER">Other</option>
//           </select>
//           {validationErrors.gender && <span className="text-[13px] text-red-500 ps-2">{validationErrors.gender}</span>}

//           {/* Profession category */}
//           <select
//             name="categoryByProfession"
//             value={formData.categoryByProfession}
//             onChange={handleChange}
//             required
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none"
//           >
//              <option value="" disabled>
//               Category by profession
//             </option>
//             <option value="REGISTERED_NURSE">Registered Nurse</option>
//             <option value="NURSING_ASSISTANTS">Nursing Assistants</option>
//             <option value="TECHNICIANS">Technicians</option>
//             <option value="THERAPY">Therapy</option>
//             <option value="ANCILLARY_PERSONAL">Ancillary Personal</option>
//             <option value="OTHER">Other</option>

//           </select>
//           {validationErrors.categoryByProfession && <span className="text-[13px] text-red-500 ps-2">{validationErrors.categoryByProfession}</span>}

//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             placeholder="Full Name"
//             required
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black "
//           />
//           {validationErrors.fullName && <span className="text-[13px] text-red-500 ps-2">{validationErrors.fullName}</span>}

//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email ID"
//             required
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px]  outline-none placeholder:text-black"
//           />
//           {validationErrors.email && <span className="text-[13px] text-red-500 ps-2">{validationErrors.email}</span>}

//           <input
//             type="text"
//             name="mobileNumber"
//             value={formData.mobileNumber}
//             onChange={handleChange}
//             placeholder="Phone Number"
//             maxLength={10}
//             required
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px]  outline-none placeholder:text-black"
//           />
//           {validationErrors.mobileNumber && (
//             <span className="text-[13px] text-red-500 ps-2">
//               {validationErrors.mobileNumber}
//             </span>
//           )}

//           <input
//             type={isFocused ? "date" : "text"}
//             name="dob"
//             value={formData.dob}
//             onChange={handleChange}
//             placeholder="Date of Birth"
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => setIsFocused(false)}
//             required
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black"
//           />
//           {validationErrors.dob && <span className="text-[13px] text-red-500 ps-2">{validationErrors.dob}</span>}

//           {/* Location input (clickable, opens popup) */}
//           <input
//             type="text"
//             value={location.mapLocation || ""}
//             placeholder="Select Location"
//             onClick={() => setShowLocationPopup(true)}
//             readOnly
//             required
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black cursor-pointer bg-white"
//           />
//           {validationErrors.location && (
//             <span className="text-[13px] text-red-500 ps-2">
//               {validationErrors.location}
//             </span>
//           )}

//           <input
//             type="text"
//             name="referralCode"
//             value={formData.referralCode}
//             onChange={handleChange}
//             placeholder="Referral Code"
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px]  outline-none placeholder:text-black"
//           />

//           {/* Submit button */}
//           <button
//             type="submit"
//             disabled={isLoading || isClicked}
//             className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center opacity-100 disabled:opacity-50 cursor-pointer"
//           >
//             {isLoading ? "Submitting..." : successData ? "Submitted" : "Next"}
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

//       {/* Location popup */}
//       {showLocationPopup && (
//         <LocationPickerPopup
//           currentLat={location.latitude}
//           currentLng={location.longitude}
//           onClose={() => setShowLocationPopup(false)}
//           onUpdated={(coords) => {
//             // coords = { latitude, longitude, mapLocation }
//             setLocation(coords);
//             setShowLocationPopup(false);
//           }}
//         />
//       )}
//     </form>
//   );
// };

// export default SupervisorBasicInformation;



"use client";
import React, { useState } from "react";
import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";
import LocationPickerPopup from "@/components/staffManagement/addNewStaff/LocationPickerPopup"; // adjust path

const SupervisorBasicInformation = ({ onComplete, setCategoryByProfession }) => {
  const [formData, setFormData] = useState({
    categoryByProfession: "",
    fullName: "",
    gender: "",
    email: "",
    mobileNumber: "",
    referralCode: "",
    dob: "",
  });

  const [location, setLocation] = useState({ latitude: "", longitude: "", mapLocation: "" });
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isFocused, setIsFocused] = useState(false);

  const { registerSupervisor, isLoading, successData, error } = useSupervisorRegistrationStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobileNumber") {
      // allow only digits and max 10
      if (!/^\d*$/.test(value) || value.length > 10) return;
    }
    setFormData((p) => ({ ...p, [name]: value }));
    if (name === "categoryByProfession" && setCategoryByProfession) {
      setCategoryByProfession(value);
    }
  };

  const validateEmail = (email) => {
    // simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validate = () => {
    const errs = {};
    if (!formData.categoryByProfession) errs.categoryByProfession = "Category is required.";
    if (!formData.fullName) errs.fullName = "Full name is required.";
    if (!formData.gender) errs.gender = "Gender is required.";
    if (!formData.email) errs.email = "Email is required.";
    else if (!validateEmail(formData.email)) errs.email = "Enter a valid email.";
    if (!formData.mobileNumber || formData.mobileNumber.length !== 10)
      errs.mobileNumber = "Phone must be exactly 10 digits.";
    if (!formData.dob) errs.dob = "Date of birth is required.";
    if (!location.latitude || !location.longitude) errs.location = "Please select a location.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setValidationErrors(errs);
      return;
    }
    setValidationErrors({});

    const payload = {
      categoryByProfession: formData.categoryByProfession,
      fullName: formData.fullName.trim(),
      gender: formData.gender,
      email: formData.email.trim(),
      mobileNumber: `+91${formData.mobileNumber}`,
      referralCode: formData.referralCode?.trim() || undefined,
      dob: formData.dob,
      latitude: Number(location.latitude) || 0,
      longitude: Number(location.longitude) || 0,
      mapLocation: location.mapLocation || "",
    };

    try {
      await registerSupervisor(payload);
      onComplete?.();
    } catch (err) {
      // store already sets error; keep local console
      console.error("registerSupervisor error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">Basic Information</h1>
        <div className="flex flex-col gap-5 px-[39px] mb-12">
          {/* Gender */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none"
          >
            <option value="" disabled>Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          {validationErrors.gender && <span className="text-[13px] text-red-500 ps-2">{validationErrors.gender}</span>}

          {/* Profession category */}
          <select
            name="categoryByProfession"
            value={formData.categoryByProfession}
            onChange={handleChange}
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none"
          >
            <option value="" disabled>Category by profession</option>
           
            <option value="REGISTERED_NURSE">Registered Nurse</option>
            <option value="NURSING_ASSISTANTS">Nursing Assistants</option>
            <option value="TECHNICIANS">Technicians</option>
            <option value="THERAPY">Therapy</option>
            <option value="ANCILLARY_PERSONAL">Ancillary Personal</option>
            <option value="OTHER">Other</option>
          
          </select>
          {validationErrors.categoryByProfession && <span className="text-[13px] text-red-500 ps-2">{validationErrors.categoryByProfession}</span>}

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black"
          />
          {validationErrors.fullName && <span className="text-[13px] text-red-500 ps-2">{validationErrors.fullName}</span>}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email ID"
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black"
          />
          {validationErrors.email && <span className="text-[13px] text-red-500 ps-2">{validationErrors.email}</span>}

          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            maxLength={10}
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black"
          />
          {validationErrors.mobileNumber && <span className="text-[13px] text-red-500 ps-2">{validationErrors.mobileNumber}</span>}

          <input
            type={isFocused ? "date" : "text"}
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="Date of Birth"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black"
          />
          {validationErrors.dob && <span className="text-[13px] text-red-500 ps-2">{validationErrors.dob}</span>}

          {/* Location input (clickable, opens popup) */}
          <input
            type="text"
            value={location.mapLocation || ""}
            placeholder="Select Location"
            onClick={() => setShowLocationPopup(true)}
            readOnly
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black cursor-pointer bg-white"
          />
          {validationErrors.location && <span className="text-[13px] text-red-500 ps-2">{validationErrors.location}</span>}

          <input
            type="text"
            name="referralCode"
            value={formData.referralCode}
            onChange={handleChange}
            placeholder="Referral Code"
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black"
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Submitting..." : "Next"}
          </button>

          {successData && <span className="text-[14px] text-[#3674B5] font-semibold ps-4">The entry has been successfully submitted!</span>}
          {error && <span className="text-[14px] text-red-500 font-semibold ps-4">{error}</span>}
        </div>
      </div>

      {/* Location popup */}
      {showLocationPopup && (
        <LocationPickerPopup
          currentLat={location.latitude}
          currentLng={location.longitude}
          bookingId={null}
          onClose={() => setShowLocationPopup(false)}
          onUpdated={(coords) => {
            setLocation(coords);
            setShowLocationPopup(false);
          }}
        />
      )}
    </form>
  );
};

export default SupervisorBasicInformation;
