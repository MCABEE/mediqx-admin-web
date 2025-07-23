// "use client";
// import React, { useState, useEffect } from "react";

// const InputGroup = ({ label, type = "text", name, value, onChange }) => (
//   <div className="flex flex-col gap-[6px]">
//     <label className="text-sm font-medium text-[#1F2937]">{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-sm"
//     />
//   </div>
// );

// const EditBookingPopup = ({ initialData, onClose, onSave }) => {
//   const [form, setForm] = useState({
//     diagnosis: "",
//     startDate: "",
//     serviceType: "",
//     durationType: "",
//     durationValue: "",
//     weekdays: [],
//     flexibility: "",
//     startTime: "",
//     endTime: "",
//   });

//   useEffect(() => {
//     if (initialData) {
//       setForm({
//         ...initialData,
//         startDate: initialData.startDate?.slice(0, 10),
//         startTime: initialData.startTime?.slice(11, 16),
//         endTime: initialData.endTime?.slice(11, 16),
//       });
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     onSave(form);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center px-4">
//       <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 sm:p-8">
//         {/* Header */}
//         <div className="flex justify-between items-center border-b pb-4 mb-6">
//           <h2 className="text-xl font-semibold text-[#111827]">
//             Edit Service Details
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-red-500 text-xl transition"
//             aria-label="Close"
//           >
//             &times;
//           </button>
//         </div>

//         {/* Form */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <InputGroup
//             label="Diagnosis"
//             name="diagnosis"
//             value={form.diagnosis}
//             onChange={handleChange}
//           />
//           <InputGroup
//             label="Start Date"
//             name="startDate"
//             type="date"
//             value={form.startDate}
//             onChange={handleChange}
//           />
//           <InputGroup
//             label="Service Type"
//             name="serviceType"
//             value={form.serviceType}
//             onChange={handleChange}
//           />
//           <InputGroup
//             label="Duration Type"
//             name="durationType"
//             value={form.durationType}
//             onChange={handleChange}
//           />
//           <InputGroup
//             label="Duration Value (weeks)"
//             type="number"
//             name="durationValue"
//             value={form.durationValue}
//             onChange={handleChange}
//           />
//           <InputGroup
//             label="Start Time"
//             type="time"
//             name="startTime"
//             value={form.startTime}
//             onChange={handleChange}
//           />
//           <InputGroup
//             label="End Time"
//             type="time"
//             name="endTime"
//             value={form.endTime}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Footer Buttons */}
//         <div className="flex justify-end gap-3 mt-8">
//           <button
//             onClick={onClose}
//             className="px-5 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="px-6 py-2 rounded-md bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditBookingPopup;









"use client";
import useBookingStore from "@/app/lib/store/bookingStore";
import React, { useState, useEffect } from "react";

// Input Group Component
const InputGroup = ({ label, type = "text", name, value, onChange }) => (
  <div className="flex flex-col gap-[6px]">
    <label className="text-sm font-medium text-[#1F2937]">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-sm"
    />
  </div>
);

