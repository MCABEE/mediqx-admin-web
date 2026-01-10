// "use client";
// import React, { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Navlink from "@/components/caseBooking/NavLink";
// import useBookingStore from "@/app/lib/store/bookingStore";
// import Link from "next/link";
// import EditBookingPopup from "@/components/caseBooking/EditBookingPopup";
// import CancelPopup from "@/components/caseBooking/CancelPopup";
// import UpdateLocationPopup from "@/components/caseBooking/UpdateLocationPopup";

// const formatDate = (isoString) => {
//   if (!isoString) return "-";
//   const date = new Date(isoString);
//   return date.toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// const formatTime = (isoString) => {
//   if (!isoString) return "-";

//   const date = new Date(isoString);

//   const hours = date.getUTCHours(); // Use UTC hours
//   const minutes = date.getUTCMinutes(); // Use UTC minutes

//   const hours12 = hours % 12 || 12; // Convert 0 to 12
//   const ampm = hours >= 12 ? "PM" : "AM";
//   const paddedMinutes = minutes.toString().padStart(2, "0");

//   return `${hours12}:${paddedMinutes} ${ampm}`;
// };

// const BookingDetailsPage = () => {
//   const { id } = useParams();
//   const { fetchBookingById, selectedBooking, isLoading, error } =
//     useBookingStore();

//   const [showPopup, setShowPopup] = useState(false);
//   const [showCancelPopup, setShowCancelPopup] = useState(false);
//   const [showLocationPopup, setShowLocationPopup] = useState(false);
//   const [selectedRole, setSelectedRole] = useState("");

//   const handleRoleChange = (e) => {
//     setSelectedRole(e.target.value);
//   };

//   useEffect(() => {
//     if (id) fetchBookingById(id);
//   }, [id]);
//   const router = useRouter();
//   const handleConfirmClick = () => setShowPopup(true);
//   const handlePopupClose = () => setShowPopup(false);
//   const handlePopupConfirm = (bookingId) => {
//     setShowPopup(false);
//     router.push("/controlpanel/caseBooking/newBooking");
//   };

//   const { cancelBooking } = useBookingStore(); // ✅ use the cancelBooking action

//   const handleCancelClick = () => {
//     setShowCancelPopup(true);
//   };

//   const handleCancelClose = () => {
//     setShowCancelPopup(false);
//   };

//   const handleCancelConfirm = async (bookingId) => {
//     try {
//       await cancelBooking(bookingId, { reason: "User cancelled from UI" }); // you can extend `payload` if needed
//       setShowCancelPopup(false);
//       router.push("/controlpanel/caseBooking/confirmedBooking");
//     } catch (err) {
//       console.error("Cancel failed:", err.message);
//       // Optionally show an error toast or UI feedback
//     }
//   };

//   const [showEditPopup, setShowEditPopup] = useState(false);

//   const handleEditClick = () => setShowEditPopup(true);
//   const handleEditClose = () => setShowEditPopup(false);

//   const handleEditSave = async (updatedData) => {
//     setShowEditPopup(false); // Close the popup
//     await fetchBookingById(id); // Re-fetch the booking to reflect updates
//   };
//   if (isLoading) return <p className="p-8">Loading...</p>;
//   if (error) return <p className="p-8 text-red-500">Error: {error}</p>;
//   if (!selectedBooking) return <p className="p-8">No booking found.</p>;

//   const booking = selectedBooking;
//   console.log(booking.preferredLanguages);

//   return (
//     <div>
//       <Navlink />
//       {/* HEADER */}
//       <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex ">
//         <div
//           onClick={() => router.back()}
//           className="text-[16px] text-black border-r-2 border-[#F0F4F9] flex justify-center items-center px-[38px] cursor-pointer"
//         >
//           Back
//         </div>
//         <div className="w-full flex text-[16px] text-black justify-between items-center ps-[19px] pe-[73px]">
//           <p className="font-semibold">{booking?.fullName || "Patient Name"}</p>
//           <div className="flex justify-center items-center gap-[92px]">
//             <p>{formatDate(booking?.requestedAt)}</p>
//             <p>Direct</p>
//           </div>
//         </div>
//       </div>

