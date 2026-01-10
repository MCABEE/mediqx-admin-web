// "use client";
// import React, { useEffect, useState } from "react";
// import { AiOutlineClose } from "react-icons/ai";
// import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";

// export default function EditSupervisorExperiencePopup({
//   show,
//   onClose,
//   supervisor,
// }) {
//   const { submitSupervisorPageTwo } = useSupervisorRegistrationStore();
//   const [form, setForm] = useState({});

//   useEffect(() => {
//     if (supervisor) {
//       setForm({
//         isExperienced: supervisor.isExperienced,
//         yearsOfExperience: supervisor.yearsOfExperience,
//         monthsOfExperience: supervisor.monthsOfExperience,
//         providerName: supervisor.providerName,
//         providerAddress: supervisor.providerAddress,
//         startDate: supervisor.startDate,
//         endDate: supervisor.endDate,
//         skillsIds: supervisor.skills?.map((s) => s.id) || [],
//         languageIds: supervisor.languages?.map((l) => l.id) || [],
//       });
//     }
//   }, [supervisor]);

//   if (!show) return null;

//   const handleSave = async () => {
//     await submitSupervisorPageTwo(form);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
//       <div className="bg-white w-full max-w-2xl p-6 rounded-xl relative">
//         <button onClick={onClose} className="absolute right-4 top-4">
//           <AiOutlineClose />
//         </button>

//         <h2 className="text-lg font-semibold mb-4">Edit Experience</h2>

//         <input
//           className="border p-2 w-full mb-2"
//           placeholder="Last Organization"
//           value={form.providerName || ""}
//           onChange={(e) => setForm({ ...form, providerName: e.target.value })}
//         />

//         <input
//           type="date"
//           className="border p-2 w-full mb-4"
//           value={form.startDate?.split("T")[0] || ""}
//           onChange={(e) => setForm({ ...form, startDate: e.target.value })}
//         />

//         <div className="flex justify-end gap-3">
//           <button onClick={onClose}>Cancel</button>
//           <button onClick={handleSave} className="bg-blue-700 text-white px-4 py-2 rounded">
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }







// "use client";

// import React, { useEffect, useState } from "react";
// import { AiOutlineClose } from "react-icons/ai";
// import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";

// /* ---------- Input Components ---------- */
// const InputField = ({ label, value, onChange, type = "text", disabled }) => (
//   <div className="flex flex-col">
//     <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
//     <input
//       type={type}
//       value={value || ""}
//       onChange={onChange}
//       disabled={disabled}
//       className="border border-gray-300 rounded-lg p-2 text-sm
//                  focus:outline-none focus:ring-2 focus:ring-blue-500
//                  disabled:bg-gray-100"
//     />
//   </div>
// );

// const SelectField = ({ label, value, onChange, options }) => (
//   <div className="flex flex-col">
//     <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
//     <select
//       value={value}
//       onChange={onChange}
//       className="border border-gray-300 rounded-lg p-2 text-sm"
//     >
//       {options.map((o) => (
//         <option key={o.value} value={o.value}>
//           {o.label}
//         </option>
//       ))}
//     </select>
//   </div>
// );
// /* ------------------------------------ */

// export default function EditSupervisorExperiencePopup({
//   show,
//   onClose,
//   supervisor,
// }) {
//   const {
//     updateSupervisorExperience, // ✅ CORRECT METHOD
//     getSupervisorDetails,
//   } = useSupervisorRegistrationStore();

//   const [form, setForm] = useState({});

//   useEffect(() => {
//     if (supervisor) {
//       setForm({
//         isExperienced: supervisor.isExperienced || false,
//         yearsOfExperience: supervisor.yearsOfExperience || 0,
//         monthsOfExperience: supervisor.monthsOfExperience || 0,
//         providerName: supervisor.providerName || "",
//         providerAddress: supervisor.providerAddress || "",
//         startDate: supervisor.startDate
//           ? supervisor.startDate.split("T")[0]
//           : "",
//         endDate: supervisor.endDate
//           ? supervisor.endDate.split("T")[0]
//           : "",
//         onGoing: supervisor.onGoing || false,
//         skillsIds: supervisor.skills?.map((s) => s.id) || [],
//         languageIds: supervisor.languages?.map((l) => l.id) || [],
//       });
//     }
//   }, [supervisor]);
//   console.log(form);
  

//   if (!show) return null;

//   const handleSave = async () => {
//   await updateSupervisorExperience(supervisor.id, {
//     isExperienced: form.isExperienced,
//     yearsOfExperience: Number(form.yearsOfExperience),
//     monthsOfExperience: Number(form.monthsOfExperience),
//     providerName: form.providerName || null,
//     providerAddress: form.providerAddress || null,

