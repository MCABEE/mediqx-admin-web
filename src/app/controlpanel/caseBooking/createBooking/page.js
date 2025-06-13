// "use client";
// import Navlink from "@/components/caseBooking/NavLink";
// import React, { useState } from "react";

// const page = () => {
//   const [fromType, setFromType] = useState("text");
//   const [toType, setToType] = useState("text");
//     const [visitType, setVisitType] = useState("");

//   const handleVisitTypeChange = (e) => {
//     setVisitType(e.target.value);
//   };

//   // Determine label based on visit type
//   const durationLabel = {
//     "Few Days": "Days",
//     "Few Weeks": "Weeks",
//     "Long-term": "Months",
//   }[visitType];

//   return (
// <>
// <Navlink/>
//     <div className=" w-full mt-2 bg-white rounded-[15px] border-[1px] border-[#BBBBBB]">

//       <div className="w-full h-[72px] flex items-center bg-white px-8 rounded-t-[15px] border-[#BBBBBB] border-b-[1px]">
//         <h1 className="text-[16px] font-semibold text-black">
//           Patient Details
//         </h1>
//       </div>
//       <div className="px-8 text-[14px] text-black font-light flex flex-col gap-4">
//         <input
//           type="text"
//           placeholder="Patient Name"
//           className="w-[328px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px] mt-[24px] outline-none placeholder:text-black"
//         />
//         <div className="flex gap-1">
//           <select
//             name=""
//             id=""
//             className="w-[160px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px]"
//           >
//             <option value="" selected disabled>
//               Gender
//             </option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//          <input
//           type="text"
//           placeholder="Age"
//           className="w-[160px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px]  outline-none placeholder:text-black"
//         />
//         </div>
//         <div className="flex gap-1">
//           <select
//             name=""
//             id=""
//             className="w-[160px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px]"
//           >
//             <option value="" selected disabled>
//               Height (CM)
//             </option>
//           </select>
//           <select
//             name=""
//             id=""
//             className="w-[160px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px]"
//           >
//             <option value="" selected disabled>
//               Weight (Kg)
//             </option>
//             <option value="">1</option>
//           </select>
//         </div>
//     <select
//   name="serviceRequired"
//   id="serviceRequired"
//   className="w-[328px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px]"
// >
//   <option value="" disabled selected>
//     Service Required
//   </option>
//   <option value="Nursing Service At Home">Nursing Service At Home</option>
//   <option value="Nursing Assistance At Home">Nursing Assistance At Home</option>
//   <option value="Nursing Assistance Visit">Nursing Assistance Visit</option>
//   <option value="Nursing Visit">Nursing Visit</option>
//   <option value="Therapy">Therapy</option>
//   <option value="Diagnostic Services at Home">Diagnostic Services at Home</option>
// </select>

//         <select
//   name="healthStatus"
//   id="healthStatus"
//   className="w-[328px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px]"
// >
//   <option value="" disabled selected>
//     Current Health Status / Activity
//   </option>
//   <option value="Bedridden Patients">Bedridden Patients</option>
//   <option value="Patients with Limited Mobility">Patients with Limited Mobility</option>
//   <option value="Tube-fed Patients">Tube-fed Patients</option>
//   <option value="Patients with Indwelling Catheters">Patients with Indwelling Catheters</option>
//   <option value="Patients with Tracheostomy / Ventilator">Patients with Tracheostomy / Ventilator</option>
//   <option value="Post-Surgical Recovery Patients">Post-Surgical Recovery Patients</option>
//   <option value="Elderly with Chronic Conditions (Geriatric Care)">
//     Elderly with Chronic Conditions (Geriatric Care)
//   </option>
//   <option value="Patients Requiring Palliative / Hospice Care">
//     Patients Requiring Palliative / Hospice Care
//   </option>
//   <option value="Patients on IV Therapy / Home Infusion">
//     Patients on IV Therapy / Home Infusion
//   </option>
//   <option value="Post-COVID or Respiratory Rehab Patients">
//     Post-COVID or Respiratory Rehab Patients
//   </option>
// </select>

