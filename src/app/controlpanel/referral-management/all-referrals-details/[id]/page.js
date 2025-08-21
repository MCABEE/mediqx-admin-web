"use client";

import ManageReferralPopup from "@/components/agentManagement/ManageReferralPopup";
import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import useAgentStore from "@/app/lib/store/agentManagementStore";
import Navlink from "@/components/referralManagement/Navlink";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const agentId = params?.id;

  // Set 'referrals' as default active tab
  const [activeTab, setActiveTab] = useState("referrals");

  const [manageReferral, setManageReferral] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [page, setPage] = useState(1);
  const [skipFetch, setSkipFetch] = useState(false);

  const limit = 20;

  const {
    fetchAgentReferrals,
    referrals,
    agentInfo,
    fetchAgentById,
    loading,
    error,
    totalPages = 1,
  } = useAgentStore();

  const [referralStatus, setReferralStatus] = useState("ALL");
  useEffect(() => {
    if (!agentId || skipFetch) return;

    if (activeTab === "referrals") {
      fetchAgentReferrals(agentId, page, limit, referralStatus);
    } else {
      fetchAgentById(agentId);
    }
  }, [
    agentId,
    activeTab,
    page,
    referralStatus,
    fetchAgentReferrals,
    fetchAgentById,
    skipFetch,
  ]);

  const handleTabClick = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      setPage(1); // Reset page when switching tabs
    }
  };

  const handleManage = (referral) => {
    setSelectedReferral(referral);
    setManageReferral(true);
  };

  const handlePopupSuccess = (updatedReferral) => {
    setManageReferral(false);

    if (updatedReferral) {
      // Don’t trigger fetch immediately after popup
      setSkipFetch(true);

      // Update store state locally
      useAgentStore.setState((prev) => ({
        referrals: prev.referrals.map((ref) =>
          ref.id === updatedReferral.id ? updatedReferral : ref
        ),
      }));

      // ✅ Reset skipFetch after short delay
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
          <p className="font-semibold">
            {agentInfo?.fullName || "Patient Name"}
          </p>
          <div className="flex justify-center items-center gap-[92px]"></div>
        </div>
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

      {/* Tabs */}
      <div className="bg-white rounded-[15px] p-4 px-6 flex gap-6 mt-2 cursor-pointer select-none">
        <h1
          onClick={() => setReferralStatus("ALL")}
          className={`font-semibold ${
            referralStatus === "ALL" ? "text-[#196BA5]" : "text-black"
          }`}
        >
          All
        </h1>
        <h1
          onClick={() => setReferralStatus("PENDING")}
          className={`font-semibold ${
            referralStatus === "PENDING" ? "text-[#196BA5]" : "text-black"
          }`}
        >
          Pending
        </h1>
        <h1
          onClick={() => setReferralStatus("CONFIRMED")}
          className={`font-semibold ${
            referralStatus === "CONFIRMED" ? "text-[#196BA5]" : "text-black"
          }`}
        >
          Confirmed
        </h1>
        <h1
          onClick={() => setReferralStatus("CANCELLED")}
          className={`font-semibold ${
            referralStatus === "CANCELLED" ? "text-[#196BA5]" : "text-black"
          }`}
        >
          Cancelled
        </h1>
      </div>

      {/* Referrals Tab */}
      {activeTab === "referrals" && (
        <div className="space-y-4 py-2 mt-2">
          {loading && <p className="px-4 py-2">Loading referrals...</p>}
          {error && <p className="px-4 py-2 text-red-600">{error}</p>}

          {!loading && !error && referrals?.length === 0 && (
            <p className="px-4 py-2">No referrals found.</p>
          )}

          {referrals.map((ref, idx) => (
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
                  <span>Type</span>
                  <span>Full Name</span>
                  <span>
                    {ref.referralType === "STAFF"
                      ? "Qualification"
                      : "Service Type"}
                  </span>
                  <span>Contact Number</span>
                  <span>Referral Status</span>
                </div>
                <div className="flex flex-col gap-[10px] text-[16px] text-black">
                  <span>{ref.referralType || "-"}</span>
                  <span>{ref.fullName || "-"}</span>
                  <span>{ref.qualificationOrService || "-"}</span>
                  <span>{ref.contactNumber || "-"}</span>
                  <span
                    className={`text-[16px]font-thin  ${
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
                className={`rounded-[15px] px-8 py-2 mx-6 cursor-pointer mb-4 
    ${
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
        <ManageReferralPopup
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