//     // ✅ FIXED DATE FORMAT
//     startDate: form.startDate
//       ? new Date(`${form.startDate}T00:00:00Z`).toISOString()
//       : null,

//     endDate: form.onGoing
//       ? null
//       : form.endDate
//       ? new Date(`${form.endDate}T00:00:00Z`).toISOString()
//       : null,

//     onGoing: form.onGoing,
//     skillsIds: form.skillsIds || [],
//     languageIds: form.languageIds || [],
//   });

//   // 🔄 refresh details
//   await getSupervisorDetails(supervisor.id);

//   onClose();
// };


//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
//       <div className="bg-white w-full max-w-3xl p-6 rounded-2xl relative">
//         <button onClick={onClose} className="absolute right-4 top-4">
//           <AiOutlineClose />
//         </button>

//         <h2 className="text-2xl font-bold mb-6 text-center">
//           Edit Experience Details
//         </h2>

//         <SelectField
//           label="Experience Level"
//           value={form.isExperienced ? "EXPERIENCED" : "FRESHER"}
//           onChange={(e) =>
//             setForm((p) => ({
//               ...p,
//               isExperienced: e.target.value === "EXPERIENCED",
//             }))
//           }
//           options={[
//             { label: "Fresher", value: "FRESHER" },
//             { label: "Experienced", value: "EXPERIENCED" },
//           ]}
//         />

//         <div className="grid grid-cols-2 gap-4 mt-4">
//           <InputField
//             label="Years of Experience"
//             value={form.yearsOfExperience}
//             onChange={(e) =>
//               setForm((p) => ({ ...p, yearsOfExperience: e.target.value }))
//             }
//             disabled={!form.isExperienced}
//           />
//           <InputField
//             label="Months of Experience"
//             value={form.monthsOfExperience}
//             onChange={(e) =>
//               setForm((p) => ({ ...p, monthsOfExperience: e.target.value }))
//             }
//             disabled={!form.isExperienced}
//           />
//         </div>

//         <InputField
//           label="Last Working Organization"
//           value={form.providerName}
//           onChange={(e) =>
//             setForm((p) => ({ ...p, providerName: e.target.value }))
//           }
//           disabled={!form.isExperienced}
//         />

//         <InputField
//           label="Work Location"
//           value={form.providerAddress}
//           onChange={(e) =>
//             setForm((p) => ({ ...p, providerAddress: e.target.value }))
//           }
//           disabled={!form.isExperienced}
//         />

//         <div className="grid grid-cols-2 gap-4 mt-4">
//           <InputField
//             label="Start Date"
//             type="date"
//             value={form.startDate}
//             onChange={(e) =>
//               setForm((p) => ({ ...p, startDate: e.target.value }))
//             }
//             disabled={!form.isExperienced}
//           />
//           <InputField
//             label="End Date"
//             type="date"
//             value={form.endDate}
//             onChange={(e) =>
//               setForm((p) => ({ ...p, endDate: e.target.value }))
//             }
//             disabled={!form.isExperienced || form.onGoing}
//           />
//         </div>

//         <label className="flex items-center gap-2 mt-3 text-sm">
//           <input
//             type="checkbox"
//             checked={form.onGoing}
//             onChange={(e) =>
//               setForm((p) => ({ ...p, onGoing: e.target.checked }))
//             }
//           />
//           Currently Working
//         </label>

//         <div className="flex justify-end gap-3 mt-8">
//           <button onClick={onClose}>Cancel</button>
//           <button
//             onClick={handleSave}
//             className="bg-blue-800 text-white px-4 py-2 rounded-lg"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }






"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";
import useManageProfessionalsStore from "@/app/lib/store/useManageProfessionalsStore";
import useLanguageStore from "@/app/lib/store/languageStore";
import LocationPickerPopup from "@/components/staffManagement/addNewStaff/LocationPickerPopup";

/* ---------------- Inputs ---------------- */
const InputField = ({ label, value, onChange, type = "text", disabled }) => (
  <div className="flex flex-col w-full">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      className={`border rounded-lg p-2 text-sm focus:outline-none focus:ring-2
        ${
          disabled
            ? "bg-gray-100 cursor-not-allowed"
            : "border-gray-300 focus:ring-blue-500"
        }`}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div className="flex flex-col w-full">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);
/* --------------------------------------- */

