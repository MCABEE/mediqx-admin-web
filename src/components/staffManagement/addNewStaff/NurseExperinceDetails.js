// // "use client";
// // import React, { useState } from "react";
// // import useNurseRegistrationStore from "@/app/lib/store/nurseRegistrationStore";
// // function NurseExperienceDetails() {
// //   const [selectedState, setSelectedState] = useState("");
// //   const [districts, setDistricts] = useState([]);
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [successMessage, setSuccessMessage] = useState("");
// //   const [isSubmitted, setIsSubmitted] = useState(false);
// //   const [hasWorkExperience, setHasWorkExperience] = useState("no");

// //   const [formData, setFormData] = useState({
// //     id: "",
// //     yearsOfExperience: "",
// //     monthsOfExperience: "",
// //     department: "",
// //     startDate: "",
// //     endDate: "",
// //     onGoing: false,
// //     providerName: "",
// //     providerLocation: "",
// //     providerState: "",
// //     skills: [],
// //   });

// //   const { submitNursePageTwo } = useNurseRegistrationStore();

// //   const districtMap = {
// //     Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode"],
// //     Karnataka: ["Bengaluru", "Mysuru", "Mangaluru"],
// //   };

// //   const nursingSkills = [
// //     "Vital signs monitoring",
// //     "Medication administration",
// //     "Patient hygiene & grooming",
// //     "Wound dressing & basic procedures",
// //     "Injections (IM, IV, SC)",
// //     "Catheterization",
// //     "IV cannulation & fluid management",
// //     "Feeding (oral, NG tube, PEG)",
// //     "Positioning & mobility support",
// //     "Emergency response (CPR, BLS)",
// //     "Bed making (sterile/occupied)",
// //     "Post-operative care",
// //     "Infection control practices",
// //     "Oxygen therapy management",
// //     "Record keeping & nursing documentation",
// //     "Assist in minor procedures",
// //     "Baby care / Mother care (Obstetric)",
// //     "Elderly care",
// //     "Communication skills",
// //     "Empathy and patience",
// //     "Time management",
// //     "Teamwork and collaboration",
// //     "Documentation accuracy",
// //     "Adaptability and problem-solving",
// //     "Cultural sensitivity",
// //     "Physical stamina and alertness",
// //     "Professional ethics and confidentiality",
// //     "Punctuality and responsibility",
// //     "Basic Life Support (BLS)",
// //     "Advanced Cardiac Life Support (ACLS)",
// //     "Infection Control Training",
// //     "Home Nursing Training",
// //     "First Aid Certification",
// //   ];

// //   const departments = [
// //     "General Medicine",
// //     "ICU / Critical Care",
// //     "Emergency Department",
// //     "Pediatrics",
// //     "Orthopedics",
// //     "Cardiology",
// //     "Neurology",
// //     "Oncology",
// //     "Surgical Wards",
// //     "Gynecology & Obstetrics",
// //     "Neonatal ICU (NICU)",
// //     "Dialysis Unit",
// //     "Operation Theatre (OT)",
// //     "Anesthesia Unit",
// //     "Psychiatry",
// //     "ENT",
// //     "Dermatology",
// //     "Radiology",
// //     "Gastroenterology",
// //     "Infection Control",
// //   ];

// //   const midIndex = Math.ceil(nursingSkills.length / 2);
// //   const firstColumn = nursingSkills.slice(0, midIndex);
// //   const secondColumn = nursingSkills.slice(midIndex);

// //   const handleStateChange = (e) => {
// //     const state = e.target.value;
// //     setSelectedState(state);
// //     setDistricts(districtMap[state] || []);
// //     setFormData({ ...formData, providerState: state });
// //   };

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: type === "checkbox" ? checked : value,
// //     });
// //   };

// //   const handleSkillChange = (skill) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       skills: prev.skills.includes(skill)
// //         ? prev.skills.filter((s) => s !== skill)
// //         : [...prev.skills, skill],
// //     }));
// //   };

// //   const handleSubmit = async () => {
// //     setErrorMessage("");
// //     setSuccessMessage("");
// //     setIsSubmitted(false);

// //     if (formData.skills.length === 0) {
// //       setErrorMessage("Please select at least one skill.");
// //       return;
// //     }

// //     if (hasWorkExperience === "yes") {
// //       if (!formData.startDate || (!formData.onGoing && !formData.endDate)) {
// //         setErrorMessage("Please complete your experience dates.");
// //         return;
// //       }
// //     }

// //     const formatToDateTime = (dateStr) => new Date(dateStr).toISOString();

// //     const payload = {
// //       isExperienced: hasWorkExperience === "yes",
// //       skills: formData.skills,
// //     };

// //     if (hasWorkExperience === "yes") {
// //       payload.yearsOfExperience = parseInt(formData.yearsOfExperience) || 0;
// //       payload.monthsOfExperience = parseInt(formData.monthsOfExperience) || 0;
// //       payload.department = formData.department;
// //       payload.providerName = formData.providerName;
// //       payload.providerLocation = formData.providerLocation;
// //       payload.providerState = formData.providerState;
// //       payload.onGoing = formData.onGoing;

// //       if (formData.startDate) {
// //         payload.startDate = new Date(formData.startDate).toISOString();
// //       }

