// "use client";

// import React, { useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import useAgentStore from "@/app/lib/store/agentManagementStore";

// function Page() {
//   const router = useRouter();
//   const { id } = useParams();
//   const { agentDetails, loading, error, fetchAgentStaffReferralDetails } = useAgentStore();

//   useEffect(() => {
//     if (id) fetchAgentStaffReferralDetails(id);
//   }, [id, fetchAgentStaffReferralDetails]);

//   if (loading) {
//     return <div className="p-8 text-center">Loading...</div>;
//   }

//   if (error) {
//     return <div className="p-8 text-center text-red-600">{error}</div>;
//   }

//   return (
//     <div>
//       {/* Header */}
//       <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex">
//         <div
//           onClick={() => router.back()}
//           className="text-[16px] text-black border-r-2 border-[#F0F4F9] flex justify-center items-center px-[38px] cursor-pointer"
//         >
//           Back
//         </div>
//         <div className="w-full flex text-[16px] text-black justify-between items-center ps-[19px] pe-[73px]">
//           <p className="font-semibold">{agentDetails?.fullName || "-"}</p>
//         </div>
//       </div>

//       {/* Details */}
//       <div className="flex gap-16 p-8 bg-white rounded-[15px] border border-[#BBBBBB] mt-2">
//         <div className="flex flex-col gap-[10px] text-[16px] text-black">
//           <span>Full Name</span>
//           <span>Gender</span>
//           <span>DOB</span>
//           <span>Current Location (State)</span>
//           <span>District</span>
//           <span>Area / Location</span>
//           <span>Address (As per ID)</span>
//           <span>Email</span>
//           <span>Phone Number</span>
//           <span>Referral Type</span>
//         </div>
//         <div className="flex flex-col gap-[10px] text-[16px] text-black">
//           <span>{agentDetails?.fullName || "-"}</span>
//           <span>{agentDetails?.gender || "-"}</span>
//           <span>{agentDetails?.dob ? new Date(agentDetails.dob).toLocaleDateString() : "-"}</span>
//           <span>{agentDetails?.state || "-"}</span>
//           <span>{agentDetails?.district || "-"}</span>
//           <span>{agentDetails?.city || "-"}</span>
//           <span>
//             {agentDetails?.lineFirst || "-"} {agentDetails?.lineSecond || ""}
//           </span>
//           <span>{agentDetails?.email || "-"}</span>
//           <span>{agentDetails?.mobileNumber || "-"}</span>
//           <span>{agentDetails?.referralType || "-"}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;




// "use client";

// import React, { useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import useAgentStore from "@/app/lib/store/agentManagementStore";

// function Page() {
//   const router = useRouter();
//   const { id } = useParams();
//   const { agentDetails, loading, error, fetchAgentStaffReferralDetails } = useAgentStore();

//   useEffect(() => {
//     if (id) fetchAgentStaffReferralDetails(id);
//   }, [id, fetchAgentStaffReferralDetails]);

//   if (loading) {
//     return <div className="p-8 text-center">Loading...</div>;
//   }

//   if (error) {
//     return <div className="p-8 text-center text-red-600">{error}</div>;
//   }

//   if (!agentDetails) {
//     return <div className="p-8 text-center">No details found.</div>;
//   }

//   return (
//     <div>
//       {/* Header */}
//       <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex">
//         <div
//           onClick={() => router.back()}
//           className="text-[16px] text-black border-r-2 border-[#F0F4F9] flex justify-center items-center px-[38px] cursor-pointer"
//         >
//           Back
//         </div>
//         <div className="w-full flex text-[16px] text-black justify-between items-center ps-[19px] pe-[73px]">
//           <p className="font-semibold">{agentDetails?.fullName || "-"}</p>
//         </div>
//       </div>

//       {/* Details */}
//       <div className=" rounded-[15px] border border-[#BBBBBB] mt-2 text-black">
//         <div className="text-gray-500 bg-white p-3 ps-80 border-b border-[#BBBBBB] rounded-t-[15px] ">
//             {agentDetails?.createdAt
//               ? new Date(agentDetails.createdAt).toLocaleString()
//               : "-"}
//         </div>
//     <div className="flex gap-16 p-8 bg-white rounded-[15px]">
//             {/* Left Column */}
//         <div className="flex flex-col gap-[10px] text-[16px] font-medium">
          
