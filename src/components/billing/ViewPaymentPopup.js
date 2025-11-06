// import React, { useState } from "react";

// const ViewPaymentPopup = ({ payment, onClose }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState(payment || {});

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     console.log("Saved:", formData);
//     setIsEditing(false);
//   };

//   const handleRemove = () => {
//     if (confirm("Are you sure you want to remove this record?")) {
//       console.log("Removed:", formData);
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//       <div className="bg-white w-[800px] rounded-[20px] p-6 relative shadow-lg">
//         <h2 className="text-[22px] font-semibold text-black mb-4">
//           Payment Details
//         </h2>

//         {/* Fields */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-semibold">Service</label>
//             <input
//               name="service"
//               value={formData.service || ""}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold">Charge</label>
//             <input
//               name="charge"
//               value={formData.charge || ""}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold">Final Bill</label>
//             <input
//               name="finalBill"
//               value={formData.finalBill || ""}
//               onChange={handleChange}
//               disabled
//               className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold">Staff Pay</label>
//             <input
//               name="staffPay"
//               value={formData.staffPay || ""}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold">Staff Referral</label>
//             <input
//               name="sReferral"
//               value={formData.sReferral || ""}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold">Patient Referral</label>
//             <input
//               name="pReferral"
//               value={formData.pReferral || ""}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end gap-3 mt-6">
//           {!isEditing ? (
//             <>
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="bg-[#3674B5] text-white px-5 py-2 rounded-md"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={handleRemove}
//                 className="bg-red-500 text-white px-5 py-2 rounded-md"
//               >
//                 Remove
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={handleSave}
//               className="bg-green-600 text-white px-5 py-2 rounded-md"
//             >
//               Save
//             </button>
//           )}

//           <button
//             onClick={onClose}
//             className="border border-gray-400 text-black px-5 py-2 rounded-md"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewPaymentPopup;







// "use client";

// import React, { useState, useEffect } from "react";
// import { MdDelete } from "react-icons/md";


// function ViewPaymentPopup({ payment, onClose }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [form, setForm] = useState(
//     payment || {
//       professional: "",
//       category: "",
//       dutySchedule: "",
//       service: "",
//       basicPrice: "",
//       discountType: "Amount",
//       discountValue: "",
//       staffPayType: "Amount",
//       staffPayValue: "",
//       patientReferralType: "Amount",
//       patientReferralValue: "",
//       staffReferralType: "Amount",
//       staffReferralValue: "",
//     }
//   );

//   const [finalBill, setFinalBill] = useState(0);
//   const [staffPayment, setStaffPayment] = useState(0);
//   const [patientReferralPayment, setPatientReferralPayment] = useState(0);
//   const [staffReferralPayment, setStaffReferralPayment] = useState(0);

//   // Auto calculations
//   useEffect(() => {
//     const base = parseFloat(form.basicPrice) || 0;
//     const discount =
//       form.discountType === "Percentage"
//         ? (base * (parseFloat(form.discountValue) || 0)) / 100
//         : parseFloat(form.discountValue) || 0;
//     const afterDiscount = base - discount;

//     const staffPay =
//       form.staffPayType === "Percentage"
//         ? (afterDiscount * (parseFloat(form.staffPayValue) || 0)) / 100
//         : parseFloat(form.staffPayValue) || 0;

//     const patientReferral =
//       form.patientReferralType === "Percentage"
//         ? (afterDiscount * (parseFloat(form.patientReferralValue) || 0)) / 100
//         : parseFloat(form.patientReferralValue) || 0;

//     const staffReferral =
//       form.staffReferralType === "Percentage"
//         ? (afterDiscount * (parseFloat(form.staffReferralValue) || 0)) / 100
//         : parseFloat(form.staffReferralValue) || 0;

//     setFinalBill(afterDiscount);
//     setStaffPayment(staffPay);
//     setPatientReferralPayment(patientReferral);
//     setStaffReferralPayment(staffReferral);
//   }, [form]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     console.log("Updated Payment Data:", {
//       ...form,
//       finalBill,
//       staffPayment,
//       patientReferralPayment,
//       staffReferralPayment,
//     });
//     setIsEditing(false);
//   };