// //       if (formData.onGoing) {
// //         payload.endDate = new Date().toISOString();
// //       } else if (formData.endDate) {
// //         payload.endDate = new Date(formData.endDate).toISOString();
// //       }
// //     }

// //     try {
// //       await submitNursePageTwo(payload);
// //       setSuccessMessage("Experience details submitted successfully.");
// //       setIsSubmitted(true);
// //     } catch (err) {
// //       setErrorMessage("Something went wrong. Please try again.");
// //     }
// //   };

// //   return (
// //     <div className="px-[39px] pt-[15px]">
// //       <h1 className="text-[16px] font-semibold text-black py-[18px]">
// //         Do you have Work Experience?
// //       </h1>
// //       <div className="flex flex-col text-[16px]  text-black font-light gap-[18px] ">
// //         <select
// //           className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] px-2  outline-none placeholder:text-black"
// //           value={hasWorkExperience}
// //           onChange={(e) => setHasWorkExperience(e.target.value)}
// //         >
// //           <option value="" disabled>
// //             Previous Work Experience
// //           </option>
// //           <option value="yes">Yes</option>
// //           <option value="no">No</option>
// //         </select>
// //       </div>
// //       {hasWorkExperience === "yes" && (
// //         <>
// //           <h1 className="text-[16px] font-semibold text-black py-[18px]">
// //             Please provide your experience details
// //           </h1>
// //           <div className="flex flex-col gap-5">
// //             <h1 className="text-[16px] font-semibold text-black py-[18px]">
// //               Total Experience in Y/M
// //             </h1>
// //             <div className="flex gap-3">
// //               <select
// //                 name="yearsOfExperience"
// //                 className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2  outline-none placeholder:text-black"
// //                 value={formData.yearsOfExperience}
// //                 onChange={handleChange}
// //               >
// //                 <option value="" disabled>
// //                   Year
// //                 </option>
// //                 {Array.from({ length: 31 }, (_, i) => (
// //                   <option key={i} value={i}>
// //                     {i} {i === 1 ? "Year" : "Years"}
// //                   </option>
// //                 ))}
// //               </select>

// //               <select
// //                 name="monthsOfExperience"
// //                 className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2  outline-none placeholder:text-black"
// //                 value={formData.monthsOfExperience}
// //                 onChange={handleChange}
// //               >
// //                 <option value="" disabled>
// //                   Months
// //                 </option>
// //                 {Array.from({ length: 12 }, (_, i) => (
// //                   <option key={i} value={i}>
// //                     {i} {i === 1 ? "Month" : "Months"}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             <input
// //               type="text"
// //               name="providerName"
// //               placeholder="Hospital (Last working)"
// //               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2  outline-none placeholder:text-black"
// //               value={formData.providerName}
// //               onChange={handleChange}
// //             />

// //             <select
// //               name="providerState"
// //               value={selectedState}
// //               onChange={handleStateChange}
// //               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2  outline-none placeholder:text-black"
// //             >
// //               <option value="" disabled>
// //                 State
// //               </option>
// //               <option value="Kerala">Kerala</option>
// //               <option value="Karnataka">Karnataka</option>
// //               <option value="Maharastra">Maharastra</option>
// //               <option value="Tamil Nadu">Tamil Nadu</option>
// //               <option value="Delhi">Delhi</option>
// //               <option value="Other">Other</option>
// //             </select>

// //             <input
// //               type="text"
// //               name="providerLocation"
// //               placeholder="Area"
// //               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2  outline-none placeholder:text-black"
// //               value={formData.providerLocation}
// //               onChange={handleChange}
// //             />

// //             <select
// //               name="department"
// //               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2  outline-none placeholder:text-black"
// //               value={formData.department}
// //               onChange={handleChange}
// //             >
// //               <option value="" disabled>
// //                 Department
// //               </option>
// //               {departments.map((dept) => (
// //                 <option key={dept} value={dept}>
// //                   {dept}
// //                 </option>
// //               ))}
// //             </select>

// //             <h1 className="text-[16px] font-semibold text-black pt-[18px]">
// //               Working Duration{" "}
// //               <span className="font-light">(On this Hospital)</span>
// //             </h1>

// //             <div className="flex gap-3">
// //               <div>
// //                 <p className="mb-2">From</p>
// //                 <input
// //                   type="date"
// //                   name="startDate"
// //                   value={formData.startDate}
// //                   onChange={handleChange}
// //                   className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2  outline-none placeholder:text-black"
// //                 />
// //               </div>
// //               <div>
// //                 <p className="mb-2">To</p>
// //                 <input
// //                   type="date"
// //                   name="endDate"
// //                   value={formData.endDate}
// //                   onChange={handleChange}
// //                   className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2  outline-none placeholder:text-black"
// //                 />
// //               </div>
// //               <div className="text-[16px] text-black font-light flex justify-center items-center gap-2 ms-10 mt-8">
// //                 <input
// //                   type="checkbox"
// //                   name="onGoing"
// //                   checked={formData.onGoing}
// //                   onChange={handleChange}
// //                   className="size-[20px]"
// //                 />
// //                 Currently am working here
// //               </div>
// //             </div>
// //           </div>
// //         </>
// //       )}

