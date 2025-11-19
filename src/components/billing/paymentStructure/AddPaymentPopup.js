

// "use client";

// import React, { useEffect, useState } from "react";
// import usePaymentStructureStore from "@/app/lib/store/usePaymentStructureStore";
// import usePatientServiceStore from "@/app/lib/store/usePatientServiceStore";

// // ENUMS
// const ROLE_ENUM = [
//   "REG_NURSES",
//   "NURSING_ASSISTANTS",
//   "TECHNICIANS",
//   "THERAPY",
//   "ANCILLARY",
//   "DOCTORS",
// ];

// const CATEGORY_ENUM = [
//   "GRADE_01",
//   "GRADE_02",
//   "GRADE_03",
//   "GRADE_04",
//   "GRADE_05",
//   "GRADE_06",
//   "GRADE_07",
// ];

// const DUTY_SCHEDULE_ENUM = [
//   "SHIFT_24_HOURS",
//   "DAY_SHIFT_12_HOURS",
//   "NIGHT_SHIFT_12_HOURS",
//   "SHIFT_FLEXIBLE_HOURS",
// ];

// export default function AddPaymentPopup({ onClose }) {
//   const { saveStructure, loading } = usePaymentStructureStore();
//   const {
//     listedServices: services,
//     fetchServices,
//     isLoading: isServicesLoading,
//   } = usePatientServiceStore();

//   const [form, setForm] = useState({
//     role: "",
//     category: "",
//     dutySchedule: "",
//     service: "",
//     basicPrice: "", // raw input string, can hold '1000' or '1000, 200'
//     discountType: "Amount",
//     discountValue: "",
//     staffPayValue: "",
//     patientReferralType: "Amount",
//     patientReferralValue: "",
//     staffReferralType: "Amount",
//     staffReferralValue: "",
//   });

//   // derived numeric totals and breakdowns
//   const [derived, setDerived] = useState({
//     baseTotal: 0,
//     baseBreakdown: [],

//     discountTotal: 0,
//     discountBreakdown: [],

//     staffPayTotal: 0,
//     staffPayBreakdown: [],

//     patientReferralTotal: 0,
//     patientReferralBreakdown: [],

//     staffReferralTotal: 0,
//     staffReferralBreakdown: [],
//   });

//   const [finalBill, setFinalBill] = useState(0);
//   const [staffPayment, setStaffPayment] = useState(0);
//   const [patientReferralPayment, setPatientReferralPayment] = useState(0);
//   const [staffReferralPayment, setStaffReferralPayment] = useState(0);

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     fetchServices();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);


//   // run calculations whenever form changes
//   useEffect(() => {
//     // base
//     const { list: baseList, sum: baseSum } = parseNumberList(form.basicPrice);

//     // discount
//     const { list: discList, sum: discSum } = parseNumberList(form.discountValue);

//     // staff pay
//     const { list: spList, sum: spSum } = parseNumberList(form.staffPayValue);

//     // patient referral
//     const { list: prList, sum: prSum } = parseNumberList(
//       form.patientReferralValue
//     );

//     // staff referral
//     const { list: srList, sum: srSum } = parseNumberList(form.staffReferralValue);

//     // compute discount amount based on type
//     const base = baseSum || 0;
//     const discountAmount =
//       form.discountType === "Percentage" ? (base * (discSum || 0)) / 100 : discSum || 0;
//     const afterDiscount = Math.max(0, base - discountAmount);

//     // compute referral/staff payments
//     const staffPay = spSum || 0;
//     const patientReferralPayment =
//       form.patientReferralType === "Percentage"
//         ? ((prSum || 0) / 100) * afterDiscount
//         : prSum || 0;
//     const staffReferralPayment =
//       form.staffReferralType === "Percentage"
//         ? ((srSum || 0) / 100) * afterDiscount
//         : srSum || 0;

//     setDerived({
//       baseTotal: baseSum,
//       baseBreakdown: baseList,

//       discountTotal: discSum,
//       discountBreakdown: discList,

//       staffPayTotal: spSum,
//       staffPayBreakdown: spList,

//       patientReferralTotal: prSum,
//       patientReferralBreakdown: prList,

//       staffReferralTotal: srSum,
//       staffReferralBreakdown: srList,
//     });

//     setFinalBill(afterDiscount);
//     setStaffPayment(staffPay);
//     setPatientReferralPayment(patientReferralPayment);
//     setStaffReferralPayment(staffReferralPayment);
//   }, [form]);

//   // --- utility: parse a string into numbers (accepts comma, semicolon, or whitespace separators)
//   const parseNumberList = (raw) => {
//     if (raw === null || raw === undefined) return { list: [], sum: 0 };
//     const s = String(raw).trim();
//     if (s === "") return { list: [], sum: 0 };

//     // allow separators: comma, semicolon, or whitespace
//     const parts = s
//       .split(/[,;\s]+/)
//       .map((p) => p.trim())
//       .filter(Boolean);

