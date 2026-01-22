"use client";

import Navlink from "@/components/userAccessManagement/Navlink";
import React, { useState } from "react";
import useUserAccessStore from "@/app/lib/store/useUserAccessStore";

export default function Page() {
  const PERMISSIONS = [
    { key: "HOME_ANALYTICS", label: "Home (Analytics)" },
    { key: "STAFF_MANAGEMENT", label: "Staff Management (HR)" },
    { key: "AGENT_MANAGEMENT", label: "Agent Management" },
    { key: "SERVICE_BOOKINGS", label: "Service Bookings" },
    { key: "CASES", label: "Cases" },
    { key: "PATIENT_MANAGEMENT", label: "Patient Management" },
    { key: "RATING_REVIEW", label: "Rating & Review" },
    { key: "BILLING", label: "Billing" },
    { key: "REFERRAL_MANAGEMENT", label: "Referral Management" },
    { key: "DATA_MANAGER", label: "Data Manager" },
    { key: "NOTIFICATIONS", label: "Notifications" },
    { key: "PRODUCT_MANAGEMENT", label: "Product Management" },
    { key: "LEDGER_MANAGEMENT", label: "Ledger Management" },
    { key: "USER_ACCESS_MANAGEMENT", label: "User Access Management" },
    { key: "AMBULANCE", label: "Ambulance" },

  ];

  const { addCoAdmin, loading } = useUserAccessStore();

  const [form, setForm] = useState({
    name: "",
    role: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [permissions, setPermissions] = useState([]);
  const [error, setError] = useState("");

  const togglePermission = (key) => {
    setPermissions((prev) =>
      prev.includes(key)
        ? prev.filter((p) => p !== key)
        : [...prev, key]
    );
  };

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.role.trim()) return "Role / Designation is required";

    if (!form.email.trim())
      return "Email ID is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      return "Enter a valid email address";

    if (!form.mobileNumber.trim())
      return "Mobile number is required";
    if (!/^\d{10}$/.test(form.mobileNumber))
      return "Mobile number must be exactly 10 digits";

    if (!form.password)
      return "Password is required";
    if (form.password.length < 8)
      return "Password must be at least 8 characters";

    if (!form.confirmPassword)
      return "Confirm password is required";
    if (form.password !== form.confirmPassword)
      return "Passwords do not match";

    if (permissions.length === 0)
      return "Select at least one permission";

    return "";
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    const payload = {
      personalDetails: {
        name: form.name,
        role: form.role,
        mobileNumber: `+91${form.mobileNumber}`,
      },
      loginCredentials: {
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      },
      permissions,
    };

    try {
      await addCoAdmin(payload);

      // reset form
      setForm({
        name: "",
        role: "",
        mobileNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setPermissions([]);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to create co-admin");
    }
  };

  return (
    <div>
      <Navlink />

      <div className="border-[#888888c3] border bg-white rounded-[15px] my-2 pb-20">
        <div className="px-8 py-4 flex flex-col gap-3">
          <h1 className="font-semibold text-[14px]">Add Co Admin</h1>

          {[
            ["name", "Name"],
            ["role", "Role/Designation"],
            ["email", "Email ID"],
            ["mobileNumber", "Mobile Number"],
          ].map(([k, label]) => (
            <input
              key={k}
              value={form[k]}
              onChange={(e) =>
                setForm({ ...form, [k]: e.target.value })
              }
              placeholder={label}
              className="w-[328px] h-[40px] border rounded-[15px] px-4 outline-none"
            />
          ))}
        </div>

        <div className="px-8 py-3 flex flex-col gap-3">
          <h1 className="font-semibold text-[14px]">
            Login Credentials
          </h1>

          {[
            ["password", "Create password"],
            ["confirmPassword", "Confirm password"],
          ].map(([k, label]) => (
            <input
              key={k}
              type="password"
              value={form[k]}
              onChange={(e) =>
                setForm({ ...form, [k]: e.target.value })
              }
              placeholder={label}
              className="w-[328px] h-[40px] border rounded-[15px] px-4 outline-none"
            />
          ))}
        </div>

        <h1 className="font-semibold text-[14px] px-8 mt-4">
          Manage Permissions
        </h1>

        <div className="px-8 py-3 grid grid-cols-2 gap-y-3">
          {PERMISSIONS.map((p) => (
            <label key={p.key} className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={permissions.includes(p.key)}
                onChange={() => togglePermission(p.key)}
                className="size-5"
              />
              {p.label}
            </label>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] ms-8 my-2"
        >
          {loading ? "Saving..." : "Save"}
        </button>

        {/* 🔴 ERROR MESSAGE (BOTTOM OF BUTTON) */}
        {error && (
          <p className="text-red-500 text-sm font-medium ms-8 mt-1">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
