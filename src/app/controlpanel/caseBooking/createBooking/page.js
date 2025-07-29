"use client";

import Navlink from "@/components/caseBooking/NavLink";
import React, { useState } from "react";
import useBookingStore from "@/app/lib/store/bookingStore";

const CaseBookingPage = () => {
  const { submitBooking } = useBookingStore();
  const [langError, setLangError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

    if (preferredLanguages.length === 0) {
      setLangError(true);
      return;
    } else {
      setLangError(false);
    }

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
      serviceType: form.serviceType,
      durationValue: form.durationValue || 1,
    };

    const result = await submitBooking(payload);

    if (result.success) {
      setSuccessMessage("Booking successfully created.");
      // Reset form
      setForm({
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
      setVisitType("");
      setWeekdays([]);
      setFlexibility("");
      setPreferredGender("");
      setPreferredLanguages([]);
    } else {
      setSuccessMessage(" Failed to create booking. Please try again.");
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
        className="w-full mt-2 bg-white rounded-[15px] border-[1px] border-[#BBBBBB] mb-4"
      >
        <div className="w-full h-[72px] flex items-center bg-white px-8 rounded-t-[15px] border-[#BBBBBB] border-b-[1px] ">
          <h1 className="text-[16px] font-semibold text-black">
            Patient Details
          </h1>
        </div>

        <div className="w-[328px] px-8 text-[14px] text-black font-light flex flex-col gap-4 mt-4">
          <input
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            placeholder="Patient Name"
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 placeholder:text-black outline-none"
          />

          <div className="w-[328px] flex justify-between gap-4 ">
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="w-1/2 h-[40px] rounded-[15px] px-4 border border-gray-300 outline-none"
            >
              <option value="" disabled selected>
                Gender
              </option>
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
              className="w-1/2 h-[40px] rounded-[15px] px-4 border border-gray-300 placeholder:text-black outline-none"
            />
          </div>

          <div className="flex gap-4">
            <input
              name="height"
              type="number"
              value={form.height}
              onChange={handleChange}
              placeholder="Height (cm)"
              className="w-[160px] h-[40px] rounded-[15px] px-4 border border-gray-300 placeholder:text-black outline-none"
            />
            <input
              name="weight"
              type="number"
              value={form.weight}
              onChange={handleChange}
              placeholder="Weight (kg)"
              className="w-[160px] h-[40px] rounded-[15px] px-4 border border-gray-300 placeholder:text-black outline-none"
            />
          </div>

          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300  outline-none"
          >
            <option value="" selected disabled>
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

          <select
            name="healthStatus"
            value={form.healthStatus}
            onChange={handleChange}
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 outline-none"
          >
            <option value="" selected disabled>
              Current HealthStatus / Activity
            </option>
            <option value="Bedridden Patients">Bedridden Patients</option>
            <option value="Patients with Limited Mobility">
              {" "}
              Patients with Limited Mobility{" "}
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

          <select
            name="stayAt"
            value={form.stayAt}
            onChange={handleChange}
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 outline-none"
          >
            <option value="" selected disabled>
              Now Patient stayed at
            </option>
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
            className="w-[328px] h-[80px] rounded-[15px] px-4 border border-gray-300 pt-2 placeholder:text-black outline-none"
          />

          <input
            type="text"
            name="pincode"
            value={form.pincode}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d{0,6}$/.test(val)) {
                handleChange(e);
              }
            }}
            placeholder="Pincode"
            required
            inputMode="numeric"
            pattern="\d{6}"
            maxLength={6}
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 placeholder:text-black outline-none"
          />

          <input
            name="contactPersonName"
            value={form.contactPersonName}
            onChange={handleChange}
            placeholder="Contact Person Name"
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 placeholder:text-black outline-none"
          />

          <select
            name="contactPersonRelation"
            value={form.contactPersonRelation}
            onChange={handleChange}
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 outline-none"
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
            <option value="Caretaker / Attendant">Caretaker / Attendant</option>
            <option value="Legal Guardian">Legal Guardian</option>
            <option value="Friend ">Friend </option>{" "}
          </select>

          <input
            name="contactPersonEmail"
            type="email"
            value={form.contactPersonEmail}
            onChange={handleChange}
            placeholder="Email ID"
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 placeholder:text-black outline-none"
          />
          <input
            type="text"
            name="contactPersonMobileNumber"
            value={form.contactPersonMobileNumber}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d{0,10}$/.test(val)) {
                handleChange(e);
              }
            }}
            placeholder="Mobile Number"
            required
            inputMode="numeric"
            pattern="\d{10}"
            maxLength={10}
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 placeholder:text-black outline-none"
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
            className="w-[328px] h-[40px] rounded-[15px] text-[14px] border border-[#BBBBBB] px-4 text-black outline-none"
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

          {/* <input
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 placeholder:text-black outline-none"
          /> */}

          <input
            name="startDate"
            type={form.startDateInputType || "text"}
            value={form.startDate}
            placeholder="Service Period From"
            onFocus={() =>
              setForm((prev) => ({
                ...prev,
                startDateInputType: "date",
              }))
            }
            onChange={handleChange}
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 placeholder:text-black outline-none"
          />

          <select
            value={visitType}
            onChange={(e) => setVisitType(e.target.value)}
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
          {/* 
          {visitType !== "One-time visit" && visitType && (
            <div className="flex items-center gap-2 mb-4">
              <input name="durationValue" type="number" value={form.durationValue} onChange={handleChange} required className="w-[160px] h-[40px] rounded-[15px] px-4 border border-gray-300" />
              <span>{durationLabel}</span>
            </div>
          )} */}

          {visitType && visitType !== "ONE_TIME_VISIT" && (
            <div>
              <div className="flex gap-2 items-center">
                <select
                  className="h-[40px] w-[200px] bg-white rounded-[15px] px-4 border border-gray-300 outline-none "
                  name="durationValue"
                  value={form.durationValue}
                  onChange={handleChange}
                >
                  <option value="" selected disabled>
                    {" "}
                    Duration
                  </option>
                  {[1, 2, 3, 4, 5, 6].map((val) => (
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
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 outline-none"
          >
            <option value="" selected disabled>
              Daily Schedule Type
            </option>
            <option value="FULL_TIME_24_HOURS">Full Time(24Hrs)</option>
            <option value="DAY_SHIFT_12_HOURS">Day Shift(12Hrs)</option>
            <option value="DAY_SHIFT_8_HOURS">Day Shift(8Hrs)</option>
            <option value="NIGHT_SHIFT_12_HOURS">Night shift(12Hrs)</option>
            <option value="CUSTOM_HOURS">Custom Hours</option>
          </select>
          {visitType && visitType !== "ONE_TIME_VISIT" && (
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
          )}

          <div className="flex items-center gap-4 mb-4">
            {["FIXED", "FLEXIBLE"].map((option) => (
              <label key={option} className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="flexibility"
                  checked={flexibility === option}
                  required
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

          <div className="flex gap-4 mb-4 mt-2">
            <input
              name="startTime"
              type="time"
              value={form.startTime}
              onChange={handleChange}
              required
              className="w-[160px] h-[40px] rounded-[15px] px-4 border border-gray-300 placeholder:text-black outline-none"
            />
            <span className="flex items-center pe-4">From</span>
            <input
              name="endTime"
              type="time"
              value={form.endTime}
              onChange={handleChange}
              required
              className="w-[160px] h-[40px] rounded-[15px] px-4 border border-gray-300 placeholder:text-black outline-none"
            />
            <span className="flex items-center">To</span>
          </div>
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
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 outline-none"
          >
            <option value="">Preferred Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>

          <h1 className="text-[16px] font-semibold text-black">
            Preferred Languages
          </h1>
          <div className="grid grid-cols-2 gap-2 mb-4">
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
                  checked={preferredLanguages.includes(lang)}
                  onChange={() => {
                    toggleArray(
                      lang,
                      preferredLanguages,
                      setPreferredLanguages
                    );
                    if (preferredLanguages.length > 0) setLangError(false); // clear error on change
                  }}
                />
                {lang}
              </label>
            ))}
          </div>
          {langError && (
            <span className="text-red-500 text-sm mb-2">
              Please select at least one preferred language.
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] mx-8 mb-4 cursor-pointer"
        >
          Submit
        </button>
        <div className="h-[48px] mb-10">
          {successMessage && (
            <p className=" text-[#3674B5] font-medium px-8  ">
              {successMessage}
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default CaseBookingPage;
