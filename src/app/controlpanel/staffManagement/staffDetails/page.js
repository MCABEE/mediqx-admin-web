// import Navlink from "@/components/staffManagement/Navlink";
// import React from "react";
// import Link from "next/link";

// function page() {
//   return (
//     <div>
//       <Navlink />

//       <div className="w-full bg-white border border-[#888888] text-base text-black font-semibold  px-6 py-3 rounded-[15px] mt-4">
//         <span>Back</span>

//         {/* <span className="h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4">
//           Referral
//         </span> */}
//       </div>

//       <div className="bg-white border-[1px] border-[#BBBBBB] rounded-[15px] mt-4 mb-6">
//         <div className="flex justify-between items-center px-[39px] py-[19px] border-b-[1px] border-b-[#BBBBBB]">
//             <span className="text-[20px] font-semibold text-[#333333]">Nitheesh Kumar M</span>
//             <div className="flex items-center  gap-4 ">
//                 <button>
//                     <img src="/edit-btn.svg" alt="" />
//                 </button>
//                 <button>
//                     <img src="/delete-btn.svg" alt="" />
//                 </button>
//             </div>
//         </div>

// <div className="px-[39px] pt-[15px]">
//     <h1 className="text-[16px] font-semibold text-black pb-[18px]">Basics</h1>
//     <div className="flex gap-10">
//         <div className="flex flex-col gap-[10px] text-[16px]  text-black">
//         <span className="text-[16px]  text-black">
//         Current Location
//         </span>
//         <span className="text-[16px]  text-black">
//         Qualification
//         </span>
//         <span className="text-[16px]  text-black">
//         Looking for (Fulltime / Part Time)
//         </span>
//         </div>
//         <div className="flex flex-col gap-[10px] text-[16px]  text-black">
//         <span className="text-[16px]  text-black">
//         Mysuru, Karnataka
//         </span>
//         <span className="text-[16px]  text-black">
//         GNM
//         </span>
//         <span className="text-[16px]  text-black">
//         Part Time
//         </span>
//         </div>
//     </div>

//     <h1 className="text-[16px] font-semibold text-black py-[18px]">Available Time Schedules</h1>
//     <div className="flex gap-x-[20px]">
//         <div className="flex flex-col text-[16px]  text-black font-light gap-[18px]">
//             <span>Sunday</span>
//             <span>Monday</span>
//             <span>Tuesday</span>
//             <span>Wednesday</span>
//             <span>Thursday</span>
//             <span>Friday</span>
//             <span>Saturday</span>

//         </div>
//         <div className="flex flex-col text-[16px]  text-black font-light gap-[18px]">
//             <span className="flex gap-4">
//                 <img src="/available-btn.svg" alt="" /> <span className="text-[#09B438] text-[16px]">Available</span>
//             </span>
//             <span className="flex gap-4">
//                 <img src="/available-btn.svg" alt="" /> <span className="text-[#09B438] text-[16px]">Available</span>
//             </span>
//             <span className="flex gap-4">
//                 <img src="/available-btn.svg" alt="" /> <span className="text-[#09B438] text-[16px]">Available</span>
//             </span>
//             <span className="flex gap-4">
//                 <img src="/available-btn.svg" alt="" /> <span className="text-[#09B438] text-[16px]">Available</span>
//             </span>
//             <span className="flex gap-4">
//                 <img src="/available-btn.svg" alt="" /> <span className="text-[#09B438] text-[16px]">Available</span>
//             </span>
//             <span className="flex gap-4">
//                 <img src="/available-btn.svg" alt="" /> <span className="text-[#09B438] text-[16px]">Available</span>
//             </span>
//             <span className="flex gap-4">
//                 <img src="/not-available-btn.svg" alt="" /> <span className="text-[#FE1940] text-[16px]">NA</span>
//             </span>

//         </div>
//         <div className="flex flex-col text-[16px]  text-black font-light gap-[18px] ps-8">
//             <span className="border-b-[1px] border-b-[#BBBBBB]">08:00 AM</span>
//             <span className="border-b-[1px] border-b-[#BBBBBB]">08:00 AM</span>
//             <span className="border-b-[1px] border-b-[#BBBBBB]">08:00 AM</span>
//             <span className="border-b-[1px] border-b-[#BBBBBB]">02:00 PM</span>
//             <span className="border-b-[1px] border-b-[#BBBBBB]">02:00 PM</span>
//             <span className="border-b-[1px] border-b-[#BBBBBB]">08:00 AM</span>
//             <span className="border-b-[1px] border-b-[#BBBBBB]"></span>

