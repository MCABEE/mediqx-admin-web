// "use client";
// import React, { useEffect } from "react";
// import Link from "next/link";
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
//   } = useBookingStore();

//   useEffect(() => {
//     fetchBookings(page, 10, "CONFIRMED");
//   }, [page]);

//   const groupedBookings = groupBookingsByDate(bookings);
//   const router = useRouter();
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
//                   //                   <tr className="bg-white" key={booking.id}>
//                   //                     <td className="p-2">{i + 1}</td>
//                   //                     <Link href={`/controlpanel/caseBooking/confirmedBookingDetails/${booking.id}`}>
//                   //                       <td className="border-l-4 border-[#C0D8F6] p-2 cursor-pointer hover:underline">
//                   //                         {booking.fullName}
//                   //                       </td>
//                   //                     </Link>
//                   //                     <td className="border-l-4 border-[#C0D8F6] p-2">{booking.location}</td>
//                   //                     <td className="border-l-4 border-[#C0D8F6] p-2">
//                   //                       {new Date( booking.startDate).toLocaleDateString("en-IN", {
//                   //                         day: "numeric",
//                   //                         month: "short",
//                   //                       })}
//                   //                     </td>
//                   //                    <td className="border-l-4 border-[#C0D8F6] p-2">
//                   //   {booking.hasCaregiver === true ? (
//                   //     <img src="/tick.svg" alt="Yes" className="w-5 h-5" />
//                   //   ) : (
//                   //     <img src="/cross.svg" alt="No" className="w-5 h-5" />
//                   //   )}
//                   // </td>
//                   //                   </tr>
//                   // <tr
//                   //   key={booking.id}
//                   //   className="bg-white cursor-pointer hover:bg-gray-100"
//                   //   onClick={() =>
//                   //     router.push(
//                   //       `/controlpanel/caseBooking/confirmedBookingDetails/${booking.id}`
//                   //     )
//                   //   }
//                   // >
//                   <tr
//                     key={booking.id}
//                     className={`bg-white ${
//                       booking.staffAssignmentStatus !== "GREEN"
//                         ? "cursor-pointer hover:bg-gray-100"
//                         : "opacity-70"
//                     }`}
//                     onClick={() => {
//                       if (booking.staffAssignmentStatus !== "GREEN") {
//                         router.push(
//                           `/controlpanel/caseBooking/confirmedBookingDetails/${booking.id}`
//                         );
//                       }
//                     }}
//                   >
//                     <td className="p-2">{i + 1}</td>
//                     <td className="border-l-4 border-[#C0D8F6] p-2 hover:underline">
//                       {booking.fullName}
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
//                       {booking.assignmentStatus === "GREEN" ? (
//                         <img src="/tick.svg" alt="Yes" className="w-5 h-5" />
//                       ) : booking.assignmentStatus === "RED" ? (
//                         <img src="/cross.svg" alt="No" className="w-5 h-5" />
//                       ) : booking.assignmentStatus === "YELLOW" ? (
//                         <img
//                           src="/pending.svg"
//                           alt="Pending"
//                           className="w-5 h-5"
//                         />
//                       ) : booking.assignmentStatus === "BLUE" ? (
//                         <img
//                           src="/assign.svg"
//                           alt="assign"
//                           className="w-5 h-5"
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
//     </div>
//   );
// };

// export default Page;

