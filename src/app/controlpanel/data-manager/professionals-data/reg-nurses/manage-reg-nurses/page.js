// "use client"
// import EditPopup from "@/components/dataManager/generalData/EditPopup";
// import Navlink from "@/components/dataManager/professionalsData.js/Navlink";
// import Link from "next/link";
// import React, { useState } from "react";

// function page() {
//   const [isPopupOpen,setIsPopupOpen] = useState(false);
//   return (
//     <div>
//       <Navlink/>
//             <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex items-center gap-6 py-6 px-6 rounded-[15px] mt-2">
//         <h1 className="text-[#3674B5]">Specialization</h1>
//         <h1 className="text-[#000000]">Qualification</h1>
//         <h1 className="text-[#000000]">Working Departments</h1>

//         <h1 className="text-[#000000]">Skills</h1>
//       </div>
//       <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
//         <div className="w-full flex item-center justify-between pt-[23px] pb-[19px]">
//           <div className=" flex items-center gap-[50px]">
//             <Link href={" /controlpanel/data-manager/professionals-data/reg-nurses/add-reg-nurses"} className="text-black">Add</Link>

//             <h1 className="text-[#3674B5]">Manage</h1>
//           </div>

//         </div>
//       </div>

//       <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
// <h1 className="text-black font-semibold py-[16px] ">Manage Reg-Nurses</h1>
//       </div>
//       <div className="bg-white flex  items-center gap-2 px-6 py-2 mt-2">
//         <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">01</div>
//             <input type="text" className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none" placeholder="Enter Reg-Nurses"/>
//             <input type="checkbox" className="size-6 rounded-[15px]" />

//       </div>
//        <div className="bg-white flex  items-center gap-2 px-6 py-2 mt-2">
//         <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">02</div>
//             <input type="text" className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none" placeholder="Enter Reg-Nurses"/>
//             <input type="checkbox" className="size-6 rounded-[15px]" />

//       </div>
//      <div className="flex gap-3">
//        <button className="bg-[#196BA5] text-white  rounded-[15px] py-2 px-10 mt-2 cursor-pointer "
//        onClick={()=> setIsPopupOpen(true)}
//        >
//             Edit
//           </button>
//           <button className="bg-[#196BA5] text-white  rounded-[15px] py-2 px-10 mt-2 cursor-pointer">
//             Remove
//           </button>
//      </div>

//      {
//       isPopupOpen && (
//         <EditPopup
//         heading={"Reg-Nurses"}
//         onClose={()=>setIsPopupOpen(false)}
//         />
//       )
//      }

//     </div>
//   );
// }

// export default page;

// "use client";

// import React, { useEffect, useState } from "react";
// import Navlink from "@/components/dataManager/professionalsData.js/Navlink";
// import Link from "next/link";
// import EditPopup from "@/components/dataManager/generalData/EditPopup";
// import useManageProfessionalsStore from "@/app/lib/store/useManageProfessionalsStore";

// function ManageProfessionalsPage({ category = "specializations" }) {

//   const {
//     listedItems,
//     pagination,
//     isLoading,
//     error,
//     success,
//     fetchItems,
//     setPage,
//     updateItemById,
//     deleteItemById,
//     resetSuccess,
//     clearError,
//   } = useManageProfessionalsStore();

//   const [checkedId, setCheckedId] = useState(null);
//   const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
//   const [editValue, setEditValue] = useState("");
//   const [apiError, setApiError] = useState("");

//   useEffect(() => {
//     fetchItems(category, pagination[category].page, pagination[category].limit);
//   }, [category, pagination[category].page, pagination[category].limit, fetchItems]);

//   const handleCheckboxChange = (id) => {
//     setCheckedId(checkedId === id ? null : id);
//     setApiError("");
//   };

