"use client";
import React, { useState } from "react";
import useNurseRegistrationStore from "@/app/lib/store/nurseRegistrationStore";
import { submitNursePageThree } from "@/api/addStaffNurseApi";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const defaultShift = { start: "", end: "" };

export default function NurseAvailability() {
  const { userId } = useNurseRegistrationStore();
  const [qualification, setQualification] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [workSchedule, setWorkSchedule] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegisteredNurse, setIsRegisteredNurse] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [schedule, setSchedule] = useState(
    daysOfWeek.map((day) => ({
      day,
      available: false,
      shifts: [{ ...defaultShift }, { ...defaultShift }],
    }))
  );

  const toggleAvailability = (index) => {
    const newSchedule = [...schedule];
    newSchedule[index].available = !newSchedule[index].available;
    if (!newSchedule[index].available) {
      newSchedule[index].shifts = [{ ...defaultShift }, { ...defaultShift }];
    }
    setSchedule(newSchedule);
  };

  const handleTimeChange = (dayIndex, shiftIndex, field, value) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].shifts[shiftIndex][field] = value;
    setSchedule(newSchedule);
  };

  const generateAvailabilityPayload = () => {
    return schedule.map(({ day, available, shifts }) => {
      const payload = {
        isAvailable: available,
        weekday: day.toUpperCase(),
        isRecurring: true,
        recurrenceRules: {},
      };

      const isValidTime = (time) => /^\d{2}:\d{2}$/.test(time);

      if (available) {
        if (isValidTime(shifts[0].start))
          payload.slotOneStart = shifts[0].start;
        if (isValidTime(shifts[0].end)) payload.slotOneEnd = shifts[0].end;
        if (isValidTime(shifts[1].start))
          payload.slotTwoStart = shifts[1].start;
        if (isValidTime(shifts[1].end)) payload.slotTwoEnd = shifts[1].end;
      }

      return payload;
    });
  };

  const handleSubmit = async () => {
    setErrorMessage("");

    if (!userId) {
      setErrorMessage("Please complete the  above fields first.");
      return;
    }
    if (!workSchedule) {
      setErrorMessage(
        "Please select your work schedule Part Time or Full Time."
      );
      return;
    }
    const payload = {
      userId,
      educationQualifications: [qualification],
      specializations: [specialization],
      workSchedule,
      isRegisteredNurse,
      availabilities: generateAvailabilityPayload(),
    };

    try {
      setLoading(true);
      const result = await submitNursePageThree(payload);
      console.log("Success:", result);
      setErrorMessage("");
      window.location.reload();
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6">
      <h1 className="text-[16px] font-semibold text-black pb-[18px]">
        Qualification & Work Schedule
      </h1>

      <div className="flex flex-col gap-5 mb-6">
        <select
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-[14px] text-black  outline-none placeholder:text-black"
        >
          <option disabled value="">
            Qualification
          </option>
          <option value="MSc Nursing">MSc Nursing</option>
          <option value="BSc Nursing">BSc Nursing</option>
          <option value="BSc Nursing Pursuing">GNM</option>
          <option value="Post BSc Nursing">Post BSc Nursing</option>
          <option value="GNM">GNM</option>
          <option value="GNM Pursuing">GNM Pursuing</option>
          <option value="ANM">ANM</option>
          <option value="GDA (General Duty Assistant)">
            GDA (General Duty Assistant)
          </option>
          <option value="PCA (Personal Care Assistant)">
            PCA (Personal Care Assistant)
          </option>
          <option value="DHA (Diploma in Health Assistant)">
            DHA (Diploma in Health Assistant)
          </option>
        </select>
        <div className="flex items-center gap-2 ps-2">
          <input
            type="checkbox"
            className="size-4"
            checked={isRegisteredNurse}
            onChange={(e) => setIsRegisteredNurse(e.target.checked)}
          />
          I have a valid Council Registration
        </div>
        <select
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-[14px] text-black  outline-none placeholder:text-black"
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

        <select
          value={workSchedule}
          onChange={(e) => setWorkSchedule(e.target.value)}
          className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-[14px] text-black  outline-none placeholder:text-black"
        >
          <option value="" selected disabled>
            Full Time / Part Time
          </option>
          <option value="FULL_TIME">Full Time</option>
          <option value="PART_TIME">Part Time</option>
        </select>
      </div>

      <h1 className="text-[16px] font-semibold text-black py-[18px]">
        Weekly Availability
      </h1>

      <div className="flex gap-8 text-[14px] text-black font-light">
        {/* Days and toggle */}
        <div className="flex flex-col gap-[18px]">
          {schedule.map(({ day, available }, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="w-[80px]">{day}</span>
              <span
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => toggleAvailability(index)}
              >
                <img
                  src={
                    available ? "/available-btn.svg" : "/not-available-btn.svg"
                  }
                  alt="toggle"
                  className="w-6 h-6"
                />
                <span
                  className={available ? "text-[#09B438]" : "text-[#FE1940]"}
                >
                  {available ? "Available" : "NA"}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* Shift inputs */}
        {[0, 1].map((shiftIndex) => (
          <React.Fragment key={shiftIndex}>
            <div className="flex flex-col gap-[18px] ps-8">
              {schedule.map(({ available, shifts }, dayIdx) => (
                <span key={dayIdx} className="min-h-[22px]">
                  {available && (
                    <input
                      type="time"
                      value={shifts[shiftIndex].start}
                      onChange={(e) =>
                        handleTimeChange(
                          dayIdx,
                          shiftIndex,
                          "start",
                          e.target.value
                        )
                      }
                      className="border-b border-[#BBBBBB]"
                    />
                  )}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-[18px] ps-4">
              {schedule.map(({ available, shifts }, dayIdx) => (
                <span key={dayIdx} className="min-h-[22px]">
                  {available && (
                    <input
                      type="time"
                      value={shifts[shiftIndex].end}
                      onChange={(e) =>
                        handleTimeChange(
                          dayIdx,
                          shiftIndex,
                          "end",
                          e.target.value
                        )
                      }
                      className="border-b border-[#BBBBBB]"
                    />
                  )}
                </span>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>

      <button
        disabled={loading}
        onClick={handleSubmit}
        className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center my-6 cursor-pointer"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {errorMessage && (
        <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
      )}
    </div>
  );
}