//   const handleRemove = () => {
//     if (confirm("Are you sure you want to remove this record?")) {
//       console.log("Removed Payment:", form);
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
//       <div className="bg-white w-[700px] max-h-[90vh] overflow-y-auto rounded-[15px] p-6 shadow-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-[#3674B5]">
//             Payment Details
//           </h2>
       
//            <div className="flex gap-4">
//              {!isEditing ? (
//             <>
//               {/* <button
//                 onClick={() => setIsEditing(true)}
//                 className="bg-[#3674B5] text-white px-5 py-2 rounded-md text-sm"
//               >
//                 Edit
//               </button> */}

//               <button
//                onClick={() => setIsEditing(true)}
//               className="cursor-pointer hover:scale-110"
//             >
//               <img src="/edit-btn.svg" className="size-7" alt="edit" />
//             </button>
//               <button
//                 onClick={handleRemove}
//                 className="bg-black text-white flex justify-center items-center size-7 cursor-pointer hover:scale-110 rounded-md text-sm"
//               >
//                  <MdDelete />
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={handleSave}
//               className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm"
//             >
//              Save
//             </button>
//           )}

//              <button onClick={onClose} className="text-gray-600 text-xl hover:bg-text-800 hover:scale-110 cursor-pointer">
//             ✖
//           </button>
//            </div>
//         </div>

//         {/* Section 1: Payment Details */}
//         <h3 className="text-[#3674B5] font-semibold text-base mb-2">
//           Payment Details
//         </h3>
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div>
//             <label className="block text-sm mb-1">Select Professional</label>
//             <select
//               name="professional"
//               value={form.professional}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//             >
//               <option value="">Select</option>
//               <option value="Nurse">Nurse</option>
//               <option value="Assistant">Assistant</option>
//               <option value="Technician">Technician</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Select Category</label>
//             <select
//               name="category"
//               value={form.category}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//             >
//               <option value="">Select</option>
//               <option value="General">General</option>
//               <option value="Specialized">Specialized</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Select Duty Schedule</label>
//             <select
//               name="dutySchedule"
//               value={form.dutySchedule}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//             >
//               <option value="">Select</option>
//               <option value="Full-time">Full-time</option>
//               <option value="Part-time">Part-time</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Select Service</label>
//             <select
//               name="service"
//               value={form.service}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//             >
//               <option value="">Select</option>
//               <option value="Home Care">Home Care</option>
//               <option value="Hospital">Hospital</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Enter Basic Price</label>
//             <input
//               type="number"
//               name="basicPrice"
//               value={form.basicPrice}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//             />
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Discount Type</label>
//             <select
//               name="discountType"
//               value={form.discountType}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//             >
//               <option>Amount</option>
//               <option>Percentage</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Discount Value</label>
//             <input
//               type="number"
//               name="discountValue"
//               value={form.discountValue}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//             />
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Final Bill</label>
//             <input
//               type="text"
//               readOnly
//               value={finalBill.toFixed(2)}
//               className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
//             />
//           </div>
//         </div>

//         {/* Section 2: Staff Pay */}
//         <h3 className="text-[#3674B5] font-semibold text-base mb-2">
//           Staff Pay
//         </h3>
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <div>
//             <label className="block text-sm mb-1">Type</label>
//             <select
//               name="staffPayType"
//               value={form.staffPayType}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//             >
//               <option>Amount</option>
//               <option>Percentage</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm mb-1">Value</label>
//             <input
//               type="number"
//               name="staffPayValue"
//               value={form.staffPayValue}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//             />
//           </div>
//           <div>
//             <label className="block text-sm mb-1">Payment</label>
//             <input
//               type="text"
//               readOnly
//               value={staffPayment.toFixed(2)}
//               className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
//             />
//           </div>
//         </div>

//         {/* Section 3: Patient Referral Pay */}
//         <h3 className="text-[#3674B5] font-semibold text-base mb-2">
//           Patient Referral Pay
//         </h3>
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <div>
//             <label className="block text-sm mb-1">Type</label>
//             <select
//               name="patientReferralType"
//               value={form.patientReferralType}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//             >
//               <option>Amount</option>
//               <option>Percentage</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm mb-1">Value</label>
//             <input
//               type="number"
//               name="patientReferralValue"
//               value={form.patientReferralValue}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//             />
//           </div>
//           <div>
//             <label className="block text-sm mb-1">Payment</label>
//             <input
//               type="text"
//               readOnly
//               value={patientReferralPayment.toFixed(2)}
//               className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
//             />
//           </div>
//         </div>

