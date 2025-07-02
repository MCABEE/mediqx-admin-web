"use client";
import React, { useState } from "react";
import useNurseRegistrationStore from "@/app/lib/store/nurseRegistrationStore";
function NurseExperienceDetails() {
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasWorkExperience, setHasWorkExperience] = useState("no");

  const [formData, setFormData] = useState({
    id: "",
    yearsOfExperience: "",
    monthsOfExperience: "",
    department: "",
    startDate: "",
    endDate: "",
    onGoing: false,
    providerName: "",
    providerLocation: "",
    providerState: "",
    skills: [],
  });

  const { submitNursePageTwo } = useNurseRegistrationStore();

  const districtMap = {
    Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode"],
    Karnataka: ["Bengaluru", "Mysuru", "Mangaluru"],
  };

  const nursingSkills = [
    "Vital signs monitoring",
    "Medication administration",
    "Patient hygiene & grooming",
    "Wound dressing & basic procedures",
    "Injections (IM, IV, SC)",
    "Catheterization",
    "IV cannulation & fluid management",
    "Feeding (oral, NG tube, PEG)",
    "Positioning & mobility support",
    "Emergency response (CPR, BLS)",
    "Bed making (sterile/occupied)",
    "Post-operative care",
    "Infection control practices",
    "Oxygen therapy management",
    "Record keeping & nursing documentation",
    "Assist in minor procedures",
    "Baby care / Mother care (Obstetric)",
    "Elderly care",
    "Communication skills",
    "Empathy and patience",
    "Time management",
    "Teamwork and collaboration",
    "Documentation accuracy",
    "Adaptability and problem-solving",
    "Cultural sensitivity",
    "Physical stamina and alertness",
    "Professional ethics and confidentiality",
    "Punctuality and responsibility",
    "Basic Life Support (BLS)",
    "Advanced Cardiac Life Support (ACLS)",
    "Infection Control Training",
    "Home Nursing Training",
    "First Aid Certification",
  ];

  const departments = [
    "General Medicine",
    "ICU / Critical Care",
    "Emergency Department",
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Surgical Wards",
    "Gynecology & Obstetrics",
    "Neonatal ICU (NICU)",
    "Dialysis Unit",
    "Operation Theatre (OT)",
    "Anesthesia Unit",
    "Psychiatry",
    "ENT",
    "Dermatology",
    "Radiology",
    "Gastroenterology",
    "Infection Control",
  ];

  const midIndex = Math.ceil(nursingSkills.length / 2);
  const firstColumn = nursingSkills.slice(0, midIndex);
  const secondColumn = nursingSkills.slice(midIndex);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setDistricts(districtMap[state] || []);
    setFormData({ ...formData, providerState: state });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSkillChange = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
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
    }

    const formatToDateTime = (dateStr) => new Date(dateStr).toISOString();

    const payload = {
      isExperienced: hasWorkExperience === "yes",
      skills: formData.skills,
    };

    if (hasWorkExperience === "yes") {
      payload.yearsOfExperience = parseInt(formData.yearsOfExperience) || 0;
      payload.monthsOfExperience = parseInt(formData.monthsOfExperience) || 0;
      payload.department = formData.department;
      payload.providerName = formData.providerName;
      payload.providerLocation = formData.providerLocation;
      payload.providerState = formData.providerState;
      payload.onGoing = formData.onGoing;

      if (formData.startDate) {
        payload.startDate = new Date(formData.startDate).toISOString();
      }

      if (formData.onGoing) {
        payload.endDate = new Date().toISOString();
      } else if (formData.endDate) {
        payload.endDate = new Date(formData.endDate).toISOString();
      }
    }

    try {
      await submitNursePageTwo(payload);
      setSuccessMessage("Experience details submitted successfully.");
      setIsSubmitted(true);
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="px-[39px] pt-[15px]">
      <h1 className="text-[16px] font-semibold text-black py-[18px]">
        Do you have Work Experience?
      </h1>
      <div className="flex flex-col text-[16px]  text-black font-light gap-[18px] ">
        <select
          className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] px-2  outline-none placeholder:text-black"
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
      {hasWorkExperience === "yes" && (
        <>
          <h1 className="text-[16px] font-semibold text-black py-[18px]">
            Please provide your experience details
          </h1>
          <div className="flex flex-col gap-5">
            <h1 className="text-[16px] font-semibold text-black py-[18px]">
              Total Experience in Y/M
            </h1>
            <div className="flex gap-3">
              <select
                name="yearsOfExperience"
                className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2  outline-none placeholder:text-black"
                value={formData.yearsOfExperience}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Year
                </option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i} value={i}>
                    {i} {i === 1 ? "Year" : "Years"}
                  </option>
                ))}
              </select>

              <select
                name="monthsOfExperience"
                className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2  outline-none placeholder:text-black"
                value={formData.monthsOfExperience}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Months
                </option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {i} {i === 1 ? "Month" : "Months"}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              name="providerName"
              placeholder="Hospital (Last working)"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2  outline-none placeholder:text-black"
              value={formData.providerName}
              onChange={handleChange}
            />

            <select
              name="providerState"
              value={selectedState}
              onChange={handleStateChange}
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2  outline-none placeholder:text-black"
            >
              <option value="" disabled>
                State
              </option>
              <option value="Kerala">Kerala</option>
              <option value="Karnataka">Karnataka</option>
            </select>

            <input
              type="text"
              name="providerLocation"
              placeholder="Area"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2  outline-none placeholder:text-black"
              value={formData.providerLocation}
              onChange={handleChange}
            />

            <select
              name="department"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2  outline-none placeholder:text-black"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="" disabled>
                Department
              </option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <h1 className="text-[16px] font-semibold text-black pt-[18px]">
              Working Duration{" "}
              <span className="font-light">(On this Hospital)</span>
            </h1>

            <div className="flex gap-3">
              <div>
                <p className="mb-2">From</p>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2  outline-none placeholder:text-black"
                />
              </div>
              <div>
                <p className="mb-2">To</p>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2  outline-none placeholder:text-black"
                />
              </div>
              <div className="text-[16px] text-black font-light flex justify-center items-center gap-2 ms-10 mt-8">
                <input
                  type="checkbox"
                  name="onGoing"
                  checked={formData.onGoing}
                  onChange={handleChange}
                  className="size-[20px]"
                />
                Currently am working here
              </div>
            </div>
          </div>
        </>
      )}

      <h1 className="text-[16px] font-semibold text-black py-[18px]">
        Mention your Expertise / Skills
      </h1>

      <div className="flex gap-10">
        {[firstColumn, secondColumn].map((column, colIndex) => (
          <div
            key={colIndex}
            className="flex flex-col text-[16px] text-black font-light gap-[18px]"
          >
            {column.map((skill, index) => (
              <label key={index} className="flex gap-[5px] items-center">
                <input
                  type="checkbox"
                  className="size-[20px]"
                  checked={formData.skills.includes(skill)}
                  onChange={() => handleSkillChange(skill)}
                />
                <span className="text-[16px]">{skill}</span>
              </label>
            ))}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitted}
        className={`mt-10 w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center opacity-100  ${
          isSubmitted
            ? "disabled:opacity-50 cursor-not-allowed"
            : "bg-[#3674B5] text-white"
        }`}
      >
        {isSubmitted ? "Submitted" : "Next"}
      </button>

      {errorMessage && (
        <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="text-blue-600 text-sm mt-2">{successMessage}</p>
      )}
    </div>
  );
}

export default NurseExperienceDetails;
