"use client";

import useServiceRatingsStore from "@/app/lib/store/useServiceRatingStore";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SupervisorApprovalDetailsPage() {
  const router = useRouter();
  const { id: serviceId } = useParams();

  const { fetchRatingByServiceId, submitReply, ratingDetails, loading, error } =
    useServiceRatingsStore();

  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    if (serviceId) {
      fetchRatingByServiceId(serviceId);
    }
  }, [serviceId]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!ratingDetails) return null;

  const {
    id: ratingId,
    staffName,
    patientName,
    rating,
    comments,
    reply,
    repliedBy,
    repliedAt,
    serviceTypeName,
    serviceStartDate,
    serviceEndDate,
    createdAt,
  } = ratingDetails;

  const reviewDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-GB").replace(/\//g, "-")
    : "-";

  const replyDate = repliedAt
    ? new Date(repliedAt).toLocaleDateString("en-GB").replace(/\//g, "-")
    : "-";

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;

    const res = await submitReply({
      serviceId,
      ratingId,
      reply: replyText,
    });

    if (res.success) {
      fetchRatingByServiceId(serviceId); // refresh after submit
      setReplyText("");
    }
  };

  return (
    <div className="px-[20px] py-[20px]">
      {/* Back */}
      <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex items-center">
        <h1
          className="text-[16px] px-[38px] font-semibold cursor-pointer"
          onClick={() => router.back()}
        >
          Back
        </h1>
      </div>

      {/* Title */}
      <div className="w-full bg-[#C0D8F6] py-2.5 px-[23px] rounded-t-[15px] mt-2">
        <p className="text-[16px] font-semibold">Rating and Reviews</p>
      </div>

      {/* Header Row */}
      <table className="w-full border-spacing-y-2 border-separate mt-4">
        <tbody>
          <tr className="bg-white">
            <td className="p-2 font-medium">01</td>
            <td className="border-l-4 p-2 border-[#C0D8F6]">{staffName}</td>
            <td className="border-l-4 p-2 border-[#C0D8F6]">{rating} ★</td>
            <td className="border-l-4 p-2 border-[#C0D8F6]">{reviewDate}</td>
            <td className="border-l-4 p-2 border-[#C0D8F6]">{patientName}</td>
          </tr>
        </tbody>
      </table>

      {/* Details */}
      <div className="bg-white  border border-[#8888885a] mt-4 mb-6 pb-4">
        <div className="px-[39px] py-[19px] border-b border-[#8888885a]">
          <span className="text-[20px] font-semibold">Review Details</span>
        </div>

        <div className="flex flex-col gap-[18px] px-[39px] py-[18px]">
          <Detail label="Patient Name" value={patientName} />
          <Detail label="Staff Name" value={staffName} />
          <Detail label="Service" value={serviceTypeName} />
          <Detail label="Service Start Date" value={serviceStartDate} />
          <Detail label="Service End Date" value={serviceEndDate} />
          <Detail label="Rating" value={`${rating} ★`} />
          <Detail label="Review" value={comments} />
        </div>
      </div>

      {/* ================= REPLY SECTION ================= */}
      {!reply ? (
        /* ----- TEXTAREA WHEN NO REPLY ----- */
        <div className="w-full border border-[#8888885a] bg-white">
          <p className="font-semibold border-b  border-[#8888885a]  px-8 py-[22px]">
            Reply
          </p>
          <div className="p-5 pb-6">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write here ..."
              className="w-full h-[144px] border border-[#88888865] px-6 py-3 rounded-[15px]"
            />
            <div className="flex justify-end">
              <button
                onClick={handleReplySubmit}
                className="mt-4 bg-[#3674B5] text-white px-20 py-2 rounded-[10px]"
              >
                Submit Reply
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ----- REPLY VIEW ----- */
        <div className="w-full border border-[#d3cdcd] bg-white">
          <p className="text-[16px] text-black font-semibold border-b border-[#c5c1c1] px-8 py-[22px] mb-4">
            Reply
          </p>
          <div className="ps-8 pe-[139px]">
            <p className="text-[16px]">{reply}</p>
            <p className="pt-[13px] font-semibold">
              Replied :
              <span className="font-normal">
                {" "}
                {repliedBy?.fullName || "Admin"}
              </span>
            </p>
            <p className="pt-[13px] pb-[36px] font-semibold">
              Date :<span className="font-normal"> {replyDate}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Helper ---------- */

const Detail = ({ label, value }) => (
  <div className="flex gap-[18px]">
    <span className="w-[280px]">{label}</span>
    <span className="max-w-[600px]">{value || "-"}</span>
  </div>
);
