"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import useNurseAvailabilityStore from "@/app/lib/store/useNurseAvailabilityStore";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* ---------- Helpers ---------- */

const formatTime12Hour = (time) => {
  if (!time) return "";
  const [hour, minute] = time.split(":");
  const h = +hour % 12 || 12;
  const ampm = +hour >= 12 ? "PM" : "AM";
  return `${h}:${minute} ${ampm}`;
};

/* ---------- Component ---------- */

export default function AvailabilitySchedule() {
  const { id: nurseId } = useParams();

  const {
    availabilities,
    fetchAvailability,
    loading,
    year,
    month,
    nextMonth,
    prevMonth,
  } = useNurseAvailabilityStore();

  /* 🔁 Fetch on month/year change */
  useEffect(() => {
    if (nurseId) {
      fetchAvailability(nurseId);
    }
  }, [nurseId, year, month]);

  /* ---------- Month Header ---------- */
  const formatMonthYear = () => {
    const d = new Date(year, month - 1);
    return d.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };

  /* ---------- Calendar Grid ---------- */
  const calendarGrid = () => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);

    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const grid = [];

    // Map API data by day number
    const availabilityMap = {};
    availabilities.forEach((item) => {
      const d = new Date(item.date);
      availabilityMap[d.getDate()] = item;
    });

    // Leading empty cells
    for (let i = 0; i < startDay; i++) {
      grid.push(null);
    }

    // Month days
    for (let day = 1; day <= daysInMonth; day++) {
      const record = availabilityMap[day];

      grid.push({
        day,
        ...(record || {}),
        isAvailable: record?.isAvailable === true, // ✅ STRICT TRUE ONLY
      });
    }

    // Trailing empty cells
    while (grid.length % 7 !== 0) {
      grid.push(null);
    }

    return grid;
  };

  if (loading) {
    return (
      <div className="py-6 text-center min-h-40 text-gray-600">
        Loading availability...
      </div>
    );
  }

  /* ---------- Render ---------- */
  return (
    <div className="py-6 px-4 w-full rounded shadow ">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {formatMonthYear()}
      </h2>

      {/* Week Days */}
      <div className="grid grid-cols-7 text-center font-medium text-gray-700 mb-2">
        {daysOfWeek.map((d) => (
          <div key={d} className="border-b border-gray-400 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {calendarGrid().map((item, idx) =>
          item === null ? (
            <div key={idx} />
          ) : (
            <div
              key={idx}
              className={`p-2 rounded min-h-20 ${
                item.isAvailable
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <div className="font-semibold">{item.day}</div>

              {/* Slots only for TRUE */}
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
                            : "Flexible"}
                    </span>
                  ) : (
                    <>
                      {item.slotOneStart && item.slotOneEnd && (
                        <span className="block">
                          {formatTime12Hour(item.slotOneStart)} –{" "}
                          {formatTime12Hour(item.slotOneEnd)}
                        </span>
                      )}
                      {item.slotTwoStart && item.slotTwoEnd && (
                        <span className="block">
                          {formatTime12Hour(item.slotTwoStart)} –{" "}
                          {formatTime12Hour(item.slotTwoEnd)}
                        </span>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          ),
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        <button
          onClick={prevMonth}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          Previous
        </button>

        <button
          onClick={nextMonth}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
}