//         {/* Section 4: Staff Referral Pay */}
//         <h3 className="text-[#3674B5] font-semibold text-base mb-2">
//           Staff Referral Pay
//         </h3>
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <div>
//             <label className="block text-sm mb-1">Type</label>
//             <select
//               name="staffReferralType"
//               value={form.staffReferralType}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//             >
//               <option>Amount</option>
//               <option>Percentage</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm mb-1">Value</label>
//             <input
//               type="number"
//               name="staffReferralValue"
//               value={form.staffReferralValue}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//             />
//           </div>
//           <div>
//             <label className="block text-sm mb-1">Amount</label>
//             <input
//               type="text"
//               readOnly
//               value={staffReferralPayment.toFixed(2)}
//               className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
//             />
//           </div>
//         </div>

//         {/* Buttons */}
//         {/* <div className="flex justify-end gap-3 mt-4">
//           {!isEditing ? (
//             <>
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="bg-[#3674B5] text-white px-5 py-2 rounded-md text-sm"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={handleRemove}
//                 className="bg-red-500 text-white px-5 py-2 rounded-md text-sm"
//               >
//                 Remove
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={handleSave}
//               className="bg-green-600 text-white px-5 py-2 rounded-md text-sm"
//             >
//               Save
//             </button>
//           )}

//           <button
//             onClick={onClose}
//             className="border border-gray-400 text-black px-5 py-2 rounded-md text-sm"
//           >
//             Close
//           </button>
//         </div> */}
//       </div>
//     </div>
//   );
// }

// export default ViewPaymentPopup;









"use client";

import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

