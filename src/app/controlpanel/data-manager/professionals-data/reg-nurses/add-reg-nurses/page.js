// "use client";
// import React, { useEffect } from "react";
// import Navlink from "@/components/dataManager/professionalsData.js/Navlink";
// import Link from "next/link";
// import useProfessionalsStore from "@/app/lib/store/useProfessionalsStore";

// function AddRegNursesPage({ category = "REG_NURSES" }) {
//   const {
//     specializations,
//     qualifications,
//     workingDepartments,
//     skills,
//     isLoading,
//     error,
//     success,
//     addSpecializationField,
//     setSpecializationValue,
//     addQualificationField,
//     setQualificationValue,
//     addWorkingDepartmentField,
//     setWorkingDepartmentValue,
//     addSkillField,
//     setSkillValue,
//     saveAllCategories,
//     resetSuccess,
//     resetInputs,
//   } = useProfessionalsStore();

//   useEffect(() => {
//     resetInputs(); // Clear inputs fresh on mount to avoid showing old persisted inputs
//   }, [resetInputs]);

//   const handleAddField = (field) => {
//     if (field === "specializations") addSpecializationField();
//     else if (field === "qualifications") addQualificationField();
//     else if (field === "workingDepartments") addWorkingDepartmentField();
//     else if (field === "skills") addSkillField();
//   };

//   const handleInputChange = (field, idx, value) => {
//     if (field === "specializations") setSpecializationValue(idx, value);
//     else if (field === "qualifications") setQualificationValue(idx, value);
//     else if (field === "workingDepartments")
//       setWorkingDepartmentValue(idx, value);
//     else if (field === "skills") setSkillValue(idx, value);
//   };

//   useEffect(() => {
//     if (success) {
//       const timeout = setTimeout(() => resetSuccess(), 3000);
//       return () => clearTimeout(timeout);
//     }
//   }, [success, resetSuccess]);

//   return (
//     <div>
//       <Navlink />

//       <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
//         <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
//           <div className="flex items-center gap-[50px]">
//             <h1 className="text-[#3674B5]">Add</h1>
//             <Link
//               href={`/controlpanel/data-manager/professionals-data/reg-nurses/manage-reg-nurses`}
//               className="text-black"
//             >
//               Manage
//             </Link>
//           </div>
//         </div>
//       </div>

//       <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
//         <h1 className="text-black font-semibold py-[16px]">Add Reg Nurses</h1>
//       </div>

//       {/* Specializations */}
//       <section className="p-6 bg-white mt-4 rounded shadow">
//         <h2 className="text-black font-semibold mb-2">Specialization</h2>
//         {specializations.map((val, idx) => (
//           <div key={idx} className="flex items-center gap-6 mb-2">
//             <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
//               {String(idx + 1).padStart(2, "0")}
//             </div>
//             <input
//               type="text"
//               value={val}
//               placeholder="Enter Specialization"
//               disabled={isLoading}
//               onChange={(e) =>
//                 handleInputChange("specializations", idx, e.target.value)
//               }
//               className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
//             />
//             {idx === specializations.length - 1 && (
//               <button
//                 disabled={isLoading}
//                 onClick={() => handleAddField("specializations")}
//                 className="bg-[#196BA5] text-white text-xl rounded-lg size-7 cursor-pointer"
//                 aria-label="Add specialization field"
//               >
//                 +
//               </button>
//             )}
//           </div>
//         ))}
//       </section>

//       {/* Qualifications */}
//       <section className="p-6 bg-white mt-4 rounded shadow">
//         <h2 className="text-[#000000] font-semibold mb-2">Qualification</h2>
//         {qualifications.map((val, idx) => (
//           <div key={idx} className="flex items-center gap-6 mb-2">
//             <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
//               {String(idx + 1).padStart(2, "0")}
//             </div>
//             <input
//               type="text"
//               value={val}
//               placeholder="Enter Qualification"
//               disabled={isLoading}
//               onChange={(e) =>
//                 handleInputChange("qualifications", idx, e.target.value)
//               }
//               className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
//             />
//             {idx === qualifications.length - 1 && (
//               <button
//                 disabled={isLoading}
//                 onClick={() => handleAddField("qualifications")}
//                 className="bg-[#196BA5] text-white text-xl rounded-lg size-7 cursor-pointer"
//                 aria-label="Add qualification field"
//               >
//                 +
//               </button>
//             )}
//           </div>
//         ))}
//       </section>

