// "use client";

// import React, { useState, useEffect } from "react";
// import { IoClose } from "react-icons/io5";
// import useBookingStore from "@/app/lib/store/bookingStore";
// import useLanguageStore from "@/app/lib/store/languageStore";
// import useDiagnosisStore from "@/app/lib/store/useDiagnosisStore";
// import useHealthStatusStore from "@/app/lib/store/useHealthStatusStore";
// import usePatientServiceStore from "@/app/lib/store/usePatientServiceStore";

// const CreateServiceBookingPopup = ({ onClose }) => {
//   const { submitBooking } = useBookingStore();
//   const [langError, setLangError] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [selectedDiagnosis, setSelectedDiagnosis] = useState("");

//   const [form, setForm] = useState({
//     patientName: "",
//     gender: "",
//     age: "",
//     height: "",
//     weight: "",
//     diagnosis: "",
//     healthStatus: "",
//     stayAt: "",
//     serviceType: "",
//     location: "",
//     pincode: "",
//     contactPersonName: "",
//     contactPersonRelation: "",
//     contactPersonEmail: "",
//     contactPersonMobileNumber: "",
//     scheduleType: "",
//     startDate: "",
//     durationType: "",
//     durationValue: "",
//     startTime: "",
//     endTime: "",
//   });

//   const [visitType, setVisitType] = useState("");
//   const [weekdays, setWeekdays] = useState([]);
//   const [flexibility, setFlexibility] = useState("");
//   const [preferredGender, setPreferredGender] = useState("");
//   const [preferredLanguages, setPreferredLanguages] = useState([]);

//   // Language store
//   const {
//     listedLanguages,
//     fetchLanguages,
//     isLoading: isLangLoading,
//     error: langErrorFetch,
//   } = useLanguageStore();

//   useEffect(() => {
//     fetchLanguages(1, 100);
//   }, [fetchLanguages]);

//   // Health Status store
//   const {
//     listedServices: healthStatuses,
//     fetchServices: fetchHealthStatuses,
//   } = useHealthStatusStore();

//   // Patient Services store
//   const {
//     listedServices: patientServices,
//     fetchServices: fetchPatientServices,
//   } = usePatientServiceStore();

//   useEffect(() => {
//     fetchHealthStatuses(1, 100);
//     fetchPatientServices(1, 100);
//   }, [fetchHealthStatuses, fetchPatientServices]);

//   // Diagnoses store
//   const { listedDiagnoses, fetchDiagnosesList, isLoading, error } =
//     useDiagnosisStore();

//   useEffect(() => {
//     fetchDiagnosesList(1, 50);
//   }, [fetchDiagnosesList]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Handle scheduleType changes
//     if (name === "scheduleType") {
//       let startTime = "";
//       let endTime = "";

//       switch (value) {
//         case "FULL_TIME_24_HOURS":
//           startTime = "00:00";
//           endTime = "23:59";
//           break;
//         case "DAY_SHIFT_12_HOURS":
//           startTime = "08:00";
//           endTime = "20:00";
//           break;
//         case "NIGHT_SHIFT_12_HOURS":
//           startTime = "20:00";
//           endTime = addHoursToTime(startTime, 12);
//           break;
//         default:
//           startTime = "";
//           endTime = "";
//       }

//       setForm((prev) => ({ ...prev, scheduleType: value, startTime, endTime }));
//       return;
//     }

//     // Auto-update endTime if startTime changes
//     if (
//       name === "startTime" &&
//       form.scheduleType &&
//       form.scheduleType !== "CUSTOM_HOURS"
//     ) {
//       let endTime = form.endTime;

//       if (
//         form.scheduleType === "DAY_SHIFT_12_HOURS" ||
//         form.scheduleType === "NIGHT_SHIFT_12_HOURS"
//       ) {
//         endTime = addHoursToTime(value, 12);
//       } else if (form.scheduleType === "FULL_TIME_24_HOURS") {
//         endTime = addHoursToTime(value, 24);
//       }

