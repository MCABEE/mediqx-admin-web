

"use client";
import React, { useState } from "react";
import useNurseRegistrationStore from "@/app/lib/store/nurseRegistrationStore";
import LocationPickerPopup from "./LocationPickerPopup";

const NurseBasicInformation = ({ setCategoryByProfession, onComplete }) => {
  // Form state
  const [formData, setFormData] = useState({
    categoryByProfession: "",
    fullName: "",
    gender: "",  
    email: "",
    mobileNumber: "",
    referralCode: "",
    dob: "",
  });

  // Location state
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
    mapLocation: "",
  });
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  // Store hooks
  const { registerNurse, isLoading, successData, error } =
    useNurseRegistrationStore();

  // Validation and UI states
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Handle option selection and field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobileNumber") {
      if (!/^\d*$/.test(value) || value.length > 10) return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "categoryByProfession" && setCategoryByProfession) {
      setCategoryByProfession(value);
    }
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (formData.mobileNumber.length !== 10)
      errors.mobileNumber = "Mobile number must be exactly 10 digits.";
    if (!location.latitude || !location.longitude) {
      errors.location = "Please select a location.";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    const finalData = {
      ...formData,
      mobileNumber: `+91${formData.mobileNumber}`,
      latitude: location.latitude,
      longitude: location.longitude,
      mapLocation: location.mapLocation,
    };

    try {
      await registerNurse(finalData);
      setIsSubmitted(true);
      onComplete();
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
          {/* Gender */}
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

          {/* Profession category */}
          <select
            name="categoryByProfession"
            value={formData.categoryByProfession}
            onChange={handleChange}
            required
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none"
          >
            <option value="" disabled>
              Category by profession
            </option>
            <option value="REGISTERED_NURSE">Registered Nurse</option>
            <option value="NURSING_ASSISTANTS">Nursing Assistants</option>
            <option value="TECHNICIANS">Technicians</option>
            <option value="THERAPY">Therapy</option>
            <option value="ANCILLARY_PERSONAL">Ancillary Personal</option>
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

          {/* Location input (clickable, opens popup) */}
          <input
            type="text"
            value={location.mapLocation || ""}
            placeholder="Select Location"
            onClick={() => setShowLocationPopup(true)}
            readOnly
            required
            className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none placeholder:text-black cursor-pointer bg-white"
          />
          {validationErrors.location && (
            <span className="text-[13px] text-red-500 ps-2">
              {validationErrors.location}
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

          {/* Submit button */}
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

      {/* Location popup */}
      {showLocationPopup && (
        <LocationPickerPopup
          currentLat={location.latitude}
          currentLng={location.longitude}
          bookingId={null} // not required here
          onClose={() => setShowLocationPopup(false)}
          onUpdated={(coords) => {
            // coords = { latitude, longitude, mapLocation }
            setLocation(coords);
            setShowLocationPopup(false);
          }}
        />
      )}
    </form>
  );
};

export default NurseBasicInformation;