//       {/* Working Departments */}
//       <section className="p-6 bg-white mt-4 rounded shadow">
//         <h2 className="text-[#000000] font-semibold mb-2">
//           Working Departments
//         </h2>
//         {workingDepartments.map((val, idx) => (
//           <div key={idx} className="flex items-center gap-6 mb-2">
//             <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
//               {String(idx + 1).padStart(2, "0")}
//             </div>
//             <input
//               type="text"
//               value={val}
//               placeholder="Enter Working Department"
//               disabled={isLoading}
//               onChange={(e) =>
//                 handleInputChange("workingDepartments", idx, e.target.value)
//               }
//               className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
//             />
//             {idx === workingDepartments.length - 1 && (
//               <button
//                 disabled={isLoading}
//                 onClick={() => handleAddField("workingDepartments")}
//                 className="bg-[#196BA5] text-white text-xl rounded-lg size-7 cursor-pointer"
//                 aria-label="Add working department field"
//               >
//                 +
//               </button>
//             )}
//           </div>
//         ))}
//       </section>

//       {/* Skills */}
//       <section className="p-6 bg-white mt-4 rounded shadow">
//         <h2 className="text-[#000000] font-semibold mb-2">Skills</h2>
//         {skills.map((val, idx) => (
//           <div key={idx} className="flex items-center gap-6 mb-2">
//             <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
//               {String(idx + 1).padStart(2, "0")}
//             </div>
//             <input
//               type="text"
//               value={val}
//               placeholder="Enter Skill"
//               disabled={isLoading}
//               onChange={(e) => handleInputChange("skills", idx, e.target.value)}
//               className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
//             />
//             {idx === skills.length - 1 && (
//               <button
//                 disabled={isLoading}
//                 onClick={() => handleAddField("skills")}
//                 className="bg-[#196BA5] text-white text-xl rounded-lg size-7 cursor-pointer"
//                 aria-label="Add skill field"
//               >
//                 +
//               </button>
//             )}
//           </div>
//         ))}
//       </section>

//       <button
//         onClick={() => saveAllCategories(category)}
//         disabled={isLoading}
//         className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-6 mx-6 cursor-pointer mb-4"
//       >
//         Save
//       </button>

//       {success && (
//         <p className="text-blue-600 font-semibold px-6 my-4">
//           Data saved successfully!
//         </p>
//       )}
//       {error && (
//         <p className="text-red-600 font-semibold px-6 mt-4 whitespace-pre-wrap">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }

// export default AddRegNursesPage;


// "use client";
// import React, { useEffect } from "react";
// import Navlink from "@/components/dataManager/professionalsData.js/Navlink";
// import Link from "next/link";
// import useProfessionalsStore from "@/app/lib/store/useProfessionalsStore";

// function AddRegNursesPage({ category = "REG_NURSES" }) {
//   const {
//     specializations,
//     qualifications,
//     workingDepartments,
//     skills,
//     backendDuplicates,
//     isLoading,
//     error,
//     success,
//     addSpecializationField,
//     setSpecializationValue,
//     addQualificationField,
//     setQualificationValue,
//     addWorkingDepartmentField,
//     setWorkingDepartmentValue,
//     addSkillField,
//     setSkillValue,
//     saveAllCategories,
//     resetSuccess,
//     resetInputs,
//   } = useProfessionalsStore();

//   useEffect(() => resetInputs(), [resetInputs]);

//   const handleInputChange = (field, idx, value) => {
//     if (field === "specializations") setSpecializationValue(idx, value);
//     else if (field === "qualifications") setQualificationValue(idx, value);
//     else if (field === "workingDepartments") setWorkingDepartmentValue(idx, value);
//     else if (field === "skills") setSkillValue(idx, value);
//   };