// //       <h1 className="text-[16px] font-semibold text-black py-[18px]">
// //         Mention your Expertise / Skills
// //       </h1>

// //       <div className="flex gap-10">
// //         {[firstColumn, secondColumn].map((column, colIndex) => (
// //           <div
// //             key={colIndex}
// //             className="flex flex-col text-[16px] text-black font-light gap-[18px]"
// //           >
// //             {column.map((skill, index) => (
// //               <label key={index} className="flex gap-[5px] items-center">
// //                 <input
// //                   type="checkbox"
// //                   className="size-[20px]"
// //                   checked={formData.skills.includes(skill)}
// //                   onChange={() => handleSkillChange(skill)}
// //                 />
// //                 <span className="text-[16px]">{skill}</span>
// //               </label>
// //             ))}
// //           </div>
// //         ))}
// //       </div>

// //       <button
// //         onClick={handleSubmit}
// //         disabled={isSubmitted}
// //         className={`mt-10 w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center opacity-100 cursor-pointer ${
// //           isSubmitted
// //             ? "disabled:opacity-50 cursor-not-allowed"
// //             : "bg-[#3674B5] text-white"
// //         }`}
// //       >
// //         {isSubmitted ? "Submitted" : "Next"}
// //       </button>

// //       {errorMessage && (
// //         <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
// //       )}
// //       {successMessage && (
// //         <p className="text-blue-600 text-sm mt-2">{successMessage}</p>
// //       )}
// //     </div>
// //   );
// // }

// // export default NurseExperienceDetails;

// // "use client";
// // import React, { useState, useEffect } from "react";
// // import useNurseRegistrationStore from "@/app/lib/store/nurseRegistrationStore";
// // import useManageProfessionalsStore from "@/app/lib/store/useManageProfessionalsStore";

// // function NurseExperienceDetails({ categoryByProfession }) {
// //   // UI states
// //   const [selectedState, setSelectedState] = useState("");
// //   const [districts, setDistricts] = useState([]);
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [successMessage, setSuccessMessage] = useState("");
// //   const [isSubmitted, setIsSubmitted] = useState(false);
// //   const [hasWorkExperience, setHasWorkExperience] = useState("no");

// //   // Store for skills & departments
// //   const { listedItems, fetchItems } = useManageProfessionalsStore();

// //   // Fetch skills and departments dynamically based on category
// //   useEffect(() => {
// //     if (categoryByProfession) {
// //       fetchItems("skills", 1, 50, categoryByProfession);
// //       fetchItems("working-departments", 1, 50, categoryByProfession);
// //     }
// //   }, [categoryByProfession, fetchItems]);

// //   // Store values; fallback to empty array if not loaded
// //   const skills = listedItems.skills || [];
// //   const departments = listedItems["working-departments"] || [];

// //   // Experience form state
// //   const [formData, setFormData] = useState({
// //     id: "",
// //     yearsOfExperience: "",
// //     monthsOfExperience: "",
// //     department: "",
// //     startDate: "",
// //     endDate: "",
// //     onGoing: false,
// //     providerName: "",
// //     providerLocation: "",
// //     providerState: "",
// //     skills: [],
// //   });

// //   const { submitNursePageTwo } = useNurseRegistrationStore();

// //   // Hardcoded district options per state
// //   const districtMap = {
// //     Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode"],
// //     Karnataka: ["Bengaluru", "Mysuru", "Mangaluru"],
// //   };

// //   // Handlers
// //   const handleStateChange = (e) => {
// //     const state = e.target.value;
// //     setSelectedState(state);
// //     setDistricts(districtMap[state] || []);
// //     setFormData((prev) => ({ ...prev, providerState: state }));
// //   };

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: type === "checkbox" ? checked : value,
// //     }));
// //   };

// //   const handleSkillChange = (skill) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       skills: prev.skills.includes(skill)
// //         ? prev.skills.filter((s) => s !== skill)
// //         : [...prev.skills, skill],
// //     }));
// //   };

// //   const handleSubmit = async () => {
// //     setErrorMessage("");
// //     setSuccessMessage("");
// //     setIsSubmitted(false);

// //     if (formData.skills.length === 0) {
// //       setErrorMessage("Please select at least one skill.");
// //       return;
// //     }

// //     if (hasWorkExperience === "yes") {
// //       if (!formData.startDate || (!formData.onGoing && !formData.endDate)) {
// //         setErrorMessage("Please complete your experience dates.");
// //         return;
// //       }
// //     }

// //     const payload = {
// //       isExperienced: hasWorkExperience === "yes",
// //       skills: formData.skills,
// //       department: formData.department,
// //       // Only include experience fields if experienced
// //       yearsOfExperience: hasWorkExperience === "yes" ? parseInt(formData.yearsOfExperience) || 0 : undefined,
// //       monthsOfExperience: hasWorkExperience === "yes" ? parseInt(formData.monthsOfExperience) || 0 : undefined,
// //       providerName: hasWorkExperience === "yes" ? formData.providerName : undefined,
// //       providerLocation: hasWorkExperience === "yes" ? formData.providerLocation : undefined,
// //       providerState: hasWorkExperience === "yes" ? formData.providerState : undefined,
// //       onGoing: hasWorkExperience === "yes" ? formData.onGoing : undefined,
// //       startDate: hasWorkExperience === "yes" && formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
// //       endDate:
// //         hasWorkExperience === "yes"
// //           ? formData.onGoing
// //             ? new Date().toISOString()
// //             : formData.endDate
// //             ? new Date(formData.endDate).toISOString()
// //             : undefined
// //           : undefined,
// //     };

