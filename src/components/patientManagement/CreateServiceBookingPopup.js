"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useBookingStore from "@/app/lib/store/bookingStore";
import useDiagnosisStore from "@/app/lib/store/useDiagnosisStore";
import useHealthStatusStore from "@/app/lib/store/useHealthStatusStore";
import usePatientServiceStore from "@/app/lib/store/usePatientServiceStore";
import useLanguageStore from "@/app/lib/store/languageStore";
import LocationPickerPopup from "../staffManagement/addNewStaff/LocationPickerPopup";
const WEEK_DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];
export default function CreateServiceBookingPopup({ open, onClose }) {
  if (!open) return null;
  const params = useParams();
  const patientId = params?.id;
  console.log(patientId);
  const { createBooking, loading, error, success, resetBookingState } =
    useBookingStore();
  const { listedDiagnoses, fetchDiagnosesList } = useDiagnosisStore();
  const { listedServices: healthStatuses, fetchServices: fetchHealth } =
    useHealthStatusStore();
  const { listedServices: patientServices, fetchServices } =
    usePatientServiceStore();
  const { listedLanguages, fetchLanguages } = useLanguageStore();
  const [weekdays, setWeekdays] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [errors, setErrors] = useState({});
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [form, setForm] = useState({
    serviceTypeId: "",
    healthStatusId: "",
    stayAt: "",
    scheduleType: "",
    startDate: "",
    diagnosisId: "",
    durationType: "",
    durationValue: "",
    startTime: "",
    endTime: "",
    flexibility: "",
    preferredGender: "",
    currentServiceAddress: "",
    latitude: "",
    longitude: "",
  });
  useEffect(() => {
    fetchDiagnosesList(1, 50);
    fetchHealth(1, 100);
    fetchServices(1, 100);
    fetchLanguages(1, 100);
  }, []);
  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };
  const toggle = (val, arr, setArr, key) => {
    const updated = arr.includes(val)
      ? arr.filter((v) => v !== val)
      : [...arr, val];
    setArr(updated);
    setErrors((p) => ({ ...p, [key]: "" }));
  };
  /* ---------------- VALIDATION ---------------- */
  const validateForm = () => {
    const e = {};
    if (!form.serviceTypeId) e.serviceTypeId = "Service type required";
    if (!form.healthStatusId) e.healthStatusId = "Health status required";
    if (!form.stayAt) e.stayAt = "Stay at required";
    if (!form.diagnosisId) e.diagnosisId = "Diagnosis required";
    if (!form.scheduleType) e.scheduleType = "Schedule type required";
    if (!form.startDate) e.startDate = "Start date required";
    if (!form.durationType) e.durationType = "Duration type required";
    if (
      form.durationType !== "ONE_TIME_VISIT" &&
      (!form.durationValue || form.durationValue <= 0)
    ) {
      e.durationValue = "Enter valid duration";
    }
    if (!form.startTime) e.startTime = "Start time required";
    if (!form.endTime) e.endTime = "End time required";
    if (!form.flexibility) e.flexibility = "Flexibility required";
    if (!form.preferredGender) e.preferredGender = "Gender required";
    if (!form.currentServiceAddress)
      e.currentServiceAddress = "Address required";
    if (form.durationType !== "ONE_TIME_VISIT" && weekdays.length === 0) {
      e.weekdays = "Select at least one weekday";
    }
    if (languages.length === 0) {
      e.languages = "Select at least one language";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  /* ---------------- SUBMIT ---------------- */
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;
  //   const payload = {
  //     ...form,
  //     userId : patientId,
  //     startDate: new Date(form.startDate + "T00:00:00").toISOString(),
  //     weekdays,
  //     preferredLanguageId: languages,
  //     latitude: Number(form.latitude),
  //     longitude: Number(form.longitude),
  //   };
  //   console.log("FINAL PAYLOAD :point_right:", payload);
  //     const res = await createBooking({
  //   userId: patientId, // :white_tick: FIX HERE
  //   payload,
  // });
  //   if (res?.success) {
  //     setTimeout(() => {
  //       resetBookingState();
  //       onClose();
  //     }, 800);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    // Base payload (always sent)
    const payload = {
      serviceTypeId: form.serviceTypeId,
      healthStatusId: form.healthStatusId,
      stayAt: form.stayAt,
      scheduleType: form.scheduleType,
      diagnosisId: form.diagnosisId,
      durationType: form.durationType,
      startTime: form.startTime,
      endTime: form.endTime,
      flexibility: form.flexibility,
      preferredGender: form.preferredGender,
      currentServiceAddress: form.currentServiceAddress,
      preferredLanguageId: languages,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
      startDate: new Date(form.startDate + "T00:00:00").toISOString(),
    };
    // :white_tick: ONLY include duration fields when NOT one-time visit
    if (form.durationType !== "ONE_TIME_VISIT") {
      payload.durationValue = Number(form.durationValue);
      payload.weekdays = weekdays;
    }
    console.log("FINAL PAYLOAD :point_right:", payload);
    const res = await createBooking({
      userId: patientId, // sent as query param
      payload,
    });
    if (res?.success) {
      setTimeout(() => {
        resetBookingState();
        onClose();
      }, 800);
    }
  };
  /* ---------------- UI ---------------- */
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="w-[1000px] max-h-[90vh] bg-white rounded-[16px] flex flex-col">
        {/* HEADER */}
        <div className="px-6 py-4 border-b flex justify-between">
          <h2 className="font-semibold text-[18px]">Create Service Booking</h2>
          <button onClick={onClose} className="text-xl">
            ×
          </button>
        </div>
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-6 grid grid-cols-2 gap-6 text-[14px]"
        >
          <Select
            label="Service Type"
            name="serviceTypeId"
            options={patientServices.map((s) => ({
              value: s.id,
              label: s.service,
            }))}
            onChange={handleChange}
            error={errors.serviceTypeId}
          />
          <Select
            label="Health Status"
            name="healthStatusId"
            options={healthStatuses.map((s) => ({
              value: s.id,
              label: s.status,
            }))}
            onChange={handleChange}
            error={errors.healthStatusId}
          />
          <Select
            label="Stay At"
            name="stayAt"
            value={form.stayAt}
            onChange={handleChange}
            options={[
              { value: "HOSPITAL", label: "Hospital" },
              { value: "RESIDENCE", label: "Residence" },
              { value: "CARE_HOME", label: "Care Home" },
              { value: "PSYCHIATRIC_HOMES", label: "Psychiatric Homes" },
              { value: "WORK", label: "Work" },
              { value: "CLINIC", label: "Clinic" },
              { value: "OTHER", label: "Other" },
            ]}
            error={errors.stayAt}
          />
          <Select
            label="Diagnosis"
            name="diagnosisId"
            options={listedDiagnoses.map((d) => ({
              value: d.id,
              label: d.diagnosis,
            }))}
            onChange={handleChange}
            error={errors.diagnosisId}
          />
          <Select
            label="Schedule Type"
            name="scheduleType"
            options={[
              { value: "FULL_TIME_24_HOURS", label: "24 Hours" },
              { value: "DAY_SHIFT_12_HOURS", label: "Day Shift 12 Hours" },
              { value: "NIGHT_SHIFT_12_HOURS", label: "Night Shift 12 Hours" },
              { value: "FULL_TIME_24_HOURS", label: "Full Time 24 Hours" },
              { value: "CUSTOM_HOURS", label: "Custom Hours" },
            ]}
            onChange={handleChange}
            error={errors.scheduleType}
          />
          <Input
            label="Start Date"
            type="date"
            name="startDate"
            onChange={handleChange}
            error={errors.startDate}
          />
          <Select
            label="Duration Type"
            name="durationType"
            options={[
              { value: "ONE_TIME_VISIT", label: "One Time Visit" },
              { value: "FEW_DAYS", label: "Few Days" },
              { value: "FEW_WEEKS", label: "Few Weeks" },
              { value: "LONG_TERM", label: "Long Term" },
              { value: "OTHER", label: "Other" },
            ]}
            onChange={handleChange}
            error={errors.durationType}
          />
          {form.durationType !== "ONE_TIME_VISIT" && (
            <Input
              label="Duration Value"
              type="number"
              name="durationValue"
              onChange={handleChange}
              error={errors.durationValue}
            />
          )}
          <Input
            label="Start Time"
            type="time"
            name="startTime"
            onChange={handleChange}
            error={errors.startTime}
          />
          <Input
            label="End Time"
            type="time"
            name="endTime"
            onChange={handleChange}
            error={errors.endTime}
          />
          <Select
            label="Flexibility"
            name="flexibility"
            options={[
              { value: "FIXED", label: "Fixed" },
              { value: "FLEXIBLE", label: "Flexible" },
            ]}
            onChange={handleChange}
            error={errors.flexibility}
          />
          <Select
            label="Preferred Gender"
            name="preferredGender"
            options={[
              { value: "MALE", label: "Male" },
              { value: "FEMALE", label: "Female" },
            ]}
            onChange={handleChange}
            error={errors.preferredGender}
          />
          {/* WEEKDAYS */}
          {form.durationType !== "ONE_TIME_VISIT" && (
            <div>
              <label className="font-medium">Weekdays</label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {WEEK_DAYS.map((d) => (
                  <label key={d} className="flex gap-1 items-center">
                    <input
                      type="checkbox"
                      onChange={() =>
                        toggle(d, weekdays, setWeekdays, "weekdays")
                      }
                    />
                    {d.slice(0, 3)}
                  </label>
                ))}
              </div>
              {errors.weekdays && (
                <p className="text-red-500 text-xs">{errors.weekdays}</p>
              )}
            </div>
          )}
          {/* LANGUAGES */}
          <div>
            <label className="font-medium">Languages</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {listedLanguages.map((l) => (
                <label key={l.id} className="flex gap-1 items-center">
                  <input
                    type="checkbox"
                    onChange={() =>
                      toggle(l.id, languages, setLanguages, "languages")
                    }
                  />
                  {l.language}
                </label>
              ))}
            </div>
            {errors.languages && (
              <p className="text-red-500 text-xs">{errors.languages}</p>
            )}
          </div>
          <Textarea
            label="Current Service Address"
            name="currentServiceAddress"
            value={form.currentServiceAddress}
            onClick={() => setShowLocationPopup(true)}
            readOnly
            error={errors.currentServiceAddress}
          />
          {/* FOOTER */}
          <div className="col-span-2 flex justify-end gap-4 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              className="border px-6 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#3674B5] text-white px-6 py-2 rounded disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
          {error && <p className="col-span-2 text-red-500">{error}</p>}
          {success && (
            <p className="col-span-2 text-green-600">Booking created</p>
          )}
        </form>
      </div>
      {showLocationPopup && (
        <LocationPickerPopup
          bookingId={null}
          onClose={() => setShowLocationPopup(false)}
          onUpdated={(coords) => {
            setForm((p) => ({
              ...p,
              latitude: coords.latitude,
              longitude: coords.longitude,
              currentServiceAddress: coords.mapLocation,
            }));
            setShowLocationPopup(false);
          }}
        />
      )}
    </div>
  );
}
/* ---------------- UI COMPONENTS ---------------- */
const Input = ({ label, error, ...props }) => (
  <div>
    <label className="font-medium">{label}</label>
    <input {...props} className="w-full h-[40px] border rounded px-3" />
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);
const Select = ({ label, options, error, ...props }) => (
  <div>
    <label className="font-medium">{label}</label>
    <select {...props} className="w-full h-[40px] border rounded px-3">
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);
const Textarea = ({ label, error, ...props }) => (
  <div>
    <label className="font-medium">{label}</label>
    <textarea
      {...props}
      className="w-full h-[80px] border rounded px-3 py-2 cursor-pointer"
    />
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);
