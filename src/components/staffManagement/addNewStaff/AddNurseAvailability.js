// "use client"
// import React, { useState } from "react";

// const daysOfWeek = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// const AddNurseAvailability = () => {
//   const [availability, setAvailability] = useState(
//     daysOfWeek.map((day) => ({
//       day,
//       isAvailable: false,
//       shifts: [
//         { start: "", end: "" }, // Shift 1
//         { start: "", end: "" }, // Shift 2
//       ],
//     }))
//   );

//   const toggleAvailability = (index) => {
//     const updated = [...availability];
//     updated[index].isAvailable = !updated[index].isAvailable;
//     setAvailability(updated);
//   };

//   const handleTimeChange = (dayIndex, shiftIndex, field, value) => {
//     const updated = [...availability];
//     updated[dayIndex].shifts[shiftIndex][field] = value;
//     setAvailability(updated);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-semibold mb-4">
//         Part time jobs, Mention available Schedules
//       </h2>

//       <div className="space-y-4">
//         {availability.map((dayData, dayIndex) => (
//           <div
//             key={dayData.day}
//             className="flex flex-wrap items-center gap-4 border-b pb-3"
//           >
//             {/* Day */}
//             <div className="w-24 font-medium">{dayData.day}</div>

//             {/* Toggle Button */}
//             <button
//               onClick={() => toggleAvailability(dayIndex)}
//               className={`px-2 py-1 rounded-full border text-sm ${
//                 dayData.isAvailable
//                   ? "bg-green-100 text-green-600 border-green-300"
//                   : "bg-red-100 text-red-500 border-red-300"
//               }`}
//             >
//               {dayData.isAvailable ? "Available" : "NA"}
//             </button>

//             {/* Time Inputs */}
//             {dayData.isAvailable && (
//               <div className="flex flex-wrap gap-4">
//                 {[0, 1].map((shiftIndex) => (
//                   <div key={shiftIndex} className="flex items-center gap-2">
//                     <input
//                       type="time"
//                       value={dayData.shifts[shiftIndex].start}
//                       onChange={(e) =>
//                         handleTimeChange(
//                           dayIndex,
//                           shiftIndex,
//                           "start",
//                           e.target.value
//                         )
//                       }
//                       className="border p-1 rounded w-[100px]"
//                     />
//                     <span className="text-sm">to</span>
//                     <input
//                       type="time"
//                       value={dayData.shifts[shiftIndex].end}
//                       onChange={(e) =>
//                         handleTimeChange(
//                           dayIndex,
//                           shiftIndex,
//                           "end",
//                           e.target.value
//                         )
//                       }
//                       className="border p-1 rounded w-[100px]"
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AddNurseAvailability;













// import React, { useState } from "react";

// const daysOfWeek = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// const defaultShift = {
//   start: "08:00",
//   end: "14:00",
// };

// export default function NurseAvailability() {
//   const [schedule, setSchedule] = useState(
//     daysOfWeek.map((day) => ({
//       day,
//       available: false,
//       shifts: [
//         { ...defaultShift },
//         { ...defaultShift },
//       ],
//     }))
//   );

//   const toggleAvailability = (index) => {
//     const newSchedule = [...schedule];
//     newSchedule[index].available = !newSchedule[index].available;
//     setSchedule(newSchedule);
//   };

//   const handleTimeChange = (dayIndex, shiftIndex, field, value) => {
//     const newSchedule = [...schedule];
//     newSchedule[dayIndex].shifts[shiftIndex][field] = value;
//     setSchedule(newSchedule);
//   };

//   return (
//     <div className="flex gap-8 text-[16px] text-black font-light">
//       {/* Days */}
//       <div className="flex flex-col gap-[18px]">
//         {schedule.map(({ day }) => (
//           <span key={day}>{day}</span>
//         ))}
//       </div>

//       {/* Availability */}
//       <div className="flex flex-col gap-[18px]">
//         {schedule.map(({ available }, index) => (
//           <span key={index} className="flex items-center gap-2 cursor-pointer" onClick={() => toggleAvailability(index)}>
//             <img
//               src={available ? "/available-btn.svg" : "/not-available-btn.svg"}
//               alt="toggle"
//               className="w-6 h-6"
//             />
//             <span className={available ? "text-[#09B438]" : "text-[#FE1940]"}>
//               {available ? "Available" : "NA"}
//             </span>
//           </span>
//         ))}
//       </div>

//       {/* Shift 1 - Start Time */}
//       <div className="flex flex-col gap-[18px] ps-8">
//         {schedule.map(({ available, shifts }, dayIdx) => (
//           <span key={dayIdx} className="min-h-[22px]">
//             {available ? (
//               <input
//                 type="time"
//                 value={shifts[0].start}
//                 onChange={(e) =>
//                   handleTimeChange(dayIdx, 0, "start", e.target.value)
//                 }
//                 className="border-b border-[#BBBBBB]"
//               />
//             ) : (
//               ""
//             )}
//           </span>
//         ))}
//       </div>

//       {/* Shift 1 - End Time */}
//       <div className="flex flex-col gap-[18px] ps-8">
//         {schedule.map(({ available, shifts }, dayIdx) => (
//           <span key={dayIdx} className="min-h-[22px]">
//             {available ? (
//               <input
//                 type="time"
//                 value={shifts[0].end}
//                 onChange={(e) =>
//                   handleTimeChange(dayIdx, 0, "end", e.target.value)
//                 }
//                 className="border-b border-[#BBBBBB]"
//               />
//             ) : (
//               ""
//             )}
//           </span>
//         ))}
//       </div>