//     const nums = parts.map((p) => {
//       // remove stray thousand separators (commas inside numbers) if user pasted "1,000"
//       const cleaned = p.replace(/,/g, "");
//       const n = Number(cleaned);
//       return Number.isFinite(n) ? n : NaN;
//     });

//     const valid = nums.filter((n) => !Number.isNaN(n));
//     const sum = valid.reduce((a, b) => a + b, 0);
//     return { list: valid, sum };
//   };

//   // --- New: gentle numeric input sanitizer for onChange (does not aggressively reformat)
//   // Keeps typing smooth; removes clearly invalid chars; allows digits, dot, comma, semicolon, whitespace, minus.
//   // e.g. "1,000" remains "1,000" while typing; paste handler will convert "1,000" -> "1000".
//   const handleNumberChange = (e) => {
//     const { name, value } = e.target;
    
//     if (!value) {
//       // setForm((p) => ({ ...p, [name]: "" }));
//       return;
//     }

//     // Allow digits, dot, comma, semicolon, whitespace and minus sign.
//     // Remove any other characters (letters, symbols except above).
//     const cleaned = String(value).replace(/[^0-9.,;\s-]/g, "");

//     // Replace multiple spaces with single space, collapse multiple commas/semicolons into single comma for neatness
//     // but we don't aggressively reformat numbers (so caret won't jump)
//     const collapsed = cleaned
//       .replace(/[ \t]+/g, " ")
//       .replace(/,+/g, ",")
//       .replace(/;+/g, ";")
//       .trim();

//     setForm((p) => ({ ...p, [name]: collapsed }));
//   };

//   // --- New: paste handler to sanitize pasted values like "1,000" -> "1000"
//   const handlePasteNumbers = (e) => {
//     // We only sanitize text paste; allow default for non-text
//     const paste = e.clipboardData?.getData("text");
//     if (!paste) return;
//     // If pasted text contains commas inside digits like "1,000", remove internal commas.
//     // We'll replace occurrences of digits with internal commas: (\d),(?=\d{3}\b) ... but simple approach:
//     const cleaned = paste.replace(/(\d),(\d)/g, "$1$2"); // simple collapse single thousand commas
//     // Put cleaned text into target value (this still fires onChange afterwards)
//     e.preventDefault();
//     const target = e.target;
//     const name = target.name;
//     // insert cleaned text at caret position if needed — for simplicity append cleaned
//     // Better: set full value = current value + cleaned (caret-aware behavior is complex)
//     // We'll set the full input value to current raw + cleaned
//     const current = target.value || "";
//     // Attempt to insert at caret if possible:
//     try {
//       const start = target.selectionStart ?? current.length;
//       const end = target.selectionEnd ?? current.length;
//       const newVal = current.slice(0, start) + cleaned + current.slice(end);
//       const reduced = String(newVal).replace(/[^0-9.,;\s-]/g, "");
//       setForm((p) => ({ ...p, [name]: reduced }));
//       // set caret after pasted text on next tick (best effort)
//       setTimeout(() => {
//         try {
//           target.selectionStart = target.selectionEnd = start + cleaned.length;
//         } catch (err) {
//           /* noop */
//         }
//       }, 0);
//     } catch (err) {
//       // fallback: just set cleaned
//       setForm((p) => ({ ...p, [name]: cleaned.replace(/[^0-9.,;\s-]/g, "") }));
//     }
//   };

  

//   // handle generic changes for non-numeric fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((p) => ({ ...p, [name]: value }));
//   };

//   // VALIDATION (requires all fields, checks totals)
//   const validate = () => {
//     const newErrors = {};

//     if (!form.role) newErrors.role = "Role is required";
//     if (!form.category) newErrors.category = "Category is required";
//     if (!form.dutySchedule) newErrors.dutySchedule = "Duty schedule required";
//     if (!form.service) newErrors.service = "Select service";

//     // Basic price: must have at least one valid number and total > 0
//     const { list: baseList, sum: baseSum } = parseNumberList(form.basicPrice);
//     if (form.basicPrice === "" || baseList.length === 0)
//       newErrors.basicPrice = "Enter basic price (single or multiple numbers)";
//     else if (baseSum <= 0) newErrors.basicPrice = "Basic price total must be > 0";

//     // Discount: must have at least one valid number
//     const { list: discList } = parseNumberList(form.discountValue);
//     if (form.discountValue === "" || discList.length === 0)
//       newErrors.discountValue = "Enter discount (single or multiple)";
//     else {
//       if (form.discountType === "Percentage" && discList.some((n) => n < 0 || n > 100))
//         newErrors.discountValue = "Each percentage must be 0–100";
//       if (discList.some((n) => n < 0)) newErrors.discountValue = "Discount cannot be negative";
//     }

