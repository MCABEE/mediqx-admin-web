// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import useAgentStore from "@/app/lib/store/agentManagementStore";

// function ManagePatientReferralPopup({ referral, onClose, agentId, onSubmitSuccess }) {
//   const { updateAgentPatientReferralStatus, fetchStaffReferrals, staffReferralList, staffReferralLoading } =
//     useAgentStore();

//   const [referralStatus, setReferralStatus] = useState(referral?.referralStatus || "");
//   const [assignedPersonName, setAssignedPersonName] = useState("");
//   const [referralSignupStaffId, setReferralSignupStaffId] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [submitLoading, setSubmitLoading] = useState(false);

//   const containerRef = useRef(null);
//   const inputRef = useRef(null);

//   // Reset fields on referral change
//   useEffect(() => {
//     if (referral) {
//       setReferralStatus(referral.referralStatus || "");
//       setAssignedPersonName("");
//       setReferralSignupStaffId(null);
//     }
//   }, [referral]);

//   // Fetch staff for assignment if needed
//   useEffect(() => {
//     if (agentId) fetchStaffReferrals(agentId, "", 1, 10);
//   }, [agentId, fetchStaffReferrals]);

//   // Close dropdown if click outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (containerRef.current && !containerRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const onInputChange = (e) => {
//     const val = e.target.value;
//     setAssignedPersonName(val);
//     if (agentId) {
//       fetchStaffReferrals(agentId, val, 1, 10);
//       setShowDropdown(true);
//     }
//   };

//   const onInputFocus = () => {
//     if (!assignedPersonName && agentId) fetchStaffReferrals(agentId, "", 1, 10);
//     setShowDropdown(true);
//   };

//   const onSelectPerson = (person) => {
//     setAssignedPersonName(person.fullName || person.name);
//     setReferralSignupStaffId(person.id || person.userId);
//     setShowDropdown(false);
//     console.log("Selected ID:", person.id || person.userId);
//   };

//   const isSubmitDisabled = referralStatus === "PENDING" || (referralStatus === "CONFIRMED" && !assignedPersonName) || submitLoading;

