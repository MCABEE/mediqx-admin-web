// "use client"
// import EditPopup from "@/components/dataManager/generalData/EditPopup";
// import Navlink from "@/components/dataManager/generalData/Navlink";
// import Link from "next/link";
// import React, { useState } from "react";

// function page() {
//   const [isPopupOpen,setIsPopupOpen] = useState(false);
//   return (
//     <div>
//       <Navlink />
//       <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
//         <div className="w-full flex item-center justify-between pt-[23px] pb-[19px]">
//           <div className=" flex items-center gap-[50px]">
//             <Link href={" /controlpanel/data-manager/general-data/districts/add-districts"} className="text-black">Add</Link>

//             <h1 className="text-[#3674B5]">Manage</h1>
//           </div>
         
//         </div>
//       </div>

//       <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
// <h1 className="text-black font-semibold py-[16px] ">Manage Districts</h1>
//       </div>
//         <div className="bg-white  px-6 py-2 mt-2">
//             <select className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none">
//                 <option value="">Select State</option>
//                 <option value="">Kerala</option>
//             </select>
        
//       </div>
//       <div className="bg-white flex  items-center gap-2 px-6 py-2 mt-2">
//         <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">01</div>
//             <input type="text" className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"/>
//             <input type="checkbox" className="size-6 rounded-[15px]" />

//       </div>
//        <div className="bg-white flex  items-center gap-2 px-6 py-2 mt-2">
//         <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">02</div>
//             <input type="text" className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none" />
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
//         heading={"District"} 
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
// import useDistrictStore from "@/app/lib/store/districtsStore";
// import Navlink from "@/components/dataManager/generalData/Navlink";
// import Link from "next/link";
// import EditPopup from "@/components/dataManager/generalData/EditPopup";

// function ConfirmDeletePopup({ id, districtName, onConfirm, onCancel }) {
//   return (
//     <div className="fixed inset-0 bg-[#4f4f4f4c] backdrop-blur-sm flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-2xl shadow-md w-[350px]">
//         <h2 className="font-semibold text-lg mb-4">Confirm Deletion</h2>
//         <p>
//           Are you sure you want to delete the district{" "}
//           <strong>{districtName}</strong>?
//         </p>
//         <div className="mt-6 flex justify-end gap-3">
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 border rounded hover:bg-gray-100"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ManageDistrictsPage() {
//   const {
//     listedDistricts,
//     isLoading,
//     error,
//     success,
//     page,
//     totalPages,
//     fetchDistricts,
//     setPage,
//     checkedIds,
//     toggleCheckedId,
//     updateDistrictById,
//     deleteDistrictById,
//     statesList,
//     fetchStates,
//     isStatesLoading,
//     statesPage,
//     statesTotalPages,
//     resetSuccess,
//   } = useDistrictStore();

//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
//   const [editName, setEditName] = useState("");
//   const [editStateId, setEditStateId] = useState("");
//   const [apiError, setApiError] = useState("");

//   useEffect(() => {
//     fetchDistricts(page);
//     fetchStates(1);
//   }, [page, fetchDistricts, fetchStates]);

//   // When selecting a district checkbox
//   const handleCheckbox = (id) => {
//     toggleCheckedId(id);
//   };

//   // Synchronize edit inputs when selected changes
//   useEffect(() => {
//     if (checkedIds.length === 1) {
//       const selected = listedDistricts.find((d) => d.id === checkedIds[0]);
//       setEditName(selected?.name || "");
//       setEditStateId(selected?.stateId || "");
//       setApiError("");
//     } else {
//       setEditName("");
//       setEditStateId("");
//       setApiError("");
//     }
//   }, [checkedIds, listedDistricts]);

//   const handleUpdate = async () => {
//     if (checkedIds.length !== 1) return;
//     setApiError("");
//     try {
//       await updateDistrictById(checkedIds[0], { name: editName, stateId: editStateId });
//       setIsEditOpen(false);
//     } catch (error) {
//       setApiError(error.message || "Update failed");
//     }
//   };

//   const handleDeleteConfirm = async () => {
//     if (checkedIds.length !== 1) return;
//     await deleteDistrictById(checkedIds[0]);
//     setIsDeleteConfirmOpen(false);
//   };

//   return (
//     <div>
//       <Navlink />
//       <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
//         <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
//           <div className="flex item-center gap-[50px]">
//             <Link
//               href={"/controlpanel/data-manager/general-data/districts/add-districts"}
//               className="text-black"
//             >
//               Add
//             </Link>
//             <h1 className="text-[#3674B5]">Manage</h1>
//           </div>
//         </div>
//       </div>

//       <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
//         <h1 className="text-black font-semibold py-[16px]">Manage Districts</h1>
//       </div>

