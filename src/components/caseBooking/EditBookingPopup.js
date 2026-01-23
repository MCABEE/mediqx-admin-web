"use client";
import useBookingStore from "@/app/lib/store/bookingStore";
import React, { useState, useEffect } from "react";
import usePatientServiceStore from "@/app/lib/store/usePatientServiceStore";
import useHealthStatusStore from "@/app/lib/store/useHealthStatusStore";
import useDiagnosisStore from "@/app/lib/store/useDiagnosisStore";
import useLanguageStore from "@/app/lib/store/languageStore";

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
  const { listedServices, fetchServices } = usePatientServiceStore();
  const { listedHealthStatus, fetchHealthStatus } = useHealthStatusStore();
  const { listedDiagnoses, fetchDiagnosesList } = useDiagnosisStore();
  const {
    listedLanguages,
    fetchLanguages,
    isLoading: isLangLoading,
    error: langErrorFetch,
  } = useLanguageStore();

  console.log(initialData);




  const { updateExistingBooking } = useBookingStore();
  // const [form, setForm] = useState({
  //   // Patient Details
  //   fullName: "",
  //   gender: "",
  //   age: "",
  //   height: "",
  //   weight: "",
  //   diagnosisId: "",
  //   healthStatusId: "",
  //   stayAt: "",
  //   city: "",
  //   contactPersonName: "",
  //   contactPersonRelation: "",
  //   contactPersonEmail: "",
  //   contactPersonMobileNumber: "",

  //   // Service Details

  //   startDate: "",
  //   serviceTypeId: "",
  //   durationType: "",
  //   durationValue: "",
  //   weekdays: [],
  //   flexibility: "",
  //   startTime: "",
  //   endTime: "",
  //   scheduleType: "",

  //   // Staff Preferences
  //   preferredGender: "",
  //   preferredLanguages: [],
  // });
const [form, setForm] = useState({
  fullName: "",
  gender: "",
  age: "",
  height: "",
  weight: "",
  diagnosisId: "",
  healthStatusId: "",
  stayAt: "",
  city: "",
  contactPersonName: "",
  contactPersonRelation: "",
  contactPersonEmail: "",
  contactPersonMobileNumber: "",
  startDate: "",
  serviceTypeId: "",
  durationType: "",
  durationValue: "",
  weekdays: [],
  flexibility: "",
  startTime: "",
  endTime: "",
  scheduleType: "",
  preferredGender: "",
  preferredLanguages: [],
});

