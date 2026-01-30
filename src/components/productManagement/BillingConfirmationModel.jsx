"use client";

import { FiX } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function BillingConfirmationModal({
  isOpen,
  onClose,
  onSubmit,
  loading,
  customerName = "",
  productName = "",
}) {
  const [form, setForm] = useState({
    fullName: "",
    invoiceNumber: "",
    billingAddress: "",
    modeOfPayment: "CASH",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setForm((prev) => ({
        ...prev,
        fullName: customerName || "",
      }));
      setErrors({});
    }
  }, [isOpen, customerName]);

  if (!isOpen) return null;

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Customer name is required";
    if (!form.invoiceNumber.trim())
      newErrors.invoiceNumber = "Invoice number is required";
    if (!form.billingAddress.trim())
      newErrors.billingAddress = "Billing address is required";
    if (!form.modeOfPayment)
      newErrors.modeOfPayment = "Select mode of payment";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[90%] max-w-3xl rounded-3xl bg-[#FFF8E5] px-10 py-12">
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-black text-white disabled:opacity-50 cursor-pointer hover:text-gray-200"
        >
          <FiX size={18} />
        </button>

        <h2 className="text-center text-[28px] font-bold text-gray-900">
          Billing Confirmation
        </h2>

        {productName && (
          <p className="mt-2 text-center text-[16px] text-gray-700 font-medium">
            Product: <span className="font-semibold">{productName}</span>
          </p>
        )}

        <p className="mt-2 text-center text-[18px] text-gray-600">
          Enter these details before confirming the sale
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Customer Name */}
          <Field
            label="Customer Name"
            value={form.fullName}
            placeholder="Customer name"
            error={errors.fullName}
            onChange={(v) => handleChange("fullName", v)}
          />

          {/* Invoice Number */}
          <Field
            label="Invoice Number"
            value={form.invoiceNumber}
            placeholder="Invoice number"
            error={errors.invoiceNumber}
            onChange={(v) => handleChange("invoiceNumber", v)}
          />

          {/* Billing Address */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-[16px] font-medium text-gray-800">
              Billing Address
            </label>
            <textarea
              rows={4}
              value={form.billingAddress}
              onChange={(e) =>
                handleChange("billingAddress", e.target.value)
              }
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm text-black bg-white focus:outline-none"
            />
            {errors.billingAddress && (
              <p className="mt-1 text-sm text-red-600">
                {errors.billingAddress}
              </p>
            )}
          </div>

          {/* Mode of Payment */}
          <div>
            <label className="mb-2 block text-[16px] font-medium text-gray-800">
              Mode of Payment
            </label>
            <select
              value={form.modeOfPayment}
              onChange={(e) =>
                handleChange("modeOfPayment", e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-black bg-white focus:outline-none"
            >
              <option value="CASH">Cash</option>
              <option value="UPI">UPI</option>
              <option value="NET_BANKING">Net Banking</option>
            </select>
            {errors.modeOfPayment && (
              <p className="mt-1 text-sm text-red-600">
                {errors.modeOfPayment}
              </p>
            )}
          </div>
        </div>

        <button
          disabled={loading}
          onClick={handleSubmit}
          className="mt-10 w-full rounded-xl bg-[#1E6AA8] py-3 text-sm font-semibold text-white hover:bg-[#155d92] transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Confirm Delivery"}
        </button>
      </div>
    </div>
  );
}

/* ---------- Reusable Input ---------- */
function Field({ label, value, placeholder, onChange, error }) {
  return (
    <div>
      <label className="mb-2 block text-[16px] font-medium text-gray-800">
        {label}
      </label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-black bg-white focus:outline-none"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
