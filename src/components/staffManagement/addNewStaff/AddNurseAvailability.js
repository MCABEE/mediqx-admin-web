"use client";
import React, { useState, useMemo, useEffect } from "react";
import useNurseRegistrationStore from "@/app/lib/store/nurseRegistrationStore";
import { submitNursePageThree } from "@/api/addStaffNurseApi";
import useManageProfessionalsStore from "@/app/lib/store/useManageProfessionalsStore";

function AddNurseAvailability({ categoryByProfession }) {
  const today = new Date().toISOString().split("T")[0];
  const { userId } = useNurseRegistrationStore();

  const [qualification, setQualification] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [workSchedule, setWorkSchedule] = useState("");
  const [isRegisteredNurse, setIsRegisteredNurse] = useState(false);

  const [mode, setMode] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedDates, setSelectedDates] = useState({});
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [popupDate, setPopupDate] = useState(null);

  const { listedItems, fetchItems } = useManageProfessionalsStore();

  // Fetch specializations and qualifications when categoryByProfession changes
  // useEffect(() => {
  //   if (categoryByProfession) {
  //     fetchItems("qualifications", 1, 50, categoryByProfession);
  //     fetchItems("specializations", 1, 50, categoryByProfession);
  //   }
  // }, [categoryByProfession, fetchItems]);

  const normalizedCategory = React.useMemo(() => {
    if (categoryByProfession === "REGISTERED_NURSE") return "REG_NURSES";
    if (categoryByProfession === "ANCILLARY_PERSONAL") return "ANCILLARY";
    return categoryByProfession;
  }, [categoryByProfession]);

  useEffect(() => {
    if (normalizedCategory) {
      fetchItems("qualifications", 1, 50, normalizedCategory);
      fetchItems("specializations", 1, 50, normalizedCategory);
    }
  }, [normalizedCategory, fetchItems]);

  // Lists from store, fallback to empty arrays if not loaded yet
  const qualifications = listedItems.qualifications || [];
  const specializations = listedItems.specializations || [];

  const [slot, setSlot] = useState({
    forenoon: { from: "", to: "" },
    afternoon: { from: "", to: "" },
  });

  const [selectedFullTimeSlot, setSelectedFullTimeSlot] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const getAllDatesInRange = (startStr, endStr) => {
    const start = new Date(startStr);
    const end = new Date(endStr);
    const dates = [];
    for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      dates.push(new Date(dt));
    }
    return dates;
  };

  const allDates = useMemo(() => {
    if (!fromDate || !toDate) return [];
    return getAllDatesInRange(fromDate, toDate);
  }, [fromDate, toDate]);

  const groupedByMonth = useMemo(() => {
    const groups = {};
    allDates.forEach((date) => {
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(new Date(date));
    });
    return Object.entries(groups);
  }, [allDates]);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const formatTime12Hour = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    const h = +hour % 12 || 12;
    const ampm = +hour >= 12 ? "PM" : "AM";
    return `${h}:${minute} ${ampm}`;
  };

  const formatMonthYear = (key) => {
    const [year, month] = key.split("-");
    const d = new Date(year, month - 1);
    return d.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const handleDateClick = (date) => {
    const key = formatDate(date);
    const todayDate = new Date().toISOString().split("T")[0];
    if (key < todayDate) return;

    if (mode === "fulltime") {
      // When fulltime, only one slot selected
      const fixedSlotMap = {
        "24 Hrs": "SHIFT_24_HOURS",
        "12 Hrs Day only": "DAY_SHIFT_12_HOURS",
        "12 Hrs Night only": "NIGHT_SHIFT_12_HOURS",
        "Flexible Hrs": "SHIFT_FLEXIBLE_HOURS",
      };
      if (!selectedFullTimeSlot) {
        setErrorMsg("Please select a full time slot.");
        return;
      }
      setSelectedDates((prev) => {
        const updated = { ...prev };
        if (updated[key]) delete updated[key];
        else
          updated[key] = {
            fulltime: true,
            fixedSlot: fixedSlotMap[selectedFullTimeSlot],
            slots: [], // No detailed slots on fulltime mode
          };
        return updated;
      });
      setErrorMsg("");
    } else if (mode === "parttime") {
      if (selectedDates[key] && !selectedDates[key].fulltime) {
        setSelectedDates((prev) => {
          const updated = { ...prev };
          delete updated[key];
          return updated;
        });
      } else {
        setPopupDate(date);
        setSlot({
          forenoon: { from: "", to: "" },
          afternoon: { from: "", to: "" },
        });
        setErrorMsg("");
      }
    }
  };

  const handleSaveSlot = () => {
    const key = formatDate(popupDate);
    const hasForenoon = slot.forenoon.from && slot.forenoon.to;
    const hasAfternoon = slot.afternoon.from && slot.afternoon.to;

    if (hasForenoon || hasAfternoon) {
      setSelectedDates((prev) => ({
        ...prev,
        [key]: {
          fulltime: false,
          slots: {
            ...(hasForenoon && { forenoon: slot.forenoon }),
            ...(hasAfternoon && { afternoon: slot.afternoon }),
          },
        },
      }));
      setPopupDate(null);
      setErrorMsg("");
    } else {
      setErrorMsg("Please fill at least one time slot.");
    }
  };

  const handleRemoveDate = (key) => {
    setSelectedDates((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  // Prepare payload according to backend API
  // const generateAvailabilities = () => {
  //   const availabilities = [];
  //   for (const [date, info] of Object.entries(selectedDates)) {
  //     if (info.fulltime) {
  //       availabilities.push({
  //         date,
  //         isAvailable: true,
  //         fixedSlots: info.fixedSlot,
  //         slotOneStart: null,
  //         slotOneEnd: null,
  //         slotTwoStart: null,
  //         slotTwoEnd: null,
  //       });
  //     } else {
  //       // For parttime, actual shifts
  //       const s1 = info.slots.forenoon || null;
  //       const s2 = info.slots.afternoon || null;
  //       availabilities.push({
  //         date,
  //         isAvailable: true,
  //         fixedSlots: null,
  //         slotOneStart: s1 ? s1.from : null,
  //         slotOneEnd: s1 ? s1.to : null,
  //         slotTwoStart: s2 ? s2.from : null,
  //         slotTwoEnd: s2 ? s2.to : null,
  //       });
  //     }
  //   }
  //   return availabilities;
  // };

  const generateAvailabilities = () => {
    const availabilities = [];
    // Add available dates in your current logic
    for (const [date, info] of Object.entries(selectedDates)) {
      if (info.fulltime) {
        availabilities.push({
          date,
          isAvailable: true,
          fixedSlots: info.fixedSlot,
          slotOneStart: null,
          slotOneEnd: null,
          slotTwoStart: null,
          slotTwoEnd: null,
        });
      } else {
        const s1 = info.slots.forenoon || null;
        const s2 = info.slots.afternoon || null;
        availabilities.push({
          date,
          isAvailable: true,
          fixedSlots: null,
          slotOneStart: s1 ? s1.from : null,
          slotOneEnd: s1 ? s1.to : null,
          slotTwoStart: s2 ? s2.from : null,
          slotTwoEnd: s2 ? s2.to : null,
        });
      }
    }
    // Add unavailable (leave) dates
    leaveDates.forEach((date) => {
      availabilities.push({
        date,
        isAvailable: false,
        fixedSlots: null,
        slotOneStart: null,
        slotOneEnd: null,
        slotTwoStart: null,
        slotTwoEnd: null,
      });
    });
    // Optionally sort by date
    availabilities.sort((a, b) => a.date.localeCompare(b.date));
    return availabilities;
  };

  const handleSaveAvailability = async () => {
    setFormError("");

    if (!userId) {
      setFormError("User not logged in or userId missing.");
      return;
    }
    if (!qualification) {
      setFormError("Please select a qualification.");
      return;
    }
    if (!specialization) {
      setFormError("Please select a specialization.");
      return;
    }
    if (!workSchedule) {
      setFormError("Please select your work schedule (Full Time / Part Time).");
      return;
    }
    if (Object.keys(selectedDates).length === 0) {
      setFormError("Please select at least one availability date.");
      return;
    }
    if (mode === "fulltime" && !selectedFullTimeSlot) {
      setFormError("Please select full time slot.");
      return;
    }

    const payload = {
      userId,
      educationQualificationsIds: [qualification],
      specializationsIds: [specialization],
      workSchedule,
      isRegisteredNurse,
      availabilities: generateAvailabilities(),
    };

    try {
      setLoading(true);
      const result = await submitNursePageThree(payload);
      console.log("✅ Success:", result);
      setFormError("");
      window.location.reload();
    } catch (err) {
      console.error("Submission error", err);
      setFormError(err.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  const selectedDateList = Object.keys(selectedDates).sort();
  const leaveDates = allDates
    .map(formatDate)
    .filter((d) => !selectedDates[d])
    .sort();

  return (
    <div className="py-10 px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveAvailability();
        }}
      >
        <h1 className="font-semibold text-[16px]">Manage your Work schedule</h1>

        <div className="mt-6">
          {/* Qualification */}
          {/* <select
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-[14px] text-black outline-none placeholder:text-black"
            required
          >
        
            <option disabled value="">
              Qualification
            </option>
            <option value="ANM (Auxiliary Nurse Midwife)">ANM (Auxiliary Nurse Midwife)</option>
            <option value="GNM (General Nursing and Midwifery)">GNM (General Nursing and Midwifery)</option>
            <option value="GDA (General Duty Assistant)">GDA (General Duty Assistant)</option>
            <option value="B.Sc. Nursing">B.Sc. Nursing</option>
            <option value="Post Basic B.Sc. Nursing">Post Basic B.Sc. Nursing</option>
            <option value="M.Sc. Nursing">M.Sc. Nursing</option>
            <option value="Nurse Practitioner (NP)">Nurse Practitioner (NP)</option>
            
          </select> */}

          <select
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-[14px] text-black outline-none placeholder:text-black"
            required
          >
            {/* <option disabled value="">
              Qualification
            </option>
            {qualifications.map((q) => (
              <option key={q.id} value={q.qualification || q}>
                {q.qualification || q}
              </option>
            ))} */}
            <option disabled value="">
              Qualification
            </option>
            {qualifications.map((q) => (
              <option key={q.id} value={q.id}>
                {q.qualification || q}
              </option>
            ))}
          </select>

          {/* Registered Nurse Checkbox */}
          <div className="flex items-center gap-2 ps-2 mt-3">
            <input
              type="checkbox"
              className="size-4"
              checked={isRegisteredNurse}
              onChange={(e) => setIsRegisteredNurse(e.target.checked)}
              id="isRegisteredNurse"
            />
            <label htmlFor="isRegisteredNurse" className="cursor-pointer">
              I have a valid Council Registration
            </label>
          </div>

          {/* Specialization */}
          {/* <div className="pb-3">
            <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-[14px] text-black  outline-none placeholder:text-black mt-3"
          >
            <option disabled value="">
              Specialization
            </option>
            <option value="Staff Nurse / Ward Nurse">
              Staff Nurse / Ward Nurse
            </option>
            <option value="ICU Nurse / Critical Care Nurse">ICU Nurse</option>
            <option value="ER Nurse / Trauma Nurse">ER Nurse</option>
            <option value="Pediatric Nurse">Pediatric Nurse</option>
          </select>
          </div> */}
          <div className="pb-3">
            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-[14px] text-black outline-none mt-3"
            >
              {/* <option disabled value="">
                Specialization
              </option>
              {specializations.map((s) => (
                <option key={s.id} value={s.specialization || s}>
                  {s.specialization || s}
                </option>
              ))} */}
              <option disabled value="">
                Specialization
              </option>
              {specializations.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.specialization || s}
                </option>
              ))}
            </select>
          </div>

          {/* Single select for schedule + mode */}
          <select
            value={workSchedule}
            onChange={(e) => {
              const val = e.target.value;
              setWorkSchedule(val);
              setMode(val === "FULL_TIME" ? "fulltime" : "parttime");
              setSelectedDates({});
              setSelectedFullTimeSlot("");
              setPopupDate(null);
              setErrorMsg("");
            }}
            required
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-[14px] text-black  outline-none placeholder:text-black mt-3"
          >
            <option value="">Select Work Schedule</option>
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
          </select>
        </div>

        {/* Fulltime Slot Selection */}
        {mode === "fulltime" && (
          <>
            <p className="mt-6 text-[14px] text-black ">
              If you are ready to work fulltime, choose your convenient time
              slot for the selected days
            </p>
            <div className="mt-4 flex gap-8 flex-wrap text-[16px] text-black">
              {[
                "24 Hrs",
                "12 Hrs Day only",
                "12 Hrs Night only",
                "Flexible Hrs",
              ].map((label) => (
                <label key={label} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="fulltime-slot"
                    className="mr-2 size-5"
                    value={label}
                    checked={selectedFullTimeSlot === label}
                    onChange={() => setSelectedFullTimeSlot(label)}
                    required
                  />
                  {label}
                </label>
              ))}
            </div>
            {errorMsg && (
              <p className="text-red-500 text-sm mt-2 font-medium">
                {errorMsg}
              </p>
            )}
          </>
        )}

        {/* Date range selection */}
        <div className="mt-6">
          <p className="mt-6 text-[14px] text-black ">
            Set your available days
          </p>
          <div className="flex gap-4 mt-2">
            <div>
              <p className="text-[14px] text-gray-600">Choose from Date</p>
              <input
                type="date"
                min={today}
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                  setToDate("");
                  setSelectedDates({});
                  setCurrentMonthIndex(0);
                }}
                className="w-[240px] h-[40px] px-2 mt-2 border-1 rounded-[15px] border-[#bbbbbb] outline-none"
                required
              />
            </div>
            <div>
              <p className="text-[14px] text-gray-600">Choose To Date</p>
              <input
                type="date"
                min={fromDate || today}
                value={toDate}
                onChange={(e) => {
                  setToDate(e.target.value);
                  setSelectedDates({});
                  setCurrentMonthIndex(0);
                }}
                className="w-[240px] h-[40px] px-2 mt-2 border-1 rounded-[15px] border-[#bbbbbb] outline-none"
                required
                disabled={!fromDate}
              />
            </div>
          </div>
        </div>

        {/* Selected Dates display */}
        {selectedDateList.length > 0 && (
          <div className="mt-6">
            <p className="font-semibold text-green-700">Available Dates:</p>
            <div className="flex flex-wrap gap-2 mt-2 text-sm">
              {selectedDateList.map((key) => {
                const val = selectedDates[key];
                return (
                  <span
                    key={key}
                    className="px-3 py-1 bg-green-100 rounded-full flex items-center gap-2 text-gray-800 shadow-sm"
                  >
                    <span>
                      {key}
                      {!val.fulltime && val.slots && (
                        <span className="ml-1 text-xs text-gray-600">
                          {val.slots.forenoon && (
                            <>
                              (FN: {formatTime12Hour(val.slots.forenoon.from)} -{" "}
                              {formatTime12Hour(val.slots.forenoon.to)})
                            </>
                          )}
                          {val.slots.afternoon && val.slots.forenoon && " "}
                          {val.slots.afternoon && (
                            <>
                              (AN: {formatTime12Hour(val.slots.afternoon.from)}{" "}
                              - {formatTime12Hour(val.slots.afternoon.to)})
                            </>
                          )}
                        </span>
                      )}
                      {val.fulltime && val.fixedSlot && (
                        <span className="ml-1 text-xs text-gray-600">
                          (
                          {val.fixedSlot
                            .replace("SHIFT_", "")
                            .replace(/_/g, " ")}
                          )
                        </span>
                      )}
                    </span>
                    <button
                      onClick={() => handleRemoveDate(key)}
                      className="text-red-500 hover:scale-125 transition-transform duration-150"
                      title="Remove"
                      type="button"
                    >
                      ✕
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Leave Dates */}
        {leaveDates.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold text-red-700">Leave Dates:</p>
            <div className="flex flex-wrap gap-2 mt-2 text-sm">
              {leaveDates.map((d) => (
                <span key={d} className="px-2 py-1 bg-red-100 rounded">
                  {d}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Calendar view */}
        {groupedByMonth.length > 0 && (
          <>
            <p className="font-semibold mt-8">
              {formatMonthYear(groupedByMonth[currentMonthIndex][0])}
            </p>
            <div className="grid grid-cols-7 gap-4 mt-5">
              {groupedByMonth[currentMonthIndex][1].map((date) => {
                const key = formatDate(date);
                const isSelected = selectedDates[key];
                const isPast = key < today;
                return (
                  <div
                    key={key}
                    onClick={() => !isPast && handleDateClick(date)}
                    className={`size-20 border border-[#aaaaaa] rounded flex justify-center items-center font-semibold cursor-pointer transition ${
                      isPast
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : isSelected
                        ? "bg-blue-500 text-white"
                        : "bg-white border-gray-400"
                    }`}
                  >
                    {date.getDate()}
                  </div>
                );
              })}
            </div>
            {groupedByMonth.length > 1 && (
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentMonthIndex((prev) => Math.max(prev - 1, 0))
                  }
                  disabled={currentMonthIndex === 0}
                  className="px-4 py-1 border border-[#bbbbbb] rounded-[15px] disabled:opacity-50 cursor-pointer"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentMonthIndex((prev) =>
                      Math.min(prev + 1, groupedByMonth.length - 1)
                    )
                  }
                  disabled={currentMonthIndex === groupedByMonth.length - 1}
                  className="px-4 py-1 border border-[#bbbbbb] rounded-[15px]  disabled:opacity-50 cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Popup for parttime slot selection */}
        {popupDate && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-[360px]">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Set Time Slot for{" "}
                <span className="text-blue-600">{formatDate(popupDate)}</span>
              </h2>
              <div className="space-y-4">
                {/* {["forenoon", "afternoon"].map((period) => (
                  <div key={period}>
                    <p className="font-medium text-gray-700 capitalize">
                      {period}
                    </p>
                    <div className="flex gap-3 mt-1">
                      <input
                        type="time"
                        value={slot[period].from}
                        onChange={(e) =>
                          setSlot({
                            ...slot,
                            [period]: {
                              ...slot[period],
                              from: e.target.value,
                            },
                          })
                        }
                        className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      <input
                        type="time"
                        value={slot[period].to}
                        onChange={(e) =>
                          setSlot({
                            ...slot,
                            [period]: {
                              ...slot[period],
                              to: e.target.value,
                            },
                          })
                        }
                        className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                ))} */}
                {["forenoon", "afternoon"].map((period) => (
                  <div key={period}>
                    <p className="font-medium text-gray-700 capitalize">
                      {period}
                    </p>
                    <div className="flex gap-3 mt-1">
                      <input
                        type="time"
                        value={slot[period].from}
                        onChange={(e) => {
                          const fromTime = e.target.value;
                          const [hoursStr, minutesStr] = fromTime.split(":");
                          let hours = parseInt(hoursStr, 10);
                          let minutes = parseInt(minutesStr, 10);
                          hours += 2;
                          if (hours >= 24) hours -= 24; // wrap around midnight

                          const toTime = `${hours
                            .toString()
                            .padStart(2, "0")}:${minutes
                            .toString()
                            .padStart(2, "0")}`;

                          setSlot({
                            ...slot,
                            [period]: {
                              from: fromTime,
                              to: toTime,
                            },
                          });
                        }}
                        className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      <input
                        type="time"
                        value={slot[period].to}
                        onChange={(e) =>
                          setSlot({
                            ...slot,
                            [period]: {
                              ...slot[period],
                              to: e.target.value,
                            },
                          })
                        }
                        className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
              {errorMsg && (
                <p className="text-red-500 text-sm mt-2 font-medium">
                  {errorMsg}
                </p>
              )}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPopupDate(null)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveSlot}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10">
          <button
            type="submit"
            disabled={loading}
            className="w-[280px] px-6 py-2 bg-[#3674B5] text-white font-semibold rounded-[15px]"
          >
            {loading ? "Submitting..." : "Save"}
          </button>
        </div>
        {formError && (
          <p className="text-red-600 text-sm mt-2 font-medium">{formError}</p>
        )}
      </form>
    </div>
  );
}

export default AddNurseAvailability;
