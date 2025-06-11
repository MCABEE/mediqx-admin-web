"use client";
import Navlink from "@/components/caseBooking/NavLink";
import React, { useState } from "react";

const page = () => {
  const [fromType, setFromType] = useState("text");
  const [toType, setToType] = useState("text");
    const [visitType, setVisitType] = useState("");

  const handleVisitTypeChange = (e) => {
    setVisitType(e.target.value);
  };

  // Determine label based on visit type
  const durationLabel = {
    "Few Days": "Days",
    "Few Weeks": "Weeks",
    "Long-term": "Months",
  }[visitType];

  return (
<>
<Navlink/>
    <div className=" w-full mt-2 bg-white rounded-[15px] border-[1px] border-[#BBBBBB]">

      <div className="w-full h-[72px] flex items-center bg-white px-8 rounded-t-[15px] border-[#BBBBBB] border-b-[1px]">
        <h1 className="text-[16px] font-semibold text-black">
          Patient Details 
        </h1>
      </div>
      <div className="px-8 text-[14px] text-black font-light flex flex-col gap-4">
        <input
          type="text"
          placeholder="Patient Name"
          className="w-[328px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px] mt-[24px] outline-none placeholder:text-black"
        />
        <div className="flex gap-1">
          <select
            name=""
            id=""
            className="w-[160px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px]"
          >
            <option value="" selected disabled>
              Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
         <input
          type="text"
          placeholder="Age"
          className="w-[160px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px]  outline-none placeholder:text-black"
        />
        </div>
        <div className="flex gap-1">
          <select
            name=""
            id=""
            className="w-[160px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px]"
          >
            <option value="" selected disabled>
              Height (CM)
            </option>
          </select>
          <select
            name=""
            id=""
            className="w-[160px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px]"
          >
            <option value="" selected disabled>
              Weight (Kg)
            </option>
            <option value="">1</option>
          </select>
        </div>
    <select
  name="serviceRequired"
  id="serviceRequired"
  className="w-[328px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px]"
>
  <option value="" disabled selected>
    Service Required
  </option>
  <option value="Nursing Service At Home">Nursing Service At Home</option>
  <option value="Nursing Assistance At Home">Nursing Assistance At Home</option>
  <option value="Nursing Assistance Visit">Nursing Assistance Visit</option>
  <option value="Nursing Visit">Nursing Visit</option>
  <option value="Therapy">Therapy</option>
  <option value="Diagnostic Services at Home">Diagnostic Services at Home</option>
</select>

        <select
  name="healthStatus"
  id="healthStatus"
  className="w-[328px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px]"
>
  <option value="" disabled selected>
    Current Health Status / Activity
  </option>
  <option value="Bedridden Patients">Bedridden Patients</option>
  <option value="Patients with Limited Mobility">Patients with Limited Mobility</option>
  <option value="Tube-fed Patients">Tube-fed Patients</option>
  <option value="Patients with Indwelling Catheters">Patients with Indwelling Catheters</option>
  <option value="Patients with Tracheostomy / Ventilator">Patients with Tracheostomy / Ventilator</option>
  <option value="Post-Surgical Recovery Patients">Post-Surgical Recovery Patients</option>
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

       <select
  name="patientLocation"
  id="patientLocation"
  className="w-[328px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px]"
>
  <option value="" disabled selected>
    Now Patient stayed at
  </option>
  <option value="Hospital">Hospital</option>
  <option value="Residence">Residence</option>
  <option value="Care Home">Care Home</option>
  <option value="Psychiatric Homes">Psychiatric Homes</option>
</select>

        <textarea
          name=""
          id=""
          placeholder="Residential Address"
          className="w-[328px] h-[96px] rounded-[15px] border border-[#BBBBBB] ps-[32px]  placeholder:text-black py-2"
        ></textarea>

        <input
          type="text"
          placeholder="Pincode"
          className="w-[328px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px] outline-none placeholder:text-black"
        />
        <input
          type="text"
          placeholder="Contact Person (Relative) Name"
          className="w-[328px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px]  outline-none placeholder:text-black"
        />
       <select
  name="relationshipWithPatient"
  id="relationshipWithPatient"
  className="w-[328px] h-[40px] rounded-[15px] border border-[#BBBBBB] ps-[32px]"
>
  <option value="" disabled selected>
    Relationship with patient
  </option>
  <option value="Self">Self</option>
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
  <option value="Caretaker / Attendant">Caretaker / Attendant</option>
  <option value="Legal Guardian">Legal Guardian</option>
  <option value="Friend">Friend</option>
</select>

        <input
          type="text"
          placeholder="Email ID"
          className="w-[328px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px] outline-none placeholder:text-black"
        />
        <input
          type="text"
          placeholder="Mobile Number"
          className="w-[328px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px] outline-none placeholder:text-black"
        />
      </div>
    
      <h1 className="text-[16px] font-semibold text-black ps-[32px] py-[15px] mt-6">
        Service Details
      </h1>
      <div className="flex flex-col ps-[32px] gap-4">
       <select
  name="diagnosis"
  id="diagnosis"
  className="w-[328px] h-[40px] rounded-[15px] text-[14px] border border-[#BBBBBB] ps-[32px] text-black"
>
  <option value="" disabled selected>
    Diagnosis
  </option>
  <option value="Pediatric Cancers">Pediatric Cancers</option>
  <option value="Neuroendocrine Tumors (NETs)">Neuroendocrine Tumors (NETs)</option>
  <option value="Bone and Soft Tissue Tumors">Bone and Soft Tissue Tumors</option>
  <option value="Skin Cancers">Skin Cancers</option>
  <option value="Gynecologic Cancers">Gynecologic Cancers</option>
  <option value="Genitourinary (GU) Cancers">Genitourinary (GU) Cancers</option>
  <option value="Gastrointestinal (GI) Cancers">Gastrointestinal (GI) Cancers</option>
  <option value="Hematologic Cancers (Blood & Bone Marrow)">Hematologic Cancers (Blood & Bone Marrow)</option>
  <option value="Breast Cancer">Breast Cancer</option>
  <option value="Head & Neck Cancers">Head & Neck Cancers</option>
  <option value="Respiratory System">Respiratory System</option>
  <option value="Central Nervous System (CNS) Cancers">Central Nervous System (CNS) Cancers</option>
  <option value="Hematology / Oncology">Hematology / Oncology</option>
  <option value="Obstetric / Gynecology">Obstetric / Gynecology</option>
  <option value="Pediatrics">Pediatrics</option>
  <option value="Psychiatry">Psychiatry</option>
  <option value="Orthopedic / Trauma">Orthopedic / Trauma</option>
  <option value="Infectious Disease">Infectious Disease</option>
  <option value="Renal / Endocrine / Metabolic">Renal / Endocrine / Metabolic</option>
  <option value="Gastrointestinal">Gastrointestinal</option>
  <option value="Neurology">Neurology</option>
  <option value="Pulmonary">Pulmonary</option>
  <option value="Cardiovascular">Cardiovascular</option>
</select>

        <input
          type={fromType}
          placeholder="Service Period (From)"
          onFocus={() => setFromType("date")}
          onBlur={(e) => {
            if (!e.target.value) setFromType("text");
          }}
          className="w-[328px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px] outline-none placeholder:text-black"
        />




<div className="flex gap-2 ">
<select
          className="w-[328px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px] outline-none"
          value={visitType}
          onChange={handleVisitTypeChange}
        >
          <option value="">Single Visit / Periodically</option>
          <option value="One-time visit">One-time visit</option>
          <option value="Few Days">Few Days</option>
          <option value="Few Weeks">Few Weeks</option>
          <option value="Long-term">Long-term</option>
        </select>

          {/* Duration - only show if not one-time visit */}
      {visitType !== "One-time visit" && visitType !== "" && (
        <div>
  
          <div className="flex items-center gap-2">
            <select
              className="w-[160px] h-[40px] text-[14px] text-black font-light border border-[#BBBBBB] rounded-[15px] ps-[32px] outline-none"
            >
              <option value="">Duration</option>

              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
              <option value="">5</option>
            </select>
            <span>{durationLabel}</span>
          </div>
        </div>
      )}



</div>







        <select
          name=""
          id=""
          className="w-[328px] h-[40px] rounded-[15px] text-[14px] border border-[#BBBBBB] ps-[32px] text-black"
        >
          <option value="" selected disabled>
            Daily Schedule
          </option>
          <option value="">1</option>
        </select>

         <div>
          <p className="text-[#000819] text-[14px]">
            Frequency
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex  gap-2">
              <input type="checkbox" name="" id="" /> Sun
            </div>
            <div className="flex  gap-2">
              <input type="checkbox" name="" id="" /> Mon
            </div>
            <div className="flex  gap-2">
              <input type="checkbox" name="" id="" /> Tue
            </div>
            <div className="flex  gap-2">
              <input type="checkbox" name="" id="" /> Wed
            </div>
            <div className="flex  gap-2">
              <input type="checkbox" name="" id="" /> Thu
            </div>
            <div className="flex  gap-2">
              <input type="checkbox" name="" id="" /> Fri
            </div>
            <div className="flex  gap-2">
              <input type="checkbox" name="" id="" /> Sat
            </div>
          </div>
        </div>





        <div>
          <p className="text-[#000819] text-[14px]">
            Flexibility
          </p>

          <div className="flex flex-wrap gap-6 pt-4">
            <div className="flex  gap-2">
              <input type="checkbox" name="" id="" /> Fixed
            </div>
            <div className="flex  gap-2">
              <input type="checkbox" name="" id="" /> Flexible
            </div>
          </div>
        </div>




<div className="flex flex-wrap gap-6">
          <div className="flex  items-center gap-2">
            <input type="time" name="" id="" /> From
          </div>
          <div className="flex items-center gap-2">
            <input type="time" name="" id="" /> To
          </div>
        </div>


      </div>
      <h1 className="text-[16px] font-semibold text-black ps-[32px] py-[15px] mt-6">
      Preferred Staff
      </h1>
      <select
          name=""
          id=""
          className="w-[328px] h-[40px] rounded-[15px] text-[14px] border border-[#BBBBBB] ps-[32px] text-black ms-8"
        >
          <option value="" selected disabled>
          Male / Female
          </option>
          <option value="">Male</option>
          <option value="">Female</option>

        </select>

          <h1 className="text-[16px] font-semibold text-black ps-[32px] py-[15px] mt-6">
        Preferred Language
      </h1>
      <div className="flex gap-4 ps-[32px] text-black font-light">
        <div className="flex gap-2">
          <input type="checkbox" name="" id="" />
          Hindi
        </div>
        <div className="flex gap-2">
          <input type="checkbox" name="" id="" />
          Kannada
        </div>
        <div className="flex gap-2">
          <input type="checkbox" name="" id="" />
          English
        </div>
      </div>
      <div className="flex gap-4 ps-[32px] text-black mt-2 font-light">
        <div className="flex gap-2">
          <input type="checkbox" name="" id="" />
          Malayalam
        </div>
        <div className="flex gap-2">
          <input type="checkbox" name="" id="" />
          Tamil
        </div>
        <div className="flex gap-2">
          <input type="checkbox" name="" id="" />
          Telugu
        </div>
      </div>
        <button className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center ms-8 mt-4">
            Submit
          </button>

          <p className=" text-[14px] text-[#3674B5] font-semibold ps-4 ms-8 pt-4 mb-[200px]">
            The Entry has been successfully submitted !
          </p>
    </div>
    </>
  );
};

export default page;