// //     try {
// //       await submitNursePageTwo(payload);
// //       setSuccessMessage("Experience details submitted successfully.");
// //       setIsSubmitted(true);
// //     } catch (err) {
// //       setErrorMessage("Something went wrong. Please try again.");
// //     }
// //   };

// //   return (
// //     <div className="px-[39px] pt-[15px]">
// //       <h1 className="text-[16px] font-semibold text-black py-[18px]">
// //         Do you have Work Experience?
// //       </h1>
// //       <div className="flex flex-col text-[16px] text-black font-light gap-[18px]">
// //         <select
// //           className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
// //           value={hasWorkExperience}
// //           onChange={(e) => setHasWorkExperience(e.target.value)}
// //         >
// //           <option value="" disabled>
// //             Previous Work Experience
// //           </option>
// //           <option value="yes">Yes</option>
// //           <option value="no">No</option>
// //         </select>
// //       </div>
// //       {hasWorkExperience === "yes" && (
// //         <>
// //           <h1 className="text-[16px] font-semibold text-black py-[18px]">
// //             Please provide your experience details
// //           </h1>
// //           <div className="flex flex-col gap-5">
// //             <h1 className="text-[16px] font-semibold text-black py-[18px]">
// //               Total Experience in Y/M
// //             </h1>
// //             <div className="flex gap-3">
// //               <select
// //                 name="yearsOfExperience"
// //                 className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
// //                 value={formData.yearsOfExperience}
// //                 onChange={handleChange}
// //               >
// //                 <option value="" disabled>
// //                   Year
// //                 </option>
// //                 {Array.from({ length: 31 }, (_, i) => (
// //                   <option key={i} value={i}>
// //                     {i} {i === 1 ? "Year" : "Years"}
// //                   </option>
// //                 ))}
// //               </select>

// //               <select
// //                 name="monthsOfExperience"
// //                 className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
// //                 value={formData.monthsOfExperience}
// //                 onChange={handleChange}
// //               >
// //                 <option value="" disabled>
// //                   Months
// //                 </option>
// //                 {Array.from({ length: 12 }, (_, i) => (
// //                   <option key={i} value={i}>
// //                     {i} {i === 1 ? "Month" : "Months"}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             <input
// //               type="text"
// //               name="providerName"
// //               placeholder="Hospital (Last working)"
// //               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
// //               value={formData.providerName}
// //               onChange={handleChange}
// //             />

// //             <select
// //               name="providerState"
// //               value={selectedState}
// //               onChange={handleStateChange}
// //               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
// //             >
// //               <option value="" disabled>
// //                 State
// //               </option>
// //               <option value="Kerala">Kerala</option>
// //               <option value="Karnataka">Karnataka</option>
// //               <option value="Maharastra">Maharastra</option>
// //               <option value="Tamil Nadu">Tamil Nadu</option>
// //               <option value="Delhi">Delhi</option>
// //               <option value="Other">Other</option>
// //             </select>

// //             <input
// //               type="text"
// //               name="providerLocation"
// //               placeholder="Area"
// //               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
// //               value={formData.providerLocation}
// //               onChange={handleChange}
// //             />

// //             {/* Departments Dropdown */}
// //             <select
// //               name="department"
// //               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
// //               value={formData.department}
// //               onChange={handleChange}
// //             >
// //               <option value="" disabled>
// //                 Department
// //               </option>
// //               {departments.map((dept) => (
// //                 <option key={dept.id} value={dept.workingDepartment}>
// //                   {dept.workingDepartment}
// //                 </option>
// //               ))}
// //             </select>

// //             <h1 className="text-[16px] font-semibold text-black pt-[18px]">
// //               Working Duration <span className="font-light">(On this Hospital)</span>
// //             </h1>

// //             <div className="flex gap-3">
// //               <div>
// //                 <p className="mb-2">From</p>
// //                 <input
// //                   type="date"
// //                   name="startDate"
// //                   value={formData.startDate}
// //                   onChange={handleChange}
// //                   className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
// //                 />
// //               </div>
// //               <div>
// //                 <p className="mb-2">To</p>
// //                 <input
// //                   type="date"
// //                   name="endDate"
// //                   value={formData.endDate}
// //                   onChange={handleChange}
// //                   className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
// //                 />
// //               </div>
// //               <div className="text-[16px] text-black font-light flex justify-center items-center gap-2 ms-10 mt-8">
// //                 <input
// //                   type="checkbox"
// //                   name="onGoing"
// //                   checked={formData.onGoing}
// //                   onChange={handleChange}
// //                   className="size-[20px]"
// //                 />
// //                 Currently am working here
// //               </div>
// //             </div>
// //           </div>
// //         </>
// //       )}

// //       <h1 className="text-[16px] font-semibold text-black py-[18px]">
// //         Mention your Expertise / Skills
// //       </h1>