//       {/* PATIENT DETAILS */}
//       <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
//         <div className="w-full h-[72px] flex items-center bg-white px-8 rounded-t-[15px] border-b-2">
//           <h1 className="text-[16px] font-semibold text-black">
//             Patient Details
//           </h1>
//         </div>

//         <div className="flex flex-col gap-[10px] p-8 text-[16px] text-black">
//           <div className="flex">
//             <span className="w-[250px] font-medium">Patient Name</span>
//             <span>{booking.fullName}</span>
//           </div>
//           <div className="flex">
//             <span className="w-[250px] font-medium">Gender</span>
//             <span>{booking.gender}</span>
//           </div>
//           <div className="flex">
//             <span className="w-[250px] font-medium">Age</span>
//             <span>{booking.age}</span>
//           </div>
//           <div className="flex">
//             <span className="w-[250px] font-medium">Height, Weight</span>
//             <span>
//               {booking.height} cm, {booking.weight} kg
//             </span>
//           </div>

//           <div className="flex">
//             <span className="w-[250px] font-medium">
//               Current Health Status / Activity
//             </span>
//             <span>{booking.healthStatus}</span>
//           </div>
//           <div className="flex">
//             <span className="w-[250px] font-medium">Now Patient stayed at</span>
//             <span>{booking.stayAt}</span>
//           </div>
//           <div className="flex">
//             <span className="w-[250px] font-medium">
//               Residential Address
//               <br />
//               (Billing Address)
//             </span>
//             <span>{booking.fullAddress} </span>
//           </div>
//           <div className="flex">
//             <span className="w-[250px] font-medium">Contact person</span>
//             <span>{booking.contactPersonName}</span>
//           </div>
//           <div className="flex">
//             <span className="w-[250px] font-medium">
//               Relationship with patient
//             </span>
//             <span>{booking.contactPersonRelation}</span>
//           </div>
//           <div className="flex">
//             <span className="w-[250px] font-medium">Email ID</span>
//             <span>{booking.contactPersonEmail}</span>
//           </div>
//           <div className="flex">
//             <span className="w-[250px] font-medium">Mobile Number</span>
//             <span>{booking.contactPersonMobileNumber}</span>
//           </div>
//         </div>
//       </div>

//       {/* SERVICE DETAILS */}
//       <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
//         <div className="w-full h-[72px] flex items-center bg-white px-8 rounded-t-[15px] border-b-2">
//           <h1 className="text-[16px] font-semibold text-black">
//             Service Required
//           </h1>
//         </div>
//         <div className="flex flex-col gap-[10px] p-8 text-[16px] text-black">
//           <div className="flex">
//             <span className="w-[200px] font-medium">Diagnosis</span>
//             <span>{booking.diagnosis}</span>
//           </div>
//           <div className="flex">
//             <span className="w-[200px] font-medium">Service Period from</span>
//             <span>{formatDate(booking.startDate)}</span>
//           </div>
//           <div className="flex">
//             <span className="w-[200px] font-medium">Service Type</span>
//             <span>{booking.serviceType}</span>
//           </div>
//           <div className="flex">
//             <span className="w-[200px] font-medium">Schedule Type</span>
//             <span>{booking.scheduleType}</span>
//           </div>
//           <div className="flex">
//             <span className="w-[200px] font-medium">Duration</span>
//             <span>{booking.durationType}</span>
//           </div>

