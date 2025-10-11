"use client";

import ManageReferralPopup from "@/components/agentManagement/ManageReferralPopup";
import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import useAgentStore from "@/app/lib/store/agentManagementStore";
import Navlink from "@/components/referralManagement/Navlink";
import Link from "next/link";
import ManagePatientReferralPopup from "@/components/agentManagement/ManagePatientReferralPopup";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const agentId = params?.id;

  const [activeTab, setActiveTab] = useState("referrals");
  const [manageReferral, setManageReferral] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [page, setPage] = useState(1);
  const [skipFetch, setSkipFetch] = useState(false);
  const [referralStatus, setReferralStatus] = useState("ALL");

  const limit = 20;

  const {
    fetchAgentPatientReferrals,
    referralsPatient,
    agentInfo,
    fetchAgentById,
    loading,
    error,
    updateAgentPatientReferralStatus,
    totalPages = 1,
    referral 
  } = useAgentStore();

  useEffect(() => {
    if (!agentId || skipFetch) return;

    if (activeTab === "referrals") {
      fetchAgentPatientReferrals(agentId, page, limit, referralStatus);
    } else {
      fetchAgentById(agentId);
    }
  }, [
    agentId,
    activeTab,
    page,
    referralStatus,
    fetchAgentPatientReferrals,
    fetchAgentById,
    skipFetch,
  ]);

  const handleManage = (referral) => {
    setSelectedReferral(referral);
    setManageReferral(true);
  };
// const handlePopupSuccess = async (newStatus) => {
//   try {
//     const result = await updateAgentPatientReferralStatus(
//       referral.id, // ✅ referral ID
//       newStatus,
//       referral.referralSignupStaffId // optional
//     );

