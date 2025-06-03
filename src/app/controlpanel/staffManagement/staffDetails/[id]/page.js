// "use client";
// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Navlink from "@/components/staffManagement/Navlink";
// import nurseStore from "@/app/lib/store/nurseStore";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import AvailabilitySchedule from "@/components/staffManagement/AvailabilitySchedule";

// function StaffDetailPage() {
//   const router = useRouter();
//   const { id } = useParams();
//   const userId = id;
//   const { fetchNurseById, selectedNurse, verifyNurse } = nurseStore();
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editedContact, setEditedContact] = useState({
//     gender: "",
//     fullName: "",
//     email: "",
//     mobileNumber: "",
//     address: {
//       state: "",
//       district: "",
//       city: "",
//       lineFirst: "",
//       lineSecond: "",
//       pincode: "",
//     },
//   });
  

//   useEffect(() => {
//     if (userId) {
//       fetchNurseById(userId);
//     }
//   }, [userId]);

//   const [modalData, setModalData] = useState({
//     show: false,
//     action: "", // "APPROVED" | "REJECTED"
//   });

//   const [preview, setPreview] = useState({ show: false, fileUrl: "", isImage: false });

//   if (!selectedNurse) return <div>Loading...</div>;

//   const url = "https://dev-nurse-docs.s3.ap-south-1.amazonaws.com/";
//   const nurseData = selectedNurse.nurse || {};
//   const address = selectedNurse.address || {};
//   const education = nurseData.educationQualifications || [];
//   const files = selectedNurse.files || [];
//   const availabilities = selectedNurse.availabilities || [];


//   const isImage = (fileName) => /\.(jpe?g|png|webp|gif)$/i.test(fileName);

//   return (
//     <div>
//       <Navlink />

//       <div className="w-full bg-white border border-[#888888] text-base text-black font-semibold px-6 py-3 rounded-[15px] mt-4">
//         <Link href="/controlpanel/staffManagement">Back</Link>
//       </div>

//       <div className="bg-white border-[1px] border-[#BBBBBB] rounded-[15px] mt-4 mb-6">
//         <div className="flex justify-between items-center px-[39px] py-[19px] border-b-[1px] border-b-[#BBBBBB]">
//           <span className="text-[20px] font-semibold text-[#333333]">
//             {selectedNurse.fullName}
//           </span>
//           <div className="flex items-center gap-4">
//             <button><img src="/edit-btn.svg" alt="edit" /></button>
//             <button><img src="/delete-btn.svg" alt="delete" /></button>
//           </div>
//         </div>

//         <div className="px-[39px] pt-[15px]">
//           <h1 className="text-[16px] font-semibold text-black pb-[18px]">Basics</h1>
//           <div className="flex gap-10">
//             <div className="flex flex-col gap-[10px] text-[16px] text-black">
//               <span>Current Location</span>
//               <span>Qualification</span>
//               <span>Experience Level</span>
//             </div>
//             <div className="flex flex-col gap-[10px] text-[16px] text-black">
//               <span>{nurseData.currentLocation || address.city || "Nil"}</span>
//               <span>{education[0] || "Nil"}</span>
//               <span>{nurseData.experienceLevel || "Nil"}</span>
//             </div>
//           </div>
        

// {/* Availability component */}
//     <AvailabilitySchedule availabilities={availabilities} />

//           <h1 className="text-[16px] font-semibold text-black py-[18px]">Experience details</h1>
//           <div className="flex flex-col text-[16px] text-black font-light gap-[18px]">
//             <div className="flex gap-[18px]">
//               <span className="w-[280px]">Total Experience in years</span>
//               <span>{nurseData.yearsOfExperience || "0"}</span>
//             </div>
//             <div className="flex gap-[18px]">
//               <span className="w-[280px]">Last Hospital</span>
//               <span>{nurseData.lastWorkedHospital || "Nil"}</span>
//             </div>
//             <div className="flex gap-[18px]">
//               <span className="w-[280px]">Specializations</span>
//               <span>{nurseData.specializations || "Nil"}</span>
//             </div>
//           </div>

//           <h1 className="text-[16px] font-semibold text-black py-[18px]">Skills</h1>
//           <div className="flex flex-col text-[16px] text-black font-light gap-[10px] mb-4">
//             {nurseData.skills?.length ? (
//               nurseData.skills.map((skill, idx) => <span key={idx}>{skill}</span>)
//             ) : (
//               <span>Nil</span>
//             )}
//           </div>
//         </div>

//         {[{ label: "Nursing Certificate", type: "NURSING_CERTIFICATE" }, { label: "Council Registration", type: "COUNCIL_REGISTRATION" }, { label: "Experience Certificate", type: "AVATAR" }, { label: "Photo", type: "PASSPORT_IMAGE" }].map(({ label, type }) => {
//           const file = files.find((f) => f.type === type);

//           return (
//             <div key={type} className="flex flex-col bg-[#EBF2F8] px-[39px] py-6 gap-2">
//               <div className="flex items-center gap-4">
//                 <span className="w-[300px] text-black">{label}</span>
//               </div>
//              {file ? (
//   <div className="flex items-center gap-4 ps-[52px]">
//     <span className="text-[14px] text-gray-700 truncate w-[300px]">{file.fileName}</span>
//     <img src="/pdf.svg" alt="PDF Icon" />
//     <button
//       className="text-[14px] text-[#1982FE] cursor-pointer"
//       onClick={() =>
//         setPreview({ show: true, fileUrl: `${url}${file.key}`, isImage: isImage(file.fileName) })
//       }
//     >
//       View
//     </button>
//  <button
//   className="text-[14px] text-[#1982FE] cursor-pointer"
//   onClick={async () => {
//     try {
//       const response = await fetch(`${url}${file.key}`, { mode: "cors" });
//       if (!response.ok) throw new Error("Network response was not ok");
//       const blob = await response.blob();
//       const downloadUrl = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = downloadUrl;
//       link.download = file.fileName || "download";
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(downloadUrl);
//     } catch (error) {
//       console.error("Download failed:", error);
//       alert("Failed to download file.");
//     }
//   }}
// >
//   Download
// </button>


//   </div>
// ) : (
//   <span className="text-[14px] text-[#FF0000] ps-10">Not Uploaded</span>
// )}

//             </div>
//           );
//         })}

//        <div className="flex justify-between px-[39px]">
//          <h1 className="text-[16px] font-semibold text-black  py-[18px]">Contact Details</h1>
//             <button onClick={() => setIsEditModalOpen(true)}>
//             <img src="/edit-btn.svg" className="size-6" alt="edit" />
//           </button>

//        </div>
//         <div className="flex flex-col text-[16px] text-black font-light gap-[18px] px-[39px] pb-[18px] border-b-[1px] border-b-[#BBBBBB]">
//           <div className="flex gap-[18px]">
//              <span className="w-[280px]">Gender</span>
//             <span>{selectedNurse.gender}</span>
//             </div>
//           <div className="flex gap-[18px]">

//             <span className="w-[280px]">Full Name</span>
//             <span>{selectedNurse.fullName}</span>
//           </div>
//           <div className="flex gap-[18px]">
//             <span className="w-[280px]">Email</span>
//             <span>{selectedNurse.email || "Nil"}</span>
//           </div>
//           <div className="flex gap-[18px]">
//             <span className="w-[280px]">Phone Number</span>
//             <span>{selectedNurse.mobileNumber || "Nil"}</span>
//           </div>
//           <div className="flex gap-[18px]">
//             <span className="w-[280px]">State</span>
//             <span>{address.state || "Nil"}</span>
//           </div><div className="flex gap-[18px]">
//             <span className="w-[280px]">District</span>
//             <span>{address.district || "Nil"}</span>
//           </div><div className="flex gap-[18px]">
//             <span className="w-[280px]">City</span>
//             <span>{address.city || "Nil"}</span>
//           </div>
//           <div className="flex gap-[18px]">
//             <span className="w-[280px]">Address</span>
//             <span>{address.lineFirst},{address.lineSecond} </span>
//           </div>
//           <div className="flex gap-[18px]">
//             <span className="w-[280px]">Pin Code</span>
//             <span>{address.pincode || "Nil"}</span>
//           </div>
//         </div>

//         <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">Actions</h1>
//         <div className="flex gap-8 px-[39px] pb-20">
//           <button className="w-[192px] h-[40px] bg-[#F93827] text-white rounded-[15px] cursor-pointer" onClick={() => setModalData({ show: true, action: "REJECTED" })}>Reject</button>
//           <button className="w-[192px] h-[40px] bg-[#999999] text-white rounded-[15px] cursor-not-allowed">Modify</button>
//           <button className="w-[192px] h-[40px] bg-[#09B438] text-white rounded-[15px] cursor-pointer" onClick={() => setModalData({ show: true, action: "APPROVED" })}>Approve</button>
//         </div>
//       </div>

//       {modalData.show && (
//         <div className="fixed inset-0 flex items-center justify-center bg-[#9b989876] backdrop-blur-xs z-50">
//           <div className="bg-white rounded-xl p-6 w-[400px] text-center text-black shadow-lg">
//             <h2 className="text-lg font-semibold mb-4">Confirm {modalData.action === "APPROVED" ? "Approve" : "Reject"}</h2>
//             <p className="mb-6">
//               Are you sure you want to <strong>{modalData.action === "APPROVED" ? "approve" : "reject"}</strong> nurse <strong>{selectedNurse.fullName}</strong>?
//             </p>
//             <div className="flex justify-center gap-4">
//               <button onClick={async () => {
//                 try {
//                   await verifyNurse(userId, modalData.action);
//                   setModalData({ show: false, action: "" });
//                   router.push("/controlpanel/staffManagement");
//                 } catch (err) {
//                   console.error("Verification failed", err);
//                   alert("Something went wrong. Please try again.");
//                 }
//               }} className="px-4 py-2 bg-[#3674B5] text-white rounded-md cursor-pointer">Yes, Confirm</button>
//               <button onClick={() => setModalData({ show: false, action: "" })} className="px-4 py-2 bg-gray-300 text-black rounded-md cursor-pointer">Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {preview.show && (
//         <div className="fixed inset-0 bg-[#8b898976] backdrop-blur-xs z-50 flex items-center justify-center">
//           <div className="bg-white rounded-xl p-4 max-w-3xl w-full shadow-lg relative">
//             <button className="w-7  h-7 absolute top-0 -right-8 bg-[#ffff] rounded-full text-gray-500 hover:text-black text-xl font-semibold cursor-pointer" onClick={() => setPreview({ show: false, fileUrl: "", isImage: false })}>✕</button>
//             {preview.isImage ? (
//               <img src={preview.fileUrl} alt="Preview" className="max-w-full max-h-[80vh] object-contain mx-auto" />
//             ) : (
//               <iframe src={preview.fileUrl} className="w-full h-[80vh]" title="PDF Preview" />
//             )}
//           </div>
//         </div>
//       )}

//           <EditContactModal
//         show={isEditModalOpen}
//         contact={editedContact}
//         onChange={setEditedContact}
//         onCancel={() => setIsEditModalOpen(false)}
//         onSave={() => {
//           // Call your API to save updated contact here
//           console.log("Saving contact:", editedContact);
//           setIsEditModalOpen(false);
//         }}
//       />
//     </div>
//   );
// }

// export default StaffDetailPage;





















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
  const [preview, setPreview] = useState({ show: false, fileUrl: "", isImage: false });
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
                    <button onClick={() => setPreview({ show: true, fileUrl: `${url}${file.key}`, isImage: isImage(file.fileName) })} className="text-[#1982FE]">View</button>
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
                    }} className="text-[#1982FE]">Download</button>
                  </div>
                ) : <span className="text-[#FF0000] ps-10">Not Uploaded</span>}
              </div>
            );
        })}

        {/* Contact Details with edit */}
        <div className="flex justify-between px-[39px]">
          <h1 className="text-[16px] font-semibold text-black py-[18px]">Contact Details</h1>
          <button onClick={() => setIsEditModalOpen(true)}>
            <img src="/edit-btn.svg" className="size-6" alt="edit" />
          </button>
        </div>
        <div className="flex flex-col text-black font-light gap-[18px] px-[39px] pb-[18px] border-b border-[#BBBBBB]">
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

        {/* Actions */}
        <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">Actions</h1>
        <div className="flex gap-8 px-[39px] pb-20">
          <button className="w-[192px] h-[40px] bg-[#F93827] text-white rounded-[15px]" onClick={() => setModalData({ show: true, action: "REJECTED" })}>Reject</button>
          <button className="w-[192px] h-[40px] bg-[#999999] text-white rounded-[15px] cursor-not-allowed">Modify</button>
          <button className="w-[192px] h-[40px] bg-[#09B438] text-white rounded-[15px]" onClick={() => setModalData({ show: true, action: "APPROVED" })}>Approve</button>
        </div>
      </div>

      {/* Confirm Modal */}
      {modalData.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#9b989876] z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] text-center shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm {modalData.action}</h2>
            <p>Are you sure you want to <strong>{modalData.action.toLowerCase()}</strong> nurse <strong>{selectedNurse.fullName}</strong>?</p>
            <div className="flex justify-center gap-4 mt-6">
              <button onClick={async () => {
                await verifyNurse(userId, modalData.action);
                setModalData({ show: false, action: "" });
                router.push("/controlpanel/staffManagement");
              }} className="px-4 py-2 bg-[#3674B5] text-white rounded-md">Yes, Confirm</button>
              <button onClick={() => setModalData({ show: false, action: "" })} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {preview.show && (
        <div className="fixed inset-0 bg-[#8b898976] z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-4 max-w-3xl w-full shadow-lg relative">
            <button onClick={() => setPreview({ show: false, fileUrl: "", isImage: false })} className="absolute top-2 right-2">✕</button>
            {preview.isImage ? (
              <img src={preview.fileUrl} alt="Preview" className="max-w-full max-h-[80vh] mx-auto" />
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
