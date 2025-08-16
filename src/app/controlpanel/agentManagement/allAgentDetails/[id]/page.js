"use client";
import ManageReferralPopup from "@/components/agentManagement/ManageReferralPopup";
import Navlink from "@/components/agentManagement/Navlink";
import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import useAgentStore from "@/app/lib/store/agentManagementStore";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const agentId = params?.id;

  // Set 'referrals' as default active tab
  const [activeTab, setActiveTab] = useState("referrals");

  const [manageReferral, setManageReferral] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [page, setPage] = useState(1);

  const {
    fetchAgentReferrals,
    referrals,
    agentInfo,
    agentDetails,
    fetchAgentById,
    loading,
    error,
    totalPages = 1,
  } = useAgentStore();

  console.log("Referral list", referrals);

  useEffect(() => {
    if (agentId) {
      if (activeTab === "referrals") {
        fetchAgentReferrals(agentId, page, 10);
      } else {
        fetchAgentById(agentId);
      }
    }
  }, [agentId, activeTab, page, fetchAgentReferrals, fetchAgentById]);

  const handleTabClick = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      setPage(1); // Reset page when switching to referrals
    }
  };

  const handleManage = (referral) => {
    console.log("Selected referral ID:", referral.id);
    setSelectedReferral(referral);
    setManageReferral(true);
  };

  return (
    <div className="pb-4">
      <Navlink />

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
          className={`font-semibold ${
            activeTab === "profile"
              ? "text-[#196BA5] font-semibold"
              : "text-black font-semibold"
          }`}
          onClick={() => handleTabClick("profile")}
        >
          Profile
        </h1>
        <h1
          className={`font-semibold ${
            activeTab === "referrals"
              ? "text-[#196BA5] font-semibold"
              : "text-black font-semibold"
          }`}
          onClick={() => handleTabClick("referrals")}
        >
          Referrals
        </h1>
      </div>

      {/* Tab content */}
      {activeTab === "profile" && (
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
              {agentDetails?.lineFirst || "-"} {agentDetails?.lineSecond || ""}
            </span>
            <span>{agentDetails?.email || "-"}</span>
            <span>{agentDetails?.mobileNumber || "-"}</span>
            <span>{agentDetails?.referralType || "-"}</span>
          </div>
        </div>
      )}

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
                  {new Date(ref.createdAt).toLocaleString() ||
                    "16 Aug 2025, 10:24 AM"}
                </p>
              </div>

              <div className="flex p-6 gap-16">
                <div className="flex flex-col gap-[10px] text-[16px] text-black">
                  <span className="text-[16px] text-black">Type</span>
                  <span className="text-[16px] text-black">Full Name</span>
                  <span className="text-[16px] text-black">Qualification</span>
                  <span className="text-[16px] text-black">Contact Number</span>
                  <span className="text-[16px] text-black">
                    Referral Status
                  </span>
                  <span className="text-[16px] text-black">Referral Name</span>
                </div>
                <div className="flex flex-col gap-[10px] text-[16px] text-black">
                  <span className="text-[16px] text-black">
                    {ref.referralType || "-"}
                  </span>
                  <span className="text-[16px] text-black">
                    {ref.fullName || "-"}
                  </span>
                  <span className="text-[16px] text-black">
                    {ref.qualificationOrService || "-"}
                  </span>
                  <span className="text-[16px] text-black">
                    {ref.contactNumber || "-"}
                  </span>
                  <span className="text-[16px] text-black">
                    {ref.referralStatus || "-"}
                  </span>
                  <span className="text-[16px] text-black">-</span>
                </div>
              </div>

              <button
                className="bg-[#3674B5] rounded-[15px] text-white px-8 py-2 mx-6 cursor-pointer mb-4"
                // onClick={() => handleManage(ref)}
                disabled={ref.referralStatus?.toUpperCase() === "CONFIRMED"}
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
          agentId={agentInfo?.id}
          onClose={() => setManageReferral(false)}
        />
      )}
    </div>
  );
};

export default Page;