//     const base = baseSum || 0;
//     const { sum: discSum } = parseNumberList(form.discountValue);
//     const discountAmount = form.discountType === "Percentage" ? (base * (discSum || 0)) / 100 : discSum || 0;
//     const afterDiscount = Math.max(0, base - discountAmount);

//     // staff pay
//     const { list: spList, sum: spSum } = parseNumberList(form.staffPayValue);
//     if (form.staffPayValue === "" || spList.length === 0)
//       newErrors.staffPayValue = "Enter staff pay (single or multiple)";
//     else {
//       if (spList.some((n) => n < 0)) newErrors.staffPayValue = "Staff pay cannot be negative";
//       if (spSum > afterDiscount) newErrors.staffPayValue = "Staff pay cannot exceed final bill";
//     }

//     // patient referral
//     const { list: prList, sum: prSum } = parseNumberList(form.patientReferralValue);
//     if (form.patientReferralValue === "" || prList.length === 0)
//       newErrors.patientReferralValue = "Enter patient referral value";
//     else {
//       if (prList.some((n) => n < 0)) newErrors.patientReferralValue = "Patient referral cannot be negative";
//       if (form.patientReferralType === "Percentage" && prList.some((n) => n < 0 || n > 100))
//         newErrors.patientReferralValue = "Each percentage must be 0–100";
//       if (form.patientReferralType !== "Percentage" && prSum > afterDiscount)
//         newErrors.patientReferralValue = "Patient referral cannot exceed final bill";
//     }

//     // staff referral
//     const { list: srList, sum: srSum } = parseNumberList(form.staffReferralValue);
//     if (form.staffReferralValue === "" || srList.length === 0)
//       newErrors.staffReferralValue = "Enter staff referral value";
//     else {
//       if (srList.some((n) => n < 0)) newErrors.staffReferralValue = "Staff referral cannot be negative";
//       if (form.staffReferralType === "Percentage" && srList.some((n) => n < 0 || n > 100))
//         newErrors.staffReferralValue = "Each percentage must be 0–100";
//       if (form.staffReferralType !== "Percentage" && srSum > afterDiscount)
//         newErrors.staffReferralValue = "Staff referral cannot exceed final bill";
//     }

//     if (afterDiscount < 0) newErrors.discountValue = "Discount cannot be greater than Basic Price";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // SAVE
//   const handleSave = async () => {
//     if (!validate()) return;

//     // use derived totals and breakdowns
//     const payload = {
//       role: form.role,
//       category: form.category,
//       dutySchedule: form.dutySchedule,
//       serviceTypeId: form.service,
//       // send base total and breakdown
//       basePrice: Number(derived.baseTotal),
//       baseBreakdown: derived.baseBreakdown.length > 1 ? derived.baseBreakdown : undefined,

//       discountType: form.discountType === "Percentage" ? "PERCENTAGE" : "AMOUNT",
//       discountValue: Number(derived.discountTotal),
//       discountBreakdown: derived.discountBreakdown.length > 1 ? derived.discountBreakdown : undefined,

//       staffPayAmount: Number(derived.staffPayTotal),
//       staffPayBreakdown: derived.staffPayBreakdown.length > 1 ? derived.staffPayBreakdown : undefined,

//       patientReferralDiscountType: form.patientReferralType === "Percentage" ? "PERCENTAGE" : "AMOUNT",
//       patientReferralValue: Number(derived.patientReferralTotal),
//       patientReferralBreakdown: derived.patientReferralBreakdown.length > 1 ? derived.patientReferralBreakdown : undefined,

//       staffReferralDiscountType: form.staffReferralType === "Percentage" ? "PERCENTAGE" : "AMOUNT",
//       staffReferralValue: Number(derived.staffReferralTotal),
//       staffReferralBreakdown: derived.staffReferralBreakdown.length > 1 ? derived.staffReferralBreakdown : undefined,

//       finalBill,
//       staffPayment,
//       patientReferralPayment,
//       staffReferralPayment,
//     };

//     // remove undefined keys (so only breakdowns present when there are multiple items)
//     Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

//     const ok = await saveStructure(payload);
//     if (ok) onClose();
//   };

//   // Reusable input component
//   const Input = ({ label, error, hint, children }) => (
//     <div>
//       <label className="block text-sm mb-1">{label}</label>
//       {children}
//       {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
//       {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//     </div>
//   );

//   // small helper to render breakdown nicely
//   const Breakdown = ({ arr }) =>
//     !arr || arr.length === 0 ? null : (
//       <p className="text-xs text-gray-600 mt-1">
//         Parsed: [{arr.map((n) => Number(n).toFixed(2)).join(", ")}] — total{" "}
//         {arr.reduce((a, b) => a + b, 0).toFixed(2)}
//       </p>
//     );

//   return (
//     <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//       <div className="bg-white w-[780px] rounded-xl p-6 max-h-[90vh] overflow-y-auto shadow-lg">
//         <div className="flex justify-between mb-4">
//           <h2 className="text-lg font-semibold text-[#3674B5]">Add Payment Structure</h2>
//           <button onClick={onClose} className="text-xl">✖</button>
//         </div>