//           <div className="flex">
//             <span className="w-[200px] font-medium">Frequency</span>
//             <span>{booking.weekdays?.join(", ")}</span>
//           </div>
//           <div className="flex">
//             <span className="w-[200px] font-medium">Flexibility</span>
//             <span>{booking.flexibility}</span>
//           </div>
//           <div className="flex">
//             <span className="w-[200px] font-medium"> Time</span>
//             <span>{formatTime(booking.startTime)}</span> &nbsp; - &nbsp;{" "}
//             <span>{formatTime(booking.endTime)}</span>
//           </div>
//         </div>
//       </div>

//       {/* STAFF PREFERENCE */}
//       <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
//         <div className="w-full h-[72px] flex items-center bg-white px-8 rounded-t-[15px] border-b-2">
//           <h1 className="text-[16px] font-semibold text-black">
//             Staff Preference
//           </h1>
//         </div>
//         <div className="flex gap-10 p-8">
//           <div className="flex flex-col gap-[10px] text-[16px] text-black">
//             <span>Preferred Gender</span>
//             <span>Preferred Language</span>
//           </div>
//           <div className="flex flex-col gap-[10px] text-[16px] text-black">
//             <span>{booking.preferredGender || "-"}</span>
//             <span>
//               {booking.preferredLanguages?.length
//                 ? booking.preferredLanguages
//                     .map((lang) => lang.language)
//                     .join(", ")
//                 : "-"}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
//         <div className="w-full h-[72px] flex items-center justify-between bg-white px-8 rounded-t-[15px] border-b-2">
//           <h1 className="text-[16px] font-semibold text-black">Location</h1>
//           <button
//             onClick={() => setShowLocationPopup(true)}
//             className="bg-[#C0D8F6] text-black px-4 py-1 rounded-md mt-2 w-[150px] cursor-pointer"
//           >
//             Update Location
//           </button>
//         </div>
//         <div className="flex gap-12 p-8">
//           <div className="flex flex-col gap-[10px] text-[16px] text-black">
//             <span>Current Location</span>
//           </div>
//           <div className="flex flex-col gap-[10px] text-[16px] text-black">
//             {booking.currentServiceAddress ? (
//               <>
//                 <span>{booking.currentServiceAddress}</span>
//               </>
//             ) : (
//               <span>NA</span>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
//         <div className="w-full h-[72px] flex items-center bg-white px-8 rounded-t-[15px] border-b-2">
//           <h1 className="text-[16px] font-semibold text-black">
//             Preferred Staff Category
//           </h1>
//         </div>
//         <div className="flex gap-10 p-8">
//           <select
//             name="categoryByProfession"
//             required
//             value={selectedRole}
//             onChange={handleRoleChange}
//             className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none"
//           >
//             <option value="" disabled>
//               Category by profession
//             </option>
//             <option value="REGISTERED_NURSE">Registered Nurse</option>
//             <option value="NURSING_ASSISTANTS">Nursing Assistants</option>
//             <option value="TECHNICIANS">Technicians</option>
//             <option value="THERAPY">Therapy</option>
//             <option value="ANCILLARY_PERSONAL">Ancillary Personal</option>
//           </select>
//         </div>
//       </div>

//       {/* ACTION BUTTONS */}
//       <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB] mb-5">
//         <div className="w-full h-[72px] flex items-center bg-[#C0D8F6] px-8 rounded-t-[15px] border-b-2">
//           <h1 className="text-[16px] font-semibold text-black">Action</h1>
//         </div>
//         <div className="flex gap-8 px-[39px] py-[24px]">
//           <Link
//             href={{
//               pathname: "/controlpanel/caseBooking/assignStaff",
//               query: {
//                 bookingId: booking.id,
//                 fullName: booking.fullName,
//                 from: booking.startDate,
//                 to: booking.endDate,
//                 service: booking.serviceType,
//                 schedule: booking.durationType,
//                 gender: booking.preferredGender,

