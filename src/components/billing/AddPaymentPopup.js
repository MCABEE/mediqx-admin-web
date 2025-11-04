// "use client";

// import React, { useState, useEffect } from "react";

// function AddPaymentPopup({ onClose }) {
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
//   });

//   const [finalBill, setFinalBill] = useState(0);
//   const [staffPayment, setStaffPayment] = useState(0);
//   const [patientReferralPayment, setPatientReferralPayment] = useState(0);
//   const [staffReferralPayment, setStaffReferralPayment] = useState(0);

//   // Auto calculations
//   useEffect(() => {
//     const base = parseFloat(form.basicPrice) || 0;

//     // Discount
//     const discount =
//       form.discountType === "Percentage"
//         ? (base * (parseFloat(form.discountValue) || 0)) / 100
//         : parseFloat(form.discountValue) || 0;

//     const afterDiscount = base - discount;

//     // Staff Pay
//     const staffPay =
//       form.staffPayType === "Percentage"
//         ? (afterDiscount * (parseFloat(form.staffPayValue) || 0)) / 100
//         : parseFloat(form.staffPayValue) || 0;

//     // Patient Referral Pay
//     const patientReferral =
//       form.patientReferralType === "Percentage"
//         ? (afterDiscount * (parseFloat(form.patientReferralValue) || 0)) / 100
//         : parseFloat(form.patientReferralValue) || 0;

//     // Staff Referral Pay
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
//     console.log("Form Data:", { ...form, finalBill, staffPayment, patientReferralPayment, staffReferralPayment });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
//       <div className="bg-white w-[700px] max-h-[90vh] overflow-y-auto rounded-[15px] p-6 shadow-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-[#3674B5]">
//             Add Payment
//           </h2>
//           <button onClick={onClose} className="text-gray-600 text-xl">✖</button>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           {/* Professional */}
//           <div>
//             <label className="block mb-1 text-sm font-medium">Select Professional</label>
//             <select
//               name="professional"
//               value={form.professional}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             >
//               <option value="">Select</option>
//               <option value="Nurse">Nurse</option>
//               <option value="Assistant">Assistant</option>
//               <option value="Technician">Technician</option>
//             </select>
//           </div>

//           {/* Category */}
//           <div>
//             <label className="block mb-1 text-sm font-medium">Select Category</label>
//             <select
//               name="category"
//               value={form.category}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             >
//               <option value="">Select</option>
//               <option value="General">General</option>
//               <option value="Specialized">Specialized</option>
//             </select>
//           </div>

//           {/* Duty Schedule */}
//           <div>
//             <label className="block mb-1 text-sm font-medium">Select Duty Schedule</label>
//             <select
//               name="dutySchedule"
//               value={form.dutySchedule}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             >
//               <option value="">Select</option>
//               <option value="Full-time">Full-time</option>
//               <option value="Part-time">Part-time</option>
//             </select>
//           </div>

//           {/* Service */}
//           <div>
//             <label className="block mb-1 text-sm font-medium">Select Service</label>
//             <select
//               name="service"
//               value={form.service}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             >
//               <option value="">Select</option>
//               <option value="Home Care">Home Care</option>
//               <option value="Hospital">Hospital</option>
//             </select>
//           </div>

//           {/* Basic Price */}
//           <div>
//             <label className="block mb-1 text-sm font-medium">Enter Basic Price</label>
//             <input
//               type="number"
//               name="basicPrice"
//               value={form.basicPrice}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             />
//           </div>

//           {/* Discount */}
//           <div>
//             <label className="block mb-1 text-sm font-medium">Discount Type</label>
//             <select
//               name="discountType"
//               value={form.discountType}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             >
//               <option>Amount</option>
//               <option>Percentage</option>
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium">Discount Value</label>
//             <input
//               type="number"
//               name="discountValue"
//               value={form.discountValue}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium">Final Bill</label>
//             <input
//               type="text"
//               readOnly
//               value={finalBill.toFixed(2)}
//               className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
//             />
//           </div>

//           {/* Staff Pay */}
//           <div>
//             <label className="block mb-1 text-sm font-medium">Staff Pay Type</label>
//             <select
//               name="staffPayType"
//               value={form.staffPayType}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             >
//               <option>Amount</option>
//               <option>Percentage</option>
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium">Staff Pay Value</label>
//             <input
//               type="number"
//               name="staffPayValue"
//               value={form.staffPayValue}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium">Staff Payment</label>
//             <input
//               type="text"
//               readOnly
//               value={staffPayment.toFixed(2)}
//               className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
//             />
//           </div>