//       setForm((prev) => ({ ...prev, startTime: value, endTime }));
//       return;
//     }

//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const addHoursToTime = (timeStr, hoursToAdd) => {
//     if (!timeStr) return "";
//     const [hours, minutes] = timeStr.split(":").map(Number);
//     const date = new Date();
//     date.setHours(hours + hoursToAdd);
//     date.setMinutes(minutes);
//     const newHours = String(date.getHours()).padStart(2, "0");
//     const newMinutes = String(date.getMinutes()).padStart(2, "0");
//     return `${newHours}:${newMinutes}`;
//   };

//   const toggleArray = (value, array, setArray) => {
//     if (array.includes(value)) {
//       setArray(array.filter((v) => v !== value));
//     } else {
//       setArray([...array, value]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (preferredLanguages.length === 0) {
//       setLangError(true);
//       return;
//     }

//     const payload = {
//       ...form,
//       diagnosisId: selectedDiagnosis,
//       serviceTypeId: form.serviceType,
//       healthStatusId: form.healthStatus,
//       contactPersonMobileNumber: form.contactPersonMobileNumber.startsWith("+91")
//         ? form.contactPersonMobileNumber
//         : `+91${form.contactPersonMobileNumber}`,
//       age: Number(form.age),
//       height: Number(form.height || 0),
//       weight: Number(form.weight || 0),
//       startDate: new Date(form.startDate).toISOString(),
//       durationType: visitType,
//       durationValue:
//         visitType === "ONE_TIME_VISIT" ? "0" : Number(form.durationValue),
//       weekdays,
//       flexibility,
//       preferredLanguageId: preferredLanguages,
//       preferredGender,
//       durationValue: form.durationValue || 1,
//       officialAddress: form.location,
//     };

//     const result = await submitBooking(payload);
//     setSuccessMessage(result.success ? "Booking created successfully." : "Failed to create booking.");
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
//       <div className="bg-white w-[800px] max-h-[90vh] overflow-y-auto rounded-[15px] p-6 relative">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
//         >
//           <IoClose />
//         </button>

//         <h1 className="text-xl font-semibold mb-4">Create Service Booking</h1>

//         <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
//           {/* ===== Service Details ===== */}
//           <div className="flex-1 min-w-[320px]">
//             <h2 className="text-lg font-semibold mb-2">Service Details</h2>

//             {/* Diagnosis */}
//             <select
//               name="diagnosis"
//               required
//               value={selectedDiagnosis}
//               onChange={(e) => setSelectedDiagnosis(e.target.value)}
//               className="w-full h-[40px] rounded-[15px] border border-gray-300 px-4 mb-3"
//             >
//               <option value="" disabled>
//                 Select Diagnosis
//               </option>
//               {listedDiagnoses.map((diag) => (
//                 <option key={diag.id} value={diag.id}>
//                   {diag.diagnosis}
//                 </option>
//               ))}
//             </select>

//             {/* Start Date */}
//             <input
//               name="startDate"
//               type="date"
//               value={form.startDate}
//               onChange={handleChange}
//               min={new Date().toISOString().split("T")[0]}
//               required
//               className="w-full h-[40px] rounded-[15px] border border-gray-300 px-4 mb-3"
//             />

//             {/* Visit Type */}
//             <select
//               value={visitType}
//               onChange={(e) => setVisitType(e.target.value)}
//               required
//               className="w-full h-[40px] rounded-[15px] border border-gray-300 px-4 mb-3"
//             >
//               <option value="" disabled>
//                 Single Visit / Periodically
//               </option>
//               <option value="ONE_TIME_VISIT">One-time visit</option>
//               <option value="FEW_DAYS">Few Days</option>
//               <option value="FEW_WEEKS">Few Weeks</option>
//               <option value="LONG_TERM">Long-term</option>
//             </select>

