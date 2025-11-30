// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import useReferralManagementStore from "@/app/lib/store/staffReferralStore";
// import ManagePatientReferralPopup from "@/components/agentManagement/ManagePatientReferralPopup";


// function Page() {
//   const router = useRouter();
//   const { id } = useParams();

//   // ✅ From referral management store
//   const {
//     patientReferralDetails,
//     loading,
//     error,
//     fetchAgentPatientReferralDetails,
//   } = useReferralManagementStore();

//   const [manageReferral, setManageReferral] = useState(false);
//   const [selectedReferral, setSelectedReferral] = useState(null);

//   useEffect(() => {
//     if (id) fetchAgentPatientReferralDetails(id);
//   }, [id, fetchAgentPatientReferralDetails]);

//   const handleManage = (referral) => {
//     setSelectedReferral(referral);
//     setManageReferral(true);
//   };

//   const handlePopupSuccess = () => {
//     setManageReferral(false);
//     if (id) fetchAgentPatientReferralDetails(id);
//   };

//   if (loading) {
//     return <div className="p-8 text-center">Loading...</div>;
//   }

//   if (error) {
//     return <div className="p-8 text-center text-red-600">{error}</div>;
//   }

//   if (!patientReferralDetails) {
//     return <div className="p-8 text-center">No details found.</div>;
//   }

//   const referral = patientReferralDetails;

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
//           <p className="font-semibold">{referral?.fullName || "-"}</p>
//         </div>
//       </div>

//       {/* Details */}
//       <div className="rounded-[15px] border border-[#BBBBBB] mt-2 text-black bg-white">
//         {/* Created At Header */}
//         <div className="text-gray-500 bg-white p-3 ps-80 border-b border-[#BBBBBB] rounded-t-[15px]">
//           {referral?.createdAt
//             ? new Date(referral.createdAt).toLocaleString()
//             : "-"}
//         </div>

//         {/* Content */}
//         <div className="flex gap-16 p-8 bg-white rounded-[15px]">
//           {/* Left Column */}
//           <div className="flex flex-col gap-[10px] text-[16px] font-medium">
//             <span>Agent Name</span>
//             <span>Type of Agent</span>
//             <span>Patient Name</span>
//             <span>Gender</span>
//             <span>Date of Birth</span>
//             <span>Email</span>
//             <span>Phone Number</span>
//             <span>Address</span>
//             <span>State</span>
//             <span>District</span>
//             <span>City</span>
//             <span>Pincode</span>
//             <span>Referral Status</span>
//           </div>

//           {/* Right Column */}
//           <div className="flex flex-col gap-[10px] text-[16px]">
//             <span>{referral?.agentName || "-"}</span>
//             <span>{referral?.typeOfAgent || "-"}</span>
//             <span>{referral?.fullName || "-"}</span>
//             <span>{referral?.gender || "-"}</span>
//             <span>
//               {referral?.dob
//                 ? new Date(referral.dob).toLocaleDateString()
//                 : "-"}
//             </span>
//             <span>{referral?.email || "-"}</span>
//             <span>{referral?.mobileNumber || "-"}</span>
//             <span>{referral?.address || "-"}</span>
//             <span>{referral?.state || "-"}</span>
//             <span>{referral?.district || "-"}</span>
//             <span>{referral?.city || "-"}</span>
//             <span>{referral?.pincode || "-"}</span>
//             <span>{referral?.referralStatus || "-"}</span>
//           </div>
//         </div>

//         {/* Manage Button */}
//         <button
//           className={`rounded-[15px] px-8 py-2 mx-6 cursor-pointer mb-4 ${
//             referral?.referralStatus?.toUpperCase() === "PENDING"
//               ? "bg-[#3674B5] text-white hover:bg-[#19588f]"
//               : "bg-gray-400 text-white cursor-not-allowed"
//           }`}
//           onClick={() => handleManage(referral)}
//           disabled={referral?.referralStatus?.toUpperCase() !== "PENDING"}
//         >
//           Manage
//         </button>
//       </div>

//       {/* Manage Popup */}
//       {manageReferral && (
//         <ManagePatientReferralPopup
//           referral={selectedReferral}
//           agentId={referral?.agentId}
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
import useReferralManagementStore from "@/app/lib/store/staffReferralStore";
import ManagePatientReferralPopup from "@/components/agentManagement/ManagePatientReferralPopup";