//         </div>
//         <div className="flex flex-col text-[16px]  text-black font-light gap-[18px] ps-8">
//             <span className="border-b-[1px] border-b-[#BBBBBB]">08:00 PM</span>
//             <span className="border-b-[1px] border-b-[#BBBBBB]">08:00 AM</span>
//             <span className="border-b-[1px] border-b-[#BBBBBB]">08:00 AM</span>
//             <span className="border-b-[1px] border-b-[#BBBBBB]">02:00 PM</span>
//             <span className="border-b-[1px] border-b-[#BBBBBB]">02:00 PM</span>
//             <span className="border-b-[1px] border-b-[#BBBBBB]">08:00 AM</span>
//             <span className="border-b-[1px] border-b-[#BBBBBB]"></span>

//         </div>
//     </div>

//     <h1 className="text-[16px] font-semibold text-black py-[18px]">Available Time Schedules</h1>
//     <div className="flex  text-[16px]  text-black font-light gap-[18px]">
//             <span className="w-[280px] font-light">Previous Work Experience</span>
//             <span className="font-light">Yes</span>

//         </div>
//         <h1 className="text-[16px] font-semibold text-black py-[18px]">Experience details</h1>
//     <div className="flex flex-col text-[16px]  text-black font-light gap-[18px]">
//             <div className="flex gap-[18px]">
//             <span className="w-[280px] font-light">Total Experience in years</span>
//             <span className="font-light">03</span>
//             </div>
//             <div className="flex gap-[18px]">
//             <span className="w-[280px] font-light">Hospital (Last working)</span>
//             <span className="font-light">Baby Memorial Hospital, Calicut</span>
//             </div>
//             <div className="flex gap-[18px]">
//             <span className="w-[280px] font-light">Department / Specialty</span>
//             <span className="font-light">Causality & Emergency Medicine</span>
//             </div>

//         </div>

//         <h1 className="text-[16px] font-semibold text-black py-[18px]">Expertise / Skills</h1>

//         <div className="flex flex-col text-[16px]  text-black font-light gap-[18px]">
//             <span>Neonatal (NICU)</span>
//             <span>Pediatrics</span>
//             <span>Emergency & Trauma (Casualty)</span>
//             <span>Obstetrics & Gynecology (OB/GYN)</span>

//         </div>
//         </div>

//     <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">Registration / Experience Certificates</h1>

//     <div className="flex flex-col gap-y-4 text-black">
//         <div className="flex bg-[#EBF2F8] px-[39px] py-4">
//     <span className="w-[300px]">Resume</span>
//     <span><img src="/pdf.svg" alt="" /></span>
//     <span className="text-[14px] text-[#1982FE] ps-20">View</span>
//     <span className="text-[14px] text-[#1982FE] ps-20">Download</span>
//           </div>
//           <div className="flex bg-[#EBF2F8] px-[39px] py-4">
//     <span className="w-[300px]">Council Registration</span>
//     <span><img src="/pdf.svg" alt="" /></span>
//     <span className="text-[14px] text-[#1982FE] ps-20">View</span>
//     <span className="text-[14px] text-[#1982FE] ps-20">Download</span>
//           </div>
//           <div className="flex bg-[#EBF2F8] px-[39px] py-4">
//     <span className="w-[300px]">Experience Certificates</span>
//     <span><img src="/pdf.svg" alt="" /></span>
//     <span className="text-[14px] text-[#1982FE] ps-20">View</span>
//     <span className="text-[14px] text-[#1982FE] ps-20">Download</span>
//           </div>
//           <div className="flex bg-[#EBF2F8] px-[39px] py-4">
//     <span className="w-[300px]">Photo</span>
//     <span><img src="/pdf.svg" alt="" /></span>
//     <span className="text-[14px] text-[#1982FE] ps-20">View</span>
//     <span className="text-[14px] text-[#1982FE] ps-20">Download</span>
//           </div>
//     </div>

//     <h1 className="text-[16px] font-semibold text-black  px-[39px] py-[18px]">Contact Details </h1>
// <div className="flex flex-col text-[16px]  text-black font-light gap-[18px] px-[39px] pb-[18px] border-b-[1px] border-b-[#BBBBBB]">
//         <div className="flex gap-[18px]">
//         <span className="w-[280px] font-light">Full Name</span>
//         <span className="font-light">Nitheesh Kumar M</span>
//         </div>
//         <div className="flex gap-[18px]">
//         <span className="w-[280px] font-light">Email ID</span>
//         <span className="font-light">nitheeshkumar1994@gmail.com</span>
//         </div>
//         <div className="flex gap-[18px]">
//         <span className="w-[280px] font-light">Phone Number</span>
//         <span className="font-light">+91 9876543210</span>
//         </div>
//         <div className="flex gap-[18px]">
//         <span className="w-[280px] font-light">Address </span>
//         <span className="font-light">217/A, Beech Road, Bajpur, Calicut, Kerala - 600525</span>
//         </div>

//     </div>

