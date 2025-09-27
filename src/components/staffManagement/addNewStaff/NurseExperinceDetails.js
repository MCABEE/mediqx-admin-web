

"use client";
import React, { useState, useEffect, useMemo } from "react";
import useNurseRegistrationStore from "@/app/lib/store/nurseRegistrationStore";
import useManageProfessionalsStore from "@/app/lib/store/useManageProfessionalsStore";
import LocationPickerPopup from "./LocationPickerPopup";

function NurseExperienceDetails({ categoryByProfession, onComplete }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasWorkExperience, setHasWorkExperience] = useState("no");
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  const { listedItems, fetchItems } = useManageProfessionalsStore();
  const { submitNursePageTwo } = useNurseRegistrationStore();

  const normalizedCategory = useMemo(() => {
    if (categoryByProfession === "REGISTERED_NURSE") return "REG_NURSES";
    if (categoryByProfession === "ANCILLARY_PERSONAL") return "ANCILLARY";
    return categoryByProfession;
  }, [categoryByProfession]);

  useEffect(() => {
    if (normalizedCategory) {
      fetchItems("skills", 1, 50, normalizedCategory);
      fetchItems("working-departments", 1, 50, normalizedCategory);
    }
  }, [normalizedCategory, fetchItems]);

  const skills = listedItems.skills || [];
  const departments = listedItems["working-departments"] || [];

  const [formData, setFormData] = useState({
    yearsOfExperience: "",
    monthsOfExperience: "",
    department: "",
    startDate: "",
    endDate: "",
    onGoing: false,
    providerName: "",
    skills: [],
    latitude: null,
    longitude: null,
    mapLocation: "",
    providerLocation: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSkillChange = (skillId) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skillId)
        ? prev.skills.filter((id) => id !== skillId)
        : [...prev.skills, skillId],
    }));
  };

  const handleLocationUpdated = ({ latitude, longitude, mapLocation }) => {
    setFormData((prev) => ({
      ...prev,
      latitude,
      longitude,
      mapLocation,
      providerLocation: mapLocation,
    }));
  };