//   // Sync edit value with selected id
//   useEffect(() => {
//     if (checkedId) {
//       const selectedItem = listedItems[category].find((i) => i.id === checkedId);
//       if (!selectedItem) return;
//       // Select proper field name for value to edit per category
//       let valKey;
//       switch (category) {
//         case "specializations":
//           valKey = "specialization";
//           break;
//         case "qualifications":
//           valKey = "qualification";
//           break;
//         case "working-departments":
//           valKey = "workingDepartment";
//           break;
//         case "skills":
//           valKey = "skill";
//           break;
//         default:
//           valKey = "";
//       }
//       setEditValue(selectedItem[valKey] || "");
//     } else {
//       setEditValue("");
//     }
//   }, [checkedId, listedItems, category]);

//   const handleUpdate = async () => {
//     if (!checkedId) return;
//     setApiError("");
//     try {
//       // Send update object dynamically keyed by category
//       const objKey = {
//         specializations: "specialization",
//         qualifications: "qualification",
//         "working-departments": "workingDepartment",
//         skills: "skill",
//       }[category];
//       await updateItemById(category, checkedId, { [objKey]: editValue, category: category.toUpperCase() });
//       setIsEditPopupOpen(false);
//       setCheckedId(null);
//       resetSuccess();
//     } catch (err) {
//       setApiError(err.message || "Error updating item.");
//     }
//   };

//   const handleDelete = async () => {
//     if (!checkedId) return;
//     await deleteItemById(category, checkedId);
//     setCheckedId(null);
//   };

//   return (
//     <div>
//       <Navlink />
//       <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
//         <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
//           <div className="flex items-center gap-[50px]">
//             <Link href={`/controlpanel/data-manager/professionals-data/${category}/add-${category}`} className="text-black">Add</Link>
//             <h1 className="text-[#3674B5] capitalize">{category.replace(/-/g, " ")}</h1>
//           </div>
//           <div>
//             {/* Optional global controls */}
//           </div>
//         </div>
//       </div>

//       <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
//         <h1 className="text-black font-semibold py-[16px] capitalize">
//           Manage {category.replace(/-/g, " ")}
//         </h1>
//       </div>

//       {isLoading ? (
//         <p className="mt-4 px-6">Loading...</p>
//       ) : error ? (
//         <p className="mt-4 px-6 text-red-600">{error}</p>
//       ) : (
//         <>
//           {listedItems[category].map((item, idx) => (
//             <div key={item.id} className="bg-white flex items-center gap-2 px-6 py-2 mt-2">
//               <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
//                 {String(idx + 1 + (pagination[category].page - 1) * pagination[category].limit).padStart(2, "0")}
//               </div>
//               <input
//                 type="text"
//                 value={
//                   category === "specializations"
//                     ? item.specialization
//                     : category === "qualifications"
//                     ? item.qualification
//                     : category === "working-departments"
//                     ? item.workingDepartment
//                     : item.skill
//                 }
//                 className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
//                 readOnly
//               />
//               <input
//                 type="checkbox"
//                 checked={checkedId === item.id}
//                 onChange={() => handleCheckboxChange(item.id)}
//                 className="size-6 rounded-[15px]"
//               />
//             </div>
//           ))}

//           {/* Pagination */}
//           <div className="flex justify-center items-center gap-2 mt-4 px-6">
//             <button
//               disabled={pagination[category].page <= 1}
//               onClick={() => setPage(category, pagination[category].page - 1)}
//               className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <span>
//               Page {pagination[category].page} of {pagination[category].totalPages}
//             </span>
//             <button
//               disabled={pagination[category].page >= pagination[category].totalPages}
//               onClick={() => setPage(category, pagination[category].page + 1)}
//               className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>

//           <div className="flex gap-3 mt-4 px-6">
//             <button
//               disabled={!checkedId}
//               onClick={() => setIsEditPopupOpen(true)}
//               className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 cursor-pointer"
//             >
//               Edit
//             </button>
//             <button
//               disabled={!checkedId}
//               onClick={handleDelete}
//               className="bg-[#d9534f] text-white rounded-[15px] py-2 px-10 cursor-pointer"
//             >
//               Remove
//             </button>
//           </div>

