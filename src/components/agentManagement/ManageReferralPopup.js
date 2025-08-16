// import React from 'react'

// function ManageReferralPopup({onClose}) {
//   return (
//     <div className='fixed inset-0 w-screen h-screen flex justify-center items-center bg-[#1a1a1a50] backdrop-blur-xs'>
//         <div className='w-[640px] bg-white rounded-[15px] py-10 relative'>
//             <div className='bg-black text-white size-6 flex justify-center items-center rounded absolute right-4 top-4 cursor-pointer'
//             onClick={onClose}
//             >
//                 x
//             </div>
//             <div className='px-[155px] flex flex-col gap-4'>
// <h1 className='text-black font-semibold'>Manage Referral Information</h1>
// <h1 className='text-black font-semibold'> Referral Info</h1>

// <select name="" id="" className='w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4'>

//     <option value="">Type of Referral</option>
// </select>
// <input type="text" className='w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4'placeholder='Full Name' />
// <select name="" id="" className='w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4'>

//     <option value="">Qualification</option>
// </select>
// <input type="number" className='w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4'placeholder='Phone Number' />

//             </div>
//              <div className='px-[155px] flex flex-col gap-4 mt-4'>
// <h1 className='text-black font-semibold'> Referral Status</h1>

// <select name="" id="" className='w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4'>

//     <option value="">Confirmed</option>
// </select>
// <select name="" id="" className='w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4'>

//     <option value="">Choose Staff Name (Confirmed)</option>
// </select>

//         <button className="bg-[#3674B5] w-full h-[40px] rounded-[15px] text-white">Submit</button>

//             </div>
//         </div>
//     </div>
//   )
// }

// export default ManageReferralPopup




// import React, { useState, useEffect } from "react";

// function ManageReferralPopup({ referral, onClose,id }) {
//   // Form state initialized from referral prop
//   const [typeOfReferral, setTypeOfReferral] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [qualification, setQualification] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [referralStatus, setReferralStatus] = useState("");
//   const [staffName, setStaffName] = useState("");

//   // Prefill on mount or when referral changes
//   useEffect(() => {
//     if (referral) {
//       setTypeOfReferral(referral.referralType || "");
//       setFullName(referral.fullName || "");
//       setQualification(referral.qualificationOrService || "");
//       setPhoneNumber(referral.contactNumber || "");
//       setReferralStatus(referral.referralStatus || "");
//       // For staffName you might want to map from referral.actionTakenById or similar if available
//       setStaffName(""); // Initialize empty or as needed
//     }
//   }, [referral]);

//   const handleSubmit = () => {
//     // Here you can send updated data to your API
//     // Example:
//     // updateReferral(referral.id, { typeOfReferral, fullName, ... })
//     // close modal after success
//     onClose();
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
//           <h1 className="text-black font-semibold">Referral Info</h1>

//           <select
//             name="typeOfReferral"
//             className="w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4"
//             value={typeOfReferral}
//             onChange={(e) => setTypeOfReferral(e.target.value)}
//           >
//             <option value="">Type of Referral</option>
//             {/* Add actual options here as needed */}
//             <option value="PATIENT">Patient</option>
//             <option value="DOCTOR">Doctor</option>
//             <option value="HOSPITAL">Hospital</option>
//           </select>

//           <input
//             type="text"
//             className="w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4"
//             placeholder="Full Name"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//           />

//           <select
//             name="qualification"
//             className="w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4"
//             value={qualification}
//             onChange={(e) => setQualification(e.target.value)}
//           >
//             <option value="">Qualification</option>
//             {/* Add real qualification options here */}
//             <option value="Service">Service</option>
//             <option value="Other">Other</option>
//           </select>

//           <input
//   type="tel"  // <-- changed from number to tel
//   className="w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4"
//   placeholder="Phone Number"
//   value={phoneNumber}
//   onChange={(e) => setPhoneNumber(e.target.value)}
// />

//         </div>

//         <div className="px-[155px] flex flex-col gap-4 mt-4">
//           <h1 className="text-black font-semibold">Referral Status</h1>

//           <select
//             name="referralStatus"
//             className="w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4"
//             value={referralStatus}
//             onChange={(e) => setReferralStatus(e.target.value)}
//           >
//             <option value="">Select Status</option>
//             <option value="PENDING">Pending</option>
//             <option value="CONFIRMED">Confirmed</option>
//             <option value="REJECTED">Rejected</option>
//           </select>

//           <select
//             name="staffName"
//             className="w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4"
//             value={staffName}
//             onChange={(e) => setStaffName(e.target.value)}
//           >
//             <option value="">Choose Staff Name (Confirmed)</option>
//             {/* Provide staff options dynamically if available */}
//           </select>

//           <button
//             className="bg-[#3674B5] w-full h-[40px] rounded-[15px] text-white"
//             onClick={handleSubmit}
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ManageReferralPopup;









// import React, { useState, useEffect } from "react";
// import useAgentStore from "@/app/lib/store/agentManagementStore";

// function ManageReferralPopup({ referral, agentId, onClose, onSubmitSuccess }) {
//   const {
//     fetchStaffReferrals,
//     staffReferralList,
//     staffReferralLoading,
//     staffReferralError,
//   } = useAgentStore();
//   console.log(agentId,referral.id);
  

//   const [referralStatus, setReferralStatus] = useState("");
//   const [staffName, setStaffName] = useState("");
//   const [submitLoading, setSubmitLoading] = useState(false);

//   useEffect(() => {
//     if (referral) {
//       setReferralStatus(referral.referralStatus || "");
//       setStaffName("");
//     }
//   }, [referral]);

//   useEffect(() => {
//     if (agentId) {
//       fetchStaffReferrals(agentId, "", 1, 10);
//     }
//   }, [agentId, fetchStaffReferrals]);

