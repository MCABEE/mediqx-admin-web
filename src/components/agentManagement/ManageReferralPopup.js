// "use client"
// import React, { useState, useEffect, useRef } from "react";
// import useAgentStore from "@/app/lib/store/agentManagementStore";

// function ManageReferralPopup({ referral, onClose, agentId, onSubmitSuccess }) {
//   const {
//     fetchStaffReferrals,
//     staffReferralList,
//     staffReferralLoading,
//     updateAgentReferralStatus,
//   } = useAgentStore();

//   const [referralStatus, setReferralStatus] = useState("");
//   const [staffName, setStaffName] = useState("");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [submitLoading, setSubmitLoading] = useState(false);

//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (referral) {
//       setReferralStatus(referral.referralStatus || "");
//       setStaffName("");
//     }
//   }, [referral]);

//   // Fetch initial staff list when popup opens or referral changes
//   useEffect(() => {
//     if (agentId) {
//       fetchStaffReferrals(agentId, "", 1, 10);
//     }
//   }, [agentId, fetchStaffReferrals]);

//   const onStaffInputChange = (e) => {
//     const val = e.target.value;
//     setStaffName(val);
//     if (agentId) {
//       fetchStaffReferrals(agentId, val, 1, 10);
//       setShowDropdown(true);
//     }
//   };

//   const onStaffInputFocus = () => {
//     if (!staffName && agentId) {
//       fetchStaffReferrals(agentId, "", 1, 10);
//     }
//     setShowDropdown(true);
//   };

//   const onStaffSelect = (name) => {
//     setStaffName(name);
//     setShowDropdown(false);
//   };

//   const isSubmitDisabled =
//     referralStatus === "PENDING" || (referralStatus === "CONFIRMED" && !staffName) || submitLoading;

