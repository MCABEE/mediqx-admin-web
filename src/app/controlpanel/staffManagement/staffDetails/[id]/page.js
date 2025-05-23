"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Navlink from "@/components/staffManagement/Navlink";
import nurseStore from "@/app/lib/store/nurseStore";
import { useRouter } from "next/navigation";

import Link from "next/link";

function StaffDetailPage() {
  const router = useRouter();
const { id } = useParams();
  const userId = id; 
  const { fetchNurseById, selectedNurse } = nurseStore();
const { verifyNurse } = nurseStore();
  useEffect(() => {
    if (userId) {
      fetchNurseById(userId);
    }
  }, [userId]);
  console.log(userId,"page");
  

  if (!selectedNurse) return <div>Loading...</div>;
  const url = "https://dev-nurse-docs.s3.ap-south-1.amazonaws.com/"
  const nurseData = selectedNurse.nurse || {};
  const address = selectedNurse.address || {};
  const education = nurseData.educationQualifications || [];
  const files = selectedNurse.files || [];

  const getFile = (type) => files.find((file) => file.fileType === type);

  return (
    <div>
      <Navlink />

      <div className="w-full bg-white border border-[#888888] text-base text-black font-semibold px-6 py-3 rounded-[15px] mt-4">
        <Link href={"/controlpanel/staffManagement"}>Back</Link>
      </div>

      <div className="bg-white border-[1px] border-[#BBBBBB] rounded-[15px] mt-4 mb-6">
        <div className="flex justify-between items-center px-[39px] py-[19px] border-b-[1px] border-b-[#BBBBBB]">
          <span className="text-[20px] font-semibold text-[#333333]">
            {selectedNurse.fullName}
          </span>
          <div className="flex items-center gap-4">
            <button>
              <img src="/edit-btn.svg" alt="edit" />
            </button>
            <button>
              <img src="/delete-btn.svg" alt="delete" />
            </button>
          </div>
        </div>

        <div className="px-[39px] pt-[15px]">
          {/* Basic Info */}
          <h1 className="text-[16px] font-semibold text-black pb-[18px]">Basics</h1>
          <div className="flex gap-10">
            <div className="flex flex-col gap-[10px] text-[16px] text-black">
              <span>Current Location</span>
              <span>Qualification</span>
              <span>Experience Level</span>
            </div>
            <div className="flex flex-col gap-[10px] text-[16px] text-black">
              <span>{nurseData.currentLocation || address.city || "Nil"}</span>
              <span>{education[0] || "Nil"}</span>
              <span>{nurseData.experienceLevel || "Nil"}</span>
            </div>
          </div>

          {/* Experience Section */}
          <h1 className="text-[16px] font-semibold text-black py-[18px]">
            Experience details
          </h1>
          <div className="flex flex-col text-[16px] text-black font-light gap-[18px]">
            <div className="flex gap-[18px]">
              <span className="w-[280px]">Total Experience in years</span>
              <span>{nurseData.yearsOfExperience || "0"}</span>
            </div>
            <div className="flex gap-[18px]">
              <span className="w-[280px]">Last Hospital</span>
              <span>{nurseData.lastWorkedHospital || "Nil"}</span>
            </div>
            <div className="flex gap-[18px]">
              <span className="w-[280px]">Specializations</span>
              <span>{nurseData.specializations || "Nil"}</span>
            </div>
          </div>

          {/* Skills Section */}
          <h1 className="text-[16px] font-semibold text-black py-[18px]">Skills</h1>
          <div className="flex flex-col text-[16px] text-black font-light gap-[10px] mb-4">
            {nurseData.skills?.length ? (
              nurseData.skills.map((skill, idx) => <span key={idx}>{skill}</span>)
            ) : (
              <span>Nil</span>
            )}
          </div>
        </div>




{[
  { label: "Nursing Certificate", type: "NURSING_CERTIFICATE" },
  { label: "Council Registration", type: "COUNCIL_REGISTRATION" },
  { label: "Experience Certificate", type: "AVATAR" },
  { label: "Photo", type: "PASSPORT_IMAGE" },
].map(({ label, type }) => {
  const file = files.find((f) => f.type === type); // find the first file matching the type

  return (
    <div key={type} className="flex flex-col bg-[#EBF2F8] px-[39px] py-6 gap-2">
      <div className="flex items-center gap-4">
        <span className="w-[300px]">{label}</span>
      </div>

      {file ? (
        <div className="flex items-center gap-4 ps-[52px]">
          <span className="text-[14px] text-gray-700 truncate w-[300px]">{file.fileName}</span>

        <img src="/pdf.svg" alt="PDF Icon" />

          <a
            href={`${url}${file.key}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] text-[#1982FE]"
          >
            View
          </a>
          <a
            href={`${url}${file.key}`}
            download
            className="text-[14px] text-[#1982FE]"
          >
            Download
          </a>
        </div>
      ) : (
        <span className="text-[14px] text-[#FF0000] ps-10">Not Uploaded</span>
      )}
    </div>
  );
})}



        {/* Contact Details */}
        <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">
          Contact Details
        </h1>
        <div className="flex flex-col text-[16px] text-black font-light gap-[18px] px-[39px] pb-[18px] border-b-[1px] border-b-[#BBBBBB]">
          <div className="flex gap-[18px]">
            <span className="w-[280px]">Full Name</span>
            <span>{selectedNurse.fullName}</span>
          </div>
          <div className="flex gap-[18px]">
            <span className="w-[280px]">Email</span>
            <span>{selectedNurse.email || "Nil"}</span>
          </div>
          <div className="flex gap-[18px]">
            <span className="w-[280px]">Phone</span>
            <span>{selectedNurse.mobileNumber || "Nil"}</span>
          </div>
          <div className="flex gap-[18px]">
            <span className="w-[280px]">Address</span>
            <span>
              {address.city}, {address.district}, {address.state}, {address.pincode}
            </span>
          </div>
        </div>

        {/* Actions */}
       <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">
  Actions
</h1>
<div className="flex gap-8 px-[39px] pb-20">
 <button
  className="w-[192px] h-[40px] bg-[#F93827] text-white rounded-[15px] cursor-pointer"
  onClick={async () => {
    if (window.confirm("Are you sure you want to reject this nurse?")) {
      await verifyNurse(userId, "REJECTED");
      router.push("/controlpanel/staffManagement");
    }
  }}
>
  Reject
</button>

<button
  className="w-[192px] h-[40px] bg-[#999999] text-white rounded-[15px] cursor-not-allowed"
  // onClick={() => {
  //   if (window.confirm("Are you sure you want to mark this nurse as 'Pending'?")) {
  //     verifyNurse(userId, "PENDING");
  //   }
  // }}
>
  Modify
</button>

<button
  className="w-[192px] h-[40px] bg-[#09B438] text-white rounded-[15px] cursor-pointer"
  onClick={async() => {
    if (window.confirm("Are you sure you want to approve this nurse?")) {
     await verifyNurse(userId, "APPROVED");
          router.push("/controlpanel/staffManagement");
    }
  }}
>
  Approve
</button>

</div>

      </div>
    </div>
  );
}

export default StaffDetailPage;