//   const isSubmitDisabled =
//     referralStatus === "PENDING" ||
//     (referralStatus === "CONFIRMED" && !staffName) ||
//     submitLoading;

//   const handleSubmit = async () => {
//     if (isSubmitDisabled) return;
//     setSubmitLoading(true);
//     try {
//       // Call your store or API update function here
//       if (onSubmitSuccess) onSubmitSuccess();
//       onClose();
//     } catch (error) {
//       alert("Failed to update referral status");
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

//           {/* Readonly Fields */}
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

//         <div className="px-[155px] flex flex-col gap-4 mt-4">
//           <h1 className="text-black font-semibold">Referral Status</h1>

//           <select
//             name="referralStatus"
//             className="w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4"
//             value={referralStatus}
//             onChange={(e) => setReferralStatus(e.target.value)}
//           >
//             <option value="">Select Status</option>
//             <option value="PENDING">Pending</option>
//             <option value="CONFIRMED">Confirmed</option>
//             <option value="REJECTED">Rejected</option>
//           </select>

//           <h1 className="text-black font-semibold">Choose Staff Name (Confirmed)</h1>

//           <input
//             list="staff-list"
//             className="w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4"
//             value={staffName}
//             onChange={(e) => setStaffName(e.target.value)}
//             placeholder="Type to search staff..."
//             disabled={referralStatus !== "CONFIRMED"}
//           />

//           <datalist id="staff-list">
//             {staffReferralLoading && <option>Loading...</option>}
//             {!staffReferralLoading &&
//               Array.isArray(staffReferralList) &&
//               staffReferralList.map((staff) => (
//                 <option
//                   key={staff.id || staff.userId}
//                   value={staff.fullName || staff.name || ""}
//                 />
//               ))}
//           </datalist>

//           <button
//             className={`bg-[#3674B5] w-full h-[40px] rounded-[15px] text-white ${
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










import React, { useState, useEffect, useRef } from "react";
import useAgentStore from "@/app/lib/store/agentManagementStore";

function ManageReferralPopup({ referral, onClose, agentId }) {
  const {
    fetchStaffReferrals,
    staffReferralList,
    staffReferralLoading,
    updateAgentApprovalStatus,
  } = useAgentStore();

  const [referralStatus, setReferralStatus] = useState("");
  const [staffName, setStaffName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (referral) {
      setReferralStatus(referral.referralStatus || "");
      setStaffName("");
    }
  }, [referral]);

  useEffect(() => {
    // Load initial staff list for recommendations (no search)
    if (referral?.id) {
      fetchStaffReferrals(referral.id, "", 1, 10);
    }
  }, [referral, fetchStaffReferrals]);

  const onStaffInputChange = (e) => {
    const val = e.target.value;
    setStaffName(val);
    // Fetch filtered staff based on search value
    if(referral?.id){
      fetchStaffReferrals(referral.id, val, 1, 10);
      setShowDropdown(true);
    }
  };

  const onStaffInputFocus = () => {
    if (!staffName && referral?.id) {
      fetchStaffReferrals(agentId, "", 1, 10);
    }
    setShowDropdown(true);
  };

  const onStaffSelect = (name) => {
    setStaffName(name);
    setShowDropdown(false);
  };

  const isSubmitDisabled =
    referralStatus === "PENDING" || (referralStatus === "CONFIRMED" && !staffName) || submitLoading;

  const handleSubmit = async () => {
    if (isSubmitDisabled) return;

    setSubmitLoading(true);
    try {
      await updateAgentApprovalStatus(referral.id, referralStatus);
      onClose();
    } catch {
      alert("Update failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen flex justify-center items-center bg-[#1a1a1a50] backdrop-blur-xs">
      <div className="w-[640px] bg-white rounded-[15px] py-10 relative">
        <div
          className="bg-black text-white size-6 flex justify-center items-center rounded absolute right-4 top-4 cursor-pointer"
          onClick={onClose}
        >
          x
        </div>

        <div className="px-[155px] flex flex-col gap-4">
          <h1 className="text-black font-semibold">Manage Referral Information</h1>

          {/* Readonly fields showing referral data */}
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
            className="w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4"
            value={referralStatus}
            onChange={(e) => setReferralStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <h1 className="text-black font-semibold mt-4">Choose Staff Name (Confirmed)</h1>

          <input
            ref={inputRef}
            type="text"
            className="w-full h-[40px] border-1 border-[#BBBBBB] rounded-[15px] px-4"
            placeholder="Type to search staff..."
            value={staffName}
            onChange={onStaffInputChange}
            onFocus={onStaffInputFocus}
            disabled={referralStatus !== "CONFIRMED"}
            autoComplete="off"
          />

          {/* Dropdown for staff search results */}
          {showDropdown && referralStatus === "CONFIRMED" && (
            <div className="border border-gray-300 max-h-48 overflow-y-auto rounded shadow absolute z-50 bg-white w-full mt-1 px-2">
              {staffReferralLoading && <p className="p-2 text-gray-500">Loading...</p>}

              {!staffReferralLoading && Array.isArray(staffReferralList) && staffReferralList.length === 0 && (
                <p className="p-2 text-gray-500">No staff found.</p>
              )}

              {!staffReferralLoading && staffReferralList.map((staff) => (
                <div
                  key={staff.id || staff.userId}
                  className={`p-2 cursor-pointer ${staffName === (staff.fullName || staff.name) ? "bg-blue-100" : ""}`}
                  onMouseDown={() => onStaffSelect(staff.fullName || staff.name || "")}
                >
                  {staff.fullName || staff.name || ""}
                </div>
              ))}
            </div>
          )}

          <button
            className={`bg-[#3674B5] w-full h-[40px] rounded-[15px] text-white mt-4 ${
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
