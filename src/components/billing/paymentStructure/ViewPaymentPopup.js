"use client";

import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import usePaymentStructureStore from "@/app/lib/store/usePaymentStructureStore";
import usePatientServiceStore from "@/app/lib/store/usePatientServiceStore";
import { FaSortDown } from "react-icons/fa";

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
  const { fetchStructureById, updateStructure, removeStructure } =
    usePaymentStructureStore();
  const {
    listedServices: services,
    fetchServices,
    isLoading: isServicesLoading,
  } = usePatientServiceStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

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
        setForm((prev) => ({
          ...prev,
          ...mapIncomingToForm(data, id, providedRole),
        }));
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
  }, [payment?.id]);

  function mapIncomingToForm(
    data = {},
    fallbackId = null,
    fallbackRole = null,
  ) {
    return {
      professional: data.role ?? data.professional ?? fallbackRole ?? "",
      category: data.category ?? data.grade ?? "",
      dutySchedule: data.dutySchedule ?? data.shift ?? "",
      service:
        data.serviceTypeId ??
        data.serviceId ??
        data.service?.id ??
        data.service ??
        "",
      basicPrice: data.basePrice ?? data.charge ?? data.basePrice ?? "",
      discountType:
        data.discountType &&
        String(data.discountType).toUpperCase() === "PERCENTAGE"
          ? "Percentage"
          : "Amount",
      discountValue: data.discountValue ?? data.discount ?? 0,
      staffPayType:
        data.staffPayDiscountType &&
        String(data.staffPayDiscountType).toUpperCase() === "PERCENTAGE"
          ? "Percentage"
          : "Amount",
      staffPayValue:
        data.staffPayAmount ?? data.staffPayValue ?? data.staffPayment ?? 0,
      patientReferralType:
        data.patientReferralDiscountType &&
        String(data.patientReferralDiscountType).toUpperCase() === "PERCENTAGE"
          ? "Percentage"
          : "Amount",
      patientReferralValue:
        data.patientReferralValue ?? data.patientReferral ?? 0,
      staffReferralType:
        data.staffReferralDiscountType &&
        String(data.staffReferralDiscountType).toUpperCase() === "PERCENTAGE"
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
      id: id,
      role: form.professional || form.role,
      category: form.category,
      dutySchedule: form.dutySchedule,
      serviceTypeId: form.service,
      basePrice: Number(form.basicPrice) || 0,
      discountType:
        form.discountType === "Percentage" ? "PERCENTAGE" : "AMOUNT",
      discountValue: Number(form.discountValue) || 0,
      staffPayAmount: Number(form.staffPayValue) || 0,
      patientReferralDiscountType:
        form.patientReferralType === "Percentage" ? "PERCENTAGE" : "AMOUNT",
      patientReferralValue: Number(form.patientReferralValue) || 0,
      staffReferralDiscountType:
        form.staffReferralType === "Percentage" ? "PERCENTAGE" : "AMOUNT",
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
    const id = form.id;
    if (!id) {
      setError("Missing id; cannot delete.");
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
      setShowConfirmDelete(false);
    }
  };

  return (
    <>
      {/* MAIN POPUP */}
      <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
        <div className="bg-white w-[760px] max-h-[90vh] overflow-y-auto rounded-[15px] p-6 shadow-lg relative">
          {/* HEADER */}
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
                    title="Edit"
                  >
                    <img src="/edit-btn.svg" alt="edit" className="size-6" />
                  </button>

                  <button
                    onClick={() => setShowConfirmDelete(true)}
                    className="bg-black text-white flex justify-center items-center size-6 rounded-md cursor-pointer hover:scale-110 transition-transform"
                  >
                    <MdDelete />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-[#3674B5] text-white px-4 py-1 rounded-md text-sm hover:bg-[#2d5d93] transition-colors"
                    disabled={loading}
                  >
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
                        setForm((prev) => ({
                          ...prev,
                          ...mapIncomingToForm(data, id, form.role),
                        }));
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

              <button
                onClick={onClose}
                className="text-gray-600 text-xl hover:scale-110 transition-transform ml-2"
                title="Close"
              >
                ✖
              </button>
            </div>
          </div>

          {/* ERROR / LOADING */}
          {loading && (
            <div className="mb-3 text-sm text-gray-500">Loading...</div>
          )}
          {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

          {/* FORM SECTIONS */}
          <h3 className="text-[#3674B5] font-semibold text-base mb-2">
            Payment Details
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* ROLE */}
            <InputSelect
              label="Role"
              name="professional"
              value={form.professional}
              options={ROLE_ENUM}
              disabled={!isEditing}
              onChange={handleChange}
            />

            {/* CATEGORY */}
            <InputSelect
              label="Category"
              name="category"
              value={form.category}
              options={CATEGORY_ENUM}
              disabled={!isEditing}
              onChange={handleChange}
            />

            {/* DUTY */}
            <InputText
              label="Duty Schedule"
              name="dutySchedule"
              value={form.dutySchedule}
              disabled={!isEditing}
              onChange={handleChange}
            />

            {/* SERVICE */}
            <InputSelect
              label="Service"
              name="service"
              value={form.service}
              disabled={!isEditing || isServicesLoading}
              options={services.map((s) => ({ label: s.service, value: s.id }))}
              onChange={handleChange}
            />

            {/* BASIC PRICE */}
            <InputText
              label="Enter Basic Price"
              name="basicPrice"
              type="number"
              value={form.basicPrice}
              disabled={!isEditing}
              onChange={handleChange}
            />

            {/* DISCOUNT TYPE */}
            <InputSelect
              label="Discount Type"
              name="discountType"
              value={form.discountType}
              options={["Amount", "Percentage"]}
              disabled={!isEditing}
              onChange={handleChange}
            />

            {/* DISCOUNT VALUE */}
            <InputText
              label="Discount Value"
              name="discountValue"
              type="number"
              value={form.discountValue}
              disabled={!isEditing}
              onChange={handleChange}
            />

            {/* FINAL BILL */}
            <ReadOnlyField label="Final Bill" value={`₹${finalBill}`} />
          </div>

          {/* STAFF PAY */}
          <SectionPay
            title="Staff Pay"
            prefix="staffPay"
            form={form}
            isEditing={isEditing}
            onChange={handleChange}
            amount={staffPayment}
          />

          {/* PATIENT REFERRAL */}
          <SectionPay
            title="Patient Referral Pay"
            prefix="patientReferral"
            form={form}
            isEditing={isEditing}
            onChange={handleChange}
            amount={patientReferralPayment}
          />

          {/* STAFF REFERRAL */}
          <SectionPay
            title="Staff Referral Pay"
            prefix="staffReferral"
            form={form}
            isEditing={isEditing}
            onChange={handleChange}
            amount={staffReferralPayment}
          />
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {showConfirmDelete && (
        <DeleteConfirmationModal
          loading={loading}
          onCancel={() => setShowConfirmDelete(false)}
          onConfirm={handleRemove}
        />
      )}
    </>
  );
}

/* ---------------------- SMALL COMPONENTS ---------------------- */

function InputText({ label, name, value, onChange, disabled, type = "text" }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        disabled={disabled}
        className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
      />
    </div>
  );
}

