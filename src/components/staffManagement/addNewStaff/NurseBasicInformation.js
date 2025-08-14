"use client";
import React, { useState } from "react";
import useNurseRegistrationStore from "@/app/lib/store/nurseRegistrationStore";

const NurseBasicInformation = () => {
  const [formData, setFormData] = useState({
    categoryByProfession: "NURSE",
    fullName: "",
    gender: "",
    email: "",
    mobileNumber: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
    referralCode: "",
    dob: "",
  });

  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);
  const { registerNurse, isLoading, successData, error } =
    useNurseRegistrationStore();
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobileNumber") {
      if (!/^\d*$/.test(value) || value.length > 10) return;
    }
    if (name === "pincode") {
      if (!/^\d*$/.test(value) || value.length > 6) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setFormData((prev) => ({ ...prev, state, district: "" }));

    const stateDistrictMap = {
      Kerala: [
        "Thiruvananthapuram",
        "Kollam",
        "Pathanamthitta",
        "Alappuzha",
        "Kottayam",
        "Idukki",
        "Ernakulam",
        "Thrissur",
        "Palakkad",
        "Malappuram",
        "Kozhikode",
        "Wayanad",
        "Kannur",
        "Kasaragod",
      ],

      Karnataka: [
        "Bagalkote",
        "Ballari",
        "Belagavi",
        "Bengaluru Rural",
        "Bengaluru Urban",
        "Bidar",
        "Chamarajanagara",
        "Chikkaballapura",
        "Chikkamagaluru",
        "Chitradurga",
        "Dakshina Kannada",
        "Davanagere",
        "Dharwad",
        "Gadag",
        "Hassan",
        "Haveri",
        "Kalaburagi",
        "Kodagu",
        "Kolar",
        "Koppal",
        "Mandya",
        "Mysuru",
        "Raichur",
        "Ramanagara",
        "Shivamogga",
        "Tumakuru",
        "Udupi",
        "Uttara Kannada",
        "Vijayanagara",
        "Vijayapura",
        "Yadgiri",
      ],
    };

    setDistricts(stateDistrictMap[state] || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (formData.mobileNumber.length !== 10) {
      errors.mobileNumber = "Mobile number must be exactly 10 digits.";
    }
    if (formData.pincode.length !== 6) {
      errors.pincode = "Pincode must be exactly 6 digits.";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({}); // clear previous

    const finalData = {
      ...formData,
      mobileNumber: `+91${formData.mobileNumber}`,
    };

    try {
      await registerNurse(finalData);
      setIsSubmitted(true);
    } catch (err) {
      // Error handled in store
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">
          Basic Information
        </h1>
        <div className="flex flex-col gap-5 px-[39px] mb-12">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none"
          >
            <option value="" disabled>
              Gender
            </option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black "
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email ID"
            required
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px]  outline-none placeholder:text-black"
          />

          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            maxLength={10}
            required
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px]  outline-none placeholder:text-black"
          />
          {validationErrors.mobileNumber && (
            <span className="text-[13px] text-red-500 ps-2">
              {validationErrors.mobileNumber}
            </span>
          )}

          <input
            type={isFocused ? "date" : "text"}
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="Date of Birth"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black"
          />

          <select
            name="state"
            value={formData.state}
            onChange={handleStateChange}
            required
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px]  outline-none placeholder:text-black"
          >
            <option value="" disabled>
              State
            </option>
            <option value="Kerala">Kerala</option>
            <option value="Karnataka">Karnataka</option>
          </select>

          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            disabled={!selectedState}
            required
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px]  outline-none placeholder:text-black"
          >
            <option value="" disabled>
              District
            </option>
            {districts.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px]  outline-none placeholder:text-black"
          />

          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Pin Code"
            maxLength={6}
            required
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px]  outline-none placeholder:text-black"
          />
          {validationErrors.pincode && (
            <span className="text-[13px] text-red-500 ps-2">
              {validationErrors.pincode}
            </span>
          )}

          <input
            type="text"
            name="referralCode"
            value={formData.referralCode}
            onChange={handleChange}
            placeholder="Referral Code"
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px]  outline-none placeholder:text-black"
          />

          {/* <button
            type="submit"
            disabled={isLoading}
            className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center"
          >
            {isLoading ? "Submitting..." : "Next"}
          </button> */}

          <button
            type="submit"
            disabled={isLoading || isSubmitted}
            className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center opacity-100 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Submitting..." : isSubmitted ? "Submitted" : "Next"}
          </button>

          {successData && (
            <span className="text-[14px] text-[#3674B5] font-semibold ps-4">
              The Entry has been successfully submitted!
            </span>
          )}
          {error && (
            <span className="text-[14px] text-red-500 font-semibold ps-4">
              {error}
            </span>
          )}
        </div>
      </div>
    </form>
  );
};

export default NurseBasicInformation;
