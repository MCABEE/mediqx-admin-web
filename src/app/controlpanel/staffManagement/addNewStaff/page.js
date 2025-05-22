"use client";
import Navlink from "@/components/staffManagement/Navlink";
import React, { useState } from "react";

function page() {
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);

  const districtMap = {
    Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode"],
    Karnataka: ["Bengaluru", "Mysuru", "Mangaluru"],
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setDistricts(districtMap[state] || []);
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

  const schedule = [
  { day: "Sunday", available: true, start: "08:00 AM", end: "08:00 PM" },
  { day: "Monday", available: true, start: "08:00 AM", end: "08:00 AM" },
  { day: "Tuesday", available: true, start: "08:00 AM", end: "08:00 AM" },
  { day: "Wednesday", available: true, start: "02:00 PM", end: "02:00 PM" },
  { day: "Thursday", available: true, start: "02:00 PM", end: "02:00 PM" },
  { day: "Friday", available: true, start: "08:00 AM", end: "08:00 AM" },
  { day: "Saturday", available: false, start: "", end: "" },
];

  const half = Math.ceil(nursingSkills.length / 2);
  const firstColumn = nursingSkills.slice(0, half);
  const secondColumn = nursingSkills.slice(half);

  return (
    <div>
      <Navlink />

      <div className="w-full bg-white border border-[#888888] text-base text-black font-semibold flex gap-[50px] px-6 pt-6 pb-4 rounded-[15px] mt-4">
        <div className="flex text-black font-semibold gap-[48px]">
          <p>Nurse</p>
          <p>Paramedical</p>
          <p>Doctor</p>
          <p>Supervisor</p>
        </div>

        {/* <span className="h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4">
          Referral
        </span> */}
      </div>

      <div className="bg-white border-[1px] border-[#BBBBBB] rounded-[15px] mt-4 mb-6">
        <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">
          Basic Information
        </h1>
        <div className="flex flex-col gap-5 px-[39px] mb-12">
          <select
            name=""
            id=""
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] px-2 ps-8"
          >
            <option
              value=""
              selected
              disabled
              className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none ps-8"
            >
              Gender
            </option>
          </select>

          <input
            type="text"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
            placeholder="Full Name"
          />
          <input
            type="email"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
            placeholder="Email ID"
          />
          <input
            type="number"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
            placeholder="Phone Number"
          />
          <select
            name="state"
            id="state"
            value={selectedState}
            onChange={handleStateChange}
            className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 ps-8"
          >
            <option value="" disabled>
              State
            </option>
            <option value="Kerala">Kerala</option>
            <option value="Karnataka">Karnataka</option>
          </select>

          {/* District Dropdown */}
          <select
            name="district"
            id="district"
            disabled={!selectedState}
            className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2 ps-8"
          >
            <option value="" disabled selected>
              District
            </option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
            placeholder="City"
          />

          <input
            type="number"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
            placeholder="Pin Code"
          />
          <input
            type="number"
            className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] placeholder:text-black outline-none rounded-[15px] ps-8 pe-4 "
            placeholder="Referral Code "
          />

          <button className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center">
            Next
          </button>

          <span className=" text-[14px] text-[#3674B5] font-semibold ps-4 ">
            The Entry has been successfully submitted !
          </span>
        </div>

        <div className="px-[39px] pt-[15px]">
          <h1 className="text-[16px] font-semibold text-black py-[18px]">
            Do you have Work Experience?
          </h1>
          <div className="flex flex-col text-[16px]  text-black font-light gap-[18px]">
            <select
              name=""
              id=""
              className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] px-2"
            >
              <option
                value="Current Location"
                selected
                disabled
                className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none"
              >
                Previous Work Experience
              </option>
            </select>
          </div>

          <h1 className="text-[16px] font-semibold text-black py-[18px]">
            Please provide your experience details
          </h1>
          <div className="flex flex-col gap-5">
            <h1 className="text-[16px] font-semibold text-black py-[18px]">
              Total Experience in Y/M
            </h1>

            <div className="flex gap-3">
              {/* Year Dropdown */}
              <select
                name="experienceYear"
                id="experienceYear"
                className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2"
                defaultValue=""
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

              {/* Month Dropdown */}
              <select
                name="experienceMonth"
                id="experienceMonth"
                className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2"
                defaultValue=""
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
              name="lastHospital"
              id="lastHospital"
              placeholder="Hospital (Last working)"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2"
            />

            <select
              name="state"
              id="state"
              value={selectedState}
              onChange={handleStateChange}
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2"
            >
              <option value="" disabled>
                State
              </option>
              <option value="Kerala">Kerala</option>
              <option value="Karnataka">Karnataka</option>
            </select>

            {/* District Dropdown */}
            <select
              name="district"
              id="district"
              disabled={!selectedState}
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2"
            >
              <option value="" disabled selected>
                District
              </option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="area"
              id="area"
              placeholder="Area"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2"
            />
            <select
              name="department"
              id="department"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2"
              defaultValue=""
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
                  className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2"
                />
              </div>

              <div>
                <p className="mb-2">To</p>
                <input
                  type="date"
                  className="w-[129px] h-[40px] text-black text-[14px] font-light border border-[#BBBBBB] rounded-[15px] px-2"
                />
              </div>

              <div className="text-[16px] text-black font-light flex justify-center items-center gap-2 ms-10 mt-8">
                <input type="checkbox" name="" id="" className="size-[20px]" />
                Currently am working here
              </div>
            </div>
          </div>

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
                    <input type="checkbox" className="size-[20px]" />
                    <span className="text-[16px]">{skill}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="px-[39px] pt-[15px]">
          <h1 className="text-[16px] font-semibold text-black py-[18px]">
            Upload your Registration / Experience Certificates
          </h1>
          <div className="flex flex-col gap-5 mb-4">
            <label
              for="cv-upload"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] ps-8 pe-4 flex items-center justify-between cursor-pointer"
            >
              Nursing Certificate <img src="/upload-btn.svg" alt="" />
              <input type="file" id="cv-upload" className="hidden" />
            </label>
            <label
              for="cv-upload"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] ps-8 pe-4 flex items-center justify-between cursor-pointer"
            >
              Council Registration <img src="/upload-btn.svg" alt="" />
              <input type="file" id="cv-upload" className="hidden" />
            </label>
            <label
              for="cv-upload"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] ps-8 pe-4 flex items-center justify-between cursor-pointer"
            >
              Experience Certificates <img src="/upload-btn.svg" alt="" />
              <input type="file" id="cv-upload" className="hidden" />
            </label>
            <label
              for="cv-upload"
              className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] ps-8 pe-4 flex items-center justify-between cursor-pointer"
            >
              Photo <img src="/upload-btn.svg" alt="" />
              <input type="file" id="cv-upload" className="hidden" />
            </label>
          </div>

          <h1 className="text-[16px] font-semibold text-black pb-[18px]">
            Qualification & work Schedule
          </h1>
          <div className="flex flex-col gap-5">
            <select
              name=""
              id=""
              className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] px-2 outline-none"
            >
              <option
                value="Current Location"
                selected
                disabled
                className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none"
              >
                Qualification
              </option>

              <option value="ANM">ANM (Auxiliary Nurse Midwife)</option>
              <option value="GNM">GNM (General Nursing and Midwifery)</option>
              <option value="B.Sc. Nursing">B.Sc. Nursing</option>
              <option value="Post Basic B.Sc. Nursing">
                Post Basic B.Sc. Nursing
              </option>
              <option value="M.Sc. Nursing">M.Sc. Nursing</option>
              <option value="Nurse Practitioner (NP)">
                Nurse Practitioner (NP)
              </option>
            </select>
            <select
              name=""
              id=""
              className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] px-2"
            >
              <option
                value="Current Location"
                selected
                disabled
                className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none"
              >
                Specialization
              </option>
              <option value="Staff Nurse / Ward Nurse">
                Staff Nurse / Ward Nurse
              </option>
              <option value="ICU Nurse / Critical Care Nurse">
                ICU Nurse / Critical Care Nurse
              </option>
              <option value="ER Nurse / Trauma Nurse">
                ER Nurse / Trauma Nurse
              </option>
              <option value="Pediatric Nurse">Pediatric Nurse</option>
              <option value="Ortho Nurse">Ortho Nurse</option>
              <option value="Cardiac Nurse">Cardiac Nurse</option>
              <option value="Neuro Nurse">Neuro Nurse</option>
              <option value="Oncology Nurse">Oncology Nurse</option>
              <option value="OT Nurse / Surgical Nurse">
                OT Nurse / Surgical Nurse
              </option>
              <option value="Maternity Nurse / Midwife">
                Maternity Nurse / Midwife
              </option>
              <option value="NICU Nurse (Neonatal)">
                NICU Nurse (Neonatal)
              </option>
              <option value="Dialysis Nurse">Dialysis Nurse</option>
              <option value="OT Nurse / Scrub Nurse">
                OT Nurse / Scrub Nurse
              </option>
              <option value="Anesthesia Nurse">Anesthesia Nurse</option>
              <option value="Psychiatric Nurse">Psychiatric Nurse</option>
              <option value="ENT Nurse">ENT Nurse</option>
              <option value="Radiology Assistant Nurse">
                Radiology Assistant Nurse
              </option>
              <option value="GI Nurse">GI Nurse</option>
              <option value="Infection Control Nurse">
                Infection Control Nurse
              </option>
            </select>
            <select
              name=""
              id=""
              className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB] rounded-[15px] px-2"
            >
              <option
                value="Current Location"
                selected
                disabled
                className="w-[328px] h-[40px] text-black text-[14px] font-light border-[1px] border-[#BBBBBB]  rounded-[15px] px-2 outline-none"
              >
                Looking for (Fulltime / Part Time)
              </option>
              <option value="FULL_TIME">Full time</option>
              <option value="PART_TIME">Part time</option>
            </select>
          </div>
          <h1 className="text-[16px] font-semibold text-black py-[18px]">
            Part time jobs, Mention avialable Schedules
          </h1>
         <div className="flex gap-x-[20px]">
  {/* Days */}
  <div className="flex flex-col text-[16px] text-black font-light gap-[18px]">
    {schedule.map(({ day }) => (
      <span key={day}>{day}</span>
    ))}
  </div>

  {/* Availability */}
  <div className="flex flex-col text-[16px] text-black font-light gap-[18px]">
    {schedule.map(({ day, available }) => (
      <span key={day} className="flex gap-4 items-center">
        <img
          src={available ? "/available-btn.svg" : "/not-available-btn.svg"}
          alt=""
        />
        <span className={available ? "text-[#09B438]" : "text-[#FE1940]"}>
          {available ? "Available" : "NA"}
        </span>
      </span>
    ))}
  </div>

  {/* Start Time */}
  <div className="flex flex-col text-[16px] text-black font-light gap-[18px] ps-8">
    {schedule.map(({ day, start }) => (
      <span
        key={day}
        className="border-b-[1px] border-b-[#BBBBBB] min-h-[22px]"
      >
        {start}
      </span>
    ))}
  </div>

  {/* End Time */}
  <div className="flex flex-col text-[16px] text-black font-light gap-[18px] ps-8">
    {schedule.map(({ day, end }) => (
      <span
        key={day}
        className="border-b-[1px] border-b-[#BBBBBB] min-h-[22px]"
      >
        {end}
      </span>
    ))}
  </div>
</div>

          <button className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center my-6">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
