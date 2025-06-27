"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navlink from "@/components/staffManagement/Navlink";
import AvailabilitySchedule from "@/components/staffManagement/AvailabilitySchedule";
import nurseStore from "@/app/lib/store/nurseStore";
import EditContactModal from "@/components/staffManagement/NurseEdit/ContactDetails ";

function StaffDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const userId = id;
  const { fetchNurseById, selectedNurse, verifyNurse } = nurseStore();

  const [modalData, setModalData] = useState({ show: false, action: "" });
  const [preview, setPreview] = useState({
    show: false,
    fileUrl: "",
    isImage: false,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedContact, setEditedContact] = useState({
    gender: "",
    fullName: "",
    email: "",
    mobileNumber: "",
    address: {
      state: "",
      district: "",
      city: "",
      lineFirst: "",
      lineSecond: "",
      pincode: "",
    },
  });

  useEffect(() => {
    if (userId) fetchNurseById(userId);
  }, [userId]);

  useEffect(() => {
    if (selectedNurse) {
      setEditedContact({
        gender: selectedNurse.gender || "",
        fullName: selectedNurse.fullName || "",
        email: selectedNurse.email || "",
        mobileNumber: selectedNurse.mobileNumber || "",
        address: {
          state: selectedNurse.address?.state || "",
          district: selectedNurse.address?.district || "",
          city: selectedNurse.address?.city || "",
          lineFirst: selectedNurse.address?.lineFirst || "",
          lineSecond: selectedNurse.address?.lineSecond || "",
          pincode: selectedNurse.address?.pincode || "",
        },
      });
    }
  }, [selectedNurse]);

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
        <Link href="/controlpanel/staffManagement">Back</Link>
      </div>

      <div className="bg-white border border-[#BBBBBB] rounded-[15px] mt-4 mb-6">
        {/* Nurse header */}
        <div className="flex justify-between items-center px-[39px] py-[19px] border-b border-b-[#BBBBBB]">
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
        <div className="flex justify-between px-[39px]">
          <h1 className="text-[16px] font-semibold text-black py-[18px]">
            Basics
          </h1>
          <button onClick={() => setIsEditModalOpen(true)}>
            <img src="/edit-btn.svg" className="size-6" alt="edit" />
          </button>
        </div>
        <div className="flex flex-col text-black font-light gap-[18px] px-[39px] pb-[18px] border-b border-[#BBBBBB]">
          <div className="flex gap-[18px]">
            <span className="w-[280px]">Full Name</span>
            <span>{selectedNurse.fullName}</span>
          </div>

          <div className="flex gap-[18px]">
            <span className="w-[280px]">Gender</span>
            <span>{selectedNurse.gender}</span>
          </div>
          <div className="flex gap-[18px]">
            <span className="w-[280px]">State</span>
            <span>{address.state}</span>
          </div>
          <div className="flex gap-[18px]">
            <span className="w-[280px]">District</span>
            <span>{address.district}</span>
          </div>
          <div className="flex gap-[18px]">
            <span className="w-[280px]">City</span>
            <span>{address.city}</span>
          </div>
          <div className="flex gap-[18px]">
            <span className="w-[280px]">Pin Code</span>
            <span>{address.pincode}</span>
          </div>

          <div className="flex gap-[18px]">
            <span className="w-[280px]">Email</span>
            <span>{selectedNurse.email}</span>
          </div>
          <div className="flex gap-[18px]">
            <span className="w-[280px]">Phone Number</span>
            <span>{selectedNurse.mobileNumber}</span>
          </div>
          <div className="flex gap-[18px]">
            <span className="w-[280px]">Qualification</span>
            <span>{nurseData.educationQualifications}</span>
          </div>
          <div className="flex gap-[18px]">
            <span className="w-[280px]">Specialization</span>
            <span>{nurseData.specializations[0]}</span>
          </div>
          <div className="flex gap-[18px]">
            <span className="w-[280px]">Fulltime / Part time</span>
            <span>{nurseData.workSchedule}</span>
          </div>

          {/* <div className="flex gap-[18px]"><span className="w-[280px]">Address</span><span>{address.lineFirst}, {address.lineSecond}</span></div> */}
        </div>
        {/* Basic Details */}
        <div className="px-[39px] pt-[15px]">
          {/* Availability */}
          <AvailabilitySchedule availabilities={availabilities} />
          <h1 className="text-[16px] font-semibold text-black py-[18px]">
            Work Experience?
          </h1>
          <div className="flex gap-[18px] text-black">
            <span className="w-[280px]  text-black">Previous Work Experience </span>
            <span className=" text-black">{nurseData.experienceLevel || "Nil"}</span>
          </div>

          {/* Experience */}
          <h1 className="text-[16px] font-semibold text-black py-[18px]">
            Experience details
          </h1>
          <div className="flex flex-col text-black font-light gap-[18px]">
            <div className="flex gap-[18px]">
              <span className="w-[280px]">Total Experience in years</span>
              <span>
                {nurseData.yearsOfExperience}Yr {nurseData.monthsOfExperience}Mo{" "}
              </span>
            </div>
            <div className="flex gap-[18px]">
              <span className="w-[280px]">Last Hospital(Last Worked)</span>
              <span>{qualifications.providerName || "Nil"}</span>
            </div>
            <div className="flex gap-[18px]">
              <span className="w-[280px]">Specializations</span>
              <span>{qualifications.department || "Nil"}</span>
            </div>
            <div className="flex gap-[18px]">
              <span className="w-[280px]">State</span>
              <span>{qualifications.providerState || "Nil"}</span>
            </div>
            <div className="flex gap-[18px]">
              <span className="w-[280px]">Location</span>
              <span>{qualifications.providerLocation || "Nil"}</span>
            </div>

            <div className="flex gap-[18px]">
              <span className="w-[280px]">Working Duration</span>
              {/* <span>{qualifications.startDate}, {qualifications.endDate}</span> */}

              {/* <span>
  {new Date(qualifications.startDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })}
  {" - "}
  {qualifications.onGoing
    ? "Present"
    : new Date(qualifications.endDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })}
</span> */}

              <span>
                {qualifications.startDate &&
                !isNaN(Date.parse(qualifications.startDate))
                  ? new Date(qualifications.startDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : ""}
                {" - "}
                {qualifications.onGoing
                  ? "Present"
                  : qualifications.endDate &&
                    !isNaN(Date.parse(qualifications.endDate))
                  ? new Date(qualifications.endDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : ""}
              </span>
            </div>
            {/* <div className="flex gap-[18px]">
              <span className="w-[280px]">Working Duration</span>
              <span>{nurseData.specializations || "Nil"}</span>
            </div> */}
          </div>

          {/* Skills */}
          <h1 className="text-[16px] font-semibold text-black py-[18px]">
            Skills
          </h1>
          <div className="flex flex-col text-black font-light gap-[10px] mb-4">
            {nurseData.skills?.length ? (
              nurseData.skills.map((skill, idx) => (
                <span key={idx}>{skill}</span>
              ))
            ) : (
              <span>Nil</span>
            )}
          </div>
        </div>

        {/* File Uploads */}
        {[
          { label: "Nursing Certificate", type: "NURSING_CERTIFICATE" },
          { label: "Council Registration", type: "COUNCIL_REGISTRATION" },
          { label: "Experience Certificate", type: "AVATAR" },
          { label: "Photo", type: "PASSPORT_IMAGE" },
        ].map(({ label, type }) => {
          const file = files.find((f) => f.type === type);
          return (
            <div
              key={type}
              className="flex flex-col bg-[#EBF2F8] px-[39px] py-6 gap-2"
            >
              <span className="w-[300px] text-black">{label}</span>
              {file ? (
                <div className="flex items-center gap-4 ps-[52px]">
                  <span className="text-gray-700 truncate w-[300px]">
                    {file.fileName}
                  </span>
                  <img src="/pdf.svg" alt="PDF Icon" />
                  <button
                    onClick={() =>
                      setPreview({
                        show: true,
                        fileUrl: `${url}${file.key}`,
                        isImage: isImage(file.fileName),
                      })
                    }
                    className="text-[#1982FE] cursor-pointer"
                  >
                    View
                  </button>
                  <button
                    onClick={async () => {
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
                    }}
                    className="text-[#1982FE] cursor-pointer"
                  >
                    Download
                  </button>
                </div>
              ) : (
                <span className="text-[#FF0000] ps-10">Not Uploaded</span>
              )}
            </div>
          );
        })}

        {/* Contact Details with edit */}

        {/* <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">Referral</h1>  */}
        <div className="flex flex-col text-black font-light gap-[18px] px-[39px]">
          {/* <div className="flex gap-[18px]">
              <span className="w-[280px]">Any refferal you have?</span>
             <span>{selectedNurse.referredById ? "Yes" : "No"}</span>
            </div> */}
          {/* <div className="flex gap-[18px]">
              <span className="w-[280px]">Code</span>
              <span></span>
            </div> */}
        </div>

        {/* Actions */}
        <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">
          Actions
        </h1>
        <div className="flex gap-8 px-[39px] pb-20">
          <button
            className="w-[192px] h-[40px] bg-[#F93827] text-white rounded-[15px] cursor-pointer"
            onClick={() => setModalData({ show: true, action: "REJECTED" })}
          >
            Reject
          </button>
          <button className="w-[192px] h-[40px] bg-[#999999] text-white rounded-[15px] cursor-not-allowed">
            Modify
          </button>
          <button
            className="w-[192px] h-[40px] bg-[#09B438] text-white rounded-[15px] cursor-pointer"
            onClick={() => setModalData({ show: true, action: "APPROVED" })}
          >
            Approve
          </button>
        </div>
      </div>

      {/* Confirm Modal */}
      {modalData.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#9b989876] backdrop-blur-xs z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] text-center shadow-lg text-black">
            <h2 className="text-lg font-semibold mb-4 text-black">
              Confirm {modalData.action}
            </h2>
            <p className="text-black">
              Are you sure you want to{" "}
              <strong>{modalData.action.toLowerCase()}</strong> nurse{" "}
              <strong>{selectedNurse.fullName}</strong>?
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={async () => {
                  await verifyNurse(userId, modalData.action);
                  setModalData({ show: false, action: "" });
                  router.push("/controlpanel/staffManagement");
                }}
                className="px-4 py-2 bg-[#3674B5] text-white rounded-md cursor-pointer"
              >
                Yes, Confirm
              </button>
              <button
                onClick={() => setModalData({ show: false, action: "" })}
                className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {preview.show && (
        <div className="fixed inset-0 bg-[#8b898976] z-50 flex items-center justify-center backdrop-blur-xs">
          <div className="bg-white rounded-xl p-4 max-w-3xl w-full shadow-lg relative">
            <button
              onClick={() =>
                setPreview({ show: false, fileUrl: "", isImage: false })
              }
              className=" w-7  h-7 absolute top-0 -right-8 bg-[#ffff] rounded-full text-gray-500 hover:text-black text-xl font-semibold cursor-pointer"
            >
              ✕
            </button>
            {preview.isImage ? (
              <img
                src={preview.fileUrl}
                alt="Preview"
                className="max-w-full max-h-[80vh] mx-auto"
              />
            ) : (
              <iframe src={preview.fileUrl} className="w-full h-[80vh]" />
            )}
          </div>
        </div>
      )}

      <EditContactModal
        show={isEditModalOpen}
        contact={editedContact}
        onChange={setEditedContact}
        onCancel={() => setIsEditModalOpen(false)}
        onSave={() => {
          // Call your API to save updated contact here
          console.log("Saving contact:", editedContact);
          setIsEditModalOpen(false);
        }}
      />
    </div>
  );
}

export default StaffDetailPage;
