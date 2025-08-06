"use client";
import React, { useState, useMemo } from "react";

function AddNurseAvailability() {
  const today = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [mode, setMode] = useState("");
  const [selectedDates, setSelectedDates] = useState({});
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [popupDate, setPopupDate] = useState(null);
  const [slot, setSlot] = useState({ from: "", to: "" });
  const [fullTimeSlots, setFullTimeSlots] = useState(new Set());

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
      setSelectedDates((prev) => {
        const updated = { ...prev };
        if (updated[key]) delete updated[key];
        else
          updated[key] = { fulltime: true, slots: Array.from(fullTimeSlots) };
        return updated;
      });
    } else if (mode === "parttime") {
      if (selectedDates[key] && !selectedDates[key].fulltime) {
        setSelectedDates((prev) => {
          const updated = { ...prev };
          delete updated[key];
          return updated;
        });
      } else {
        setPopupDate(date);
        setSlot({ from: "", to: "" });
      }
    }
  };

  const handleSaveSlot = () => {
    const key = formatDate(popupDate);
    if (slot.from && slot.to) {
      setSelectedDates((prev) => ({
        ...prev,
        [key]: {
          fulltime: false,
          from: slot.from,
          to: slot.to,
        },
      }));
    }
    setPopupDate(null);
  };

  const handleRemoveDate = (key) => {
    setSelectedDates((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const selectedDateList = Object.keys(selectedDates).sort();
  const leaveDates = allDates
    .map(formatDate)
    .filter((d) => !selectedDates[d])
    .sort();

  const toggleFullTimeSlot = (label) => {
    // Only allow one checkbox at a time
    const updated = new Set();
    updated.add(label);
    setFullTimeSlots(updated);
  };

  const handleSaveAvailability = () => {
    const availableDays = Object.entries(selectedDates).map(([date, info]) => ({
      date,
      type: info.fulltime ? "Fulltime" : "Parttime",
      slots: info.fulltime
        ? info.slots || []
        : [formatTime12Hour(info.from), formatTime12Hour(info.to)],
    }));

    console.log("Available Days:", availableDays);
    console.log("Leave Days:", leaveDates);
  };

  const resetAll = () => {
    setFromDate("");
    setToDate("");
    setSelectedDates({});
    setCurrentMonthIndex(0);
    setPopupDate(null);
    setSlot({ from: "", to: "" });
    setFullTimeSlots(new Set());
  };

  return (
    <div className="py-10 px-4">
      <h1 className="font-semibold text-[16px]">Manage your Work schedule</h1>

      <div className="mt-6">
        <p className="mt-6 text-[14px] text-black ">
          Choose Full time / Part time
        </p>
        <select
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
            resetAll(); // 🔄 Reset on mode change
            setMode(e.target.value);
          }}
          className="w-[240px] h-[40px] px-2 mt-2 border-1 rounded-[15px] border-[#bbbbbb] outline-none"
        >
          <option value="">Select</option>
          <option value="fulltime">Full time</option>
          <option value="parttime">Part time</option>
        </select>
      </div>

      {mode === "fulltime" && (
        <>
          <p className="mt-6 text-[14px] text-black ">
            If you are ready to work fulltime, Choose your convenient time slots
            for a period{" "}
          </p>
          <div className="mt-4 flex gap-8 flex-wrap text-[16px] text-black ">
            {[
              "24 Hrs",
              "12 Hrs Day only",
              "12 Hrs Night only",
              "12 Hrs flexible",
            ].map((label) => (
              <label key={label} className="flex  items-center">
                <input
                  type="checkbox"
                  className="mr-2 size-5"
                  checked={fullTimeSlots.has(label)}
                  onChange={() => toggleFullTimeSlot(label)}
                />
                {label}
              </label>
            ))}
          </div>
        </>
      )}

      <div className="mt-6">
        <p className="mt-6 text-[14px] text-black ">Set your available days</p>
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
              disabled={!fromDate}
            />
          </div>
        </div>
      </div>

      {selectedDateList.length > 0 && (
        <div className="mt-6">
          <p className="font-semibold text-green-700">Selected Dates:</p>
          <div className="flex flex-wrap gap-2 mt-2 text-sm">
            {selectedDateList.map((key) => {
              const val = selectedDates[key];
              return (
                <span
                  key={key}
                  className="px-2 py-1 bg-green-100 rounded flex items-center gap-1"
                >
                  {key}
                  {!val.fulltime && (
                    <span className="text-xs">
                      ({formatTime12Hour(val.from)} - {formatTime12Hour(val.to)}
                      )
                    </span>
                  )}
                  <button
                    onClick={() => handleRemoveDate(key)}
                    className="text-red-500 cursor-pointer hover:scale-125"
                  >
                    ✕
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}

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
          {/* <p className='text-[14px] mt-2'>
            Please select the availability dates on calender
          </p> */}

          {groupedByMonth.length > 1 && (
            <div className="flex justify-between mt-4">
              <button
                onClick={() =>
                  setCurrentMonthIndex((prev) => Math.max(prev - 1, 0))
                }
                disabled={currentMonthIndex === 0}
                className="px-4 py-1 border border-[#bbbbbb] rounded-[15px] disabled:opacity-50 cursor-pointer"
              >
                Previous
              </button>
              <button
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

      {popupDate && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[360px]">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Set Time Slot for{" "}
              <span className="text-blue-600">{formatDate(popupDate)}</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  From
                </label>
                <input
                  type="time"
                  value={slot.from}
                  onChange={(e) => setSlot({ ...slot, from: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  To
                </label>
                <input
                  type="time"
                  value={slot.to}
                  onChange={(e) => setSlot({ ...slot, to: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setPopupDate(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
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
          onClick={handleSaveAvailability}
          className="w-[280px] px-6  py-2 bg-[#3674B5] text-white font-semibold rounded-[15px]"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default AddNurseAvailability;
