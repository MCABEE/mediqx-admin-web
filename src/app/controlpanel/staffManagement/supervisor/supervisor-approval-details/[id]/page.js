// "use client";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";



// function page() {
//  const router = useRouter();
//   return (
//     <div>
  

//        <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex items-center">
//         <h1
//           onClick={() => router.back()}
//           className="text-[16px] text-black px-[38px] font-semibold cursor-pointer"
//         >
//           Back
//         </h1>
//       </div>

//       <table className="w-full border-spacing-y-2 border-separate text-black">
//         <tbody>
//           <tr className="bg-white">
//             <td className="p-2">1</td>
//             <td className="border-l-4 border-[#C0D8F6] p-2 hover:underline">
//               Sevv
//             </td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">keke</td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">male</td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">bhyu hjh hj</td>
//           </tr>
//         </tbody>
//       </table>

//       <div className="bg-white border border-[#BBBBBB] rounded-[15px] mt-4 mb-6 pb-4">
//         {/* Nurse header */}
//         <div className="flex justify-between items-center px-[39px] py-[19px] border-b border-b-[#BBBBBB]">
//           <span className="text-[20px] font-semibold text-[#333333]">
//             Test
//           </span>
//         </div>
//         <div className="flex justify-between px-[39px]">
//           <h1 className="text-[16px] font-semibold text-black py-[18px]">
//             Basics
//           </h1>
//           {/* <button
//             onClick={() => setIsEditModalOpen(true)}
//             className="cursor-pointer hover:scale-110"
//           >
//             <img src="/edit-btn.svg" className="size-6" alt="edit" />
//           </button> */}
//         </div>
//         <div className="flex flex-col text-black font-light gap-[18px] px-[39px] pb-[18px] border-b border-[#BBBBBB]">
//           <div className="flex gap-[18px]">
//             <span className="w-[280px]">Full Name</span>
//             <span>nk kjkj </span>
//           </div>

//           <div className="flex gap-[18px]">
//             <span className="w-[280px]">Gender</span>
//             <div className="grow">kljkh uygu</div>
//           </div>
      
        
         
//           <div className="flex gap-[18px]">
//             <div className="w-[280px]">Address</div>
//             <div className="flex-1">njk  </div>
//           </div>
         

//           <div className="flex gap-[18px]">
//             <span className="w-[280px]">Email</span>
//             <span>kjn jnj</span>
//           </div>
//           <div className="flex gap-[18px]">
//             <span className="w-[280px]">Phone Number</span>
//             <span>jiuhiu uihiu</span>
//           </div>
//           <div className="flex gap-[18px]">
//             <span className="w-[280px]">DOB</span>
//             <span>
//               kjj
//             </span>
//           </div>
//           <div className="flex gap-[18px]">
//             <span className="w-[280px]">Qualification</span>
//             <span>kjbb </span>
//           </div>
//           <div className="flex gap-[18px]">
//             <span className="w-[280px]">Specialization</span>
//             <span>kj ui</span>
//           </div>
//           <div className="flex gap-[18px]">
//             <span className="w-[280px]">Fulltime / Part time</span>
//             <span>hjb  u</span>
//           </div>

//         </div>


//                 <div className="flex justify-between px-[39px]">
//           <h1 className="text-[16px] font-semibold text-black py-[18px]">
//             Languages 
//           </h1>
//           {/* <button
            
//             className="cursor-pointer hover:scale-110"
//           >
//             <img src="/edit-btn.svg" className="size-6" alt="edit" />
//           </button> */}
//         </div>
//         <div className="flex flex-col text-black font-light gap-[18px] px-[39px] pb-[18px] border-b border-[#BBBBBB]">
//          <div className="flex gap-[18px]">
//   <span className="w-[280px]">Languages</span>
 
//   <span>
//   kjnj j kj
// </span>

// </div>

         