//   const handleSubmit = async () => {
//     if (isSubmitDisabled) return;
//     setSubmitLoading(true);
//     try {
//       await updateAgentPatientReferralStatus(referral.id, referralStatus, referralSignupStaffId);
//       if (onSubmitSuccess)
//         onSubmitSuccess({ ...referral, referralStatus, referralSignupStaffId });
//       onClose();
//     } catch {
//       alert("Update failed");
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 w-screen h-screen flex justify-center items-center bg-[#1a1a1a50] backdrop-blur-xs">
//       <div ref={containerRef} className="w-[640px] bg-white rounded-[15px] py-10 relative">
//         <div
//           className="bg-black text-white size-6 flex justify-center items-center rounded absolute right-4 top-4 cursor-pointer"
//           onClick={onClose}
//         >
//           x
//         </div>

//         <div className="px-[155px] flex flex-col gap-4">
//           <h1 className="text-black font-semibold">Manage Referral Information</h1>

//           {/* Readonly info */}
//           <input type="text" disabled value={referral?.patientName || ""} placeholder="Patient Name" className="w-full h-[40px] border rounded px-4 bg-gray-100 cursor-not-allowed" />
//           <input type="text" disabled value={referral?.mobileNumber || ""} placeholder="Contact Number" className="w-full h-[40px] border rounded px-4 bg-gray-100 cursor-not-allowed" />
//           <input type="text" disabled value={referral?.serviceType || ""} placeholder="Service Type" className="w-full h-[40px] border rounded px-4 bg-gray-100 cursor-not-allowed" />

//           {/* Status selector */}
//           <select
//             value={referralStatus}
//             onChange={(e) => setReferralStatus(e.target.value)}
//             className="w-full h-[40px] border rounded px-4 outline-none"
//           >
//             <option value="">Select Status</option>
//             <option value="PENDING">Pending</option>
//             <option value="CONFIRMED">Confirmed</option>
//             <option value="CANCELLED">Rejected</option>
//           </select>

//           {/* Assign person if confirmed */}
//           {referralStatus === "CONFIRMED" && (
//             <div className="relative w-full">
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={assignedPersonName}
//                 onChange={onInputChange}
//                 onFocus={onInputFocus}
//                 placeholder="Assign Staff / Person"
//                 className="w-full h-[40px] border rounded px-4 outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               {showDropdown && (
//                 <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg rounded-md mt-1 z-50 h-24 overflow-y-auto">
//                   {staffReferralLoading && <p className="p-2 text-gray-500 text-sm">Loading...</p>}
//                   {!staffReferralLoading && staffReferralList?.length === 0 && <p className="p-2 text-gray-500 text-sm">No staff found.</p>}
//                   {!staffReferralLoading &&
//                     staffReferralList?.map((person) => (
//                       <div
//                         key={person.id || person.userId}
//                         className={`px-4 py-2 text-[12px] cursor-pointer hover:bg-blue-100 ${
//                           assignedPersonName === (person.fullName || person.name) ? "bg-blue-50 font-medium" : ""
//                         }`}
//                         onMouseDown={() => onSelectPerson(person)}
//                       >
//                         {person.fullName || person.name}
//                       </div>
//                     ))}
//                 </div>
//               )}
//             </div>
//           )}

//           <button
//             onClick={handleSubmit}
//             disabled={isSubmitDisabled}
//             className={`bg-[#3674B5] w-full h-[40px] rounded-[15px] text-white mt-4 ${isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
//           >
//             {submitLoading ? "Submitting..." : "Submit"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ManagePatientReferralPopup;



"use client";
import React, { useState, useEffect, useRef } from "react";
import useAgentStore from "@/app/lib/store/agentManagementStore";

function ManagePatientReferralPopup({ referral, onClose, agentId, onSubmitSuccess }) {
  const { updateAgentPatientReferralStatus, fetchStaffReferrals, staffReferralList, staffReferralLoading } =
    useAgentStore();

  const [referralStatus, setReferralStatus] = useState(referral?.referralStatus || "");
  const [assignedPersonName, setAssignedPersonName] = useState("");
  const [referralSignupStaffId, setReferralSignupStaffId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (referral) {
      setReferralStatus(referral.referralStatus || "");
      setAssignedPersonName("");
      setReferralSignupStaffId(null);
    }
  }, [referral]);

  useEffect(() => {
    if (agentId) fetchStaffReferrals(agentId, "", 1, 10);
  }, [agentId, fetchStaffReferrals]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onInputChange = (e) => {
    const val = e.target.value;
    setAssignedPersonName(val);
    if (agentId) {
      fetchStaffReferrals(agentId, val, 1, 10);
      setShowDropdown(true);
    }
  };

  const onInputFocus = () => {
    if (!assignedPersonName && agentId) fetchStaffReferrals(agentId, "", 1, 10);
    setShowDropdown(true);
  };

  const onSelectPerson = (person) => {
    setAssignedPersonName(person.fullName || person.name);
    setReferralSignupStaffId(person.id || person.userId);
    setShowDropdown(false);
  };

  const isSubmitDisabled =
    referralStatus === "PENDING" ||
    (referralStatus === "CONFIRMED" && !assignedPersonName) ||
    submitLoading;

  const handleSubmit = async () => {
    if (isSubmitDisabled) return;
    setSubmitLoading(true);
    try {
      await updateAgentPatientReferralStatus(referral.id, referralStatus, referralSignupStaffId);
      if (onSubmitSuccess)
        onSubmitSuccess({ ...referral, referralStatus, referralSignupStaffId });
      onClose();
    } catch {
      alert("Update failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen flex justify-center items-center bg-[#1a1a1a50] backdrop-blur-xs">
      <div
        ref={containerRef}
        className="w-[440px] max-w-full bg-white rounded-[15px] py-10 px-20 sm:px-10 relative"
      >
        {/* Close Button */}
        <div
          className="absolute top-4 right-4 w-6 h-6 flex justify-center items-center rounded bg-black text-white cursor-pointer"
          onClick={onClose}
        >
          x
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-black font-semibold text-lg">Manage Referral Information</h1>

          {/* Readonly info */}
          <input
            type="text"
            disabled
            value={referral?.patientName || ""}
            placeholder="Patient Name"
            className="w-full h-[40px] border border-[#BBBBBB] rounded-[15px] px-4 bg-gray-100 cursor-not-allowed"
          />
          <input
            type="text"
            disabled
            value={referral?.mobileNumber || ""}
            placeholder="Contact Number"
            className="w-full h-[40px] border border-[#BBBBBB] rounded-[15px] px-4 bg-gray-100 cursor-not-allowed"
          />
          <input
            type="text"
            disabled
            value={referral?.serviceType || ""}
            placeholder="Service Type"
            className="w-full h-[40px] border border-[#BBBBBB] rounded-[15px] px-4 bg-gray-100 cursor-not-allowed"
          />

          {/* Status selector */}
          <h1 className="text-black font-semibold text-lg">Referral Status</h1>

          <select
            value={referralStatus}
            onChange={(e) => setReferralStatus(e.target.value)}
            className="w-full h-[40px] border border-[#BBBBBB] rounded-[15px] px-4 outline-none"
          >
            <option value="">Select Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Rejected</option>
          </select>

          {/* Assign person if confirmed */}
          {referralStatus === "CONFIRMED" && (
            <div className="relative w-full">
              <input
                ref={inputRef}
                type="text"
                value={assignedPersonName}
                onChange={onInputChange}
                onFocus={onInputFocus}
                placeholder="Assign Staff / Person"
                className="w-full h-[40px] border border-[#BBBBBB] rounded-[15px] px-4 outline-none focus:ring-2 focus:ring-blue-400"
              />
              {showDropdown && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg rounded-[15px] mt-1 z-50 h-28 overflow-y-auto">
                  {staffReferralLoading && (
                    <p className="p-2 text-gray-500 text-sm">Loading...</p>
                  )}
                  {!staffReferralLoading && staffReferralList?.length === 0 && (
                    <p className="p-2 text-gray-500 text-sm">No staff found.</p>
                  )}
                  {!staffReferralLoading &&
                    staffReferralList?.map((person) => (
                      <div
                        key={person.id || person.userId}
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-100 ${
                          assignedPersonName === (person.fullName || person.name)
                            ? "bg-blue-50 font-medium"
                            : ""
                        }`}
                        onMouseDown={() => onSelectPerson(person)}
                      >
                        {person.fullName || person.name}
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={`w-full h-[40px] rounded-[15px] text-white mt-4 bg-[#3674B5] ${
              isSubmitDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#19588f]"
            }`}
          >
            {submitLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManagePatientReferralPopup;