// //       {/* Skills checkboxes from API/store */}
// //       <div className="skills-list flex flex-wrap gap-3">
// //         {skills.map((skill) => (
// //           <label key={skill.id} className="flex items-center gap-2">
// //             <input
// //               type="checkbox"
// //               checked={formData.skills.includes(skill.skill)}
// //               onChange={() => handleSkillChange(skill.skill)}
// //               className="size-[20px]"
// //             />
// //             <span className="text-[16px]">{skill.skill}</span>
// //           </label>
// //         ))}
// //       </div>

// //       <button
// //         onClick={handleSubmit}
// //         disabled={isSubmitted}
// //         className={`mt-10 w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center opacity-100 cursor-pointer ${
// //           isSubmitted
// //             ? "disabled:opacity-50 cursor-not-allowed"
// //             : "bg-[#3674B5] text-white"
// //         }`}
// //       >
// //         {isSubmitted ? "Submitted" : "Next"}
// //       </button>

// //       {errorMessage && (
// //         <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
// //       )}
// //       {successMessage && (
// //         <p className="text-blue-600 text-sm mt-2">{successMessage}</p>
// //       )}
// //     </div>
// //   );
// // }

// // export default NurseExperienceDetails;

"use client";
import React, { useState, useEffect } from "react";
import useNurseRegistrationStore from "@/app/lib/store/nurseRegistrationStore";
import useManageProfessionalsStore from "@/app/lib/store/useManageProfessionalsStore";
import useDistrictStore from "@/app/lib/store/districtsStore"; // Assuming statesList & fetchStates are here