//         {/* Role / Category / Duty */}
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <Input label="Role" error={errors.role}>
//             <select name="role" value={form.role} onChange={handleChange} className="border w-full rounded-md px-2 py-2">
//               <option value="">Select</option>
//               {ROLE_ENUM.map((r) => <option key={r} value={r}>{r}</option>)}
//             </select>
//           </Input>

//           <Input label="Category" error={errors.category}>
//             <select name="category" value={form.category} onChange={handleChange} className="border w-full rounded-md px-2 py-2">
//               <option value="">Select</option>
//               {CATEGORY_ENUM.map((c) => <option key={c} value={c}>{c}</option>)}
//             </select>
//           </Input>

//           <Input label="Duty Schedule" error={errors.dutySchedule}>
//             <select name="dutySchedule" value={form.dutySchedule} onChange={handleChange} className="border w-full rounded-md px-2 py-2">
//               <option value="">Select</option>
//               {DUTY_SCHEDULE_ENUM.map((d) => <option key={d} value={d}>{d}</option>)}
//             </select>
//           </Input>
//         </div>

//         {/* Service */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <Input label="Select Service" error={errors.service}>
//             <select name="service" value={form.service} onChange={handleChange} className="border w-full rounded-md px-2 py-2">
//               <option value="">Select</option>
//               {services.map((s) => <option key={s.id} value={s.id}>{s.service}</option>)}
//             </select>
//           </Input>

//           <Input label="Basic Price" error={errors.basicPrice} hint="Type single number like 1000 or multiple numbers separated by comma/space (e.g. 1000, 200).">
//             <input
//               type="text"
//               name="basicPrice"
//               inputMode="decimal"
//               value={form.basicPrice}
//               onChange={handleNumberChange}
//               onPaste={handlePasteNumbers}
//               className="border w-full rounded-md px-2 py-2"
//               placeholder="e.g. 1200 or 1000, 200"
//             />
//             <Breakdown arr={derived.baseBreakdown} />
//           </Input>
//         </div>

//         {/* Discount */}
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <Input label="Discount Type">
//             <select name="discountType" value={form.discountType} onChange={handleChange} className="border w-full rounded-md px-2 py-2">
//               <option>Amount</option>
//               <option>Percentage</option>
//             </select>
//           </Input>

//           <Input label="Discount Value" error={errors.discountValue} hint="Single or multiple numbers — summation will be used. If Percentage type, enter numbers 0–100.">
//             <input
//               type="text"
//               name="discountValue"
//               inputMode="decimal"
//               value={form.discountValue}
//               onChange={handleNumberChange}
//               onPaste={handlePasteNumbers}
//               className="border w-full rounded-md px-2 py-2"
//               placeholder="e.g. 50 or 10 5"
//             />
//             <Breakdown arr={derived.discountBreakdown} />
//           </Input>

//           <Input label="Final Bill">
//             <input readOnly value={Number(finalBill).toFixed(2)} className="border bg-gray-100 w-full rounded-md px-2 py-2" />
//           </Input>
//         </div>

//         {/* Staff Pay */}
//         <h3 className="font-semibold text-[#3674B5] mb-2">Staff Pay</h3>
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <Input label="Amount" error={errors.staffPayValue} hint="Single or multiple numbers allowed.">
//             <input
//               type="text"
//               name="staffPayValue"
//               inputMode="decimal"
//               value={form.staffPayValue}
//               onChange={handleNumberChange}
//               onPaste={handlePasteNumbers}
//               className="border w-full rounded-md px-2 py-2"
//               placeholder="e.g. 200 or 100 50"
//             />
//             <Breakdown arr={derived.staffPayBreakdown} />
//           </Input>

//           <Input label="Payment">
//             <input readOnly value={Number(staffPayment).toFixed(2)} className="border bg-gray-100 w-full rounded-md px-2 py-2" />
//           </Input>
//         </div>

//         {/* Patient Referral */}
//         <h3 className="font-semibold text-[#3674B5] mb-2">Patient Referral</h3>
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <Input label="Type">
//             <select name="patientReferralType" value={form.patientReferralType} onChange={handleChange} className="border w-full rounded-md px-2 py-2">
//               <option>Amount</option>
//               <option>Percentage</option>
//             </select>
//           </Input>

//           <Input label="Value" error={errors.patientReferralValue} hint="Single or multiple numbers allowed. If Percentage type, each must be 0–100.">
//             <input
//               type="text"
//               name="patientReferralValue"
//               inputMode="decimal"
//               value={form.patientReferralValue}
//               onChange={handleNumberChange}
//               onPaste={handlePasteNumbers}
//               className="border w-full rounded-md px-2 py-2"
//               placeholder="e.g. 50 or 5 2"
//             />
//             <Breakdown arr={derived.patientReferralBreakdown} />
//           </Input>