//   const getDuplicateIndexes = (arr) => {
//     const trimmed = arr.map((v) => v.trim().toLowerCase());
//     return trimmed.map((val, idx) => trimmed.indexOf(val) !== idx && val !== "" ? true : false);
//   };

//   const specDuplicates = getDuplicateIndexes(specializations);
//   const qualDuplicates = getDuplicateIndexes(qualifications);
//   const deptDuplicates = getDuplicateIndexes(workingDepartments);
//   const skillDuplicates = getDuplicateIndexes(skills);

//   useEffect(() => {
//     if (success) {
//       const timeout = setTimeout(() => resetSuccess(), 3000);
//       return () => clearTimeout(timeout);
//     }
//   }, [success, resetSuccess]);

//   const renderInput = (arr, localDups, backendDups, fieldName, addField, placeholder) =>
//     arr.map((val, idx) => {
//       const isBackendDuplicate = backendDups.includes(val.trim().toLowerCase());
//       return (
//         <div key={idx} className="flex items-center gap-6 mb-2">
//           <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">{String(idx + 1).padStart(2, "0")}</div>
//           <input
//             type="text"
//             value={val}
//             placeholder={placeholder}
//             disabled={isLoading}
//             onChange={(e) => handleInputChange(fieldName, idx, e.target.value)}
//             className={`w-[350px] py-2 px-4 rounded-[15px] outline-none border ${
//               localDups[idx] || isBackendDuplicate ? "border-red-500 bg-red-50" : "border-[#8888888c]"
//             }`}
//           />
//           {idx === arr.length - 1 && (
//             <button
//               disabled={isLoading}
//               onClick={() => addField()}
//               className="bg-[#196BA5] text-white text-xl rounded-lg size-7 cursor-pointer"
//             >
//               +
//             </button>
//           )}
//         </div>
//       );
//     });

//   return (
//     <div>
//       <Navlink />

//       <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
//         <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
//           <div className="flex items-center gap-[50px]">
//             <h1 className="text-[#3674B5]">Add</h1>
//             <Link href={`/controlpanel/data-manager/professionals-data/reg-nurses/manage-reg-nurses`} className="text-black">
//               Manage
//             </Link>
//           </div>
//         </div>
//       </div>

//       <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
//         <h1 className="text-black font-semibold py-[16px]">Add Reg Nurses</h1>
//       </div>

//       <section className="p-6 bg-white mt-4 rounded shadow">
//         <h2 className="text-black font-semibold mb-2">Specialization</h2>
//         {renderInput(specializations, specDuplicates, backendDuplicates.specializations, "specializations", addSpecializationField, "Enter Specialization")}
//       </section>

//       <section className="p-6 bg-white mt-4 rounded shadow">
//         <h2 className="text-black font-semibold mb-2">Qualification</h2>
//         {renderInput(qualifications, qualDuplicates, backendDuplicates.qualifications, "qualifications", addQualificationField, "Enter Qualification")}
//       </section>

//       <section className="p-6 bg-white mt-4 rounded shadow">
//         <h2 className="text-black font-semibold mb-2">Working Departments</h2>
//         {renderInput(workingDepartments, deptDuplicates, backendDuplicates.workingDepartments, "workingDepartments", addWorkingDepartmentField, "Enter Working Department")}
//       </section>

//       <section className="p-6 bg-white mt-4 rounded shadow">
//         <h2 className="text-black font-semibold mb-2">Skills</h2>
//         {renderInput(skills, skillDuplicates, backendDuplicates.skills, "skills", addSkillField, "Enter Skill")}
//       </section>

//       <button
//         onClick={() => saveAllCategories(category)}
//         disabled={isLoading}
//         className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-6 mx-6 cursor-pointer mb-4"
//       >
//         Save
//       </button>

//       {success && <p className="text-blue-600 font-semibold px-6 my-4">Data saved successfully!</p>}
//       {error && <p className="text-red-600 font-semibold px-6 mt-4 whitespace-pre-wrap">{error}</p>}
//     </div>
//   );
// }

// export default AddRegNursesPage;





// "use client";
// import React, { useEffect } from "react";
// import Navlink from "@/components/dataManager/professionalsData.js/Navlink";
// import Link from "next/link";
// import useProfessionalsStore from "@/app/lib/store/useProfessionalsStore";