function NurseExperienceDetails({ categoryByProfession ,onComplete }) {
  // UI states
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasWorkExperience, setHasWorkExperience] = useState("no");

  // Stores for skills & departments & states
  const { listedItems, fetchItems } = useManageProfessionalsStore();
  const { statesList, fetchStates } = useDistrictStore();

  // useEffect(() => {
  //   // Fetch skills and departments dynamically based on nurse category
  //   if (categoryByProfession) {
  //     fetchItems("skills", 1, 50, categoryByProfession);
  //     fetchItems("working-departments", 1, 50, categoryByProfession);
  //   }
  //   fetchStates(1); // Load provider states from API/store
  // }, [categoryByProfession, fetchItems, fetchStates]);

  const normalizedCategory = React.useMemo(() => {
    if (categoryByProfession === "REGISTERED_NURSE") return "REG_NURSES";
    if (categoryByProfession === "ANCILLARY_PERSONAL") return "ANCILLARY";
    return categoryByProfession;
  }, [categoryByProfession]);

  // Then use normalizedCategory when fetching data
  useEffect(() => {
    if (normalizedCategory) {
      fetchItems("skills", 1, 50, normalizedCategory);
      fetchItems("working-departments", 1, 50, normalizedCategory);
    }
    fetchStates(1); // For states list
  }, [normalizedCategory, fetchItems, fetchStates]);

  // Get lists from stores
  const skills = listedItems.skills || [];
  const departments = listedItems["working-departments"] || [];

  // Experience form state
  const [formData, setFormData] = useState({
    id: "",
    yearsOfExperience: "",
    monthsOfExperience: "",
    department: "",
    startDate: "",
    endDate: "",
    onGoing: false,
    providerName: "",
    providerLocation: "",
    providerState: "",
    skills: [],
  });

  const { submitNursePageTwo } = useNurseRegistrationStore();

  // Handler for provider state change
  // const handleStateChange = (e) => {
  //   const state = e.target.value;
  //   setSelectedState(state);
  //   setFormData((prev) => ({ ...prev, providerState: state }));
  // };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setFormData((prev) => ({ ...prev, providerState: state }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // const handleSkillChange = (skill) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     skills: prev.skills.includes(skill)
  //       ? prev.skills.filter((s) => s !== skill)
  //       : [...prev.skills, skill],
  //   }));
  // };

  const handleSkillChange = (skillId) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skillId)
        ? prev.skills.filter((id) => id !== skillId)
        : [...prev.skills, skillId],
    }));
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitted(false);

    if (formData.skills.length === 0) {
      setErrorMessage("Please select at least one skill.");
      return;
    }

    if (hasWorkExperience === "yes") {
      if (!formData.startDate || (!formData.onGoing && !formData.endDate)) {
        setErrorMessage("Please complete your experience dates.");
        return;
      }
    }

    const payload = {
      isExperienced: hasWorkExperience === "yes",
      skillsIds: formData.skills,
      departmentId: formData.department,
      yearsOfExperience:
        hasWorkExperience === "yes"
          ? parseInt(formData.yearsOfExperience) || 0
          : undefined,
      monthsOfExperience:
        hasWorkExperience === "yes"
          ? parseInt(formData.monthsOfExperience) || 0
          : undefined,
      providerName:
        hasWorkExperience === "yes" ? formData.providerName : undefined,
      providerLocation:
        hasWorkExperience === "yes" ? formData.providerLocation : undefined,
      providerStateId:
        hasWorkExperience === "yes" ? formData.providerState : undefined,
      onGoing: hasWorkExperience === "yes" ? formData.onGoing : undefined,
      startDate:
        hasWorkExperience === "yes" && formData.startDate
          ? new Date(formData.startDate).toISOString()
          : undefined,
      endDate:
        hasWorkExperience === "yes"
          ? formData.onGoing
            ? new Date().toISOString()
            : formData.endDate
            ? new Date(formData.endDate).toISOString()
            : undefined
          : undefined,
    };

    try {
      await submitNursePageTwo(payload);
      setSuccessMessage("Experience details submitted successfully.");
      setIsSubmitted(true);
      onComplete ();
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="px-[39px] pt-[15px]">
      <h1 className="text-[16px] font-semibold text-black py-[18px]">
        Do you have Work Experience?
      </h1>
      <div className="flex flex-col text-[16px] text-black font-light gap-[18px]">
        <select
          className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
          value={hasWorkExperience}
          onChange={(e) => setHasWorkExperience(e.target.value)}
        >
          <option value="" disabled>
            Previous Work Experience
          </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      {hasWorkExperience === "yes" && (
        <>
          <h1 className="text-[16px] font-semibold text-black py-[18px]">
            Please provide your experience details
          </h1>
          <div className="flex flex-col gap-5">
            <h1 className="text-[16px] font-semibold text-black py-[18px]">
              Total Experience in Y/M
            </h1>
            <div className="flex gap-3">
              <select
                name="yearsOfExperience"
                className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
                value={formData.yearsOfExperience}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Year
                </option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i} value={i}>
                    {i} {i === 1 ? "Year" : "Years"}
                  </option>
                ))}
              </select>

              <select
                name="monthsOfExperience"
                className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
                value={formData.monthsOfExperience}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Months
                </option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {i} {i === 1 ? "Month" : "Months"}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              name="providerName"
              placeholder="Hospital (Last working)"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
              value={formData.providerName}
              onChange={handleChange}
            />

            {/* Provider State Dropdown from API */}
            {/* <select
              name="providerState"
              value={selectedState}
              onChange={handleStateChange}
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
            >
              <option value="" disabled>
                State
              </option>
              {(statesList || []).map((state) => (
                <option key={state.id} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select> */}

            <select
              name="providerState"
              value={selectedState}
              onChange={handleStateChange}
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
            >
              <option value="" disabled>
                State
              </option>
              {(statesList || []).map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="providerLocation"
              placeholder="Area"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
              value={formData.providerLocation}
              onChange={handleChange}
            />

            {/* Departments Dropdown; fetched from API/store */}
            <select
              name="department"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="" disabled>
                Department
              </option>
              {/* {departments.map((dept) => (
                <option key={dept.id} value={dept.workingDepartment}>
                  {dept.workingDepartment}
                </option>
              ))} */}
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.workingDepartment}
                </option>
              ))}
            </select>

            <h1 className="text-[16px] font-semibold text-black pt-[18px]">
              Working Duration{" "}
              <span className="font-light">(On this Hospital)</span>
            </h1>

            <div className="flex gap-3">
              <div>
                <p className="mb-2">From</p>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
                />
              </div>
              <div>
                <p className="mb-2">To</p>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
                />
              </div>
              <div className="text-[16px] text-black font-light flex justify-center items-center gap-2 ms-10 mt-8">
                <input
                  type="checkbox"
                  name="onGoing"
                  checked={formData.onGoing}
                  onChange={handleChange}
                  className="size-[20px]"
                />
                Currently am working here
              </div>
            </div>
          </div>
        </>
      )}

      <h1 className="text-[16px] font-semibold text-black py-[18px]">
        Mention your Expertise / Skills
      </h1>
      {/* Skills checkboxes from API/store */}
      <div className="skills-list flex flex-wrap gap-3">
        {skills.map((skill) => (
          <label key={skill.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              // checked={formData.skills.includes(skill.skill)}
              // onChange={() => handleSkillChange(skill.skill)}
              checked={formData.skills.includes(skill.id)}
              onChange={() => handleSkillChange(skill.id)}
              className="size-[20px]"
            />
            <span className="text-[16px]">{skill.skill}</span>
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitted}
        className={`mt-10 w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center opacity-100 cursor-pointer ${
          isSubmitted
            ? "disabled:opacity-50 cursor-not-allowed"
            : "bg-[#3674B5] text-white"
        }`}
      >
        {isSubmitted ? "Submitted" : "Next"}
      </button>

      {errorMessage && (
        <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="text-blue-600 text-sm mt-2">{successMessage}</p>
      )}
    </div>
  );
}

export default NurseExperienceDetails;







 
// "use client";
// import React, { useState, useEffect } from "react";
// import useNurseRegistrationStore from "@/app/lib/store/nurseRegistrationStore";
// import useManageProfessionalsStore from "@/app/lib/store/useManageProfessionalsStore";
// import useDistrictStore from "@/app/lib/store/districtsStore"; // Assuming statesList & fetchStates are here
 
// function NurseExperienceDetails({ categoryByProfession }) {
//   // UI states
 
//   const [selectedState, setSelectedState] = useState("");
//   const [districts, setDistricts] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [hasWorkExperience, setHasWorkExperience] = useState("no");
 
//   // Stores for skills & departments & states
//   const { listedItems, fetchItems } = useManageProfessionalsStore();
//   const { statesList, fetchStates } = useDistrictStore();
 
//   // useEffect(() => {
//   //   // Fetch skills and departments dynamically based on nurse category
//   //   if (categoryByProfession) {
//   //     fetchItems("skills", 1, 50, categoryByProfession);
//   //     fetchItems("working-departments", 1, 50, categoryByProfession);
//   //   }
//   //   fetchStates(1); // Load provider states from API/store
//   // }, [categoryByProfession, fetchItems, fetchStates]);
 
//   const normalizedCategory = React.useMemo(() => {
//     if (categoryByProfession === "REGISTERED_NURSE") return "REG_NURSES";
//     if (categoryByProfession === "ANCILLARY_PERSONAL") return "ANCILLARY";
//     return categoryByProfession;
//   }, [categoryByProfession]);
 
//   // Then use normalizedCategory when fetching data
//   useEffect(() => {
//     if (normalizedCategory) {
//       fetchItems("skills", 1, 50, normalizedCategory);
//       fetchItems("working-departments", 1, 50, normalizedCategory);
//     }
//     fetchStates(1); // For states list
//   }, [normalizedCategory, fetchItems, fetchStates]);
 
//   // Get lists from stores
//   const skills = listedItems.skills || [];
//   const departments = listedItems["working-departments"] || [];
 
//   // Experience form state
//   const [formData, setFormData] = useState({
//     id: "",
//     yearsOfExperience: "",
//     monthsOfExperience: "",
//     department: "",
//     startDate: "",
//     endDate: "",
//     onGoing: false,
//     providerName: "",
//     providerLocation: "",
//     providerState: "",
//     skills: [],
//   });
 
//   const { userId,submitNursePageTwo } = useNurseRegistrationStore();
 
//   // Handler for provider state change
//   // const handleStateChange = (e) => {
//   //   const state = e.target.value;
//   //   setSelectedState(state);
//   //   setFormData((prev) => ({ ...prev, providerState: state }));
//   // };
 
//   const handleStateChange = (e) => {
//     const state = e.target.value;
//     setSelectedState(state);
//     setFormData((prev) => ({ ...prev, providerState: state }));
//   };
 
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };
 