//           <Input label="Payment">
//             <input readOnly value={Number(patientReferralPayment).toFixed(2)} className="border bg-gray-100 w-full rounded-md px-2 py-2" />
//           </Input>
//         </div>

//         {/* Staff Referral */}
//         <h3 className="font-semibold text-[#3674B5] mb-2">Staff Referral</h3>
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <Input label="Type">
//             <select name="staffReferralType" value={form.staffReferralType} onChange={handleChange} className="border w-full rounded-md px-2 py-2">
//               <option>Amount</option>
//               <option>Percentage</option>
//             </select>
//           </Input>

//           <Input label="Value" error={errors.staffReferralValue} hint="Single or multiple numbers allowed. If Percentage type, each must be 0–100.">
//             <input
//               type="text"
//               name="staffReferralValue"
//               inputMode="decimal"
//               value={form.staffReferralValue}
//               onChange={handleNumberChange}
//               onPaste={handlePasteNumbers}
//               className="border w-full rounded-md px-2 py-2"
//               placeholder="e.g. 30 or 5 2"
//             />
//             <Breakdown arr={derived.staffReferralBreakdown} />
//           </Input>

//           <Input label="Payment">
//             <input readOnly value={Number(staffReferralPayment).toFixed(2)} className="border bg-gray-100 w-full rounded-md px-2 py-2" />
//           </Input>
//         </div>

//         {/* Save */}
//         <div className="flex justify-end">
//           <button onClick={handleSave} disabled={loading} className="px-6 py-2 bg-[#3674B5] text-white rounded-md">
//             {loading ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



















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
//     const discount =
//       form.discountType === "Percentage"
//         ? (base * (parseFloat(form.discountValue) || 0)) / 100
//         : parseFloat(form.discountValue) || 0;
//     const afterDiscount = base - discount;

//     // Staff Pay (direct amount)
//     const staffPay = parseFloat(form.staffPayValue) || 0;

//     // Referral calculations (handle percentage properly)
//     const patientReferral =
//       form.patientReferralType === "Percentage"
//         ? ((parseFloat(form.patientReferralValue) || 0) / 100) * afterDiscount
//         : parseFloat(form.patientReferralValue) || 0;

//     const staffReferral =
//       form.staffReferralType === "Percentage"
//         ? ((parseFloat(form.staffReferralValue) || 0) / 100) * afterDiscount
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
//     console.log("Saved Payment Data:", {
//       ...form,
//       finalBill,
//       staffPayment,
//       patientReferralPayment,
//       staffReferralPayment,
//     });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
//       <div className="bg-white w-[700px] max-h-[90vh] overflow-y-auto rounded-[15px] p-6 shadow-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-[#3674B5]">
//             Add Payment
//           </h2>
//           <button onClick={onClose} className="text-gray-600 text-xl">
//             ✖
//           </button>
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
//               className="w-full border rounded-md px-3 py-2 text-sm"
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
//               className="w-full border rounded-md px-3 py-2 text-sm"
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
//               className="w-full border rounded-md px-3 py-2 text-sm"
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
//               className="w-full border rounded-md px-3 py-2 text-sm"
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
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             />
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Discount Type</label>
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
//             <label className="block text-sm mb-1">Discount Value</label>
//             <input
//               type="number"
//               name="discountValue"
//               value={form.discountValue}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-sm"
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
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div>
//             <label className="block text-sm mb-1">Enter Amount</label>
//             <input
//               type="number"
//               name="staffPayValue"
//               value={form.staffPayValue}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-sm"
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
//               className="w-full border rounded-md px-3 py-2 text-sm"
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
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm mb-1">Payment</label>
//             <input
//               type="text"
//               readOnly
//               value={
//                 form.patientReferralType === "Percentage"
//                   // ? `${form.patientReferralValue || 0}% = ${patientReferralPayment.toFixed(2)}`
//                   ? `${patientReferralPayment.toFixed(2)}`

//                   : patientReferralPayment.toFixed(2)
//               }
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
//               className="w-full border rounded-md px-3 py-2 text-sm"
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
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm mb-1">Amount</label>
//             <input
//               type="text"
//               readOnly
//               value={
//                 form.staffReferralType === "Percentage"
//                   // ? `${form.staffReferralValue || 0}% = ${staffReferralPayment.toFixed(2)}`
//                   ? `${staffReferralPayment.toFixed(2)}`

//                   : staffReferralPayment.toFixed(2)
//               }
//               className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
//             />
//           </div>
//         </div>

//         {/* Save Button */}
//         <div className="flex justify-end mt-4">
//           <button
//             onClick={handleSave}
//             className="bg-[#3674B5] text-white px-6 py-2 rounded-md text-sm"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddPaymentPopup;










// "use client";

// import React, { useState, useEffect } from "react";
// import usePatientServiceStore from "@/app/lib/store/usePatientServiceStore";

