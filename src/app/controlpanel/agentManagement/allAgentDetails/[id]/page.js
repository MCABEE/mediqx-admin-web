"use client";

import ManageReferralPopup from "@/components/agentManagement/ManageReferralPopup";
import Navlink from "@/components/agentManagement/Navlink";
import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import useAgentStore from "@/app/lib/store/agentManagementStore";
import ManagePatientReferralPopup from "@/components/agentManagement/ManagePatientReferralPopup";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const agentId = params?.id;

  // Default active tab: Profile
  const [activeTab, setActiveTab] = useState("profile");
  const [manageReferral, setManageReferral] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [page, setPage] = useState(1);
  const [skipFetch, setSkipFetch] = useState(false);

  const limit = 20;

  const {
    fetchAgentReferrals,
    fetchAgentPatientReferrals,
    referrals,
    referralsPatient,
    agentInfo,
    agentDetails,
    fetchAgentById,
    loading,
    error,
    totalPages = 1,
  } = useAgentStore();

  useEffect(() => {
    if (!agentId || skipFetch) return;

    if (activeTab === "profile") {
      fetchAgentById(agentId);
    } else if (activeTab === "staffReferrals") {
      fetchAgentReferrals(agentId, page, limit);
    } else if (activeTab === "patientReferrals") {
      fetchAgentPatientReferrals(agentId, page, limit);
    }
  }, [agentId, activeTab, page, skipFetch]);

  const handleTabClick = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      setPage(1);
    }
  };

  const handleManage = (referral) => {
    setSelectedReferral(referral);
    setManageReferral(true);
  };

  const handlePopupSuccess = (updatedReferral) => {
    setManageReferral(false);

    if (updatedReferral) {
      setSkipFetch(true);

      // Update store state locally
      if (activeTab === "staffReferrals") {
        useAgentStore.setState((prev) => ({
          referrals: prev.referrals.map((ref) =>
            ref.id === updatedReferral.id ? updatedReferral : ref,
          ),
        }));
      } else if (activeTab === "patientReferrals") {
        useAgentStore.setState((prev) => ({
          patientReferrals: prev.patientReferrals.map((ref) =>
            ref.id === updatedReferral.id ? updatedReferral : ref,
          ),
        }));
      }

      setTimeout(() => setSkipFetch(false), 300);
    }
  };

  return (
    <div className="pb-4">
      <Navlink />

      {/* Header */}
      <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex ">
        <div
          onClick={() => router.back()}
          className="text-[16px] text-black border-r-2 border-[#F0F4F9] flex justify-center items-center px-[38px] cursor-pointer"
        >
          Back
        </div>
        <div className="w-full flex text-[16px] text-black justify-between items-center ps-[19px] pe-[73px]">
          <p className="font-semibold">{agentInfo?.fullName || "-"}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-[15px] border border-[#BBBBBB] p-6 mt-2 flex justify-between">
        {/* <div className="flex gap-4">
          <h1 className="text-black font-semibold text-[16px]">REFERRAL CODE:</h1>
          <p className="text-black font-semibold text-[16px]">{agentInfo?.referralCode || "-"}</p>
        </div> */}
        {/* <div className="flex gap-4">
          <div className="flex gap-2">
            <h1 className="text-black font-semibold text-[16px]">REFERRALS:</h1>
            <p className="text-black font-semibold text-[16px]">{agentInfo?.referralCount ?? 0}</p>
          </div>
          <div className="flex gap-2">
            <h1 className="text-black font-semibold text-[16px]">CONFIRMED:</h1>
            <p className="text-black font-semibold text-[16px]">{agentInfo?.confirmedReferralCount ?? 0}</p>
          </div>
        </div> */}
        {activeTab !== "profile" && (
          <>
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
                <h1 className="text-black font-semibold text-[16px]">
                  REFERRALS:
                </h1>
                <p className="text-black font-semibold text-[16px]">
                  {agentInfo?.referralCount ?? 0}
                </p>
              </div>
              <div className="flex gap-2">
                <h1 className="text-black font-semibold text-[16px]">
                  CONFIRMED:
                </h1>
                <p className="text-black font-semibold text-[16px]">
                  {agentInfo?.confirmedReferralCount ?? 0}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-[15px] p-4 px-6 flex gap-6 mt-2 cursor-pointer select-none">
        <h1
          className={`font-semibold ${activeTab === "profile" ? "text-[#196BA5]" : "text-black"}`}
          onClick={() => handleTabClick("profile")}
        >
          Profile
        </h1>
        <h1
          className={`font-semibold ${activeTab === "staffReferrals" ? "text-[#196BA5]" : "text-black"}`}
          onClick={() => handleTabClick("staffReferrals")}
        >
          Staff Referrals
        </h1>
        <h1
          className={`font-semibold ${activeTab === "patientReferrals" ? "text-[#196BA5]" : "text-black"}`}
          onClick={() => handleTabClick("patientReferrals")}
        >
          Patient Referrals
        </h1>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <>
          <div className="flex gap-16 p-8 bg-white rounded-[15px] border border-[#BBBBBB] mt-2">
            <div className="flex flex-col gap-[10px] text-[16px] text-black">
              <span>Full Name</span>
              <span>Gender</span>
              <span>DOB</span>
              <span>Current Location (state)</span>
              <span>District</span>
              <span>Area / Location</span>
              <span>Address (As per ID)</span>
              <span>Email</span>
              <span>Phone Number</span>
              <span>Referral Type</span>
            </div>
            <div className="flex flex-col gap-[10px] text-[16px] text-black">
              <span>{agentDetails?.fullName || "-"}</span>
              <span>{agentDetails?.gender || "-"}</span>
              <span>
                {agentDetails?.dob
                  ? new Date(agentDetails.dob).toLocaleDateString()
                  : "-"}
              </span>
              <span>{agentDetails?.state || "-"}</span>
              <span>{agentDetails?.district || "-"}</span>
              <span>{agentDetails?.city || "-"}</span>
              <span>
                {agentDetails?.lineFirst || "-"}{" "}
                {agentDetails?.lineSecond || ""}
              </span>
              <span>{agentDetails?.email || "-"}</span>
              <span>{agentDetails?.mobileNumber || "-"}</span>
              <span>{agentDetails?.referralType || "-"}</span>
            </div>
          </div>
          {/* ID Proof */}
          <div className="bg-white rounded-[15px] border border-[#BBBBBB] mt-4">
            <div className="w-full h-[52px] flex items-center border-b px-8 rounded-t-[15px] border-[#BBBBBB]">
              <h1 className="text-[16px] font-semibold text-black">ID Proof</h1>
            </div>
            <div className="p-8">
              {agentDetails?.idProof ? (
                <img
                  src={`https://dev-nurse-docs.s3.ap-south-1.amazonaws.com/${agentDetails.idProof}`}
                  alt="idproof"
                  className="max-w-xs max-h-64 rounded shadow"
                />
              ) : (
                <img
                  src="/no-image.png"
                  alt="No ID Proof"
                  className="max-w-xs max-h-64 opacity-60"
                />
              )}
            </div>
          </div>

          {/* Agent Photo */}
          <div className="bg-white rounded-[15px] border border-[#BBBBBB] mt-4">
            <div className="w-full h-[52px] flex items-center border-b px-8 rounded-t-[15px] border-[#BBBBBB]">
              <h1 className="text-[16px] font-semibold text-black">
                Agent - Photo
              </h1>
            </div>
            <div className="p-8">
              {agentDetails?.passportImage ? (
                <img
                  src={`https://dev-nurse-docs.s3.ap-south-1.amazonaws.com/${agentDetails.passportImage}`}
                  alt="photo"
                  className="max-w-xs max-h-64 rounded shadow"
                />
              ) : (
                <img
                  src="/no-image.png"
                  alt="No Photo"
                  className="max-w-xs max-h-64 opacity-60"
                />
              )}
            </div>
          </div>
        </>
      )}

      {/* Staff Referrals Tab */}
      {activeTab === "staffReferrals" && (
        <div className="space-y-4 py-2 mt-2">
          {loading && <p className="px-4 py-2">Loading referrals...</p>}
          {error && <p className="px-4 py-2 text-red-600">{error}</p>}
          {!loading && !error && referrals?.length === 0 && (
            <p className="px-4 py-2">No referrals found.</p>
          )}

          {referrals?.map((ref, idx) => (
            <div
              key={ref.id}
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
                  <span>Full Name</span>
                  <span>Gender</span>
                  <span>DOB</span>
                  <span>Contact Number</span>
                  <span>Email ID</span>
                  <span>Qualification</span>
                  <span>Specialization</span>
                  <span>Experience Level</span>
                  <span>Work Schedule</span>
                  <span>Language</span>
                  <span>Work Location</span>
                  <span>Referral Status</span>
                </div>
                <div className="flex flex-col gap-[10px] text-[16px] text-black">
                  <span>{ref.fullName || "-"}</span>
                  <span>{ref.gender || "-"}</span>
                  <span>
                    {ref.dob
                      ? new Date(ref.dob).toLocaleDateString("en-GB")
                      : "-"}
                  </span>
                  <span>{ref.mobileNumber || "-"}</span>
                  <span>{ref.email || "-"}</span>
                  <span>{ref?.qualifications?.[0]?.qualification || "-"}</span>
                  <span>
                    {ref?.specializations?.[0]?.specialization || "-"}
                  </span>
                  <span>{ref.experienceLevel || "-"}</span>
                  <span>{ref.workSchedule || "-"}</span>
                  <span>
                    {ref.languagesdetails
                      ?.map((lang) => lang.language)
                      .join(", ") || "-"}
                  </span>
                  <span>{ref.workLocation || "-"}</span>
                  <span
                    className={`text-[16px] ${ref.referralStatus?.toUpperCase() === "CONFIRMED" ? "text-green-600" : ref.referralStatus?.toUpperCase() === "CANCELLED" ? "text-red-600" : "text-blue-600"}`}
                  >
                    {ref.referralStatus || "-"}
                  </span>
                </div>
              </div>

              {/* <button
                className={`rounded-[15px] px-8 py-2 mx-6 cursor-pointer mb-4 ${ref.referralStatus?.toUpperCase() === "PENDING" ? "bg-[#3674B5] text-white hover:bg-[#19588f]" : "bg-gray-400 text-white cursor-not-allowed"}`}
                onClick={() => handleManage(ref)}
                disabled={ref.referralStatus?.toUpperCase() !== "PENDING"}
              >
                Manage
              </button> */}
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
                  totalPages ? Math.min(p + 1, totalPages) : p + 1,
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

      {/* Patient Referrals Tab */}
      {activeTab === "patientReferrals" && (
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
                  <span>Contact Person</span>
                  <span>Relationship</span>
                  <span>Mobile Number</span>
                  <span>Service Type</span>
                  <span>Current Health Status</span>
                  <span>Diagnosis</span>
                  <span>Service Start Date</span>
                  <span>Referral Status</span>
                </div>
                <div className="flex flex-col gap-[10px] text-[16px] text-black">
                  <span>{ref.patientName || "-"}</span>
                  <span>{ref.gender || "-"}</span>
                  <span>{ref.age || "-"}</span>
                  <span>{ref.height || "-"}</span>
                  <span>{ref.weight || "-"}</span>
                  <span>{ref.email || "-"}</span>
                  <span>{ref.nowPatientStayedAt || "-"}</span>
                  <span>{ref.contactPersonName || "-"}</span>
                  <span>{ref.relationshipWithPatient || "-"}</span>
                  <span>{ref.mobileNumber || "-"}</span>
                  <span>{ref.serviceType || "-"}</span>
                  <span>{ref.currentHealthStatus || "-"}</span>
                  <span>{ref.diagnosis || "-"}</span>
                  <span>
                    {ref.serviceStartDate
                      ? new Date(ref.serviceStartDate).toLocaleDateString(
                          "en-GB",
                        )
                      : "-"}
                  </span>
                  <span
                    className={`text-[16px] ${ref.referralStatus?.toUpperCase() === "CONFIRMED" ? "text-green-600" : ref.referralStatus?.toUpperCase() === "CANCELLED" ? "text-red-600" : "text-blue-600"}`}
                  >
                    {ref.referralStatus || "-"}
                  </span>
                </div>
              </div>

              {/* <button
                className={`rounded-[15px] px-8 py-2 mx-6 cursor-pointer mb-4 ${ref.referralStatus?.toUpperCase() === "PENDING" ? "bg-[#3674B5] text-white hover:bg-[#19588f]" : "bg-gray-400 text-white cursor-not-allowed"}`}
                onClick={() => handleManage(ref)}
                disabled={ref.referralStatus?.toUpperCase() !== "PENDING"}
              >
                Manage
              </button> */}
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
                  totalPages ? Math.min(p + 1, totalPages) : p + 1,
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

      {/* {manageReferral && activeTab === "staffReferrals" && (
  <ManageReferralPopup
    referral={selectedReferral}
    agentId={agentId}
    onClose={() => setManageReferral(false)}
    onSubmitSuccess={handlePopupSuccess}
  />
)}

{manageReferral && activeTab === "patientReferrals" && (
  <ManagePatientReferralPopup
    referral={selectedReferral}
    agentId={agentId}
    onClose={() => setManageReferral(false)}
    onSubmitSuccess={handlePopupSuccess}
  />
)} */}
    </div>
  );
};

export default Page;