//   // const handleSkillChange = (skill) => {
//   //   setFormData((prev) => ({
//   //     ...prev,
//   //     skills: prev.skills.includes(skill)
//   //       ? prev.skills.filter((s) => s !== skill)
//   //       : [...prev.skills, skill],
//   //   }));
//   // };
 
//   const handleSkillChange = (skillId) => {
//     setFormData((prev) => ({
//       ...prev,
//       skills: prev.skills.includes(skillId)
//         ? prev.skills.filter((id) => id !== skillId)
//         : [...prev.skills, skillId],
//     }));
//   };
 
//   const handleSubmit = async () => {
//     setErrorMessage("");
//     setSuccessMessage("");
//     setIsSubmitted(false);
 
//     if (formData.skills.length === 0) {
//       setErrorMessage("Please select at least one skill.");
//       return;
//     }
 
//     if (hasWorkExperience === "yes") {
//       if (!formData.startDate || (!formData.onGoing && !formData.endDate)) {
//         setErrorMessage("Please complete your experience dates.");
//         return;
//       }
//     }
 
//     const payload = {
//       isExperienced: hasWorkExperience === "yes",
//       skillsIds: formData.skills,
//       departmentId: formData.department,
//       yearsOfExperience:
//         hasWorkExperience === "yes"
//           ? parseInt(formData.yearsOfExperience) || 0
//           : undefined,
//       monthsOfExperience:
//         hasWorkExperience === "yes"
//           ? parseInt(formData.monthsOfExperience) || 0
//           : undefined,
//       providerName:
//         hasWorkExperience === "yes" ? formData.providerName : undefined,
//       providerLocation:
//         hasWorkExperience === "yes" ? formData.providerLocation : undefined,
//       providerStateId:
//         hasWorkExperience === "yes" ? formData.providerState : undefined,
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
//       await submitNursePageTwo(payload);
//       setSuccessMessage("Experience details submitted successfully.");
//       setIsSubmitted(true);
//     } catch (err) {
//       setErrorMessage("something went wrong");
//     }
//   };
// const isDisabled = !userId;
//   return (
//    <div className="px-[39px] pt-[15px]">
//       <fieldset disabled={isDisabled} className={isDisabled ? "opacity-50 pointer-events-none" : ""}>
//         <h1 className="text-[16px] font-semibold text-black py-[18px]">
//           Do you have Work Experience?
//         </h1>
//         <div className="flex flex-col text-[16px] text-black font-light gap-[18px]">
//           <select
//             className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
//             value={hasWorkExperience}
//             onChange={(e) => setHasWorkExperience(e.target.value)}
//           >
//             <option value="" disabled>
//               Previous Work Experience
//             </option>
//             <option value="yes">Yes</option>
//             <option value="no">No</option>
//           </select>
//         </div>
//           {hasWorkExperience === "yes" && (
//         <>
//           <h1 className="text-[16px] font-semibold text-black py-[18px]">
//             Please provide your experience details
//           </h1>
//           <div className="flex flex-col gap-5">
//             <h1 className="text-[16px] font-semibold text-black py-[18px]">
//               Total Experience in Y/M
//             </h1>
//             <div className="flex gap-3">
//               <select
//                 name="yearsOfExperience"
//                 className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
//                 value={formData.yearsOfExperience}
//                 onChange={handleChange}
//               >
//                 <option value="" disabled>
//                   Year
//                 </option>
//                 {Array.from({ length: 31 }, (_, i) => (
//                   <option key={i} value={i}>
//                     {i} {i === 1 ? "Year" : "Years"}
//                   </option>
//                 ))}
//               </select>
 
