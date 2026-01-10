// "use client";
// import React, { useState, useMemo, useEffect } from "react";
// import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";
// import useManageProfessionalsStore from "@/app/lib/store/useManageProfessionalsStore";
// import LocationPickerPopup from "../staffManagement/addNewStaff/LocationPickerPopup";

// function SupervisorExperienceDetails({ categoryByProfession, onComplete }) {
//   const [hasWorkExperience, setHasWorkExperience] = useState("no");
//   const [formData, setFormData] = useState({
//     yearsOfExperience: "",
//     monthsOfExperience: "",
//     department: "",
//     departmentId: "",
//     providerName: "",
//     providerAddress: "",
//     providerState: "",
//     providerStateId: "",
//     providerLocation: "",
//     latitude: null,
//     longitude: null,
//     mapLocation: "",
//     startDate: "",
//     endDate: "",
//     onGoing: false,
//     skills: [],
//     skillsIds: [],
//     languages: [],
//     languageIds: [],
//   });

//   const [showLocationPopup, setShowLocationPopup] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isClicked, setIsClicked] = useState(false);

//   const { listedItems, fetchItems } = useManageProfessionalsStore();
//   const { submitSupervisorPageTwo } = useSupervisorRegistrationStore();

// //   const normalizedCategory = useMemo(() => {
// //     if (categoryByProfession === "ADMIN") return "ADMIN";
// //     if (categoryByProfession === "SUPERVISOR") return "SUPERVISOR";
// //     return categoryByProfession;
// //   }, [categoryByProfession]);

// //   useEffect(() => {
// //     if (normalizedCategory) {
// //       fetchItems("skills", 1, 50, normalizedCategory);
// //       fetchItems("working-departments", 1, 50, normalizedCategory);
// //     }
// //   }, [normalizedCategory, fetchItems]);
//   const normalizedCategory = useMemo(() => {
//     if (categoryByProfession === "REGISTERED_NURSE") return "REG_NURSES";
//     if (categoryByProfession === "ANCILLARY_PERSONAL") return "ANCILLARY";
//     return categoryByProfession;
//   }, [categoryByProfession]);

//   useEffect(() => {
//     if (normalizedCategory) {
//       fetchItems("skills", 1, 50, normalizedCategory);
//       fetchItems("working-departments", 1, 50, normalizedCategory);
//     }
//   }, [normalizedCategory, fetchItems]);

//   const skills = listedItems.skills || [];
//   const departments = listedItems["working-departments"] || [];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleSkillToggle = (skillId) => {
//     setFormData((p) => ({
//       ...p,
//       skills: p.skills.includes(skillId) ? p.skills.filter((s) => s !== skillId) : [...p.skills, skillId],
//     }));
//   };

//   const handleLocationUpdated = ({ latitude, longitude, mapLocation }) => {
//     setFormData((p) => ({ ...p, latitude, longitude, mapLocation, providerLocation: mapLocation }));
//   };

