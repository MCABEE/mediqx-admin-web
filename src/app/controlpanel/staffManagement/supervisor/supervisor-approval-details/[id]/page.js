"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";

/* 🔹 ADDED (no existing code changed) */
import EditSupervisorBasicPopup from "@/components/supervisor/EditSupervisorBasicPopup";
import EditSupervisorExperiencePopup from "@/components/supervisor/EditSupervisorExperiencePopup";
import SupervisorFileSection from "@/components/supervisor/SupervisorFileSection";
/* 🔹 END ADD */

export default function SupervisorApprovalDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const { supervisor, isLoading, error, getSupervisorDetails } =
    useSupervisorRegistrationStore();

  /* 🔹 ADDED STATE */
  const [editBasic, setEditBasic] = useState(false);
  const [editExperience, setEditExperience] = useState(false);
  const [preview, setPreview] = useState({
    show: false,
    fileUrl: "",
    isImage: false,
  });

  const FILE_URL = "https://dev-nurse-docs.s3.ap-south-1.amazonaws.com/";
  /* 🔹 END ADD */

  useEffect(() => {
    if (id) getSupervisorDetails(id);
  }, [id]);

  if (isLoading)
    return <p className="text-center text-lg font-semibold">Loading...</p>;

  if (error)
    return (
      <p className="text-center text-red-500 text-lg font-semibold">{error}</p>
    );

  if (!supervisor)
    return <p className="text-center text-gray-600">No data found.</p>;

  return (
    <div className="px-[20px] py-[20px]">
      {/* Back Button */}
      <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex items-center">
        <h1
          onClick={() => router.back()}
          className="text-[16px] text-black px-[38px] font-semibold cursor-pointer"
        >
          Back
        </h1>
      </div>

      {/* Header Table */}
      <table className="w-full border-spacing-y-2 border-separate text-black mt-4">
        <tbody>
          <tr className="bg-white">
            <td className="p-2">1</td>
            <td className="border-l-4 border-[#C0D8F6] p-2 hover:underline">
              {supervisor.fullName}
            </td>
            <td className="border-l-4 border-[#C0D8F6] p-2">
              {supervisor.mapLocation || "N/A"}
            </td>
            <td className="border-l-4 border-[#C0D8F6] p-2">
              {supervisor.gender}
            </td>
            <td className="border-l-4 border-[#C0D8F6] p-2">
              {supervisor.categoryByProfession}
            </td>
          </tr>
        </tbody>
      </table>
 
      {/* Profile Details */}
      <div className="bg-white border border-[#BBBBBB] rounded-[15px] mt-4 mb-6 pb-4">
        {/* Name Header */}
        <div className="flex justify-between items-center px-[39px] py-[19px] border-b border-b-[#BBBBBB]">
          <span className="text-[20px] font-semibold text-[#333333]">
            {supervisor.fullName}
          </span>
        </div>

        {/* BASIC DETAILS */}
        <div className="flex justify-between px-[39px]">
          <h1 className="text-[16px] font-semibold text-black py-[18px]">
            Basics
          </h1>

          {/* 🔹 ONLY FUNCTIONALITY ADDED */}
          <button
            onClick={() => setEditBasic(true)}
            className="cursor-pointer hover:scale-110"
          >
            <img src="/edit-btn.svg" className="size-6" alt="edit" />
          </button>
        </div>

        <div className="flex flex-col text-black font-light gap-[18px] px-[39px] pb-[18px] border-b border-[#BBBBBB]">
          <div className="flex gap-[18px]">
            <span className="w-[280px]">Gender</span>
            <span>{supervisor.gender}</span>
          </div>
          <div className="flex gap-[18px]">
            <span className="w-[280px]">Category y Profession</span>
            <span>{supervisor.categoryByProfession}</span>
          </div>
          <div className="flex gap-[18px]">
            <span className="w-[280px]">Full Name</span>
            <span>{supervisor.fullName}</span>
          </div>
          <div className="flex gap-[18px]">
            <span className="w-[280px]">Email</span>
            <span>{supervisor.email}</span>
          </div>
          <div className="flex gap-[18px]">
            <span className="w-[280px]">Phone Number</span>
            <span>{supervisor.mobileNumber}</span>
          </div>
          <div className="flex gap-[18px]">
            <span className="w-[280px]">DOB</span>
            <span>{supervisor.dob}</span>
          </div>
          <div className="flex gap-[18px]">
            <span className="w-[280px]">Living Location</span>
            <span>{supervisor.mapLocation}</span>
          </div>
        </div>

        {/* EXPERIENCE DETAILS */}
        <div className="px-[39px] pt-[30px]">
          <div className="flex justify-between">
            <h1 className="text-[16px] font-semibold text-black py-[18px]">
              Experince Details
            </h1>

            {/* 🔹 ONLY FUNCTIONALITY ADDED */}
            <button
              onClick={() => setEditExperience(true)}
              className="cursor-pointer hover:scale-110"
            >
              <img src="/edit-btn.svg" className="size-6" alt="edit" />
            </button>
          </div>

          <div className="flex gap-[18px]">
            <span className="w-[280px]">Experienced</span>
            <span>{supervisor.isExperienced ? "Yes" : "Fresher"}</span>
          </div>

          {supervisor.isExperienced && (
            <>
              <div className="flex gap-[18px] mt-2">
                <span className="w-[280px]">Total Experienced</span>
                <span>
                  {supervisor.yearsOfExperience}Yr{" "}
                  {supervisor.monthsOfExperience}Mo
                </span>
              </div>
              <div className="flex gap-[18px] mt-2">
                <span className="w-[280px]">Last Working Organization</span>
                <span>{supervisor.providerName || "N/A"}</span>
              </div>
              <div className="flex gap-[18px] mt-2">
                <span className="w-[280px]">Department</span>
                <span>{supervisor.department || "N/A"}</span>
              </div>
              <div className="flex gap-[18px] mt-2">
                <span className="w-[280px]">Area</span>
                <span>{supervisor.providerAddress || "N/A"}</span>
              </div>
              <div className="flex gap-[18px] mt-2">
                <span className="w-[280px]">Working Duration</span>
                <span>
                  {supervisor.startDate} - {supervisor.endDate}
                </span>
              </div>
            </>
          )}
        </div>

        {/* SKILLS */}
        <div className="px-[39px] pt-[20px]">
          <h1 className="text-[16px] font-semibold text-black py-[10px]">
            Expertise / Skills
          </h1>

          <div className="flex flex-col gap-[10px]">
            {supervisor.skills?.length > 0
              ? supervisor.skills.map((s) => (
                  <span key={s.id}>{s.skill}</span>
                ))
              : "No skills"}
          </div>
        </div>

        {/* LANGUAGES */}
        <div className="px-[39px] my-4">
          <h1 className="text-[16px] font-semibold text-black py-[10px]">
            Languages
          </h1>

          <div className="flex gap-[18px]">
            <span className="w-[280px]">Languages</span>
            <span>
              {supervisor.languages?.map((l) => l.language).join(", ") || "None"}
            </span>
          </div>
        </div>

        {/* 🔹 FILE SECTION ADDED (NO UI CHANGE) */}
        <SupervisorFileSection
  files={supervisor.files}
  qualifications={supervisor.qualifications}
  url={"https://dev-nurse-docs.s3.ap-south-1.amazonaws.com/"}
  setPreview={setPreview}
/>

      </div>

      {/* 🔹 FILE PREVIEW MODAL */}
      {preview.show && (
        <div className="fixed inset-0 bg-[#8b898976] z-50 flex items-center justify-center backdrop-blur-xs">
          <div className="bg-white rounded-xl p-4 max-w-3xl w-full shadow-lg relative">
            <button
              onClick={() => setPreview({ show: false })}
              className="absolute top-0 -right-8 bg-white rounded-full w-7 h-7"
            >
              ✕
            </button>

            {preview.isImage ? (
              <img
                src={preview.fileUrl}
                className="max-w-full max-h-[80vh] mx-auto"
              />
            ) : (
              <embed
                src={preview.fileUrl}
                className="w-full h-[80vh]"
                type="application/pdf"
              />
            )}
          </div>
        </div>
      )}

      {/* 🔹 EDIT POPUPS */}
      <EditSupervisorBasicPopup
        show={editBasic}
        onClose={() => setEditBasic(false)}
        supervisor={supervisor}
      />

      <EditSupervisorExperiencePopup
        show={editExperience}
        onClose={() => setEditExperience(false)}
        supervisor={supervisor}
      />
    </div>
  );
}