// // Enums (use these arrays to populate selects)
// const ROLE_ENUM = [
//   "REG_NURSES",
//   "NURSING_ASSISTANTS",
//   "TECHNICIANS",
//   "THERAPY",
//   "ANCILLARY",
//   "DOCTORS",
// ];

// const CATEGORY_ENUM = [
//   "GRADE_01",
//   "GRADE_02",
//   "GRADE_03",
//   "GRADE_04",
//   "GRADE_05",
//   "GRADE_06",
//   "GRADE_07",
// ];

// const DUTY_SCHEDULE_ENUM = [
//   "SHIFT_24_HOURS",
//   "DAY_SHIFT_12_HOURS",
//   "NIGHT_SHIFT_12_HOURS",
//   "SHIFT_FLEXIBLE_HOURS",
// ];

// function AddPaymentPopup({ onClose }) {
//   const [form, setForm] = useState({
//     role: "",
//     category: "",
//     dutySchedule: "",
//     service: "",
//     basicPrice: "",
//     discountType: "Amount",
//     discountValue: "",
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

//   // PatientService store (assumes these names from your snippet)
//   const {
//     listedServices: services = [],
//     fetchServices,
//     isLoading: isServicesLoading,
//   } = usePatientServiceStore();

//   // fetch services on mount
//   useEffect(() => {
//     if (fetchServices) fetchServices();
//   }, [fetchServices]);

//   // Auto calculations
//   useEffect(() => {
//     const base = parseFloat(form.basicPrice) || 0;
//     const discount =
//       form.discountType === "Percentage"
//         ? (base * (parseFloat(form.discountValue) || 0)) / 100
//         : parseFloat(form.discountValue) || 0;
//     const afterDiscount = base - discount;

//     // Staff Pay (direct amount)
//     const staffPay = parseFloat(form.staffPayValue) || 0;

//     // Referral calculations (handle percentage properly)
//     const patientReferral =
//       form.patientReferralType === "Percentage"
//         ? ((parseFloat(form.patientReferralValue) || 0) / 100) * afterDiscount
//         : parseFloat(form.patientReferralValue) || 0;

//     const staffReferral =
//       form.staffReferralType === "Percentage"
//         ? ((parseFloat(form.staffReferralValue) || 0) / 100) * afterDiscount
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
//     // prepare payload. Validate as needed before sending to API
//     const payload = {
//       role: form.role,
//       category: form.category,
//       dutySchedule: form.dutySchedule,
//       serviceId: form.service,
//       basicPrice: parseFloat(form.basicPrice) || 0,
//       discount: {
//         type: form.discountType,
//         value: parseFloat(form.discountValue) || 0,
//       },
//       staffPay: parseFloat(form.staffPayValue) || 0,
//       patientReferral: {
//         type: form.patientReferralType,
//         value: parseFloat(form.patientReferralValue) || 0,
//       },
//       staffReferral: {
//         type: form.staffReferralType,
//         value: parseFloat(form.staffReferralValue) || 0,
//       },
//       computed: {
//         finalBill,
//         staffPayment,
//         patientReferralPayment,
//         staffReferralPayment,
//       },
//     };

//     console.log("Saved Payment Data:", payload);
//     // TODO: call your API here
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
//       <div className="bg-white w-[700px] max-h-[90vh] overflow-y-auto rounded-[15px] p-6 shadow-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-[#3674B5]">Add Payment</h2>
//           <button onClick={onClose} className="text-gray-600 text-xl">
//             ✖
//           </button>
//         </div>

//         {/* Section 1: Payment Details */}
//         <h3 className="text-[#3674B5] font-semibold text-base mb-2">
//           Payment Details
//         </h3>
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div>
//             <label className="block text-sm mb-1">Select Professional (Role)</label>
//             <select
//               name="role"
//               value={form.role}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             >
//               <option value="">Select</option>
//               {ROLE_ENUM.map((r) => (
//                 <option key={r} value={r}>
//                   {r.split("_").join(" ")}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Select Category</label>
//             <select
//               name="category"
//               value={form.category}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             >
//               <option value="">Select</option>
//               {CATEGORY_ENUM.map((c) => (
//                 <option key={c} value={c}>
//                   {c.replace("GRADE_", "Grade ")}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Select Duty Schedule</label>
//             <select
//               name="dutySchedule"
//               value={form.dutySchedule}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             >
//               <option value="">Select</option>
//               {DUTY_SCHEDULE_ENUM.map((d) => (
//                 <option key={d} value={d}>
//                   {d.split("_").join(" ")}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Select Service</label>

//             {/* If you have a custom Input wrapper, replace the select below with your Input usage */}
//             {/* Example:
//               <Input label="Select Service" error={errors.service}>
//                 <select name="service" value={form.service} onChange={handleChange} className="border w-full rounded-md px-2 py-2">
//                   <option value="">Select</option>
//                   {services.map((s) => <option key={s.id} value={s.id}>{s.service}</option>)}
//                 </select>
//               </Input>
//             */}