//           <span>Agent Name</span>
//           <span>Type of Agent</span>
//           <span>Full Name</span>
//           <span>Gender</span>
//           <span>Date of Birth</span>
//           <span>Role</span>
//           <span>Email</span>
//           <span>Phone Number</span>
//           <span>Work Location</span>
//           <span>Experience Level</span>
//           <span>Qualification(s)</span>
//           <span>Specialization(s)</span>
//           <span>Work Schedule</span>
//           <span>Referral Status</span>
         
//         </div>

//         {/* Right Column */}
//         <div className="flex flex-col gap-[10px] text-[16px]">
//           <span>{agentDetails?.agentName || "-"}</span>
//           <span>{agentDetails?.typeOfAgent || "-"}</span>
//           <span>{agentDetails?.fullName || "-"}</span>
//           <span>{agentDetails?.gender || "-"}</span>
//           <span>
//             {agentDetails?.dob
//               ? new Date(agentDetails.dob).toLocaleDateString()
//               : "-"}
//           </span>
//           <span>{agentDetails?.role || "-"}</span>
//           <span>{agentDetails?.email || "-"}</span>
//           <span>{agentDetails?.mobileNumber || "-"}</span>
//           <span>{agentDetails?.workLocation || "-"}</span>
//           <span>{agentDetails?.experienceLevel || "-"}</span>

//           {/* Qualifications */}
//           <span>
//             {agentDetails?.qualifications?.length > 0
//               ? agentDetails.qualifications.map((q, i) => (
//                   <span key={i}>
//                     {q.qualification}
//                     {i < agentDetails.qualifications.length - 1 ? ", " : ""}
//                   </span>
//                 ))
//               : "-"}
//           </span>

//           {/* Specializations */}
//           <span>
//             {agentDetails?.specializations?.length > 0
//               ? agentDetails.specializations.map((s, i) => (
//                   <span key={i}>
//                     {s.specialization}
//                     {i < agentDetails.specializations.length - 1 ? ", " : ""}
//                   </span>
//                 ))
//               : "-"}
//           </span>

//           <span>{agentDetails?.workSchedule || "-"}</span>
//           <span>{agentDetails?.referralStatus || "-"}</span>
        
//         </div>
//     </div>
//       </div>
//     </div>
//   );
// }

// export default Page;









// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import useAgentStore from "@/app/lib/store/agentManagementStore";
// import ManageReferralPopup from "@/components/agentManagement/ManageReferralPopup";

// function Page() {
//   const router = useRouter();
//   const { id } = useParams();
//   const { agentDetails, loading, error, fetchAgentStaffReferralDetails } =
//     useAgentStore();

//   const [manageReferral, setManageReferral] = useState(false);
//   const [selectedReferral, setSelectedReferral] = useState(null);

//   useEffect(() => {
//     if (id) fetchAgentStaffReferralDetails(id);
//   }, [id, fetchAgentStaffReferralDetails]);

//   const handleManage = (referral) => {
//     setSelectedReferral(referral);
//     setManageReferral(true);
//   };

//   const handlePopupSuccess = () => {
//     setManageReferral(false);
//     // 🔁 Re-fetch updated data after managing
//     if (id) fetchAgentStaffReferralDetails(id);
//   };

//   if (loading) {
//     return <div className="p-8 text-center">Loading...</div>;
//   }

//   if (error) {
//     return <div className="p-8 text-center text-red-600">{error}</div>;
//   }

//   if (!agentDetails) {
//     return <div className="p-8 text-center">No details found.</div>;
//   }

//   return (
//     <div>
//       {/* Header */}
//       <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex">
//         <div
//           onClick={() => router.back()}
//           className="text-[16px] text-black border-r-2 border-[#F0F4F9] flex justify-center items-center px-[38px] cursor-pointer"
//         >
//           Back
//         </div>
//         <div className="w-full flex text-[16px] text-black justify-between items-center ps-[19px] pe-[73px]">
//           <p className="font-semibold">{agentDetails?.fullName || "-"}</p>
//         </div>
//       </div>