//        <select
//   name="patientLocation"
//   id="patientLocation"
//   className="w-[328px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px]"
// >
//   <option value="" disabled selected>
//     Now Patient stayed at
//   </option>
//   <option value="Hospital">Hospital</option>
//   <option value="Residence">Residence</option>
//   <option value="Care Home">Care Home</option>
//   <option value="Psychiatric Homes">Psychiatric Homes</option>
// </select>

//         <textarea
//           name=""
//           id=""
//           placeholder="Residential Address"
//           className="w-[328px] h-[96px] rounded-[15px] border border-[#BBBBBB] ps-[32px]  placeholder:text-black py-2"
//         ></textarea>

//         <input
//           type="text"
//           placeholder="Pincode"
//           className="w-[328px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px] outline-none placeholder:text-black"
//         />
//         <input
//           type="text"
//           placeholder="Contact Person (Relative) Name"
//           className="w-[328px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px]  outline-none placeholder:text-black"
//         />
//        <select
//   name="relationshipWithPatient"
//   id="relationshipWithPatient"
//   className="w-[328px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px]"
// >
//   <option value="" disabled selected>
//     Relationship with patient
//   </option>
//   <option value="Self">Self</option>
//   <option value="Wife">Wife</option>
//   <option value="Husband">Husband</option>
//   <option value="Father">Father</option>
//   <option value="Mother">Mother</option>
//   <option value="Son">Son</option>
//   <option value="Daughter">Daughter</option>
//   <option value="Brother">Brother</option>
//   <option value="Sister">Sister</option>
//   <option value="Son-in-law">Son-in-law</option>
//   <option value="Daughter-in-law">Daughter-in-law</option>
//   <option value="Father-in-law">Father-in-law</option>
//   <option value="Mother-in-law">Mother-in-law</option>
//   <option value="Grandfather">Grandfather</option>
//   <option value="Grandmother">Grandmother</option>
//   <option value="Grandson">Grandson</option>
//   <option value="Granddaughter">Granddaughter</option>
//   <option value="Uncle">Uncle</option>
//   <option value="Aunt">Aunt</option>
//   <option value="Nephew">Nephew</option>
//   <option value="Niece">Niece</option>
//   <option value="Cousin">Cousin</option>
//   <option value="Relative (Other)">Relative (Other)</option>
//   <option value="Caretaker / Attendant">Caretaker / Attendant</option>
//   <option value="Legal Guardian">Legal Guardian</option>
//   <option value="Friend">Friend</option>
// </select>

//         <input
//           type="text"
//           placeholder="Email ID"
//           className="w-[328px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px] outline-none placeholder:text-black"
//         />
//         <input
//           type="text"
//           placeholder="Mobile Number"
//           className="w-[328px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px] outline-none placeholder:text-black"
//         />
//       </div>

//       <h1 className="text-[16px] font-semibold text-black ps-[32px] py-[15px] mt-6">
//         Service Details
//       </h1>
//       <div className="flex flex-col ps-[32px] gap-4">
//        <select
//   name="diagnosis"
//   id="diagnosis"
//   className="w-[328px] h-[40px] rounded-[15px] text-[14px] border border-[#BBBBBB] ps-[32px] text-black"
// >
//   <option value="" disabled selected>
//     Diagnosis
//   </option>
//   <option value="Pediatric Cancers">Pediatric Cancers</option>
//   <option value="Neuroendocrine Tumors (NETs)">Neuroendocrine Tumors (NETs)</option>
//   <option value="Bone and Soft Tissue Tumors">Bone and Soft Tissue Tumors</option>
//   <option value="Skin Cancers">Skin Cancers</option>
//   <option value="Gynecologic Cancers">Gynecologic Cancers</option>
//   <option value="Genitourinary (GU) Cancers">Genitourinary (GU) Cancers</option>
//   <option value="Gastrointestinal (GI) Cancers">Gastrointestinal (GI) Cancers</option>
//   <option value="Hematologic Cancers (Blood & Bone Marrow)">Hematologic Cancers (Blood & Bone Marrow)</option>
//   <option value="Breast Cancer">Breast Cancer</option>
//   <option value="Head & Neck Cancers">Head & Neck Cancers</option>
//   <option value="Respiratory System">Respiratory System</option>
//   <option value="Central Nervous System (CNS) Cancers">Central Nervous System (CNS) Cancers</option>
//   <option value="Hematology / Oncology">Hematology / Oncology</option>
//   <option value="Obstetric / Gynecology">Obstetric / Gynecology</option>
//   <option value="Pediatrics">Pediatrics</option>
//   <option value="Psychiatry">Psychiatry</option>
//   <option value="Orthopedic / Trauma">Orthopedic / Trauma</option>
//   <option value="Infectious Disease">Infectious Disease</option>
//   <option value="Renal / Endocrine / Metabolic">Renal / Endocrine / Metabolic</option>
//   <option value="Gastrointestinal">Gastrointestinal</option>
//   <option value="Neurology">Neurology</option>
//   <option value="Pulmonary">Pulmonary</option>
//   <option value="Cardiovascular">Cardiovascular</option>
// </select>

