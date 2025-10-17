"use client";
import useAgentStore from "@/app/lib/store/agentManagementStore";
import EditAgentModal from "@/components/agentManagement/EditAgentModal";
import Navlink from "@/components/agentManagement/Navlink";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ConfirmModal = ({ visible, status, onConfirm, onCancel, loading }) => {
  if (!visible) return null;
  const actionText = status === "APPROVED" ? "Approve" : "Reject";
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6">
        <h2 className="text-lg font-semibold mb-2 text-center">
          Confirm {actionText}
        </h2>
        <p className="text-center mb-6">
          Are you sure you want to <b>{actionText}</b> this agent?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(status)}
            disabled={loading}
            className={`px-4 py-2 rounded text-white transition cursor-pointer ${
              status === "APPROVED"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Processing..." : actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const router = useRouter();
  const { id } = useParams();

  const {
    agentDetails,
    loading,
    error,
    fetchAgentById,
    updateAgent,
    updateAgentApprovalStatus,
  } = useAgentStore();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchAgentById(id);
    }
  }, [id, fetchAgentById]);

  const handleApprovalStatusChange = async (status) => {
    if (!id) return;
    setActionLoading(true);
    const result = await updateAgentApprovalStatus(id, status);
    setActionLoading(false);
    if (result.success) {
      setConfirmAction(null);
      router.push("/controlpanel/agentManagement/newAgentRequest");
    } else {
      alert("Failed to update status");
    }
  };

  return (
    <div className="pb-20">
      <Navlink />

      {/* Header Section */}
      <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex">
        <div
          onClick={() => router.back()}
          className="text-[16px] text-black border-r-2 border-[#F0F4F9] flex justify-center items-center px-[38px] cursor-pointer"
        >
          Back
        </div>
        <div className="w-full flex text-[16px] text-black justify-between items-center ps-[19px] pe-[73px]">
          <p className="font-semibold">
            {agentDetails?.fullName || "Agent Name"}
          </p>
          <div className="flex justify-center items-center gap-[92px]">
            <p>{agentDetails?.typeOfAgent || ""}</p>
            <p>{agentDetails?.referralType || ""}</p>
          </div>
        </div>
      </div>

      {/* Agent Details Section */}
      <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
        <div className="w-full h-[52px] flex items-center justify-between border-b px-8 rounded-t-[15px] border-[#BBBBBB]">
          <h1 className="text-[16px] font-semibold text-black">
            Agent - Details
          </h1>
          {/* <button
            onClick={() => setIsEditOpen(true)}
            className="cursor-pointer hover:scale-110"
            aria-label="Edit Agent Details"
          >
            <img src="/edit-btn.svg" alt="edit" className="w-6 h-6" />
          </button> */}
        </div>
        <div className="flex gap-16 p-8">
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

      {/* Action Buttons */}
      <div className="w-full mt-2 mb-10 bg-white rounded-[15px] border border-[#BBBBBB]">
        <div className="w-full h-[52px] flex items-center bg-[#C0D8F6] px-8 rounded-t-[15px]">
          <h1 className="text-[16px] font-semibold text-black">Action</h1>
        </div>
        <div className="p-8">
          <div className="flex gap-8">
            <button
              className="w-[192px] h-[40px] bg-[#F93827] text-white rounded-[15px] hover:opacity-80 transition cursor-pointer"
              onClick={() => setConfirmAction("REJECTED")}
            >
              Reject
            </button>
            <button
              className="w-[192px] h-[40px] bg-[#09B438] text-white rounded-[15px] hover:opacity-80 transition cursor-pointer"
              onClick={() => setConfirmAction("APPROVED")}
            >
              Approve
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <EditAgentModal
          agent={agentDetails}
          onClose={() => setIsEditOpen(false)}
          onSave={async (updatedData) => {
            const result = await updateAgent(id, updatedData);
            if (result.success) {
              setIsEditOpen(false);
            } else {
              alert("Failed to update agent");
            }
          }}
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        visible={!!confirmAction}
        status={confirmAction}
        loading={actionLoading}
        onCancel={() => setConfirmAction(null)}
        onConfirm={handleApprovalStatusChange}
      />

      {loading && <div className="px-8 py-2">Loading...</div>}
      {error && <div className="px-8 py-2 text-red-600">{error}</div>}
    </div>
  );
};

export default Page;