const EditBookingPopup = ({ initialData, onClose, onSave }) => {
   const { updateExistingBooking } = useBookingStore();
  const [form, setForm] = useState({
    // Patient Details
    fullName: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
    healthStatus: "",
    stayAt: "",
    city: "",
    contactPersonName: "",
    contactPersonRelation: "",
    contactPersonEmail: "",
    contactPersonMobileNumber: "",

    // Service Details
    diagnosis: "",
    startDate: "",
    serviceType: "",
    durationType: "",
    durationValue: "",
    weekdays: [],
    flexibility: "",
    startTime: "",
    endTime: "",
    scheduleType:"",

    // Staff Preferences
    preferredGender: "",
    preferredLanguages: [],
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        startDate: initialData.startDate?.slice(0, 10) || "",
        startTime: initialData.startTime?.slice(11, 16) || "",
        endTime: initialData.endTime?.slice(11, 16) || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

 const handleSave = async () => {
  const bookingId =form.id;
    const payload = { 
      userId:form.userId,
      patientName: form.fullName,
      gender: form.gender,
      age: Number(form.age),
      height: Number(form.height),
      weight: Number(form.weight),
      diagnosis: form.diagnosis,
      healthStatus: form.healthStatus,
      stayAt: form.stayAt,
      serviceType: form.serviceType,
      location: form.city, 
      // pincode: "123456",
      contactPersonName: form.contactPersonName,
      contactPersonRelation: form.contactPersonRelation,
      contactPersonMobileNumber: form.contactPersonMobileNumber,
      contactPersonEmail: form.contactPersonEmail,
      startDate: new Date(form.startDate).toISOString(),
      durationType: form.durationType,
      durationValue: Number(form.durationValue),
      startTime: form.startTime,
      endTime: form.endTime,
      weekdays: form.weekdays,
      flexibility: form.flexibility,
      preferredLanguages: form.preferredLanguages,
      preferredGender: form.preferredGender,
      scheduleType: form.scheduleType,
    };
    
    const result = await updateExistingBooking(bookingId, payload);
    if (result.success) {
      onSave(result.data); // close or update UI
    } else {
      console.log("Failed to update booking: " + result.error);
    }
  };


  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center px-4 overflow-y-auto py-10">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 sm:p-8 max-h-full overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-xl font-semibold text-[#111827]">
            Edit Booking Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl transition"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Patient Details */}
        <h3 className="text-lg font-semibold mb-4">Patient Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <InputGroup
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
          />
          <div className="flex flex-col gap-[6px]">
            <label className="text-sm font-medium text-[#1F2937]">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-sm"
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHERS">Others</option>
            </select>
          </div>
          <InputGroup
            label="Age"
            name="age"
            value={form.age}
            onChange={handleChange}
          />
          <InputGroup
            label="Height (cm)"
            name="height"
            value={form.height}
            onChange={handleChange}
          />
          <InputGroup
            label="Weight (kg)"
            name="weight"
            value={form.weight}
            onChange={handleChange}
          />
          <div className="flex flex-col gap-[6px]">
            <label className="text-sm font-medium text-[#1F2937]">
              Health Status
            </label>
            <select
              name="healthStatus"
              value={form.healthStatus}
              onChange={handleChange}
              required
              className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 outline-none text-sm"
            >
              <option value="" disabled>
                Select Health Status / Activity
              </option>
              <option value="Bedridden Patients">Bedridden Patients</option>
              <option value="Patients with Limited Mobility">
                Patients with Limited Mobility
              </option>
              <option value="Tube-fed Patients">Tube-fed Patients</option>
              <option value="Patients with Indwelling Catheters">
                Patients with Indwelling Catheters
              </option>
              <option value="Patients with Tracheostomy / Ventilator">
                Patients with Tracheostomy / Ventilator
              </option>
              <option value="Post-Surgical Recovery Patients">
                Post-Surgical Recovery Patients
              </option>
              <option value="Elderly with Chronic Conditions (Geriatric Care)">
                Elderly with Chronic Conditions (Geriatric Care)
              </option>
              <option value="Patients Requiring Palliative / Hospice Care">
                Patients Requiring Palliative / Hospice Care
              </option>
              <option value="Patients on IV Therapy / Home Infusion">
                Patients on IV Therapy / Home Infusion
              </option>
              <option value="Post-COVID or Respiratory Rehab Patients">
                Post-COVID or Respiratory Rehab Patients
              </option>
            </select>
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-sm font-medium text-[#1F2937]">
              Stay At
            </label>
            <select
              name="stayAt"
              value={form.stayAt}
              onChange={handleChange}
              required
              className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 outline-none text-sm"
            >
              <option value="" disabled>
                Now Patient stayed at
              </option>
              <option value="HOSPITAL">Hospital</option>
              <option value="RESIDENCE">Residence</option>
              <option value="CARE_HOME">Care Home</option>
              <option value="PSYCHIATRIC_HOME">Psychiatric Homes</option>
            </select>
          </div>

          <InputGroup
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
          />
          <InputGroup
            label="Contact Person"
            name="contactPersonName"
            value={form.contactPersonName}
            onChange={handleChange}
          />

          <div className="flex flex-col gap-[6px]">
            <label className="text-sm font-medium text-[#1F2937]">
              Relation to Patient
            </label>
            <select
              name="contactPersonRelation"
              value={form.contactPersonRelation}
              onChange={handleChange}
              required
              className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 outline-none text-sm"
            >
              <option value="">Relationship with patient</option>
              <option value="SELF">Self</option>
              <option value="Wife">Wife</option>
              <option value="Husband">Husband</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Son">Son</option>
              <option value="Daughter">Daughter</option>
              <option value="Brother">Brother</option>
              <option value="Sister">Sister</option>
              <option value="Son-in-law">Son-in-law</option>
              <option value="Daughter-in-law">Daughter-in-law</option>
              <option value="Father-in-law">Father-in-law</option>
              <option value="Mother-in-law">Mother-in-law</option>
              <option value="Grandfather">Grandfather</option>
              <option value="Grandmother">Grandmother</option>
              <option value="Grandson">Grandson</option>
              <option value="Granddaughter">Granddaughter</option>
              <option value="Uncle">Uncle</option>
              <option value="Aunt">Aunt</option>
              <option value="Nephew">Nephew</option>
              <option value="Niece">Niece</option>
              <option value="Cousin">Cousin</option>
              <option value="Relative (Other)">Relative (Other)</option>
              <option value="Caretaker / Attendant">
                Caretaker / Attendant
              </option>
              <option value="Legal Guardian">Legal Guardian</option>
              <option value="Friend">Friend</option>
            </select>
          </div>

          <InputGroup
            label="Email"
            name="contactPersonEmail"
            type="email"
            value={form.contactPersonEmail}
            onChange={handleChange}
          />
          <InputGroup
            label="Mobile Number"
            name="contactPersonMobileNumber"
            value={form.contactPersonMobileNumber}
            onChange={handleChange}
          />
        </div>

        {/* Service Details */}
        <h3 className="text-lg font-semibold mb-4">Service Required</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col gap-[6px]">
            <label className="text-sm font-medium text-[#1F2937]">
              Diagnosis
            </label>
            <select
              name="diagnosis"
              id="diagnosis"
              value={form.diagnosis}
              onChange={handleChange}
              required
              className="w-[328px] h-[40px] rounded-[15px] text-[14px] border border-[#BBBBBB] px-4 text-black outline-none"
            >
              <option value="" disabled>
                Select diagnosis
              </option>
              <option value="Pediatric Cancers">Pediatric Cancers</option>
              <option value="Neuroendocrine Tumors (NETs)">
                Neuroendocrine Tumors (NETs)
              </option>
              <option value="Bone and Soft Tissue Tumors">
                Bone and Soft Tissue Tumors
              </option>
              <option value="Skin Cancers">Skin Cancers</option>
              <option value="Gynecologic Cancers">Gynecologic Cancers</option>
              <option value="Genitourinary (GU) Cancers">
                Genitourinary (GU) Cancers
              </option>
              <option value="Gastrointestinal (GI) Cancers">
                Gastrointestinal (GI) Cancers
              </option>
              <option value="Hematologic Cancers (Blood & Bone Marrow)">
                Hematologic Cancers (Blood & Bone Marrow)
              </option>
              <option value="Breast Cancer">Breast Cancer</option>
              <option value="Head & Neck Cancers">Head & Neck Cancers</option>
              <option value="Respiratory System">Respiratory System</option>
              <option value="Central Nervous System (CNS) Cancers">
                Central Nervous System (CNS) Cancers
              </option>
              <option value="Hematology / Oncology">
                Hematology / Oncology
              </option>
              <option value="Obstetric / Gynecology">
                Obstetric / Gynecology
              </option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="Orthopedic / Trauma">Orthopedic / Trauma</option>
              <option value="Infectious Disease">Infectious Disease</option>
              <option value="Renal / Endocrine / Metabolic">
                Renal / Endocrine / Metabolic
              </option>
              <option value="Gastrointestinal">Gastrointestinal</option>
              <option value="Neurology">Neurology</option>
              <option value="Pulmonary">Pulmonary</option>
              <option value="Cardiovascular">Cardiovascular</option>
            </select>
          </div>

          <InputGroup
            label="Start Date"
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
          />
          <div className="flex flex-col gap-[6px]">
            <label className="text-sm font-medium text-[#1F2937]">
              Service Type
            </label>
            <select
              name="serviceType"
              value={form.serviceType}
              onChange={handleChange}
              required
              className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 outline-none"
            >
              <option value="" disabled>
                Service Required
              </option>
              <option value="DOCTOR_VISIT">Doctor Visit</option>
              <option value="NURSING_SERVICE_AT_HOME">
                Nursing service at home
              </option>
              <option value="NURSING_ASSISTANCE_AT_HOME">
                Nursing Assistance at home
              </option>
              <option value="NURSING_ASSISTANCE_VISIT">
                Nursing assistance Visit
              </option>
              <option value="NURSING_VISIT">Nursing visit</option>
              <option value="THERAPY">Therapy</option>
              <option value="DIAGNOSTIC_SERVICES_AT_HOME">
                Diagnostic services at home
              </option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-sm font-medium text-[#1F2937]">
              Duration Type
            </label>
            <select
              name="durationType"
              value={form.durationType}
              onChange={handleChange}
              required
              className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 placeholder:text-black outline-none"
            >
              <option value="" disabled>
                Single Visit / Periodically
              </option>
              <option value="ONE_TIME_VISIT">One-time visit</option>
              <option value="FEW_DAYS">Few Days</option>
              <option value="FEW_WEEKS">Few Weeks</option>
              <option value="LONG_TERM">Long-term</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <InputGroup
            label="Duration Value (weeks)"
            name="durationValue"
            type="number"
            value={form.durationValue}
            onChange={handleChange}
          />
          <InputGroup
            label="Start Time"
            name="startTime"
            type="time"
            value={form.startTime}
            onChange={handleChange}
          />
          <InputGroup
            label="End Time"
            name="endTime"
            type="time"
            value={form.endTime}
            onChange={handleChange}
          />
          <div className="flex flex-col gap-[6px]">
            <label className="text-sm font-medium text-[#1F2937]">
              Flexibility
            </label>
            <select
              name="flexibility"
              value={form.flexibility}
              onChange={handleChange}
              required
              className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 outline-none"
            >
              <option value="" disabled>
                Select flexibility
              </option>
              <option value="FIXED">Fixed</option>
              <option value="FLEXIBLE">Flexible</option>
            </select>
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-sm font-medium text-[#1F2937]">
              Schedule Type
            </label>
            <select
              name="scheduleType"
              value={form.scheduleType}
              onChange={handleChange}
              required
              className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 outline-none text-sm"
            >
               <option value=""  disabled>Daily Schedule Type</option>
            <option value="FULL_TIME_24_HOURS">Full Time(24Hrs)</option>
            <option value="DAY_SHIFT_12_HOURS">Day Shift(12Hrs)</option>
            <option value="DAY_SHIFT_8_HOURS">Day Shift(8Hrs)</option>
            <option value="NIGHT_SHIFT_12_HOURS">Night shift(12Hrs)</option>
            <option value="CUSTOM_HOURS">Custom Hours</option>
            </select>
          </div>

        
          {/* Shows comma-separated selected weekdays */}
        <div>
            <InputGroup
            label="Weekdays (comma separated)"
            name="weekdays"
            value={form.weekdays?.join(", ")}
            onChange={() => {}}
            readOnly
          />

          {/* Checkbox group for weekday selection */}
          <div className="grid grid-cols-2 gap-2 my-4">
            {[
              "MONDAY",
              "TUESDAY",
              "WEDNESDAY",
              "THURSDAY",
              "FRIDAY",
              "SATURDAY",
              "SUNDAY",
            ].map((day) => (
              <label key={day} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.weekdays?.includes(day)}
                  onChange={() => {
                    const updated = form.weekdays?.includes(day)
                      ? form.weekdays.filter((d) => d !== day) // Remove if already selected
                      : [...(form.weekdays || []), day]; // Add if not selected
                    setForm((prev) => ({ ...prev, weekdays: updated }));
                  }}
                />
                {day}
              </label>
            ))}
          </div>
        </div>
        </div>

        {/* Staff Preference */}
        <h3 className="text-lg font-semibold mb-4">Staff Preferences</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        
          <div>
            <label className="text-sm font-medium text-[#1F2937] mb-1 block">Preferred Gender</label>
<select
  name="preferredGender"
  value={form.preferredGender}
  onChange={(e) =>
    setForm((prev) => ({ ...prev, preferredGender: e.target.value }))
  }
  required
  className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 outline-none"
>
  <option value="">Select Gender</option>
  <option value="MALE">Male</option>
  <option value="FEMALE">Female</option>
</select>
          </div>
          {/* <InputGroup
            label="Preferred Languages (comma separated)"
            name="preferredLanguages"
            value={form.preferredLanguages?.join(", ")}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                preferredLanguages: e.target.value
                  .split(",")
                  .map((lang) => lang.trim()),
              }))
            }
          /> */}
          {/* Read-only Input showing comma-separated selected languages */}
          <div>
<InputGroup
  label="Preferred Languages (comma separated)"
  name="preferredLanguages"
  value={form.preferredLanguages?.join(", ")}
  onChange={() => {}}
  readOnly
/>

{/* Checkbox group for selecting preferred languages */}
<div className="grid grid-cols-2 gap-2 my-4">
  {[
    "HINDI",
    "KANNADA",
    "ENGLISH",
    "MALAYALAM",
    "TAMIL",
    "TELUGU",
  ].map((lang) => (
    <label key={lang} className="inline-flex items-center gap-2">
      <input
        type="checkbox"
        checked={form.preferredLanguages?.includes(lang)}
        onChange={() => {
          const updated = form.preferredLanguages?.includes(lang)
            ? form.preferredLanguages.filter((l) => l !== lang) // remove
            : [...(form.preferredLanguages || []), lang];       // add
          setForm((prev) => ({ ...prev, preferredLanguages: updated }));
        }}
      />
      {lang}
    </label>
  ))}
</div>
</div>

        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-md bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookingPopup;