export default function EditSupervisorExperiencePopup({
  show,
  onClose,
  supervisor,
}) {
  const {
    updateSupervisorExperience,
    getSupervisorDetails,
  } = useSupervisorRegistrationStore();

  const { fetchItems, listedItems } = useManageProfessionalsStore();
  const {
    listedLanguages = [],
    fetchLanguages,
  } = useLanguageStore();

  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [errors, setErrors] = useState({});

  /* ---------------- Normalize category ---------------- */
  const normalizedCategory = useMemo(() => {
    if (!supervisor?.categoryByProfession) return "";
    if (supervisor.categoryByProfession === "REGISTERED_NURSE")
      return "REG_NURSES";
    if (supervisor.categoryByProfession === "ANCILLARY_PERSONAL")
      return "ANCILLARY";
    return supervisor.categoryByProfession;
  }, [supervisor]);

  /* ---------------- Fetch lists ---------------- */
  useEffect(() => {
    if (!normalizedCategory || normalizedCategory === "OTHER") return;
    fetchItems("skills", 1, 50, normalizedCategory);
    fetchItems("working-departments", 1, 50, normalizedCategory);
  }, [normalizedCategory, fetchItems]);

  useEffect(() => {
    fetchLanguages?.(1, 100);
  }, [fetchLanguages]);

  const skills = listedItems.skills || [];
  const departments = listedItems["working-departments"] || [];

  /* ---------------- Form state ---------------- */
  const [form, setForm] = useState({
    isExperienced: false,
    yearsOfExperience: "",
    monthsOfExperience: "",
    departmentId: "",
    providerName: "",
    providerAddress: "",
    startDate: "",
    endDate: "",
    onGoing: false,
    skillsIds: [],
    languageIds: [],
  });

  /* ---------------- Prefill ---------------- */
  useEffect(() => {
    if (!supervisor) return;

    setForm({
      isExperienced: supervisor.isExperienced || false,
      yearsOfExperience: supervisor.yearsOfExperience || "",
      monthsOfExperience: supervisor.monthsOfExperience || "",
      departmentId: supervisor.departmentId || "",
      providerName: supervisor.providerName || "",
      providerAddress: supervisor.providerAddress || "",
      startDate: supervisor.startDate
        ? supervisor.startDate.split("T")[0]
        : "",
      endDate: supervisor.endDate
        ? supervisor.endDate.split("T")[0]
        : "",
      onGoing: supervisor.onGoing || false,
      skillsIds: supervisor.skills?.map((s) => s.id) || [],
      languageIds: supervisor.languages?.map((l) => l.id) || [],
    });
  }, [supervisor]);

  if (!show) return null;

  /* ---------------- Toggle helpers (same as reference) ---------------- */
  const toggleId = (id, field) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(id)
        ? prev[field].filter((x) => x !== id)
        : [...prev[field], id],
    }));
  };

  /* ---------------- Save ---------------- */
//   const handleSave = async () => {
//     await updateSupervisorExperience(supervisor.id, {
//       isExperienced: form.isExperienced,
//       yearsOfExperience: Number(form.yearsOfExperience),
//       monthsOfExperience: Number(form.monthsOfExperience),
//       departmentId: form.departmentId || null,
//       providerName: form.providerName || null,
//       providerAddress: form.providerAddress || null,

//       startDate: form.startDate
//         ? new Date(`${form.startDate}T00:00:00Z`).toISOString()
//         : null,

//       endDate : form.endDate
//         ? new Date(`${form.endDate}T00:00:00Z`).toISOString()
//         : null,

//       onGoing: form.onGoing,
//       skillsIds: form.skillsIds,
//       languageIds: form.languageIds,
//     });