//             {/* Duration */}
//             {visitType && visitType !== "ONE_TIME_VISIT" && (
//               <div className="flex items-center gap-2 mb-3">
//                 <select
//                   name="durationValue"
//                   value={form.durationValue}
//                   onChange={handleChange}
//                   className="h-[40px] w-[200px] rounded-[15px] border border-gray-300 px-4"
//                 >
//                   <option value="" disabled>
//                     Duration
//                   </option>
//                   {[1, 2, 3, 4, 5, 6].map((val) => (
//                     <option key={val} value={val}>
//                       {val}
//                     </option>
//                   ))}
//                 </select>
//                 <span>
//                   {{
//                     FEW_DAYS: "Days",
//                     FEW_WEEKS: "Weeks",
//                     LONG_TERM: "Months",
//                   }[visitType]}
//                 </span>
//               </div>
//             )}

//             {/* Schedule Type */}
//             <select
//               name="scheduleType"
//               value={form.scheduleType}
//               onChange={handleChange}
//               required
//               className="w-full h-[40px] rounded-[15px] border border-gray-300 px-4 mb-3"
//             >
//               <option value="" disabled>
//                 Daily Schedule Type
//               </option>
//               <option value="FULL_TIME_24_HOURS">Full Time(24Hrs)</option>
//               <option value="DAY_SHIFT_12_HOURS">Day Shift(12Hrs)</option>
//               <option value="NIGHT_SHIFT_12_HOURS">Night shift(12Hrs)</option>
//               <option value="CUSTOM_HOURS">Custom Hours</option>
//             </select>

//             {/* Weekdays */}
//             {visitType && visitType !== "ONE_TIME_VISIT" && (
//               <div className="grid grid-cols-4 gap-2 mb-3">
//                 {[
//                   "MONDAY",
//                   "TUESDAY",
//                   "WEDNESDAY",
//                   "THURSDAY",
//                   "FRIDAY",
//                   "SATURDAY",
//                   "SUNDAY",
//                 ].map((day) => (
//                   <label key={day} className="inline-flex items-center gap-1">
//                     <input
//                       type="checkbox"
//                       checked={weekdays.includes(day)}
//                       onChange={() => toggleArray(day, weekdays, setWeekdays)}
//                     />
//                     {day.slice(0, 3)}
//                   </label>
//                 ))}
//               </div>
//             )}

//             {/* Flexibility */}
//             <div className="flex items-center gap-4 mb-3">
//               {["FIXED", "FLEXIBLE"].map((option) => (
//                 <label key={option} className="inline-flex items-center gap-2">
//                   <input
//                     type="radio"
//                     name="flexibility"
//                     checked={flexibility === option}
//                     onChange={() => setFlexibility(option)}
//                   />
//                   {option.charAt(0) + option.slice(1).toLowerCase()}
//                 </label>
//               ))}
//             </div>

//             {/* Time Inputs */}
//             <div className="flex items-center gap-4">
//               <input
//                 name="startTime"
//                 type="time"
//                 value={form.startTime}
//                 onChange={handleChange}
//                 required
//                 disabled={!form.scheduleType}
//                 className="w-[160px] h-[40px] rounded-[15px] border border-gray-300 px-4"
//               />
//               <span>to</span>
//               <input
//                 name="endTime"
//                 type="time"
//                 value={form.endTime}
//                 onChange={handleChange}
//                 required
//                 disabled={form.scheduleType !== "CUSTOM_HOURS"}
//                 className={`w-[160px] h-[40px] rounded-[15px] border border-gray-300 px-4 ${
//                   form.scheduleType !== "CUSTOM_HOURS"
//                     ? "bg-gray-100 cursor-not-allowed"
//                     : ""
//                 }`}
//               />
//             </div>
//           </div>

//           {/* ===== Staff Preferences ===== */}
//           <div className="flex-1 min-w-[320px]">
//             <h2 className="text-lg font-semibold mb-2">Staff Preferences</h2>

//             <select
//               value={preferredGender}
//               onChange={(e) => setPreferredGender(e.target.value)}
//               required
//               className="w-full h-[40px] rounded-[15px] border border-gray-300 px-4 mb-3"
//             >
//               <option value="">Preferred Gender</option>
//               <option value="MALE">Male</option>
//               <option value="FEMALE">Female</option>
//             </select>