//       {/* Shift 2 - Start Time */}
//       <div className="flex flex-col gap-[18px] ps-8">
//         {schedule.map(({ available, shifts }, dayIdx) => (
//           <span key={dayIdx} className="min-h-[22px]">
//             {available ? (
//               <input
//                 type="time"
//                 value={shifts[1].start}
//                 onChange={(e) =>
//                   handleTimeChange(dayIdx, 1, "start", e.target.value)
//                 }
//                 className="border-b border-[#BBBBBB]"
//               />
//             ) : (
//               ""
//             )}
//           </span>
//         ))}
//       </div>

//       {/* Shift 2 - End Time */}
//       <div className="flex flex-col gap-[18px] ps-8">
//         {schedule.map(({ available, shifts }, dayIdx) => (
//           <span key={dayIdx} className="min-h-[22px]">
//             {available ? (
//               <input
//                 type="time"
//                 value={shifts[1].end}
//                 onChange={(e) =>
//                   handleTimeChange(dayIdx, 1, "end", e.target.value)
//                 }
//                 className="border-b border-[#BBBBBB]"
//               />
//             ) : (
//               ""
//             )}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }











import React, { useState } from "react";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const defaultShift = {
  start: "",
  end: "",
};

export default function NurseAvailability() {
  const [schedule, setSchedule] = useState(
    daysOfWeek.map((day) => ({
      day,
      available: false,
      shifts: [{ ...defaultShift }, { ...defaultShift }],
    }))
  );

  const toggleAvailability = (index) => {
    const newSchedule = [...schedule];
    newSchedule[index].available = !newSchedule[index].available;

    // Optional: clear shift times when toggled off
    if (!newSchedule[index].available) {
      newSchedule[index].shifts = [{ ...defaultShift }, { ...defaultShift }];
    }

    setSchedule(newSchedule);
  };

  const handleTimeChange = (dayIndex, shiftIndex, field, value) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].shifts[shiftIndex][field] = value;
    setSchedule(newSchedule);
  };

  const generateAvailabilityPayload = () => {
    return schedule.map(({ day, available, shifts }) => ({
      isAvailable: available,
      weekday: day.toUpperCase(),
      slotOneStart: available ? shifts[0].start || "" : "",
      slotOneEnd: available ? shifts[0].end || "" : "",
      slotTwoStart: available ? shifts[1].start || "" : "",
      slotTwoEnd: available ? shifts[1].end || "" : "",
      isRecurring: true,
      recurrenceRules: {},
    }));
  };

  const handleLog = () => {
    const availabilities = generateAvailabilityPayload();
    console.log({ availabilities });
  };

  return (


    <div>

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
  <div className="flex flex-col gap-6">
      <div className="flex gap-8 text-[16px] text-black font-light">
        {/* Days */}
        <div className="flex flex-col gap-[18px]">
          {schedule.map(({ day }) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        {/* Availability */}
        <div className="flex flex-col gap-[18px]">
          {schedule.map(({ available }, index) => (
            <span
              key={index}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggleAvailability(index)}
            >
              <img
                src={available ? "/available-btn.svg" : "/not-available-btn.svg"}
                alt="toggle"
                className="w-6 h-6"
              />
              <span className={available ? "text-[#09B438]" : "text-[#FE1940]"}>
                {available ? "Available" : "NA"}
              </span>
            </span>
          ))}
        </div>

        {/* Shift 1 - Start Time */}
        <div className="flex flex-col gap-[18px] ps-8">
          {schedule.map(({ available, shifts }, dayIdx) => (
            <span key={dayIdx} className="min-h-[22px]">
              {available && (
                <input
                  type="time"
                  value={shifts[0].start}
                  onChange={(e) =>
                    handleTimeChange(dayIdx, 0, "start", e.target.value)
                  }
                  className="border-b border-[#BBBBBB]"
                />
              )}
            </span>
          ))}
        </div>

        {/* Shift 1 - End Time */}
        <div className="flex flex-col gap-[18px] ps-8">
          {schedule.map(({ available, shifts }, dayIdx) => (
            <span key={dayIdx} className="min-h-[22px]">
              {available && (
                <input
                  type="time"
                  value={shifts[0].end}
                  onChange={(e) =>
                    handleTimeChange(dayIdx, 0, "end", e.target.value)
                  }
                  className="border-b border-[#BBBBBB]"
                />
              )}
            </span>
          ))}
        </div>

        {/* Shift 2 - Start Time */}
        <div className="flex flex-col gap-[18px] ps-8">
          {schedule.map(({ available, shifts }, dayIdx) => (
            <span key={dayIdx} className="min-h-[22px]">
              {available && (
                <input
                  type="time"
                  value={shifts[1].start}
                  onChange={(e) =>
                    handleTimeChange(dayIdx, 1, "start", e.target.value)
                  }
                  className="border-b border-[#BBBBBB]"
                />
              )}
            </span>
          ))}
        </div>

        {/* Shift 2 - End Time */}
        <div className="flex flex-col gap-[18px] ps-8">
          {schedule.map(({ available, shifts }, dayIdx) => (
            <span key={dayIdx} className="min-h-[22px]">
              {available && (
                <input
                  type="time"
                  value={shifts[1].end}
                  onChange={(e) =>
                    handleTimeChange(dayIdx, 1, "end", e.target.value)
                  }
                  className="border-b border-[#BBBBBB]"
                />
              )}
            </span>
          ))}
        </div>
      </div>

    <button className="w-[328px] h-[40px] bg-[#3674B5] text-white rounded-[15px] flex justify-center items-center my-6">
            Next
          </button>
    </div>
    </div>
  
  );
}