// function AddRegNursesPage({ category = "REG_NURSES" }) {
//   const {
//     specializations,
//     qualifications,
//     workingDepartments,
//     skills,
//     backendDuplicates,
//     isLoading,
//     error,
//     success,
//     addSpecializationField,
//     setSpecializationValue,
//     addQualificationField,
//     setQualificationValue,
//     addWorkingDepartmentField,
//     setWorkingDepartmentValue,
//     addSkillField,
//     setSkillValue,
//     saveAllCategories,
//     resetSuccess,
//     resetInputs,
//   } = useProfessionalsStore();

//   // Reset inputs on mount
//   useEffect(() => resetInputs(), [resetInputs]);

//   // Handle input change
//   const handleInputChange = (field, idx, value) => {
//     if (field === "specializations") setSpecializationValue(idx, value);
//     else if (field === "qualifications") setQualificationValue(idx, value);
//     else if (field === "workingDepartments") setWorkingDepartmentValue(idx, value);
//     else if (field === "skills") setSkillValue(idx, value);
//   };

//   // Reset success message after 3s
//   useEffect(() => {
//     if (success) {
//       const timeout = setTimeout(() => resetSuccess(), 3000);
//       return () => clearTimeout(timeout);
//     }
//   }, [success, resetSuccess]);

//   // Render input fields with backend duplicates highlighted
//   const renderInput = (arr, backendDups, fieldName, addField, placeholder) =>
//     arr.map((val, idx) => {
//       const isBackendDuplicate = backendDups?.includes(val.trim().toLowerCase());
//       return (
//         <div key={idx} className="flex items-center gap-6 mb-2">
//           <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">{String(idx + 1).padStart(2, "0")}</div>
//           <input
//             type="text"
//             value={val}
//             placeholder={placeholder}
//             disabled={isLoading}
//             onChange={(e) => handleInputChange(fieldName, idx, e.target.value)}
//             className={`w-[350px] py-2 px-4 rounded-[15px] outline-none border ${
//               isBackendDuplicate ? "border-red-500 bg-red-50" : "border-[#8888888c]"
//             }`}
//           />
//           {idx === arr.length - 1 && (
//             <button
//               disabled={isLoading}
//               onClick={() => addField()}
//               className="bg-[#196BA5] text-white text-xl rounded-lg size-7 cursor-pointer"
//             >
//               +
//             </button>
//           )}
//         </div>
//       );
//     });

//   return (
//     <div>
//       <Navlink />

//       {/* Header */}
//       <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
//         <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
//           <div className="flex items-center gap-[50px]">
//             <h1 className="text-[#3674B5]">Add</h1>
//             <Link
//               href={`/controlpanel/data-manager/professionals-data/reg-nurses/manage-reg-nurses`}
//               className="text-black"
//             >
//               Manage
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Page Title */}
//       <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
//         <h1 className="text-black font-semibold py-[16px]">Add Reg Nurses</h1>
//       </div>

//       {/* Specializations */}
//       <section className="p-6 bg-white mt-4 rounded shadow">
//         <h2 className="text-black font-semibold mb-2">Specialization</h2>
//         {renderInput(
//           specializations,
//           backendDuplicates.specializations,
//           "specializations",
//           addSpecializationField,
//           "Enter Specialization"
//         )}
//       </section>

//       {/* Qualifications */}
//       <section className="p-6 bg-white mt-4 rounded shadow">
//         <h2 className="text-black font-semibold mb-2">Qualification</h2>
//         {renderInput(
//           qualifications,
//           backendDuplicates.qualifications,
//           "qualifications",
//           addQualificationField,
//           "Enter Qualification"
//         )}
//       </section>

//       {/* Working Departments */}
//       <section className="p-6 bg-white mt-4 rounded shadow">
//         <h2 className="text-black font-semibold mb-2">Working Departments</h2>
//         {renderInput(
//           workingDepartments,
//           backendDuplicates.workingDepartments,
//           "workingDepartments",
//           addWorkingDepartmentField,
//           "Enter Working Department"
//         )}
//       </section>

