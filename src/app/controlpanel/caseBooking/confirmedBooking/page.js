// "use client";
// import React, { useEffect, useState } from "react";
// import Navlink from "@/components/caseBooking/NavLink";
// import useBookingStore from "@/app/lib/store/bookingStore";
// import { useRouter } from "next/navigation";

// const Page = () => {
//   const {
//     bookings,
//     fetchBookings,
//     page,
//     totalPages,
//     isLoading,
//     error,
//     setPage,
//     totalBookings,
//     cancelAssignment,
//   } = useBookingStore();

//   const [popupStatus, setPopupStatus] = useState(null); // "GREEN", "RED", "YELLOW", "BLUE"
//   const [selectedBooking, setSelectedBooking] = useState(null);

//   const router = useRouter();

//   useEffect(() => {
//     fetchBookings(page, 10, "CONFIRMED");
//   }, [page]);

//   const groupedBookings = groupBookingsByDate(bookings);

//   const handleStatusClick = (status, booking) => {
//     setPopupStatus(status);
//     setSelectedBooking({
//       id: booking.id,
//       name: booking.fullName,
//       staffName: booking.assignedNurseName,
//       startDate: booking.startDate,
//       scheduleType: booking.scheduleType,
//       actionResponse: booking.actionResponse,
//       assignmentId: booking.assignmentId,
//     });
//   };

//   const closePopup = () => {
//     setPopupStatus(null);
//     setSelectedBooking(null);
//   };

//   const proceedToDetails = () => {
//     router.push(
//       `/controlpanel/caseBooking/confirmedBookingDetails/${selectedBooking.id}`
//     );
//     closePopup();
//   };

//   const handleCancelOrReschedule = async () => {
//     if (!selectedBooking?.assignmentId) return;

//     const result = await cancelAssignment(selectedBooking.assignmentId);
//     if (result.success) {
//       fetchBookings(page, 10, "CONFIRMED"); // refresh bookings
//       proceedToDetails();
//       closePopup();
//     } else {
//       console.error("Cancel failed:", result.error);
//     }
//   };

//   return (
//     <div>
//       <Navlink />

//       {/* Filter header */}
//       <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex justify-between  px-6  rounded-[15px] mt-2">
//         <div className="flex text-black font-semibold gap-[48px] pt-[23px] pb-[19px]">
//           <p>By Patient</p>
//           <p>By Referral</p>
//           <p>All</p>
//         </div>
//         <div className="flex gap-2 justify-center items-center">
//           <p className="text-black font-semibold pt-[23px] pb-[19px]">Clear</p>
//           <input type="checkbox" className="size-[20px]" />
//         </div>
//       </div>

//       {/* Total count */}
//       <div className="w-full bg-white border border-[#8888888c] rounded-[15px] mt-2 pt-[23px] pb-[19px]  px-6 text-black font-semibold text-[32px] flex justify-between">
//         <p>{totalBookings}</p>
//       </div>

