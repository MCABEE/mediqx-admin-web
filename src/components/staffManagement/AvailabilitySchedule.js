"use client";
import React, { useState, useMemo } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Utility to format format time strings like "08:15" to "8:15 AM"
const formatTime12Hour = (time) => {
  if (!time) return "";
  const [hour, minute] = time.split(":");
  const h = +hour % 12 || 12;
  const ampm = +hour >= 12 ? "PM" : "AM";
  return `${h}:${minute} ${ampm}`;
};

// Utility to get ISO date string from Date object
const formatDate = (date) => date.toISOString().split("T")[0];

// Group availabilities by month for calendar view
const groupAvailabilitiesByMonth = (availabilities) => {
  const map = {};
  availabilities.forEach((avail) => {
    // avail.date expected as ISO string "YYYY-MM-DDT00:00:00"
    const dateObj = new Date(avail.date);
    const yearMonthKey = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}`;
    if (!map[yearMonthKey]) map[yearMonthKey] = [];
    map[yearMonthKey].push({ ...avail, dateObj });
  });
  // Sort each month's availabilities by day number
  Object.values(map).forEach((arr) =>
    arr.sort((a, b) => a.dateObj - b.dateObj)
  );
  return Object.entries(map);
};

const AvailabilitySchedule = ({ availabilities }) => {
  // Group availabilities by month
  const groupedByMonth = useMemo(
    () => groupAvailabilitiesByMonth(availabilities),
    [availabilities]
  );
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  // Helper to display month-year header
  const formatMonthYear = (key) => {
    const [year, month] = key.split("-");
    const d = new Date(year, month - 1);
    return d.toLocaleString("default", { month: "long", year: "numeric" });
  };

  // Prepare a calendar grid for the month with day slots
  const calendarGridForMonth = (year, month, monthAvailabilities) => {
    // month: 1-based month number
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();

    // Start with day of week of first day (0=Sun,..6=Sat)
    const startDay = firstDay.getDay();

    const grid = [];

    // Fill blanks for days before first day
    for (let i = 0; i < startDay; i++) {
      grid.push(null);
    }

    // Fill days with availability info or null
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      const avail = monthAvailabilities.find(
        (a) => formatDate(a.dateObj) === dateStr
      );
      grid.push(avail || { dateStr, isAvailable: false });
    }

    // Optionally fill more nulls so total count is multiple of 7 (for full weeks)
    while (grid.length % 7 !== 0) {
      grid.push(null);
    }

    return grid;
  };

  if (groupedByMonth.length === 0) {
    return (
      <div className="py-6 text-center text-gray-600">
        No availability data to display.
      </div>
    );
  }

  const [monthKey, monthAvailabilities] = groupedByMonth[currentMonthIndex];
  const [year, month] = monthKey.split("-");
  const grid = calendarGridForMonth(
    Number(year),
    Number(month),
    monthAvailabilities
  );

  return (
    <div className="py-6 px-4 w-full  rounded shadow">
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
            <div key={idx} className="p-2"></div> // empty slot
          ) : (
            <div
              key={idx}
              className={`p-2 rounded cursor-default min-h-20 ${
                item.isAvailable
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
                      {/* Show full-time fixed slot label, e.g. SHIFT_24_HOURS → "24 Hours" */}
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

      {/* Pagination for months */}
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
