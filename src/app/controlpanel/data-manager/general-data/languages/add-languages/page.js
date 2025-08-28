// import Navlink from "@/components/dataManager/generalData/Navlink";
// import Link from "next/link";
// import React from "react";

// function page() {
//   return (
//     <div>
//       <Navlink />
//       <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
//         <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
//           <div className=" flex item-center gap-[50px]">
//             <h1 className="text-[#3674B5]">Add</h1>
//             <Link href={" /controlpanel/data-manager/general-data/languages/manage-languages"} className="text-black">Manage</Link>
//           </div>
//           <button className="bg-[#196BA5] text-white text-3xl rounded-lg size-9 cursor-pointer">
//             +
//           </button>
//         </div>
//       </div>

//       <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
// <h1 className="text-black font-semibold py-[16px] ">Add Languages</h1>
//       </div>
//       <div className="bg-white flex gap-6 px-6 py-2 mt-2">
//         <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">01</div>
//             <input type="text" className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none" placeholder="Enter Language"/>
//       </div>
//        <div className="bg-white flex gap-6 px-6 py-2 mt-2">
//         <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">02</div>
//             <input type="text" className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none" placeholder="Enter Language"/>
//       </div>
//       <button className="bg-[#196BA5] text-white  rounded-[15px] py-2 px-10 mt-2 cursor-pointer">
//             Save
//           </button>

//     </div>
//   );
// }

// export default page;















"use client"
import React, { useEffect } from "react";
import useLanguageStore from "@/app/lib/store/languageStore";
import Navlink from "@/components/dataManager/generalData/Navlink";
import Link from "next/link";

function AddLanguagesPage() {
  const {
    languages,
    isLoading,
    error,
    success,
    setLanguages,
    addLanguageInput,
    setLanguageValue,
    saveLanguages,
    resetSuccess,
  } = useLanguageStore();

  useEffect(() => {
    if (success) {
      setTimeout(resetSuccess, 2000); // Clear success after display
    }
  }, [success, resetSuccess]);

  return (
    <div>
      <Navlink />
      <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="w-full flex items-center justify-between pt-[23px] pb-[19px]">
          <div className=" flex item-center gap-[50px]">
            <h1 className="text-[#3674B5]">Add</h1>
            <Link href={"/controlpanel/data-manager/general-data/languages/manage-languages"} className="text-black">Manage</Link>
          </div>
          <button
            className="bg-[#196BA5] text-white text-3xl rounded-lg size-9 cursor-pointer"
            type="button"
            onClick={addLanguageInput}
          >
            +
          </button>
        </div>
      </div>

      <div className="w-full bg-[#C0D8F6] mt-2 rounded-t-[15px] px-6">
        <h1 className="text-black font-semibold py-[16px] ">Add Languages</h1>
      </div>

      {languages.map((lang, idx) => (
        <div key={idx} className="bg-white flex gap-6 px-6 py-2 mt-2">
          <div className="border border-[#8888888c] py-2 px-4 rounded-[15px]">{`${(idx + 1).toString().padStart(2, "0")}`}</div>
          <input
            type="text"
            className="w-[350px] border border-[#8888888c] py-2 px-4 rounded-[15px] outline-none"
            placeholder="Enter Language"
            value={lang}
            onChange={(e) => setLanguageValue(idx, e.target.value)}
          />
        </div>
      ))}

      <button
        className="bg-[#196BA5] text-white rounded-[15px] py-2 px-10 mt-2 cursor-pointer"
        onClick={saveLanguages}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save"}
      </button>

      {(error || success) && (
        <div className="text-sm py-2 px-6">
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-blue-500">Languages added successfully!</div>}
        </div>
      )}
    </div>
  );
}

export default AddLanguagesPage;
