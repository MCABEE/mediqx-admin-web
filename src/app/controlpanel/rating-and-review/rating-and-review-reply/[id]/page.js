// "use client";

// import { useRouter } from "next/navigation";
// import React, { useState } from "react";

// /* Dummy popup placeholders */

// export default function SupervisorApprovalDetailsPage() {
//   const [editBasic, setEditBasic] = useState(false);
//    const router = useRouter();

//   /* ✅ Proper Dummy Data */
//   const review = {
//     staffName: "Sruthi Lakshmi N",
//     patientName: "Leelavathi J S",
//     rating: "3 ★",
//     review: "Very polite and attentive service.",
//     service: "Clinical Supervisor",
//     serviceStartDate: "01 Aug 2025",
//     serviceEndDate: "08 Aug 2025",
//     reviewDate: "08 Aug 2025",
//   };

//   return (
//     <div className="px-[20px] py-[20px]">
//       {/* Back Button */}
//       <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex items-center">
//         <h1 className="text-[16px] text-black px-[38px] font-semibold cursor-pointer"
//         onClick={() => router.back()}
//         >
//           Back
//         </h1>
//       </div>

//       {/* Title */}
//       <div className="w-full bg-[#C0D8F6] py-2.5 px-[23px] rounded-t-[15px] flex items-center mt-2">
//         <p className="text-[16px] font-semibold text-black">
//           Rating and Reviews
//         </p>
//       </div>

//       {/* Table Header Row */}
//       <table className="w-full border-spacing-y-2 border-separate text-black mt-4">
//         <tbody>
//           <tr className="bg-white">
//             <td className="p-2 font-medium">03</td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">
//               {review.staffName}
//             </td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">{review.rating}</td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">
//               {review.reviewDate}
//             </td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">
//               {review.patientName}
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       {/* Details Section */}
//       <div className="bg-white  mt-4 mb-6 pb-4">
//         {/* Header */}
//         <div className="flex justify-between items-center px-[39px] py-[19px] border-b border-[#edd5d5]">
//           <span className="text-[20px] font-semibold text-[#333333]">
//             Review Details
//           </span>
//         </div>

//         {/* Content */}
//         <div className="flex flex-col gap-[18px] px-[39px] py-[18px]">
//           <div className="flex gap-[18px]">
//             <span className="w-[280px]">Patient Name</span>
//             <span>{review.patientName}</span>
//           </div>

//           <div className="flex gap-[18px]">
//             <span className="w-[280px]">Staff Name</span>
//             <span>{review.staffName}</span>
//           </div>

//           <div className="flex gap-[18px]">
//             <span className="w-[280px]">Service</span>
//             <span>{review.service}</span>
//           </div>

//           <div className="flex gap-[18px]">
//             <span className="w-[280px]">Service Start Date</span>
//             <span>{review.serviceStartDate}</span>
//           </div>

//           <div className="flex gap-[18px]">
//             <span className="w-[280px]">Service End Date</span>
//             <span>{review.serviceEndDate}</span>
//           </div>

//           <div className="flex gap-[18px]">
//             <span className="w-[280px]">Rating</span>
//             <span>{review.rating}</span>
//           </div>

//           <div className="flex gap-[18px]">
//             <span className="w-[280px]">Review</span>
//             <span className="max-w-[600px]">{review.review}</span>
//           </div>
//         </div>
//       </div>

//       <div className="w-full border border-[#d3cdcd] bg-white">
//         <p className="text-[16px] text-black font-semibold border-b border-[#c5c1c1] px-8 py-[22px] mb-4">
//           Reply
//         </p>

//         <div className="px-5">
//           <textarea
//             name=""
//             id=""
//             placeholder="Write here ..."
//             className="w-full h-[144px]  text-[15px] border border-[#BBBBBB] px-8 py-2 rounded-[15px] outline-none"
//           ></textarea>
//         </div>
//       </div>


//        <div className="w-full border border-[#d3cdcd] bg-white">
//         <p className="text-[16px] text-black font-semibold border-b border-[#c5c1c1] px-8 py-[22px] mb-4">
//           Reply
//         </p>

//         <div className="ps-5 pe-[139px]">
//           <p className="text-[#333333] text-[16px]">
//             Glucometers help you understand which foods or activities are
//             responsible for the increase or decrease in the levels of your blood
//             sugar. They help you monitor sugar levels, and assist you in
//             controlling your diabetes from reaching dangerous levels.
//           </p>
//           <p className="pt-[13px] font-semibold">
//             Replied :<span className="font-normal"> Anil Joseph</span>
//           </p>
//           <p className="pt-[13px] pb-[36px] font-semibold">
//             Date :<span className="font-normal"> 08-12-2025</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }





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
          <p className="font-semibold border-b  border-[#8888885a]  px-8 py-[22px]">Reply</p>
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