//       {/* Bookings table */}
//       <table className="w-full border-spacing-y-2 border-separate text-black">
//         <thead className="bg-[#C0D8F6]">
//           <tr className="p-2">
//             <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">No</th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               Patient Name
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               Location
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               Service Date
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
//               Staff
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {isLoading ? (
//             <tr>
//               <td colSpan="5" className="text-center py-6">
//                 Loading...
//               </td>
//             </tr>
//           ) : error ? (
//             <tr>
//               <td colSpan="5" className="text-center py-6 text-red-500">
//                 {error}
//               </td>
//             </tr>
//           ) : bookings.length === 0 ? (
//             <tr>
//               <td colSpan="5" className="text-center py-6">
//                 No bookings found
//               </td>
//             </tr>
//           ) : (
//             Object.entries(groupedBookings).map(([date, bookingsList]) => (
//               <React.Fragment key={date}>
//                 <tr>
//                   <td
//                     colSpan="5"
//                     className="rounded-t-2xl p-2 bg-[#C0D8F6] text-[16px] font-semibold"
//                   >
//                     {date}
//                   </td>
//                 </tr>
//                 {bookingsList.map((booking, i) => (
//                   <tr
//                     key={booking.id}
//                     className={`bg-white ${
//                       booking.staffAssignmentStatus !== "GREEN"
//                         ? " hover:bg-gray-100"
//                         : "opacity-70"
//                     }`}
//                   >
//                     <td className="p-2">{i + 1}</td>
//                     <td className="border-l-4 border-[#C0D8F6] p-2 hover:underline">
//                       {booking.fullName}{" "}
//                     </td>
//                     <td className="border-l-4 border-[#C0D8F6] p-2">
//                       {booking.location}
//                     </td>
//                     <td className="border-l-4 border-[#C0D8F6] p-2">
//                       {new Date(booking.startDate).toLocaleDateString("en-IN", {
//                         day: "numeric",
//                         month: "short",
//                       })}
//                     </td>
//                     <td className="border-l-4 border-[#C0D8F6] p-2">
//                       {["GREEN", "RED", "YELLOW", "BLUE"].includes(
//                         booking.assignmentStatus
//                       ) ? (
//                         <img
//                           src={
//                             booking.assignmentStatus === "GREEN"
//                               ? "/tick.svg"
//                               : booking.assignmentStatus === "RED"
//                               ? "/cross.svg"
//                               : booking.assignmentStatus === "YELLOW"
//                               ? "/pending.svg"
//                               : "/assign.svg"
//                           }
//                           alt={booking.assignmentStatus}
//                           className="w-5 h-5 cursor-pointer"
//                           onClick={() =>
//                             handleStatusClick(booking.assignmentStatus, booking)
//                           }
//                         />
//                       ) : (
//                         <span className="text-xs text-gray-400">N/A</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </React.Fragment>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="flex justify-between my-4 gap-4">
//         <button
//           onClick={() => setPage(Math.max(page - 1, 1))}
//           disabled={page === 1}
//           className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span className="text-black font-semibold text-lg">
//           {page} / {totalPages}
//         </span>
//         <button
//           onClick={() => setPage(Math.min(page + 1, totalPages))}
//           disabled={page === totalPages}
//           className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>

//       {/* Status Popups */}
//       {popupStatus === "GREEN" && selectedBooking && (
//         <StatusPopup
//           message={`${selectedBooking.staffName}`}
//           heading={`Duty Assigned to`}
//           subHeading={`Duty Schedule`}
//           startDate={selectedBooking.startDate}
//           scheduleType={selectedBooking.scheduleType}
//           onClose={closePopup}
//           onProceed={proceedToDetails}
//           onCancel={handleCancelOrReschedule}
//           bgClass="bg-[#09B438]"
//           textClass="text-[#09B438]"
//         />
//       )}
//       {popupStatus === "RED" && selectedBooking && (
//         <StatusPopup
//           message={`${selectedBooking.staffName}`}
//           heading={`Duty Declined by`}
//           subHeading={`Reason`}
//           startDate={selectedBooking.startDate}
//           scheduleType={selectedBooking.scheduleType}
//           actionResponse={selectedBooking.actionResponse}
//           onClose={closePopup}
//           onProceed={proceedToDetails}
//           onCancel={handleCancelOrReschedule}
//           bgClass="bg-[#FE1940]"
//           textClass="text-[#FE1940]"
//         />
//       )}
//       {popupStatus === "YELLOW" && selectedBooking && (
//         <StatusPopup
//           message={`${selectedBooking.staffName}`}
//           heading={`Request on Hold`}
//           subHeading={`Duty Schedule`}
//           startDate={selectedBooking.startDate}
//           scheduleType={selectedBooking.scheduleType}
//           onClose={closePopup}
//           onProceed={proceedToDetails}
//           onCancel={handleCancelOrReschedule}
//           bgClass="bg-[#D4B200]"
//           textClass="text-[#D4B200]"
//         />
//       )}
//       {popupStatus === "BLUE" && selectedBooking && (
//         <StatusPopup
//           message={`N/A`}
//           heading={`Not Assigned`}
//           subHeading={`Duty Schedule`}
//           startDate={selectedBooking.startDate}
//           scheduleType={selectedBooking.scheduleType}
//           onClose={closePopup}
//           onProceed={proceedToDetails}
//           onCancel={handleCancelOrReschedule}
//           bgClass="bg-[#3674B5]"
//           textClass="text-[#3674B5]"
//         />
//       )}
//     </div>
//   );
// };

// export default Page;

// // Helper to group by date
// const groupBookingsByDate = (bookings) => {
//   return bookings.reduce((acc, booking) => {
//     const dateKey = new Date(
//       booking.requestedAt || booking.startDate
//     ).toLocaleDateString("en-IN", {
//       year: "numeric",
//       month: "long",
//       day: "2-digit",
//       weekday: "long",
//     });
//     if (!acc[dateKey]) acc[dateKey] = [];
//     acc[dateKey].push(booking);
//     return acc;
//   }, {});
// };

// // Shared popup component
// const StatusPopup = ({
//   message,
//   onClose,
//   onProceed,
//   bgClass,
//   textClass,
//   heading,
//   subHeading,
//   startDate,
//   scheduleType,
//   actionResponse,
//   onCancel,
// }) => (
//   <div className="fixed inset-0 bg-[#03030347] backdrop-blur-xs flex items-center justify-center z-50">
//     <div className={`rounded-[15px]   w-[762px] h-[416px] shadow-xl bg-white`}>
//       <div className={`rounded-t-[15px] h-[100px] ${bgClass} relative`}>
//         <div
//           className="bg-white hover:bg-[#e2e0e0] size-[24px] flex justify-center items-center absolute rounded right-6 top-6 cursor-pointer "
//           onClick={onClose}
//         >
//           <h1 className={`rotate-45 text-2xl ${textClass}`}>+</h1>
//         </div>
//         <h1 className="text-white text-[20px] font-semibold text-center pt-14">
//           {heading}
//         </h1>
//       </div>
//       <div className="flex items-center pl-52 gap-12 mt-[24px] border-b-[#BBBBBB] border-b-1 pb-[26px]">
//         <p className="text-[16px] text-black w-32">Staff Name</p>
//         <h1 className="text-[20px] font-semibold ">{message}</h1>
//       </div>
//       <div className="flex items-center pl-52  gap-12 mt-[24px] border-b-[#BBBBBB] border-b-1 pb-[56px]">
//         <p className="text-[16px] text-black w-32">{subHeading} </p>

//         {bgClass === "bg-[#FE1940]" ? (
//           <div>{actionResponse}</div>
//         ) : (
//           <h1 className="text-[20px] font-normal text-black">
//             {new Date(startDate).toLocaleDateString("en-IN", {
//               day: "numeric",
//               month: "short",
//               year: "numeric",
//             })}
//             &nbsp;&nbsp;&nbsp;&nbsp;
//             <span className="text-base font-normal">
//               {scheduleType === "FULL_TIME_24_HOURS"
//                 ? "24 Hrs"
//                 : scheduleType === "DAY_SHIFT_12_HOURS"
//                 ? "12 Hrs day"
//                 : scheduleType === "DAY_SHIFT_8_HOURS"
//                 ? "8 Hrs day"
//                 : scheduleType === "NIGHT_SHIFT_12_HOURS"
//                 ? "12 Hrs night"
//                 : scheduleType === "CUSTOM_HOURS"
//                 ? "Custom Hrs"
//                 : scheduleType}
//             </span>
//           </h1>
//         )}
//       </div>
//       <div className="flex justify-center items-center">
//         {bgClass === "bg-[#FE1940]" && ( // RED
//           <button
//             onClick={onProceed}
//             className="mt-[41px] text-white font-semibold text-[16px] w-[192px] h-[40px] bg-[#3674B5] rounded-[15px] "
//           >
//             Assign
//           </button>
//         )}

//         {bgClass === "bg-[#D4B200]" && ( // YELLOW
//           <button
//             onClick={onCancel}
//             className="mt-[41px] text-white font-semibold text-[16px] w-[192px] h-[40px] bg-[#3674B5] rounded-[15px] cursor-pointer "
//           >
//             Cancel
//           </button>
//         )}

//         {bgClass === "bg-[#09B438]" && ( // GREEN
//           <button
//             onClick={onCancel}
//             className="mt-[41px] text-white font-semibold text-[16px] w-[192px] h-[40px] bg-[#3674B5] rounded-[15px] cursor-pointer "
//           >
//             Re-Schedule
//           </button>
//         )}

//         {bgClass === "bg-[#3674B5]" && ( // BLUE
//           <button
//             onClick={onProceed}
//             className="mt-[41px] text-white font-semibold text-[16px] w-[192px] h-[40px] bg-[#3674B5] rounded-[15px] cursor-pointer "
//           >
//             Assign
//           </button>
//         )}
//       </div>
//     </div>
//   </div>
// );









"use client";
import React, { useEffect, useState } from "react";
import Navlink from "@/components/caseBooking/NavLink";
import useBookingStore from "@/app/lib/store/bookingStore";
import { useRouter } from "next/navigation";

const Page = () => {
  const {
    bookings,
    fetchBookings,
    page,
    totalPages,
    isLoading,
    error,
    setPage,
    totalBookings,
    cancelAssignment,
  } = useBookingStore();

  const [popupStatus, setPopupStatus] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    location: "",
    date: "",
  });

  const router = useRouter();

  // Fetch bookings initially
  useEffect(() => {
    fetchBookings(page, 50, "CONFIRMED");
  }, [page]);


  
  // Filter bookings based on name, location, and date
 const filteredBookings = bookings.filter((booking) => {
  const matchesName = booking.fullName
    .toLowerCase()
    .includes(filters.name.toLowerCase());
  const matchesLocation = booking.location
    .toLowerCase()
    .includes(filters.location.toLowerCase());
  const matchesDate = filters.date
    ? new Date(booking.startDate).toLocaleDateString("en-CA") === filters.date
    : true;

  return matchesName && matchesLocation && matchesDate;
});

const groupedBookings = groupBookingsByDate(filteredBookings);


  const handleStatusClick = (status, booking) => {
    setPopupStatus(status);
    setSelectedBooking({
      id: booking.id,
      name: booking.fullName,
      staffName: booking.assignedNurseName,
      startDate: booking.startDate,
      scheduleType: booking.scheduleType,
      actionResponse: booking.actionResponse,
      assignmentId: booking.assignmentId,
    });
  };

  const closePopup = () => {
    setPopupStatus(null);
    setSelectedBooking(null);
  };

  const proceedToDetails = () => {
    router.push(
      `/controlpanel/caseBooking/confirmedBookingDetails/${selectedBooking.id}`
    );
    closePopup();
  };

  const handleCancelOrReschedule = async () => {
    if (!selectedBooking?.assignmentId) return;
    const result = await cancelAssignment(selectedBooking.assignmentId);
    if (result.success) {
      fetchBookings(page, 50, "CONFIRMED");
      proceedToDetails();
      closePopup();
    } else {
      console.error("Cancel failed:", result.error);
    }
  };

  const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFilters((prev) => ({ ...prev, [name]: value }));
};


  return (
    <div>
      <Navlink />

      {/* Filter header */}
      {/* <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="flex text-black font-semibold gap-[48px] pt-[23px] pb-[19px]">
          <p>By Patient</p>
          <p>By Referral</p>
          <p>All</p>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <p
            className="text-black font-semibold pt-[23px] pb-[19px] cursor-pointer"
            onClick={() => setFilters({ name: "", location: "", date: "" })}
          >
            Clear
          </p>
          <input type="checkbox" className="size-[20px]" />
        </div>
      </div> */}

      {/* Total count */}
      <div className="w-full  bg-white border border-[#8888888c] rounded-[15px] mt-2 pt-[23px] pb-[19px] px-6 text-black font-semibold text-[32px] flex justify-between  items-center">
       <p>{filteredBookings.length}</p>
        <button
      onClick={() => setFilters({ name: "", location: "", date: "" })}
          className="bg-[#C0D8F6] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#aac4ec]"
    >
      Clear Filters
    </button>
      </div>

      {/* Table */}
      <table className="w-full border-spacing-y-2 border-separate text-black">
        <thead className="bg-[#C0D8F6]">
          <tr>
            <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">No</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Patient Name
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Location
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Service Date
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
              Staff
            </th>
          </tr>

          {/* Search row */}
          <tr className="bg-[#F9FBFF] border-b border-[#E0E6EF]">
  <th></th>
  <th className="p-2">
    <input
      type="text"
      name="name"
      value={filters.name}
      onChange={handleInputChange}
      placeholder="Search by name"
      className="w-full bg-white rounded-lg px-3 py-2 text-sm border border-[#D1E3FF] shadow-sm focus:ring-2 focus:ring-[#C0D8F6] focus:border-[#C0D8F6] outline-none transition-all duration-150"
    />
  </th>
  <th className="p-2">
    <input
      type="text"
      name="location"
      value={filters.location}
      onChange={handleInputChange}
      placeholder="Search by location"
      className="w-full bg-white rounded-lg px-3 py-2 text-sm border border-[#D1E3FF] shadow-sm focus:ring-2 focus:ring-[#C0D8F6] focus:border-[#C0D8F6] outline-none transition-all duration-150"
    />
  </th>
  <th className="p-2">
    <input
      type="date"
      name="date"
      value={filters.date}
      onChange={handleInputChange}
      className="w-full bg-white rounded-lg px-3 py-2 text-sm border border-[#D1E3FF] shadow-sm focus:ring-2 focus:ring-[#C0D8F6] focus:border-[#C0D8F6] outline-none transition-all duration-150 text-gray-600"
    />
  </th>
  <th></th>
</tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5" className="text-center py-6">
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="5" className="text-center py-6 text-red-500">
                {error}
              </td>
            </tr>
          ) : filteredBookings.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-6">
                No bookings found
              </td>
            </tr>
          ) : (
            Object.entries(groupedBookings).map(([date, bookingsList]) => (
              <React.Fragment key={date}>
                <tr>
                  <td
                    colSpan="5"
                    className="rounded-t-2xl p-2 bg-[#C0D8F6] text-[16px] font-semibold"
                  >
                    {date}
                  </td>
                </tr>
                {bookingsList.map((booking, i) => (
                  <tr
                    key={booking.id}
                    className={`bg-white ${
                      booking.staffAssignmentStatus !== "GREEN"
                        ? "hover:bg-gray-100"
                        : "opacity-70"
                    }`}
                  >
                    <td className="p-2">{i + 1}</td>
                    <td className="border-l-4 border-[#C0D8F6] p-2 hover:underline">
                      {booking.fullName}
                    </td>
                    <td className="border-l-4 border-[#C0D8F6] p-2">
                      {booking.location}
                    </td>
                    <td className="border-l-4 border-[#C0D8F6] p-2">
                      {new Date(booking.startDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="border-l-4 border-[#C0D8F6] p-2">
                      {["GREEN", "RED", "YELLOW", "BLUE"].includes(
                        booking.assignmentStatus
                      ) ? (
                        <img
                          src={
                            booking.assignmentStatus === "GREEN"
                              ? "/tick.svg"
                              : booking.assignmentStatus === "RED"
                              ? "/cross.svg"
                              : booking.assignmentStatus === "YELLOW"
                              ? "/pending.svg"
                              : "/assign.svg"
                          }
                          alt={booking.assignmentStatus}
                          className="w-5 h-5 cursor-pointer"
                          onClick={() =>
                            handleStatusClick(booking.assignmentStatus, booking)
                          }
                        />
                      ) : (
                        <span className="text-xs text-gray-400">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between my-4 gap-4">
        <button
          onClick={() => setPage(Math.max(page - 1, 1))}
          disabled={page === 1}
          className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-black font-semibold text-lg">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
          className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Popups */}
      {popupStatus && selectedBooking && (
        <StatusPopup
          popupStatus={popupStatus}
          selectedBooking={selectedBooking}
          closePopup={closePopup}
          proceedToDetails={proceedToDetails}
          handleCancelOrReschedule={handleCancelOrReschedule}
        />
      )}
    </div>
  );
};

export default Page;

/* ---------------- Helper functions ---------------- */
const groupBookingsByDate = (bookings) => {
  return bookings.reduce((acc, booking) => {
    const dateKey = new Date(
      booking.requestedAt || booking.startDate
    ).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      weekday: "long",
    });
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(booking);
    return acc;
  }, {});
};

/* ---------------- Popup Component ---------------- */
const StatusPopup = ({
  popupStatus,
  selectedBooking,
  closePopup,
  proceedToDetails,
  handleCancelOrReschedule,
}) => {
  const { staffName, startDate, scheduleType, actionResponse } = selectedBooking;

  const colorMap = {
    GREEN: { bg: "bg-[#09B438]", text: "text-[#09B438]" },
    RED: { bg: "bg-[#FE1940]", text: "text-[#FE1940]" },
    YELLOW: { bg: "bg-[#D4B200]", text: "text-[#D4B200]" },
    BLUE: { bg: "bg-[#3674B5]", text: "text-[#3674B5]" },
  };
  const { bg, text } = colorMap[popupStatus] || {};

  const headings = {
    GREEN: ["Duty Assigned to", "Duty Schedule"],
    RED: ["Duty Declined by", "Reason"],
    YELLOW: ["Request on Hold", "Duty Schedule"],
    BLUE: ["Not Assigned", "Duty Schedule"],
  };
  const [heading, subHeading] = headings[popupStatus];

  return (
    <div className="fixed inset-0 bg-[#03030347] backdrop-blur-xs flex items-center justify-center z-50">
      <div className={`rounded-[15px] w-[762px] h-[416px] shadow-xl bg-white`}>
        <div className={`rounded-t-[15px] h-[100px] ${bg} relative`}>
          <div
            className="bg-white hover:bg-[#e2e0e0] size-[24px] flex justify-center items-center absolute rounded right-6 top-6 cursor-pointer"
            onClick={closePopup}
          >
            <h1 className={`rotate-45 text-2xl ${text}`}>+</h1>
          </div>
          <h1 className="text-white text-[20px] font-semibold text-center pt-14">
            {heading}
          </h1>
        </div>

        <div className="flex items-center pl-52 gap-12 mt-[24px] border-b border-[#BBBBBB] pb-[26px]">
          <p className="text-[16px] text-black w-32">Staff Name</p>
          <h1 className="text-[20px] font-semibold">{staffName}</h1>
        </div>

        <div className="flex items-center pl-52 gap-12 mt-[24px] border-b border-[#BBBBBB] pb-[56px]">
          <p className="text-[16px] text-black w-32">{subHeading}</p>
          {popupStatus === "RED" ? (
            <div>{actionResponse}</div>
          ) : (
            <h1 className="text-[20px] font-normal text-black">
              {new Date(startDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
              &nbsp;&nbsp;
              <span className="text-base font-normal">
                {scheduleType === "FULL_TIME_24_HOURS"
                  ? "24 Hrs"
                  : scheduleType === "DAY_SHIFT_12_HOURS"
                  ? "12 Hrs day"
                  : scheduleType === "DAY_SHIFT_8_HOURS"
                  ? "8 Hrs day"
                  : scheduleType === "NIGHT_SHIFT_12_HOURS"
                  ? "12 Hrs night"
                  : scheduleType === "CUSTOM_HOURS"
                  ? "Custom Hrs"
                  : scheduleType}
              </span>
            </h1>
          )}
        </div>

        <div className="flex justify-center items-center">
          {popupStatus === "RED" && (
            <button
              onClick={proceedToDetails}
              className="mt-[41px] text-white font-semibold text-[16px] w-[192px] h-[40px] bg-[#3674B5] rounded-[15px]"
            >
              Assign
            </button>
          )}
          {popupStatus === "YELLOW" && (
            <button
              onClick={handleCancelOrReschedule}
              className="mt-[41px] text-white font-semibold text-[16px] w-[192px] h-[40px] bg-[#3674B5] rounded-[15px]"
            >
              Cancel
            </button>
          )}
          {popupStatus === "GREEN" && (
            <button
              onClick={handleCancelOrReschedule}
              className="mt-[41px] text-white font-semibold text-[16px] w-[192px] h-[40px] bg-[#3674B5] rounded-[15px]"
            >
              Re-Schedule
            </button>
          )}
          {popupStatus === "BLUE" && (
            <button
              onClick={proceedToDetails}
              className="mt-[41px] text-white font-semibold text-[16px] w-[192px] h-[40px] bg-[#3674B5] rounded-[15px]"
            >
              Assign
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