const handleSubmit = async () => {
  setErrorMessage("");
  setSuccessMessage("");
  setIsSubmitted(false);

  if (formData.skills.length === 0) {
    setErrorMessage("Please select at least one skill.");
    return;
  }

  if (hasWorkExperience === "yes") {
    if (!formData.startDate || (!formData.onGoing && !formData.endDate)) {
      setErrorMessage("Please complete your experience dates.");
      return;
    }
    if (!formData.mapLocation) {
      setErrorMessage("Please set your hospital location.");
      return;
    }
    if (!formData.department) {
      setErrorMessage("Please select a department.");
      return;
    }
  }

  const payload = {
    isExperienced: hasWorkExperience === "yes",
    skillsIds: formData.skills,
    departmentId: hasWorkExperience === "yes" ? formData.department : undefined,
    yearsOfExperience:
      hasWorkExperience === "yes" ? parseInt(formData.yearsOfExperience) || 0 : undefined,
    monthsOfExperience:
      hasWorkExperience === "yes" ? parseInt(formData.monthsOfExperience) || 0 : undefined,
    providerName: hasWorkExperience === "yes" ? formData.providerName : undefined,
    providerLocation: hasWorkExperience === "yes" ? formData.providerLocation : undefined,
    providerStateId: hasWorkExperience === "yes" ? formData.providerState : undefined,
    latitude: hasWorkExperience === "yes" ? formData.latitude : undefined,
    longitude: hasWorkExperience === "yes" ? formData.longitude : undefined,
    mapLocation: hasWorkExperience === "yes" ? formData.mapLocation : undefined,
    onGoing: hasWorkExperience === "yes" ? formData.onGoing : undefined,
    startDate:
      hasWorkExperience === "yes" && formData.startDate
        ? new Date(formData.startDate).toISOString()
        : undefined,
    endDate:
      hasWorkExperience === "yes"
        ? formData.onGoing
          ? new Date().toISOString()
          : formData.endDate
          ? new Date(formData.endDate).toISOString()
          : undefined
        : undefined,
  };

  try {
    await submitNursePageTwo(payload);

    setSuccessMessage("Experience details submitted successfully.");
    setErrorMessage("");
    setIsSubmitted(true);
  } catch (err) {
    console.error("Submit error:", err);
    setSuccessMessage("");
    setErrorMessage("Something went wrong. Please try again.");
    return;
  }

 
  onComplete();
};


  return (
    <div className="px-[39px] pt-[15px]">
      {/* Experience Selection */}
      <h1 className="text-[16px] font-semibold text-black py-[18px]">
        Do you have Work Experience?
      </h1>
      <div className="flex flex-col gap-[18px]">
        <select
          className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black text-[14px]"
          value={hasWorkExperience}
          onChange={(e) => setHasWorkExperience(e.target.value)}
        >
          <option value="" disabled>
            Previous Work Experience
          </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      {/* If Experienced */}
      {hasWorkExperience === "yes" && (
        <>
          <h1 className="text-[16px] font-semibold text-black py-[18px]">
            Please provide your experience details
          </h1>

          {/* Years / Months */}
          <div className="flex gap-3">
            <select
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black"
            >
              <option value="">Year</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i} value={i}>
                  {i} {i === 1 ? "Year" : "Years"}
                </option>
              ))}
            </select>
            <select
              name="monthsOfExperience"
              value={formData.monthsOfExperience}
              onChange={handleChange}
              className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black"
            >
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {i} {i === 1 ? "Month" : "Months"}
                </option>
              ))}
            </select>
          </div>

          {/* Hospital */}
          <input
            type="text"
            name="providerName"
            placeholder="Hospital (Last working)"
            value={formData.providerName}
            onChange={handleChange}
            className="mt-4 w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black"
          />

          {/* Location */}
      <div>
            <button
            type="button"
            onClick={() => setShowLocationPopup(true)}
            className="mt-4 w-[328px] min-h-[40px] border border-[#BBBBBB] rounded-[15px] px-3 text-left text-black bg-white"
          >
            {formData.mapLocation || "Set Hospital Location"}
          </button>
      </div>

          {/* Department */}
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="mt-4 w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black"
          >
            <option value="">Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.workingDepartment}
              </option>
            ))}
          </select>

          {/* Duration */}
          <div className="flex gap-3 mt-4 items-end">
            <div>
              <p className="mb-2">From</p>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black"
              />
            </div>
            <div>
              <p className="mb-2">To</p>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                disabled={formData.onGoing}
                className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black disabled:bg-gray-200"
              />
            </div>
            <label className="flex items-center gap-2 ms-4">
              <input
                type="checkbox"
                name="onGoing"
                checked={formData.onGoing}
                onChange={handleChange}
                className="size-[20px]"
              />
              Currently working here
            </label>
          </div>
        </>
      )}

      {/* Skills */}
      <h1 className="text-[16px] font-semibold text-black py-[18px]">
        Mention your Expertise / Skills
      </h1>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <label key={skill.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.skills.includes(skill.id)}
              onChange={() => handleSkillChange(skill.id)}
              className="size-[20px]"
            />
            <span>{skill.skill}</span>
          </label>
        ))}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitted}
        className={`mt-10 w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center ${
          isSubmitted ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitted ? "Submitted" : "Next"}
      </button>

      {/* Messages */}
      {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
      {successMessage && <p className="text-blue-600 text-sm mt-2">{successMessage}</p>}

      {/* Location Popup */}
      {showLocationPopup && (
        <LocationPickerPopup
          currentLat={formData.latitude}
          currentLng={formData.longitude}
          onClose={() => setShowLocationPopup(false)}
          onUpdated={handleLocationUpdated}
        />
      )}
    </div>
  );
}

export default NurseExperienceDetails;

