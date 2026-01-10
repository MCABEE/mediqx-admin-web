// "use client";

// import useProductStore from "@/app/lib/store/useProductStore";
// import { useRouter, useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";

// function Page() {
//   const router = useRouter();
//   const { id: patientId } = useParams();

//   const { details, fetchDetails, updateSalesStatus, loading, updatingId } =
//     useProductStore();

//   const [localStatus, setLocalStatus] = useState({});

//   useEffect(() => {
//     if (patientId) {
//       fetchDetails(patientId);
//     }
//   }, [patientId]);

//   useEffect(() => {
//     if (details?.bookings) {
//       const map = {};
//       details.bookings.forEach((b) => {
//         map[b.productCartId] = b.salesStatus;
//       });
//       setLocalStatus(map);
//     }
//   }, [details]);

//   if (loading || !details) {
//     return <div className="p-6 text-black">Loading...</div>;
//   }

//   const { patientName, bookings = [] } = details;

//   const STATUSES = ["SOLD", "CANCELLED", "POSTPONED", "PENDING"];

//   return (
//     <div>
//       {/* Back */}
//       <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex items-center">
//         <h1
//           onClick={() => router.back()}
//           className="text-[16px] px-[38px] font-semibold cursor-pointer"
//         >
//           Back
//         </h1>
//       </div>

//       {/* SUMMARY */}
//       <table className="w-full border-spacing-y-2 border-separate text-black mt-2">
//         <thead className="bg-[#C0D8F6]">
//           <tr>
//             <th className="text-base rounded-l-2xl p-2">No</th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               Patient Name
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               Products
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
//               Source 
//             </th>
//           </tr>
//         </thead>

//         <tbody>
//           <tr className="bg-white">
//             <td className="p-2 text-center">1</td>
//             <td className="p-2 border-l-4 text-center border-[#C0D8F6]">
//               {patientName || bookings.customerName}
//             </td>
//             <td className="p-2 border-l-4 text-center border-[#C0D8F6]">
//               {bookings.length}
//             </td>
//             <td className="p-2 border-l-4 text-center border-[#C0D8F6]">
//               {bookings[0]?.staffSupervisorName || "-"}
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       {/* BOOKINGS */}
//       {bookings.map((item, index) => (
//         <div key={item.productCartId} className="bg-white py-6 my-6">
//           <div className="flex items-center gap-6 border-b border-[#99999981] px-10 pb-2">
//             <span className="bg-[#C0D8F6] px-4 py-2 rounded">{index + 1}</span>
//             <h1 className="font-semibold">Booking Details</h1>
//           </div>

//           <div className="px-10 pt-6 space-y-2">
//             <Row label="Product Name" value={item.productName} />
//             <Row label="Quantity" value={item.quantity} />
//             <Row label="MRP" value={`₹${item.mrp}`} />
//             <Row label="Final Price" value={`₹${item.finalPrice}`} />
//             <Row label="Staff/ Supervisor Name" value={`₹${item.finalPrice}`} />
//             <Row label="Referral Payments" value={`₹${item.finalPrice}`} />
//             <Row label="Customer name" value={`₹${item.mrp}`} />
//             <Row label="Phone Number" value={`₹${item.mrp}`} />
//             <Row label="Location" value={`₹${item.mrp}`} />
//             <Row label="Email" value={`₹${item.mrp}`} /> 



//           </div>

//           {/* EDIT STATUS */}
//           <div className="px-10 pt-6">
//             <h1 className="font-semibold mb-3">Sales Status</h1>

//             <div className="grid grid-cols-2 gap-4">
//               {STATUSES.map((status) => (
//                 <label key={status} className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     name={item.productCartId}
//                     checked={localStatus[item.productCartId] === status}
//                     onChange={() =>
//                       setLocalStatus((prev) => ({
//                         ...prev,
//                         [item.productCartId]: status,
//                       }))
//                     }
//                   />
//                   {status}
//                 </label>
//               ))}
//             </div>

//             <button
//               disabled={
//                 updatingId === item.productCartId ||
//                 localStatus[item.productCartId] === item.salesStatus
//               }
//               onClick={() =>
//                 updateSalesStatus(
//                   item.productCartId,
//                   localStatus[item.productCartId]
//                 )
//               }
//               className="mt-4 w-[200px] h-[40px] bg-[#3674B5] text-white rounded disabled:opacity-50"
//             >
//               {updatingId === item.productCartId ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Page;

