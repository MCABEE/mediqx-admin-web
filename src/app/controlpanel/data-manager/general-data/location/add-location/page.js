// "use client";
// import React, { useEffect, useState } from "react";
// import useLocationStore from "@/app/lib/store/locationStore";
// import Navlink from "@/components/dataManager/generalData/Navlink";
// import Link from "next/link";
// import UploadExcelPopup from "@/components/dataManager/generalData/UploadExcelPopup";

// function AddLocations() {
//   const {
//     locations,
//     isLoading,
//     error,
//     success,
//     addLocationInput,
//     setLocationValue,
//     saveLocations,
//     resetSuccess,
//     setError
//   } = useLocationStore();

//   const [uploadExcelPopup,setUploadExcelPopup]=useState(false)

//   useEffect(() => {
//     if (success || error) {
//       const timer = setTimeout(() => resetSuccess(), 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [success, error, resetSuccess]);

//   return (
//     <div>
//       <Navlink />

//       {/* Header */}
//       <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
//         <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
//           <div className="flex item-center gap-[50px]">
//             <h1 className="text-[#3674B5]">Add</h1>
//             <Link
//               href="/controlpanel/data-manager/general-data/location/manage-location"
//               className="text-black"
//             >
//               Manage
//             </Link>
//           </div>
//           <div className="flex items-center gap-4">
//             <button 
//             className="bg-[#196BA5] text-white text-[16px] rounded-lg p-2 cursor-pointer"
//             onClick={()=>setUploadExcelPopup(true)}
//             >
//               Upload Excel
//             </button>
//             <button
//             className="bg-[#196BA5] text-white text-3xl rounded-lg size-9 cursor-pointer"
//             type="button"
//             onClick={addLocationInput}
//           >
//             +
//           </button>
//           </div>
//         </div>
//       </div>

//       <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
//         <h1 className="text-black font-semibold py-[16px]">Add Locations</h1>
//       </div>

//       {locations.map((loc, idx) => (
//         <div
//           key={idx}
//           className="bg-white flex flex gap-4 px-6 py-2 mt-2 items-center"
//         >
//           <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
//             {(idx + 1).toString().padStart(2, "0")}
//           </div>

//          <div className=" flex flex-wrap gap-4">
//              <input
//             type="text"
//             className="border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
//             placeholder="State"
//             value={loc.state}
//             onChange={(e) => setLocationValue(idx, "state", e.target.value)}
//           />
//           <input
//             type="text"
//             className="border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
//             placeholder="District"
//             value={loc.district}
//             onChange={(e) => setLocationValue(idx, "district", e.target.value)}
//           />
//           <input
//             type="text"
//             className="border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
//             placeholder="City"
//             value={loc.city}
//             onChange={(e) => setLocationValue(idx, "city", e.target.value)}
//           />
//           <input
//             type="text"
//             className="border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
//             placeholder="Pincode"
//             value={loc.pincode}
//             maxLength={6}
//             onChange={(e) => {
//               const val = e.target.value.replace(/\D/g, "");
//               setLocationValue(idx, "pincode", val);
//             }}
//           />
//          </div>
//         </div>
//       ))}

//       <button
//         className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 my-4 cursor-pointer"
//         onClick={saveLocations}
//         disabled={isLoading}
//       >
//         {isLoading ? "Saving..." : "Save"}
//       </button>

//       {error && <div className="text-red-600 my-2 px-6">{error}</div>}
//       {success && (
//         <div className="text-blue-600 mt-2 px-6">
//           Location added successfully!
//         </div>
//       )}


//       {
//         uploadExcelPopup && (
//           <UploadExcelPopup onClose={()=>setUploadExcelPopup(false)}/>
//         )
//       }
//     </div>
//   );
// }

// export default AddLocations;







// "use client";
// import React, { useEffect, useState } from "react";
// import useLocationStore from "@/app/lib/store/locationStore";
// import Navlink from "@/components/dataManager/generalData/Navlink";
// import Link from "next/link";
// import UploadExcelPopup from "@/components/dataManager/generalData/UploadExcelPopup";

// function AddLocations() {
//   const {
//     locations,
//     isLoading,
//     error,
//     success,
//     addLocationInput,
//     setLocationValue,
//     saveLocations,
//     resetSuccess,
//     duplicateIndexes, 
//   } = useLocationStore();

//   const [uploadExcelPopup, setUploadExcelPopup] = useState(false);

//   useEffect(() => {
//     if (success || error) {
//       const timer = setTimeout(() => resetSuccess(), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [success, error, resetSuccess]);

//   return (
//     <div>
//       <Navlink />

//       {/* Header */}
//       <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
//         <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
//           <div className="flex item-center gap-[50px]">
//             <h1 className="text-[#3674B5]">Add</h1>
//             <Link
//               href="/controlpanel/data-manager/general-data/location/manage-location"
//               className="text-black"
//             >
//               Manage
//             </Link>
//           </div>
//           <div className="flex items-center gap-4">
//             <button
//               className="bg-[#196BA5] text-white text-[16px] rounded-lg p-2 cursor-pointer"
//               onClick={() => setUploadExcelPopup(true)}
//             >
//               Upload Excel
//             </button>
//             <button
//               className="bg-[#196BA5] text-white text-3xl rounded-lg size-9 cursor-pointer"
//               type="button"
//               onClick={addLocationInput}
//             >
//               +
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Form Fields */}
//       <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
//         <h1 className="text-black font-semibold py-[16px]">Add Locations</h1>
//       </div>