//             <select
//               name="service"
//               value={form.service}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             >
//               <option value="">{isServicesLoading ? "Loading services..." : "Select"}</option>
//               {!isServicesLoading &&
//                 services &&
//                 services.map((s) => (
//                   <option key={s.id} value={s.id}>
//                     {s.service || s.name || `Service ${s.id}`}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Enter Basic Price</label>
//             <input
//               type="number"
//               name="basicPrice"
//               value={form.basicPrice}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-sm"
//             />
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Discount Type</label>
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
//             <label className="block text-sm mb-1">Discount Value</label>
//             <input
//               type="number"
//               name="discountValue"
//               value={form.discountValue}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-sm"
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
//         <h3 className="text-[#3674B5] font-semibold text-base mb-2">Staff Pay</h3>
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div>
//             <label className="block text-sm mb-1">Enter Amount</label>
//             <input
//               type="number"
//               name="staffPayValue"
//               value={form.staffPayValue}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-sm"
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
//               className="w-full border rounded-md px-3 py-2 text-sm"
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
//               className="w-full border rounded-md px-3 py-2 text-sm"
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
//               className="w-full border rounded-md px-3 py-2 text-sm"
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
//               className="w-full border rounded-md px-3 py-2 text-sm"
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

//         {/* Save Button */}
//         <div className="flex justify-end mt-4">
//           <button
//             onClick={handleSave}
//             className="bg-[#3674B5] text-white px-6 py-2 rounded-md text-sm"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddPaymentPopup;











"use client";

import React, { useEffect, useState } from "react";
import usePatientServiceStore from "@/app/lib/store/usePatientServiceStore";
import usePaymentStructureStore from "@/app/lib/store/usePaymentStructureStore";

/**
 * AddPaymentPopup
 *
 * - Fetches services from usePatientServiceStore
 * - Sends structured payload to saveStructure() from usePaymentStructureStore
 */