//       {isLoading ? (
//         <div className="px-6 py-2 mt-2">Loading districts...</div>
//       ) : error ? (
//         <div className="px-6 py-2 mt-2 text-red-500">{error}</div>
//       ) : (
//         <>
//           {listedDistricts.map((d, index) => (
//             <div key={d.id} className="bg-white flex items-center gap-2 px-6 py-2 mt-2">
//               <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
//                 {(index + 1 + (page -1)*10).toString().padStart(2, '0')}
//               </div>
//               <input
//                 type="text"
//                 className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
//                 value={d.name}
//                 readOnly
//               />
//               <input
//                 type="checkbox"
//                 className="rounded-[15px] size-6"
//                 checked={checkedIds.includes(d.id)}
//                 onChange={() => handleCheckbox(d.id)}
//               />
//             </div>
//           ))}

//           {/* Pagination controls */}
//           <div className="flex justify-center items-center gap-2 mt-4">
//             <button
//               disabled={page <= 1}
//               onClick={() => setPage(page -1)}
//               className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <span>Page {page} of {totalPages}</span>
//             <button
//               disabled={page >= totalPages}
//               onClick={() => setPage(page +1)}
//               className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>

//           {/* Edit/Delete buttons */}
//           <div className="flex gap-3 mt-4 px-6">
//             <button
//               disabled={checkedIds.length !== 1}
//               className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 cursor-pointer"
//               onClick={() => setIsEditOpen(true)}
//             >
//               Edit
//             </button>
//             <button
//               disabled={checkedIds.length !== 1}
//               className="bg-[#d9534f] text-white rounded-[15px] py-2 px-10 cursor-pointer"
//               onClick={() => setIsDeleteConfirmOpen(true)}
//             >
//               Remove
//             </button>
//           </div>

//           {/* Edit Popup */}
//           {isEditOpen && (
//             <EditPopup
//               heading="District"
//               value={editName}
//               onChange={setEditName}
//               onUpdate={handleUpdate}
//               onClose={() => setIsEditOpen(false)}
//               apiError={apiError}
//               statesList={statesList}
//               selectedStateId={editStateId}
//               setSelectedStateId={setEditStateId}
//               isStatesLoading={isStatesLoading}
//               fetchStates={fetchStates}
//               statesPage={statesPage}
//               statesTotalPages={statesTotalPages}
//             />
//           )}

//           {/* Delete Confirmation Popup */}
//           {isDeleteConfirmOpen && checkedIds.length === 1 && (
//             <ConfirmDeletePopup
//               id={checkedIds[0]}
//               districtName={listedDistricts.find(d => d.id === checkedIds[0])?.name}
//               onConfirm={handleDeleteConfirm}
//               onCancel={() => setIsDeleteConfirmOpen(false)}
//             />
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default ManageDistrictsPage;








"use client";
import React, { useEffect, useState, useRef } from "react";
import Navlink from "@/components/dataManager/generalData/Navlink";
import Link from "next/link";
import useDistrictStore from "@/app/lib/store/districtsStore";
import EditPopup from "@/components/dataManager/generalData/EditPopup";