//           {isEditPopupOpen && (
//             <EditPopup
//               heading={`${category.replace(/-/g, " ")} Edit`}
//               value={editValue}
//               onChange={setEditValue}
//               onUpdate={handleUpdate}
//               onClose={() => {
//                 setIsEditPopupOpen(false);
//                 setApiError("");
//               }}
//               apiError={apiError}
//             />
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default ManageProfessionalsPage;

// "use client";

// import React, { useEffect, useState } from "react";
// import Navlink from "@/components/dataManager/professionalsData.js/Navlink";
// import Link from "next/link";
// import EditPopup from "@/components/dataManager/generalData/EditPopup";
// import useManageProfessionalsStore from "@/app/lib/store/useManageProfessionalsStore";

// function ManageProfessionalsPage() {
//   // Categories to display & use as keys matching your store/API
//   const categories = [
//     { key: "specializations", label: "Specialization" },
//     { key: "qualifications", label: "Qualification" },
//     { key: "working-departments", label: "Working Departments" },
//     { key: "skills", label: "Skills" },
//   ];

//   const [selectedCategory, setSelectedCategory] = useState(categories[0].key);

//   const {
//     listedItems,
//     pagination,
//     isLoading,
//     error,
//     success,
//     fetchItems,
//     setPage,
//     updateItemById,
//     deleteItemById,
//     resetSuccess,
//   } = useManageProfessionalsStore();

//   const [checkedId, setCheckedId] = useState(null);
//   const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
//   const [editValue, setEditValue] = useState("");
//   const [apiError, setApiError] = useState("");

//   // Fetch list when selectedCategory or pagination changes
//   useEffect(() => {
//     fetchItems(selectedCategory, pagination[selectedCategory].page, pagination[selectedCategory].limit);
//     setCheckedId(null); // Clear selection on category switch
//   }, [selectedCategory, pagination[selectedCategory].page, pagination[selectedCategory].limit, fetchItems]);

//   // Sync edit value with selection
//   useEffect(() => {
//     if (checkedId) {
//       const selectedItem = listedItems[selectedCategory].find((i) => i.id === checkedId);
//       if (!selectedItem) return;
//       const keyMap = {
//         specializations: "specialization",
//         qualifications: "qualification",
//         "working-departments": "workingDepartment",
//         skills: "skill",
//       };
//       setEditValue(selectedItem[keyMap[selectedCategory]] || "");
//     } else {
//       setEditValue("");
//     }
//   }, [checkedId, listedItems, selectedCategory]);

//   const handleCheckboxChange = (id) => {
//     setCheckedId(checkedId === id ? null : id);
//     setApiError("");
//   };

//   const handleUpdate = async () => {
//     if (!checkedId) return;
//     setApiError("");
//     try {
//       const keyMap = {
//         specializations: "specialization",
//         qualifications: "qualification",
//         "working-departments": "workingDepartment",
//         skills: "skill",
//       };
//       await updateItemById(selectedCategory, checkedId, { [keyMap[selectedCategory]]: editValue, category: selectedCategory.toUpperCase() });
//       setIsEditPopupOpen(false);
//       setCheckedId(null);
//       resetSuccess();
//     } catch (err) {
//       setApiError(err.message || "Error updating item.");
//     }
//   };

//   const handleDelete = async () => {
//     if (!checkedId) return;
//     await deleteItemById(selectedCategory, checkedId);
//     setCheckedId(null);
//   };

//   return (
//     <div>
//       <Navlink />

//       <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex items-center gap-6 py-6 px-6 rounded-[15px] mt-2">
//         {categories.map(({ key, label }) => (
//           <h1
//             key={key}
//             className={`cursor-pointer font-semibold ${
//               selectedCategory === key ? "text-[#3674B5]" : "text-[#000000]"
//             }`}
//             onClick={() => setSelectedCategory(key)}
//           >
//             {label}
//           </h1>
//         ))}
//       </div>

//       <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
//         <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
//           <div className="flex items-center gap-[50px]">
//             <Link
//               href={`/controlpanel/data-manager/professionals-data/reg-nurses/add-reg-nurses`}
//               className="text-black"
//             >
//               Add
//             </Link>
//             <h1 className="text-[#3674B5] ">Manage</h1>
//           </div>
//         </div>
//       </div>

