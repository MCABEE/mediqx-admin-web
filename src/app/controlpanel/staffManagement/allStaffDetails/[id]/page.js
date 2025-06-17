

"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navlink from "@/components/staffManagement/Navlink";
import AvailabilitySchedule from "@/components/staffManagement/AvailabilitySchedule";
import nurseStore from "@/app/lib/store/nurseStore";

function allStaffDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const userId = id;
  const { fetchNurseById, selectedNurse } = nurseStore();

  useEffect(() => {
    if (userId) fetchNurseById(userId);
  }, [userId]);



  if (!selectedNurse) return <div>Loading...</div>;

  const url = "https://dev-nurse-docs.s3.ap-south-1.amazonaws.com/";
  const nurseData = selectedNurse.nurse || {};
  const address = selectedNurse.address || {};
  const education = nurseData.educationQualifications || [];
  const files = selectedNurse.files || [];
  const availabilities = selectedNurse.availabilities || [];
  const qualifications = selectedNurse.qualifications[0] || {};


  const isImage = (fileName) => /\.(jpe?g|png|webp|gif)$/i.test(fileName);

  return (
    <div>
      <Navlink />

      <div className="w-full bg-white border border-[#888888] text-base text-black font-semibold px-6 py-3 rounded-[15px] mt-4">
        <Link href="/controlpanel/staffManagement/allStaff">Back</Link>
      </div>

       {/* <div className="w-full bg-white border border-[#888888] text-base text-black font-semibold flex gap-[50px] px-6 pt-6 rounded-[15px] mt-4">
        <span>Direct</span>

        <span className="h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4">
          Referral
        </span>
      </div> */}

      <div className="bg-white border border-[#BBBBBB] rounded-[15px] mt-4 mb-6">
        {/* Nurse header */}
        <div className="flex justify-between items-center px-[39px] py-[19px] border-b border-b-[#BBBBBB]">
          <span className="text-[20px] font-semibold text-[#333333]">
            {selectedNurse.fullName}
          </span>
          <div className="flex items-center gap-4">
             <button className="w-[192px] h-[40px] bg-[#3674B5] text-white text-[16px] flex justify-center items-center rounded-[15px]">
                Check Calendar
                </button>
            <button><img src="/edit-btn.svg" alt="edit" /></button>
            <button><img src="/delete-btn.svg" alt="delete" /></button>
          </div>
        </div>

        {/* Basic Details */}
        <div className="px-[39px] pt-[15px]">
          <h1 className="text-[16px] font-semibold text-black pb-[18px]">Basics</h1>
          <div className="flex gap-10">
            <div className="flex flex-col gap-[10px] text-black">
              <span>Current Location</span>
              <span>Qualification</span>
              <span>Experience Level</span>
            </div>
            <div className="flex flex-col gap-[10px] text-black">
              <span>{nurseData.currentLocation || address.city || "Nil"}</span>
              <span>{education[0] || "Nil"}</span>
              <span>{nurseData.experienceLevel || "Nil"}</span>
            </div>
          </div>

          {/* Availability */}
          <AvailabilitySchedule availabilities={availabilities} />

          {/* Experience */}
          <h1 className="text-[16px] font-semibold text-black py-[18px]">Experience details</h1>
          <div className="flex flex-col text-black font-light gap-[18px]">
            <div className="flex gap-[18px]">
              <span className="w-[280px]">Total Experience in years</span>
              <span>{nurseData.yearsOfExperience}Yr {nurseData.monthsOfExperience}Mo </span>
            </div>
            <div className="flex gap-[18px]">
              <span className="w-[280px]">Last Hospital</span>
              <span>{nurseData.lastWorkedHospital || "Nil"}</span>
            </div>
            <div className="flex gap-[18px]">
              <span className="w-[280px]">Specializations</span>
              <span>{nurseData.specializations || "Nil"}</span>
            </div>
            <div className="flex gap-[18px]">
              <span className="w-[280px]">Location</span>
              <span>{qualifications.providerLocation}, {qualifications.providerState}</span>
            </div>
            {/* <div className="flex gap-[18px]">
              <span className="w-[280px]">Working Duration</span>
              <span>{nurseData.specializations || "Nil"}</span>
            </div> */}
          </div>
            
          {/* Skills */}
          <h1 className="text-[16px] font-semibold text-black py-[18px]">Skills</h1>
          <div className="flex flex-col text-black font-light gap-[10px] mb-4">
            {nurseData.skills?.length ? nurseData.skills.map((skill, idx) => (
              <span key={idx}>{skill}</span>
            )) : <span>Nil</span>}
          </div>
        </div>

        {/* File Uploads */}
        {[{ label: "Nursing Certificate", type: "NURSING_CERTIFICATE" },
          { label: "Council Registration", type: "COUNCIL_REGISTRATION" },
          { label: "Experience Certificate", type: "AVATAR" },
          { label: "Photo", type: "PASSPORT_IMAGE" }]
          .map(({ label, type }) => {
            const file = files.find((f) => f.type === type);
            return (
              <div key={type} className="flex flex-col bg-[#EBF2F8] px-[39px] py-6 gap-2">
                <span className="w-[300px] text-black">{label}</span>
                {file ? (
                  <div className="flex items-center gap-4 ps-[52px]">
                    <span className="text-gray-700 truncate w-[300px]">{file.fileName}</span>
                    <img src="/pdf.svg" alt="PDF Icon" />
                    <button onClick={() => setPreview({ show: true, fileUrl: `${url}${file.key}`, isImage: isImage(file.fileName) })} className="text-[#1982FE] cursor-pointer">View</button>
                    <button onClick={async () => {
                      try {
                        const response = await fetch(`${url}${file.key}`);
                        const blob = await response.blob();
                        const downloadUrl = window.URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = downloadUrl;
                        link.download = file.fileName;
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                      } catch {
                        alert("Download failed.");
                      }
                    }} className="text-[#1982FE] cursor-pointer">Download</button>
                  </div>
                ) : <span className="text-[#FF0000] ps-10">Not Uploaded</span>}
              </div>
            );
        })}

        {/* Contact Details with edit */}
        <div className=" px-[39px]">
          <h1 className="text-[16px] font-semibold text-black py-[18px]">Contact Details</h1>
          
        </div>
        <div className="flex flex-col text-black font-light gap-[18px] px-[39px] pb-[18px] ">
          <div className="flex gap-[18px]"><span className="w-[280px]">Gender</span><span>{selectedNurse.gender}</span></div>
          <div className="flex gap-[18px]"><span className="w-[280px]">Full Name</span><span>{selectedNurse.fullName}</span></div>
          <div className="flex gap-[18px]"><span className="w-[280px]">Email</span><span>{selectedNurse.email}</span></div>
          <div className="flex gap-[18px]"><span className="w-[280px]">Phone Number</span><span>{selectedNurse.mobileNumber}</span></div>
          <div className="flex gap-[18px]"><span className="w-[280px]">State</span><span>{address.state}</span></div>
          <div className="flex gap-[18px]"><span className="w-[280px]">District</span><span>{address.district}</span></div>
          <div className="flex gap-[18px]"><span className="w-[280px]">City</span><span>{address.city}</span></div>
          {/* <div className="flex gap-[18px]"><span className="w-[280px]">Address</span><span>{address.lineFirst}, {address.lineSecond}</span></div> */}
          <div className="flex gap-[18px]"><span className="w-[280px]">Pin Code</span><span>{address.pincode}</span></div>
        </div>

     
      </div>

     
    </div>
  );
}

export default allStaffDetailPage;