// ✅ Move this AFTER useState
useEffect(() => {
  if (!form.startTime || !form.scheduleType) return;

  const [hours, minutes] = form.startTime.split(":").map(Number);
  const start = new Date();
  start.setHours(hours);
  start.setMinutes(minutes);

  let end = new Date(start);

  switch (form.scheduleType) {
    case "FULL_TIME_24_HOURS":
      end.setHours(end.getHours() + 24);
      break;
    case "DAY_SHIFT_12_HOURS":
    case "NIGHT_SHIFT_12_HOURS":
      end.setHours(end.getHours() + 12);
      break;
    case "CUSTOM_HOURS":
    default:
      return;
  }

  const formattedEnd = end.toTimeString().slice(0, 5);
  setForm((prev) => ({ ...prev, endTime: formattedEnd }));
}, [form.startTime, form.scheduleType]);
  useEffect(() => {
    fetchServices(1, 50); // load services
    fetchHealthStatus(1, 50); // load health statuses
    fetchDiagnosesList(1, 50); // load diagnoses
  }, [fetchServices, fetchHealthStatus, fetchDiagnosesList]);

  console.log(listedServices);
  console.log(listedHealthStatus);
  console.log(listedDiagnoses);

  useEffect(() => {
    fetchLanguages(1, 100);
  }, [fetchLanguages]);

  // Prefill form when initialData and API lists are ready
  useEffect(() => {
    if (!initialData || !listedLanguages) return;

    const diagnosisOption = listedDiagnoses?.find(
      (d) => d.diagnosis === initialData.diagnosis
    );
    const serviceOption = listedServices?.find(
      (s) => s.service === initialData.serviceType
    );
    const healthStatusOption = listedHealthStatus?.find(
      (h) => h.status === initialData.healthStatus
    );

    setForm((prev) => ({
      ...prev,
      userId: initialData.userId || "",
      fullName: initialData.fullName || "",
      gender: initialData.gender || "",
      age: initialData.age || "",
      height: initialData.height || "",
      weight: initialData.weight || "",
      diagnosisId: diagnosisOption?.id || "",
      serviceTypeId: serviceOption?.id || "",
      healthStatusId: healthStatusOption?.id || "",
      stayAt: initialData.stayAt || "",
      fullAddress: initialData.fullAddress || "",
      contactPersonName: initialData.contactPersonName || "",
      contactPersonRelation: initialData.contactPersonRelation || "",
      contactPersonEmail: initialData.contactPersonEmail || "",
      contactPersonMobileNumber: initialData.contactPersonMobileNumber || "",
      startDate: initialData.startDate?.slice(0, 10) || "",
      startTime: initialData.startTime?.slice(11, 16) || "",
      endTime: initialData.endTime?.slice(11, 16) || "",
      durationType: initialData.durationType || "",
      durationValue: initialData.durationValue || "",
      weekdays: initialData.weekdays || [],
      flexibility: initialData.flexibility || "",
      scheduleType: initialData.scheduleType || "",
      preferredGender: initialData.preferredGender || "",
      // preferredLanguages: initialData.preferredLanguages || [],
      preferredLanguages:
        initialData.preferredLanguages?.map((l) => ({
          id: l.id,
          language: l.language,
        })) || [],
    }));
  }, [
    initialData,
    listedLanguages,
    listedDiagnoses,
    listedServices,
    listedHealthStatus,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const bookingId = initialData.id;
    console.log(bookingId);

    const payload = {
      ...form,
      diagnosis: listedDiagnoses.find((d) => d.id === form.diagnosisId)
        ?.diagnosis,
      serviceType: listedServices.find((s) => s.id === form.serviceTypeId)
        ?.service,
      healthStatus: listedHealthStatus.find((h) => h.id === form.healthStatusId)
        ?.status,
      userId: form.userId,
      patientName: form.fullName,
      gender: form.gender,
      age: Number(form.age),
      height: Number(form.height),
      weight: Number(form.weight),
      // diagnosis: form.diagnosis,
      // healthStatus: form.healthStatus,
      stayAt: form.stayAt,
      // serviceType: form.serviceType,
      officialAddress: form.fullAddress,
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
      // preferredLanguages: form.preferredLanguages,
      // preferredLanguageId: form.preferredLanguages,
      preferredLanguageId: form.preferredLanguages.map((l) => l.id),

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
            className="text-gray-500 hover:text-red-500 text-xl transition cursor-pointer"
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
              name="healthStatusId"
              value={form.healthStatusId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md"
            >
              <option value="" disabled>
                Select Health Status
              </option>
              {listedHealthStatus?.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.status}
                </option>
              ))}
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
              className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-sm"
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
            label="Residential Address"
            name="fullAddress"
            value={form.fullAddress}
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
              className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-sm"
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
              name="diagnosisId"
              value={form.diagnosisId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md"
            >
              <option value="" disabled>
                Select Diagnosis
              </option>
              {listedDiagnoses?.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.diagnosis}
                </option>
              ))}
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
              name="serviceTypeId"
              value={form.serviceTypeId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md"
            >
              <option value="" disabled>
                Service Required
              </option>
              {listedServices?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.service}
                </option>
              ))}
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
              className="w-[328px] py-2 rounded-md text-sm px-4 border border-gray-300 placeholder:text-black outline-none"
            >
              <option value="" disabled>
                Single Visit / Periodically
              </option>
              <option value="ONE_TIME_VISIT">One-time visit</option>
              <option value="FEW_DAYS">Few Days</option>
              <option value="FEW_WEEKS">Few Weeks</option>
              <option value="LONG_TERM">Long-term(Month)</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <InputGroup
            label="Duration Value"
            name="durationValue"
            type="number"
            value={form.durationValue}
            onChange={handleChange}
          />
          {/* <InputGroup
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
          /> */}

          {/* Start Time */}
<InputGroup
  label="Start Time"
  name="startTime"
  type="time"
  value={form.startTime}
  onChange={handleChange}
/>

