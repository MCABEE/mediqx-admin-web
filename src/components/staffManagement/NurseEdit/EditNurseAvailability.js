"use client";
import useNurseStore from "@/app/lib/store/nurseStore";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const defaultSchedule = [
  {
    day: "Sunday",
    available: false,
    id: "",
    shifts: [
      { start: "", end: "" },
      { start: "", end: "" },
    ],
  },
  {
    day: "Monday",
    available: false,
    id: "",
    shifts: [
      { start: "", end: "" },
      { start: "", end: "" },
    ],
  },
  {
    day: "Tuesday",
    available: false,
    id: "",
    shifts: [
      { start: "", end: "" },
      { start: "", end: "" },
    ],
  },
  {
    day: "Wednesday",
    available: false,
    id: "",
    shifts: [
      { start: "", end: "" },
      { start: "", end: "" },
    ],
  },
  {
    day: "Thursday",
    available: false,
    id: "",
    shifts: [
      { start: "", end: "" },
      { start: "", end: "" },
    ],
  },
  {
    day: "Friday",
    available: false,
    id: "",
    shifts: [
      { start: "", end: "" },
      { start: "", end: "" },
    ],
  },
  {
    day: "Saturday",
    available: false,
    id: "",
    shifts: [
      { start: "", end: "" },
      { start: "", end: "" },
    ],
  },
];

const EditNurseAvailability = ({ availabilities = [], userId, onClose }) => {
  const [schedule, setSchedule] = useState(defaultSchedule);
  const [error, setError] = useState("");
  const { updateAvailability, isLoading } = useNurseStore();

  useEffect(() => {
    if (availabilities.length > 0) {
      const mapped = defaultSchedule.map((item) => {
        const existing = availabilities.find(
          (a) => a.weekday === item.day.toUpperCase()
        );
        return {
          ...item,
          id: existing?.id || "",
          available: existing?.isAvailable || false,
          shifts: [
            {
              start: existing?.slotOneStart || "",
              end: existing?.slotOneEnd || "",
            },
            {
              start: existing?.slotTwoStart || "",
              end: existing?.slotTwoEnd || "",
            },
          ],
        };
      });
      setSchedule(mapped);
    }
  }, [availabilities]);

  const toggleAvailability = (index) => {
    setSchedule((prev) =>
      prev.map((day, i) =>
        i === index ? { ...day, available: !day.available } : day
      )
    );
    setError(""); // Clear error on change
  };

  const handleTimeChange = (dayIdx, shiftIdx, key, value) => {
    setSchedule((prev) => {
      const updated = [...prev];
      updated[dayIdx].shifts[shiftIdx][key] = value;
      return updated;
    });
    setError(""); // Clear error on change
  };

  const formatToHHmm = (time) => {
    if (!time || typeof time !== "string") return null;
    const [hour, minute] = time.split(":");
    if (!hour || !minute) return null;
    return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
  };

  const handleSubmit = async () => {
    setError("");
    const formatted = [];

    for (const item of schedule) {
      const base = {
        id: item.id,
        weekday: item.day.toUpperCase(),
        isAvailable: item.available,
        isRecurring: true,
        recurrenceRules: {},
      };

      if (item.available) {
        const slotOneStart = formatToHHmm(item.shifts[0].start);
        const slotOneEnd = formatToHHmm(item.shifts[0].end);

        if (!slotOneStart || !slotOneEnd) {
          setError(`Slot One start and end times are required for ${item.day}`);
          return;
        }

        base.slotOneStart = slotOneStart;
        base.slotOneEnd = slotOneEnd;

        const slotTwoStart = formatToHHmm(item.shifts[1].start);
        const slotTwoEnd = formatToHHmm(item.shifts[1].end);

        if ((slotTwoStart && !slotTwoEnd) || (!slotTwoStart && slotTwoEnd)) {
          setError(
            `Both Slot Two start and end times must be provided for ${item.day}`
          );
          return;
        }

        if (slotTwoStart && slotTwoEnd) {
          base.slotTwoStart = slotTwoStart;
          base.slotTwoEnd = slotTwoEnd;
        }
      }

      formatted.push(base);
    }

    const payload = { availabilities: formatted };

    try {
      await updateAvailability(userId, payload);
      onClose();
    } catch (err) {
      console.error(" Failed to update nurse availability:", err);
      setError("Failed to update availability. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-xl border border-gray-200">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black cursor-pointer"
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>

        <h2 className="text-lg font-semibold mb-6 text-center text-black">
          Edit Availability
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4 text-sm font-medium">
            {error}
          </div>
        )}

        <div className="flex gap-8 text-[14px] text-black font-light overflow-x-auto">
          {/* Day toggle */}
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
                      available
                        ? "/available-btn.svg"
                        : "/not-available-btn.svg"
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

        <div className="flex justify-end mt-8 gap-4">
          <button
            className="px-5 py-2 rounded-[10px] border border-[#999] text-[#333] cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 rounded-[10px] bg-[#3674B5] text-white font-medium cursor-pointer"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNurseAvailability;