//                 location: booking.currentServiceAddress,
//                 latitude: booking.latitude,
//                 longitude: booking.longitude,
//                 preferredLanguages: JSON.stringify(
//                   booking.preferredLanguages?.map((l) => ({
//                     id: l.id,
//                     language: l.language,
//                   })) || []
//                 ),
//                 language: booking.preferredLanguages || [],
//                 durationValue: booking.durationValue,
//                 durationType: booking.durationType,
//                 frequency: booking.weekdays,
//                 scheduleType: booking.scheduleType,
//                 startTime: booking.startTime,
//                 endTime: booking.endTime,
//                 role: selectedRole,
//               },
//             }}
//           >
//             <button
//               disabled={!selectedRole}
//               className={`w-[192px] h-[40px] flex justify-center items-center rounded-[15px]
//     ${
//       selectedRole
//         ? "bg-[#3674B5] text-white cursor-pointer"
//         : "bg-gray-300 text-gray-600 cursor-not-allowed"
//     }`}
//             >
//               Assign Staff
//             </button>
//           </Link>
//           <button
//             onClick={handleCancelClick}
//             className="w-[192px] h-[40px] bg-[#FFD1D9] text-[#333333] flex justify-center items-center rounded-[15px] cursor-pointer"
//           >
//             Cancel Service
//           </button>
//           <button
//             onClick={handleEditClick}
//             className="w-[192px] h-[40px] bg-white text-[#333333] border flex justify-center items-center rounded-[15px] cursor-pointer"
//           >
//             Edit Service
//           </button>
//         </div>
//       </div>

//       {showCancelPopup && (
//         <CancelPopup
//           bookingId={id}
//           onClose={handleCancelClose}
//           onConfirm={handleCancelConfirm}
//         />
//       )}

//       {showEditPopup && (
//         <EditBookingPopup
//           initialData={booking}
//           onClose={handleEditClose}
//           onSave={handleEditSave}
//         />
//       )}
//       {showLocationPopup && (
//         <UpdateLocationPopup
//           bookingId={selectedBooking?.id}
//           currentLat={selectedBooking?.latitude}
//           currentLng={selectedBooking?.longitude}
//           onClose={() => setShowLocationPopup(false)}
//           onUpdated={() => fetchBookingById(selectedBooking.id)}
//         />
//       )}
//     </div>
//   );
// };

// export default BookingDetailsPage;




















"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navlink from "@/components/caseBooking/NavLink";
import useBookingStore from "@/app/lib/store/bookingStore";
import Link from "next/link";
import EditBookingPopup from "@/components/caseBooking/EditBookingPopup";
import CancelPopup from "@/components/caseBooking/CancelPopup";
import UpdateLocationPopup from "@/components/caseBooking/UpdateLocationPopup";

const formatDate = (isoString) => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (isoString) => {
  if (!isoString) return "-";

  const date = new Date(isoString);

  const hours = date.getUTCHours(); // Use UTC hours
  const minutes = date.getUTCMinutes(); // Use UTC minutes

  const hours12 = hours % 12 || 12; // Convert 0 to 12
  const ampm = hours >= 12 ? "PM" : "AM";
  const paddedMinutes = minutes.toString().padStart(2, "0");

  return `${hours12}:${paddedMinutes} ${ampm}`;
};

