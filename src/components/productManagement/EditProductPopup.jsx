"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import useHealthStatusStore from "@/app/lib/store/useHealthStatusStore";
import useDiagnosisStore from "@/app/lib/store/useDiagnosisStore";

export default function EditProductPopup({
  product,
  selectedHealthStatusIds = [],
  selectedDiagnosisIds = [],
  onCancel,
  onSave,
  loading,
}) {
  /* ---------------- STORES ---------------- */
  const {
    listedServices: healthStatuses,
    fetchServices,
  } = useHealthStatusStore();

  const {
    listedDiagnoses,
    fetchDiagnosesList,
  } = useDiagnosisStore();

  /* ---------------- FORM STATE ---------------- */
  const [form, setForm] = useState({
    productName: "",
    description: "",
    quantity: "",
    mrpPrice: "",
    discountedPrice: "",
    referralCommissionAmount: "",
  });

  const [healthStatusIds, setHealthStatusIds] = useState([]);
  const [diagnosisIds, setDiagnosisIds] = useState([]);
  const [error, setError] = useState("");

  /* ---------------- LOAD MASTER DATA ---------------- */
  useEffect(() => {
    fetchServices(1, 100);
    fetchDiagnosesList(1, 100);
  }, []);

  /* ---------------- PREFILL DATA ---------------- */
  useEffect(() => {
    if (!product) return;

    setForm({
      productName: product.productName ?? "",
      description: product.description ?? "",
      quantity: product.quantity ?? "",
      mrpPrice: product.mrpPrice ?? "",
      discountedPrice: product.discountedPrice ?? "",
      referralCommissionAmount: product.referralCommissionAmount ?? "",
    });

    // ✅ USE SELECTED IDS FROM PROPS
    setHealthStatusIds(selectedHealthStatusIds);
    setDiagnosisIds(selectedDiagnosisIds);
  }, [product, selectedHealthStatusIds, selectedDiagnosisIds]);

  /* ---------------- HELPERS ---------------- */
  const toggleArray = (id, array, setter) => {
    setter(
      array.includes(id)
        ? array.filter((x) => x !== id)
        : [...array, id]
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setError("");
    try {
      await onSave({
        ...form,
        healthStatusIds,
        diagnosisIds,
      });
    } catch (err) {
      setError(err?.message || "Something went wrong");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6">

        {/* CLOSE */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <AiOutlineClose size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Edit Product
        </h2>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}

        {/* FORM */}
        <div className="space-y-4">
          <Input label="Product Name" name="productName" value={form.productName} onChange={handleChange} />
          <Input label="Description" name="description" value={form.description} onChange={handleChange} />
          <Input label="Quantity" name="quantity" type="number" value={form.quantity} onChange={handleChange} />
          <Input label="MRP Price" name="mrpPrice" type="number" value={form.mrpPrice} onChange={handleChange} />
          <Input label="Discounted Price" name="discountedPrice" type="number" value={form.discountedPrice} onChange={handleChange} />
          <Input label="Referral Commission" name="referralCommissionAmount" type="number" value={form.referralCommissionAmount} onChange={handleChange} />
        </div>

        {/* HEALTH STATUS */}
        <div className="mt-6">
          <p className="font-medium mb-2">Health Status</p>
          <div className="grid grid-cols-2 gap-2">
            {healthStatuses.map((item) => (
              <label key={item.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={healthStatusIds.includes(item.id)}
                  onChange={() =>
                    toggleArray(item.id, healthStatusIds, setHealthStatusIds)
                  }
                />
                {item.status}
              </label>
            ))}
          </div>
        </div>

        {/* DIAGNOSIS */}
        <div className="mt-6">
          <p className="font-medium mb-2">Diagnosis</p>
          <div className="grid grid-cols-2 gap-2">
            {listedDiagnoses.map((item) => (
              <label key={item.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={diagnosisIds.includes(item.id)}
                  onChange={() =>
                    toggleArray(item.id, diagnosisIds, setDiagnosisIds)
                  }
                />
                {item.diagnosis}
              </label>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- REUSABLE INPUT ---------- */
function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
