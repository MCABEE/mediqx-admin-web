"use client";
import React, { useState } from "react";
import useBookingStore from "@/app/lib/store/bookingStore";

const ConfirmPopup = ({
  bookingId,
  onClose,
  onConfirm,
  scheduleType,
  fullName,
}) => {
  const [assignedDuty, setAssignedDuty] = useState("");
  const [assignedMaterials, setAssignedMaterials] = useState("");
  const [assignedRemarks, setAssignedRemarks] = useState("");
  const [assignedLocation, setAssignedLocation] = useState("");

  const [assignedDurationHours, setAssignedDurationHours] = useState("");
  const [assignedDurationMinutes, setAssignedDurationMinutes] = useState("");
  const [errors, setErrors] = useState({});

  const confirmBooking = useBookingStore((state) => state.confirmBooking);

  const validate = () => {
    const newErrors = {};
    if (!assignedDuty.trim())
      newErrors.assignedDuty = "Assigned duty is required.";
    if (!assignedMaterials.trim())
      newErrors.assignedMaterials = "Materials required.";
    if (!assignedRemarks.trim())
      newErrors.assignedRemarks = "Remarks are required.";
    if (!assignedLocation.trim())
      newErrors.assignedLocation = "Location is required.";

    if (scheduleType === "CUSTOM_HOURS") {
      if (!assignedDurationHours && !assignedDurationMinutes) {
        newErrors.duration = "Duration (hours or minutes) is required.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      assignedDuty,
      assignedMaterials: assignedMaterials
        .split(",")
        .map((m) => m.trim())
        .filter((m) => m),
      assignedRemarks,
      assignedLocation,
      ...(scheduleType === "CUSTOM_HOURS" && {
        assignedDurationHours: parseInt(assignedDurationHours || "0"),
        assignedDurationMinutes: parseInt(assignedDurationMinutes || "0"),
      }),
    };

    try {
      await confirmBooking(bookingId, payload);
      onConfirm(bookingId);
    } catch (error) {
      alert("Failed to confirm booking. Please try again.");
    }
  };

  const hourOptions = Array.from({ length: 25 }, (_, i) => i);
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className="fixed inset-0 bg-[#c1bfbfa9] backdrop-blur-xs z-50 flex justify-center items-center">
      <div className="bg-white rounded-[15px] w-[800px]">
        <div className="bg-[#3674B5] p-[26px] rounded-t-[15px]">
          <div className="flex justify-end">
            <div
              onClick={onClose}
              className="size-6 bg-white flex justify-center items-center hover:bg-[#ff7b7be4] cursor-pointer"
            >
              <p className="rotate-45 text-2xl text-[#3674B5]">+</p>
            </div>
          </div>
          <h1 className="text-center text-white text-[20px] font-semibold">
            Add Duty Details
          </h1>
        </div>

        <h2 className="text-xl text-center font-semibold text-[#333333] py-6 border-b-[1px] border-b-[#BBBBBB]">
          {fullName}
        </h2>

        <div className="px-[140px] h-[450px] overflow-y-scroll mb-4">
          {/* Assigned Duty */}
          <div>
            <h3 className="text-xl font-semibold text-[#333333] mt-4 mb-2">
              Assigned Duty
            </h3>
            <textarea
              value={assignedDuty}
              onChange={(e) => setAssignedDuty(e.target.value)}
              className="border-[1px] border-[#BBBBBB] text-black w-full h-[140px] rounded-[10px] p-3 outline-none"
            />
            {errors.assignedDuty && (
              <p className="text-red-500 text-sm mt-1">{errors.assignedDuty}</p>
            )}
          </div>

          {/* Materials */}
          <div>
            <h3 className="text-xl font-semibold text-[#333333] mt-4 mb-2">
              Equipment's / Materials Required
            </h3>
            <textarea
              value={assignedMaterials}
              onChange={(e) => setAssignedMaterials(e.target.value)}
              className="border-[1px] border-[#BBBBBB] text-black w-full h-[140px] rounded-[10px] p-3 outline-none"
              placeholder="Comma separated list"
            />
            {errors.assignedMaterials && (
              <p className="text-red-500 text-sm mt-1">
                {errors.assignedMaterials}
              </p>
            )}
          </div>

          {/* Remarks */}
          <div>
            <h3 className="text-xl font-semibold text-[#333333] mt-4 mb-2">
              Remarks
            </h3>
            <textarea
              value={assignedRemarks}
              onChange={(e) => setAssignedRemarks(e.target.value)}
              className="border-[1px] border-[#BBBBBB] text-black w-full h-[140px] rounded-[10px] p-3 outline-none"
            />
            {errors.assignedRemarks && (
              <p className="text-red-500 text-sm mt-1">
                {errors.assignedRemarks}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <h3 className="text-xl font-semibold text-[#333333] mt-4 mb-2">
              Location
            </h3>
            <textarea
              value={assignedLocation}
              onChange={(e) => setAssignedLocation(e.target.value)}
              className="border-[1px] border-[#BBBBBB] text-black w-full h-[140px] rounded-[10px] p-3 outline-none"
              placeholder="Type or paste address here"
            />
            {errors.assignedLocation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.assignedLocation}
              </p>
            )}
          </div>

          {/* Duration */}
          {scheduleType === "CUSTOM_HOURS" && (
            <div className="mt-4">
              <div className="flex items-center gap-8">
                <h3 className="text-xl font-semibold text-[#333333] mb-2">
                  Duration
                </h3>
                <div className="space-x-2">
                  <select
                    value={assignedDurationHours}
                    onChange={(e) => setAssignedDurationHours(e.target.value)}
                    className="border-[1px] border-[#BBBBBB] text-black rounded-[10px] p-3 outline-none"
                  >
                    <option value="">00</option>
                    {hourOptions.map((h) => (
                      <option key={h} value={h}>
                        {String(h).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <span>Hrs</span>
                </div>
                <div className="space-x-2">
                  <select
                    value={assignedDurationMinutes}
                    onChange={(e) => setAssignedDurationMinutes(e.target.value)}
                    className="border-[1px] border-[#BBBBBB] text-black rounded-[10px] p-3 outline-none"
                  >
                    <option value="">00</option>
                    {minuteOptions.map((m) => (
                      <option key={m} value={m}>
                        {String(m).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <span>Min</span>
                </div>
              </div>
              {errors.duration && (
                <p className="text-red-500 text-sm mt-2">{errors.duration}</p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center items-center mt-8 mb-10">
            <button
              onClick={handleSubmit}
              className="w-[192px] h-[40px] bg-[#3674B5] text-white rounded-[15px] cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