//         <input
//           type={fromType}
//           placeholder="Service Period (From)"
//           onFocus={() => setFromType("date")}
//           onBlur={(e) => {
//             if (!e.target.value) setFromType("text");
//           }}
//           className="w-[328px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px] outline-none placeholder:text-black"
//         />

// <div className="flex gap-2 ">
// <select
//           className="w-[328px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px] outline-none"
//           value={visitType}
//           onChange={handleVisitTypeChange}
//         >
//           <option value="">Single Visit / Periodically</option>
//           <option value="One-time visit">One-time visit</option>
//           <option value="Few Days">Few Days</option>
//           <option value="Few Weeks">Few Weeks</option>
//           <option value="Long-term">Long-term</option>
//         </select>

//           {/* Duration - only show if not one-time visit */}
//       {visitType !== "One-time visit" && visitType !== "" && (
//         <div>

//           <div className="flex items-center gap-2">
//             <select
//               className="w-[160px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px] outline-none"
//             >
//               <option value="">Duration</option>

//               <option value="">1</option>
//               <option value="">2</option>
//               <option value="">3</option>
//               <option value="">4</option>
//               <option value="">5</option>
//             </select>
//             <span>{durationLabel}</span>
//           </div>
//         </div>
//       )}

// </div>

//         <select
//           name=""
//           id=""
//           className="w-[328px] h-[40px] rounded-[15px] text-[14px] border border-[#BBBBBB] ps-[32px] text-black"
//         >
//           <option value="" selected disabled>
//             Daily Schedule
//           </option>
//           <option value="">1</option>
//         </select>

//          <div>
//           <p className="text-[#000819] text-[14px]">
//             Frequency
//           </p>

//           <div className="flex flex-wrap gap-4 pt-4">
//             <div className="flex  gap-2">
//               <input type="checkbox" name="" id="" /> Sun
//             </div>
//             <div className="flex  gap-2">
//               <input type="checkbox" name="" id="" /> Mon
//             </div>
//             <div className="flex  gap-2">
//               <input type="checkbox" name="" id="" /> Tue
//             </div>
//             <div className="flex  gap-2">
//               <input type="checkbox" name="" id="" /> Wed
//             </div>
//             <div className="flex  gap-2">
//               <input type="checkbox" name="" id="" /> Thu
//             </div>
//             <div className="flex  gap-2">
//               <input type="checkbox" name="" id="" /> Fri
//             </div>
//             <div className="flex  gap-2">
//               <input type="checkbox" name="" id="" /> Sat
//             </div>
//           </div>
//         </div>

//         <div>
//           <p className="text-[#000819] text-[14px]">
//             Flexibility
//           </p>

//           <div className="flex flex-wrap gap-6 pt-4">
//             <div className="flex  gap-2">
//               <input type="checkbox" name="" id="" /> Fixed
//             </div>
//             <div className="flex  gap-2">
//               <input type="checkbox" name="" id="" /> Flexible
//             </div>
//           </div>
//         </div>

