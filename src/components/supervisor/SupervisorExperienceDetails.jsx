"use client";
import React, { useState, useMemo, useEffect } from "react";
import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";
import useManageProfessionalsStore from "@/app/lib/store/useManageProfessionalsStore";
import useLanguageStore from "@/app/lib/store/languageStore";
import LocationPickerPopup from "@/components/staffManagement/addNewStaff/LocationPickerPopup"; // adjust path

function SupervisorExperienceDetails({ categoryByProfession, onComplete }) {
  const [hasWorkExperience, setHasWorkExperience] = useState("no");
  const [formData, setFormData] = useState({
    yearsOfExperience: "",
    monthsOfExperience: "",
    department: "",
    departmentId: "",
    providerName: "",
    providerAddress: "",
    providerState: "",
    providerStateId: "",
    providerLocation: "",
    latitude: null,
    longitude: null,
    mapLocation: "",
    startDate: "",
    endDate: "",
    onGoing: false,
    skills: [],
    skillsIds: [],
    languages: [],
    languageIds: [],
  });

  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const { listedItems, fetchItems } = useManageProfessionalsStore();
  const { submitSupervisorPageTwo } = useSupervisorRegistrationStore();

  const { listedLanguages = [], fetchLanguages, isLoading: isLangLoading, error: langErrorFetch } =
    useLanguageStore();

  // load languages once
  useEffect(() => {
    fetchLanguages?.(1, 100);
  }, [fetchLanguages]);

  // normalize category like your nurse component
  const normalizedCategory = useMemo(() => {
    if (categoryByProfession === "REGISTERED_NURSE") return "REG_NURSES";
    if (categoryByProfession === "ANCILLARY_PERSONAL") return "ANCILLARY";
    if (!categoryByProfession) return "";
    return categoryByProfession;
  }, [categoryByProfession]);

  // Only fetch skills/departments when role != OTHER
  useEffect(() => {
    if (!normalizedCategory) return;
    if (normalizedCategory === "OTHER") return;
    fetchItems("skills", 1, 50, normalizedCategory);
    fetchItems("working-departments", 1, 50, normalizedCategory);
  }, [normalizedCategory, fetchItems]);

  const skills = listedItems.skills || [];
  const departments = listedItems["working-departments"] || [];

  const [preferredLanguages, setPreferredLanguages] = useState([]);

  useEffect(() => {
    // If user has preselected languageIds in formData (rare), sync to preferredLanguages.
    if (formData.languageIds && formData.languageIds.length) {
      setPreferredLanguages(formData.languageIds);
    }
  }, []); // run once

  const toggleArray = (item, arr, setArr) => {
    if (arr.includes(item)) setArr(arr.filter((i) => i !== item));
    else setArr([...arr, item]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSkillChange = (skillId) => {
    setFormData((p) => ({
      ...p,
      skills: p.skills.includes(skillId) ? p.skills.filter((id) => id !== skillId) : [...p.skills, skillId],
    }));
  };

  const handleLocationUpdated = ({ latitude, longitude, mapLocation }) => {
    setFormData((p) => ({ ...p, latitude, longitude, mapLocation, providerLocation: mapLocation }));
  };

  const validate = () => {
    setErrorMessage("");
    setSuccessMessage("");

    // If role is OTHER — skip all validations (no API call will be made)
    if (normalizedCategory === "OTHER") return true;

    // For other roles validate required fields
    if (!hasWorkExperience) {
      setErrorMessage("Please select whether you have prior work experience.");
      return false;
    }

    if (preferredLanguages.length === 0) {
      setErrorMessage("Please select at least one preferred language.");
      return false;
    }

    // require at least one skill only if role is not OTHER
    if (formData.skills.length === 0) {
      setErrorMessage("Please select at least one skill.");
      return false;
    }

    if (hasWorkExperience === "yes") {
      if (!formData.startDate || (!formData.onGoing && !formData.endDate)) {
        setErrorMessage("Please complete your experience dates.");
        return false;
      }
      if (!formData.mapLocation) {
        setErrorMessage("Please set your hospital/provider location.");
        return false;
      }
      if (!formData.department) {
        setErrorMessage("Please select a department.");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (isClicked) return;
    setErrorMessage("");
    if (!validate()) return;
    setIsClicked(true);

    // If role is OTHER, do not call any API — simply mark completed and advance
    if (normalizedCategory === "OTHER") {
      setSuccessMessage("Saved — no details required for this role.");
      setIsSubmitted(true);
      setTimeout(() => {
        onComplete?.();
        setIsClicked(false);
      }, 250);
      return;
    }

    const payload = {
      categoryByProfession: categoryByProfession || "ADMIN",
      isExperienced: hasWorkExperience === "yes",
      yearsOfExperience: hasWorkExperience === "yes" ? parseInt(formData.yearsOfExperience) || 0 : undefined,
      monthsOfExperience: hasWorkExperience === "yes" ? parseInt(formData.monthsOfExperience) || 0 : undefined,
      // department: hasWorkExperience === "yes" ? formData.department : undefined,
      departmentId: hasWorkExperience === "yes" ? formData.department : undefined,
      providerName: hasWorkExperience === "yes" ? formData.providerName : undefined,
      providerAddress: hasWorkExperience === "yes" ? (formData.providerAddress || formData.mapLocation) : undefined,
      providerState: formData.providerState || undefined,
      providerStateId: formData.providerStateId || undefined,
      providerLocation: hasWorkExperience === "yes" ? (formData.providerLocation || formData.mapLocation) : undefined,
      startDate: hasWorkExperience === "yes" && formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
      endDate:
        hasWorkExperience === "yes"
          ? formData.onGoing
            ? new Date().toISOString()
            : formData.endDate
            ? new Date(formData.endDate).toISOString()
            : undefined
          : undefined,
      onGoing: hasWorkExperience === "yes" ? formData.onGoing : undefined,
      skills: formData.skills,
      skillsIds: formData.skills,
      languages: listedLanguages.filter((l) => preferredLanguages.includes(l.id)).map((l) => l.language),
      languageIds: preferredLanguages,
      latitude: formData.latitude,
      longitude: formData.longitude,
    };

    try {
      await submitSupervisorPageTwo(payload);
      setSuccessMessage("Experience details submitted successfully.");
      setIsSubmitted(true);
      onComplete?.();
    } catch (err) {
      console.error("Submit error:", err);
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsClicked(false);
    }
  };

  return (
    <div className="pt-[15px] px-4">
      <h1 className="text-[16px] font-semibold text-black py-[18px]">Do you have Work Experience?</h1>
      <div className="flex flex-col gap-[18px]">
        <select
          className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black text-[14px] outline-none"
          value={hasWorkExperience}
          onChange={(e) => setHasWorkExperience(e.target.value)}
        >
          <option value="" disabled>Previous Work Experience</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      {hasWorkExperience === "yes" && (
        <>
          <h1 className="text-[16px] font-semibold text-black py-[18px]">Please provide your experience details</h1>

          <div className="flex gap-3">
            <select name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none">
              <option value="">Year</option>
              {Array.from({ length: 31 }, (_, i) => (<option key={i} value={i}>{i} {i === 1 ? "Year" : "Years"}</option>))}
            </select>
            <select name="monthsOfExperience" value={formData.monthsOfExperience} onChange={handleChange} className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none">
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, i) => (<option key={i} value={i}>{i} {i === 1 ? "Month" : "Months"}</option>))}
            </select>
          </div>

          <input type="text" name="providerName" placeholder="Hospital (Last working)" value={formData.providerName} onChange={handleChange} className="mt-4 w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none" />

          <div>
            <button type="button" onClick={() => setShowLocationPopup(true)} className="mt-4 w-[328px] min-h-[40px] border border-[#BBBBBB] rounded-[15px] px-3 text-left text-black bg-white">
              {formData.mapLocation || "Set Hospital Location"}
            </button>
          </div>

          {/* Department - hide if role is OTHER */}
          {normalizedCategory !== "OTHER" && (
            <select name="department" value={formData.department} onChange={handleChange} className="mt-4 w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none">
              <option value="">Department</option>
              {departments.map((dept) => (<option key={dept.id} value={dept.id}>{dept.workingDepartment}</option>))}
            </select>
          )}

          <div className="flex gap-3 mt-4 items-end">
            <div>
              <p className="mb-2">From</p>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black outline-none" />
            </div>
            <div>
              <p className="mb-2">To</p>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} disabled={formData.onGoing} className="w-[129px] h-[40px] border border-[#BBBBBB] rounded-[15px] px-2 text-black disabled:bg-gray-200 outline-none" />
            </div>
            <label className="flex items-center gap-2 ms-4">
              <input type="checkbox" name="onGoing" checked={formData.onGoing} onChange={handleChange} className="size-[20px]" />
              Currently working here
            </label>
          </div>
        </>
      )}

      {/* Skills - hide if role is OTHER */}
      {normalizedCategory !== "OTHER" && (
        <>
          <h1 className="text-[16px] font-semibold text-black py-[18px]">Mention your Expertise / Skills</h1>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <label key={skill.id} className="flex items-center gap-2">
                <input type="checkbox" checked={formData.skills.includes(skill.id)} onChange={() => handleSkillChange(skill.id)} className="size-[20px]" />
                <span>{skill.skill}</span>
              </label>
            ))}
          </div>
        </>
      )}

      {/* Languages (always show) */}
      <h1 className="text-[16px] font-semibold text-black py-[18px]">Preferred Languages</h1>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {isLangLoading && <p>Loading languages...</p>}
        {langErrorFetch && !isLangLoading && <p className="text-red-500">Failed to load languages.</p>}
        {!isLangLoading && !langErrorFetch && listedLanguages.map((lang) => (
          <label key={lang.id} className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={preferredLanguages.includes(lang.id)}
              onChange={() => toggleArray(lang.id, preferredLanguages, setPreferredLanguages)}
              className="size-5"
            />
            {lang.language}
          </label>
        ))}
      </div>

      {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
      {successMessage && <p className="text-blue-600 text-sm mt-2">{successMessage}</p>}

      <button onClick={handleSubmit} disabled={isSubmitted || isClicked} className={`mt-10 w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center ${isSubmitted || isClicked ? "opacity-50 cursor-not-allowed" : ""}`}>
        {isSubmitted ? "Submitted" : "Next"}
      </button>

      {showLocationPopup && (
        <LocationPickerPopup currentLat={formData.latitude} currentLng={formData.longitude} onClose={() => setShowLocationPopup(false)} onUpdated={handleLocationUpdated} />
      )}
    </div>
  );
}

export default SupervisorExperienceDetails;