//       {isLoading ? (
//         <p className="mt-4 px-6">Loading...</p>
//       ) : error ? (
//         <p className="mt-4 px-6 text-red-600">{error}</p>
//       ) : (
//         <>
//           {listedItems[selectedCategory]?.map((item, idx) => (
//             <div key={item.id} className="bg-white flex items-center gap-2 px-6 py-2 mt-2">
//               <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
//                 {(idx + 1 + (pagination[selectedCategory].page - 1) * pagination[selectedCategory].limit)
//                   .toString()
//                   .padStart(2, "0")}
//               </div>
//               <input
//                 type="text"
//                 className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
//                 value={
//                   selectedCategory === "specializations"
//                     ? item.specialization
//                     : selectedCategory === "qualifications"
//                     ? item.qualification
//                     : selectedCategory === "working-departments"
//                     ? item.workingDepartment
//                     : item.skill
//                 }
//                 readOnly
//               />
//               <input
//                 type="checkbox"
//                 checked={checkedId === item.id}
//                 onChange={() => handleCheckboxChange(item.id)}
//                 className="size-6 rounded-[15px]"
//               />
//             </div>
//           ))}

//           {/* Pagination */}
//           <div className="flex justify-center items-center gap-2 mt-4 px-6">
//             <button
//               disabled={pagination[selectedCategory].page <= 1}
//               onClick={() => setPage(selectedCategory, pagination[selectedCategory].page - 1)}
//               className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <span>
//               Page {pagination[selectedCategory].page} of {pagination[selectedCategory].totalPages}
//             </span>
//             <button
//               disabled={pagination[selectedCategory].page >= pagination[selectedCategory].totalPages}
//               onClick={() => setPage(selectedCategory, pagination[selectedCategory].page + 1)}
//               className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>

//           <div className="flex gap-3 mt-4 px-6">
//             <button
//               disabled={!checkedId}
//               onClick={() => setIsEditPopupOpen(true)}
//               className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 cursor-pointer"
//             >
//               Edit
//             </button>
//             <button
//               disabled={!checkedId}
//               onClick={handleDelete}
//               className="bg-[#d9534f] text-white rounded-[15px] py-2 px-10 cursor-pointer"
//             >
//               Remove
//             </button>
//           </div>

//           {isEditPopupOpen && (
//             <EditPopup
//               heading={`${selectedCategory.replace(/-/g, " ")} Edit`}
//               value={editValue}
//               onChange={setEditValue}
//               onUpdate={handleUpdate}
//               onClose={() => {
//                 setIsEditPopupOpen(false);
//                 setApiError("");
//               }}
//               apiError={apiError}
//             />
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default ManageProfessionalsPage;

// "use client";

// import React, { useEffect, useState } from "react";
// import Navlink from "@/components/dataManager/professionalsData.js/Navlink";
// import Link from "next/link";
// import EditPopup from "@/components/dataManager/generalData/EditPopup";
// import useManageProfessionalsStore from "@/app/lib/store/useManageProfessionalsStore";

// function ManageProfessionalsPage() {
//   const professionalCategory = "REG_NURSES";

//   const categories = [
//     { key: "specializations", label: "Specialization" },
//     { key: "qualifications", label: "Qualification" },
//     { key: "working-departments", label: "Working Departments" },
//     { key: "skills", label: "Skills" },
//   ];

//   const [selectedCategory, setSelectedCategory] = useState(categories[0].key);

//   const {
//     listedItems,
//     pagination,
//     isLoading,
//     error,
//     success,
//     fetchItems,
//     setPage,
//     updateItemById,
//     deleteItemById,
//     resetSuccess,
//   } = useManageProfessionalsStore();

//   const [checkedId, setCheckedId] = useState(null);
//   const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
//   const [editValue, setEditValue] = useState("");
//   const [apiError, setApiError] = useState("");

//   useEffect(() => {
//     fetchItems(
//       selectedCategory,
//       pagination[selectedCategory].page,
//       pagination[selectedCategory].limit,
//       professionalCategory
//     );
//     setCheckedId(null);
//   }, [
//     selectedCategory,
//     pagination[selectedCategory].page,
//     pagination[selectedCategory].limit,
//     fetchItems,
//     professionalCategory,
//   ]);

