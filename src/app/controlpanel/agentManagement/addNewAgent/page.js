"use client";

import useAgentStore from "@/app/lib/store/agentManagementStore";
import Navlink from "@/components/agentManagement/Navlink";
import React, { useState, useEffect } from "react";

function Page() {
  const { createAgent, successMessage, error, loading } = useAgentStore();

  const initialState = {
    typeOfAgent: "",
    fullName: "",
    gender: "",
    dob: "",
    referralType: "",
    state: "",
    district: "",
    city: "",
    lineFirst: "",
    lineSecond: "",
    email: "",
    mobileNumber: "",
    categoryByProfession: "AGENT", // default
  };

  const [formData, setFormData] = useState(initialState);
  const [mobileError, setMobileError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobileNumber") {
      const onlyDigits = value.replace(/\D/g, "");
      if (onlyDigits.length > 10) return;
      setFormData({ ...formData, mobileNumber: onlyDigits });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form reload

    if (formData.mobileNumber.length !== 10) {
      setMobileError("Mobile number must be exactly 10 digits");
      return;
    }
    setMobileError("");

    const apiData = {
      ...formData,
      mobileNumber: `+91${formData.mobileNumber}`, // ✅ prepend
    };

    try {
      await createAgent(apiData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (successMessage) {
      setFormData(initialState); // clear after success
    }
  }, [successMessage]);

  return (
    <div>
      <Navlink />

      <div className="bg-white border border-[#888888] rounded-[15px] my-2">
        <form onSubmit={handleSubmit}>
          <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">
            Basics Information
          </h1>

          <div className="flex flex-col gap-5 px-[39px]">
            <select
              required
              name="typeOfAgent"
              value={formData.typeOfAgent}
              onChange={handleChange}
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] outline-none rounded-[15px] ps-8 pe-4"
            >
              <option value="">Type of Agent</option>
              <option value="INSTITUTION">Institution</option>
              <option value="DOCTOR">Doctor</option>
              <option value="HEALTHCARE_PROFESSIONAL">
                Healthcare professional
              </option>
              <option value="PUBLIC">Public</option>
            </select>

            <input
              required
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
            />

            <select
              required
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
            >
              <option value="">Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>

            <input
              required
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
            />

            <select
              required
              name="referralType"
              value={formData.referralType}
              onChange={handleChange}
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
            >
              <option value="">Referral Type</option>
              <option value="STAFF">Staff</option>
              <option value="PATIENT">Patient</option>
              <option value="PATIENT_AND_STAFF">Both</option>
            </select>

            <h1 className="text-[16px] font-semibold text-black">
              Current Location
            </h1>

            <input
              required
              name="state"
              type="text"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
            />
            <input
              required
              name="district"
              type="text"
              value={formData.district}
              onChange={handleChange}
              placeholder="District"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
            />
            <input
              required
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              placeholder="Area / Location"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
            />
          </div>

          <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">
            Address and Contact
          </h1>
          <div className="flex flex-col gap-5 px-[39px] mb-12">
            <input
              required
              name="lineFirst"
              type="text"
              value={formData.lineFirst}
              onChange={handleChange}
              placeholder="Address Line 1"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
            />
            <input
              required
              name="lineSecond"
              type="text"
              value={formData.lineSecond}
              onChange={handleChange}
              placeholder="Address Line 2"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
            />

            <input
              required
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
            />

            <input
              required
              name="mobileNumber"
              type="text"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number (10 digits)"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] ps-8 pe-4"
            />
            {mobileError && (
              <span className="text-[13px] text-red-700 ps-2">
                {mobileError}
              </span>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

            {successMessage && (
              <span className="text-[14px] text-[#3674B5] font-semibold ps-4">
                {successMessage}
              </span>
            )}
            {error && (
              <span className="text-[14px] text-red-700 font-semibold ps-4">
                {error}
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