//               <select
//                 name="monthsOfExperience"
//                 className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
//                 value={formData.monthsOfExperience}
//                 onChange={handleChange}
//               >
//                 <option value="" disabled>
//                   Months
//                 </option>
//                 {Array.from({ length: 12 }, (_, i) => (
//                   <option key={i} value={i}>
//                     {i} {i === 1 ? "Month" : "Months"}
//                   </option>
//                 ))}
//               </select>
//             </div>
 
//             <input
//               type="text"
//               name="providerName"
//               placeholder="Hospital (Last working)"
//               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
//               value={formData.providerName}
//               onChange={handleChange}
//             />
 
//             {/* Provider State Dropdown from API */}
//             {/* <select
//               name="providerState"
//               value={selectedState}
//               onChange={handleStateChange}
//               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
//             >
//               <option value="" disabled>
//                 State
//               </option>
//               {(statesList || []).map((state) => (
//                 <option key={state.id} value={state.name}>
//                   {state.name}
//                 </option>
//               ))}
//             </select> */}
 
//             <select
//               name="providerState"
//               value={selectedState}
//               onChange={handleStateChange}
//               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
//             >
//               <option value="" disabled>
//                 State
//               </option>
//               {(statesList || []).map((state) => (
//                 <option key={state.id} value={state.id}>
//                   {state.name}
//                 </option>
//               ))}
//             </select>
 
//             <input
//               type="text"
//               name="providerLocation"
//               placeholder="Area"
//               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
//               value={formData.providerLocation}
//               onChange={handleChange}
//             />
 
//             {/* Departments Dropdown; fetched from API/store */}
//             <select
//               name="department"
//               className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
//               value={formData.department}
//               onChange={handleChange}
//             >
//               <option value="" disabled>
//                 Department
//               </option>
//               {/* {departments.map((dept) => (
//                 <option key={dept.id} value={dept.workingDepartment}>
//                   {dept.workingDepartment}
//                 </option>
//               ))} */}
//               {departments.map((dept) => (
//                 <option key={dept.id} value={dept.id}>
//                   {dept.workingDepartment}
//                 </option>
//               ))}
//             </select>
 
//             <h1 className="text-[16px] font-semibold text-black pt-[18px]">
//               Working Duration{" "}
//               <span className="font-light">(On this Hospital)</span>
//             </h1>
 
//             <div className="flex gap-3">
//               <div>
//                 <p className="mb-2">From</p>
//                 <input
//                   type="date"
//                   name="startDate"
//                   value={formData.startDate}
//                   onChange={handleChange}
//                   className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
//                 />
//               </div>
//               <div>
//                 <p className="mb-2">To</p>
//                 <input
//                   type="date"
//                   name="endDate"
//                   value={formData.endDate}
//                   onChange={handleChange}
//                   className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 outline-none placeholder:text-black"
//                 />
//               </div>
//               <div className="text-[16px] text-black font-light flex justify-center items-center gap-2 ms-10 mt-8">
//                 <input
//                   type="checkbox"
//                   name="onGoing"
//                   checked={formData.onGoing}
//                   onChange={handleChange}
//                   className="size-[20px]"
//                 />
//                 Currently am working here
//               </div>
//             </div>
//           </div>
//         </>
//       )}
 
//         <h1 className="text-[16px] font-semibold text-black py-[18px]">
//           Mention your Expertise / Skills
//         </h1>
//         <div className="skills-list flex flex-wrap gap-3">
//           {skills.map((skill) => (
//             <label key={skill.id} className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={formData.skills.includes(skill.id)}
//                 onChange={() => handleSkillChange(skill.id)}
//                 className="size-[20px]"
//               />
//               <span className="text-[16px]">{skill.skill}</span>
//             </label>
//           ))}
//         </div>
 
//         <button
//           onClick={handleSubmit}
//           disabled={isSubmitted}
//           className={`mt-10 w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center opacity-100 cursor-pointer ${
//             isSubmitted
//               ? "disabled:opacity-50 cursor-not-allowed"
//               : "bg-[#3674B5] text-white"
//           }`}
//         >
//           {isSubmitted ? "Submitted" : "Next"}
//         </button>
//       </fieldset>
 
//       {/* Show a message if disabled */}
//       {/* {isDisabled && (
//         <p className="text-red-600 text-sm mt-4">
//           Please complete the previous step to unlock this section.
//         </p>
//       )} */}
 
//       {errorMessage && (
//         <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
//       )}
//       {successMessage && (
//         <p className="text-blue-600 text-sm mt-2">{successMessage}</p>
//       )}
//     </div>
//   );
// }
 
// export default NurseExperienceDetails;