//       {/* Skills */}
//       <section className="p-6 bg-white mt-4 rounded shadow">
//         <h2 className="text-black font-semibold mb-2">Skills</h2>
//         {renderInput(
//           skills,
//           backendDuplicates.skills,
//           "skills",
//           addSkillField,
//           "Enter Skill"
//         )}
//       </section>

//       {/* Save Button */}
//       <button
//         onClick={() => saveAllCategories(category)}
//         disabled={isLoading}
//         className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-6 mx-6 cursor-pointer mb-4"
//       >
//         Save
//       </button>

//       {/* Success & Error messages */}
//       {success && <p className="text-blue-600 font-semibold px-6 my-4">Data saved successfully!</p>}
//       {error && <p className="text-red-600 font-semibold px-6 mt-4 whitespace-pre-wrap">{error}</p>}
//     </div>
//   );
// }

// export default AddRegNursesPage;




// "use client";
// import React, { useEffect, useState } from "react";
// import Navlink from "@/components/dataManager/professionalsData.js/Navlink";
// import Link from "next/link";
// import useProfessionalsStore from "@/app/lib/store/useProfessionalsStore";

// function AddRegNursesPage({ category = "REG_NURSES" }) {
//   const {
//     specializations,
//     qualifications,
//     workingDepartments,
//     skills,
//     backendDuplicates,
//     isLoading,
//     error,
//     success,
//     addSpecializationField,
//     setSpecializationValue,
//     addQualificationField,
//     setQualificationValue,
//     addWorkingDepartmentField,
//     setWorkingDepartmentValue,
//     addSkillField,
//     setSkillValue,
//     saveAllCategories,
//     resetSuccess,
//     resetError,
//   } = useProfessionalsStore();

//   const [localMessage, setLocalMessage] = useState(null);

//   // Reset messages after 3s
//   useEffect(() => {
//     if (localMessage) {
//       const timeout = setTimeout(() => setLocalMessage(null), 4000);
//       return () => clearTimeout(timeout);
//     }
//   }, [localMessage]);

//   const handleInputChange = (field, idx, value) => {
//     if (field === "specializations") setSpecializationValue(idx, value);
//     else if (field === "qualifications") setQualificationValue(idx, value);
//     else if (field === "workingDepartments") setWorkingDepartmentValue(idx, value);
//     else if (field === "skills") setSkillValue(idx, value);
//   };

//   // render input with backend duplicates highlight
//   const renderInput = (arr, backendDups, fieldName, addField, placeholder) =>
//     arr.map((val, idx) => {
//       const isBackendDuplicate = backendDups?.includes(val.trim().toLowerCase());
//       return (
//         <div key={idx} className="flex items-center gap-6 mb-2">
//           <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
//             {String(idx + 1).padStart(2, "0")}
//           </div>
//           <input
//             type="text"
//             value={val}
//             placeholder={placeholder}
//             disabled={isLoading}
//             onChange={(e) => handleInputChange(fieldName, idx, e.target.value)}
//             className={`w-[350px] py-2 px-4 rounded-[15px] outline-none border ${
//               isBackendDuplicate ? "border-red-500 bg-red-50" : "border-[#8888888c]"
//             }`}
//           />
//           {idx === arr.length - 1 && (
//             <button
//               disabled={isLoading}
//               onClick={() => addField()}
//               className="bg-[#196BA5] text-white text-xl rounded-lg size-7 cursor-pointer"
//             >
//               +
//             </button>
//           )}
//         </div>
//       );
//     });

//   // save specific group
//   // const handleSave = async (type) => {
//   //   try {
//   //     let toSave = {};
//   //     if (type === "specializations")
//   //       toSave = { qualifications: [""], workingDepartments: [""], skills: [""] };
//   //     else if (type === "qualifications")
//   //       toSave = { specializations: [""], workingDepartments: [""], skills: [""] };
//   //     else if (type === "workingDepartments")
//   //       toSave = { specializations: [""], qualifications: [""], skills: [""] };
//   //     else if (type === "skills")
//   //       toSave = { specializations: [""], qualifications: [""], workingDepartments: [""] };