//       {/* Details */}
//       <div className="rounded-[15px] border border-[#BBBBBB] mt-2 text-black bg-white">
//         {/* Created At Header */}
//         <div className="text-gray-500 bg-white p-3 ps-80 border-b border-[#BBBBBB] rounded-t-[15px]">
//           {agentDetails?.createdAt
//             ? new Date(agentDetails.createdAt).toLocaleString()
//             : "-"}
//         </div>

//         {/* Content */}
//         <div className="flex gap-16 p-8 bg-white rounded-[15px]">
//           {/* Left Column */}
//           <div className="flex flex-col gap-[10px] text-[16px] font-medium">
//             <span>Agent Name</span>
//             <span>Type of Agent</span>
//             <span>Full Name</span>
//             <span>Gender</span>
//             <span>Date of Birth</span>
//             <span>Role</span>
//             <span>Email</span>
//             <span>Phone Number</span>
//             <span>Work Location</span>
//             <span>Experience Level</span>
//             <span>Qualification(s)</span>
//             <span>Specialization(s)</span>
//             <span>Work Schedule</span>
//             <span>Referral Status</span>
//           </div>

//           {/* Right Column */}
//           <div className="flex flex-col gap-[10px] text-[16px]">
//             <span>{agentDetails?.agentName || "-"}</span>
//             <span>{agentDetails?.typeOfAgent || "-"}</span>
//             <span>{agentDetails?.fullName || "-"}</span>
//             <span>{agentDetails?.gender || "-"}</span>
//             <span>
//               {agentDetails?.dob
//                 ? new Date(agentDetails.dob).toLocaleDateString()
//                 : "-"}
//             </span>
//             <span>{agentDetails?.role || "-"}</span>
//             <span>{agentDetails?.email || "-"}</span>
//             <span>{agentDetails?.mobileNumber || "-"}</span>
//             <span>{agentDetails?.workLocation || "-"}</span>
//             <span>{agentDetails?.experienceLevel || "-"}</span>

//             {/* Qualifications */}
//             <span>
//               {agentDetails?.qualifications?.length > 0
//                 ? agentDetails.qualifications.map((q, i) => (
//                     <span key={i}>
//                       {q.qualification}
//                       {i < agentDetails.qualifications.length - 1 ? ", " : ""}
//                     </span>
//                   ))
//                 : "-"}
//             </span>

//             {/* Specializations */}
//             <span>
//               {agentDetails?.specializations?.length > 0
//                 ? agentDetails.specializations.map((s, i) => (
//                     <span key={i}>
//                       {s.specialization}
//                       {i < agentDetails.specializations.length - 1 ? ", " : ""}
//                     </span>
//                   ))
//                 : "-"}
//             </span>

//             <span>{agentDetails?.workSchedule || "-"}</span>
//             <span>{agentDetails?.referralStatus || "-"}</span>
//           </div>
// </div>
//           {/* Manage Button */}
        
//             <button
//               className={`rounded-[15px] px-8 py-2 mx-6 cursor-pointer mb-4 ${
//                 agentDetails?.referralStatus?.toUpperCase() === "PENDING"
//                   ? "bg-[#3674B5] text-white hover:bg-[#19588f]"
//                   : "bg-gray-400 text-white cursor-not-allowed"
//               }`}
//               onClick={() => handleManage(agentDetails)}
//               disabled={
//                 agentDetails?.referralStatus?.toUpperCase() !== "PENDING"
//               }
//             >
//               Manage
//             </button>
          
       
//       </div>

//       {/* Manage Popup */}
//       {manageReferral && (
//         <ManageReferralPopup
//           referral={selectedReferral}
//           agentId={agentDetails?.agentId}
//           onClose={() => setManageReferral(false)}
//           onSubmitSuccess={handlePopupSuccess}
//         />
//       )}
//     </div>
//   );
// }

// export default Page;






"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ManageReferralPopup from "@/components/agentManagement/ManageReferralPopup";
import useReferralManagementStore from "@/app/lib/store/staffReferralStore";