//   const handleSubmit = async () => {
//     if (isSubmitDisabled) return;
//     setSubmitLoading(true);
//     try {
//       await updateAgentReferralStatus(referral.id, referralStatus);
//       if (onSubmitSuccess) onSubmitSuccess({
//   ...referral,
//   referralStatus: "CONFIRMED"
// });
//       onClose();
//     } catch {
//       alert("Update failed");
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 w-screen h-screen flex justify-center items-center bg-[#1a1a1a50] backdrop-blur-xs">
//       <div className="w-[640px] bg-white rounded-[15px] py-10 relative">
//         <div
//           className="bg-black text-white size-6 flex justify-center items-center rounded absolute right-4 top-4 cursor-pointer"
//           onClick={onClose}
//         >
//           x
//         </div>

//         <div className="px-[155px] flex flex-col gap-4">
//           <h1 className="text-black font-semibold">Manage Referral Information</h1>

//           {/* Readonly fields */}
//           <select
//             disabled
//             className="w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4 bg-gray-100 cursor-not-allowed"
//             value={referral?.referralType || ""}
//           >
//             <option>{referral?.referralType || "Type of Referral"}</option>
//           </select>

//           <input
//             type="text"
//             disabled
//             className="w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4 bg-gray-100 cursor-not-allowed"
//             placeholder="Full Name"
//             value={referral?.fullName || ""}
//           />

//           <select
//             disabled
//             className="w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4 bg-gray-100 cursor-not-allowed"
//             value={referral?.qualificationOrService || ""}
//           >
//             <option>{referral?.qualificationOrService || "Qualification"}</option>
//           </select>

//           <input
//             type="tel"
//             disabled
//             className="w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4 bg-gray-100 cursor-not-allowed"
//             placeholder="Phone Number"
//             value={referral?.contactNumber || ""}
//           />
//         </div>

//         <div className="px-[155px] flex flex-col gap-4 mt-4 relative">
//           <h1 className="text-black font-semibold">Referral Status</h1>

//           <select
//             name="referralStatus"
//             className="w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4 outline-none"
//             value={referralStatus}
//             onChange={(e) => setReferralStatus(e.target.value)}
//           >
//             <option value="">Select Status</option>
//             <option value="PENDING">Pending</option>
//             <option value="CONFIRMED">Confirmed</option>
//             <option value="CANCELLED">Rejected</option>
//           </select>

//           <h1 className="text-black font-semibold mt-4">Choose Staff Name (Confirmed)</h1>

         
//           <div className="relative w-full">
//   <input
//     ref={inputRef}
//     type="text"
//     className="w-full h-[40px] border border-[#BBBBBB] rounded-[8px] px-4 outline-none focus:ring-2 focus:ring-blue-400"
//     placeholder="Type to search staff..."
//     value={staffName}
//     onChange={onStaffInputChange}
//     onFocus={onStaffInputFocus}
//     disabled={referralStatus !== "CONFIRMED"}
//     autoComplete="off"
//   />

//   {showDropdown && referralStatus === "CONFIRMED" && (
//     <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg rounded-md mt-1 z-50 h-24 overflow-y-auto">
//       {staffReferralLoading && (
//         <p className="p-2 text-gray-500 text-sm">Loading...</p>
//       )}

//       {!staffReferralLoading &&
//         Array.isArray(staffReferralList) &&
//         staffReferralList.length === 0 && (
//           <p className="p-2 text-gray-500 text-sm">No staff found.</p>
//         )}

//       {!staffReferralLoading &&
//         staffReferralList.map((staff) => (
//           <div
//             key={staff.id || staff.userId}
//             className={`px-4 py-2 text-[12px] cursor-pointer hover:bg-blue-100 ${
//               staffName === (staff.fullName || staff.name)
//                 ? "bg-blue-50 font-medium"
//                 : ""
//             }`}
//             onMouseDown={() => onStaffSelect(staff.fullName || staff.name)}
//           >
//             {staff.fullName || staff.name}
//           </div>
//         ))}
//     </div>
//   )}
// </div>


//           <button
//             className={`bg-[#3674B5] w-full h-[40px] rounded-[15px] text-white cursor-pointer mt-4 ${
//               isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={isSubmitDisabled}
//             onClick={handleSubmit}
//           >
//             {submitLoading ? "Submitting..." : "Submit"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ManageReferralPopup;




"use client";
import React, { useState, useEffect, useRef } from "react";
import useAgentStore from "@/app/lib/store/agentManagementStore";

function ManageReferralPopup({ referral, onClose, agentId, onSubmitSuccess }) {
  const {
    fetchStaffReferrals,
    staffReferralList,
    staffReferralLoading,
    updateAgentReferralStatus,
  } = useAgentStore();

  const [referralStatus, setReferralStatus] = useState("");
  const [staffName, setStaffName] = useState("");
  const [referralSignupStaffId, setReferralSignupStaffId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (referral) {
      setReferralStatus(referral.referralStatus || "");
      setStaffName("");
      setReferralSignupStaffId(null);
    }
  }, [referral]);

  // Fetch initial staff list when popup opens or referral changes
  useEffect(() => {
    if (agentId) {
      fetchStaffReferrals(agentId, "", 1, 10);
    }
  }, [agentId, fetchStaffReferrals]);

  // Close dropdown if click outside input or dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onStaffInputChange = (e) => {
    const val = e.target.value;
    setStaffName(val);
    if (agentId) {
      fetchStaffReferrals(agentId, val, 1, 10);
      setShowDropdown(true);
    }
  };

  const onStaffInputFocus = () => {
    if (!staffName && agentId) {
      fetchStaffReferrals(agentId, "", 1, 10);
    }
    setShowDropdown(true);
  };

  // Select staff and store selected ID
  const onStaffSelect = (staff) => {
    setStaffName(staff.fullName || staff.name);
    setReferralSignupStaffId(staff.id || staff.userId);
    setShowDropdown(false);
    console.log("Selected staff ID:", staff.id || staff.userId);
  };

  const isSubmitDisabled =
    referralStatus === "PENDING" ||
    (referralStatus === "CONFIRMED" && !staffName) ||
    submitLoading;

  const handleSubmit = async () => {
    if (isSubmitDisabled) return;
    setSubmitLoading(true);
    try {
      await updateAgentReferralStatus(referral.id, referralStatus, referralSignupStaffId);
      if (onSubmitSuccess)
        onSubmitSuccess({
          ...referral,
          referralStatus: "CONFIRMED",
          referralSignupStaffId,
        });
      onClose();
    } catch {
      alert("Update failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen flex justify-center items-center bg-[#1a1a1a50] backdrop-blur-xs">
      <div ref={containerRef} className="w-[640px] bg-white rounded-[15px] py-10 relative">
        <div
          className="bg-black text-white size-6 flex justify-center items-center rounded absolute right-4 top-4 cursor-pointer"
          onClick={onClose}
        >
          x
        </div>

        <div className="px-[155px] flex flex-col gap-4">
          <h1 className="text-black font-semibold">Manage Referral Information</h1>

          {/* Readonly fields */}
          <select
            disabled
            className="w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4 bg-gray-100 cursor-not-allowed"
            value={referral?.referralType || ""}
          >
            <option>{referral?.referralType || "Type of Referral"}</option>
          </select>

          <input
            type="text"
            disabled
            className="w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4 bg-gray-100 cursor-not-allowed"
            placeholder="Full Name"
            value={referral?.fullName || ""}
          />

          <select
            disabled
            className="w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4 bg-gray-100 cursor-not-allowed"
            value={referral?.qualificationOrService || ""}
          >
            <option>{referral?.qualificationOrService || "Qualification"}</option>
          </select>

          <input
            type="tel"
            disabled
            className="w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4 bg-gray-100 cursor-not-allowed"
            placeholder="Phone Number"
            value={referral?.contactNumber || ""}
          />
        </div>

        <div className="px-[155px] flex flex-col gap-4 mt-4 relative">
          <h1 className="text-black font-semibold">Referral Status</h1>

          <select
            name="referralStatus"
            className="w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4 outline-none"
            value={referralStatus}
            onChange={(e) => setReferralStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Rejected</option>
          </select>

          <h1 className="text-black font-semibold mt-4">Choose Staff Name (Confirmed)</h1>

          <div className="relative w-full">
            <input
              ref={inputRef}
              type="text"
              className="w-full h-[40px] border border-[#BBBBBB] rounded-[8px] px-4 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type to search staff..."
              value={staffName}
              onChange={onStaffInputChange}
              onFocus={onStaffInputFocus}
              disabled={referralStatus !== "CONFIRMED"}
              autoComplete="off"
            />

            {showDropdown && referralStatus === "CONFIRMED" && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg rounded-md mt-1 z-50 h-24 overflow-y-auto">
                {staffReferralLoading && (
                  <p className="p-2 text-gray-500 text-sm">Loading...</p>
                )}

                {!staffReferralLoading &&
                  Array.isArray(staffReferralList) &&
                  staffReferralList.length === 0 && (
                    <p className="p-2 text-gray-500 text-sm">No staff found.</p>
                  )}

                {!staffReferralLoading &&
                  staffReferralList.map((staff) => (
                    <div
                      key={staff.id || staff.userId}
                      className={`px-4 py-2 text-[12px] cursor-pointer hover:bg-blue-100 ${
                        staffName === (staff.fullName || staff.name)
                          ? "bg-blue-50 font-medium"
                          : ""
                      }`}
                      onMouseDown={() => onStaffSelect(staff)}
                    >
                      {staff.fullName || staff.name}
                    </div>
                  ))}
              </div>
            )}
          </div>

          <button
            className={`bg-[#3674B5] w-full h-[40px] rounded-[15px] text-white cursor-pointer mt-4 ${
              isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
          >
            {submitLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageReferralPopup;