function ViewPaymentPopup({ payment, onClose }) {
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState(
    payment || {
      professional: "",
      category: "",
      dutySchedule: "",
      service: "",
      basicPrice: "",
      discountType: "Amount",
      discountValue: "",
      staffPayType: "Amount",
      staffPayValue: "",
      patientReferralType: "Amount",
      patientReferralValue: "",
      staffReferralType: "Amount",
      staffReferralValue: "",
    }
  );

  const [finalBill, setFinalBill] = useState(0);
  const [staffPayment, setStaffPayment] = useState(0);
  const [patientReferralPayment, setPatientReferralPayment] = useState(0);
  const [staffReferralPayment, setStaffReferralPayment] = useState(0);

  // 🔄 Auto calculations
  useEffect(() => {
    const base = parseFloat(form.basicPrice) || 0;
    const discount =
      form.discountType === "Percentage"
        ? (base * (parseFloat(form.discountValue) || 0)) / 100
        : parseFloat(form.discountValue) || 0;
    const afterDiscount = base - discount;

    const staffPay =
      form.staffPayType === "Percentage"
        ? (afterDiscount * (parseFloat(form.staffPayValue) || 0)) / 100
        : parseFloat(form.staffPayValue) || 0;

    const patientReferral =
      form.patientReferralType === "Percentage"
        ? (afterDiscount * (parseFloat(form.patientReferralValue) || 0)) / 100
        : parseFloat(form.patientReferralValue) || 0;

    const staffReferral =
      form.staffReferralType === "Percentage"
        ? (afterDiscount * (parseFloat(form.staffReferralValue) || 0)) / 100
        : parseFloat(form.staffReferralValue) || 0;

    setFinalBill(afterDiscount);
    setStaffPayment(staffPay);
    setPatientReferralPayment(patientReferral);
    setStaffReferralPayment(staffReferral);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Updated Payment Data:", {
      ...form,
      finalBill,
      staffPayment,
      patientReferralPayment,
      staffReferralPayment,
    });
    setIsEditing(false);
  };

  const handleRemove = () => {
    if (confirm("Are you sure you want to remove this record?")) {
      console.log("Removed Payment:", form);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
      <div className="bg-white w-[700px] max-h-[90vh] overflow-y-auto rounded-[15px] p-6 shadow-lg relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#3674B5]">
            Payment Details
          </h2>
          <div className="flex gap-3 items-center">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="cursor-pointer hover:scale-110 transition-transform"
                >
                  <img src="/edit-btn.svg" className="size-7" alt="edit" />
                </button>
                <button
                  onClick={handleRemove}
                  className="bg-black text-white flex justify-center items-center size-7 rounded-md cursor-pointer hover:scale-110 transition-transform"
                >
                  <MdDelete />
                </button>
              </>
            ) : (
              <button
                onClick={handleSave}
                className="bg-[#3674B5] text-white px-4 py-1 rounded-md text-sm hover:bg-[#2d5d93] transition-colors"
              >
                Save
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-600 text-xl hover:scale-110 transition-transform"
            >
              ✖
            </button>
          </div>
        </div>

        {/* Section 1: Payment Details */}
        <h3 className="text-[#3674B5] font-semibold text-base mb-2">
          Payment Details
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            ["professional", "Select Professional", ["Nurse", "Assistant", "Technician"]],
            ["category", "Select Category", ["General", "Specialized"]],
            ["dutySchedule", "Select Duty Schedule", ["Full-time", "Part-time"]],
            ["service", "Select Service", ["Home Care", "Hospital"]],
          ].map(([name, label, options]) => (
            <div key={name}>
              <label className="block text-sm mb-1">{label}</label>
              <select
                name={name}
                value={form[name]}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
              >
                <option value="">Select</option>
                {options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}

          <div>
            <label className="block text-sm mb-1">Enter Basic Price</label>
            <input
              type="number"
              name="basicPrice"
              value={form.basicPrice}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Discount Type</label>
            <select
              name="discountType"
              value={form.discountType}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
            >
              <option>Amount</option>
              <option>Percentage</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Discount Value</label>
            <input
              type="number"
              name="discountValue"
              value={form.discountValue}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Final Bill</label>
            <input
              type="text"
              readOnly
              value={`₹${finalBill.toFixed(2)}`}
              className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Section 2: Staff Pay */}
        {/* <h3 className="text-[#3674B5] font-semibold text-base mb-2">
          Staff Pay
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <PayInputGroup
            prefix="staffPay"
            form={form}
            isEditing={isEditing}
            onChange={handleChange}
            amount={staffPayment}
          />
        </div> */}
        {/* Section 2: Staff Pay */}
<h3 className="text-[#3674B5] font-semibold text-base mb-2">
  Staff Pay
</h3>
<div className="grid grid-cols-2 gap-4 mb-6">
  <div>
    <label className="block text-sm mb-1">Value</label>
    <input
      type="number"
      name="staffPayValue"
      value={form.staffPayValue}
      onChange={handleChange}
      disabled={!isEditing}
      className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
    />
  </div>

  <div>
    <label className="block text-sm mb-1">Payment</label>
    <input
      type="text"
      readOnly
      value={staffPayment ? `₹ ${staffPayment.toFixed(2)}` : ""}
      className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
    />
  </div>
</div>


        {/* Section 3: Patient Referral Pay */}
        <h3 className="text-[#3674B5] font-semibold text-base mb-2">
          Patient Referral Pay
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <PayInputGroup
            prefix="patientReferral"
            form={form}
            isEditing={isEditing}
            onChange={handleChange}
            amount={patientReferralPayment}
          />
        </div>

        {/* Section 4: Staff Referral Pay */}
        <h3 className="text-[#3674B5] font-semibold text-base mb-2">
          Staff Referral Pay
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <PayInputGroup
            prefix="staffReferral"
            form={form}
            isEditing={isEditing}
            onChange={handleChange}
            amount={staffReferralPayment}
          />
        </div>
      </div>
    </div>
  );
}

/* 🔧 Sub-component for repeated payment type/value/amount pattern */
function PayInputGroup({ prefix, form, isEditing, onChange, amount }) {
  return (
    <>
      <div>
        <label className="block text-sm mb-1">Type</label>
        <select
          name={`${prefix}Type`}
          value={form[`${prefix}Type`]}
          onChange={onChange}
          disabled={!isEditing}
          className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
        >
          <option>Amount</option>
          <option>Percentage</option>
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1">Value</label>
        <input
          type="number"
          name={`${prefix}Value`}
          value={form[`${prefix}Value`]}
          onChange={onChange}
          disabled={!isEditing}
          className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Payment</label>
        <input
          type="text"
          readOnly
          value={`₹${amount.toFixed(2)}`}
          className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
        />
      </div>
    </>
  );
}

export default ViewPaymentPopup;