export default function AddPaymentPopup({ onClose }) {
  const [form, setForm] = useState({
    role: "REG_NURSES",
    category: "GRADE_01",
    dutySchedule: "SHIFT_24_HOURS",
    service: "",
    basicPrice: "",
    discountType: "Amount", // UI values: "Amount" | "Percentage"
    discountValue: "",
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

  const [localError, setLocalError] = useState(null);

  // Patient services store
  const {
    listedServices: services = [],
    fetchServices,
    isLoading: isServicesLoading,
  } = usePatientServiceStore();

  // Payment structure store
  const { saveStructure, loading: saving } = usePaymentStructureStore();

  useEffect(() => {
    if (fetchServices) fetchServices();
  }, [fetchServices]);

  // auto calculations
  useEffect(() => {
    const base = parseFloat(form.basicPrice) || 0;
    const discount =
      form.discountType === "Percentage"
        ? (base * (parseFloat(form.discountValue) || 0)) / 100
        : parseFloat(form.discountValue) || 0;
    const afterDiscount = base - discount;

    const staffPay = parseFloat(form.staffPayValue) || 0;

    const patientReferral =
      form.patientReferralType === "Percentage"
        ? ((parseFloat(form.patientReferralValue) || 0) / 100) * afterDiscount
        : parseFloat(form.patientReferralValue) || 0;

    const staffReferral =
      form.staffReferralType === "Percentage"
        ? ((parseFloat(form.staffReferralValue) || 0) / 100) * afterDiscount
        : parseFloat(form.staffReferralValue) || 0;

    setFinalBill(afterDiscount);
    setStaffPayment(staffPay);
    setPatientReferralPayment(patientReferral);
    setStaffReferralPayment(staffReferral);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalError(null);
    setForm((p) => ({ ...p, [name]: value }));
  };

  // map UI select text -> API enum
  const mapDiscountTypeToApi = (ui) => {
    if (!ui) return "AMOUNT";
    return ui.toLowerCase() === "percentage" ? "PERCENTAGE" : "AMOUNT";
  };

  // validation (basic)
  const validate = () => {
    if (!form.service) {
      setLocalError("Please select a service.");
      return false;
    }
    if (form.basicPrice === "" || isNaN(Number(form.basicPrice))) {
      setLocalError("Please enter a valid base price.");
      return false;
    }
    if (!form.discountValue) {
      setLocalError("Please enter the discount amount.");
      return false;
    }
      if (!form.staffPayValue) {
      setLocalError("Please enter the staff payment amount.");
      return false;
    }
     if (!form.patientReferralValue) {
      setLocalError("Please enter the patient payment amount.");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    setLocalError(null);
    if (!validate()) return;

    // Build payload matching the JSON keys you posted
    const payload = {
      role: form.role, // e.g. "REG_NURSES"
      category: form.category, // e.g. "GRADE_01"
      dutySchedule: form.dutySchedule, // e.g. "SHIFT_24_HOURS"
      serviceTypeId: form.service || null, // sends the selected service id
      basePrice: Number(form.basicPrice) || 0,
      discountType: mapDiscountTypeToApi(form.discountType), // "AMOUNT" | "PERCENTAGE"
      discountValue:
        form.discountValue === "" ? null : Number(form.discountValue),
      staffPayAmount:
        form.staffPayValue === "" ? null : Number(form.staffPayValue),
      patientReferralDiscountType: mapDiscountTypeToApi(
        form.patientReferralType
      ),
      patientReferralValue:
        form.patientReferralValue === "" ? null : Number(form.patientReferralValue),
      staffReferralDiscountType: mapDiscountTypeToApi(form.staffReferralType),
      staffReferralValue:
        form.staffReferralValue === "" ? null : Number(form.staffReferralValue),
      // computed fields (send as numbers or null)
      finalBill: Number.isFinite(finalBill) ? Number(finalBill) : null,
      staffPayment: Number.isFinite(staffPayment) ? Number(staffPayment) : null,
      patientReferralPayment: Number.isFinite(patientReferralPayment)
        ? Number(patientReferralPayment)
        : null,
      staffReferralPayment: Number.isFinite(staffReferralPayment)
        ? Number(staffReferralPayment)
        : null,
    };

    try {
      // call the store action that calls API and refreshes structures
      await saveStructure(payload);
      // on success close popup
      onClose();
    } catch (err) {
      // store.saveStructure already sets store.error but show message locally too
      setLocalError(err?.message || String(err) || "Failed to save.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
      <div className="bg-white w-[720px] max-h-[92vh] overflow-y-auto rounded-[12px] p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#3674B5]">Add Payment Structure</h2>
          <button onClick={onClose} className="text-gray-600 text-xl">✖</button>
        </div>

        {/* Payment Details */}
        <h3 className="text-[#3674B5] font-semibold text-base mb-2">Payment Details</h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="REG_NURSES">REG NURSES</option>
              <option value="NURSING_ASSISTANTS">NURSING ASSISTANTS</option>
              <option value="TECHNICIANS">TECHNICIANS</option>
              <option value="THERAPY">THERAPY</option>
              <option value="ANCILLARY">ANCILLARY</option>
              <option value="DOCTORS">DOCTORS</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="GRADE_01">Grade 01</option>
              <option value="GRADE_02">Grade 02</option>
              <option value="GRADE_03">Grade 03</option>
              <option value="GRADE_04">Grade 04</option>
              <option value="GRADE_05">Grade 05</option>
              <option value="GRADE_06">Grade 06</option>
              <option value="GRADE_07">Grade 07</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Duty Schedule</label>
            <select
              name="dutySchedule"
              value={form.dutySchedule}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="SHIFT_24_HOURS">SHIFT 24 HOURS</option>
              <option value="DAY_SHIFT_12_HOURS">DAY SHIFT 12 HOURS</option>
              <option value="NIGHT_SHIFT_12_HOURS">NIGHT SHIFT 12 HOURS</option>
              <option value="SHIFT_FLEXIBLE_HOURS">SHIFT FLEXIBLE HOURS</option>
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
              <option value="">
                {isServicesLoading ? "Loading services..." : "Select Service"}
              </option>
              {services &&
                services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.service ?? s.name ?? `Service ${s.id}`}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Base Price</label>
            <input
              type="number"
              name="basicPrice"
              value={form.basicPrice}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="0.00"
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
            <label className="block text-sm mb-1">Final Bill (computed)</label>
            <input
              type="text"
              readOnly
              value={finalBill.toFixed(2)}
              className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Staff Pay */}
        <h3 className="text-[#3674B5] font-semibold text-base mb-2">Staff Pay</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-1">Staff Pay Amount</label>
            <input
              type="number"
              name="staffPayValue"
              value={form.staffPayValue}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Payment (computed)</label>
            <input
              type="text"
              readOnly
              value={staffPayment.toFixed(2)}
              className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Patient Referral */}
        <h3 className="text-[#3674B5] font-semibold text-base mb-2">Patient Referral</h3>
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
            <label className="block text-sm mb-1">Payment (computed)</label>
            <input
              type="text"
              readOnly
              value={patientReferralPayment.toFixed(2)}
              className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Staff Referral */}
        <h3 className="text-[#3674B5] font-semibold text-base mb-2">Staff Referral</h3>
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
            <label className="block text-sm mb-1">Payment (computed)</label>
            <input
              type="text"
              readOnly
              value={staffReferralPayment.toFixed(2)}
              className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* error */}
        {localError && (
          <div className="text-red-600 text-sm mb-3">{localError}</div>
        )}

        {/* actions */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border text-sm"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-[#3674B5] text-white px-6 py-2 rounded-md text-sm disabled:opacity-60"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