//             <h3 className="font-semibold text-[15px] mb-2">
//               Preferred Languages
//             </h3>
//             <div className="grid grid-cols-2 gap-2">
//               {listedLanguages.map((lang) => (
//                 <label key={lang.id} className="inline-flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={preferredLanguages.includes(lang.id)}
//                     onChange={() => {
//                       toggleArray(
//                         lang.id,
//                         preferredLanguages,
//                         setPreferredLanguages
//                       );
//                       if (preferredLanguages.length > 0) setLangError(false);
//                     }}
//                   />
//                   {lang.language}
//                 </label>
//               ))}
//             </div>
//             {langError && (
//               <p className="text-red-500 text-sm mt-2">
//                 Please select at least one preferred language.
//               </p>
//             )}
//           </div>

//           <div className="w-full flex justify-end mt-6">
//             <button
//               type="submit"
//               className="bg-[#3674B5] text-white px-6 py-2 rounded-[15px] hover:bg-[#285a8b]"
//             >
//               Submit
//             </button>
//           </div>
//         </form>

//         {successMessage && (
//           <p className="text-green-600 text-center mt-4">{successMessage}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CreateServiceBookingPopup;








"use client";

import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import useBookingStore from "@/app/lib/store/bookingStore";
import useLanguageStore from "@/app/lib/store/languageStore";
import useDiagnosisStore from "@/app/lib/store/useDiagnosisStore";
import useHealthStatusStore from "@/app/lib/store/useHealthStatusStore";
import usePatientServiceStore from "@/app/lib/store/usePatientServiceStore";

