"use client";
import React, { useState } from "react";
import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";
import LocationPickerPopup from "@/components/staffManagement/addNewStaff/LocationPickerPopup"; // adjust path

const SupervisorBasicInformation = ({ onComplete, setCategoryByProfession }) => {
  const [formData, setFormData] = useState({
    categoryByProfession: "",
    fullName: "",
    gender: "",
    email: "",
    mobileNumber: "",
    referralCode: "",
    dob: "",
  });

  const [location, setLocation] = useState({ latitude: "", longitude: "", mapLocation: "" });
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isFocused, setIsFocused] = useState(false);

  const { registerSupervisor, isLoading, successData, error } = useSupervisorRegistrationStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobileNumber") {
      // allow only digits and max 10
      if (!/^\d*$/.test(value) || value.length > 10) return;
    }
    setFormData((p) => ({ ...p, [name]: value }));
    if (name === "categoryByProfession" && setCategoryByProfession) {
      setCategoryByProfession(value);
    }
  };

  const validateEmail = (email) => {
    // simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validate = () => {
    const errs = {};
    if (!formData.categoryByProfession) errs.categoryByProfession = "Category is required.";
    if (!formData.fullName) errs.fullName = "Full name is required.";
    if (!formData.gender) errs.gender = "Gender is required.";
    if (!formData.email) errs.email = "Email is required.";
    else if (!validateEmail(formData.email)) errs.email = "Enter a valid email.";
    if (!formData.mobileNumber || formData.mobileNumber.length !== 10)
      errs.mobileNumber = "Phone must be exactly 10 digits.";
    if (!formData.dob) errs.dob = "Date of birth is required.";
    if (!location.latitude || !location.longitude) errs.location = "Please select a location.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setValidationErrors(errs);
      return;
    }
    setValidationErrors({});

    const payload = {
      categoryByProfession: formData.categoryByProfession,
      fullName: formData.fullName.trim(),
      gender: formData.gender,
      email: formData.email.trim(),
      mobileNumber: `+91${formData.mobileNumber}`,
      referralCode: formData.referralCode?.trim() || undefined,
      dob: formData.dob,
      latitude: Number(location.latitude) || 0,
      longitude: Number(location.longitude) || 0,
      mapLocation: location.mapLocation || "",
    };

    try {
      await registerSupervisor(payload);
      onComplete?.();
    } catch (err) {
      // store already sets error; keep local console
      console.error("registerSupervisor error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">Basic Information</h1>
        <div className="flex flex-col gap-5 px-[39px] mb-12">
          {/* Gender */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none"
          >
            <option value="" disabled>Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          {validationErrors.gender && <span className="text-[13px] text-red-500 ps-2">{validationErrors.gender}</span>}

          {/* Profession category */}
          <select
            name="categoryByProfession"
            value={formData.categoryByProfession}
            onChange={handleChange}
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none"
          >
            <option value="" disabled>Category by profession</option>
           
            <option value="REGISTERED_NURSE">Registered Nurse</option>
            <option value="NURSING_ASSISTANTS">Nursing Assistants</option>
            <option value="TECHNICIANS">Technicians</option>
            <option value="THERAPY">Therapy</option>
            <option value="ANCILLARY_PERSONAL">Ancillary Personal</option>
            <option value="OTHER">Other</option>
          
          </select>
          {validationErrors.categoryByProfession && <span className="text-[13px] text-red-500 ps-2">{validationErrors.categoryByProfession}</span>}

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black"
          />
          {validationErrors.fullName && <span className="text-[13px] text-red-500 ps-2">{validationErrors.fullName}</span>}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email ID"
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black"
          />
          {validationErrors.email && <span className="text-[13px] text-red-500 ps-2">{validationErrors.email}</span>}

          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            maxLength={10}
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black"
          />
          {validationErrors.mobileNumber && <span className="text-[13px] text-red-500 ps-2">{validationErrors.mobileNumber}</span>}

          <input
            type={isFocused ? "date" : "text"}
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="Date of Birth"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black"
          />
          {validationErrors.dob && <span className="text-[13px] text-red-500 ps-2">{validationErrors.dob}</span>}

          {/* Location input (clickable, opens popup) */}
          <input
            type="text"
            value={location.mapLocation || ""}
            placeholder="Select Location"
            onClick={() => setShowLocationPopup(true)}
            readOnly
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black cursor-pointer bg-white"
          />
          {validationErrors.location && <span className="text-[13px] text-red-500 ps-2">{validationErrors.location}</span>}

          <input
            type="text"
            name="referralCode"
            value={formData.referralCode}
            onChange={handleChange}
            placeholder="Referral Code"
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black"
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Submitting..." : "Next"}
          </button>

          {successData && <span className="text-[14px] text-[#3674B5] font-semibold ps-4">The entry has been successfully submitted!</span>}
          {error && <span className="text-[14px] text-red-500 font-semibold ps-4">{error}</span>}
        </div>
      </div>

      {/* Location popup */}
      {showLocationPopup && (
        <LocationPickerPopup
          currentLat={location.latitude}
          currentLng={location.longitude}
          bookingId={null}
          onClose={() => setShowLocationPopup(false)}
          onUpdated={(coords) => {
            setLocation(coords);
            setShowLocationPopup(false);
          }}
        />
      )}
    </form>
  );
};

export default SupervisorBasicInformation;