//           {/* Patient Referral Pay */}
//           <div>
//             <label className="block mb-1 text-sm font-medium">Patient Referral Type</label>
//             <select
//               name="patientReferralType"
//               value={form.patientReferralType}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             >
//               <option>Amount</option>
//               <option>Percentage</option>
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium">Patient Referral Value</label>
//             <input
//               type="number"
//               name="patientReferralValue"
//               value={form.patientReferralValue}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium">Patient Referral Payment</label>
//             <input
//               type="text"
//               readOnly
//               value={patientReferralPayment.toFixed(2)}
//               className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
//             />
//           </div>

//           {/* Staff Referral Pay */}
//           <div>
//             <label className="block mb-1 text-sm font-medium">Staff Referral Type</label>
//             <select
//               name="staffReferralType"
//               value={form.staffReferralType}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             >
//               <option>Amount</option>
//               <option>Percentage</option>
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium">Staff Referral Value</label>
//             <input
//               type="number"
//               name="staffReferralValue"
//               value={form.staffReferralValue}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium">Staff Referral Amount</label>
//             <input
//               type="text"
//               readOnly
//               value={staffReferralPayment.toFixed(2)}
//               className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
//             />
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             onClick={handleSave}
//             className="bg-[#3674B5] text-white px-5 py-2 rounded-md text-sm"
//           >
//             Save
//           </button>
//           <button className="bg-yellow-500 text-white px-5 py-2 rounded-md text-sm">
//             Edit / Update
//           </button>
//           <button
//             className="bg-red-500 text-white px-5 py-2 rounded-md text-sm"
//             onClick={onClose}
//           >
//             Remove
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddPaymentPopup;















"use client";

import React, { useState, useEffect } from "react";

function AddPaymentPopup({ onClose }) {
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
  });

  const [finalBill, setFinalBill] = useState(0);
  const [staffPayment, setStaffPayment] = useState(0);
  const [patientReferralPayment, setPatientReferralPayment] = useState(0);
  const [staffReferralPayment, setStaffReferralPayment] = useState(0);

  // Auto calculations
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
    console.log("Saved Payment Data:", {
      ...form,
      finalBill,
      staffPayment,
      patientReferralPayment,
      staffReferralPayment,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
      <div className="bg-white w-[700px] max-h-[90vh] overflow-y-auto rounded-[15px] p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#3674B5]">
            Add Payment
          </h2>
          <button onClick={onClose} className="text-gray-600 text-xl">
            ✖
          </button>
        </div>

        {/* Section 1: Payment Details */}
        <h3 className="text-[#3674B5] font-semibold text-base mb-2">
          Payment Details
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-1">Select Professional</label>
            <select
              name="professional"
              value={form.professional}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="Nurse">Nurse</option>
              <option value="Assistant">Assistant</option>
              <option value="Technician">Technician</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Select Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="General">General</option>
              <option value="Specialized">Specialized</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Select Duty Schedule</label>
            <select
              name="dutySchedule"
              value={form.dutySchedule}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Select Service</label>
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="Home Care">Home Care</option>
              <option value="Hospital">Hospital</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Enter Basic Price</label>
            <input
              type="number"
              name="basicPrice"
              value={form.basicPrice}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Discount Type</label>
            <select
              name="discountType"
              value={form.discountType}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
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
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Final Bill</label>
            <input
              type="text"
              readOnly
              value={finalBill.toFixed(2)}
              className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Section 2: Staff Pay */}
        <h3 className="text-[#3674B5] font-semibold text-base mb-2">
          Staff Pay
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-1">Type</label>
            <select
              name="staffPayType"
              value={form.staffPayType}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option>Amount</option>
              <option>Percentage</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Value</label>
            <input
              type="number"
              name="staffPayValue"
              value={form.staffPayValue}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Payment</label>
            <input
              type="text"
              readOnly
              value={staffPayment.toFixed(2)}
              className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Section 3: Patient Referral Pay */}
        <h3 className="text-[#3674B5] font-semibold text-base mb-2">
          Patient Referral Pay
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-1">Type</label>
            <select
              name="patientReferralType"
              value={form.patientReferralType}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option>Amount</option>
              <option>Percentage</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Value</label>
            <input
              type="number"
              name="patientReferralValue"
              value={form.patientReferralValue}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Payment</label>
            <input
              type="text"
              readOnly
              value={patientReferralPayment.toFixed(2)}
              className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Section 4: Staff Referral Pay */}
        <h3 className="text-[#3674B5] font-semibold text-base mb-2">
          Staff Referral Pay
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-1">Type</label>
            <select
              name="staffReferralType"
              value={form.staffReferralType}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option>Amount</option>
              <option>Percentage</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Value</label>
            <input
              type="number"
              name="staffReferralValue"
              value={form.staffReferralValue}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Amount</label>
            <input
              type="text"
              readOnly
              value={staffReferralPayment.toFixed(2)}
              className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="bg-[#3674B5] text-white px-6 py-2 rounded-md text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPaymentPopup;