//   useEffect(() => {
//     if (checkedId) {
//       const selectedItem = listedItems[selectedCategory].find((i) => i.id === checkedId);
//       if (!selectedItem) return;
//       const keyMap = {
//         specializations: "specialization",
//         qualifications: "qualification",
//         "working-departments": "workingDepartment",
//         skills: "skill",
//       };
//       setEditValue(selectedItem[keyMap[selectedCategory]] || "");
//     } else {
//       setEditValue("");
//     }
//   }, [checkedId, listedItems, selectedCategory]);

//   const handleCheckboxChange = (id) => {
//     setCheckedId(checkedId === id ? null : id);
//     setApiError("");
//   };

//   const handleUpdate = async () => {
//     if (!checkedId) return;
//     setApiError("");
//     try {
//       const keyMap = {
//         specializations: "specialization",
//         qualifications: "qualification",
//         "working-departments": "workingDepartment",
//         skills: "skill",
//       };
//       await updateItemById(selectedCategory, checkedId, {
//         [keyMap[selectedCategory]]: editValue,
//         category: professionalCategory,
//       });
//       setIsEditPopupOpen(false);
//       setCheckedId(null);
//       resetSuccess();
//     } catch (err) {
//       setApiError(err.message || "Error updating item.");
//     }
//   };
// const handleDelete = async () => {
//   if (!checkedId) return;
//   try {
//     await deleteItemById(selectedCategory, checkedId, professionalCategory);
//     setCheckedId(null);
//   } catch (err) {
//     // Optionally show error to user
//     console.error("Delete failed", err);
//   }
// };

//   return (
//     <div>
//       <Navlink />

//       <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex items-center gap-6 py-6 px-6 rounded-[15px] mt-2">
//         {categories.map(({ key, label }) => (
//           <h1
//             key={key}
//             className={`cursor-pointer font-semibold ${
//               selectedCategory === key ? "text-[#3674B5]" : "text-[#000000]"
//             }`}
//             onClick={() => setSelectedCategory(key)}
//           >
//             {label}
//           </h1>
//         ))}
//       </div>

//       <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
//         <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
//           <div className="flex items-center gap-[50px]">
//             <Link
//               href={`/controlpanel/data-manager/professionals-data/${selectedCategory}/add-${selectedCategory}`}
//               className="text-black"
//             >
//               Add
//             </Link>
//             <h1 className="text-[#3674B5] capitalize">{selectedCategory.replace(/-/g, " ")}</h1>
//           </div>
//         </div>
//       </div>

//       <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
//         <h1 className="text-black font-semibold py-[16px] capitalize">
//           Manage {selectedCategory.replace(/-/g, " ")}
//         </h1>
//       </div>

//       {isLoading ? (
//         <p className="mt-4 px-6">Loading...</p>
//       ) : error ? (
//         <p className="mt-4 px-6 text-red-600">{error}</p>
//       ) : (
//         <>
//           {listedItems[selectedCategory]?.map((item, idx) => (
//             <div key={item.id} className="bg-white flex items-center gap-2 px-6 py-2 mt-2">
//               <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
//                 {(idx + 1 + (pagination[selectedCategory].page - 1) * pagination[selectedCategory].limit)
//                   .toString()
//                   .padStart(2, "0")}
//               </div>
//               <input
//                 type="text"
//                 className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
//                 value={
//                   selectedCategory === "specializations"
//                     ? item.specialization
//                     : selectedCategory === "qualifications"
//                     ? item.qualification
//                     : selectedCategory === "working-departments"
//                     ? item.workingDepartment
//                     : item.skill
//                 }
//                 readOnly
//               />
//               <input
//                 type="checkbox"
//                 checked={checkedId === item.id}
//                 onChange={() => handleCheckboxChange(item.id)}
//                 className="size-6 rounded-[15px]"
//               />
//             </div>
//           ))}