function Page() {
  const router = useRouter();
  const { id } = useParams();

  // ✅ From referral management store
  const {
    referralDetails,
    loading,
    error,
    fetchAgentStaffReferralDetails,
  } = useReferralManagementStore();

  const [manageReferral, setManageReferral] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState(null);

  useEffect(() => {
    if (id) fetchAgentStaffReferralDetails(id);
  }, [id, fetchAgentStaffReferralDetails]);

  const handleManage = (referral) => {
    setSelectedReferral(referral);
    setManageReferral(true);
  };

  const handlePopupSuccess = () => {
    setManageReferral(false);
    if (id) fetchAgentStaffReferralDetails(id);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

  if (!referralDetails) {
    return <div className="p-8 text-center">No details found.</div>;
  }
  console.log(referralDetails);
  

  return (
    <div>
      {/* Header */}
      <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex">
        <div
          onClick={() => router.back()}
          className="text-[16px] text-black border-r-2 border-[#F0F4F9] flex justify-center items-center px-[38px] cursor-pointer"
        >
          Back
        </div>
        <div className="w-full flex text-[16px] text-black justify-between items-center ps-[19px] pe-[73px]">
          <p className="font-semibold">{referralDetails?.fullName || "-"}</p>
        </div>
      </div>

      {/* Details */}
      <div className="rounded-[15px] border border-[#BBBBBB] mt-2 text-black bg-white">
        {/* Created At Header */}
        <div className="text-gray-500 bg-white p-3 ps-80 border-b border-[#BBBBBB] rounded-t-[15px]">
          {referralDetails?.createdAt
            ? new Date(referralDetails.createdAt).toLocaleString()
            : "-"}
        </div>

        {/* Content */}
        <div className="flex gap-16 p-8 bg-white rounded-[15px]">
          {/* Left Column */}
          <div className="flex flex-col gap-[10px] text-[16px] font-medium">
            <span>Agent Name</span>
            <span>Type of Agent</span>
            <span>Full Name</span>
            <span>Gender</span>
            <span>Date of Birth</span>
            <span>Role</span>
            <span>Email</span>
            <span>Phone Number</span>
            <span>Work Location</span>
            <span>Experience Level</span>
            <span>Qualification(s)</span>
            <span>Specialization(s)</span>
            <span>Work Schedule</span>
            <span>Referral Status</span>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-[10px] text-[16px]">
            <span>{referralDetails?.agentName || "-"}</span>
            <span>{referralDetails?.typeOfAgent || "-"}</span>
            <span>{referralDetails?.fullName || "-"}</span>
            <span>{referralDetails?.gender || "-"}</span>
            <span>
              {referralDetails?.dob
                ? new Date(referralDetails.dob).toLocaleDateString()
                : "-"}
            </span>
            <span>{referralDetails?.role || "-"}</span>
            <span>{referralDetails?.email || "-"}</span>
            <span>{referralDetails?.mobileNumber || "-"}</span>
            <span>{referralDetails?.workLocation || "-"}</span>
            <span>{referralDetails?.experienceLevel || "-"}</span>

            {/* Qualifications */}
            <span>
              {referralDetails?.qualifications?.length > 0
                ? referralDetails.qualifications.map((q, i) => (
                    <span key={i}>
                      {q.qualification}
                      {i < referralDetails.qualifications.length - 1 ? ", " : ""}
                    </span>
                  ))
                : "-"}
            </span>

            {/* Specializations */}
            <span>
              {referralDetails?.specializations?.length > 0
                ? referralDetails.specializations.map((s, i) => (
                    <span key={i}>
                      {s.specialization}
                      {i < referralDetails.specializations.length - 1 ? ", " : ""}
                    </span>
                  ))
                : "-"}
            </span>

            <span>{referralDetails?.workSchedule || "-"}</span>
            <span>{referralDetails?.referralStatus || "-"}</span>
          </div>
        </div>

        {/* Manage Button */}
        <button
          className={`rounded-[15px] px-8 py-2 mx-6 cursor-pointer mb-4 ${
            referralDetails?.referralStatus?.toUpperCase() === "PENDING"
              ? "bg-[#3674B5] text-white hover:bg-[#19588f]"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
          onClick={() => handleManage(referralDetails)}
          disabled={
            referralDetails?.referralStatus?.toUpperCase() !== "PENDING"
          }
        >
          Manage
        </button>
      </div>

      {/* Manage Popup */}
      {manageReferral && (
        <ManageReferralPopup
          referral={selectedReferral}
          agentId={referralDetails?.agentId}
          onClose={() => setManageReferral(false)}
          onSubmitSuccess={handlePopupSuccess}
        />
      )}
    </div>
  );
}

export default Page;