// <div className="flex flex-wrap gap-6">
//           <div className="flex  items-center gap-2">
//             <input type="time" name="" id="" /> From
//           </div>
//           <div className="flex items-center gap-2">
//             <input type="time" name="" id="" /> To
//           </div>
//         </div>

//       </div>
//       <h1 className="text-[16px] font-semibold text-black ps-[32px] py-[15px] mt-6">
//       Preferred Staff
//       </h1>
//       <select
//           name=""
//           id=""
//           className="w-[328px] h-[40px] rounded-[15px] text-[14px] border border-[#BBBBBB] ps-[32px] text-black ms-8"
//         >
//           <option value="" selected disabled>
//           Male / Female
//           </option>
//           <option value="">Male</option>
//           <option value="">Female</option>

//         </select>

//           <h1 className="text-[16px] font-semibold text-black ps-[32px] py-[15px] mt-6">
//         Preferred Language
//       </h1>
//       <div className="flex gap-4 ps-[32px] text-black font-light">
//         <div className="flex gap-2">
//           <input type="checkbox" name="" id="" />
//           Hindi
//         </div>
//         <div className="flex gap-2">
//           <input type="checkbox" name="" id="" />
//           Kannada
//         </div>
//         <div className="flex gap-2">
//           <input type="checkbox" name="" id="" />
//           English
//         </div>
//       </div>
//       <div className="flex gap-4 ps-[32px] text-black mt-2 font-light">
//         <div className="flex gap-2">
//           <input type="checkbox" name="" id="" />
//           Malayalam
//         </div>
//         <div className="flex gap-2">
//           <input type="checkbox" name="" id="" />
//           Tamil
//         </div>
//         <div className="flex gap-2">
//           <input type="checkbox" name="" id="" />
//           Telugu
//         </div>
//       </div>
//         <button className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center ms-8 mt-4">
//             Submit
//           </button>

//           <p className=" text-[14px] text-[#3674B5] font-semibold ps-4 ms-8 pt-4 mb-[200px]">
//             The Entry has been successfully submitted !
//           </p>
//     </div>
//     </>
//   );
// };

// export default page;



"use client";

import Navlink from "@/components/caseBooking/NavLink";
import React, { useState } from "react";
import useBookingStore from "@/app/lib/store/bookingStore";

