// "use client";
// import EditPopup from "@/components/dataManager/generalData/EditPopup";
// import Navlink from "@/components/dataManager/generalData/Navlink";
// import Link from "next/link";
// import React, { useState } from "react";

// function page() {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   return (
//     <div>
//       <Navlink />
//       <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
//         <div className="w-full flex item-center justify-between pt-[23px] pb-[19px]">
//           <div className=" flex items-center gap-[50px]">
//             <Link
//               href={
//                 " /controlpanel/data-manager/general-data/states/add-states"
//               }
//               className="text-black"
//             >
//               Add
//             </Link>

//             <h1 className="text-[#3674B5]">Manage</h1>
//           </div>
//         </div>
//       </div>

//       <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
//         <h1 className="text-black font-semibold py-[16px] ">Manage States</h1>
//       </div>
//       <div className="bg-white flex  items-center gap-2 px-6 py-2 mt-2">
//         <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
//           01
//         </div>
//         <input
//           type="text"
//           className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
//           placeholder="Enter Language"
//         />
//         <input type="checkbox" className="size-6 rounded-[15px]" />
//       </div>
//       <div className="bg-white flex  items-center gap-2 px-6 py-2 mt-2">
//         <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
//           02
//         </div>
//         <input
//           type="text"
//           className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
//           placeholder="Enter Language"
//         />
//         <input type="checkbox" className="size-6 rounded-[15px]" />
//       </div>

//       <div className="flex gap-3">
//         <button
//           className="bg-[#196BA5] text-white  rounded-[15px] py-2 px-10 mt-2 cursor-pointer "
//           onClick={() => setIsPopupOpen(true)}
//         >
//           Edit
//         </button>
//         <button className="bg-[#196BA5] text-white  rounded-[15px] py-2 px-10 mt-2 cursor-pointer">
//           Remove
//         </button>
//       </div>
//       {isPopupOpen && (
//         <EditPopup heading={"State"} onClose={() => setIsPopupOpen(false)} />
//       )}
//     </div>
//   );
// }

// export default page;









"use client";
import React, { useEffect, useState } from "react";
import useStateStore from "@/app/lib/store/stateStore";
import Navlink from "@/components/dataManager/generalData/Navlink";
import Link from "next/link";
import EditPopup from "@/components/dataManager/generalData/EditPopup";

function ConfirmDeletePopup({ id, stateName, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-[#4f4f4f4c] backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-md w-[350px]">
        <h2 className="font-semibold text-lg mb-4">Confirm Deletion</h2>
        <p>
          Are you sure you want to delete the state <strong>{stateName}</strong>?
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded hover:bg-gray-100"
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

function ManageStatesPage() {
  const {
    listedStates,
    isLoading,
    error,
    page,
    totalPages,
    fetchStates,
    setPage,
    deleteStateById,
    updateStateById,
  } = useStateStore();

  const [checkedItems, setCheckedItems] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editStateName, setEditStateName] = useState("");
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    fetchStates(page, 10);
  }, [page, fetchStates]);

  // Single checkbox select
  const handleCheckbox = (id) => {
    setCheckedItems((prev) => (prev.includes(id) ? [] : [id]));
  };

  // Update edit input when selection changes
  useEffect(() => {
    if (checkedItems.length === 1) {
      const state = listedStates.find((s) => s.id === checkedItems[0]);
      setEditStateName(state?.name || "");
    } else {
      setEditStateName("");
    }
    setApiError("");
  }, [checkedItems, listedStates]);

  const handleDeleteConfirm = async () => {
    for (const id of checkedItems) {
      await deleteStateById(id);
    }
    setCheckedItems([]);
    setIsConfirmOpen(false);
  };

  const handleUpdate = async () => {
    if (checkedItems.length !== 1) return;
    setApiError("");
    try {
      await updateStateById(checkedItems[0], editStateName);
      setIsPopupOpen(false);
      setCheckedItems([]);
    } catch (error) {
      if (
        (error.response?.data?.message &&
          error.response.data.message.toLowerCase().includes("unique constraint failed")) ||
        (typeof error.message === "string" &&
          error.message.toLowerCase().includes("unique constraint failed"))
      ) {
        setApiError("This state already exists.");
      } else {
        setApiError(error.message || "An error occurred.");
      }
    }
  };

  return (
    <div>
      <Navlink />
      <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="w-full flex item-center justify-between pt-[23px] pb-[19px]">
          <div className="flex items-center gap-[50px]">
            <Link
              href={"/controlpanel/data-manager/general-data/states/add-states"}
              className="text-black"
            >
              Add
            </Link>
            <h1 className="text-[#3674B5]">Manage</h1>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
        <h1 className="text-black font-semibold py-[16px]">Manage States</h1>
      </div>

      {isLoading ? (
        <div className="px-6 py-2 mt-2">Loading states...</div>
      ) : error ? (
        <div className="px-6 py-2 mt-2 text-red-500">{error}</div>
      ) : (
        <>
          {listedStates.map((state, idx) => (
            <div
              key={state.id}
              className="bg-white flex items-center gap-2 px-6 py-2 mt-2"
            >
              <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
                {(idx + 1 + (page - 1) * 10).toString().padStart(2, "0")}
              </div>
              <input
                type="text"
                className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
                value={state.name}
                readOnly
              />
              <input
                type="checkbox"
                className="size-6 rounded-[15px]"
                checked={checkedItems.includes(state.id)}
                onChange={() => handleCheckbox(state.id)}
              />
            </div>
          ))}

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

          <div className="flex gap-3 mt-4 px-6">
            <button
              className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 cursor-pointer"
              disabled={checkedItems.length !== 1}
              onClick={() => setIsPopupOpen(true)}
            >
              Edit
            </button>
            <button
              className="bg-[#d9534f] text-white rounded-[15px] py-2 px-10 cursor-pointer"
              disabled={checkedItems.length === 0}
              onClick={() => setIsConfirmOpen(true)}
            >
              Remove
            </button>
          </div>

          {isPopupOpen && (
            <EditPopup
              heading={"State"}
              value={editStateName}
              onChange={setEditStateName}
              onUpdate={handleUpdate}
              onClose={() => {
                setIsPopupOpen(false);
                setApiError("");
              }}
              apiError={apiError}
            />
          )}

          {isConfirmOpen && checkedItems.length === 1 && (
            <ConfirmDeletePopup
              id={checkedItems[0]}
              stateName={
                listedStates.find((state) => state.id === checkedItems[0])?.name ||
                ""
              }
              onConfirm={handleDeleteConfirm}
              onCancel={() => setIsConfirmOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ManageStatesPage;