{/* End Time */}
<div className="flex flex-col gap-[6px]">
  <label className="text-sm font-medium text-[#1F2937]">End Time</label>
  <input
    type="time"
    name="endTime"
    value={form.endTime}
    onChange={handleChange}
    disabled={
      form.scheduleType !== "CUSTOM_HOURS" // only editable if custom
    }
    className={`w-full px-3 py-2 border border-[#D1D5DB] rounded-md text-sm ${
      form.scheduleType !== "CUSTOM_HOURS" ? "bg-gray-100" : ""
    }`}
  />
</div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-sm font-medium text-[#1F2937]">
              Flexibility
            </label>
            <select
              name="flexibility"
              value={form.flexibility}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-sm"
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
              className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-sm"
            >
              <option value="" disabled>
                Daily Schedule Type
              </option>
              <option value="FULL_TIME_24_HOURS">Full Time(24Hrs)</option>
              <option value="DAY_SHIFT_12_HOURS">Day Shift(12Hrs)</option>
              {/* <option value="DAY_SHIFT_8_HOURS">Day Shift(8Hrs)</option> */}
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
            <label className="text-sm font-medium text-[#1F2937] mb-1 block">
              Preferred Gender
            </label>
            <select
              name="preferredGender"
              value={form.preferredGender}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  preferredGender: e.target.value,
                }))
              }
              required
              className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-sm"
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          {/* Read-only Input showing comma-separated selected languages */}
          {/* <div>
            <InputGroup
              label="Preferred Languages (comma separated)"
              name="preferredLanguages"
              value={form.preferredLanguages?.join(", ")}
              onChange={() => {}}
              readOnly
            />

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
                        : [...(form.preferredLanguages || []), lang]; // add
                      setForm((prev) => ({
                        ...prev,
                        preferredLanguages: updated,
                      }));
                    }}
                  />
                  {lang}
                </label>
              ))}
            </div>
          </div> */}
          {/* Preferred Languages */}
          {/* Preferred Languages */}
          {/* Preferred Languages */}
          <div>
            <label className="text-sm font-medium text-[#1F2937] mb-1 block">
              Preferred Languages
            </label>
            {/* Readonly input showing selected language names */}
            {/* <input
              type="text"
              className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md text-sm "
              readOnly
              value={
                listedLanguages
                  ?.filter((l) => form.preferredLanguages.includes(l.id))
                  .map((l) => l.language)
                  .join(", ") || ""
              }
            /> */}
            <input
              type="text"
              className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md text-sm"
              readOnly
              value={form.preferredLanguages.map((l) => l.language).join(", ")}
            />

            {isLangLoading && (
              <p className="text-gray-500">Loading languages...</p>
            )}
            {langErrorFetch && (
              <p className="text-red-500">Failed to load languages</p>
            )}

            <div className="grid grid-cols-2 gap-2 my-4">
              {/* {listedLanguages?.map((lang) => (
                <label key={lang.id} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.preferredLanguages?.includes(lang.id)}
                    onChange={() => {
                      const updated = form.preferredLanguages.includes(lang.id)
                        ? form.preferredLanguages.filter((id) => id !== lang.id)
                        : [...form.preferredLanguages, lang.id];
                      setForm((prev) => ({
                        ...prev,
                        preferredLanguages: updated,
                      }));
                    }}
                  />
                  {lang.language}
                </label>
              ))} */}

              {listedLanguages?.map((lang) => {
                const isChecked = form?.preferredLanguages?.some(
                  (l) => l.id.toString() === lang.id.toString()
                );

                return (
                  <label
                    key={lang.id}
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={!!isChecked}
                      onChange={() => {
                        setForm((prev) => {
                          const already = prev.preferredLanguages.some(
                            (l) => l.id.toString() === lang.id.toString()
                          );
                          return {
                            ...prev,
                            preferredLanguages: already
                              ? prev.preferredLanguages.filter(
                                  (l) => l.id.toString() !== lang.id.toString()
                                )
                              : [
                                  ...prev.preferredLanguages,
                                  { id: lang.id, language: lang.language },
                                ],
                          };
                        });
                      }}
                    />
                    {lang.language}
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-md bg-[#2152bd] text-white hover:bg-[#1D4ED8] transition cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookingPopup;