const CaseBookingPage = () => {
  const { submitBooking } = useBookingStore();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleArray = (value, array, setArray) => {
    if (array.includes(value)) {
      setArray(array.filter((v) => v !== value));
    } else {
      setArray([...array, value]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      contactPersonMobileNumber: form.contactPersonMobileNumber.startsWith(
        "+91"
      )
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
      preferredLanguages,
      preferredGender,
      serviceType: "OTHER",
      durationValue: form.durationValue,
    };

    const result = await submitBooking(payload);
    if (result.success) {
      alert("Booking created!");
    } else {
      alert("Error: " + result.error);
    }
  };

  const durationLabel = {
    FEW_DAYS: "Days",
    FEW_WEEKS: "Weeks",
    LONG_TERM: "Months",
    OTHER: "Days",
  }[visitType];

  return (
    <>
      <Navlink />
      <form
        onSubmit={handleSubmit}
        className="w-full mt-2 bg-white rounded-[15px] border-[1px] border-[#BBBBBB]"
      >
        <div className="w-full h-[72px] flex items-center bg-white px-8 rounded-t-[15px] border-[#BBBBBB] border-b-[1px] ">
          <h1 className="text-[16px] font-semibold text-black">
            Patient Details
          </h1>
        </div>

        <div className="w-[324px] px-8 text-[14px] text-black font-light flex flex-col gap-4 mt-4">
          <input
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            placeholder="Patient Name"
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300"
          />

          <div className="flex gap-4">
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="w-[160px] h-[40px] rounded-[15px] px-4 border border-gray-300"
            >
              <option value="">Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            <input
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              placeholder="Age"
              required
              className="w-[160px] h-[40px] rounded-[15px] px-4 border border-gray-300"
            />
          </div>

          <div className="flex gap-4">
            <input
              name="height"
              type="number"
              value={form.height}
              onChange={handleChange}
              placeholder="Height (cm)"
              className="w-[160px] h-[40px] rounded-[15px] px-4 border border-gray-300"
            />
            <input
              name="weight"
              type="number"
              value={form.weight}
              onChange={handleChange}
              placeholder="Weight (kg)"
              className="w-[160px] h-[40px] rounded-[15px] px-4 border border-gray-300"
            />
          </div>

          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300"
          >
            <option value="">Service Required</option>
            <option value="NURSING_SERVICE_AT_HOME">
              Nursing Service At Home
            </option>
            <option value="NURSING_ASSISTANCE_AT_HOME">
              Nursing Assistance At Home
            </option>
            <option value="NURSING_ASSISTANCE_VISIT">
              Nursing Assistance Visit
            </option>
            <option value="NURSING_VISIT">Nursing Visit</option>
            <option value="THERAPY">Therapy</option>
            <option value="DIAGNOSTIC_SERVICE">
              Diagnostic Services at Home
            </option>
          </select>

          <select
            name="healthStatus"
            value={form.healthStatus}
            onChange={handleChange}
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300"
          >
            <option value="">Health Status</option>
            <option value="BEDRIDDEN">Bedridden Patients</option>
            <option value="LIMITED_MOBILITY">
              Patients with Limited Mobility
            </option>
            <option value="TUBE_FED">Tube-fed Patients</option>
          </select>

          <select
            name="stayAt"
            value={form.stayAt}
            onChange={handleChange}
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300"
          >
            <option value="">Now Patient stayed at</option>
            <option value="HOSPITAL">Hospital</option>
            <option value="RESIDENCE">Residence</option>
            <option value="CARE_HOME">Care Home</option>
            <option value="PSYCHIATRIC_HOME">Psychiatric Homes</option>
          </select>

          <textarea
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Residential Address"
            required
            className="w-[328px] h-[80px] rounded-[15px] px-4 border border-gray-300"
          />

          <input
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300"
          />

          <input
            name="contactPersonName"
            value={form.contactPersonName}
            onChange={handleChange}
            placeholder="Contact Person Name"
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300"
          />

          <select
            name="contactPersonRelation"
            value={form.contactPersonRelation}
            onChange={handleChange}
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300"
          >
            <option value="">Relationship</option>
            <option value="SELF">Self</option>
            <option value="WIFE">Wife</option>
            <option value="HUSBAND">Husband</option>
            <option value="CHILD">Child</option>
            <option value="PARENT">Parent</option>
            <option value="OTHER">Other</option>
          </select>

          <input
            name="contactPersonEmail"
            type="email"
            value={form.contactPersonEmail}
            onChange={handleChange}
            placeholder="Email ID"
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300"
          />
          <input
            name="contactPersonMobileNumber"
            value={form.contactPersonMobileNumber}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300"
          />
        </div>

        {/* Service Details */}
        <div className="w-[324px] px-8 text-[14px] text-black font-light flex flex-col gap-4">
          <h1 className="text-[16px] font-semibold text-black mt-4">
            Service Details
          </h1>
          {/* <input name="diagnosis" value={form.diagnosis} onChange={handleChange} placeholder="Diagnosis" required className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300" /> */}

          <select
            name="diagnosis"
            id="diagnosis"
            value={form.diagnosis}
            onChange={handleChange}
            required
            className="w-[328px] h-[40px] rounded-[15px] text-[14px] border border-[#BBBBBB] ps-[32px] text-black"
          >
            <option value="" disabled selected>
              Diagnosis
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
            <option value="Hematology / Oncology">Hematology / Oncology</option>
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

          <input
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300"
          />

          <select
            value={visitType}
            onChange={(e) => setVisitType(e.target.value)}
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300"
          >
            <option value="">Single Visit / Periodically</option>
            <option value="ONE_TIME_VISIT">One-time visit</option>
            <option value="FEW_DAYS">Few Days</option>
            <option value="FEW_WEEKS">Few Weeks</option>
            <option value="LONG_TERM">Long-term</option>
            <option value="OTHER">Other</option>
          </select>
          {/* 
          {visitType !== "One-time visit" && visitType && (
            <div className="flex items-center gap-2 mb-4">
              <input name="durationValue" type="number" value={form.durationValue} onChange={handleChange} required className="w-[160px] h-[40px] rounded-[15px] px-4 border border-gray-300" />
              <span>{durationLabel}</span>
            </div>
          )} */}

          {visitType && visitType !== "ONE_TIME_VISIT" && (
            <div>
              <p className="mb-[10px]">Duration</p>
              <div className="flex gap-2 items-center">
                <select
                  className="bg-white rounded-[15px] text-[#8B8B8B] ps-[22px] py-[12px] outline-none"
                  name="durationValue"
                  value={form.durationValue}
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5].map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
                <span>
                  {
                    {
                      FEW_DAYS: "Days",
                      FEW_WEEKS: "Weeks",
                      LONG_TERM: "Months",
                    }[visitType]
                  }
                </span>
              </div>
            </div>
          )}

          <select
            name="scheduleType"
            value={form.scheduleType}
            onChange={handleChange}
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300"
          >
            <option value="">Daily Schedule Type</option>
            <option value="FULL_TIME">Full Time</option>
            <option value="DAY_SHIFT">Day Shift</option>
            <option value="NIGHT_SHIFT">Night Shift</option>
            <option value="CUSTOM">Custom</option>
          </select>

          <div className="grid grid-cols-4 gap-2 mb-4">
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
                  checked={weekdays.includes(day)}
                  onChange={() => toggleArray(day, weekdays, setWeekdays)}
                />
                {day.slice(0, 3)}
              </label>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-4">
            {["FIXED", "FLEXIBLE"].map((option) => (
              <label key={option} className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="flexibility"
                  checked={flexibility === option}
                  onChange={() => setFlexibility(option)}
                />
                {option.charAt(0) + option.slice(1).toLowerCase()}
              </label>
            ))}
          </div>

          {/* <div className="flex gap-4 mb-4">
            <input name="startTime" type="time" value={form.startTime} onChange={handleChange} required className="w-[160px] h-[40px] rounded-[15px] px-4 border border-gray-300" />
            <span>To</span>
            <input name="endTime" type="time" value={form.endTime} onChange={handleChange} required className="w-[160px] h-[40px] rounded-[15px] px-4 border border-gray-300" />
          </div> */}

          {form.scheduleType === "CUSTOM" && (
            <div className="flex gap-4 mb-4 mt-2">
              <input
                name="startTime"
                type="time"
                value={form.startTime}
                onChange={handleChange}
                required
                className="w-[160px] h-[40px] rounded-[15px] px-4 border border-gray-300"
              />
              <span className="flex items-center">To</span>
              <input
                name="endTime"
                type="time"
                value={form.endTime}
                onChange={handleChange}
                required
                className="w-[160px] h-[40px] rounded-[15px] px-4 border border-gray-300"
              />
            </div>
          )}
        </div>

        {/* Staff Preferences */}
        <div className="w-[324px] px-8 text-[14px] text-black font-light flex flex-col gap-4">
          <h1 className="text-[16px] font-semibold text-black">
            Staff Preferences
          </h1>

          <select
            value={preferredGender}
            onChange={(e) => setPreferredGender(e.target.value)}
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300"
          >
            <option value="">Preferred Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>

          <div className="grid grid-cols-3 gap-2 mb-6">
            {[
              "Hindi",
              "Kannada",
              "English",
              "Malayalam",
              "Tamil",
              "Telugu",
            ].map((lang) => (
              <label key={lang} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={preferredLanguages.includes(lang)}
                  onChange={() =>
                    toggleArray(lang, preferredLanguages, setPreferredLanguages)
                  }
                />
                {lang}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] mx-8 mb-6"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CaseBookingPage;