//       {locations.map((loc, idx) => {
//         const isDuplicate = duplicateIndexes.includes(idx); 
//         return (
//           <div
//             key={idx}
//             className={`bg-white flex  gap-4 px-6 py-2 mt-2 items-center ${
//               isDuplicate ? "border border-red-500 bg-red-50" : ""
//             }`}
//           >
//             <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">
//               {(idx + 1).toString().padStart(2, "0")}
//             </div>

//             <div className="flex flex-wrap gap-4">
//               {["state", "district", "city", "pincode"].map((field) => (
//                 <input
//                   key={field}
//                   type="text"
//                   className={`border py-2 px-4 rounded-[15px] outline-none ${
//                     isDuplicate
//                       ? "border-red-500 bg-red-50 placeholder:text-red-400"
//                       : "border-[#8888888c]"
//                   }`}
//                   placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                   value={loc[field]}
//                   onChange={(e) =>
//                     setLocationValue(idx, field, e.target.value)
//                   }
//                   maxLength={field === "pincode" ? 6 : undefined}
//                 />
//               ))}
//             </div>
//           </div>
//         );
//       })}

//       <button
//         className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 my-4 cursor-pointer"
//         onClick={saveLocations}
//         disabled={isLoading}
//       >
//         {isLoading ? "Saving..." : "Save"}
//       </button>

//       {error && <div className="text-red-600 my-2 px-6">{error}</div>}
//       {success && (
//         <div className="text-blue-600 mt-2 px-6">
//           Location added successfully!
//         </div>
//       )}

//       {uploadExcelPopup && (
//         <UploadExcelPopup onClose={() => setUploadExcelPopup(false)} />
//       )}
//     </div>
//   );
// }

// export default AddLocations;



"use client";
import React, { useEffect, useState } from "react";
import useLocationStore from "@/app/lib/store/locationStore";
import Navlink from "@/components/dataManager/generalData/Navlink";
import Link from "next/link";
import UploadExcelPopup from "@/components/dataManager/generalData/UploadExcelPopup";

function AddLocations() {
  const {
    locations,
    isLoading,
    error,
    success,
    addLocationInput,
    removeLocationInput, // ✅ new
    setLocationValue,
    saveLocations,
    resetSuccess,
    duplicateIndexes,
  } = useLocationStore();

  const [uploadExcelPopup, setUploadExcelPopup] = useState(false);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => resetSuccess(), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, resetSuccess]);

  return (
    <div>
      <Navlink />

      {/* Header */}
      <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
          <div className="flex item-center gap-[50px]">
            <h1 className="text-[#3674B5]">Add</h1>
            <Link
              href="/controlpanel/data-manager/general-data/location/manage-location"
              className="text-black"
            >
              Manage
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="bg-[#196BA5] text-white text-[16px] rounded-lg p-2 cursor-pointer"
              onClick={() => setUploadExcelPopup(true)}
            >
              Upload Excel
            </button>
            <button
              className="bg-[#196BA5] text-white text-3xl rounded-lg size-9 cursor-pointer"
              type="button"
              onClick={addLocationInput}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
        <h1 className="text-black font-semibold py-[16px]">Add Locations</h1>
      </div>

      {locations.map((loc, idx) => {
        const isDuplicate = duplicateIndexes.includes(idx);

        return (
          <div
            key={idx}
            className={`bg-white flex justify-between items-center gap-4 px-6 py-3 mt-2 rounded-[10px] ${
              isDuplicate
                ? "border border-red-500 bg-red-50"
                : "border border-[#8888888c]"
            }`}
          >
            <div className="flex items-center gap-4 flex-wrap">
              <div className="border border-[#8888888c] py-2 px-4 rounded-[15px] min-w-[40px] text-center">
                {(idx + 1).toString().padStart(2, "0")}
              </div>

             <div className="grid grid-cols-2 gap-4">
               {["state", "district", "city", "pincode"].map((field) => (
                <input
                  key={field}
                  type="text"
                  className={`border py-2 px-4 rounded-[15px] outline-none ${
                    isDuplicate
                      ? "border-red-500 bg-red-50 placeholder:text-red-400"
                      : "border-[#8888888c]"
                  }`}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={loc[field]}
                  onChange={(e) =>
                    setLocationValue(idx, field, e.target.value)
                  }
                  maxLength={field === "pincode" ? 6 : undefined}
                />
              ))}
             </div>
            </div>

            {/*  Close button */}
            {idx !== 0 && (
              <button
                onClick={() => removeLocationInput(idx)}
                className="text-red-500 text-2xl font-semibold hover:text-red-700 rounded-full px-3 py-1 transition-all"
                title="Remove this location"
              >
                ✕
              </button>
            )}
          </div>
        );
      })}

      {/* Save button */}
      <button
        className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 my-4 cursor-pointer"
        onClick={saveLocations}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save"}
      </button>

      {/* Status messages */}
      {error && <div className="text-red-600 my-2 px-6">{error}</div>}
      {success && (
        <div className="text-blue-600 mt-2 px-6">
          Location added successfully!
        </div>
      )}

      {/* Excel upload popup */}
      {uploadExcelPopup && (
        <UploadExcelPopup onClose={() => setUploadExcelPopup(false)} />
      )}
    </div>
  );
}

export default AddLocations;