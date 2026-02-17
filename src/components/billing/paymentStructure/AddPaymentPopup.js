"use client";

import React, { useEffect, useState } from "react";
import usePatientServiceStore from "@/app/lib/store/usePatientServiceStore";
import usePaymentStructureStore from "@/app/lib/store/usePaymentStructureStore";
import { FaSortDown } from "react-icons/fa";

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
    if (!form.patientReferralValue) {
      setLocalError("Please enter the patient referral value.");
      return false;
    }
    if (!form.patientReferralValue) {
      setLocalError("Please enter the staff payment amount.");
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
        form.patientReferralType,
      ),
      patientReferralValue:
        form.patientReferralValue === ""
          ? null
          : Number(form.patientReferralValue),
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
          <h2 className="text-lg font-semibold text-[#3674B5]">
            Add Payment Structure
          </h2>
          <button onClick={onClose} className="text-gray-600 text-xl">
            ✖
          </button>
        </div>

        {/* Payment Details */}
        <h3 className="text-[#3674B5] font-semibold text-base mb-2">
          Payment Details
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-1">Role</label>
            <div className="relative w-full">
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 text-sm outline-none appearance-none"
              >
                <option value="REG_NURSES">REG NURSES</option>
                <option value="NURSING_ASSISTANTS">NURSING ASSISTANTS</option>
                <option value="TECHNICIANS">TECHNICIANS</option>
                <option value="THERAPY">THERAPY</option>
                <option value="ANCILLARY">ANCILLARY</option>
                <option value="DOCTORS">DOCTORS</option>
              </select>
              <FaSortDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-[65%] text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Category</label>
            <div className="relative w-full">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 text-sm outline-none appearance-none"
              >
                <option value="GRADE_01">Grade 01</option>
                <option value="GRADE_02">Grade 02</option>
                <option value="GRADE_03">Grade 03</option>
                <option value="GRADE_04">Grade 04</option>
                <option value="GRADE_05">Grade 05</option>
                <option value="GRADE_06">Grade 06</option>
                <option value="GRADE_07">Grade 07</option>
              </select>
              <FaSortDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-[65%] text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Duty Schedule</label>
            <div className="relative w-full">
              <select
                name="dutySchedule"
                value={form.dutySchedule}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 text-sm outline-none appearance-none"
              >
                <option value="SHIFT_24_HOURS">SHIFT 24 HOURS</option>
                <option value="DAY_SHIFT_12_HOURS">DAY SHIFT 12 HOURS</option>
                <option value="NIGHT_SHIFT_12_HOURS">
                  NIGHT SHIFT 12 HOURS
                </option>
                <option value="SHIFT_FLEXIBLE_HOURS">
                  SHIFT FLEXIBLE HOURS
                </option>
              </select>
              <FaSortDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-[65%] text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Select Service</label>
            <div className="relative w-full">
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 text-sm outline-none appearance-none"
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
              <FaSortDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-[65%] text-gray-400 pointer-events-none"
              />
            </div>
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
            <div className="relative w-full">
              <select
                name="discountType"
                value={form.discountType}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 text-sm outline-none appearance-none"
              >
                <option>Amount</option>
                <option>Percentage</option>
              </select>
              <FaSortDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-[65%] text-gray-400 pointer-events-none"
              />
            </div>
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
        <h3 className="text-[#3674B5] font-semibold text-base mb-2">
          Staff Pay
        </h3>
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
        <h3 className="text-[#3674B5] font-semibold text-base mb-2">
          Patient Referral
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-1">Type</label>
            <div className="relative w-full">
              <select
                name="patientReferralType"
                value={form.patientReferralType}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 text-sm outline-none appearance-none"
              >
                <option>Amount</option>
                <option>Percentage</option>
              </select>
              <FaSortDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-[65%] text-gray-400 pointer-events-none"
              />
            </div>
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
        <h3 className="text-[#3674B5] font-semibold text-base mb-2">
          Staff Referral
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-1">Type</label>
            <div className="relative w-full">
              <select
                name="staffReferralType"
                value={form.staffReferralType}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 text-sm outline-none appearance-auto"
              >
                <option>Amount</option>
                <option>Percentage</option>
              </select>
              <FaSortDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-[65%] text-gray-400 pointer-events-none"
              />
            </div>
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