//     await getSupervisorDetails(supervisor.id);
//     onClose();
//   };
const validateForm = () => {
  const newErrors = {};

  if (form.isExperienced) {
    if (!form.yearsOfExperience && form.yearsOfExperience !== 0)
      newErrors.yearsOfExperience = "Years of experience is required";

    if (!form.monthsOfExperience && form.monthsOfExperience !== 0)
      newErrors.monthsOfExperience = "Months of experience is required";

    if (!form.departmentId)
      newErrors.departmentId = "Department is required";

    if (!form.providerName?.trim())
      newErrors.providerName = "Last working organization is required";

    if (!form.providerAddress?.trim())
      newErrors.providerAddress = "Work location is required";

    if (!form.startDate)
      newErrors.startDate = "Start date is required";

    if (!form.onGoing && !form.endDate)
      newErrors.endDate = "End date is required";

    if (!form.skillsIds.length)
      newErrors.skillsIds = "Select at least one skill";

    if (!form.languageIds.length)
      newErrors.languageIds = "Select at least one language";
  } else {
    // Fresher validation
    if (!form.skillsIds.length)
      newErrors.skillsIds = "Select at least one skill";

    if (!form.languageIds.length)
      newErrors.languageIds = "Select at least one language";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSave = async () => {
  if (!validateForm()) return;

  await updateSupervisorExperience(supervisor.id, {
    isExperienced: form.isExperienced,
    yearsOfExperience: Number(form.yearsOfExperience),
    monthsOfExperience: Number(form.monthsOfExperience),
    departmentId: form.departmentId || null,
    providerName: form.providerName || null,
    providerAddress: form.providerAddress || null,

    startDate: form.startDate
      ? new Date(`${form.startDate}T00:00:00Z`).toISOString()
      : null,

    endDate:
      form.onGoing
        ? null
        : form.endDate
        ? new Date(`${form.endDate}T00:00:00Z`).toISOString()
        : null,

    onGoing: form.onGoing,
    skillsIds: form.skillsIds,
    languageIds: form.languageIds,
  });

  await getSupervisorDetails(supervisor.id);
  onClose();
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-xl border">
        <button
          className="absolute top-4 right-4 text-gray-500"
          onClick={onClose}
        >
          <AiOutlineClose size={22} />
        </button>

        <h2 className="text-xl font-semibold mb-6 text-center">
          Edit Experience Details
        </h2>

        {/* Experience Level */}
        <SelectField
          label="Experience Level"
          value={form.isExperienced ? "EXPERIENCED" : "FRESHER"}
          onChange={(e) =>
            setForm((p) => ({
              ...p,
              isExperienced: e.target.value === "EXPERIENCED",
            }))
          }
          options={[
            { label: "Fresher", value: "FRESHER" },
            { label: "Experienced", value: "EXPERIENCED" },
          ]}
        />

        {/* Years / Months */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <InputField
            label="Years of Experience"
            value={form.yearsOfExperience}
            onChange={(e) =>
              setForm((p) => ({ ...p, yearsOfExperience: e.target.value }))
            }
            disabled={!form.isExperienced}
          />
          <InputField
            label="Months of Experience"
            value={form.monthsOfExperience}
            onChange={(e) =>
              setForm((p) => ({ ...p, monthsOfExperience: e.target.value }))
            }
            disabled={!form.isExperienced}
          />
        </div>

        {/* Department */}
        <div className="mt-4">
          <SelectField
            label="Department"
            value={form.departmentId}
            onChange={(e) =>
              setForm((p) => ({ ...p, departmentId: e.target.value }))
            }
            options={[
              { label: "Select Department", value: "" },
              ...departments.map((d) => ({
                label: d.workingDepartment,
                value: d.id,
              })),
            ]}
          />
        </div>

        <InputField
          label="Last Working Organization"
          value={form.providerName}
          onChange={(e) =>
            setForm((p) => ({ ...p, providerName: e.target.value }))
          }
          disabled={!form.isExperienced}
        />

        {/* Location */}
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Work Location
          </label>
          <button
            onClick={() => setShowLocationPopup(true)}
            disabled={!form.isExperienced}
            className="w-full border rounded-lg p-2 text-left text-sm"
          >
            {form.providerAddress || "Select Location"}
          </button>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <InputField
            label="Start Date"
            type="date"
            value={form.startDate}
            onChange={(e) =>
              setForm((p) => ({ ...p, startDate: e.target.value }))
            }
            disabled={!form.isExperienced}
          />
          <InputField
            label="End Date"
            type="date"
            value={form.endDate}
            onChange={(e) =>
              setForm((p) => ({ ...p, endDate: e.target.value }))
            }
            disabled={!form.isExperienced || form.onGoing}
          />
        </div>

        <label className="flex items-center gap-2 mt-3 text-sm">
          <input
            type="checkbox"
            checked={form.onGoing}
            onChange={(e) =>
              setForm((p) => ({ ...p, onGoing: e.target.checked }))
            }
          />
          Currently Working
        </label>

        {/* Skills */}
        <p className="text-sm font-medium mt-6 border-t pt-4">Skills</p>
        <div className="flex flex-wrap gap-4 mt-2">
          {skills.map((s) => (
            <label key={s.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.skillsIds.includes(s.id)}
                onChange={() => toggleId(s.id, "skillsIds")}
              />
              {s.skill}
            </label>
          ))}
        </div>

        {/* Languages */}
        <p className="text-sm font-medium mt-6 border-t pt-4">Languages</p>
        <div className="flex flex-wrap gap-4 mt-2">
          {listedLanguages.map((l) => (
            <label key={l.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.languageIds.includes(l.id)}
                onChange={() => toggleId(l.id, "languageIds")}
              />
              {l.language}
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-700 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>

      {showLocationPopup && (
        <LocationPickerPopup
          onClose={() => setShowLocationPopup(false)}
          onUpdated={(loc) =>
            setForm((p) => ({ ...p, providerAddress: loc.mapLocation || "" }))
          }
        />
      )}
    </div>
  );
}