//           <div className="flex justify-center items-center gap-2 mt-4 px-6">
//             <button
//               disabled={pagination[selectedCategory].page <= 1}
//               onClick={() => setPage(selectedCategory, pagination[selectedCategory].page - 1)}
//               className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <span>
//               Page {pagination[selectedCategory].page} of {pagination[selectedCategory].totalPages}
//             </span>
//             <button
//               disabled={pagination[selectedCategory].page >= pagination[selectedCategory].totalPages}
//               onClick={() => setPage(selectedCategory, pagination[selectedCategory].page + 1)}
//               className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>

//           <div className="flex gap-3 mt-4 px-6">
//             <button
//               disabled={!checkedId}
//               onClick={() => setIsEditPopupOpen(true)}
//               className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 cursor-pointer"
//             >
//               Edit
//             </button>
//            <button
//   disabled={!checkedId}
//   onClick={handleDelete}
//   className="bg-[#d9534f] text-white rounded-[15px] py-2 px-10 cursor-pointer"
// >
//   Remove
// </button>

//           </div>

//           {isEditPopupOpen && (
//             <EditPopup
//               heading={`${selectedCategory.replace(/-/g, " ")} Edit`}
//               value={editValue}
//               onChange={setEditValue}
//               onUpdate={handleUpdate}
//               onClose={() => {
//                 setIsEditPopupOpen(false);
//                 setApiError("");
//               }}
//               apiError={apiError}
//             />
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default ManageProfessionalsPage;

"use client";

import React, { useEffect, useState } from "react";
import Navlink from "@/components/dataManager/professionalsData.js/Navlink";
import Link from "next/link";
import EditPopup from "@/components/dataManager/generalData/EditPopup";
import useManageProfessionalsStore from "@/app/lib/store/useManageProfessionalsStore";

