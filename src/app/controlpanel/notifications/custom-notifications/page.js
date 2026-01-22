"use client";

import React, { useState } from "react";
import useNotificationStore from "@/app/lib/store/useNotificationStore";
import Navlink from "@/components/notifications/Navlink";

export default function Page() {
  const {
    staffRoles,
    patientStatus,
    supervisorStatus,
    allStaff,
    allPatients,
    allSupervisors,
    headline,
    message,
    count,
    loading,
    sending,
    success,

    toggleAllStaff,
    toggleStaffRole,
    toggleAllPatients,
    togglePatientStatus,
    toggleAllSupervisors,
    toggleSupervisorStatus,
    setHeadline,
    setMessage,
    sendNotification,
  } = useNotificationStore();

  const [error, setError] = useState("");

  // ✅ New handler with validation
  const handleSend = async () => {
    // Validate checkboxes
    if (
      staffRoles.length === 0 &&
      patientStatus.length === 0 &&
      supervisorStatus.length === 0
    ) {
      setError("Please select at least one target audience");
      setTimeout(() => setError(""), 2000);
      return;
    }

    // Validate headline/message
    if (!headline.trim() || !message.trim()) {
      setError("Please enter headline and message");
      setTimeout(() => setError(""), 2000);
      return;
    }

    // Call the store sendNotification
    await sendNotification();
  };

  return (
    <>
      <Navlink />
      <div className="">
        {/* ===== TARGET AUDIENCE ===== */}
        <div className="w-full border border-[#cbc7c7] rounded-[15px] p-[22px] text-black mt-2 bg-white">
          <p className="font-semibold mb-4">Select Target Audience</p>

          <label>
            <input
              type="checkbox"
              className="size-4"
              checked={allStaff}
              onChange={toggleAllStaff}
            />
            <span className="ml-2 font-semibold">All Staff</span>
          </label>

          <div className="grid grid-cols-2 text-[14px] gap-2 ml-2 mt-2">
            {[
              "REGISTERED_NURSE",
              "NURSING_ASSISTANTS",
              "TECHNICIANS",
              "THERAPY",
              "ANCILLARY_PERSONAL",
            ].map((role) => (
              <label key={role}>
                <input
                  type="checkbox"
                  className="size-3.5"
                  checked={staffRoles.includes(role)}
                  onChange={() => toggleStaffRole(role)}
                />
                <span className="ml-2">{role}</span>
              </label>
            ))}
          </div>

          <div className="grid grid-cols-2">
            <div>
              <label className="block mt-6">
                <input
                  type="checkbox"
                  className="size-4"
                  checked={allPatients}
                  onChange={toggleAllPatients}
                />
                <span className="ml-2 font-semibold">All Patients</span>
              </label>

              {["ONGOING", "COMPLETED"].map((s) => (
                <label key={s} className="block ml-4 mt-2">
                  <input
                    type="checkbox"
                    className="size-3,5"
                    checked={patientStatus.includes(s)}
                    onChange={() => togglePatientStatus(s)}
                  />
                  <span className="ml-2 text-[14px]">{s}</span>
                </label>
              ))}
            </div>

            <div>
              <label className="block mt-6">
                <input
                  type="checkbox"
                  className="size-4"
                  checked={allSupervisors}
                  onChange={toggleAllSupervisors}
                />
                <span className="ml-2 font-semibold">All Supervisors</span>
              </label>

              {["ACTIVE", "RESIGNED"].map((s) => (
                <label key={s} className="block ml-4 mt-2">
                  <input
                    type="checkbox"
                    className="size-3.5"
                    checked={supervisorStatus.includes(s)}
                    onChange={() => toggleSupervisorStatus(s)}
                  />
                  <span className="ml-2 text-[14px]">{s}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded-2xl  mt-2 border border-[#cbc7c7]">
          <p className="text-[16px] font-semibold px-[36px] py-[29px] ">
            {loading ? "Loading..." : `${count} Matches found`}
          </p>
        </div>

        {/* ===== MESSAGE ===== */}
        <div className="w-full border border-[#d3cdcd] bg-white mt-2 rounded-2xl pb-10 mb-2">
          <p className="text-[16px] text-black font-semibold border-b border-[#c5c1c1] px-8 py-[22px] mb-4">
            Compose Notification Message
          </p>
          <div className="px-5 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full h-[40px]  text-[15px] border border-[#BBBBBB] px-8 py-2 rounded-[15px] outline-none"
            />

            <textarea
              placeholder="Write here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-[144px]  text-[15px] border border-[#BBBBBB] px-8 py-4 rounded-[15px] outline-none"
            />
          </div>
          <div className="flex flex-col items-end  px-4 ">
            <button
              onClick={handleSend}
              disabled={sending}
              className="w-[328px] h-[40px] bg-[#3674B5] rounded-[15px] text-white text-[14px] font-semibold mt-[43px] flex justify-center items-center "
            >
              {sending ? "Sending..." : "Send"}
            </button>

            {/* ===== SUCCESS MESSAGE ===== */}
            {success && (
              <span className="text-blue-600 pe-28 pt-2 ">
                Notification sent successfully
              </span>
            )}

            {/* ===== ERROR MESSAGE ===== */}
            {error && <span className="text-red-600 pe-28 pt-2">{error}</span>}
          </div>
        </div>
      </div>
    </>
  );
}