//   //     // temporarily replace other fields with blanks so only one category saves
//   //     const store = useProfessionalsStore.getState();
//   //     useProfessionalsStore.setState({ ...store, ...toSave });

//   //     await saveAllCategories(category);

//   //     if (useProfessionalsStore.getState().success) {
//   //       setLocalMessage(` ${type} saved successfully!`);
//   //     } else {
//   //       setLocalMessage(`Failed to save ${type}`);
//   //     }
//   //   } catch (e) {
//   //     console.error(e);
//   //     setLocalMessage(` Failed to save ${type}`);
//   //   }
//   // };
// const handleSave = async (type) => {
//   try {
//     const store = useProfessionalsStore.getState();

//     // Clear other fields to call API for one type only
//     const tempFields = {
//       specializations: type === "specializations" ? store.specializations : [""],
//       qualifications: type === "qualifications" ? store.qualifications : [""],
//       workingDepartments: type === "workingDepartments" ? store.workingDepartments : [""],
//       skills: type === "skills" ? store.skills : [""],
//     };

//     useProfessionalsStore.setState({ ...store, ...tempFields, error: null, success: false });

//     await saveAllCategories(category);

//     const { backendDuplicates, success, error } = useProfessionalsStore.getState();

//     if (success) {
//       setLocalMessage({ type: "success", text: `${type} saved successfully!` });
//     } else if (backendDuplicates[type] && backendDuplicates[type].length > 0) {
//       setLocalMessage({
//         type: "duplicate",
//         text: `Duplicate ${type} found: ${backendDuplicates[type].join(", ")}`,
//       });
//     } else if (error) {
//       setLocalMessage({ type: "error", text: `Failed to save ${type}: ${error}` });
//     }
//   } catch (e) {
//     console.error(e);
//     setLocalMessage({ type: "error", text: `Failed to save ${type}` });
//   }
// };

//   return (
//     <div>
//       <Navlink />

//       {/* Header */}
//       <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
//         <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
//           <div className="flex items-center gap-[50px]">
//             <h1 className="text-[#3674B5]">Add</h1>
//             <Link
//               href={`/controlpanel/data-manager/professionals-data/reg-nurses/manage-reg-nurses`}
//               className="text-black"
//             >
//               Manage
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Title */}
//       <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
//         <h1 className="text-black font-semibold py-[16px]">Add Reg Nurses</h1>
//       </div>

//       {/* Sections */}
//       <section className="p-6 bg-white mt-4 rounded shadow">
//         <h2 className="text-black font-semibold mb-2">Specialization</h2>
//         {renderInput(
//           specializations,
//           backendDuplicates.specializations,
//           "specializations",
//           addSpecializationField,
//           "Enter Specialization"
//         )}
//         <button
//           onClick={() => handleSave("specializations")}
//           disabled={isLoading}
//           className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-3 cursor-pointer"
//         >
//           Save Specializations
//         </button>
//       </section>

//       <section className="p-6 bg-white mt-4 rounded shadow">
//         <h2 className="text-black font-semibold mb-2">Qualification</h2>
//         {renderInput(
//           qualifications,
//           backendDuplicates.qualifications,
//           "qualifications",
//           addQualificationField,
//           "Enter Qualification"
//         )}
//         <button
//           onClick={() => handleSave("qualifications")}
//           disabled={isLoading}
//           className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-3 cursor-pointer"
//         >
//           Save Qualifications
//         </button>
//       </section>

//       <section className="p-6 bg-white mt-4 rounded shadow">
//         <h2 className="text-black font-semibold mb-2">Working Departments</h2>
//         {renderInput(
//           workingDepartments,
//           backendDuplicates.workingDepartments,
//           "workingDepartments",
//           addWorkingDepartmentField,
//           "Enter Working Department"
//         )}
//         <button
//           onClick={() => handleSave("workingDepartments")}
//           disabled={isLoading}
//           className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-3 cursor-pointer"
//         >
//           Save Working Departments
//         </button>
//       </section>