// // 👇 Place this helper inside the same file or a separate utils file
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

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
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
  } = useBookingStore();

  const [popupStatus, setPopupStatus] = useState(null); // "GREEN", "RED", "YELLOW", "BLUE"
  const [selectedBooking, setSelectedBooking] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetchBookings(page, 10, "CONFIRMED");
  }, [page]);

  const groupedBookings = groupBookingsByDate(bookings);

  const handleStatusClick = (status, booking) => {
    setPopupStatus(status);
    setSelectedBooking({
      id: booking.id,
      name: booking.fullName,
      staffName: booking.assignedNurseName,
      startDate: booking.startDate,
      scheduleType: booking.scheduleType,
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

  return (
    <div>
      <Navlink />

      {/* Filter header */}
      <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex justify-between  px-6  rounded-[15px] mt-2">
        <div className="flex text-black font-semibold gap-[48px] pt-[23px] pb-[19px]">
          <p>By Patient</p>
          <p>By Referral</p>
          <p>All</p>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <p className="text-black font-semibold pt-[23px] pb-[19px]">Clear</p>
          <input type="checkbox" className="size-[20px]" />
        </div>
      </div>

      {/* Total count */}
      <div className="w-full bg-white border border-[#8888888c] rounded-[15px] mt-2 pt-[23px] pb-[19px]  px-6 text-black font-semibold text-[32px] flex justify-between">
        <p>{totalBookings}</p>
      </div>

      {/* Bookings table */}
      <table className="w-full border-spacing-y-2 border-separate text-black">
        <thead className="bg-[#C0D8F6]">
          <tr className="p-2">
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
          ) : bookings.length === 0 ? (
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
                        ? " hover:bg-gray-100"
                        : "opacity-70"
                    }`}
                  >
                    <td className="p-2">{i + 1}</td>
                    <td className="border-l-4 border-[#C0D8F6] p-2 hover:underline">
                      {booking.fullName}{" "}
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

      {/* Status Popups */}
      {popupStatus === "GREEN" && selectedBooking && (
        <StatusPopup
          message={`${selectedBooking.staffName}`}
          heading={`Duty Assigned to`}
          subHeading={`Duty Schedule`}
          startDate={selectedBooking.startDate}
          scheduleType={selectedBooking.scheduleType}
          onClose={closePopup}
          onProceed={proceedToDetails}
          bgClass="bg-[#09B438]"
          textClass="text-[#09B438]"
        />
      )}
      {popupStatus === "RED" && selectedBooking && (
        <StatusPopup
          message={`${selectedBooking.staffName}`}
          heading={`Duty Declined by`}
          subHeading={`Reason`}
          startDate={selectedBooking.startDate}
          scheduleType={selectedBooking.scheduleType}
          onClose={closePopup}
          onProceed={proceedToDetails}
          bgClass="bg-[#FE1940]"
          textClass="text-[#FE1940]"
        />
      )}
      {popupStatus === "YELLOW" && selectedBooking && (
        <StatusPopup
          message={`${selectedBooking.staffName}`}
          heading={`Request on Hold`}
          subHeading={`Duty Schedule`}
          startDate={selectedBooking.startDate}
          scheduleType={selectedBooking.scheduleType}
          onClose={closePopup}
          onProceed={proceedToDetails}
          bgClass="bg-[#D4B200]"
          textClass="text-[#D4B200]"
        />
      )}
      {popupStatus === "BLUE" && selectedBooking && (
        <StatusPopup
          message={`N/A`}
          heading={`Not Assigned`}
          subHeading={`Duty Schedule`}
          startDate={selectedBooking.startDate}
          scheduleType={selectedBooking.scheduleType}
          onClose={closePopup}
          onProceed={proceedToDetails}
          bgClass="bg-[#3674B5]"
          textClass="text-[#3674B5]"
        />
      )}
    </div>
  );
};

export default Page;

// Helper to group by date
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

// Shared popup component
const StatusPopup = ({
  message,
  onClose,
  onProceed,
  bgClass,
  textClass,
  heading,
  subHeading,
  startDate,
  scheduleType,
}) => (
  <div className="fixed inset-0 bg-[#03030347] backdrop-blur-xs flex items-center justify-center z-50">
    <div className={`rounded-[15px]   w-[822px] h-[416px] shadow-xl bg-white`}>
      <div className={`rounded-t-[15px] h-[100px] ${bgClass} relative`}>
        <div
          className="bg-white hover:bg-[#e2e0e0] size-[24px] flex justify-center items-center absolute rounded right-6 top-6 cursor-pointer "
          onClick={onClose}
        >
          <h1 className={`rotate-45 text-2xl ${textClass}`}>+</h1>
        </div>
        <h1 className="text-white text-[20px] font-semibold text-center pt-14">
          {heading}
        </h1>
      </div>
      <div className="flex items-center pl-64 gap-12 mt-[24px] border-b-[#BBBBBB] border-b-1 pb-[26px]">
        <p className="text-[16px] text-black w-32">Staff Name</p>
        <h1 className="text-[20px] font-semibold w-32">{message}</h1>
      </div>
      <div className="flex items-center pl-64  gap-12 mt-[24px] border-b-[#BBBBBB] border-b-1 pb-[56px]">
        <p className="text-[16px] text-black">{subHeading} </p>
        <h1 className="text-[20px] font-normal text-black ">
          {new Date(startDate).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
          &nbsp; &nbsp;&nbsp;&nbsp;
          <span className="text-base font-normal">
            {scheduleType === "FULL_TIME_24_HOURS"
              ? "24 Hrs"
              : scheduleType === "DAY_SHIFT_12_HOURS"
              ? "12 Hrs day"
              : scheduleType === "DAY_SHIFT_8_HOURS"
              ? "8 Hrs day"
              : scheduleType === "NIGHT_SHIFT_12_HOURS"
              ? "12 Hrs night"
              : scheduleType === "CUSTOM_HOURS "
              ? "Custom Hrs"
              : scheduleType}
          </span>
        </h1>
      </div>
      <div className="flex justify-center items-center">
        {bgClass === "bg-[#FE1940]" && ( // RED
          <button className="mt-[41px] text-white font-semibold text-[16px] w-[192px] h-[40px] bg-[#3674B5] rounded-[15px] ">
            Re-Schedule
          </button>
        )}

        {bgClass === "bg-[#D4B200]" && ( // YELLOW
          <button
            // onClick={onProceed}
            className="mt-[41px] text-white font-semibold text-[16px] w-[192px] h-[40px] bg-[#3674B5] rounded-[15px] "
          >
            Cancel
          </button>
        )}

        {bgClass === "bg-[#09B438]" && ( // GREEN
          <button className="mt-[41px] text-white font-semibold text-[16px] w-[192px] h-[40px] bg-[#3674B5] rounded-[15px] ">
            Re-Schedule
          </button>
        )}

        {bgClass === "bg-[#3674B5]" && ( // BLUE
          <button
            onClick={onProceed}
            className="mt-[41px] text-white font-semibold text-[16px] w-[192px] h-[40px] bg-[#3674B5] rounded-[15px] "
          >
            Assign
          </button>
        )}
      </div>
      {/* <p className={`text-lg font-semibold mb-4 ${textClass}`}>{message}</p> */}
      {/* <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={onProceed}
          className="px-4 py-2 bg-[#196BA5] text-white rounded hover:bg-blue-700"
        >
          Proceed
        </button>
      </div> */}
    </div>
  </div>
);