//           {/* <div className="flex gap-[18px]"><span className="w-[280px]">Address</span><span>{address.lineFirst}, {address.lineSecond}</span></div> */}
//         </div>
//         {/* Basic Details */}
//         <div className="px-[39px] pt-[15px]">
//           <div className="flex items-center justify-end">
//             {/* <button
//               onClick={() => setEditAvailabilityPopup(true)}
//               className="cursor-pointer hover:scale-110"
//             >
//               <img src="/edit-btn.svg" className="size-6" alt="edit" />
//             </button> */}
//           </div>
        
//           <div className="flex items-center justify-end mt-6">
//             {/* <button
//               onClick={() => setIsExperincePopUp(true)}
//               className="cursor-pointer hover:scale-110"
//             >
//               <img src="/edit-btn.svg" className="size-6" alt="edit" />
//             </button> */}
//           </div>
//           <h1 className="text-[16px] font-semibold text-black py-[18px]">
//             Work Experience?
//           </h1>
//           <div className="flex gap-[18px] text-black">
//             <span className="w-[280px]  text-black">
//               Previous Work Experience
//             </span>
//             <span className=" text-black">
//               { "Fresher"}
//             </span>
//           </div>

//           {/* Experience */}
//           <h1 className="text-[16px] font-semibold text-black py-[18px]">
//             Experience details
//           </h1>
//           <div className="flex flex-col text-black font-light gap-[18px]">
//             <div className="flex gap-[18px]">
//               <span className="w-[280px]">Total Experience in years</span>
//               <span>
//                5Yr 4Mo
//               </span>
//             </div>
//             <div className="flex gap-[18px]">
//               <span className="w-[280px]">Last Hospital(Last Worked)</span>
//               <span>{ "Nil"}</span>
//             </div>
//             <div className="flex gap-[18px]">
//               <span className="w-[280px]">Department</span>
//               <span>{ "Nil"}</span>
//             </div>
//             <div className="flex gap-[18px]">
//               <span className="w-[280px]">Location</span>
//               <span className="flex-1">{ "Nil"}</span>
//             </div>


//             <div className="flex gap-[18px]">
//               <span className="w-[280px]">Working Duration</span>

//               <span>
//                 kjhhkj
//               </span>
//             </div>
//             {/* <div className="flex gap-[18px]">
//               <span className="w-[280px]">Working Duration</span>
//               <span>{nurseData.specializations || "Nil"}</span>
//             </div> */}
//           </div>

//           {/* Skills */}
//           <h1 className="text-[16px] font-semibold text-black py-[18px]">
//             Skills
//           </h1>
//           <div className="flex flex-col text-black font-light gap-[10px] mb-4">
//            uiuhu
//           </div>
//         </div>
//         {/* File Uploads */}
//         {/* {[
//           { label: "Nursing Certificate", type: "NURSING_CERTIFICATE" },
//           { label: "Council Registration", type: "COUNCIL_REGISTRATION" },
//           {
//             label: "Experience Certificate",
//             type: "EXPERIENCE_CERTIFICATE",
//             isQualificationFile: true,
//           },
//           { label: "Photo", type: "PASSPORT_IMAGE" },
//         ].map(({ label, type, isQualificationFile }) => {
//           let file;

//           if (isQualificationFile) {
//             // Get from qualifications[].files[]
//             const allQualificationFiles = qualifications?.files || [];
//             file = allQualificationFiles.find((f) => f.type === type);
//           } else {
//             // Get from top-level files[]
//             file = files.find((f) => f.type === type);
//           }

