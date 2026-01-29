"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navlink from "@/components/staffManagement/Navlink";
import AvailabilitySchedule from "@/components/staffManagement/AvailabilitySchedule";
import nurseStore from "@/app/lib/store/nurseStore";
import EditContactModal from "@/components/staffManagement/NurseEdit/ContactDetails ";
import EditNurseAvailability from "@/components/staffManagement/NurseEdit/EditNurseAvailability";
import EditExperincePopup from "@/components/staffManagement/NurseEdit/EditExperincePopup";
import NurseFileSection from "@/components/staffManagement/NurseFileSection";
import EditLanguagesPopup from "@/components/staffManagement/NurseEdit/EditLanguagesPopup";
import RemoveStaffPopup from "@/components/staffManagement/RemoveStaffPopup";

function StaffDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const userId = id;
  const searchParams = useSearchParams();

  const role = searchParams.get("role") || "NURSE";
  const {
    fetchNurseById,
    selectedNurse,
    verifyNurse,
    fetchNurseLanguagesById,
    selectedNurseLanguages,
  } = nurseStore();

  const [modalData, setModalData] = useState({ show: false, action: "" });
  const [preview, setPreview] = useState({
    show: false,
    fileUrl: "",
    isImage: false,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedContact, setEditedContact] = useState({
    gender: "",
    dob: "",
    fullName: "",
    email: "",
    mobileNumber: "",
    educationQualifications: "",
    specializations: [], // array, assuming one or more values
    workSchedule: "", // "FULLTIME" or "PARTTIME"
    grading: "",
    address: {
      state: "",
      district: "",
      city: "",
      lineFirst: "",
      lineSecond: "",
      pincode: "",
    },
  });

  const [editAvailabilityPopup, setEditAvailabilityPopup] = useState(false);
  const [isEditExperincePopUp, setIsExperincePopUp] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [removeStaffPopup,setRemoveStaffPopup]= useState(false);

  useEffect(() => {
    if (userId) {
      fetchNurseById(userId);
      fetchNurseLanguagesById(userId);
    }
  }, [userId]);
  console.log(selectedNurseLanguages);

  useEffect(() => {
    if (selectedNurse) {
      setEditedContact({
        gender: selectedNurse.gender || "",
        dob: selectedNurse.dob || "",
        fullName: selectedNurse.fullName || "",
        email: selectedNurse.email || "",
        mobileNumber: selectedNurse.mobileNumber || "",
        educationQualifications: nurseData.educationQualifications[0] || "",
        specializations: nurseData.specializations || [],
        workSchedule: nurseData.workSchedule || "",
          grading: nurseData.grading || "",
        address: {
          addressId: selectedNurse.address?.id || "",
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
        <div
          onClick={() =>
            router.push(`/controlpanel/staffManagement/allStaff?role=${role}`)
          }
          className="cursor-pointer"
        >
          Back
        </div>
      </div>

      <div className="bg-white border border-[#BBBBBB] rounded-[15px] mt-4 mb-6 pb-4">
        {/* Nurse header */}
        <div className="flex justify-between items-center px-[39px] py-[19px] border-b border-b-[#BBBBBB]">
          <span className="text-[20px] font-semibold text-[#333333]">
            {selectedNurse.fullName}
          </span>
          <button
          className=" text-white font-semibold text-[16px] w-[162px] h-[40px] bg-[#3674B5] rounded-[15px] cursor-pointer"
          onClick={()=>setRemoveStaffPopup(true)}>Remove Employee</button>
        </div>
        <div className="flex justify-between px-[39px]">
          <h1 className="text-[16px] font-semibold text-black py-[18px]">
            Basics
          </h1>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="cursor-pointer hover:scale-110"
          >
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
            <div className="grow">{selectedNurse.gender}</div>
          </div>

          <div className="flex gap-[18px]">
            <div className="w-[280px]">Address</div>
            <div className="flex-1">{address.fullAddress}</div>
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
            <span className="w-[280px]">DOB</span>
            <span>
              {selectedNurse.dob
                ? new Date(selectedNurse.dob).toISOString().split("T")[0]
                : ""}
            </span>
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
           <div className="flex gap-[18px]">
            <span className="w-[280px]">Grading</span>
            <span>{editedContact.grading}</span>
          </div>

          {/* <div className="flex gap-[18px]"><span className="w-[280px]">Address</span><span>{address.lineFirst}, {address.lineSecond}</span></div> */}
        </div>

        <div className="flex justify-between px-[39px]">
          <h1 className="text-[16px] font-semibold text-black py-[18px]">
            Languages
          </h1>
          <button
            onClick={() => setShowPopup(true)}
            className="cursor-pointer hover:scale-110"
          >
            <img src="/edit-btn.svg" className="size-6" alt="edit" />
          </button>
        </div>
        <div className="flex flex-col text-black font-light gap-[18px] px-[39px] pb-[18px] border-b border-[#BBBBBB]">
          <div className="flex gap-[18px]">
            <span className="w-[280px]">Languages</span>

            <span>
              {selectedNurseLanguages?.userLanguages?.length > 0
                ? selectedNurseLanguages.userLanguages
                    .map((lang) => lang.language)
                    .join(", ")
                : "-"}
            </span>
          </div>

          {/* <div className="flex gap-[18px]"><span className="w-[280px]">Address</span><span>{address.lineFirst}, {address.lineSecond}</span></div> */}
        </div>
        {/* Basic Details */}
        <div className="px-[39px] pt-[15px]">
          <div className="flex items-center justify-end">
            {/* <button
              onClick={() => setEditAvailabilityPopup(true)}
              className="cursor-pointer hover:scale-110"
            >
              <img src="/edit-btn.svg" className="size-6" alt="edit" />
            </button> */}
          </div>
          {/* Availability */}
          <AvailabilitySchedule availabilities={availabilities} />
          <div className="flex items-center justify-end mt-6">
            <button
              onClick={() => setIsExperincePopUp(true)}
              className="cursor-pointer hover:scale-110"
            >
              <img src="/edit-btn.svg" className="size-6" alt="edit" />
            </button>
          </div>
          <h1 className="text-[16px] font-semibold text-black py-[18px]">
            Work Experience?
          </h1>
          <div className="flex gap-[18px] text-black">
            <span className="w-[280px]  text-black">
              Previous Work Experience
            </span>
            <span className=" text-black">
              {nurseData.experienceLevel || "Fresher"}
            </span>
          </div>

          {/* Experience */}
          <h1 className="text-[16px] font-semibold text-black py-[18px]">
            Experience details
          </h1>
          <div className="flex flex-col text-black font-light gap-[18px]">
            <div className="flex gap-[18px]">
              <span className="w-[280px]">Total Experience in years</span>
              <span>
                {nurseData.yearsOfExperience}Yr {nurseData.monthsOfExperience}Mo
              </span>
            </div>
            <div className="flex gap-[18px]">
              <span className="w-[280px]">Last Hospital(Last Worked)</span>
              <span>{qualifications.providerName || "Nil"}</span>
            </div>
            <div className="flex gap-[18px]">
              <span className="w-[280px]">Department</span>
              <span>{qualifications.department || "Nil"}</span>
            </div>
            <div className="flex gap-[18px]">
              <span className="w-[280px]">Location</span>
              <span className="flex-1">
                {qualifications.providerAddress || "Nil"}
              </span>
            </div>

            <div className="flex gap-[18px]">
              <span className="w-[280px]">Working Duration</span>

              <span>
                {qualifications.startDate &&
                !isNaN(Date.parse(qualifications.startDate))
                  ? new Date(qualifications.startDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      },
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
                        },
                      )
                    : ""}
              </span>
            </div>
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

        <NurseFileSection
          userId={nurseData.userId}
          educationQualificationId={qualifications.id}
          files={files}
          qualifications={qualifications}
          url={url}
          setPreview={setPreview}
        />
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
              <strong>{modalData.action?.toLowerCase()}</strong> nurse{" "}
              <strong>{selectedNurse.fullName}</strong>?
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={async () => {
                  await verifyNurse(userId, modalData.action);
                  setModalData({ show: false, action: "" });
                  // router.push("/controlpanel/staffManagement");
                  router.push(`/controlpanel/staffManagement?role=${role}`);
                  router.back();
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
         grading={editedContact.grading} 
        userId={userId}
        role={selectedNurse.role}
        onChange={setEditedContact}
        initialContact={selectedNurse}
        onCancel={() => setIsEditModalOpen(false)}
      />

      {editAvailabilityPopup && (
        <EditNurseAvailability
          availabilities={availabilities}
          userId={userId}
          onClose={() => setEditAvailabilityPopup(false)}
        />
      )}

      {isEditExperincePopUp && (
        <EditExperincePopup
          qualifications={qualifications}
          nurseData={nurseData}
          userId={userId}
          role={selectedNurse.role}
          onClose={() => setIsExperincePopUp(false)}
        />
      )}

      {showPopup && (
        <EditLanguagesPopup
          selectedNurseLanguages={selectedNurseLanguages}
          userId={userId}
          onClose={() => setShowPopup(false)}
          onSuccess={() => {
            fetchNurseLanguagesById(userId);
            setShowPopup(false);
          }}
        />
      )}


      {
        removeStaffPopup && (
          <RemoveStaffPopup
          staffName={selectedNurse.fullName}
          staffId={userId}
          onClose={()=>setRemoveStaffPopup(false)}
          />
        )
      }
    </div>
  );
}

export default StaffDetailPage;