function Page() {
  const router = useRouter();
  const { id } = useParams();

  const {
    patientReferralDetails,
    loading,
    error,
    fetchAgentPatientReferralDetails,
  } = useReferralManagementStore();

  const [manageReferral, setManageReferral] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState(null);

  useEffect(() => {
    if (id) fetchAgentPatientReferralDetails(id);
  }, [id, fetchAgentPatientReferralDetails]);

  const handleManage = (referral) => {
    setSelectedReferral(referral);
    setManageReferral(true);
  };

  const handlePopupSuccess = () => {
    setManageReferral(false);
    if (id) fetchAgentPatientReferralDetails(id);
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!patientReferralDetails)
    return <div className="p-8 text-center">No details found.</div>;

  const referral = patientReferralDetails;

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
          <p className="font-semibold">{referral?.patientName || "-"}</p>
        </div>
      </div>

      {/* Details */}
      <div className="rounded-[15px] border border-[#BBBBBB] mt-2 text-black bg-white">
        {/* Created At */}
        <div className="text-gray-500 bg-white p-3 ps-80 border-b border-[#BBBBBB] rounded-t-[15px]">
          {referral?.createdAt
            ? new Date(referral.createdAt).toLocaleString()
            : "-"}
        </div>

        {/* Info Section */}
        <div className="flex gap-16 p-8 bg-white rounded-[15px]">
          {/* Left Column */}
          <div className="flex flex-col gap-[10px] text-[16px] font-medium">
            <span>Agent Name</span>
            <span>Type of Agent</span>
            <span>Patient Name</span>
            <span>Gender</span>
            <span>Age</span>
            <span>Height (cm)</span>
            <span>Weight (kg)</span>
            <span>Service Type</span>
            <span>Staff Gender Preference</span>
            <span>Languages</span>
            <span>Service Start Date</span>
            <span>Address</span>
            <span>Pincode</span>
            <span>Contact Person Name</span>
            <span>Relationship with Patient</span>
            <span>Email</span>
            <span>Mobile Number</span>
            <span>Current Health Status</span>
            <span>Diagnosis</span>
            <span>Referral Status</span>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-[10px] text-[16px]">
            <span>{referral?.agentName || "-"}</span>
            <span>{referral?.typeOfAgent || "-"}</span>
            <span>{referral?.patientName || "-"}</span>
            <span>{referral?.gender || "-"}</span>
            <span>{referral?.age || "-"}</span>
            <span>{referral?.height || "-"}</span>
            <span>{referral?.weight || "-"}</span>
            <span>{referral?.serviceType || "-"}</span>
            <span>{referral?.staffGender || "-"}</span>

            {/* Languages */}
            <span>
              {referral?.languagesdetails?.length > 0
                ? referral.languagesdetails.map((l, i) => (
                    <span key={i}>
                      {l.language}
                      {i < referral.languagesdetails.length - 1 ? ", " : ""}
                    </span>
                  ))
                : "-"}
            </span>

            <span>
              {referral?.serviceStartDate
                ? new Date(referral.serviceStartDate).toLocaleDateString()
                : "-"}
            </span>
            <span>{referral?.address || "-"}</span>
            <span>{referral?.pincode || "-"}</span>
            <span>{referral?.contactPersonName || "-"}</span>
            <span>{referral?.relationshipWithPatient || "-"}</span>
            <span>{referral?.email || "-"}</span>
            <span>{referral?.mobileNumber || "-"}</span>
            <span>{referral?.currentHealthStatus || "-"}</span>
            <span>{referral?.diagnosis || "-"}</span>
            <span>{referral?.referralStatus || "-"}</span>
          </div>
        </div>

        {/* Manage Button */}
        <button
          className={`rounded-[15px] px-8 py-2 mx-6 cursor-pointer mb-4 ${
            referral?.referralStatus?.toUpperCase() === "PENDING"
              ? "bg-[#3674B5] text-white hover:bg-[#19588f]"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
          onClick={() => handleManage(referral)}
          disabled={referral?.referralStatus?.toUpperCase() !== "PENDING"}
        >
          Manage
        </button>
      </div>

      {/* Manage Popup */}
      {manageReferral && (
        <ManagePatientReferralPopup
          referral={selectedReferral}
          agentId={referral?.agentId}
          onClose={() => setManageReferral(false)}
          onSubmitSuccess={handlePopupSuccess}
        />
      )}
    </div>
  );
}

export default Page;