//           return (
//             <div
//               key={type}
//               className="flex flex-col bg-[#EBF2F8] px-[39px] py-6 gap-2"
//             >
//               <span className="w-[300px] text-black">{label}</span>
//               {file ? (
//                 <div className="flex items-center gap-4 ps-[52px]">
//                   <span className="text-gray-700 truncate w-[300px]">
//                     {file.fileName}
//                   </span>
//                   <img src="/pdf.svg" alt="PDF Icon" />
//                   <button
//                     onClick={() =>
//                       setPreview({
//                         show: true,
//                         fileUrl: `${url}${file.key}`,
//                         isImage: isImage(file.fileName),
//                       })
//                     }
//                     className="text-[#1982FE] cursor-pointer"
//                   >
//                     View
//                   </button>
//                   <button
//                     onClick={async () => {
//                       try {
//                         const response = await fetch(`${url}${file.key}`);
//                         const blob = await response.blob();
//                         const downloadUrl = window.URL.createObjectURL(blob);
//                         const link = document.createElement("a");
//                         link.href = downloadUrl;
//                         link.download = file.fileName;
//                         document.body.appendChild(link);
//                         link.click();
//                         link.remove();
//                       } catch {
//                         alert("Download failed.");
//                       }
//                     }}
//                     className="text-[#1982FE] cursor-pointer"
//                   >
//                     Download
//                   </button>
//                 </div>
//               ) : (
//                 <span className="text-[#FF0000] ps-10">Not Uploaded</span>
//               )}
//             </div>
//           );
//         })} */}
//         {/* <NurseFileSection
//         userId={nurseData.userId}
//         educationQualificationId={qualifications.id}

//   files={files}
//   qualifications={qualifications}
//   url={url}
//   setPreview={setPreview}
// />
//          */}

       
//       </div>

     
//     </div>
//   );
// }

// export default page;







"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";

export default function SupervisorApprovalDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const { supervisor, isLoading, error, getSupervisorDetails } =
    useSupervisorRegistrationStore();

  useEffect(() => {
    if (id) getSupervisorDetails(id);
  }, [id]);

  if (isLoading)
    return <p className="text-center text-lg font-semibold">Loading...</p>;

  if (error)
    return (
      <p className="text-center text-red-500 text-lg font-semibold">
        {error}
      </p>
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
        </div>

        <div className="flex flex-col text-black font-light gap-[18px] px-[39px] pb-[18px] border-b border-[#BBBBBB]">

          <div className="flex gap-[18px]">
            <span className="w-[280px]">Full Name</span>
            <span>{supervisor.fullName}</span>
          </div>

          <div className="flex gap-[18px]">
            <span className="w-[280px]">Gender</span>
            <span>{supervisor.gender}</span>
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
        </div>

        {/* LANGUAGES */}
        <div className="px-[39px] mt-4">
          <h1 className="text-[16px] font-semibold text-black py-[10px]">
            Languages
          </h1>

          <div className="flex gap-[18px]">
            <span className="w-[280px]">Languages</span>
            <span>
              {supervisor.languages?.map((l) => l.language).join(", ") ||
                "None"}
            </span>
          </div>
        </div>

        {/* EXPERIENCE DETAILS */}
        <div className="px-[39px] pt-[30px]">
          <h1 className="text-[16px] font-semibold text-black py-[10px]">
            Experience Details
          </h1>

          <div className="flex gap-[18px]">
            <span className="w-[280px]">Experienced?</span>
            <span>{supervisor.isExperienced ? "Yes" : "Fresher"}</span>
          </div>

          {supervisor.isExperienced && (
            <>
              <div className="flex gap-[18px] mt-2">
                <span className="w-[280px]">Years</span>
                <span>
                  {supervisor.yearsOfExperience}Yr {supervisor.monthsOfExperience}Mo
                </span>
              </div>

              <div className="flex gap-[18px] mt-2">
                <span className="w-[280px]">Department</span>
                <span>{supervisor.department || "N/A"}</span>
              </div>

              <div className="flex gap-[18px] mt-2">
                <span className="w-[280px]">Location</span>
                <span>{supervisor.mapLocation || "N/A"}</span>
              </div>
            </>
          )}
        </div>

        {/* SKILLS */}
        <div className="px-[39px] pt-[20px]">
          <h1 className="text-[16px] font-semibold text-black py-[10px]">
            Skills
          </h1>

          <div className="flex flex-col gap-[10px]">
            {supervisor.skills?.length > 0
              ? supervisor.skills.map((s) => (
                  <span key={s.id}>{s.skill}</span>
                ))
              : "No skills"}
          </div>
        </div>
      </div>
    </div>
  );
}
