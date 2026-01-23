// "use client";
// import React, { useEffect, useMemo, useState } from "react";
// import useLanguageStore from "@/app/lib/store/languageStore";

// const EditLanguagesPopup = ({ selectedNurseLanguages, onClose }) => {
//   const {
//     listedLanguages,
//     fetchLanguages,
//     isLoading: isLangLoading,
//     error: langErrorFetch,
//   } = useLanguageStore();

//   // 🔹 Fetch all languages
//   useEffect(() => {
//     fetchLanguages(1, 100);
//   }, [fetchLanguages]);

//   // 🔹 Extract selected language IDs from nurse data
//   const selectedLanguageIds = useMemo(() => {
//     return (
//       selectedNurseLanguages?.userLanguages?.map((l) => l.id) || []
//     );
//   }, [selectedNurseLanguages]);

//   // 🔹 Controlled checkbox state
//   const [selectedIds, setSelectedIds] = useState([]);

//   // 🔹 Preselect checkboxes when data loads
//   useEffect(() => {
//     setSelectedIds(selectedLanguageIds);
//   }, [selectedLanguageIds]);

//   const toggleLanguage = (id) => {
//     setSelectedIds((prev) =>
//       prev.includes(id)
//         ? prev.filter((x) => x !== id)
//         : [...prev, id]
//     );
//   };

//   const handleSave = () => {
//     // ✅ FINAL PAYLOAD (language IDs)
//     console.log("Selected language IDs:", selectedIds);

//     /*
//       API payload example:
//       {
//         languageIds: selectedIds
//       }
//     */

//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white w-[420px] rounded-xl p-6">
//         <h2 className="text-lg font-semibold text-black mb-4">
//           Edit Languages
//         </h2>

//         {isLangLoading && (
//           <p className="text-sm text-gray-500">Loading languages...</p>
//         )}

//         {langErrorFetch && (
//           <p className="text-sm text-red-500">{langErrorFetch}</p>
//         )}

//         <div className="flex flex-col gap-3 mt-2">
//           {listedLanguages?.map((lang) => (
//             <label
//               key={lang.id}
//               className="flex items-center gap-3 cursor-pointer text-black"
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedIds.includes(lang.id)}
//                 onChange={() => toggleLanguage(lang.id)}
//               />
//               <span>{lang.language}</span>
//             </label>
//           ))}
//         </div>

//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border rounded-md text-black"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleSave}
//             className="px-4 py-2 bg-[#1982FE] text-white rounded-md"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditLanguagesPopup;





// "use client";
// import React, { useEffect, useMemo, useState } from "react";
// import useLanguageStore from "@/app/lib/store/languageStore";

// const EditLanguagesPopup = ({
//   selectedNurseLanguages,
//   userId,
//   onClose,
// }) => {
//   const {
//     listedLanguages,
//     fetchLanguages,
//     updateNurseLanguages,
//     isLoading: isLangLoading,
//     error: langErrorFetch,
//   } = useLanguageStore();

//   // 🔹 Fetch languages
//   useEffect(() => {
//     fetchLanguages(1, 100);
//   }, [fetchLanguages]);

//   // 🔹 Extract selected language IDs
//   const selectedLanguageIds = useMemo(() => {
//     return (
//       selectedNurseLanguages?.userLanguages?.map((l) => l.id) || []
//     );
//   }, [selectedNurseLanguages]);

//   const [selectedIds, setSelectedIds] = useState([]);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   // 🔹 Preselect
//   useEffect(() => {
//     setSelectedIds(selectedLanguageIds);
//   }, [selectedLanguageIds]);

//   const toggleLanguage = (id) => {
//     setSelectedIds((prev) =>
//       prev.includes(id)
//         ? prev.filter((x) => x !== id)
//         : [...prev, id]
//     );
//   };

//   const handleSave = async () => {
//     if (!userId) {
//       setError("User ID missing");
//       return;
//     }

//     try {
//       setSaving(true);
//       await updateNurseLanguages(userId, selectedIds);
//       onClose();
//     } catch {
//       setError("Failed to update languages");
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white w-[420px] rounded-xl p-6">
//         <h2 className="text-lg font-semibold text-black mb-4">
//           Edit Languages
//         </h2>

//         {isLangLoading && (
//           <p className="text-sm text-gray-500">Loading languages...</p>
//         )}

//         {error || langErrorFetch ? (
//           <p className="text-sm text-red-500">
//             {error || langErrorFetch}
//           </p>
//         ) : null}

//         <div className="flex flex-col gap-3 mt-3">
//           {listedLanguages?.map((lang) => (
//             <label
//               key={lang.id}
//               className="flex items-center gap-3 cursor-pointer text-black"
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedIds.includes(lang.id)}
//                 onChange={() => toggleLanguage(lang.id)}
//               />
//               <span>{lang.language}</span>
//             </label>
//           ))}
//         </div>

//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             onClick={onClose}
//             disabled={saving}
//             className="px-4 py-2 border rounded-md text-black"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleSave}
//             disabled={saving}
//             className="px-4 py-2 bg-[#1982FE] text-white rounded-md disabled:opacity-50"
//           >
//             {saving ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditLanguagesPopup;





"use client";
import React, { useEffect, useMemo, useState } from "react";
import useLanguageStore from "@/app/lib/store/languageStore";

const EditLanguagesPopup = ({
  selectedNurseLanguages,
  userId,
  onClose,
  onSuccess,
}) => {
  const {
    listedLanguages,
    fetchLanguages,
    updateNurseLanguages,
    isLoading: isLangLoading,
    error: langErrorFetch,
  } = useLanguageStore();

  const [selectedIds, setSelectedIds] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- Fetch Languages ---------------- */
  useEffect(() => {
    fetchLanguages(1, 100);
  }, [fetchLanguages]);

  /* ---------------- Preselect Existing Languages ---------------- */
  const initialSelectedIds = useMemo(() => {
    return (
      selectedNurseLanguages?.userLanguages?.map((l) => l.id) || []
    );
  }, [selectedNurseLanguages]);

  useEffect(() => {
    setSelectedIds(initialSelectedIds);
  }, [initialSelectedIds]);

  /* ---------------- Handlers ---------------- */
  const toggleLanguage = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const handleSave = async () => {
    if (!userId) {
      setError("User ID missing");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await updateNurseLanguages(userId, selectedIds);

      // ✅ Notify parent + refresh data
      onSuccess?.();
    } catch {
      setError("Failed to update languages");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-[460px] max-h-[85vh] bg-white rounded-2xl shadow-xl flex flex-col">
        {/* ---------- Header ---------- */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Edit Languages
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Select the languages spoken by this nurse
          </p>
        </div>

        {/* ---------- Content ---------- */}
        <div className="px-6 py-4 overflow-y-auto">
          {isLangLoading && (
            <p className="text-sm text-gray-500">Loading languages…</p>
          )}

          {langErrorFetch && (
            <p className="text-sm text-red-500">{langErrorFetch}</p>
          )}

          {!isLangLoading && (
            <div className="flex flex-col gap-3">
              {listedLanguages?.map((lang) => (
                <label
                  key={lang.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(lang.id)}
                    onChange={() => toggleLanguage(lang.id)}
                    className="accent-[#1982FE] w-4 h-4"
                  />
                  <span className="text-gray-800 font-medium">
                    {lang.language}
                  </span>
                </label>
              ))}
            </div>
          )}

          {error && (
            <p className="text-sm text-red-500 mt-3">{error}</p>
          )}
        </div>

        {/* ---------- Footer ---------- */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-[#1982FE] text-white font-medium hover:bg-[#1469d8] disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLanguagesPopup;
