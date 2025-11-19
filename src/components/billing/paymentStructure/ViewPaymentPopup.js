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

//   // 🔄 Auto calculations
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
//       <div className="bg-white w-[700px] max-h-[90vh] overflow-y-auto rounded-[15px] p-6 shadow-lg relative">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-[#3674B5]">
//             Payment Details
//           </h2>
//           <div className="flex gap-3 items-center">
//             {!isEditing ? (
//               <>
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="cursor-pointer hover:scale-110 transition-transform"
//                 >
//                   <img src="/edit-btn.svg" className="size-7" alt="edit" />
//                 </button>
//                 <button
//                   onClick={handleRemove}
//                   className="bg-black text-white flex justify-center items-center size-7 rounded-md cursor-pointer hover:scale-110 transition-transform"
//                 >
//                   <MdDelete />
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={handleSave}
//                 className="bg-[#3674B5] text-white px-4 py-1 rounded-md text-sm hover:bg-[#2d5d93] transition-colors"
//               >
//                 Save
//               </button>
//             )}
//             <button
//               onClick={onClose}
//               className="text-gray-600 text-xl hover:scale-110 transition-transform"
//             >
//               ✖
//             </button>
//           </div>
//         </div>

//         {/* Section 1: Payment Details */}
//         <h3 className="text-[#3674B5] font-semibold text-base mb-2">
//           Payment Details
//         </h3>
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           {[
//             ["professional", "Select Professional", ["Nurse", "Assistant", "Technician"]],
//             ["category", "Select Category", ["General", "Specialized"]],
//             ["dutySchedule", "Select Duty Schedule", ["Full-time", "Part-time"]],
//             ["service", "Select Service", ["Home Care", "Hospital"]],
//           ].map(([name, label, options]) => (
//             <div key={name}>
//               <label className="block text-sm mb-1">{label}</label>
//               <select
//                 name={name}
//                 value={form[name]}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//               >
//                 <option value="">Select</option>
//                 {options.map((opt) => (
//                   <option key={opt}>{opt}</option>
//                 ))}
//               </select>
//             </div>
//           ))}

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
//               value={`₹${finalBill.toFixed(2)}`}
//               className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
//             />
//           </div>
//         </div>

//         {/* Section 2: Staff Pay */}
//         {/* <h3 className="text-[#3674B5] font-semibold text-base mb-2">
//           Staff Pay
//         </h3>
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <PayInputGroup
//             prefix="staffPay"
//             form={form}
//             isEditing={isEditing}
//             onChange={handleChange}
//             amount={staffPayment}
//           />
//         </div> */}
//         {/* Section 2: Staff Pay */}
// <h3 className="text-[#3674B5] font-semibold text-base mb-2">
//   Staff Pay
// </h3>
// <div className="grid grid-cols-2 gap-4 mb-6">
//   <div>
//     <label className="block text-sm mb-1">Value</label>
//     <input
//       type="number"
//       name="staffPayValue"
//       value={form.staffPayValue}
//       onChange={handleChange}
//       disabled={!isEditing}
//       className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//     />
//   </div>

//   <div>
//     <label className="block text-sm mb-1">Payment</label>
//     <input
//       type="text"
//       readOnly
//       value={staffPayment ? `₹ ${staffPayment.toFixed(2)}` : ""}
//       className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
//     />
//   </div>
// </div>


//         {/* Section 3: Patient Referral Pay */}
//         <h3 className="text-[#3674B5] font-semibold text-base mb-2">
//           Patient Referral Pay
//         </h3>
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <PayInputGroup
//             prefix="patientReferral"
//             form={form}
//             isEditing={isEditing}
//             onChange={handleChange}
//             amount={patientReferralPayment}
//           />
//         </div>

//         {/* Section 4: Staff Referral Pay */}
//         <h3 className="text-[#3674B5] font-semibold text-base mb-2">
//           Staff Referral Pay
//         </h3>
//         <div className="grid grid-cols-3 gap-4">
//           <PayInputGroup
//             prefix="staffReferral"
//             form={form}
//             isEditing={isEditing}
//             onChange={handleChange}
//             amount={staffReferralPayment}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// /* 🔧 Sub-component for repeated payment type/value/amount pattern */
// function PayInputGroup({ prefix, form, isEditing, onChange, amount }) {
//   return (
//     <>
//       <div>
//         <label className="block text-sm mb-1">Type</label>
//         <select
//           name={`${prefix}Type`}
//           value={form[`${prefix}Type`]}
//           onChange={onChange}
//           disabled={!isEditing}
//           className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//         >
//           <option>Amount</option>
//           <option>Percentage</option>
//         </select>
//       </div>
//       <div>
//         <label className="block text-sm mb-1">Value</label>
//         <input
//           type="number"
//           name={`${prefix}Value`}
//           value={form[`${prefix}Value`]}
//           onChange={onChange}
//           disabled={!isEditing}
//           className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//         />
//       </div>
//       <div>
//         <label className="block text-sm mb-1">Payment</label>
//         <input
//           type="text"
//           readOnly
//           value={`₹${amount.toFixed(2)}`}
//           className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
//         />
//       </div>
//     </>
//   );
// }

// export default ViewPaymentPopup;










// "use client";

// import React, { useEffect, useState } from "react";
// import { MdDelete } from "react-icons/md";
// import usePaymentStructureStore from "@/app/lib/store/usePaymentStructureStore";

// function ViewPaymentPopup({ payment, onClose }) {
//   const { fetchStructureById, updateStructure, removeStructure } = usePaymentStructureStore();

//   const [loading, setLoading] = useState(false); // local fetch loading
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   // form state — initialize from payment prop (may contain id & role) but will be replaced by API fetch
//   const [form, setForm] = useState({
//     professional: "",
//     category: "",
//     dutySchedule: "",
//     service: "",
//     basicPrice: "",
//     discountType: "Amount",
//     discountValue: "",
//     staffPayType: "Amount",
//     staffPayValue: "",
//     patientReferralType: "Amount",
//     patientReferralValue: "",
//     staffReferralType: "Amount",
//     staffReferralValue: "",
//     // place for id/role if present
//     id: payment?.id ?? payment?.id ?? null,
//     role: payment?.role ?? payment?.role ?? null,
//   });

//   const [finalBill, setFinalBill] = useState(0);
//   const [staffPayment, setStaffPayment] = useState(0);
//   const [patientReferralPayment, setPatientReferralPayment] = useState(0);
//   const [staffReferralPayment, setStaffReferralPayment] = useState(0);

//   // Fetch full data for the payment on mount (if id present)
//   useEffect(() => {
//     let mounted = true;
//     async function load() {
//       const id = payment?.id ?? payment?.id ?? null;
//       const role = payment?.role ?? null;
//       if (!id) {
//         // no id: use the provided payment object as-is
//         setForm((p) => ({ ...p, ...(payment ?? {}) }));
//         return;
//       }

//       setLoading(true);
//       setError(null);
//       try {
//         const item = await fetchStructureById(id, role);
//         if (!mounted) return;
//         // API might return object in res.data or directly, handle both
//         const data = item?.data ?? item;
//         // map API fields to form keys - adapt these if API naming differs
//         setForm({
//           professional: data.professional ?? data.role ?? "",
//           category: data.category ?? data.grade ?? data.category ?? "",
//           dutySchedule: data.dutySchedule ?? data.shift ?? "",
//           service: data.serviceName ?? data.service ?? data.serviceTypeName ?? "",
//           basicPrice: data.basePrice ?? data.charge ?? data.basePrice ?? "",
//           discountType: (data.discountType && data.discountType.toUpperCase() === "PERCENTAGE") ? "Percentage" : "Amount",
//           discountValue: data.discountValue ?? data.discount ?? 0,
//           staffPayType: (data.staffPayDiscountType && data.staffPayDiscountType.toUpperCase() === "PERCENTAGE") ? "Percentage" : (data.staffPayType ?? "Amount"),
//           staffPayValue: data.staffPayAmount ?? data.staffPayValue ?? data.staffPayment ?? 0,
//           patientReferralType: (data.patientReferralDiscountType && data.patientReferralDiscountType.toUpperCase() === "PERCENTAGE") ? "Percentage" : "Amount",
//           patientReferralValue: data.patientReferralValue ?? data.patientReferral ?? 0,
//           staffReferralType: (data.staffReferralDiscountType && data.staffReferralDiscountType.toUpperCase() === "PERCENTAGE") ? "Percentage" : "Amount",
//           staffReferralValue: data.staffReferralValue ?? data.staffReferral ?? 0,
//           id: data.id ?? data._id ?? id,
//           role: data.role ?? role ?? "",
//         });
//       } catch (err) {
//         if (!mounted) return;
//         setError(err.message ?? String(err));
//       } finally {
//         if (!mounted) return;
//         setLoading(false);
//       }
//     }
//     load();
//     return () => {
//       mounted = false;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [payment?.id]);

//   // Auto calculations from form (same logic as before)
//   useEffect(() => {
//     const base = parseFloat(form.basicPrice) || 0;
//     const discount =
//       form.discountType === "Percentage"
//         ? (base * (parseFloat(form.discountValue) || 0)) / 100
//         : parseFloat(form.discountValue) || 0;
//     const afterDiscount = Math.max(0, base - discount);

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

//   const handleSave = async () => {
//     // Build payload — adapt field names to your API contract
//     const id = form.id;
//     const payload = {
//       role: form.professional ?? form.role,
//       category: form.category,
//       dutySchedule: form.dutySchedule,
//       serviceTypeId: form.service, // or serviceName depending on backend
//       basePrice: Number(form.basicPrice) || 0,
//       discountType: form.discountType === "Percentage" ? "PERCENTAGE" : "AMOUNT",
//       discountValue: Number(form.discountValue) || 0,
//       staffPayAmount: Number(form.staffPayValue) || 0,
//       patientReferralDiscountType: form.patientReferralType === "Percentage" ? "PERCENTAGE" : "AMOUNT",
//       patientReferralValue: Number(form.patientReferralValue) || 0,
//       staffReferralDiscountType: form.staffReferralType === "Percentage" ? "PERCENTAGE" : "AMOUNT",
//       staffReferralValue: Number(form.staffReferralValue) || 0,
//       finalBill,
//       staffPayment,
//       patientReferralPayment,
//       staffReferralPayment,
//     };

//     try {
//       setLoading(true);
//       await updateStructure(id, payload);
//       setIsEditing(false);
//       onClose();
//     } catch (err) {
//       setError(err.message ?? String(err));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemove = async () => {
//     if (!confirm("Are you sure you want to remove this record?")) return;
//     try {
//       setLoading(true);
//       await removeStructure(form.id);
//       onClose();
//     } catch (err) {
//       setError(err.message ?? String(err));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
//       <div className="bg-white w-[700px] max-h-[90vh] overflow-y-auto rounded-[15px] p-6 shadow-lg relative">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-[#3674B5]">Payment Details</h2>
//           <div className="flex gap-3 items-center">
//             {!isEditing ? (
//               <>
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="cursor-pointer hover:scale-110 transition-transform"
//                   title="Edit"
//                 >
//                   <img src="/edit-btn.svg" className="size-7" alt="edit" />
//                 </button>

//                 <button
//                   onClick={handleRemove}
//                   className="bg-black text-white flex justify-center items-center size-7 rounded-md cursor-pointer hover:scale-110 transition-transform"
//                   title="Remove"
//                 >
//                   <MdDelete />
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button
//                   onClick={handleSave}
//                   className="bg-[#3674B5] text-white px-4 py-1 rounded-md text-sm hover:bg-[#2d5d93] transition-colors"
//                   disabled={loading}
//                 >
//                   {loading ? "Saving..." : "Save"}
//                 </button>
//                 <button
//                   onClick={() => {
//                     // cancel editing: reload original data (by re-fetch)
//                     const id = form.id;
//                     if (id) {
//                       // re-fetch from server to reset form
//                       (async () => {
//                         setLoading(true);
//                         try {
//                           const item = await fetchStructureById(id, form.role);
//                           const data = item?.data ?? item;
//                           setForm((prev) => ({
//                             ...prev,
//                             professional: data.professional ?? data.role ?? prev.professional,
//                             category: data.category ?? prev.category,
//                             dutySchedule: data.dutySchedule ?? prev.dutySchedule,
//                             service: data.serviceName ?? data.service ?? prev.service,
//                             basicPrice: data.basePrice ?? prev.basicPrice,
//                             discountType: (data.discountType && data.discountType.toUpperCase() === "PERCENTAGE") ? "Percentage" : "Amount",
//                             discountValue: data.discountValue ?? prev.discountValue,
//                             staffPayType: (data.staffPayDiscountType && data.staffPayDiscountType.toUpperCase() === "PERCENTAGE") ? "Percentage" : prev.staffPayType,
//                             staffPayValue: data.staffPayAmount ?? prev.staffPayValue,
//                             patientReferralType: (data.patientReferralDiscountType && data.patientReferralDiscountType.toUpperCase() === "PERCENTAGE") ? "Percentage" : prev.patientReferralType,
//                             patientReferralValue: data.patientReferralValue ?? prev.patientReferralValue,
//                             staffReferralType: (data.staffReferralDiscountType && data.staffReferralDiscountType.toUpperCase() === "PERCENTAGE") ? "Percentage" : prev.staffReferralType,
//                             staffReferralValue: data.staffReferralValue ?? prev.staffReferralValue,
//                           }));
//                         } catch (err) {
//                           setError(err.message ?? String(err));
//                         } finally {
//                           setLoading(false);
//                           setIsEditing(false);
//                         }
//                       })();
//                     } else {
//                       // no id — just close or reset
//                       setIsEditing(false);
//                     }
//                   }}
//                   className="ml-2 px-3 py-1 border rounded text-sm"
//                 >
//                   Cancel
//                 </button>
//               </>
//             )}
//             <button onClick={onClose} className="text-gray-600 text-xl hover:scale-110 transition-transform">✖</button>
//           </div>
//         </div>

//         {loading && (
//           <div className="mb-3 text-sm text-gray-500">Loading...</div>
//         )}
//         {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

//         {/* Section 1: Payment Details */}
//         <h3 className="text-[#3674B5] font-semibold text-base mb-2">Payment Details</h3>
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           {[
//             ["professional", "Professional", ["NURSE", "ASSISTANT", "TECHNICIAN"]],
//             ["category", "Category", ["GRADE_01", "GRADE_02"]],
//             ["dutySchedule", "Duty Schedule", ["SHIFT_24_HOURS", "DAY_SHIFT_12_HOURS"]],
//             ["service", "Service", ["Home Care", "Hospital"]],
//           ].map(([name, label, options]) => (
//             <div key={name}>
//               <label className="block text-sm mb-1">{label}</label>
//               <select
//                 name={name}
//                 value={form[name] ?? ""}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//               >
//                 <option value="">Select</option>
//                 {options.map((opt) => (
//                   <option key={opt} value={opt}>
//                     {opt}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           ))}

//           <div>
//             <label className="block text-sm mb-1">Enter Basic Price</label>
//             <input
//               type="number"
//               name="basicPrice"
//               value={form.basicPrice ?? ""}
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
//               value={form.discountValue ?? ""}
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
//               value={`₹${finalBill.toFixed(2)}`}
//               className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
//             />
//           </div>
//         </div>

//         {/* Section 2: Staff Pay */}
//         <h3 className="text-[#3674B5] font-semibold text-base mb-2">Staff Pay</h3>
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div>
//             <label className="block text-sm mb-1">Value</label>
//             <input
//               type="number"
//               name="staffPayValue"
//               value={form.staffPayValue ?? ""}
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
//               value={staffPayment ? `₹ ${staffPayment.toFixed(2)}` : `₹0.00`}
//               className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
//             />
//           </div>
//         </div>

//         {/* Section 3: Patient Referral Pay */}
//         <h3 className="text-[#3674B5] font-semibold text-base mb-2">Patient Referral Pay</h3>
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <PayInputGroup
//             prefix="patientReferral"
//             form={form}
//             isEditing={isEditing}
//             onChange={handleChange}
//             amount={patientReferralPayment}
//           />
//         </div>

//         {/* Section 4: Staff Referral Pay */}
//         <h3 className="text-[#3674B5] font-semibold text-base mb-2">Staff Referral Pay</h3>
//         <div className="grid grid-cols-3 gap-4">
//           <PayInputGroup
//             prefix="staffReferral"
//             form={form}
//             isEditing={isEditing}
//             onChange={handleChange}
//             amount={staffReferralPayment}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// /* 🔧 Sub-component for repeated payment type/value/amount pattern */
// function PayInputGroup({ prefix, form, isEditing, onChange, amount }) {
//   return (
//     <>
//       <div>
//         <label className="block text-sm mb-1">Type</label>
//         <select
//           name={`${prefix}Type`}
//           value={form[`${prefix}Type`] ?? "Amount"}
//           onChange={onChange}
//           disabled={!isEditing}
//           className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//         >
//           <option>Amount</option>
//           <option>Percentage</option>
//         </select>
//       </div>
//       <div>
//         <label className="block text-sm mb-1">Value</label>
//         <input
//           type="number"
//           name={`${prefix}Value`}
//           value={form[`${prefix}Value`] ?? ""}
//           onChange={onChange}
//           disabled={!isEditing}
//           className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//         />
//       </div>
//       <div>
//         <label className="block text-sm mb-1">Payment</label>
//         <input
//           type="text"
//           readOnly
//           value={`₹${(amount || 0).toFixed(2)}`}
//           className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
//         />
//       </div>
//     </>
//   );
// }

// export default ViewPaymentPopup;











// "use client";

// import React, { useEffect, useState } from "react";
// import { MdDelete } from "react-icons/md";
// import usePaymentStructureStore from "@/app/lib/store/usePaymentStructureStore";
// import usePatientServiceStore from "@/app/lib/store/usePatientServiceStore";

// /**
//  * ViewPaymentPopup
//  *
//  * Props:
//  *  - payment: object that must contain at least { id, role } or a partial object
//  *  - onClose: function
//  *
//  * Behavior:
//  *  - fetches full record by id on mount (if id provided)
//  *  - pre-fills role and service (service uses serviceTypeId which maps to service list ids)
//  *  - fields are editable only after clicking Edit
//  */
// const ROLE_ENUM = [
//   "REG_NURSES",
//   "NURSING_ASSISTANTS",
//   "TECHNICIANS",
//   "THERAPY",
//   "ANCILLARY",
//   "DOCTORS",
// ];

// function ViewPaymentPopup({ payment, onClose }) {
//   const {
//     fetchStructureById,
//     updateStructure,
//     removeStructure,
//   } = usePaymentStructureStore();

//   const {
//     listedServices: services,
//     fetchServices,
//     isLoading: isServicesLoading,
//   } = usePatientServiceStore();

//   const [loading, setLoading] = useState(false); // fetch/update/delete loading
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   // form state
//   const [form, setForm] = useState({
//     professional: "", // role
//     category: "",
//     dutySchedule: "",
//     service: "", // this will hold serviceTypeId (id)
//     basicPrice: "",
//     discountType: "Amount",
//     discountValue: "",
//     staffPayType: "Amount",
//     staffPayValue: "",
//     patientReferralType: "Amount",
//     patientReferralValue: "",
//     staffReferralType: "Amount",
//     staffReferralValue: "",
//     id: payment?.id ?? null,
//     role: payment?.role ?? null,
//   });

//   // computed values
//   const [finalBill, setFinalBill] = useState(0);
//   const [staffPayment, setStaffPayment] = useState(0);
//   const [patientReferralPayment, setPatientReferralPayment] = useState(0);
//   const [staffReferralPayment, setStaffReferralPayment] = useState(0);

//   // load services list on mount
//   useEffect(() => {
//     fetchServices();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // fetch the full structure by id on mount (if id provided)
//   useEffect(() => {
//     let mounted = true;
//     const id = payment?.id ?? form.id ?? null;
//     const providedRole = payment?.role ?? form.role ?? null;

//     if (!id) {
//       // If no id provided, use the provided payment object (if any)
//       if (payment) {
//         setForm((f) => ({ ...f, ...mapIncomingToForm(payment) }));
//       }
//       return;
//     }

//     (async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const item = await fetchStructureById(id, providedRole);
//         // API might return { data: {...} } or the item directly
//         const data = (item && (item.data ?? item)) || {};
//         if (!mounted) return;

//         setForm((prev) => ({
//           ...prev,
//           ...mapIncomingToForm(data, id, providedRole),
//         }));
//       } catch (err) {
//         if (!mounted) return;
//         setError(err.message ?? String(err));
//       } finally {
//         if (!mounted) return;
//         setLoading(false);
//       }
//     })();

//     return () => {
//       mounted = false;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [payment?.id]);

//   // Map API object to form keys (robust to different API field names)
//   function mapIncomingToForm(data = {}, fallbackId = null, fallbackRole = null) {
//     return {
//       professional: data.role ?? data.professional ?? fallbackRole ?? "",
//       category: data.category ?? data.grade ?? "",
//       dutySchedule: data.dutySchedule ?? data.shift ?? "",
//       // store service as serviceTypeId (id). If API returns serviceTypeId or serviceType, prefer id.
//       service: data.serviceTypeId ?? data.serviceId ?? data.service?.id ?? data.service ?? "",
//       basicPrice: data.basePrice ?? data.charge ?? data.basePrice ?? "",
//       discountType:
//         data.discountType && String(data.discountType).toUpperCase() === "PERCENTAGE"
//           ? "Percentage"
//           : "Amount",
//       discountValue: data.discountValue ?? data.discount ?? 0,
//       staffPayType:
//         (data.staffPayDiscountType && String(data.staffPayDiscountType).toUpperCase() === "PERCENTAGE")
//           ? "Percentage"
//           : "Amount",
//       staffPayValue: data.staffPayAmount ?? data.staffPayValue ?? data.staffPayment ?? 0,
//       patientReferralType:
//         (data.patientReferralDiscountType && String(data.patientReferralDiscountType).toUpperCase() === "PERCENTAGE")
//           ? "Percentage"
//           : "Amount",
//       patientReferralValue: data.patientReferralValue ?? data.patientReferral ?? 0,
//       staffReferralType:
//         (data.staffReferralDiscountType && String(data.staffReferralDiscountType).toUpperCase() === "PERCENTAGE")
//           ? "Percentage"
//           : "Amount",
//       staffReferralValue: data.staffReferralValue ?? data.staffReferral ?? 0,
//       id: data.id ?? data._id ?? fallbackId ?? null,
//       role: data.role ?? fallbackRole ?? data.professional ?? "",
//     };
//   }

//   // Auto calculations
//   useEffect(() => {
//     const base = parseFloat(form.basicPrice) || 0;
//     const discount =
//       form.discountType === "Percentage"
//         ? (base * (parseFloat(form.discountValue) || 0)) / 100
//         : parseFloat(form.discountValue) || 0;
//     const afterDiscount = Math.max(0, base - discount);

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

//   // Save -> call store.updateStructure
//   const handleSave = async () => {
//     setError(null);
//     const id = form.id;
//     if (!id) {
//       setError("Missing id; cannot update.");
//       return;
//     }

//     // Build payload according to previous convention used in store/api
//     const payload = {
//       role: form.professional || form.role,
//       category: form.category,
//       dutySchedule: form.dutySchedule,
//       serviceTypeId: form.service, // important: send id
//       basePrice: Number(form.basicPrice) || 0,
//       discountType: form.discountType === "Percentage" ? "PERCENTAGE" : "AMOUNT",
//       discountValue: Number(form.discountValue) || 0,
//       staffPayAmount: Number(form.staffPayValue) || 0,
//       patientReferralDiscountType: form.patientReferralType === "Percentage" ? "PERCENTAGE" : "AMOUNT",
//       patientReferralValue: Number(form.patientReferralValue) || 0,
//       staffReferralDiscountType: form.staffReferralType === "Percentage" ? "PERCENTAGE" : "AMOUNT",
//       staffReferralValue: Number(form.staffReferralValue) || 0,
//       finalBill,
//       staffPayment,
//       patientReferralPayment,
//       staffReferralPayment,
//     };

//     try {
//       setLoading(true);
//       await updateStructure(id, payload);
//       setIsEditing(false);
//       onClose();
//     } catch (err) {
//       setError(err.message ?? String(err));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Remove -> call store.removeStructure
//   const handleRemove = async () => {
//     if (!confirm("Are you sure you want to remove this record?")) return;
//     const id = form.id;
//     if (!id) {
//       setError("Missing id; cannot remove.");
//       return;
//     }
//     try {
//       setLoading(true);
//       await removeStructure(id);
//       onClose();
//     } catch (err) {
//       setError(err.message ?? String(err));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
//       <div className="bg-white w-[760px] max-h-[90vh] overflow-y-auto rounded-[15px] p-6 shadow-lg relative">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-[#3674B5]">Payment Details</h2>

//           <div className="flex gap-3 items-center">
//             {!isEditing ? (
//               <>
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="cursor-pointer hover:scale-110 transition-transform"
//                   title="Edit"
//                 >
//                   <img src="/edit-btn.svg" alt="edit" className="h-6 w-6" />
//                 </button>

//                 <button
//                   onClick={handleRemove}
//                   className="bg-black text-white flex justify-center items-center h-8 w-8 rounded-md cursor-pointer hover:scale-110 transition-transform"
//                   title="Remove"
//                   disabled={loading}
//                 >
//                   <MdDelete />
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button
//                   onClick={handleSave}
//                   className="bg-[#3674B5] text-white px-4 py-1 rounded-md text-sm hover:bg-[#2d5d93] transition-colors"
//                   disabled={loading}
//                 >
//                   {loading ? "Saving..." : "Save"}
//                 </button>

//                 <button
//                   onClick={async () => {
//                     // cancel editing -> re-fetch to revert changes (best-effort)
//                     const id = form.id;
//                     if (!id) {
//                       setIsEditing(false);
//                       return;
//                     }
//                     try {
//                       setLoading(true);
//                       const item = await fetchStructureById(id, form.role);
//                       const data = (item && (item.data ?? item)) || {};
//                       setForm((prev) => ({ ...prev, ...mapIncomingToForm(data, id, form.role) }));
//                       setIsEditing(false);
//                     } catch (err) {
//                       setError(err.message ?? String(err));
//                     } finally {
//                       setLoading(false);
//                     }
//                   }}
//                   className="ml-2 px-3 py-1 border rounded text-sm"
//                 >
//                   Cancel
//                 </button>
//               </>
//             )}

//             <button
//               onClick={onClose}
//               className="text-gray-600 text-xl hover:scale-110 transition-transform ml-2"
//               title="Close"
//             >
//               ✖
//             </button>
//           </div>
//         </div>

//         {loading && <div className="mb-3 text-sm text-gray-500">Loading...</div>}
//         {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

//         {/* Payment Details */}
//         <h3 className="text-[#3674B5] font-semibold text-base mb-2">Payment Details</h3>
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           {/* ROLE / PROFESSIONAL */}
//           <div>
//             <label className="block text-sm mb-1">Role</label>
//             <select
//               name="professional"
//               value={form.professional ?? ""}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//             >
//               <option value="">Select Role</option>
//               {ROLE_ENUM.map((r) => (
//                 <option key={r} value={r}>
//                   {r}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* CATEGORY */}
//           <div>
//             <label className="block text-sm mb-1">Category</label>
//             <input
//               name="category"
//               value={form.category ?? ""}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//             />
//           </div>

//           {/* DUTY SCHEDULE */}
//           <div>
//             <label className="block text-sm mb-1">Duty Schedule</label>
//             <input
//               name="dutySchedule"
//               value={form.dutySchedule ?? ""}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//             />
//           </div>

//           {/* SERVICE SELECT (serviceTypeId as value) */}
//           <div>
//             <label className="block text-sm mb-1">Service</label>
//             <select
//               name="service"
//               value={form.service ?? ""}
//               onChange={handleChange}
//               disabled={!isEditing || isServicesLoading}
//               className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//             >
//               <option value="">Select Service</option>
//               {services.map((srv) => (
//                 <option key={srv.id} value={srv.id}>
//                   {srv.service}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* BASIC PRICE */}
//           <div>
//             <label className="block text-sm mb-1">Enter Basic Price</label>
//             <input
//               type="number"
//               name="basicPrice"
//               value={form.basicPrice ?? ""}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//             />
//           </div>

//           {/* DISCOUNT TYPE */}
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

//           {/* DISCOUNT VALUE */}
//           <div>
//             <label className="block text-sm mb-1">Discount Value</label>
//             <input
//               type="number"
//               name="discountValue"
//               value={form.discountValue ?? ""}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//             />
//           </div>

//           {/* FINAL BILL (read-only) */}
//           <div>
//             <label className="block text-sm mb-1">Final Bill</label>
//             <input
//               type="text"
//               readOnly
//               value={`₹${(finalBill || 0).toFixed(2)}`}
//               className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
//             />
//           </div>
//         </div>

//         {/* Staff Pay */}
//         <h3 className="text-[#3674B5] font-semibold text-base mb-2">Staff Pay</h3>
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div>
//             <label className="block text-sm mb-1">Value</label>
//             <input
//               type="number"
//               name="staffPayValue"
//               value={form.staffPayValue ?? ""}
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
//               value={`₹${(staffPayment || 0).toFixed(2)}`}
//               className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
//             />
//           </div>
//         </div>

//         {/* Patient Referral */}
//         <h3 className="text-[#3674B5] font-semibold text-base mb-2">Patient Referral Pay</h3>
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <PayInputGroup
//             prefix="patientReferral"
//             form={form}
//             isEditing={isEditing}
//             onChange={handleChange}
//             amount={patientReferralPayment}
//           />
//         </div>

//         {/* Staff Referral */}
//         <h3 className="text-[#3674B5] font-semibold text-base mb-2">Staff Referral Pay</h3>
//         <div className="grid grid-cols-3 gap-4">
//           <PayInputGroup
//             prefix="staffReferral"
//             form={form}
//             isEditing={isEditing}
//             onChange={handleChange}
//             amount={staffReferralPayment}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// /* Reusable pay group */
// function PayInputGroup({ prefix, form, isEditing, onChange, amount }) {
//   return (
//     <>
//       <div>
//         <label className="block text-sm mb-1">Type</label>
//         <select
//           name={`${prefix}Type`}
//           value={form[`${prefix}Type`] ?? "Amount"}
//           onChange={onChange}
//           disabled={!isEditing}
//           className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//         >
//           <option>Amount</option>
//           <option>Percentage</option>
//         </select>
//       </div>

//       <div>
//         <label className="block text-sm mb-1">Value</label>
//         <input
//           type="number"
//           name={`${prefix}Value`}
//           value={form[`${prefix}Value`] ?? ""}
//           onChange={onChange}
//           disabled={!isEditing}
//           className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
//         />
//       </div>

//       <div>
//         <label className="block text-sm mb-1">Payment</label>
//         <input
//           type="text"
//           readOnly
//           value={`₹${(amount || 0).toFixed(2)}`}
//           className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
//         />
//       </div>
//     </>
//   );
// }

// export default ViewPaymentPopup;




"use client";

import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import usePaymentStructureStore from "@/app/lib/store/usePaymentStructureStore";
import usePatientServiceStore from "@/app/lib/store/usePatientServiceStore";

const ROLE_ENUM = [
  "REG_NURSES",
  "NURSING_ASSISTANTS",
  "TECHNICIANS",
  "THERAPY",
  "ANCILLARY",
  "DOCTORS",
];

const CATEGORY_ENUM = [
  "GRADE_01",
  "GRADE_02",
  "GRADE_03",
  "GRADE_04",
  "GRADE_05",
  "GRADE_06",
  "GRADE_07",
];

function ViewPaymentPopup({ payment, onClose }) {
  const { fetchStructureById, updateStructure, removeStructure } = usePaymentStructureStore();
  const { listedServices: services, fetchServices, isLoading: isServicesLoading } = usePatientServiceStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
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
    id: payment?.id ?? null,
    role: payment?.role ?? null,
  });

  const [finalBill, setFinalBill] = useState(0);
  const [staffPayment, setStaffPayment] = useState(0);
  const [patientReferralPayment, setPatientReferralPayment] = useState(0);
  const [staffReferralPayment, setStaffReferralPayment] = useState(0);

  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let mounted = true;
    const id = payment?.id ?? form.id ?? null;
    const providedRole = payment?.role ?? form.role ?? null;

    if (!id) {
      if (payment) {
        setForm((f) => ({ ...f, ...mapIncomingToForm(payment) }));
      }
      return;
    }

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const item = await fetchStructureById(id, providedRole);
        const data = (item && (item.data ?? item)) || {};
        if (!mounted) return;
        setForm((prev) => ({ ...prev, ...mapIncomingToForm(data, id, providedRole) }));
      } catch (err) {
        if (!mounted) return;
        setError(err.message ?? String(err));
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment?.id]);

  function mapIncomingToForm(data = {}, fallbackId = null, fallbackRole = null) {
    return {
      professional: data.role ?? data.professional ?? fallbackRole ?? "",
      category: data.category ?? data.grade ?? "",
      dutySchedule: data.dutySchedule ?? data.shift ?? "",
      service: data.serviceTypeId ?? data.serviceId ?? data.service?.id ?? data.service ?? "",
      basicPrice: data.basePrice ?? data.charge ?? data.basePrice ?? "",
      discountType:
        data.discountType && String(data.discountType).toUpperCase() === "PERCENTAGE"
          ? "Percentage"
          : "Amount",
      discountValue: data.discountValue ?? data.discount ?? 0,
      staffPayType:
        (data.staffPayDiscountType && String(data.staffPayDiscountType).toUpperCase() === "PERCENTAGE")
          ? "Percentage"
          : "Amount",
      staffPayValue: data.staffPayAmount ?? data.staffPayValue ?? data.staffPayment ?? 0,
      patientReferralType:
        (data.patientReferralDiscountType && String(data.patientReferralDiscountType).toUpperCase() === "PERCENTAGE")
          ? "Percentage"
          : "Amount",
      patientReferralValue: data.patientReferralValue ?? data.patientReferral ?? 0,
      staffReferralType:
        (data.staffReferralDiscountType && String(data.staffReferralDiscountType).toUpperCase() === "PERCENTAGE")
          ? "Percentage"
          : "Amount",
      staffReferralValue: data.staffReferralValue ?? data.staffReferral ?? 0,
      id: data.id ?? data._id ?? fallbackId ?? null,
      role: data.role ?? fallbackRole ?? data.professional ?? "",
    };
  }

  useEffect(() => {
    const base = parseFloat(form.basicPrice) || 0;
    const discount =
      form.discountType === "Percentage"
        ? (base * (parseFloat(form.discountValue) || 0)) / 100
        : parseFloat(form.discountValue) || 0;
    const afterDiscount = Math.max(0, base - discount);

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

  const handleSave = async () => {
    setError(null);
    const id = form.id;
    if (!id) {
      setError("Missing id; cannot update.");
      return;
    }

    const payload = {
      
      role: form.professional || form.role,
      category: form.category,
      dutySchedule: form.dutySchedule,
      serviceTypeId: form.service,
      basePrice: Number(form.basicPrice) || 0,
      discountType: form.discountType === "Percentage" ? "PERCENTAGE" : "AMOUNT",
      discountValue: Number(form.discountValue) || 0,
      staffPayAmount: Number(form.staffPayValue) || 0,
      patientReferralDiscountType: form.patientReferralType === "Percentage" ? "PERCENTAGE" : "AMOUNT",
      patientReferralValue: Number(form.patientReferralValue) || 0,
      staffReferralDiscountType: form.staffReferralType === "Percentage" ? "PERCENTAGE" : "AMOUNT",
      staffReferralValue: Number(form.staffReferralValue) || 0,
      finalBill,
      staffPayment,
      patientReferralPayment,
      staffReferralPayment,
    };

    try {
      setLoading(true);
      await updateStructure(id, payload);
      setIsEditing(false);
      onClose();
    } catch (err) {
      setError(err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!confirm("Are you sure you want to remove this record?")) return;
    const id = form.id;
    if (!id) {
      setError("Missing id; cannot remove.");
      return;
    }
    try {
      setLoading(true);
      await removeStructure(id);
      onClose();
    } catch (err) {
      setError(err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
      <div className="bg-white w-[760px] max-h-[90vh] overflow-y-auto rounded-[15px] p-6 shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#3674B5]">Payment Details</h2>

          <div className="flex gap-3 items-center">
            {!isEditing ? (
              <>
                <button onClick={() => setIsEditing(true)} className="cursor-pointer hover:scale-110 transition-transform" title="Edit">
                  <img src="/edit-btn.svg" alt="edit" className="h-6 w-6" />
                </button>

                <button onClick={handleRemove} className="bg-black text-white flex justify-center items-center h-8 w-8 rounded-md cursor-pointer hover:scale-110 transition-transform" title="Remove" disabled={loading}>
                  <MdDelete />
                </button>
              </>
            ) : (
              <>
                <button onClick={handleSave} className="bg-[#3674B5] text-white px-4 py-1 rounded-md text-sm hover:bg-[#2d5d93] transition-colors" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </button>

                <button
                  onClick={async () => {
                    const id = form.id;
                    if (!id) {
                      setIsEditing(false);
                      return;
                    }
                    try {
                      setLoading(true);
                      const item = await fetchStructureById(id, form.role);
                      const data = (item && (item.data ?? item)) || {};
                      setForm((prev) => ({ ...prev, ...mapIncomingToForm(data, id, form.role) }));
                      setIsEditing(false);
                    } catch (err) {
                      setError(err.message ?? String(err));
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className="ml-2 px-3 py-1 border rounded text-sm"
                >
                  Cancel
                </button>
              </>
            )}

            <button onClick={onClose} className="text-gray-600 text-xl hover:scale-110 transition-transform ml-2" title="Close">
              ✖
            </button>
          </div>
        </div>

        {loading && <div className="mb-3 text-sm text-gray-500">Loading...</div>}
        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

        <h3 className="text-[#3674B5] font-semibold text-base mb-2">Payment Details</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* ROLE */}
          <div>
            <label className="block text-sm mb-1">Role</label>
            <select name="professional" value={form.professional ?? ""} onChange={handleChange} disabled={!isEditing} className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100">
              <option value="">Select Role</option>
              {ROLE_ENUM.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* CATEGORY (now a select) */}
          <div>
            <label className="block text-sm mb-1">Category</label>
            <select name="category" value={form.category ?? ""} onChange={handleChange} disabled={!isEditing} className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100">
              <option value="">Select Category</option>
              {CATEGORY_ENUM.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* DUTY */}
          <div>
            <label className="block text-sm mb-1">Duty Schedule</label>
            <input name="dutySchedule" value={form.dutySchedule ?? ""} onChange={handleChange} disabled={!isEditing} className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100" />
          </div>

          {/* SERVICE SELECT */}
          <div>
            <label className="block text-sm mb-1">Service</label>
            <select name="service" value={form.service ?? ""} onChange={handleChange} disabled={!isEditing || isServicesLoading} className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100">
              <option value="">Select Service</option>
              {services.map((srv) => (
                <option key={srv.id} value={srv.id}>
                  {srv.service}
                </option>
              ))}
            </select>
          </div>

          {/* BASIC PRICE */}
          <div>
            <label className="block text-sm mb-1">Enter Basic Price</label>
            <input type="number" name="basicPrice" value={form.basicPrice ?? ""} onChange={handleChange} disabled={!isEditing} className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100" />
          </div>

          {/* DISCOUNT TYPE */}
          <div>
            <label className="block text-sm mb-1">Discount Type</label>
            <select name="discountType" value={form.discountType} onChange={handleChange} disabled={!isEditing} className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100">
              <option>Amount</option>
              <option>Percentage</option>
            </select>
          </div>

          {/* DISCOUNT VALUE */}
          <div>
            <label className="block text-sm mb-1">Discount Value</label>
            <input type="number" name="discountValue" value={form.discountValue ?? ""} onChange={handleChange} disabled={!isEditing} className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100" />
          </div>

          {/* FINAL BILL */}
          <div>
            <label className="block text-sm mb-1">Final Bill</label>
            <input type="text" readOnly value={`₹${(finalBill || 0).toFixed(2)}`} className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100" />
          </div>
        </div>

        <h3 className="text-[#3674B5] font-semibold text-base mb-2">Staff Pay</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-1">Value</label>
            <input type="number" name="staffPayValue" value={form.staffPayValue ?? ""} onChange={handleChange} disabled={!isEditing} className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100" />
          </div>

          <div>
            <label className="block text-sm mb-1">Payment</label>
            <input type="text" readOnly value={`₹${(staffPayment || 0).toFixed(2)}`} className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100" />
          </div>
        </div>

        <h3 className="text-[#3674B5] font-semibold text-base mb-2">Patient Referral Pay</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <PayInputGroup prefix="patientReferral" form={form} isEditing={isEditing} onChange={handleChange} amount={patientReferralPayment} />
        </div>

        <h3 className="text-[#3674B5] font-semibold text-base mb-2">Staff Referral Pay</h3>
        <div className="grid grid-cols-3 gap-4">
          <PayInputGroup prefix="staffReferral" form={form} isEditing={isEditing} onChange={handleChange} amount={staffReferralPayment} />
        </div>
      </div>
    </div>
  );
}

function PayInputGroup({ prefix, form, isEditing, onChange, amount }) {
  return (
    <>
      <div>
        <label className="block text-sm mb-1">Type</label>
        <select name={`${prefix}Type`} value={form[`${prefix}Type`] ?? "Amount"} onChange={onChange} disabled={!isEditing} className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100">
          <option>Amount</option>
          <option>Percentage</option>
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1">Value</label>
        <input type="number" name={`${prefix}Value`} value={form[`${prefix}Value`] ?? ""} onChange={onChange} disabled={!isEditing} className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100" />
      </div>

      <div>
        <label className="block text-sm mb-1">Payment</label>
        <input type="text" readOnly value={`₹${(amount || 0).toFixed(2)}`} className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100" />
      </div>
    </>
  );
}

export default ViewPaymentPopup;