//     if (result.success) {
//       onSubmitSuccess({ ...referral, referralStatus: newStatus });
//     }
//   } catch (err) {
//     console.error(err.message);
//     // alert(err.message);
//   }
// };
const handlePopupSuccess = async (updatedReferral) => {
  // Close the popup
  setManageReferral(false);

  // Optionally update local state immediately
//   setReferralsPatient((prev) =>
//     prev.map((r) => (r.id === updatedReferral.id ? updatedReferral : r))
//   );

  // Refetch the latest referrals from API
  if (agentId) {
    await fetchAgentPatientReferrals(agentId, page, limit, referralStatus);
  }
};

  return (
    <div className="pb-4">
      <Navlink />
<div className="w-full h-[48px] bg-[#C0D8F6] my-2 rounded-[15px] flex">
        <Link
          href={"/controlpanel/referral-management/all-referrals"}
          className="text-[16px] text-black border-r-2 border-[#F0F4F9] flex justify-center items-center px-[38px] cursor-pointer"
        >
          Back
        </Link>
        <div className="w-full flex text-[16px] text-black justify-between items-center ps-[19px] pe-[73px]">
          <p className="font-semibold">{agentInfo?.fullName || "Agent Name"}</p>
        </div>
      </div>
      {/* Top Tabs */}
      <div className="w-full bg-white border border-[#888888] text-base text-black font-semibold flex gap-[72px] px-6 pt-6 rounded-[15px] mt-2">
        <Link
          href={`/controlpanel/referral-management/all-referrals-details/${agentId}`}
          className="h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4"
        >
          Staff Referrals
        </Link>
        <h1 className="h-full box-border flex justify-center items-center text-base text-[#3674B5] px-2 pb-4">
          Patient Referrals
        </h1>
      </div>

    
      

      {/* Stats */}
      <div className="bg-white rounded-[15px] border border-[#BBBBBB] p-6 mt-2 flex justify-between">
        <div className="flex gap-4">
          <h1 className="text-black font-semibold text-[16px]">
            REFERRAL CODE:
          </h1>
          <p className="text-black font-semibold text-[16px]">
            {agentInfo?.referralCode || "-"}
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-2">
            <h1 className="text-black font-semibold text-[16px]">REFERRALS:</h1>
            <p className="text-black font-semibold text-[16px]">
              {agentInfo?.referralCount ?? 0}
            </p>
          </div>
          <div className="flex gap-2">
            <h1 className="text-black font-semibold text-[16px]">CONFIRMED:</h1>
            <p className="text-black font-semibold text-[16px]">
              {agentInfo?.confirmedReferralCount ?? 0}
            </p>
          </div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="bg-white rounded-[15px] p-4 px-6 flex gap-6 mt-2 cursor-pointer select-none">
        {["ALL", "PENDING", "CONFIRMED", "CANCELLED"].map((status) => (
          <h1
            key={status}
            onClick={() => setReferralStatus(status)}
            className={`font-semibold ${
              referralStatus === status ? "text-[#196BA5]" : "text-black"
            }`}
          >
            {status.charAt(0) + status.slice(1).toLowerCase()}
          </h1>
        ))}
      </div>

      {/* Patient Referrals */}
      {activeTab === "referrals" && (
        <div className="space-y-4 py-2 mt-2">
          {loading && <p className="px-4 py-2">Loading referrals...</p>}
          {error && <p className="px-4 py-2 text-red-600">{error}</p>}

          {!loading && !error && referralsPatient?.length === 0 && (
            <p className="px-4 py-2">No referrals found.</p>
          )}

          {referralsPatient?.map((ref, idx) => (
            <div
              key={ref.id || `ref-${idx}`}
              className="mb-6 bg-white border border-[#BBBBBB] rounded-[15px]"
            >
              <div className="flex border-b border-[#BBBBBB] py-2 w-full px-4 gap-40">
                <div className="bg-[#C0D8F6] rounded-[4px] p-2 font-semibold text-black">
                  {(page - 1) * 10 + idx + 1}
                </div>
                <p className="text-[#666666] flex items-center">
                  {new Date(ref.createdAt).toLocaleString() || ""}
                </p>
              </div>

              <div className="flex p-6 gap-16">
                <div className="flex flex-col gap-[10px] text-[16px] text-black">
                  <span>Patient Name</span>
                  <span>Gender</span>
                  <span>Age</span>
                  <span>Height</span>
                  <span>Weight</span>
                  <span>Email</span>
                  <span>Now patient Stay at</span>
                  {/* <span>Address</span> */}
                  <span>Contact Person</span>
                  <span>Relationship</span>
                  <span>Mobile Number</span>
                  <span>Service Type</span>
                  <span>Current Health Status</span>
                  <span>Diagnosis</span>
                  <span>Service Start Date</span>
                  {/* <span>Language</span> */}
                  <span>Referral Status</span>
                </div>

                <div className="flex flex-col gap-[10px] text-[16px] text-black">
                  <span>{ref.patientName || "-"}</span>
                  <span>{ref.gender || "-"}</span>
                  <span> {ref.age || "-"} </span>
                  <span>{ref.height || "-"}</span>
                  <span>{ref.weight || "-"}</span>
                  <span>{ref.email || "-"}</span>
                  <span>{ref.nowPatientStayedAt || "-"}</span>
                  {/* <span>{ref.address || "-"}</span> */}
                  <span>{ref.contactPersonName || "-"}</span>
                  <span>{ref.relationshipWithPatient || "-"}</span>
                  <span>{ref.mobileNumber || "-"}</span>
                  <span>{ref.serviceType || "-"}</span>
                  <span>{ref.currentHealthStatus || "-"}</span>
                  <span>{ref.diagnosis || "-"}</span>
                  <span>
                    {ref.serviceStartDate
                      ? new Date(ref.serviceStartDate).toLocaleDateString(
                          "en-GB"
                        )
                      : "-"}
                  </span>
                  {/* <span>
                    {ref.languagesdetails?.map((l) => l.language).join(", ") ||
                      "-"}
                  </span> */}
                  <span
                    className={`text-[16px]  ${
                      ref.referralStatus?.toUpperCase() === "CONFIRMED"
                        ? "text-green-600"
                        : ref.referralStatus?.toUpperCase() === "CANCELLED"
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {ref.referralStatus || "-"}
                  </span>
                </div>
              </div>

              <button
                className={`rounded-[15px] px-8 py-2 mx-6 cursor-pointer mb-4 ${
                  ref.referralStatus?.toUpperCase() === "PENDING"
                    ? "bg-[#3674B5] text-white hover:bg-[#19588f]"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
                onClick={() => handleManage(ref)}
                disabled={ref.referralStatus?.toUpperCase() !== "PENDING"}
              >
                Manage
              </button>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex items-center justify-between gap-4 mt-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="flex items-center px-2 font-semibold">
              Page {page} of {totalPages || 1}
            </span>
            <button
              onClick={() =>
                setPage((p) =>
                  totalPages ? Math.min(p + 1, totalPages) : p + 1
                )
              }
              disabled={page === totalPages}
              className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {manageReferral && (
        <ManagePatientReferralPopup
          referral={selectedReferral}
          agentId={agentId}
          onClose={() => setManageReferral(false)}
          onSubmitSuccess={handlePopupSuccess}
        />
      )}
    </div>
  );
};

export default Page;