// function Row({ label, value }) {
//   return (
//     <div className="flex gap-4">
//       <span className="w-[180px] font-medium">{label}</span>
//       <span>{value}</span>
//     </div>
//   );
// }









// "use client";

// import useProductStore from "@/app/lib/store/useProductStore";
// import { useRouter, useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";

// function Page() {
//   const router = useRouter();
//   const { id: patientId } = useParams();

//   const { details, fetchDetails, updateSalesStatus, loading, updatingId } =
//     useProductStore();

//   const [localStatus, setLocalStatus] = useState({});

//   useEffect(() => {
//     if (patientId) {
//       fetchDetails(patientId);
//     }
//   }, [patientId]);

//   useEffect(() => {
//     if (details?.bookings) {
//       const map = {};
//       details.bookings.forEach((b) => {
//         map[b.productCartId] = b.salesStatus;
//       });
//       setLocalStatus(map);
//     }
//   }, [details]);

//   if (loading || !details) {
//     return <div className="p-6 text-black">Loading...</div>;
//   }

//   const { patientName, bookings = [] } = details;

//   const STATUSES = ["SOLD", "CANCELLED", "POSTPONED", "PENDING"];

//   return (
//     <div>
//       {/* Back */}
//       <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex items-center">
//         <h1
//           onClick={() => router.back()}
//           className="text-[16px] px-[38px] font-semibold cursor-pointer"
//         >
//           Back
//         </h1>
//       </div>

//       {/* SUMMARY */}
//       <table className="w-full border-spacing-y-2 border-separate text-black mt-2">
//         <thead className="bg-[#C0D8F6]">
//           <tr>
//             <th className="text-base rounded-l-2xl p-2">No</th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               Patient Name
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               Products
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
//               Source
//             </th>
//           </tr>
//         </thead>

//         <tbody>
//           <tr className="bg-white">
//             <td className="p-2 text-center">1</td>
//             <td className="p-2 border-l-4 text-center border-[#C0D8F6]">
//               {patientName || "-"}
//             </td>
//             <td className="p-2 border-l-4 text-center border-[#C0D8F6]">
//               {bookings.length}
//             </td>
//             <td className="p-2 border-l-4 text-center border-[#C0D8F6]">
//               {bookings[0]?.sourceType || "-"}
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       {/* BOOKINGS */}
//       {bookings.map((item, index) => (
//         <div key={item.productCartId} className="bg-white py-6 my-6">
//           <div className="flex items-center gap-6 border-b border-[#99999981] px-10 pb-2">
//             <span className="bg-[#C0D8F6] px-4 py-2 rounded">{index + 1}</span>
//             <h1 className="font-semibold">Booking Details</h1>
//           </div>

//           <div className="px-10 pt-6 space-y-2">
//             <Row label="Product Name" value={item.productName} />
//             <Row label="Quantity" value={item.quantity} />
//             <Row label="MRP" value={`₹${item.mrp}`} />
//             <Row label="Final Price" value={`₹${item.finalPrice}`} />
//             <Row label="Source Type" value={item.sourceType} />
//             <Row label="Referral Payment" value={item.referralPayment ?? "-"} />
//             <Row label="Customer Name" value={item.customerName ?? "-"} />
//             <Row label="Phone Number" value={item.phoneNumber ?? "-"} />
//             <Row label="Location" value={item.cityOrLocation ?? "-"} />
//             <Row label="Email" value={item.email ?? "-"} />
//           </div>
//           {/* EDIT STATUS */}
//           <div className="px-10 pt-6">
//             <h1 className="font-semibold mb-3">Sales Status</h1>

//             <div className="grid grid-cols-2 gap-4">
//               {STATUSES.map((status) => (
//                 <label key={status} className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     name={item.productCartId}
//                     checked={localStatus[item.productCartId] === status}
//                     onChange={() =>
//                       setLocalStatus((prev) => ({
//                         ...prev,
//                         [item.productCartId]: status,
//                       }))
//                     }
//                   />
//                   {status}
//                 </label>
//               ))}
//             </div>

//             <button
//               disabled={
//                 updatingId === item.productCartId ||
//                 localStatus[item.productCartId] === item.salesStatus
//               }
//               onClick={() =>
//                 updateSalesStatus(
//                   item.productCartId,
//                   localStatus[item.productCartId]
//                 )
//               }
//               className="mt-4 w-[200px] h-[40px] bg-[#3674B5] text-white rounded disabled:opacity-50"
//             >
//               {updatingId === item.productCartId ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Page;