const CreateServiceBookingPopup = ({ onClose }) => {
  const { submitBooking } = useBookingStore();
  const [langError, setLangError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedDiagnosis, setSelectedDiagnosis] = useState("");

  const [form, setForm] = useState({
    patientName: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
    diagnosis: "",
    healthStatus: "",
    stayAt: "",
    serviceType: "",
    location: "",
    pincode: "",
    contactPersonName: "",
    contactPersonRelation: "",
    contactPersonEmail: "",
    contactPersonMobileNumber: "",
    scheduleType: "",
    startDate: "",
    durationType: "",
    durationValue: "",
    startTime: "",
    endTime: "",
  });

  const [visitType, setVisitType] = useState("");
  const [weekdays, setWeekdays] = useState([]);
  const [flexibility, setFlexibility] = useState("");
  const [preferredGender, setPreferredGender] = useState("");
  const [preferredLanguages, setPreferredLanguages] = useState([]);

  // Store connections
  const {
    listedLanguages,
    fetchLanguages,
    isLoading: isLangLoading,
    error: langErrorFetch,
  } = useLanguageStore();
  const { listedServices: healthStatuses, fetchServices: fetchHealthStatuses } =
    useHealthStatusStore();
  const {
    listedServices: patientServices,
    fetchServices: fetchPatientServices,
  } = usePatientServiceStore();
  const { listedDiagnoses, fetchDiagnosesList } = useDiagnosisStore();

  useEffect(() => {
    fetchLanguages(1, 100);
    fetchHealthStatuses(1, 100);
    fetchPatientServices(1, 100);
    fetchDiagnosesList(1, 50);
  }, [
    fetchLanguages,
    fetchHealthStatuses,
    fetchPatientServices,
    fetchDiagnosesList,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "scheduleType") {
      let startTime = "",
        endTime = "";
      switch (value) {
        case "FULL_TIME_24_HOURS":
          startTime = "00:00";
          endTime = "23:59";
          break;
        case "DAY_SHIFT_12_HOURS":
          startTime = "08:00";
          endTime = "20:00";
          break;
        case "NIGHT_SHIFT_12_HOURS":
          startTime = "20:00";
          endTime = addHoursToTime(startTime, 12);
          break;
      }
      setForm((prev) => ({ ...prev, scheduleType: value, startTime, endTime }));
      return;
    }

    if (
      name === "startTime" &&
      form.scheduleType &&
      form.scheduleType !== "CUSTOM_HOURS"
    ) {
      let endTime = form.endTime;
      if (
        form.scheduleType === "DAY_SHIFT_12_HOURS" ||
        form.scheduleType === "NIGHT_SHIFT_12_HOURS"
      ) {
        endTime = addHoursToTime(value, 12);
      } else if (form.scheduleType === "FULL_TIME_24_HOURS") {
        endTime = addHoursToTime(value, 24);
      }
      setForm((prev) => ({ ...prev, startTime: value, endTime }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addHoursToTime = (timeStr, hoursToAdd) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours + hoursToAdd);
    date.setMinutes(minutes);
    const newHours = String(date.getHours()).padStart(2, "0");
    const newMinutes = String(date.getMinutes()).padStart(2, "0");
    return `${newHours}:${newMinutes}`;
  };

  const toggleArray = (value, array, setArray) => {
    if (array.includes(value)) setArray(array.filter((v) => v !== value));
    else setArray([...array, value]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (preferredLanguages.length === 0) {
      setLangError(true);
      return;
    }

    const payload = {
      ...form,
      diagnosisId: selectedDiagnosis,
      serviceTypeId: form.serviceType,
      healthStatusId: form.healthStatus,
      contactPersonMobileNumber: form.contactPersonMobileNumber.startsWith("+91")
        ? form.contactPersonMobileNumber
        : `+91${form.contactPersonMobileNumber}`,
      age: Number(form.age),
      height: Number(form.height || 0),
      weight: Number(form.weight || 0),
      startDate: new Date(form.startDate).toISOString(),
      durationType: visitType,
      durationValue:
        visitType === "ONE_TIME_VISIT" ? "0" : Number(form.durationValue),
      weekdays,
      flexibility,
      preferredLanguageId: preferredLanguages,
      preferredGender,
      durationValue: form.durationValue || 1,
      officialAddress: form.location,
    };

    const result = await submitBooking(payload);
    setSuccessMessage(
      result.success ? "Booking created successfully!" : "Failed to create booking."
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[900px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative p-8 transition-all duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
        >
          <IoClose />
        </button>

        <h1 className="text-2xl font-semibold text-[#3674B5] mb-6">
          Create New Service Booking
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
          {/* ---------------- SERVICE DETAILS ---------------- */}
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Service Details
            </h2>

            {/* Diagnosis */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Diagnosis
              </label>
              <select
                value={selectedDiagnosis}
                onChange={(e) => setSelectedDiagnosis(e.target.value)}
                required
                className="w-full h-[44px] rounded-xl border border-gray-300 px-4 focus:ring-2 focus:ring-[#3674B5] outline-none"
              >
                <option value="">Select Diagnosis</option>
                {listedDiagnoses.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.diagnosis}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                required
                className="w-full h-[44px] rounded-xl border border-gray-300 px-4 focus:ring-2 focus:ring-[#3674B5] outline-none"
              />
            </div>

            {/* Visit Type */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Visit Type
              </label>
              <select
                value={visitType}
                onChange={(e) => setVisitType(e.target.value)}
                className="w-full h-[44px] rounded-xl border border-gray-300 px-4 focus:ring-2 focus:ring-[#3674B5] outline-none"
              >
                <option value="">Single Visit / Periodic</option>
                <option value="ONE_TIME_VISIT">One-time visit</option>
                <option value="FEW_DAYS">Few Days</option>
                <option value="FEW_WEEKS">Few Weeks</option>
                <option value="LONG_TERM">Long-term</option>
              </select>
            </div>

            {/* Duration */}
            {visitType && visitType !== "ONE_TIME_VISIT" && (
              <div className="flex items-center gap-3">
                <select
                  name="durationValue"
                  value={form.durationValue}
                  onChange={handleChange}
                  className="w-[160px] h-[44px] rounded-xl border border-gray-300 px-4 focus:ring-2 focus:ring-[#3674B5]"
                >
                  <option value="">Duration</option>
                  {[1, 2, 3, 4, 5, 6].map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
                <span className="text-gray-700 font-medium">
                  {{
                    FEW_DAYS: "Days",
                    FEW_WEEKS: "Weeks",
                    LONG_TERM: "Months",
                  }[visitType]}
                </span>
              </div>
            )}

            {/* Schedule Type */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Daily Schedule Type
              </label>
              <select
                name="scheduleType"
                value={form.scheduleType}
                onChange={handleChange}
                required
                className="w-full h-[44px] rounded-xl border border-gray-300 px-4 focus:ring-2 focus:ring-[#3674B5]"
              >
                <option value="">Select</option>
                <option value="FULL_TIME_24_HOURS">Full Time (24Hrs)</option>
                <option value="DAY_SHIFT_12_HOURS">Day Shift (12Hrs)</option>
                <option value="NIGHT_SHIFT_12_HOURS">Night Shift (12Hrs)</option>
                <option value="CUSTOM_HOURS">Custom Hours</option>
              </select>
            </div>

            {/* Weekdays */}
            {visitType && visitType !== "ONE_TIME_VISIT" && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Work Days
                </label>
                <div className="grid grid-cols-4 gap-2 text-sm text-gray-700">
                  {[
                    "MONDAY",
                    "TUESDAY",
                    "WEDNESDAY",
                    "THURSDAY",
                    "FRIDAY",
                    "SATURDAY",
                    "SUNDAY",
                  ].map((day) => (
                    <label key={day} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={weekdays.includes(day)}
                        onChange={() => toggleArray(day, weekdays, setWeekdays)}
                      />
                      {day.slice(0, 3)}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Time Range */}
            <div className="flex items-center gap-3">
              <input
                name="startTime"
                type="time"
                value={form.startTime}
                onChange={handleChange}
                disabled={!form.scheduleType}
                className="w-[140px] h-[44px] border border-gray-300 rounded-xl px-3 focus:ring-2 focus:ring-[#3674B5]"
              />
              <span>to</span>
              <input
                name="endTime"
                type="time"
                value={form.endTime}
                onChange={handleChange}
                disabled={form.scheduleType !== "CUSTOM_HOURS"}
                className={`w-[140px] h-[44px] border border-gray-300 rounded-xl px-3 focus:ring-2 focus:ring-[#3674B5] ${
                  form.scheduleType !== "CUSTOM_HOURS"
                    ? "bg-gray-100 cursor-not-allowed"
                    : ""
                }`}
              />
            </div>
          </div>

          {/* ---------------- STAFF PREFERENCES ---------------- */}
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Staff Preferences
            </h2>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Preferred Gender
              </label>
              <select
                value={preferredGender}
                onChange={(e) => setPreferredGender(e.target.value)}
                className="w-full h-[44px] rounded-xl border border-gray-300 px-4 focus:ring-2 focus:ring-[#3674B5]"
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>

            {/* Flexibility */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Shift Flexibility
              </label>
              <div className="flex gap-6 text-gray-700">
                {["FIXED", "FLEXIBLE"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={flexibility === opt}
                      onChange={() => setFlexibility(opt)}
                    />
                    {opt.charAt(0) + opt.slice(1).toLowerCase()}
                  </label>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Preferred Languages
              </label>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                {listedLanguages.map((lang) => (
                  <label key={lang.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={preferredLanguages.includes(lang.id)}
                      onChange={() =>
                        toggleArray(
                          lang.id,
                          preferredLanguages,
                          setPreferredLanguages
                        )
                      }
                    />
                    {lang.language}
                  </label>
                ))}
              </div>
              {langError && (
                <p className="text-red-500 text-sm mt-2">
                  Please select at least one language.
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-end pt-6 mt-4">
            <button
              type="submit"
              className="bg-[#3674B5] hover:bg-[#285a8b] text-white px-6 py-2 rounded-xl shadow-md transition-all"
            >
              Submit Booking
            </button>
          </div>
        </form>

        {successMessage && (
          <p className="text-center text-green-600 font-medium mt-4">
            {successMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateServiceBookingPopup;