const BookingDetailsPage = () => {
  const { id } = useParams();
  const { fetchBookingById, selectedBooking, isLoading, error,fetchBillingByServiceId, billingDetails } =
    useBookingStore();

  // const [showPopup, setShowPopup] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
const [selectedRole, setSelectedRole] = useState("");
const [selectedGrade, setSelectedGrade] = useState("");

 const handleRoleChange = (e) => {
  setSelectedRole(e.target.value);
};

const handleGradeChange = (e) => {
  setSelectedGrade(e.target.value);
};

  useEffect(() => {
    if (id) fetchBookingById(id);
  }, [id]);


useEffect(() => {
  if (id) {
    fetchBillingByServiceId(id);
  }
}, [id]);



useEffect(() => {
  if (billingDetails) {
    if (billingDetails.staffCategory) {
      setSelectedRole(billingDetails.staffCategory);
    }

    if (billingDetails.staffGrading) {
      setSelectedGrade(billingDetails.staffGrading);
    }
  }
}, [billingDetails]);

  const router = useRouter();
  // const handleConfirmClick = () => setShowPopup(true);
  // const handlePopupClose = () => setShowPopup(false);
  // const handlePopupConfirm = (bookingId) => {
  //   setShowPopup(false);
  //   router.push("/controlpanel/caseBooking/newBooking");
  // };

  const { cancelBooking } = useBookingStore(); // ✅ use the cancelBooking action

  const handleCancelClick = () => {
    setShowCancelPopup(true);
  };

  const handleCancelClose = () => {
    setShowCancelPopup(false);
  };

  const handleCancelConfirm = async (bookingId) => {
    try {
      await cancelBooking(bookingId, { reason: "User cancelled from UI" }); // you can extend `payload` if needed
      setShowCancelPopup(false);
      router.push("/controlpanel/caseBooking/confirmedBooking");
    } catch (err) {
      console.error("Cancel failed:", err.message);
      // Optionally show an error toast or UI feedback
    }
  };

  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleEditClick = () => setShowEditPopup(true);
  const handleEditClose = () => setShowEditPopup(false);

  const handleEditSave = async (updatedData) => {
    setShowEditPopup(false); // Close the popup
    await fetchBookingById(id); // Re-fetch the booking to reflect updates
  };
  if (isLoading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-500">Error: {error}</p>;
  if (!selectedBooking) return <p className="p-8">No booking found.</p>;

  const booking = selectedBooking;
  console.log(booking.preferredLanguages);

  return (
    <div>
      <Navlink />
      {/* HEADER */}
      <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex ">
        <div
          onClick={() => router.back()}
          className="text-[16px] text-black border-r-2 border-[#F0F4F9] flex justify-center items-center px-[38px] cursor-pointer"
        >
          Back
        </div>
        <div className="w-full flex text-[16px] text-black justify-between items-center ps-[19px] pe-[73px]">
          <p className="font-semibold">{booking?.fullName || "Patient Name"}</p>
          <div className="flex justify-center items-center gap-[92px]">
            <p>{formatDate(booking?.requestedAt)}</p>
            <p>Direct</p>
          </div>
        </div>
      </div>

      {/* PATIENT DETAILS */}
      <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
        <div className="w-full h-[72px] flex items-center bg-white px-8 rounded-t-[15px] border-b-2">
          <h1 className="text-[16px] font-semibold text-black">
            Patient Details
          </h1>
        </div>

        <div className="flex flex-col gap-[10px] p-8 text-[16px] text-black">
          <div className="flex">
            <span className="w-[250px] font-medium">Patient Name</span>
            <span>{booking.fullName}</span>
          </div>
          <div className="flex">
            <span className="w-[250px] font-medium">Gender</span>
            <span>{booking.gender}</span>
          </div>
          <div className="flex">
            <span className="w-[250px] font-medium">Age</span>
            <span>{booking.age}</span>
          </div>
          <div className="flex">
            <span className="w-[250px] font-medium">Height, Weight</span>
            <span>
              {booking.height} cm, {booking.weight} kg
            </span>
          </div>

          <div className="flex">
            <span className="w-[250px] font-medium">
              Current Health Status / Activity
            </span>
            <span>{booking.healthStatus}</span>
          </div>
          <div className="flex">
            <span className="w-[250px] font-medium">Now Patient stayed at</span>
            <span>{booking.stayAt}</span>
          </div>
          <div className="flex">
            <span className="w-[250px] font-medium">
              Residential Address
              <br />
              (Billing Address)
            </span>
            <span>{booking.fullAddress} </span>
          </div>
          <div className="flex">
            <span className="w-[250px] font-medium">Contact person</span>
            <span>{booking.contactPersonName}</span>
          </div>
          <div className="flex">
            <span className="w-[250px] font-medium">
              Relationship with patient
            </span>
            <span>{booking.contactPersonRelation}</span>
          </div>
          <div className="flex">
            <span className="w-[250px] font-medium">Email ID</span>
            <span>{booking.contactPersonEmail}</span>
          </div>
          <div className="flex">
            <span className="w-[250px] font-medium">Mobile Number</span>
            <span>{booking.contactPersonMobileNumber}</span>
          </div>
        </div>
      </div>

      {/* SERVICE DETAILS */}
      <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
        <div className="w-full h-[72px] flex items-center bg-white px-8 rounded-t-[15px] border-b-2">
          <h1 className="text-[16px] font-semibold text-black">
            Service Required
          </h1>
        </div>
        <div className="flex flex-col gap-[10px] p-8 text-[16px] text-black">
          <div className="flex">
            <span className="w-[200px] font-medium">Diagnosis</span>
            <span>{booking.diagnosis}</span>
          </div>
          <div className="flex">
            <span className="w-[200px] font-medium">Service Period from</span>
            <span>{formatDate(booking.startDate)}</span>
          </div>
          <div className="flex">
            <span className="w-[200px] font-medium">Service Type</span>
            <span>{booking.serviceType}</span>
          </div>
          <div className="flex">
            <span className="w-[200px] font-medium">Schedule Type</span>
            <span>{booking.scheduleType}</span>
          </div>
          <div className="flex">
            <span className="w-[200px] font-medium">Duration</span>
            <span>{booking.durationType}</span>
          </div>

          <div className="flex">
            <span className="w-[200px] font-medium">Frequency</span>
            <span>{booking.weekdays?.join(", ")}</span>
          </div>
          <div className="flex">
            <span className="w-[200px] font-medium">Flexibility</span>
            <span>{booking.flexibility}</span>
          </div>
          <div className="flex">
            <span className="w-[200px] font-medium"> Time</span>
            <span>{formatTime(booking.startTime)}</span> &nbsp; - &nbsp;{" "}
            <span>{formatTime(booking.endTime)}</span>
          </div>
        </div>
      </div>

      {/* STAFF PREFERENCE */}
      <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
        <div className="w-full h-[72px] flex items-center bg-white px-8 rounded-t-[15px] border-b-2">
          <h1 className="text-[16px] font-semibold text-black">
            Staff Preference
          </h1>
        </div>
        <div className="flex gap-10 p-8">
          <div className="flex flex-col gap-[10px] text-[16px] text-black">
            <span>Preferred Gender</span>
            <span>Preferred Language</span>
          </div>
          <div className="flex flex-col gap-[10px] text-[16px] text-black">
            <span>{booking.preferredGender || "-"}</span>
            <span>
              {booking.preferredLanguages?.length
                ? booking.preferredLanguages
                    .map((lang) => lang.language)
                    .join(", ")
                : "-"}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
        <div className="w-full h-[72px] flex items-center justify-between bg-white px-8 rounded-t-[15px] border-b-2">
          <h1 className="text-[16px] font-semibold text-black">Location</h1>
          <button
            onClick={() => setShowLocationPopup(true)}
            className="bg-[#C0D8F6] text-black px-4 py-1 rounded-md mt-2 w-[150px] cursor-pointer"
          >
            Update Location
          </button>
        </div>
        <div className="flex gap-12 p-8">
          <div className="flex flex-col gap-[10px] text-[16px] text-black">
            <span>Current Location</span>
          </div>
          <div className="flex flex-col gap-[10px] text-[16px] text-black">
            {booking.currentServiceAddress ? (
              <>
                <span>{booking.currentServiceAddress}</span>
              </>
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
      </div>

      <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
        <div className="w-full h-[72px] flex items-center bg-white px-8 rounded-t-[15px] border-b-2">
          <h1 className="text-[16px] font-semibold text-black">
            Preferred Staff Category
          </h1>
        </div>
        <div className="flex gap-10 p-8">
       <select
  name="categoryByProfession"
  required
  value={selectedRole}
  onChange={handleRoleChange}
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

       <select
  name="grade"
  required
  value={selectedGrade}
  onChange={handleGradeChange}
  className="w-[328px] h-[40px] border border-[#BBBBBB] rounded-[15px] ps-8 text-[14px] outline-none"
>
  <option value="" disabled>
    Select Grade
  </option>
  <option value="GRADE_01">Grade 1</option>
  <option value="GRADE_02">Grade 2</option>
  <option value="GRADE_03">Grade 3</option>
  <option value="GRADE_04">Grade 4</option>
  <option value="GRADE_05">Grade 5</option>
  <option value="GRADE_06">Grade 6</option>
  <option value="GRADE_07">Grade 7</option>
</select>

        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB] mb-5">
        <div className="w-full h-[72px] flex items-center bg-[#C0D8F6] px-8 rounded-t-[15px] border-b-2">
          <h1 className="text-[16px] font-semibold text-black">Action</h1>
        </div>
        <div className="flex gap-8 px-[39px] py-[24px]">
          <Link
            href={{
              pathname: "/controlpanel/caseBooking/assignStaff",
              query: {
                bookingId: booking.id,
                fullName: booking.fullName,
                from: booking.startDate,
                to: booking.endDate,
                service: booking.serviceType,
                schedule: booking.durationType,
                gender: booking.preferredGender,

                location: booking.currentServiceAddress,
                latitude: booking.latitude,
                longitude: booking.longitude,
                preferredLanguages: JSON.stringify(
                  booking.preferredLanguages?.map((l) => ({
                    id: l.id,
                    language: l.language,
                  })) || []
                ),
                language: booking.preferredLanguages || [],
                durationValue: booking.durationValue,
                durationType: booking.durationType,
                frequency: booking.weekdays,
                scheduleType: booking.scheduleType,
                startTime: booking.startTime,
                endTime: booking.endTime,
                role: selectedRole,
                grade: selectedGrade,
              },
            }}
          >
            <button
              disabled={!selectedRole || !selectedGrade}

              className={`w-[192px] h-[40px] flex justify-center items-center rounded-[15px]
    ${
        selectedRole && selectedGrade
        ? "bg-[#3674B5] text-white cursor-pointer"
        : "bg-gray-300 text-gray-600 cursor-not-allowed"
    }`}
            >
              Assign Staff
            </button>
          </Link>
          <button
            onClick={handleCancelClick}
            className="w-[192px] h-[40px] bg-[#FFD1D9] text-[#333333] flex justify-center items-center rounded-[15px] cursor-pointer"
          >
            Cancel Service
          </button>
          <button
            onClick={handleEditClick}
            className="w-[192px] h-[40px] bg-white text-[#333333] border flex justify-center items-center rounded-[15px] cursor-pointer"
          >
            Edit Service
          </button>
        </div>
      </div>

      {showCancelPopup && (
        <CancelPopup
          bookingId={id}
          onClose={handleCancelClose}
          onConfirm={handleCancelConfirm}
        />
      )}

      {showEditPopup && (
        <EditBookingPopup
          initialData={booking}
          onClose={handleEditClose}
          onSave={handleEditSave}
        />
      )}
      {showLocationPopup && (
        <UpdateLocationPopup
          bookingId={selectedBooking?.id}
          currentLat={selectedBooking?.latitude}
          currentLng={selectedBooking?.longitude}
          onClose={() => setShowLocationPopup(false)}
          onUpdated={() => fetchBookingById(selectedBooking.id)}
        />
      )}
    </div>
  );
};

export default BookingDetailsPage;
