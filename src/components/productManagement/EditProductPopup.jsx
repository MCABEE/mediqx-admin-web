

"use client";

import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function EditProductPopup({
  product,
  onCancel,
  onSave,
  loading,
}) {
  const [form, setForm] = useState({
    productName: product.productName || "",
    description: product.description || "",
    quantity: product.quantity || 0,
    mrpPrice: product.mrpPrice || 0,
    discountedPrice: product.discountedPrice || 0,
    referralCommissionAmount:
      product.referralCommissionAmount || 0,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSave = async () => {
    setError("");

    try {
      await onSave(form);
    } catch (err) {
      setError(err?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div
        className="relative bg-white w-full max-w-2xl max-h-[90vh]
                   overflow-y-auto rounded-2xl p-6 shadow-xl
                   border border-gray-200"
      >
        {/* Close */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <AiOutlineClose className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Edit Product Details
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          <InputField
            label="Product Name"
            name="productName"
            value={form.productName}
            onChange={handleChange}
          />

          <InputField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <InputField
            label="Quantity"
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
          />

          <InputField
            label="MRP Price"
            name="mrpPrice"
            type="number"
            value={form.mrpPrice}
            onChange={handleChange}
          />

          <InputField
            label="Discounted Price"
            name="discountedPrice"
            type="number"
            value={form.discountedPrice}
            onChange={handleChange}
          />

          <InputField
            label="Referral Commission Amount"
            name="referralCommissionAmount"
            type="number"
            value={form.referralCommissionAmount}
            onChange={handleChange}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200
                       text-gray-800 rounded-lg font-medium"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSave}
            className="px-4 py-2 bg-blue-800 hover:bg-blue-700
                       text-white rounded-lg font-semibold
                       disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Input ---------- */

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-lg p-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}