//       <section className="p-6 bg-white mt-4 rounded shadow">
//         <h2 className="text-black font-semibold mb-2">Skills</h2>
//         {renderInput(skills, backendDuplicates.skills, "skills", addSkillField, "Enter Skill")}
//         <button
//           onClick={() => handleSave("skills")}
//           disabled={isLoading}
//           className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-3 cursor-pointer"
//         >
//           Save Skills
//         </button>
//       </section>

//       {/* Local feedback */}
//     <div className="h-10">
//        {localMessage && (
//   <p
//     className={`font-semibold px-6 my-4 ${
//       localMessage.type === "success"
//         ? "text-blue-600"
//         : localMessage.type === "duplicate"
//         ? "text-red-600"
//         : "text-red-600"
//     }`}
//   >
//     {localMessage.text}
//   </p>
// )}
//     </div>

//     </div>
//   );
// }

// export default AddRegNursesPage;





"use client";
import React, { useEffect, useState } from "react";
import Navlink from "@/components/dataManager/professionalsData.js/Navlink";
import Link from "next/link";
import useProfessionalsStore from "@/app/lib/store/useProfessionalsStore";

function AddRegNursesPage({ category = "REG_NURSES" }) {
  const {
    specializations,
    qualifications,
    workingDepartments,
    skills,
    backendDuplicates,
    isLoading,
    addSpecializationField,
    setSpecializationValue,
    addQualificationField,
    setQualificationValue,
    addWorkingDepartmentField,
    setWorkingDepartmentValue,
    addSkillField,
    setSkillValue,
    saveAllCategories,
  } = useProfessionalsStore();

  // Local messages per field type
  const [localMessages, setLocalMessages] = useState({
    specializations: null,
    qualifications: null,
    workingDepartments: null,
    skills: null,
  });

  const handleInputChange = (field, idx, value) => {
    if (field === "specializations") setSpecializationValue(idx, value);
    else if (field === "qualifications") setQualificationValue(idx, value);
    else if (field === "workingDepartments") setWorkingDepartmentValue(idx, value);
    else if (field === "skills") setSkillValue(idx, value);
  };

  // Render input with backend duplicates highlighted
  const renderInput = (arr, backendDups, fieldName, addField, placeholder) =>
    arr.map((val, idx) => {
      const isBackendDuplicate = backendDups?.includes(val.trim().toLowerCase());
      return (
        <div key={idx} className="flex items-center gap-6 mb-2">
          <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
            {String(idx + 1).padStart(2, "0")}
          </div>
          <input
            type="text"
            value={val}
            placeholder={placeholder}
            disabled={isLoading}
            onChange={(e) => handleInputChange(fieldName, idx, e.target.value)}
            className={`w-[350px] py-2 px-4 rounded-[15px] outline-none border ${
              isBackendDuplicate ? "border-red-500 bg-red-50" : "border-[#8888888c]"
            }`}
          />
          {idx === arr.length - 1 && (
            <button
              disabled={isLoading}
              onClick={() => addField()}
              className="bg-[#196BA5] text-white text-xl rounded-lg size-7 cursor-pointer"
            >
              +
            </button>
          )}
        </div>
      );
    });

  // Save specific group and show message under that button
  const handleSave = async (type) => {
    try {
      const store = useProfessionalsStore.getState();

      // Clear other fields to call API for one type only
      const tempFields = {
        specializations: type === "specializations" ? store.specializations : [""],
        qualifications: type === "qualifications" ? store.qualifications : [""],
        workingDepartments: type === "workingDepartments" ? store.workingDepartments : [""],
        skills: type === "skills" ? store.skills : [""],
      };

      useProfessionalsStore.setState({ ...store, ...tempFields, error: null, success: false });

      await saveAllCategories(category);

      const { backendDuplicates, success, error } = useProfessionalsStore.getState();

      if (success) {
        setLocalMessages((prev) => ({
          ...prev,
          [type]: { type: "success", text: `${type} saved successfully!` },
        }));
      } else if (backendDuplicates[type] && backendDuplicates[type].length > 0) {
        setLocalMessages((prev) => ({
          ...prev,
          [type]: { type: "duplicate", text: `Duplicate ${type} found: ${backendDuplicates[type].join(", ")}` },
        }));
      } else if (error) {
        setLocalMessages((prev) => ({
          ...prev,
          [type]: { type: "error", text: `Failed to save ${type}: ${error}` },
        }));
      }

      // Clear message after 4s
      setTimeout(() => setLocalMessages((prev) => ({ ...prev, [type]: null })), 4000);
    } catch (e) {
      console.error(e);
      setLocalMessages((prev) => ({ ...prev, [type]: { type: "error", text: `Failed to save ${type}` } }));
    }
  };

  return (
    <div>
      <Navlink />

      {/* Header */}
      <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
          <div className="flex items-center gap-[50px]">
            <h1 className="text-[#3674B5]">Add</h1>
            <Link
              href={`/controlpanel/data-manager/professionals-data/reg-nurses/manage-reg-nurses`}
              className="text-black"
            >
              Manage
            </Link>
          </div>
        </div>
      </div>

      {/* Page Title */}
      <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
        <h1 className="text-black font-semibold py-[16px]">Add Reg Nurses</h1>
      </div>

      {/* Specializations */}
      <section className="p-6 bg-white mt-4 rounded shadow">
        <h2 className="text-black font-semibold mb-2">Specialization</h2>
        {renderInput(
          specializations,
          backendDuplicates.specializations,
          "specializations",
          addSpecializationField,
          "Enter Specialization"
        )}
        <button
          onClick={() => handleSave("specializations")}
          disabled={isLoading}
          className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-3 cursor-pointer"
        >
          Save Specializations
        </button>
        {localMessages.specializations && (
          <p
            className={`font-semibold px-6 my-2 ${
              localMessages.specializations.type === "success" ? "text-blue-600" : "text-red-600"
            }`}
          >
            {localMessages.specializations.text}
          </p>
        )}
      </section>

      {/* Qualifications */}
      <section className="p-6 bg-white mt-4 rounded shadow">
        <h2 className="text-black font-semibold mb-2">Qualification</h2>
        {renderInput(
          qualifications,
          backendDuplicates.qualifications,
          "qualifications",
          addQualificationField,
          "Enter Qualification"
        )}
        <button
          onClick={() => handleSave("qualifications")}
          disabled={isLoading}
          className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-3 cursor-pointer"
        >
          Save Qualifications
        </button>
        {localMessages.qualifications && (
          <p
            className={`font-semibold px-6 my-2 ${
              localMessages.qualifications.type === "success" ? "text-blue-600" : "text-red-600"
            }`}
          >
            {localMessages.qualifications.text}
          </p>
        )}
      </section>

      {/* Working Departments */}
      <section className="p-6 bg-white mt-4 rounded shadow">
        <h2 className="text-black font-semibold mb-2">Working Departments</h2>
        {renderInput(
          workingDepartments,
          backendDuplicates.workingDepartments,
          "workingDepartments",
          addWorkingDepartmentField,
          "Enter Working Department"
        )}
        <button
          onClick={() => handleSave("workingDepartments")}
          disabled={isLoading}
          className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-3 cursor-pointer"
        >
          Save Working Departments
        </button>
        {localMessages.workingDepartments && (
          <p
            className={`font-semibold px-6 my-2 ${
              localMessages.workingDepartments.type === "success" ? "text-blue-600" : "text-red-600"
            }`}
          >
            {localMessages.workingDepartments.text}
          </p>
        )}
      </section>

      {/* Skills */}
      <section className="p-6 bg-white mt-4 rounded shadow mb-4">
        <h2 className="text-black font-semibold mb-2">Skills</h2>
        {renderInput(skills, backendDuplicates.skills, "skills", addSkillField, "Enter Skill")}
        <button
          onClick={() => handleSave("skills")}
          disabled={isLoading}
          className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-3 cursor-pointer"
        >
          Save Skills
        </button>
        {localMessages.skills && (
          <p
            className={`font-semibold px-6 my-2 ${
              localMessages.skills.type === "success" ? "text-blue-600" : "text-red-600"
            }`}
          >
            {localMessages.skills.text}
          </p>
        )}
      </section>
    </div>
  );
}

export default AddRegNursesPage;