//   const validate = () => {
//     setErrorMessage("");
//     if (formData.skills.length === 0) {
//       setErrorMessage("Select at least one skill.");
//       return false;
//     }
//     if (hasWorkExperience === "yes") {
//       if (!formData.startDate || (!formData.onGoing && !formData.endDate)) {
//         setErrorMessage("Complete experience dates.");
//         return false;
//       }
//       if (!formData.mapLocation) {
//         setErrorMessage("Set hospital/provider location.");
//         return false;
//       }
//       if (!formData.department) {
//         setErrorMessage("Select a department.");
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleSubmit = async () => {
//     if (isClicked) return;
//     if (!validate()) return;

//     setIsClicked(true);

//     const payload = {
//       categoryByProfession: categoryByProfession || "ADMIN",
//       isExperienced: hasWorkExperience === "yes",
//       yearsOfExperience: hasWorkExperience === "yes" ? Number(formData.yearsOfExperience || 0) : 0,
//       monthsOfExperience: hasWorkExperience === "yes" ? Number(formData.monthsOfExperience || 0) : 0,
//       department: formData.department,
//       departmentId: formData.departmentId,
//       providerName: formData.providerName,
//       providerAddress: formData.providerAddress || formData.mapLocation,
//       providerState: formData.providerState,
//       providerStateId: formData.providerStateId,
//       providerLocation: formData.providerLocation || formData.mapLocation,
//       startDate: formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
//       endDate: formData.onGoing ? new Date().toISOString() : formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
//       onGoing: formData.onGoing,
//       skills: formData.skills,
//       skillsIds: formData.skillsIds,
//       languages: formData.languages,
//       languageIds: formData.languageIds,
//       latitude: formData.latitude,
//       longitude: formData.longitude,
//     };

//     try {
//       await submitSupervisorPageTwo(payload);
//       setIsSubmitted(true);
//       onComplete?.();
//     } catch (err) {
//       console.error("Submit error:", err);
//       setErrorMessage(err.message || "Submission failed");
//     } finally {
//       setIsClicked(false);
//     }
//   };

//   return (
//     <div className="px-4">
//       <h2 className="text-lg font-semibold py-4">Work Experience</h2>

//       <select value={hasWorkExperience} onChange={(e) => setHasWorkExperience(e.target.value)} className="w-[328px] h-[40px] border rounded-lg px-3">
//         <option value="">Previous Work Experience</option>
//         <option value="yes">Yes</option>
//         <option value="no">No</option>
//       </select>

//       {hasWorkExperience === "yes" && (
//         <>
//           <div className="flex gap-3 mt-3">
//             <select name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} className="w-[129px] h-[40px] border rounded-lg px-2">
//               <option value="">Year</option>
//               {Array.from({ length: 31 }, (_, i) => <option key={i} value={i}>{i}</option>)}
//             </select>
//             <select name="monthsOfExperience" value={formData.monthsOfExperience} onChange={handleChange} className="w-[129px] h-[40px] border rounded-lg px-2">
//               <option value="">Month</option>
//               {Array.from({ length: 12 }, (_, i) => <option key={i} value={i}>{i}</option>)}
//             </select>
//           </div>

//           <input name="providerName" value={formData.providerName} onChange={handleChange} placeholder="Hospital (Last working)" className="w-[328px] h-[40px] border rounded-lg px-3 mt-3" />

//           <button type="button" onClick={() => setShowLocationPopup(true)} className="w-[328px] h-[40px] mt-3 border rounded-lg text-left px-3">
//             {formData.mapLocation || "Set Hospital Location"}
//           </button>

//           <select name="department" value={formData.department} onChange={handleChange} className="w-[328px] h-[40px] border rounded-lg px-3 mt-3">
//             <option value="">Department</option>
//             {departments.map((d) => <option key={d.id} value={d.id}>{d.workingDepartment}</option>)}
//           </select>

//           <div className="flex gap-3 mt-3 items-end">
//             <div>
//               <p>From</p>
//               <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-[129px] h-[40px] border rounded-lg px-2" />
//             </div>
//             <div>
//               <p>To</p>
//               <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} disabled={formData.onGoing} className="w-[129px] h-[40px] border rounded-lg px-2" />
//             </div>
//             <label className="flex items-center gap-2">
//               <input type="checkbox" name="onGoing" checked={formData.onGoing} onChange={handleChange} />
//               Currently working here
//             </label>
//           </div>
//         </>
//       )}

//       <h3 className="mt-4 mb-2">Skills</h3>
//       <div className="flex flex-wrap gap-2">
//         {skills.map((s) => (
//           <label key={s.id} className="flex items-center gap-2">
//             <input type="checkbox" checked={formData.skills.includes(s.skill)} onChange={() => handleSkillToggle(s.skill)} />
//             <span>{s.skill}</span>
//           </label>
//         ))}
//       </div>

//       <button onClick={handleSubmit} disabled={isSubmitted || isClicked} className="mt-6 w-[328px] h-[40px] bg-[#3674B5] text-white rounded-lg">
//         {isSubmitted ? "Submitted" : "Next"}
//       </button>

//       {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}

//       {showLocationPopup && (
//         <LocationPickerPopup
//           currentLat={formData.latitude}
//           currentLng={formData.longitude}
//           onClose={() => setShowLocationPopup(false)}
//           onUpdated={handleLocationUpdated}
//         />
//       )}
//     </div>
//   );
// }

// export default SupervisorExperienceDetails;




// "use client";
// import React, { useState, useMemo, useEffect } from "react";
// import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";
// import useManageProfessionalsStore from "@/app/lib/store/useManageProfessionalsStore";
// import LocationPickerPopup from "../staffManagement/addNewStaff/LocationPickerPopup";

// function SupervisorExperienceDetails({ categoryByProfession, onComplete }) {
//   const [hasWorkExperience, setHasWorkExperience] = useState("no");
//   const [formData, setFormData] = useState({
//     yearsOfExperience: "",
//     monthsOfExperience: "",
//     department: "",
//     departmentId: "",
//     providerName: "",
//     providerAddress: "",
//     providerState: "",
//     providerStateId: "",
//     providerLocation: "",
//     latitude: null,
//     longitude: null,
//     mapLocation: "",
//     startDate: "",
//     endDate: "",
//     onGoing: false,
//     skills: [],
//     skillsIds: [],
//     languages: [],
//     languageIds: [],
//   });

//   const [showLocationPopup, setShowLocationPopup] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isClicked, setIsClicked] = useState(false);

//   const { listedItems, fetchItems } = useManageProfessionalsStore();
//   const { submitSupervisorPageTwo } = useSupervisorRegistrationStore();

//   // normalize category like nurse version (keeps existing logic compatible)
//   const normalizedCategory = useMemo(() => {
//     if (categoryByProfession === "REGISTERED_NURSE") return "REG_NURSES";
//     if (categoryByProfession === "ANCILLARY_PERSONAL") return "ANCILLARY";
//     return categoryByProfession;
//   }, [categoryByProfession]);

//   useEffect(() => {
//     if (normalizedCategory) {
//       fetchItems("skills", 1, 50, normalizedCategory);
//       fetchItems("working-departments", 1, 50, normalizedCategory);
//     }
//   }, [normalizedCategory, fetchItems]);

//   const skills = listedItems.skills || [];
//   const departments = listedItems["working-departments"] || [];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleSkillChange = (skillId) => {
//     setFormData((prev) => ({
//       ...prev,
//       skills: prev.skills.includes(skillId)
//         ? prev.skills.filter((id) => id !== skillId)
//         : [...prev.skills, skillId],
//     }));
//   };

//   const handleLocationUpdated = ({ latitude, longitude, mapLocation }) => {
//     setFormData((prev) => ({
//       ...prev,
//       latitude,
//       longitude,
//       mapLocation,
//       providerLocation: mapLocation,
//     }));
//   };

//   const validate = () => {
//     setErrorMessage("");
//     if (formData.skills.length === 0) {
//       setErrorMessage("Please select at least one skill.");
//       return false;
//     }

//     if (hasWorkExperience === "yes") {
//       if (!formData.startDate || (!formData.onGoing && !formData.endDate)) {
//         setErrorMessage("Please complete your experience dates.");
//         return false;
//       }
//       if (!formData.mapLocation) {
//         setErrorMessage("Please set your hospital location.");
//         return false;
//       }
//       if (!formData.department) {
//         setErrorMessage("Please select a department.");
//         return false;
//       }
//     }

//     return true;
//   };

//   const handleSubmit = async () => {
//     if (isClicked) return; // prevent double click

//     setIsClicked(true); // lock button
//     setErrorMessage("");
//     setSuccessMessage("");
//     setIsSubmitted(false);

//     if (!validate()) {
//       setIsClicked(false);
//       return;
//     }

//     const payload = {
//       categoryByProfession: categoryByProfession || "ADMIN",
//       isExperienced: hasWorkExperience === "yes",
//       skillsIds: formData.skills,
//       departmentId: hasWorkExperience === "yes" ? formData.department : undefined,
//       yearsOfExperience:
//         hasWorkExperience === "yes" ? parseInt(formData.yearsOfExperience) || 0 : undefined,
//       monthsOfExperience:
//         hasWorkExperience === "yes" ? parseInt(formData.monthsOfExperience) || 0 : undefined,
//       providerName: hasWorkExperience === "yes" ? formData.providerName : undefined,
//       providerLocation: hasWorkExperience === "yes" ? formData.providerLocation : undefined,
//       providerStateId: hasWorkExperience === "yes" ? formData.providerState : undefined,
//       latitude: hasWorkExperience === "yes" ? formData.latitude : undefined,
//       longitude: hasWorkExperience === "yes" ? formData.longitude : undefined,
//       providerAddress: hasWorkExperience === "yes" ? formData.mapLocation : undefined,
//       onGoing: hasWorkExperience === "yes" ? formData.onGoing : undefined,
//       startDate:
//         hasWorkExperience === "yes" && formData.startDate
//           ? new Date(formData.startDate).toISOString()
//           : undefined,
//       endDate:
//         hasWorkExperience === "yes"
//           ? formData.onGoing
//             ? new Date().toISOString()
//             : formData.endDate
//             ? new Date(formData.endDate).toISOString()
//             : undefined
//           : undefined,
//     };

//     try {
//       await submitSupervisorPageTwo(payload);
//       setSuccessMessage("Experience details submitted successfully.");
//       setIsSubmitted(true);
//       // keep button locked briefly to avoid accidental re-click
//       setTimeout(() => setIsClicked(false), 1500);
//       onComplete?.();
//     } catch (err) {
//       console.error("Submit error:", err);
//       setSuccessMessage("");
//       setErrorMessage("Something went wrong. Please try again.");
//       setIsClicked(false);
//     }
//   };

//   return (
//     <div className="px-[39px] pt-[15px]">
//       {/* Experience Selection */}
//       <h1 className="text-[16px] font-semibold text-black py-[18px]">
//         Do you have Work Experience?
//       </h1>
//       <div className="flex flex-col gap-[18px]">
//         <select
//           className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black text-[14px] outline-none"
//           value={hasWorkExperience}
//           onChange={(e) => setHasWorkExperience(e.target.value)}
//         >
//           <option value="" disabled>
//             Previous Work Experience
//           </option>
//           <option value="yes">Yes</option>
//           <option value="no">No</option>
//         </select>
//       </div>

//       {/* If Experienced */}
//       {hasWorkExperience === "yes" && (
//         <>
//           <h1 className="text-[16px] font-semibold text-black py-[18px]">
//             Please provide your experience details
//           </h1>

//           {/* Years / Months */}
//           <div className="flex gap-3">
//             <select
//               name="yearsOfExperience"
//               value={formData.yearsOfExperience}
//               onChange={handleChange}
//               className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none"
//             >
//               <option value="">Year</option>
//               {Array.from({ length: 31 }, (_, i) => (
//                 <option key={i} value={i}>
//                   {i} {i === 1 ? "Year" : "Years"}
//                 </option>
//               ))}
//             </select>
//             <select
//               name="monthsOfExperience"
//               value={formData.monthsOfExperience}
//               onChange={handleChange}
//               className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none"
//             >
//               <option value="">Month</option>
//               {Array.from({ length: 12 }, (_, i) => (
//                 <option key={i} value={i}>
//                   {i} {i === 1 ? "Month" : "Months"}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Hospital */}
//           <input
//             type="text"
//             name="providerName"
//             placeholder="Hospital (Last working)"
//             value={formData.providerName}
//             onChange={handleChange}
//             className="mt-4 w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none"
//           />

//           {/* Location */}
//           <div>
//             <button
//               type="button"
//               onClick={() => setShowLocationPopup(true)}
//               className="mt-4 w-[328px] min-h-[40px] border border-[#BBBBBB] rounded-[15px] px-3 text-left text-black bg-white"
//             >
//               {formData.mapLocation || "Set Hospital Location"}
//             </button>
//           </div>

//           {/* Department */}
//           <select
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//             className="mt-4 w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none"
//           >
//             <option value="">Department</option>
//             {departments.map((dept) => (
//               <option key={dept.id} value={dept.id}>
//                 {dept.workingDepartment}
//               </option>
//             ))}
//           </select>

//           {/* Duration */}
//           <div className="flex gap-3 mt-4 items-end">
//             <div>
//               <p className="mb-2">From</p>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleChange}
//                 className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none"
//               />
//             </div>
//             <div>
//               <p className="mb-2">To</p>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleChange}
//                 disabled={formData.onGoing}
//                 className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black disabled:bg-gray-200 outline-none"
//               />
//             </div>
//             <label className="flex items-center gap-2 ms-4">
//               <input
//                 type="checkbox"
//                 name="onGoing"
//                 checked={formData.onGoing}
//                 onChange={handleChange}
//                 className="size-[20px]"
//               />
//               Currently working here
//             </label>
//           </div>
//         </>
//       )}

//       {/* Skills */}
//       <h1 className="text-[16px] font-semibold text-black py-[18px]">
//         Mention your Expertise / Skills
//       </h1>
//       <div className="flex flex-wrap gap-3">
//         {skills.map((skill) => (
//           <label key={skill.id} className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={formData.skills.includes(skill.id)}
//               onChange={() => handleSkillChange(skill.id)}
//               className="size-[20px]"
//             />
//             <span>{skill.skill}</span>
//           </label>
//         ))}
//       </div>

//       {/* Submit */}
//       <button
//         onClick={handleSubmit}
//         disabled={isSubmitted || isClicked}
//         className={`mt-10 w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center ${
//           isSubmitted || isClicked ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//       >
//         {isSubmitted ? "Submitted" : "Next"}
//       </button>

//       {/* Messages */}
//       {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
//       {successMessage && <p className="text-blue-600 text-sm mt-2">{successMessage}</p>}

//       {/* Location Popup */}
//       {showLocationPopup && (
//         <LocationPickerPopup
//           currentLat={formData.latitude}
//           currentLng={formData.longitude}
//           onClose={() => setShowLocationPopup(false)}
//           onUpdated={handleLocationUpdated}
//         />
//       )}
//     </div>
//   );
// }

// export default SupervisorExperienceDetails;









// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";
// import useManageProfessionalsStore from "@/app/lib/store/useManageProfessionalsStore";
// import LocationPickerPopup from "../staffManagement/addNewStaff/LocationPickerPopup";

// function SupervisorExperienceDetails({ categoryByProfession, onComplete }) {
//   const [hasWorkExperience, setHasWorkExperience] = useState("no");
//   const [formData, setFormData] = useState({
//     yearsOfExperience: "",
//     monthsOfExperience: "",
//     department: "",
//     departmentId: "",
//     providerName: "",
//     providerAddress: "",
//     providerState: "",
//     providerStateId: "",
//     providerLocation: "",
//     latitude: null,
//     longitude: null,
//     mapLocation: "",
//     startDate: "",
//     endDate: "",
//     onGoing: false,
//     skills: [],
//     skillsIds: [],
//     languages: [],
//     languageIds: [],
//   });

//   const [showLocationPopup, setShowLocationPopup] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isClicked, setIsClicked] = useState(false);

//   const { listedItems, fetchItems } = useManageProfessionalsStore();
//   const { submitSupervisorPageTwo } = useSupervisorRegistrationStore();

//   // normalize category like your nurse component
//   const normalizedCategory = useMemo(() => {
//     if (categoryByProfession === "REGISTERED_NURSE") return "REG_NURSES";
//     if (categoryByProfession === "ANCILLARY_PERSONAL") return "ANCILLARY";
//     return categoryByProfession;
//   }, [categoryByProfession]);

//   useEffect(() => {
//     if (normalizedCategory) {
//       fetchItems("skills", 1, 50, normalizedCategory);
//       fetchItems("working-departments", 1, 50, normalizedCategory);
//     }
//   }, [normalizedCategory, fetchItems]);

//   const skills = listedItems.skills || [];
//   const departments = listedItems["working-departments"] || [];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleSkillChange = (skillId) => {
//     setFormData((p) => ({
//       ...p,
//       skills: p.skills.includes(skillId) ? p.skills.filter((id) => id !== skillId) : [...p.skills, skillId],
//     }));
//   };

//   const handleLocationUpdated = ({ latitude, longitude, mapLocation }) => {
//     setFormData((p) => ({ ...p, latitude, longitude, mapLocation, providerLocation: mapLocation }));
//   };

//   const validate = () => {
//     setErrorMessage("");
//     setSuccessMessage("");
//     if (!hasWorkExperience) {
//       setErrorMessage("Please select whether you have prior work experience.");
//       return false;
//     }
//     if (formData.skills.length === 0) {
//       setErrorMessage("Please select at least one skill.");
//       return false;
//     }
//     if (hasWorkExperience === "yes") {
//       if (!formData.startDate || (!formData.onGoing && !formData.endDate)) {
//         setErrorMessage("Please complete your experience dates.");
//         return false;
//       }
//       if (!formData.mapLocation) {
//         setErrorMessage("Please set your hospital/provider location.");
//         return false;
//       }
//       if (!formData.department) {
//         setErrorMessage("Please select a department.");
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleSubmit = async () => {
//     if (isClicked) return;
//     setErrorMessage("");
//     if (!validate()) return;
//     setIsClicked(true);

//     const payload = {
//       categoryByProfession: categoryByProfession || "ADMIN",
//       isExperienced: hasWorkExperience === "yes",
//       yearsOfExperience: hasWorkExperience === "yes" ? parseInt(formData.yearsOfExperience) || 0 : undefined,
//       monthsOfExperience: hasWorkExperience === "yes" ? parseInt(formData.monthsOfExperience) || 0 : undefined,
//       department: hasWorkExperience === "yes" ? formData.department : undefined,
//       departmentId: hasWorkExperience === "yes" ? formData.departmentId : undefined,
//       providerName: hasWorkExperience === "yes" ? formData.providerName : undefined,
//       providerAddress: hasWorkExperience === "yes" ? (formData.providerAddress || formData.mapLocation) : undefined,
//       providerState: formData.providerState || undefined,
//       providerStateId: formData.providerStateId || undefined,
//       providerLocation: hasWorkExperience === "yes" ? (formData.providerLocation || formData.mapLocation) : undefined,
//       startDate: hasWorkExperience === "yes" && formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
//       endDate:
//         hasWorkExperience === "yes"
//           ? formData.onGoing
//             ? new Date().toISOString()
//             : formData.endDate
//             ? new Date(formData.endDate).toISOString()
//             : undefined
//           : undefined,
//       onGoing: hasWorkExperience === "yes" ? formData.onGoing : undefined,
//       skills: formData.skills,
//       skillsIds: formData.skillsIds,
//       languages: formData.languages,
//       languageIds: formData.languageIds,
//       latitude: formData.latitude,
//       longitude: formData.longitude,
//     };

//     try {
//       await submitSupervisorPageTwo(payload);
//       setSuccessMessage("Experience details submitted successfully.");
//       setIsSubmitted(true);
//       onComplete?.();
//     } catch (err) {
//       console.error("Submit error:", err);
//       setErrorMessage(err.message || "Something went wrong. Please try again.");
//     } finally {
//       setIsClicked(false);
//     }
//   };

//   return (
//     <div className="pt-[15px]">
//       {/* Experience Selection */}
//       <h1 className="text-[16px] font-semibold text-black py-[18px]">
//         Do you have Work Experience?
//       </h1>
//       <div className="flex flex-col gap-[18px]">
//         <select
//           className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black text-[14px] outline-none"
//           value={hasWorkExperience}
//           onChange={(e) => setHasWorkExperience(e.target.value)}
//         >
//           <option value="" disabled>
//             Previous Work Experience
//           </option>
//           <option value="yes">Yes</option>
//           <option value="no">No</option>
//         </select>
//       </div>

//       {/* If Experienced */}
//       {hasWorkExperience === "yes" && (
//         <>
//           <h1 className="text-[16px] font-semibold text-black py-[18px]">
//             Please provide your experience details
//           </h1>

//           {/* Years / Months */}
//           <div className="flex gap-3">
//             <select
//               name="yearsOfExperience"
//               value={formData.yearsOfExperience}
//               onChange={handleChange}
//               className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none"
//             >
//               <option value="">Year</option>
//               {Array.from({ length: 31 }, (_, i) => (
//                 <option key={i} value={i}>
//                   {i} {i === 1 ? "Year" : "Years"}
//                 </option>
//               ))}
//             </select>
//             <select
//               name="monthsOfExperience"
//               value={formData.monthsOfExperience}
//               onChange={handleChange}
//               className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none"
//             >
//               <option value="">Month</option>
//               {Array.from({ length: 12 }, (_, i) => (
//                 <option key={i} value={i}>
//                   {i} {i === 1 ? "Month" : "Months"}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Hospital */}
//           <input
//             type="text"
//             name="providerName"
//             placeholder="Hospital (Last working)"
//             value={formData.providerName}
//             onChange={handleChange}
//             className="mt-4 w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none"
//           />

//           {/* Location */}
//           <div>
//             <button
//               type="button"
//               onClick={() => setShowLocationPopup(true)}
//               className="mt-4 w-[328px] min-h-[40px] border border-[#BBBBBB] rounded-[15px] px-3 text-left text-black bg-white"
//             >
//               {formData.mapLocation || "Set Hospital Location"}
//             </button>
//           </div>

//           {/* Department */}
//           <select
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//             className="mt-4 w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none"
//           >
//             <option value="">Department</option>
//             {departments.map((dept) => (
//               <option key={dept.id} value={dept.id}>
//                 {dept.workingDepartment}
//               </option>
//             ))}
//           </select>

//           {/* Duration */}
//           <div className="flex gap-3 mt-4 items-end">
//             <div>
//               <p className="mb-2">From</p>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleChange}
//                 className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none"
//               />
//             </div>
//             <div>
//               <p className="mb-2">To</p>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleChange}
//                 disabled={formData.onGoing}
//                 className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black disabled:bg-gray-200 outline-none"
//               />
//             </div>
//             <label className="flex items-center gap-2 ms-4">
//               <input
//                 type="checkbox"
//                 name="onGoing"
//                 checked={formData.onGoing}
//                 onChange={handleChange}
//                 className="size-[20px]"
//               />
//               Currently working here
//             </label>
//           </div>
//         </>
//       )}

//       {/* Skills */}
//       <h1 className="text-[16px] font-semibold text-black py-[18px]">
//         Mention your Expertise / Skills
//       </h1>
//       <div className="flex flex-wrap gap-3">
//         {skills.map((skill) => (
//           <label key={skill.id} className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={formData.skills.includes(skill.id)}
//               onChange={() => handleSkillChange(skill.id)}
//               className="size-[20px]"
//             />
//             <span>{skill.skill}</span>
//           </label>
//         ))}
//       </div>

//       {/* Submit */}
//       <button
//         onClick={handleSubmit}
//         disabled={isSubmitted || isClicked}
//         className={`mt-10 w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center ${
//           isSubmitted || isClicked ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//       >
//         {isSubmitted ? "Submitted" : "Next"}
//       </button>

//       {/* Messages */}
//       {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
//       {successMessage && <p className="text-blue-600 text-sm mt-2">{successMessage}</p>}

//       {/* Location Popup */}
//       {showLocationPopup && (
//         <LocationPickerPopup
//           currentLat={formData.latitude}
//           currentLng={formData.longitude}
//           onClose={() => setShowLocationPopup(false)}
//           onUpdated={handleLocationUpdated}
//         />
//       )}
//     </div>
//   );
// }

// export default SupervisorExperienceDetails;









// "use client";
// import React, { useState, useMemo, useEffect } from "react";
// import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";
// import useManageProfessionalsStore from "@/app/lib/store/useManageProfessionalsStore";
// import LocationPickerPopup from "../staffManagement/addNewStaff/LocationPickerPopup";

// function SupervisorExperienceDetails({ categoryByProfession, onComplete }) {
//   const [hasWorkExperience, setHasWorkExperience] = useState("no");
//   const [formData, setFormData] = useState({
//     yearsOfExperience: "",
//     monthsOfExperience: "",
//     department: "",
//     departmentId: "",
//     providerName: "",
//     providerAddress: "",
//     providerState: "",
//     providerStateId: "",
//     providerLocation: "",
//     latitude: null,
//     longitude: null,
//     mapLocation: "",
//     startDate: "",
//     endDate: "",
//     onGoing: false,
//     skills: [],
//     skillsIds: [],
//     languages: [],
//     languageIds: [],
//   });

//   const [showLocationPopup, setShowLocationPopup] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isClicked, setIsClicked] = useState(false);

//   const { listedItems, fetchItems } = useManageProfessionalsStore();
//   const { submitSupervisorPageTwo } = useSupervisorRegistrationStore();
  

//   // normalize category like your nurse component
//   const normalizedCategory = useMemo(() => {
//     if (categoryByProfession === "REGISTERED_NURSE") return "REG_NURSES";
//     if (categoryByProfession === "ANCILLARY_PERSONAL") return "ANCILLARY";
//     if (!categoryByProfession) return "";
//     return categoryByProfession;
//   }, [categoryByProfession]);

//   // If role is OTHER, do NOT fetch skills/departments and do not show them or call APIs
//   useEffect(() => {
//     if (!normalizedCategory) return;
//     if (normalizedCategory === "OTHER") return; // skip fetching for OTHER
//     // otherwise fetch normally
//     fetchItems("skills", 1, 50, normalizedCategory);
//     fetchItems("working-departments", 1, 50, normalizedCategory);
//   }, [normalizedCategory, fetchItems]);

//   const skills = listedItems.skills || [];
//   const departments = listedItems["working-departments"] || [];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleSkillChange = (skillId) => {
//     setFormData((p) => ({
//       ...p,
//       skills: p.skills.includes(skillId) ? p.skills.filter((id) => id !== skillId) : [...p.skills, skillId],
//     }));
//   };

//   const handleLocationUpdated = ({ latitude, longitude, mapLocation }) => {
//     setFormData((p) => ({ ...p, latitude, longitude, mapLocation, providerLocation: mapLocation }));
//   };

//   const validate = () => {
//     setErrorMessage("");
//     setSuccessMessage("");

//     // If role is OTHER — skip all validations (no API call will be made)
//     if (normalizedCategory === "OTHER") return true;

//     // For other roles validate required fields
//     if (!hasWorkExperience) {
//       setErrorMessage("Please select whether you have prior work experience.");
//       return false;
//     }
//     // require at least one skill only if role is not OTHER
//     if (formData.skills.length === 0) {
//       setErrorMessage("Please select at least one skill.");
//       return false;
//     }
//     if (hasWorkExperience === "yes") {
//       if (!formData.startDate || (!formData.onGoing && !formData.endDate)) {
//         setErrorMessage("Please complete your experience dates.");
//         return false;
//       }
//       if (!formData.mapLocation) {
//         setErrorMessage("Please set your hospital/provider location.");
//         return false;
//       }
//       if (!formData.department) {
//         setErrorMessage("Please select a department.");
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleSubmit = async () => {
//     if (isClicked) return;
//     setErrorMessage("");
//     if (!validate()) return;
//     setIsClicked(true);

//     // If role is OTHER, do not call any API — simply mark completed and advance
//     if (normalizedCategory === "OTHER") {
//       setSuccessMessage("Saved (no details required for this role).");
//       setIsSubmitted(true);
//       // small timeout to show success state briefly (optional)
//       setTimeout(() => {
//         onComplete?.();
//         setIsClicked(false);
//       }, 300);
//       return;
//     }

//     // Build payload for non-OTHER roles
//     const payload = {
//       categoryByProfession: categoryByProfession || "ADMIN",
//       isExperienced: hasWorkExperience === "yes",
//       yearsOfExperience: hasWorkExperience === "yes" ? parseInt(formData.yearsOfExperience) || 0 : undefined,
//       monthsOfExperience: hasWorkExperience === "yes" ? parseInt(formData.monthsOfExperience) || 0 : undefined,
//       department: hasWorkExperience === "yes" ? formData.department : undefined,
//       departmentId: hasWorkExperience === "yes" ? formData.departmentId : undefined,
//       providerName: hasWorkExperience === "yes" ? formData.providerName : undefined,
//       providerAddress: hasWorkExperience === "yes" ? (formData.providerAddress || formData.mapLocation) : undefined,
//       providerState: formData.providerState || undefined,
//       providerStateId: formData.providerStateId || undefined,
//       providerLocation: hasWorkExperience === "yes" ? (formData.providerLocation || formData.mapLocation) : undefined,
//       startDate: hasWorkExperience === "yes" && formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
//       endDate:
//         hasWorkExperience === "yes"
//           ? formData.onGoing
//             ? new Date().toISOString()
//             : formData.endDate
//             ? new Date(formData.endDate).toISOString()
//             : undefined
//           : undefined,
//       onGoing: hasWorkExperience === "yes" ? formData.onGoing : undefined,
//       skills: formData.skills,
//       skillsIds: formData.skillsIds,
//       languages: formData.languages,
//       languageIds: formData.languageIds,
//       latitude: formData.latitude,
//       longitude: formData.longitude,
//     };

//     try {
//       await submitSupervisorPageTwo(payload);
//       setSuccessMessage("Experience details submitted successfully.");
//       setIsSubmitted(true);
//       onComplete?.();
//     } catch (err) {
//       console.error("Submit error:", err);
//       setErrorMessage(err.message || "Something went wrong. Please try again.");
//     } finally {
//       setIsClicked(false);
//     }
//   };

//   return (
//     <div className="pt-[15px] px-4">
//       {/* Experience Selection */}
//       <h1 className="text-[16px] font-semibold text-black py-[18px]">
//         Do you have Work Experience?
//       </h1>
//       <div className="flex flex-col gap-[18px]">
//         <select
//           className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black text-[14px] outline-none"
//           value={hasWorkExperience}
//           onChange={(e) => setHasWorkExperience(e.target.value)}
//         >
//           <option value="" disabled>
//             Previous Work Experience
//           </option>
//           <option value="yes">Yes</option>
//           <option value="no">No</option>
//         </select>
//       </div>

//       {/* If Experienced */}
//       {hasWorkExperience === "yes" && (
//         <>
//           <h1 className="text-[16px] font-semibold text-black py-[18px]">
//             Please provide your experience details
//           </h1>

//           {/* Years / Months */}
//           <div className="flex gap-3">
//             <select
//               name="yearsOfExperience"
//               value={formData.yearsOfExperience}
//               onChange={handleChange}
//               className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none"
//             >
//               <option value="">Year</option>
//               {Array.from({ length: 31 }, (_, i) => (
//                 <option key={i} value={i}>
//                   {i} {i === 1 ? "Year" : "Years"}
//                 </option>
//               ))}
//             </select>
//             <select
//               name="monthsOfExperience"
//               value={formData.monthsOfExperience}
//               onChange={handleChange}
//               className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none"
//             >
//               <option value="">Month</option>
//               {Array.from({ length: 12 }, (_, i) => (
//                 <option key={i} value={i}>
//                   {i} {i === 1 ? "Month" : "Months"}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Hospital */}
//           <input
//             type="text"
//             name="providerName"
//             placeholder="Hospital (Last working)"
//             value={formData.providerName}
//             onChange={handleChange}
//             className="mt-4 w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none"
//           />

//           {/* Location */}
//           <div>
//             <button
//               type="button"
//               onClick={() => setShowLocationPopup(true)}
//               className="mt-4 w-[328px] min-h-[40px] border border-[#BBBBBB] rounded-[15px] px-3 text-left text-black bg-white"
//             >
//               {formData.mapLocation || "Set Hospital Location"}
//             </button>
//           </div>

//           {/* Department - hide if role is OTHER */}
//           {normalizedCategory !== "OTHER" && (
//             <select
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//               className="mt-4 w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none"
//             >
//               <option value="">Department</option>
//               {departments.map((dept) => (
//                 <option key={dept.id} value={dept.id}>
//                   {dept.workingDepartment}
//                 </option>
//               ))}
//             </select>
//           )}

//           {/* Duration */}
//           <div className="flex gap-3 mt-4 items-end">
//             <div>
//               <p className="mb-2">From</p>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleChange}
//                 className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none"
//               />
//             </div>
//             <div>
//               <p className="mb-2">To</p>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleChange}
//                 disabled={formData.onGoing}
//                 className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black disabled:bg-gray-200 outline-none"
//               />
//             </div>
//             <label className="flex items-center gap-2 ms-4">
//               <input
//                 type="checkbox"
//                 name="onGoing"
//                 checked={formData.onGoing}
//                 onChange={handleChange}
//                 className="size-[20px]"
//               />
//               Currently working here
//             </label>
//           </div>
//         </>
//       )}

//       {/* Skills - hide if role is OTHER */}
//       {normalizedCategory !== "OTHER" && (
//         <>
//           <h1 className="text-[16px] font-semibold text-black py-[18px]">
//             Mention your Expertise / Skills
//           </h1>
//           <div className="flex flex-wrap gap-3">
//             {skills.map((skill) => (
//               <label key={skill.id} className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={formData.skills.includes(skill.id)}
//                   onChange={() => handleSkillChange(skill.id)}
//                   className="size-[20px]"
//                 />
//                 <span>{skill.skill}</span>
//               </label>
//             ))}
//           </div>
//         </>
//       )}

//       {/* Submit */}
//       <button
//         onClick={handleSubmit}
//         disabled={isSubmitted || isClicked}
//         className={`mt-10 w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center ${
//           isSubmitted || isClicked ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//       >
//         {isSubmitted ? "Submitted" : "Next"}
//       </button>

//       {/* Messages */}
//       {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
//       {successMessage && <p className="text-blue-600 text-sm mt-2">{successMessage}</p>}

//       {/* Location Popup */}
//       {showLocationPopup && (
//         <LocationPickerPopup
//           currentLat={formData.latitude}
//           currentLng={formData.longitude}
//           onClose={() => setShowLocationPopup(false)}
//           onUpdated={handleLocationUpdated}
//         />
//       )}
//     </div>
//   );
// }

// export default SupervisorExperienceDetails;












// "use client";
// import React, { useState, useMemo, useEffect } from "react";
// import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";
// import useManageProfessionalsStore from "@/app/lib/store/useManageProfessionalsStore";
// import LocationPickerPopup from "../staffManagement/addNewStaff/LocationPickerPopup";
// import useLanguageStore from "@/app/lib/store/languageStore";

// function SupervisorExperienceDetails({ categoryByProfession, onComplete }) {
//   const [hasWorkExperience, setHasWorkExperience] = useState("no");
//   const [formData, setFormData] = useState({
//     yearsOfExperience: "",
//     monthsOfExperience: "",
//     department: "",
//     departmentId: "",
//     providerName: "",
//     providerAddress: "",
//     providerState: "",
//     providerStateId: "",
//     providerLocation: "",
//     latitude: null,
//     longitude: null,
//     mapLocation: "",
//     startDate: "",
//     endDate: "",
//     onGoing: false,
//     skills: [],
//     skillsIds: [],
//     languages: [],
//     languageIds: [],
//   });

//   const [showLocationPopup, setShowLocationPopup] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isClicked, setIsClicked] = useState(false);

//   // language state
//   const [preferredLanguages, setPreferredLanguages] = useState([]);
//   const [langError, setLangError] = useState(false);

//   const { listedItems, fetchItems } = useManageProfessionalsStore();
//   const { submitSupervisorPageTwo } = useSupervisorRegistrationStore();

//   const {
//     listedLanguages = [],
//     fetchLanguages,
//     isLoading: isLangLoading,
//     error: langErrorFetch,
//   } = useLanguageStore();

//   // fetch languages once
//   useEffect(() => {
//     fetchLanguages?.(1, 100);
//   }, [fetchLanguages]);

//   // normalize category like your nurse component
//   const normalizedCategory = useMemo(() => {
//     if (categoryByProfession === "REGISTERED_NURSE") return "REG_NURSES";
//     if (categoryByProfession === "ANCILLARY_PERSONAL") return "ANCILLARY";
//     if (!categoryByProfession) return "";
//     return categoryByProfession;
//   }, [categoryByProfession]);

//   // If role is OTHER, do NOT fetch skills/departments and do not show them or call APIs
//   useEffect(() => {
//     if (!normalizedCategory) return;
//     if (normalizedCategory === "OTHER") return; // skip fetching for OTHER
//     // otherwise fetch normally
//     fetchItems?.("skills", 1, 50, normalizedCategory);
//     fetchItems?.("working-departments", 1, 50, normalizedCategory);
//   }, [normalizedCategory, fetchItems]);

//   const skills = listedItems?.skills || [];
//   const departments = listedItems?.["working-departments"] || [];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleSkillChange = (skillId) => {
//     setFormData((p) => ({
//       ...p,
//       skills: p.skills.includes(skillId) ? p.skills.filter((id) => id !== skillId) : [...p.skills, skillId],
//     }));
//   };

//   const handleLocationUpdated = ({ latitude, longitude, mapLocation }) => {
//     setFormData((p) => ({ ...p, latitude, longitude, mapLocation, providerLocation: mapLocation }));
//   };

//   // helper to toggle items in an array state
//   const toggleArray = (value, arr, setArr) => {
//     if (arr.includes(value)) setArr(arr.filter((v) => v !== value));
//     else setArr([...arr, value]);
//   };

//   const validate = () => {
//     setErrorMessage("");
//     setSuccessMessage("");
//     setLangError(false);

//     // If role is OTHER — skip all validations (no API call will be made)
//     if (normalizedCategory === "OTHER") return true;

//     // For other roles validate required fields
//     if (!hasWorkExperience) {
//       setErrorMessage("Please select whether you have prior work experience.");
//       return false;
//     }

//     // require at least one skill only if role is not OTHER
//     if (formData.skills.length === 0) {
//       setErrorMessage("Please select at least one skill.");
//       return false;
//     }

//     // require at least one language
//     if (preferredLanguages.length === 0) {
//       setLangError(true);
//       setErrorMessage("Please select at least one preferred language.");
//       return false;
//     }

//     if (hasWorkExperience === "yes") {
//       if (!formData.startDate || (!formData.onGoing && !formData.endDate)) {
//         setErrorMessage("Please complete your experience dates.");
//         return false;
//       }
//       if (!formData.mapLocation) {
//         setErrorMessage("Please set your hospital/provider location.");
//         return false;
//       }
//       if (!formData.department) {
//         setErrorMessage("Please select a department.");
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleSubmit = async () => {
//     if (isClicked) return;
//     setErrorMessage("");
//     setLangError(false);
//     if (!validate()) return;
//     setIsClicked(true);

//     // If role is OTHER, do not call any API — simply mark completed and advance
//     if (normalizedCategory === "OTHER") {
//       setSuccessMessage("Saved (no details required for this role).");
//       setIsSubmitted(true);
//       setTimeout(() => {
//         onComplete?.();
//         setIsClicked(false);
//       }, 300);
//       return;
//     }

//     // Build payload for non-OTHER roles
//     const payload = {
//       categoryByProfession: categoryByProfession || "ADMIN",
//       isExperienced: hasWorkExperience === "yes",
//       yearsOfExperience: hasWorkExperience === "yes" ? parseInt(formData.yearsOfExperience) || 0 : undefined,
//       monthsOfExperience: hasWorkExperience === "yes" ? parseInt(formData.monthsOfExperience) || 0 : undefined,
//       department: hasWorkExperience === "yes" ? formData.department : undefined,
//       departmentId: hasWorkExperience === "yes" ? formData.departmentId : undefined,
//       providerName: hasWorkExperience === "yes" ? formData.providerName : undefined,
//       providerAddress: hasWorkExperience === "yes" ? (formData.providerAddress || formData.mapLocation) : undefined,
//       providerState: formData.providerState || undefined,
//       providerStateId: formData.providerStateId || undefined,
//       providerLocation: hasWorkExperience === "yes" ? (formData.providerLocation || formData.mapLocation) : undefined,
//       startDate: hasWorkExperience === "yes" && formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
//       endDate:
//         hasWorkExperience === "yes"
//           ? formData.onGoing
//             ? new Date().toISOString()
//             : formData.endDate
//             ? new Date(formData.endDate).toISOString()
//             : undefined
//           : undefined,
//       onGoing: hasWorkExperience === "yes" ? formData.onGoing : undefined,
//       skills: formData.skills,
//       skillsIds: formData.skillsIds,
//       languages: preferredLanguages.map((id) => {
//         // map to language objects if you want names too; backend may expect ids
//         const langObj = listedLanguages.find((l) => l.id === id);
//         return langObj ? langObj.language : id;
//       }),
//       languageIds: preferredLanguages,
//       latitude: formData.latitude,
//       longitude: formData.longitude,
//     };

//     try {
//       await submitSupervisorPageTwo(payload);
//       setSuccessMessage("Experience details submitted successfully.");
//       setIsSubmitted(true);
//       onComplete?.();
//     } catch (err) {
//       console.error("Submit error:", err);
//       setErrorMessage(err.message || "Something went wrong. Please try again.");
//     } finally {
//       setIsClicked(false);
//     }
//   };

//   return (
//     <div className="pt-[15px] px-4">
//       {/* Experience Selection */}
//       <h1 className="text-[16px] font-semibold text-black py-[18px]">
//         Do you have Work Experience?
//       </h1>
//       <div className="flex flex-col gap-[18px]">
//         <select
//           className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black text-[14px] outline-none"
//           value={hasWorkExperience}
//           onChange={(e) => setHasWorkExperience(e.target.value)}
//         >
//           <option value="" disabled>
//             Previous Work Experience
//           </option>
//           <option value="yes">Yes</option>
//           <option value="no">No</option>
//         </select>
//       </div>

//       {/* If Experienced */}
//       {hasWorkExperience === "yes" && (
//         <>
//           <h1 className="text-[16px] font-semibold text-black py-[18px]">
//             Please provide your experience details
//           </h1>

//           {/* Years / Months */}
//           <div className="flex gap-3">
//             <select
//               name="yearsOfExperience"
//               value={formData.yearsOfExperience}
//               onChange={handleChange}
//               className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none"
//             >
//               <option value="">Year</option>
//               {Array.from({ length: 31 }, (_, i) => (
//                 <option key={i} value={i}>
//                   {i} {i === 1 ? "Year" : "Years"}
//                 </option>
//               ))}
//             </select>
//             <select
//               name="monthsOfExperience"
//               value={formData.monthsOfExperience}
//               onChange={handleChange}
//               className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none"
//             >
//               <option value="">Month</option>
//               {Array.from({ length: 12 }, (_, i) => (
//                 <option key={i} value={i}>
//                   {i} {i === 1 ? "Month" : "Months"}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Hospital */}
//           <input
//             type="text"
//             name="providerName"
//             placeholder="Hospital (Last working)"
//             value={formData.providerName}
//             onChange={handleChange}
//             className="mt-4 w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none"
//           />

//           {/* Location */}
//           <div>
//             <button
//               type="button"
//               onClick={() => setShowLocationPopup(true)}
//               className="mt-4 w-[328px] min-h-[40px] border border-[#BBBBBB] rounded-[15px] px-3 text-left text-black bg-white"
//             >
//               {formData.mapLocation || "Set Hospital Location"}
//             </button>
//           </div>

//           {/* Department - hide if role is OTHER */}
//           {normalizedCategory !== "OTHER" && (
//             <select
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//               className="mt-4 w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none"
//             >
//               <option value="">Department</option>
//               {departments.map((dept) => (
//                 <option key={dept.id} value={dept.id}>
//                   {dept.workingDepartment}
//                 </option>
//               ))}
//             </select>
//           )}

//           {/* Duration */}
//           <div className="flex gap-3 mt-4 items-end">
//             <div>
//               <p className="mb-2">From</p>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleChange}
//                 className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none"
//               />
//             </div>
//             <div>
//               <p className="mb-2">To</p>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleChange}
//                 disabled={formData.onGoing}
//                 className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black disabled:bg-gray-200 outline-none"
//               />
//             </div>
//             <label className="flex items-center gap-2 ms-4">
//               <input
//                 type="checkbox"
//                 name="onGoing"
//                 checked={formData.onGoing}
//                 onChange={handleChange}
//                 className="size-[20px]"
//               />
//               Currently working here
//             </label>
//           </div>
//         </>
//       )}

//       {/* Skills - hide if role is OTHER */}
//       {normalizedCategory !== "OTHER" && (
//         <>
//           <h1 className="text-[16px] font-semibold text-black py-[18px]">
//             Mention your Expertise / Skills
//           </h1>
//           <div className="flex flex-wrap gap-3">
//             {skills.map((skill) => (
//               <label key={skill.id} className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={formData.skills.includes(skill.id)}
//                   onChange={() => handleSkillChange(skill.id)}
//                   className="size-[20px]"
//                 />
//                 <span>{skill.skill}</span>
//               </label>
//             ))}
//           </div>
//         </>
//       )}

//       {/* Languages (always shown) */}
//       <h1 className="text-[16px] font-semibold text-black py-[18px]">
//         Preferred Languages
//       </h1>

//       <div className="grid grid-cols-2 gap-2 mb-4">
//         {isLangLoading && <p>Loading languages...</p>}
//         {langErrorFetch && !isLangLoading && (
//           <p className="text-red-500">Failed to load languages.</p>
//         )}
//         {!isLangLoading &&
//           !langErrorFetch &&
//           listedLanguages.map((lang) => (
//             <label key={lang.id} className="inline-flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={preferredLanguages.includes(lang.id)}
//                 onChange={() => {
//                   toggleArray(lang.id, preferredLanguages, setPreferredLanguages);
//                   if (preferredLanguages.length > 0) setLangError(false);
//                 }}
//               />
//               <span>{lang.language}</span>
//             </label>
//           ))}
//       </div>

//       {langError && (
//         <span className="text-red-500 text-sm mb-2">
//           Please select at least one preferred language.
//         </span>
//       )}

//       {/* Submit */}
//       <button
//         onClick={handleSubmit}
//         disabled={isSubmitted || isClicked}
//         className={`mt-10 w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center ${
//           isSubmitted || isClicked ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//       >
//         {isSubmitted ? "Submitted" : "Next"}
//       </button>

//       {/* Messages */}
//       {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
//       {successMessage && <p className="text-blue-600 text-sm mt-2">{successMessage}</p>}

//       {/* Location Popup */}
//       {showLocationPopup && (
//         <LocationPickerPopup
//           currentLat={formData.latitude}
//           currentLng={formData.longitude}
//           onClose={() => setShowLocationPopup(false)}
//           onUpdated={handleLocationUpdated}
//         />
//       )}
//     </div>
//   );
// }

// export default SupervisorExperienceDetails;





"use client";
import React, { useState, useMemo, useEffect } from "react";
import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";
import useManageProfessionalsStore from "@/app/lib/store/useManageProfessionalsStore";
import useLanguageStore from "@/app/lib/store/languageStore";
import LocationPickerPopup from "@/components/staffManagement/addNewStaff/LocationPickerPopup"; // adjust path

function SupervisorExperienceDetails({ categoryByProfession, onComplete }) {
  const [hasWorkExperience, setHasWorkExperience] = useState("no");
  const [formData, setFormData] = useState({
    yearsOfExperience: "",
    monthsOfExperience: "",
    department: "",
    departmentId: "",
    providerName: "",
    providerAddress: "",
    providerState: "",
    providerStateId: "",
    providerLocation: "",
    latitude: null,
    longitude: null,
    mapLocation: "",
    startDate: "",
    endDate: "",
    onGoing: false,
    skills: [],
    skillsIds: [],
    languages: [],
    languageIds: [],
  });

  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const { listedItems, fetchItems } = useManageProfessionalsStore();
  const { submitSupervisorPageTwo } = useSupervisorRegistrationStore();

  const { listedLanguages = [], fetchLanguages, isLoading: isLangLoading, error: langErrorFetch } =
    useLanguageStore();

  // load languages once
  useEffect(() => {
    fetchLanguages?.(1, 100);
  }, [fetchLanguages]);

  // normalize category like your nurse component
  const normalizedCategory = useMemo(() => {
    if (categoryByProfession === "REGISTERED_NURSE") return "REG_NURSES";
    if (categoryByProfession === "ANCILLARY_PERSONAL") return "ANCILLARY";
    if (!categoryByProfession) return "";
    return categoryByProfession;
  }, [categoryByProfession]);

  // Only fetch skills/departments when role != OTHER
  useEffect(() => {
    if (!normalizedCategory) return;
    if (normalizedCategory === "OTHER") return;
    fetchItems("skills", 1, 50, normalizedCategory);
    fetchItems("working-departments", 1, 50, normalizedCategory);
  }, [normalizedCategory, fetchItems]);

  const skills = listedItems.skills || [];
  const departments = listedItems["working-departments"] || [];

  const [preferredLanguages, setPreferredLanguages] = useState([]);

  useEffect(() => {
    // If user has preselected languageIds in formData (rare), sync to preferredLanguages.
    if (formData.languageIds && formData.languageIds.length) {
      setPreferredLanguages(formData.languageIds);
    }
  }, []); // run once

  const toggleArray = (item, arr, setArr) => {
    if (arr.includes(item)) setArr(arr.filter((i) => i !== item));
    else setArr([...arr, item]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSkillChange = (skillId) => {
    setFormData((p) => ({
      ...p,
      skills: p.skills.includes(skillId) ? p.skills.filter((id) => id !== skillId) : [...p.skills, skillId],
    }));
  };

  const handleLocationUpdated = ({ latitude, longitude, mapLocation }) => {
    setFormData((p) => ({ ...p, latitude, longitude, mapLocation, providerLocation: mapLocation }));
  };

  const validate = () => {
    setErrorMessage("");
    setSuccessMessage("");

    // If role is OTHER — skip all validations (no API call will be made)
    if (normalizedCategory === "OTHER") return true;

    // For other roles validate required fields
    if (!hasWorkExperience) {
      setErrorMessage("Please select whether you have prior work experience.");
      return false;
    }

    if (preferredLanguages.length === 0) {
      setErrorMessage("Please select at least one preferred language.");
      return false;
    }

    // require at least one skill only if role is not OTHER
    if (formData.skills.length === 0) {
      setErrorMessage("Please select at least one skill.");
      return false;
    }

    if (hasWorkExperience === "yes") {
      if (!formData.startDate || (!formData.onGoing && !formData.endDate)) {
        setErrorMessage("Please complete your experience dates.");
        return false;
      }
      if (!formData.mapLocation) {
        setErrorMessage("Please set your hospital/provider location.");
        return false;
      }
      if (!formData.department) {
        setErrorMessage("Please select a department.");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (isClicked) return;
    setErrorMessage("");
    if (!validate()) return;
    setIsClicked(true);

    // If role is OTHER, do not call any API — simply mark completed and advance
    if (normalizedCategory === "OTHER") {
      setSuccessMessage("Saved — no details required for this role.");
      setIsSubmitted(true);
      setTimeout(() => {
        onComplete?.();
        setIsClicked(false);
      }, 250);
      return;
    }

    const payload = {
      categoryByProfession: categoryByProfession || "ADMIN",
      isExperienced: hasWorkExperience === "yes",
      yearsOfExperience: hasWorkExperience === "yes" ? parseInt(formData.yearsOfExperience) || 0 : undefined,
      monthsOfExperience: hasWorkExperience === "yes" ? parseInt(formData.monthsOfExperience) || 0 : undefined,
      // department: hasWorkExperience === "yes" ? formData.department : undefined,
      departmentId: hasWorkExperience === "yes" ? formData.department : undefined,
      providerName: hasWorkExperience === "yes" ? formData.providerName : undefined,
      providerAddress: hasWorkExperience === "yes" ? (formData.providerAddress || formData.mapLocation) : undefined,
      providerState: formData.providerState || undefined,
      providerStateId: formData.providerStateId || undefined,
      providerLocation: hasWorkExperience === "yes" ? (formData.providerLocation || formData.mapLocation) : undefined,
      startDate: hasWorkExperience === "yes" && formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
      endDate:
        hasWorkExperience === "yes"
          ? formData.onGoing
            ? new Date().toISOString()
            : formData.endDate
            ? new Date(formData.endDate).toISOString()
            : undefined
          : undefined,
      onGoing: hasWorkExperience === "yes" ? formData.onGoing : undefined,
      skills: formData.skills,
      skillsIds: formData.skills,
      languages: listedLanguages.filter((l) => preferredLanguages.includes(l.id)).map((l) => l.language),
      languageIds: preferredLanguages,
      latitude: formData.latitude,
      longitude: formData.longitude,
    };

    try {
      await submitSupervisorPageTwo(payload);
      setSuccessMessage("Experience details submitted successfully.");
      setIsSubmitted(true);
      onComplete?.();
    } catch (err) {
      console.error("Submit error:", err);
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsClicked(false);
    }
  };

  return (
    <div className="pt-[15px] px-4">
      <h1 className="text-[16px] font-semibold text-black py-[18px]">Do you have Work Experience?</h1>
      <div className="flex flex-col gap-[18px]">
        <select
          className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black text-[14px] outline-none"
          value={hasWorkExperience}
          onChange={(e) => setHasWorkExperience(e.target.value)}
        >
          <option value="" disabled>Previous Work Experience</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      {hasWorkExperience === "yes" && (
        <>
          <h1 className="text-[16px] font-semibold text-black py-[18px]">Please provide your experience details</h1>

          <div className="flex gap-3">
            <select name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none">
              <option value="">Year</option>
              {Array.from({ length: 31 }, (_, i) => (<option key={i} value={i}>{i} {i === 1 ? "Year" : "Years"}</option>))}
            </select>
            <select name="monthsOfExperience" value={formData.monthsOfExperience} onChange={handleChange} className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none">
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, i) => (<option key={i} value={i}>{i} {i === 1 ? "Month" : "Months"}</option>))}
            </select>
          </div>

          <input type="text" name="providerName" placeholder="Hospital (Last working)" value={formData.providerName} onChange={handleChange} className="mt-4 w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none" />

          <div>
            <button type="button" onClick={() => setShowLocationPopup(true)} className="mt-4 w-[328px] min-h-[40px] border border-[#BBBBBB] rounded-[15px] px-3 text-left text-black bg-white">
              {formData.mapLocation || "Set Hospital Location"}
            </button>
          </div>

          {/* Department - hide if role is OTHER */}
          {normalizedCategory !== "OTHER" && (
            <select name="department" value={formData.department} onChange={handleChange} className="mt-4 w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none">
              <option value="">Department</option>
              {departments.map((dept) => (<option key={dept.id} value={dept.id}>{dept.workingDepartment}</option>))}
            </select>
          )}

          <div className="flex gap-3 mt-4 items-end">
            <div>
              <p className="mb-2">From</p>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none" />
            </div>
            <div>
              <p className="mb-2">To</p>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} disabled={formData.onGoing} className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black disabled:bg-gray-200 outline-none" />
            </div>
            <label className="flex items-center gap-2 ms-4">
              <input type="checkbox" name="onGoing" checked={formData.onGoing} onChange={handleChange} className="size-[20px]" />
              Currently working here
            </label>
          </div>
        </>
      )}

      {/* Skills - hide if role is OTHER */}
      {normalizedCategory !== "OTHER" && (
        <>
          <h1 className="text-[16px] font-semibold text-black py-[18px]">Mention your Expertise / Skills</h1>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <label key={skill.id} className="flex items-center gap-2">
                <input type="checkbox" checked={formData.skills.includes(skill.id)} onChange={() => handleSkillChange(skill.id)} className="size-[20px]" />
                <span>{skill.skill}</span>
              </label>
            ))}
          </div>
        </>
      )}

      {/* Languages (always show) */}
      <h1 className="text-[16px] font-semibold text-black py-[18px]">Preferred Languages</h1>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {isLangLoading && <p>Loading languages...</p>}
        {langErrorFetch && !isLangLoading && <p className="text-red-500">Failed to load languages.</p>}
        {!isLangLoading && !langErrorFetch && listedLanguages.map((lang) => (
          <label key={lang.id} className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={preferredLanguages.includes(lang.id)}
              onChange={() => toggleArray(lang.id, preferredLanguages, setPreferredLanguages)}
              className="size-5"
            />
            {lang.language}
          </label>
        ))}
      </div>

      {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
      {successMessage && <p className="text-blue-600 text-sm mt-2">{successMessage}</p>}

      <button onClick={handleSubmit} disabled={isSubmitted || isClicked} className={`mt-10 w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center ${isSubmitted || isClicked ? "opacity-50 cursor-not-allowed" : ""}`}>
        {isSubmitted ? "Submitted" : "Next"}
      </button>

      {showLocationPopup && (
        <LocationPickerPopup currentLat={formData.latitude} currentLng={formData.longitude} onClose={() => setShowLocationPopup(false)} onUpdated={handleLocationUpdated} />
      )}
    </div>
  );
}

export default SupervisorExperienceDetails;
