"use client";

import Navlink from "@/components/caseBooking/NavLink";
import React, { useEffect, useState } from "react";
import useBookingStore from "@/app/lib/store/bookingStore";
import useDiagnosisStore from "@/app/lib/store/useDiagnosisStore";
import useHealthStatusStore from "@/app/lib/store/useHealthStatusStore";
import usePatientServiceStore from "@/app/lib/store/usePatientServiceStore";
import useLanguageStore from "@/app/lib/store/languageStore";

const CaseBookingPage = () => {
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
  const {
    listedLanguages,
    fetchLanguages,
    isLoading: isLangLoading,
    error: langErrorFetch,
  } = useLanguageStore();

  useEffect(() => {
    fetchLanguages(1, 100);
  }, [fetchLanguages]);

  // Health Status store
  const {
    listedServices: healthStatuses,
    fetchServices: fetchHealthStatuses,
    isLoading: isHealthLoading,
    error: healthError,
  } = useHealthStatusStore();

  // Patient Services store
  const {
    listedServices: patientServices,
    fetchServices: fetchPatientServices,
    isLoading: isServicesLoading,
    error: servicesError,
  } = usePatientServiceStore();

  useEffect(() => {
    fetchHealthStatuses(1, 100);
    fetchPatientServices(1, 100);
  }, [fetchHealthStatuses, fetchPatientServices]);

  const handleDiagnosisChange = (e) => {
    setSelectedDiagnosis(e.target.value);
  };

  // Diagnoses store
  const { listedDiagnoses, fetchDiagnosesList, isLoading, error } =
    useDiagnosisStore();

  useEffect(() => {
    fetchDiagnosesList(1, 100);
  }, [fetchDiagnosesList]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setForm((prev) => ({ ...prev, [name]: value }));
  // };
const handleChange = (e) => {
  const { name, value } = e.target;

  // Handle scheduleType changes
  if (name === "scheduleType") {
    let startTime = "";
    let endTime = "";

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
        endTime = addHoursToTime(startTime, 12); // handles midnight rollover
        break;
      case "CUSTOM_HOURS":
        startTime = "";
        endTime = "";
        break;
    }

    setForm((prev) => ({ ...prev, scheduleType: value, startTime, endTime }));
    return;
  }

  // Auto-update endTime if startTime changes and scheduleType is not CUSTOM_HOURS
  if (name === "startTime" && form.scheduleType && form.scheduleType !== "CUSTOM_HOURS") {
    let endTime = form.endTime;

    if (form.scheduleType === "DAY_SHIFT_12_HOURS" || form.scheduleType === "NIGHT_SHIFT_12_HOURS") {
      endTime = addHoursToTime(value, 12);
    } else if (form.scheduleType === "FULL_TIME_24_HOURS") {
      endTime = addHoursToTime(value, 24);
    }

    setForm((prev) => ({ ...prev, startTime: value, endTime }));
    return;
  }

  // Default case: just update the changed field
  setForm((prev) => ({ ...prev, [name]: value }));
};

// Utility to add hours to time string
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
      diagnosisId: selectedDiagnosis,
      serviceTypeId: form.serviceType,
      healthStatusId: form.healthStatus,
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
      preferredLanguageId: preferredLanguages,
      preferredGender,
      durationValue: form.durationValue || 1,
      officialAddress: form.location,
    };
    delete payload.diagnosis;
    delete payload.serviceType;
    delete payload.healthStatus;
    delete payload.location;

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
      setSelectedDiagnosis("");
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
        {/* Patient Details */}
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
              <option value="" disabled>
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

          {/*  Patient Services dropdown */}
          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 outline-none"
          >
            <option value="" disabled>
              Select Service Type
            </option>
            {isServicesLoading && <option disabled>Loading...</option>}
            {!isServicesLoading && servicesError && (
              <option disabled>Error loading services</option>
            )}
            {!isServicesLoading &&
              !servicesError &&
              patientServices.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.service}
                </option>
              ))}
          </select>

          {/* Health Status */}
          <select
            name="healthStatus"
            value={form.healthStatus}
            onChange={handleChange}
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 outline-none"
          >
            <option value="" disabled>
              Current HealthStatus / Activity
            </option>
            {isHealthLoading && <option disabled>Loading...</option>}
            {healthError && !isHealthLoading && (
              <option disabled>Error loading health statuses</option>
            )}
            {!isHealthLoading &&
              !healthError &&
              healthStatuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.status}
                </option>
              ))}
          </select>

          <select
            name="stayAt"
            value={form.stayAt}
            onChange={handleChange}
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 outline-none"
          >
            <option value="" disabled>
              Now Patient stayed at
            </option>

            <option value="HOSPITAL">Hospital</option>
            <option value="RESIDENCE">Residence</option>
            <option value="CARE_HOME">Care Home</option>
            <option value="PSYCHIATRIC_HOMES">Psychiatric Homes</option>
            <option value="WORK">Work</option>
            <option value="CLINIC">Clinic</option>
            <option value="OTHER">Other</option>
          </select>

          <textarea
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Residential Address (billing address)"
            required
            className="w-[328px] h-[80px] rounded-[15px] px-4 border border-gray-300 pt-2 placeholder:text-black outline-none"
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

          {/* Diagnoses dropdown */}
          <select
            name="diagnosis"
            required
            value={selectedDiagnosis}
            onChange={(e) => setSelectedDiagnosis(e.target.value)}
            className="w-[328px] h-[40px] rounded-[15px] text-[14px] border border-[#BBBBBB] px-4 text-black outline-none"
          >
            <option value="" disabled>
              Select Diagnosis
            </option>
            {isLoading && <option disabled>Loading...</option>}
            {!isLoading && error && (
              <option disabled>Error loading diagnoses</option>
            )}
            {!isLoading &&
              !error &&
              listedDiagnoses.map((diag) => (
                <option key={diag.id} value={diag.id}>
                  {diag.diagnosis}
                </option>
              ))}
          </select>

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
            min={new Date().toISOString().split("T")[0]} // 🔹 disable past dates
            onChange={handleChange}
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 placeholder:text-black outline-none"
          />

          <select
            value={visitType}
            onChange={(e) => setVisitType(e.target.value)}
            required
            className="w-[328px] h-[40px] rounded-[15px] px-4 border border-gray-300 outline-none"
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

          {visitType && visitType !== "ONE_TIME_VISIT" && (
            <div>
              <div className="flex gap-2 items-center">
                <select
                  className="h-[40px] w-[200px] bg-white rounded-[15px] px-4 border border-gray-300 outline-none "
                  name="durationValue"
                  value={form.durationValue}
                  onChange={handleChange}
                >
                  <option value="" disabled>
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
            <option value="" disabled>
              Daily Schedule Type
            </option>
            <option value="FULL_TIME_24_HOURS">Full Time(24Hrs)</option>
            <option value="DAY_SHIFT_12_HOURS">Day Shift(12Hrs)</option>
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

          {/* <div className="flex gap-4 mb-4 mt-2">
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
          </div> */}
          <div className="flex gap-4 mb-4 mt-2">
  <input
    name="startTime"
    type="time"
    value={form.startTime}
    onChange={handleChange}
    required
    disabled={!form.scheduleType} // disable if scheduleType is not selected
    className="w-[160px] h-[40px] rounded-[15px] px-4 border border-gray-300 placeholder:text-black outline-none"
  />
  <span className="flex items-center pe-4">From</span>

  <input
    name="endTime"
    type="time"
    value={form.endTime}
    onChange={handleChange}
    required
    disabled={form.scheduleType !== "CUSTOM_HOURS"} // editable only for CUSTOM_HOURS
    className={`w-[160px] h-[40px] rounded-[15px] px-4 border border-gray-300 placeholder:text-black outline-none ${
      form.scheduleType !== "CUSTOM_HOURS" ? "bg-gray-100 cursor-not-allowed" : ""
    }`}
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
            {isLangLoading && <p>Loading languages...</p>}
            {langErrorFetch && !isLangLoading && (
              <p className="text-red-500">Failed to load languages.</p>
            )}
            {!isLangLoading &&
              !langErrorFetch &&
              listedLanguages.map((lang) => (
                <label key={lang.id} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={preferredLanguages.includes(lang.id)}
                    onChange={() => {
                      toggleArray(
                        lang.id,
                        preferredLanguages,
                        setPreferredLanguages
                      );
                      if (preferredLanguages.length > 0) setLangError(false);
                    }}
                  />
                  {lang.language}
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