function InputSelect({ label, name, value, onChange, disabled, options = [] }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <div className="relative w-full">
        <select
          name={name}
          value={value ?? ""}
          onChange={onChange}
          disabled={disabled}
          className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100 outline-none appearance-none"
        >
          <option value="">Select</option>
          {options.map((opt) =>
            typeof opt === "string" ? (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ) : (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ),
          )}
        </select>
        <FaSortDown
          size={18}
          className="absolute right-4 top-1/2 -translate-y-[65%] text-gray-400 pointer-events-none"
        />
      </div>
    </div>
  );
}

function ReadOnlyField({ label, value }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input
        readOnly
        value={value}
        className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100"
      />
    </div>
  );
}

function SectionPay({ title, prefix, amount, form, isEditing, onChange }) {
  return (
    <>
      <h3 className="text-[#3674B5] font-semibold text-base mb-2">{title}</h3>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <InputSelect
          label="Type"
          name={`${prefix}Type`}
          value={form[`${prefix}Type`] ?? "Amount"}
          disabled={!isEditing}
          onChange={onChange}
          options={["Amount", "Percentage"]}
        />

        <InputText
          label="Value"
          type="number"
          name={`${prefix}Value`}
          disabled={!isEditing}
          value={form[`${prefix}Value`] ?? ""}
          onChange={onChange}
        />

        <ReadOnlyField label="Payment" value={`₹${amount}`} />
      </div>
    </>
  );
}

function DeleteConfirmationModal({ onCancel, onConfirm, loading }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999]">
      <div className="bg-white w-[380px] rounded-xl p-6 shadow-lg text-center">
        <h3 className="text-lg font-semibold text-red-600">
          Delete Payment Structure
        </h3>
        <p className="text-sm text-gray-700 mt-2">
          Are you sure you want to delete this record? This action cannot be
          undone.
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-md border border-gray-400 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-5 py-2 rounded-md text-white ${
              loading ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
            } transition`}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewPaymentPopup;
