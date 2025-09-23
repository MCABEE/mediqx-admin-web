"use client";
import React, { useState, useMemo } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Format "08:15" as "8:15 AM"
const formatTime12Hour = (time) => {
  if (!time) return "";
  const [hour, minute] = time.split(":");
  const h = +hour % 12 || 12;
  const ampm = +hour >= 12 ? "PM" : "AM";
  return `${h}:${minute} ${ampm}`;
};

// Format date to YYYY-MM-DD (local, no UTC shift)
const formatDate = (date) => {
  if (!(date instanceof Date)) date = new Date(date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Group availabilities by local year-month key (yyyy-mm)
const groupAvailabilitiesByMonth = (availabilities) => {
  const map = {};
  availabilities.forEach((avail) => {
    const dateObj = avail.dateObj || new Date(avail.date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const yearMonthKey = `${year}-${String(month).padStart(2, "0")}`;
    if (!map[yearMonthKey]) map[yearMonthKey] = [];
    map[yearMonthKey].push({ ...avail, dateObj });
  });
  Object.values(map).forEach((arr) =>
    arr.sort((a, b) => a.dateObj - b.dateObj)
  );
  return Object.entries(map);
};

const AvailabilitySchedule = ({ availabilities }) => {
  const groupedByMonth = useMemo(
    () => groupAvailabilitiesByMonth(availabilities),
    [availabilities]
  );
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  const formatMonthYear = (key) => {
    const [year, month] = key.split("-");
    const d = new Date(Number(year), Number(month) - 1);
    return d.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const calendarGridForMonth = (year, month, monthAvailabilities) => {
    // month: 1-based month number (local)
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    const grid = [];

    // Filter availabilities strictly for this month (local)
    const filteredAvail = monthAvailabilities.filter((avail) => {
      const d = avail.dateObj || new Date(avail.date);
      return d.getFullYear() === year && d.getMonth() + 1 === month;
    });

    // Map date string to availability for quick lookup
    const availMap = {};
    filteredAvail.forEach((a) => {
      availMap[formatDate(a.dateObj || new Date(a.date))] = a;
    });

    // Leading empty slots for weekdays before first day
    for (let i = 0; i < startDay; i++) grid.push(null);

    // Fill days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      // if (availMap[dateStr]) {
      //   grid.push({ ...availMap[dateStr], isAvailable: true, dateStr });
      // } else {
      //   grid.push({ dateStr, isAvailable: false });
      // }
      if (availMap[dateStr]) {
  grid.push({ ...availMap[dateStr], dateStr }); // keep original isAvailable
} else {
  grid.push({ dateStr, isAvailable: false });
}

    }

    // Trailing empty slots to complete the last week
    while (grid.length % 7 !== 0) grid.push(null);

    return grid;
  };

  if (!groupedByMonth.length) {
    return (
      <div className="py-6 text-center text-gray-600">
        No availability data to display.
      </div>
    );
  }

  const [monthKey, monthAvailabilities] = groupedByMonth[currentMonthIndex];
  const [year, month] = monthKey.split("-").map(Number);
  const grid = calendarGridForMonth(year, month, monthAvailabilities);

  return (
    <div className="py-6 px-4 w-full rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {formatMonthYear(monthKey)}
      </h2>

      <div className="grid grid-cols-7 text-center font-medium text-gray-700 mb-2">
        {daysOfWeek.map((d) => (
          <div key={d} className="border-b border-gray-300 py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {grid.map((item, idx) =>
      
          item === null ? (
            <div key={idx} className="p-2"></div>
          ) : (
            <div
              key={item.dateStr + "-" + idx}
              className={`p-2 rounded cursor-default min-h-20 ${
                item.isAvailable === true
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              
              <div className="font-semibold">
                {item.dateObj
                  ? item.dateObj.getDate()
                  : item.dateStr.split("-")[2]}
              </div>
              {item.isAvailable && (
                <div className="text-xs mt-1 space-y-1">
                  {item.fixedSlots ? (
                    <span className="block">
                      {item.fixedSlots === "SHIFT_24_HOURS"
                        ? "24 Hours"
                        : item.fixedSlots === "DAY_SHIFT_12_HOURS"
                        ? "12 Hrs Day"
                        : item.fixedSlots === "NIGHT_SHIFT_12_HOURS"
                        ? "12 Hrs Night"
                        : item.fixedSlots === "SHIFT_FLEXIBLE_HOURS"
                        ? "Flexible Hours"
                        : item.fixedSlots}
                    </span>
                  ) : (
                    <>
                      {item.slotOneStart && item.slotOneEnd && (
                        <span className="block">
                          {formatTime12Hour(item.slotOneStart)} -{" "}
                          {formatTime12Hour(item.slotOneEnd)}
                        </span>
                      )}
                      {item.slotTwoStart && item.slotTwoEnd && (
                        <span className="block">
                          {formatTime12Hour(item.slotTwoStart)} -{" "}
                          {formatTime12Hour(item.slotTwoEnd)}
                        </span>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          )
        )}
      </div>

      {groupedByMonth.length > 1 && (
        <div className="flex justify-between mt-4">
          <button
            onClick={() =>
              setCurrentMonthIndex((prev) => Math.max(prev - 1, 0))
            }
            disabled={currentMonthIndex === 0}
            className="px-3 py-1 border border-gray-400 rounded disabled:opacity-50 cursor-pointer"
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
            className="px-3 py-1 border border-gray-400 rounded disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AvailabilitySchedule;