function ManageProfessionalsPage() {
  const professionalCategory = "REG_NURSES";

  const categories = [
    { key: "specializations", label: "Specialization" },
    { key: "qualifications", label: "Qualification" },
    { key: "working-departments", label: "Working Departments" },
    { key: "skills", label: "Skills" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0].key);

  const {
    listedItems,
    pagination,
    isLoading,
    error,
    success,
    fetchItems,
    setPage,
    updateItemById,
    deleteItemById,
    resetSuccess,
  } = useManageProfessionalsStore();

  const [checkedId, setCheckedId] = useState(null);
  const [checkedName, setCheckedName] = useState("");
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [apiError, setApiError] = useState("");

 useEffect(() => {
  fetchItems(
    selectedCategory,
    pagination[selectedCategory].page,
    pagination[selectedCategory].limit,
     professionalCategory  
  );
  setCheckedId(null);
  setCheckedName("");
}, [selectedCategory, pagination[selectedCategory].page, pagination[selectedCategory].limit, fetchItems, professionalCategory]);


  useEffect(() => {
    if (checkedId) {
      const selectedItem = listedItems[selectedCategory].find(
        (i) => i.id === checkedId
      );
      if (!selectedItem) return;
      const keyMap = {
        specializations: "specialization",
        qualifications: "qualification",
        "working-departments": "workingDepartment",
        skills: "skill",
      };
      setEditValue(selectedItem[keyMap[selectedCategory]] || "");
      setCheckedName(selectedItem[keyMap[selectedCategory]] || "");
    } else {
      setEditValue("");
      setCheckedName("");
    }
  }, [checkedId, listedItems, selectedCategory]);

  const handleCheckboxChange = (id) => {
    setCheckedId(checkedId === id ? null : id);
    setApiError("");
  };

  const handleUpdate = async () => {
    if (!checkedId) return;
    setApiError("");
    try {
      const keyMap = {
        specializations: "specialization",
        qualifications: "qualification",
        "working-departments": "workingDepartment",
        skills: "skill",
      };
      await updateItemById(selectedCategory, checkedId, {
        [keyMap[selectedCategory]]: editValue,
        category: professionalCategory,
      });
      setIsEditPopupOpen(false);
      setCheckedId(null);
      resetSuccess();
    } catch (err) {
      setApiError(err.message || "Error updating item.");
    }
  };

  const handleDelete = async () => {
    if (!checkedId) return;
    try {
      await deleteItemById(selectedCategory, checkedId, professionalCategory);
      setCheckedId(null);
      setIsDeleteConfirmOpen(false);
    } catch (err) {
      console.error("Delete failed", err);
      setApiError(err.message || "Error deleting item.");
    }
  };

  return (
    <div>
      <Navlink />

      <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex items-center gap-6 py-6 px-6 rounded-[15px] mt-2">
        {categories.map(({ key, label }) => (
          <h1
            key={key}
            className={`cursor-pointer font-semibold ${
              selectedCategory === key ? "text-[#3674B5]" : "text-[#000000]"
            }`}
            onClick={() => setSelectedCategory(key)}
          >
            {label}
          </h1>
        ))}
      </div>

      <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
          <div className="flex items-center gap-[50px]">
            <Link
              href={`/controlpanel/data-manager/professionals-data/reg-nurses/add-reg-nurses`}
              className="text-black"
            >
              Add
            </Link>
            <h1 className="text-[#3674B5] ">Manage</h1>
          </div>
        </div>
      </div>

      {isLoading ? (
        <p className="mt-4 px-6">Loading...</p>
      ) : error ? (
        <p className="mt-4 px-6 text-red-600">{error}</p>
      ) : (
        <>
          {listedItems[selectedCategory]?.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white flex items-center gap-2 px-6 py-2 mt-2"
            >
              <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
                {(
                  idx +
                  1 +
                  (pagination[selectedCategory].page - 1) *
                    pagination[selectedCategory].limit
                )
                  .toString()
                  .padStart(2, "0")}
              </div>
              <input
                type="text"
                className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
                value={
                  selectedCategory === "specializations"
                    ? item.specialization
                    : selectedCategory === "qualifications"
                    ? item.qualification
                    : selectedCategory === "working-departments"
                    ? item.workingDepartment
                    : item.skill
                }
                readOnly
              />
              <input
                type="checkbox"
                checked={checkedId === item.id}
                onChange={() => handleCheckboxChange(item.id)}
                className="size-6 rounded-[15px]"
              />
            </div>
          ))}

          <div className="flex justify-center items-center gap-2 mt-4 px-6">
            <button
              disabled={pagination[selectedCategory].page <= 1}
              onClick={() =>
                setPage(selectedCategory, pagination[selectedCategory].page - 1)
              }
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {pagination[selectedCategory].page} of{" "}
              {pagination[selectedCategory].totalPages}
            </span>
            <button
              disabled={
                pagination[selectedCategory].page >=
                pagination[selectedCategory].totalPages
              }
              onClick={() =>
                setPage(selectedCategory, pagination[selectedCategory].page + 1)
              }
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <div className="flex gap-3 mt-4 px-6">
            <button
              disabled={!checkedId}
              onClick={() => setIsEditPopupOpen(true)}
              className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 cursor-pointer"
            >
              Edit
            </button>
            <button
              disabled={!checkedId}
              onClick={() => setIsDeleteConfirmOpen(true)}
              className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 cursor-pointer"
            >
              Remove
            </button>
          </div>

          {isEditPopupOpen && (
            <EditPopup
              heading={`${selectedCategory.replace(/-/g, " ")} `}
              value={editValue}
              onChange={setEditValue}
              onUpdate={handleUpdate}
              onClose={() => {
                setIsEditPopupOpen(false);
                setApiError("");
              }}
              apiError={apiError}
            />
          )}

          {isDeleteConfirmOpen && (
            <ConfirmDeletePopup
              itemName={checkedName}
              onConfirm={handleDelete}
              onCancel={() => setIsDeleteConfirmOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

function ConfirmDeletePopup({ onConfirm, onCancel, itemName }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1b1a1a74] backdrop-blur-xs z-50">
      <div className="bg-white rounded-lg p-6 w-[320px]">
        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
        <p className="mb-6">
          Are you sure you want to delete <strong>{itemName}</strong>?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageProfessionalsPage;