function ConfirmDeletePopup({ districtName, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-[#4f4f4f4c] backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-md w-[350px]">
        <h2 className="font-semibold text-lg mb-4">Confirm Deletion</h2>
        <p>
          Are you sure you want to delete the district <strong>{districtName}</strong>?
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 border rounded hover:bg-gray-100">
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

function ManageDistrictsPage() {
  const {
    statesList,
    fetchStates,
    isStatesLoading,
    statesPage,
    statesTotalPages,
    listedDistricts,
    fetchDistricts,
    isLoading,
    error,
    success,
    page,
    totalPages,
    setPage,
    checkedIds,
    toggleCheckedId,
    updateDistrictById,
    deleteDistrictById,
    resetSuccess,
  } = useDistrictStore();

  const [selectedStateId, setSelectedStateId] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editStateId, setEditStateId] = useState("");
  const [apiError, setApiError] = useState("");

  // Load states first time
  useEffect(() => {
    fetchStates(1);
  }, [fetchStates]);

  // Load districts when selectedStateId or page changes
// Load districts when page or selectedStateId changes
useEffect(() => {
  fetchDistricts(page, selectedStateId || null);
}, [fetchDistricts, selectedStateId, page]);


  // Outside click closes dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Infinite scroll inside state dropdown
  const onScroll = (e) => {
    const target = e.target;
    if (
      target.scrollTop + target.clientHeight >= target.scrollHeight - 5 &&
      !isStatesLoading &&
      statesPage < statesTotalPages
    ) {
      fetchStates(statesPage + 1);
    }
  };

  // Sync EditPopup fields on selection change
  useEffect(() => {
    if (checkedIds.length === 1) {
      const selected = listedDistricts.find((d) => d.id === checkedIds[0]);
      setEditName(selected?.name || "");
      setEditStateId(selected?.stateId || "");
      setApiError("");
    } else {
      setEditName("");
      setEditStateId("");
      setApiError("");
    }
  }, [checkedIds, listedDistricts]);

  // Handle checkbox toggle (single item)
  const handleCheckbox = (id) => {
    toggleCheckedId(id);
  };

  // // Update district API call
  // const handleUpdate = async () => {
  //   if (checkedIds.length !== 1) return;
  //   setApiError("");
  //   try {
  //     await updateDistrictById(checkedIds[0], { name: editName, stateId: editStateId });
  //     setIsEditOpen(false);
  //   } catch (error) {
  //     setApiError(error.message || "Update failed");
  //   }
  // };

  // // Confirm delete handler
  // const handleDeleteConfirm = async () => {
  //   if (checkedIds.length !== 1) return;
  //   await deleteDistrictById(checkedIds[0]);
  //   setIsDeleteConfirmOpen(false);
  // };

  const handleUpdate = async () => {
  if (checkedIds.length !== 1) return;
  setApiError("");
  try {
    await updateDistrictById(checkedIds[0], { name: editName, stateId: editStateId }, selectedStateId);
    setIsEditOpen(false);
  } catch (error) {
    setApiError(error.message || "Update failed");
  }
};

const handleDeleteConfirm = async () => {
  if (checkedIds.length !== 1) return;
  await deleteDistrictById(checkedIds[0], selectedStateId);
  setIsDeleteConfirmOpen(false);
};

  return (
    <div>
      <Navlink />
      <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
          <div className="flex item-center gap-[50px]">
            <Link
              href={"/controlpanel/data-manager/general-data/districts/add-districts"}
              className="text-black"
            >
              Add
            </Link>
            <h1 className="text-[#3674B5]">Manage</h1>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
        <h1 className="text-black font-semibold py-[16px]">Manage Districts</h1>
      </div>

      {/* State dropdown */}
      <div className="relative bg-white px-6 py-2 mt-2" ref={dropdownRef}>
        <div
          className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] cursor-pointer bg-white select-none"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {statesList.find((s) => s.id === selectedStateId)?.name || "Select State"}
        </div>
        {dropdownOpen && (
          <div
            className="absolute mt-1 w-[350px] max-h-48 overflow-y-auto border border-[#8888888c] rounded-[15px] bg-white shadow-lg z-10"
            onScroll={onScroll}
          >
            {statesList.map((state) => (
              <div
                key={state.id}
                className={`px-4 py-2 cursor-pointer hover:bg-[#C0D8F6] ${
                  selectedStateId === state.id ? "bg-[#E6F0FF]" : ""
                }`}
                onClick={() => {
                  setSelectedStateId(state.id);
                  setDropdownOpen(false);
                  setPage(1); // reset districts page to 1 on state change
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

      {/* Districts list */}
      {isLoading ? (
        <div className="px-6 py-2 mt-2">Loading districts...</div>
      ) : error ? (
        <div className="px-6 py-2 mt-2 text-red-500">{error}</div>
      ) : (
        <>
          {listedDistricts.map((district, idx) => (
            <div
              key={district.id}
              className="bg-white flex items-center gap-2 px-6 py-2 mt-2"
            >
              <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
                {(idx + 1 + (page - 1) * 10).toString().padStart(2, "0")}
              </div>
              <input
                type="text"
                className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
                value={district.name}
                readOnly
              />
              <input
                type="checkbox"
                className="rounded-[15px] size-6"
                checked={checkedIds.includes(district.id)}
                onChange={() => handleCheckbox(district.id)}
              />
            </div>
          ))}

          {/* Pagination controls */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {/* Edit/Delete buttons */}
          <div className="flex gap-3 mt-4 px-6">
            <button
              disabled={checkedIds.length !== 1}
              className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 cursor-pointer"
              onClick={() => setIsEditOpen(true)}
            >
              Edit
            </button>
            <button
              disabled={checkedIds.length !== 1}
              className="bg-[#d9534f] text-white rounded-[15px] py-2 px-10 cursor-pointer"
              onClick={() => setIsDeleteConfirmOpen(true)}
            >
              Remove
            </button>
          </div>

          {/* Edit Popup */}
          {isEditOpen && (
            <EditPopup
              heading="District"
              value={editName}
              onChange={setEditName}
              onUpdate={handleUpdate}
              onClose={() => setIsEditOpen(false)}
              apiError={apiError}
              statesList={statesList}
              selectedStateId={editStateId}
              setSelectedStateId={setEditStateId}
              isStatesLoading={isStatesLoading}
              fetchStates={fetchStates}
              statesPage={statesPage}
              statesTotalPages={statesTotalPages}
            />
          )}

          {/* Delete Confirmation Popup */}
          {isDeleteConfirmOpen && checkedIds.length === 1 && (
            <ConfirmDeletePopup
              districtName={listedDistricts.find((d) => d.id === checkedIds[0])?.name}
              onConfirm={handleDeleteConfirm}
              onCancel={() => setIsDeleteConfirmOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ManageDistrictsPage;