//     <h1 className="text-[16px] font-semibold text-black  px-[39px] py-[18px]">Actions </h1>

//         <div className="flex gap-8 px-[39px] pb-20">

//         <button className="w-[192px] h-[40px] bg-[#F93827] text-white flex justify-center items-center rounded-[15px]">Reject</button>
//         <button className="w-[192px] h-[40px] bg-[#999999] text-white flex justify-center items-center rounded-[15px]">Modify</button>
//         <button className="w-[192px] h-[40px] bg-[#09B438] text-white flex justify-center items-center rounded-[15px]">Approve</button>
//         </div>

//   </div>
//     </div>
//   );
// }

// export default page;



"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Navlink from "@/components/staffManagement/Navlink";
import nurseStore from "@/app/lib/store/nurseStore";
import Link from "next/link";

function StaffDetailPage() {
  const { userId } = useParams();
  const { fetchNurseById, selectedNurse } = nurseStore();

  useEffect(() => {
    if (userId) {
      fetchNurseById(userId);
    }
  }, [userId]);

  if (!selectedNurse) return <div>Loading...</div>;

  const nurse = selectedNurse?.nurse?.[0] || {};
  const qualification = nurse?.qualifications?.[0]?.qualification_details || {};
  const address = selectedNurse?.addresses?.[0] || {};

  return (
    <div>
      <Navlink />

      <div className="w-full bg-white border border-[#888888] text-base text-black font-semibold px-6 py-3 rounded-[15px] mt-4">
        <Link href={"/controlpanel/staffManagement"}>Back</Link>
      </div>

      <div className="bg-white border-[1px] border-[#BBBBBB] rounded-[15px] mt-4 mb-6">
        <div className="flex justify-between items-center px-[39px] py-[19px] border-b-[1px] border-b-[#BBBBBB]">
          <span className="text-[20px] font-semibold text-[#333333]">
            {selectedNurse.firstName} {selectedNurse.lastName}
          </span>
          <div className="flex items-center gap-4">
            <button>
              <img src="/edit-btn.svg" alt="edit" />
            </button>
            <button>
              <img src="/delete-btn.svg" alt="delete" />
            </button>
          </div>
        </div>

        <div className="px-[39px] pt-[15px]">
          {/* Basic Info */}
          <h1 className="text-[16px] font-semibold text-black pb-[18px]">
            Basics
          </h1>
          <div className="flex gap-10">
            <div className="flex flex-col gap-[10px] text-[16px] text-black">
              <span>Current Location</span>
              <span>Qualification</span>
              <span>Looking for (Fulltime / Part Time)</span>
            </div>
            <div className="flex flex-col gap-[10px] text-[16px] text-black">
              <span>{nurse.current_location || address.city || "N/A"}</span>
              <span>{qualification.qualification || "N/A"}</span>
              <span>{nurse.work_schedule || "N/A"}</span>
            </div>
          </div>

          {/* Time Schedule (Static Mockup) */}
          {/* <h1 className="text-[16px] font-semibold text-black py-[18px]">
            Available Time Schedules
          </h1>
          <div className="flex gap-x-[20px]">
            <div className="flex flex-col text-[16px] text-black font-light gap-[18px]">
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
            <div className="flex flex-col text-[16px] text-black font-light gap-[18px]">
              {[...Array(6).fill("Available"), "NA"].map((status, index) => (
                <span key={index} className="flex gap-4">
                  <img
                    src={
                      status === "Available"
                        ? "/available-btn.svg"
                        : "/not-available-btn.svg"
                    }
                    alt={status}
                  />
                  <span
                    className={
                      status === "Available"
                        ? "text-[#09B438]"
                        : "text-[#FE1940]"
                    }
                  >
                    {status}
                  </span>
                </span>
              ))}
            </div>
            <div className="flex flex-col text-[16px] text-black font-light gap-[18px] ps-8">
              {[
                "08:00 AM",
                "08:00 AM",
                "08:00 AM",
                "02:00 PM",
                "02:00 PM",
                "08:00 AM",
                "",
              ].map((time, i) => (
                <span key={i} className="border-b-[1px] border-b-[#BBBBBB]">
                  {time}
                </span>
              ))}
            </div>
            <div className="flex flex-col text-[16px] text-black font-light gap-[18px] ps-8">
              {[
                "08:00 PM",
                "08:00 AM",
                "08:00 AM",
                "02:00 PM",
                "02:00 PM",
                "08:00 AM",
                "",
              ].map((time, i) => (
                <span key={i} className="border-b-[1px] border-b-[#BBBBBB]">
                  {time}
                </span>
              ))}
            </div>
          </div> */}

          {/* Experience Section */}
          <h1 className="text-[16px] font-semibold text-black py-[18px]">
            Previous Work Experience
          </h1>
          <div className="flex text-[16px] text-black font-light gap-[18px]">
            <span className="w-[280px]">Previous Work Experience</span>
            <span>{qualification.previous_experience_years || "No"}</span>
          </div>

          <h1 className="text-[16px] font-semibold text-black py-[18px]">
            Experience details
          </h1>
          <div className="flex flex-col text-[16px] text-black font-light gap-[18px]">
            <div className="flex gap-[18px]">
              <span className="w-[280px]">Total Experience in years</span>
              <span>{nurse.years_of_experience || "0"}</span>
            </div>
            <div className="flex gap-[18px]">
              <span className="w-[280px]">Hospital (Last working)</span>
              <span>{qualification.last_worked_Hospital || "N/A"}</span>
            </div>
            <div className="flex gap-[18px]">
              <span className="w-[280px]">Department / Specialty</span>
              <span>{nurse.specializations || "N/A"}</span>
            </div>
          </div>

          {/* Skills Section */}
          <h1 className="text-[16px] font-semibold text-black py-[18px]">
            Expertise / Skills
          </h1>
          <div className="flex flex-col text-[16px] text-black font-light gap-[18px]">
            {nurse.skills?.length ? (
              nurse.skills.map((skill, idx) => <span key={idx}>{skill}</span>)
            ) : (
              <span>N/A</span>
            )}
          </div>
        </div>
        <h1 className="text-[16px] font-semibold text-black px-[39px] py-[18px]">
          Registration / Experience Certificates
        </h1>

        <div className="flex flex-col gap-y-4 text-black">
          <div className="flex bg-[#EBF2F8] px-[39px] py-4">
            <span className="w-[300px]">Resume</span>
            <span>
              <img src="/pdf.svg" alt="" />
            </span>
            <span className="text-[14px] text-[#1982FE] ps-20">View</span>
            <span className="text-[14px] text-[#1982FE] ps-20">Download</span>
          </div>
          <div className="flex bg-[#EBF2F8] px-[39px] py-4">
            <span className="w-[300px]">Council Registration</span>
            <span>
              <img src="/pdf.svg" alt="" />
            </span>
            <span className="text-[14px] text-[#1982FE] ps-20">View
            {qualification.council_Registration_image}
            </span>
            
            <span className="text-[14px] text-[#1982FE] ps-20">Download</span>
          </div>
          <div className="flex bg-[#EBF2F8] px-[39px] py-4">
            <span className="w-[300px]">Experience Certificates</span>
            <span>
              <img src="/pdf.svg" alt="" />
            </span>
            <span className="text-[14px] text-[#1982FE] ps-20">View</span>
            <span className="text-[14px] text-[#1982FE] ps-20">Download</span>
          </div>
          <div className="flex bg-[#EBF2F8] px-[39px] py-4">
            <span className="w-[300px]">Photo</span>
            <span>
              <img src="/pdf.svg" alt="" />
            </span>
            <span className="text-[14px] text-[#1982FE] ps-20">View</span>
            <span className="text-[14px] text-[#1982FE] ps-20">Download</span>
          </div>
        </div>

        <h1 className="text-[16px] font-semibold text-black  px-[39px] py-[18px]">
          Contact Details{" "}
        </h1>
        <div className="flex flex-col text-[16px]  text-black font-light gap-[18px] px-[39px] pb-[18px] border-b-[1px] border-b-[#BBBBBB]">
          <div className="flex gap-[18px]">
            <span className="w-[280px] font-light">Full Name</span>
            <span className="font-light">
              {selectedNurse.firstName} {selectedNurse.lastName}
            </span>
          </div>
          <div className="flex gap-[18px]">
            <span className="w-[280px] font-light">Email ID</span>
            <span className="font-light">{selectedNurse.email}</span>
          </div>
          <div className="flex gap-[18px]">
            <span className="w-[280px] font-light">Phone Number</span>
            <span className="font-light">{selectedNurse.phone_number}</span>
          </div>
          <div className="flex gap-[18px]">
            <span className="w-[280px] font-light">Address </span>
            <span className="font-light">
            {address.city},{address.district},{address.state},<br/>
            {address.postal_code}
              
            </span>
          </div>
        </div>

        <h1 className="text-[16px] font-semibold text-black  px-[39px] py-[18px]">
          Actions{" "}
        </h1>

        <div className="flex gap-8 px-[39px] pb-20">
          <button className="w-[192px] h-[40px] bg-[#F93827] text-white flex justify-center items-center rounded-[15px]">
            Reject
          </button>
          <button className="w-[192px] h-[40px] bg-[#999999] text-white flex justify-center items-center rounded-[15px]">
            Modify
          </button>
          <button className="w-[192px] h-[40px] bg-[#09B438] text-white flex justify-center items-center rounded-[15px]">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}

export default StaffDetailPage;