// function Row({ label, value }) {
//   return (
//     <div className="flex gap-4">
//       <span className="w-[180px] font-medium">{label}</span>
//       <span>{value}</span>
//     </div>
//   );
// }










"use client";

import useProductStore from "@/app/lib/store/useProductStore";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const router = useRouter();
  const { id: patientId } = useParams();

  const { details, fetchDetails, updateSalesStatus, loading, updatingId } =
    useProductStore();

  const [localStatus, setLocalStatus] = useState({});

  useEffect(() => {
    if (patientId) {
      fetchDetails(patientId);
    }
  }, [patientId]);

  useEffect(() => {
    if (details?.bookings) {
      const map = {};
      details.bookings.forEach((b) => {
        map[b.productCartId] = b.salesStatus;
      });
      setLocalStatus(map);
    }
  }, [details]);

  if (loading || !details) {
    return <div className="p-6 text-black">Loading...</div>;
  }

  const { patientName, bookings = [] } = details;

  const STATUSES = ["SOLD", "CANCELLED", "POSTPONED", "PENDING"];

  return (
    <div>
      {/* Back */}
      <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex items-center">
        <h1
          onClick={() => router.back()}
          className="text-[16px] px-[38px] font-semibold cursor-pointer"
        >
          Back
        </h1>
      </div>

      {/* SUMMARY */}
      <table className="w-full border-spacing-y-2 border-separate text-black mt-2">
        <thead className="bg-[#C0D8F6]">
          <tr>
            <th className="text-base rounded-l-2xl p-2">No</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Patient Name
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Products
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
              Source
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="bg-white">
            <td className="p-2 text-center">1</td>
            <td className="p-2 border-l-4 text-center border-[#C0D8F6]">
              {patientName || bookings[0]?.customerName || "-"}
            </td>
            <td className="p-2 border-l-4 text-center border-[#C0D8F6]">
              {bookings.length}
            </td>
            <td className="p-2 border-l-4 text-center border-[#C0D8F6]">
              {bookings[0]?.sourceType || "-"}
            </td>
          </tr>
        </tbody>
      </table>

      {/* BOOKINGS */}
      {bookings.map((item, index) => (
        <div key={item.productCartId} className="bg-white py-6 my-6">
          <div className="flex items-center gap-6 border-b border-[#99999981] px-10 pb-2">
            <span className="bg-[#C0D8F6] px-4 py-2 rounded">{index + 1}</span>
            <h1 className="font-semibold">Booking Details</h1>
          </div>

          <div className="px-10 pt-6 space-y-2">
            <Row label="Product Name" value={item.productName} />
            <Row label="Quantity" value={item.quantity} />
            <Row label="MRP" value={`₹${item.mrp}`} />
            <Row label="Final Price" value={`₹${item.finalPrice}`} />
            <Row label="Source Type" value={item.sourceType} />

            {item.referralPayment &&
              item.referralPayment !== "NA" && (
                <Row
                  label="Referral Payment"
                  value={item.referralPayment}
                />
              )}

            {item.customerName && (
              <Row label="Customer Name" value={item.customerName} />
            )}

            {item.phoneNumber && (
              <Row label="Phone Number" value={item.phoneNumber} />
            )}

            {item.cityOrLocation && (
              <Row label="Location" value={item.cityOrLocation} />
            )}

            {item.email && <Row label="Email" value={item.email} />}
          </div>

          {/* EDIT STATUS */}
          <div className="px-10 pt-6">
            <h1 className="font-semibold mb-3">Sales Status</h1>

            <div className="grid grid-cols-2 gap-4">
              {STATUSES.map((status) => (
                <label key={status} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={item.productCartId}
                    checked={localStatus[item.productCartId] === status}
                    onChange={() =>
                      setLocalStatus((prev) => ({
                        ...prev,
                        [item.productCartId]: status,
                      }))
                    }
                  />
                  {status}
                </label>
              ))}
            </div>

            <button
              disabled={
                updatingId === item.productCartId ||
                localStatus[item.productCartId] === item.salesStatus
              }
              onClick={() =>
                updateSalesStatus(
                  item.productCartId,
                  localStatus[item.productCartId]
                )
              }
              className="mt-4 w-[200px] h-[40px] bg-[#3674B5] text-white rounded disabled:opacity-50"
            >
              {updatingId === item.productCartId ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Page;

function Row({ label, value }) {
  return (
    <div className="flex gap-4">
      <span className="w-[180px] font-medium">{label}</span>
      <span>{value}</span>
    </div>
  );
}
