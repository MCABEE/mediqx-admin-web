// "use client";
// import React, { useEffect } from "react";
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
//     fetchBookings(page, 10, "NEW");
//   }, [page]);

//   const groupedBookings = groupBookingsByDate(bookings);
//   const router = useRouter();
//   return (
//     <div>
//       <Navlink />
//       {/* Filter header */}
//       {/* <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex justify-between  px-6  rounded-[15px] mt-2">
//         <div className="flex text-black font-semibold gap-[48px] pt-[23px] pb-[19px]">
//           <p>By Patient</p>
//           <p>By Referral</p>
//           <p>All</p>
//         </div>
//         <div className="flex gap-2 justify-center items-center">
//           <p className="text-black font-semibold pt-[23px] pb-[19px]">Clear</p>
//           <input type="checkbox" className="size-[20px]" />
//         </div>
//       </div> */}

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
//               Type
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
//                     className="bg-white cursor-pointer hover:bg-gray-100"
//                     onClick={() =>
//                       router.push(
//                         `/controlpanel/caseBooking/bookingDetails/${booking.id}`
//                       )
//                     }
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
//                       {booking.referralSource}
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

// //  Place this helper inside the same file or a separate utils file
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
    filters,
    setFilters,
    clearFilters,
  } = useBookingStore();

  const [status] = useState("NEW");
  const router = useRouter();

  useEffect(() => {
    fetchBookings(page, 10, status);
  }, [page, status, filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ [name]: value });
  };

  const groupedBookings = groupBookingsByDate(bookings);

  return (
    <div className="p-4">
      <Navlink />

      {/* Total count */}
      <div className="w-full bg-white border border-[#8888888c] rounded-[15px] mt-2 py-4 px-6 text-black font-semibold text-[28px] flex justify-between items-center">
        <p>{totalBookings}</p>
        <button
          onClick={() => {
            clearFilters();
            fetchBookings(1, 10, status);
          }}
          className="bg-[#C0D8F6] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#aac4ec]"
        >
          Clear Filters
        </button>
      </div>

      {/* Bookings table */}
      <table className="w-full border-spacing-y-2 border-separate text-black mt-4">
        <thead className="bg-[#C0D8F6]">
          <tr>
            <th className="text-base rounded-l-2xl p-2">No</th>
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
              Type
            </th>
          </tr>

          {/* ✅ Filter row */}
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
            [...Array(5)].map((_, i) => (
              <tr key={i} className="animate-pulse bg-gray-100">
                <td colSpan="5" className="p-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                </td>
              </tr>
            ))
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
                    className="bg-white cursor-pointer hover:bg-gray-100"
                    onClick={() =>
                      router.push(
                        `/controlpanel/caseBooking/bookingDetails/${booking.id}`
                      )
                    }
                  >
                    <td className="p-2">{i + 1}</td>
                    <td className="border-l-4 border-[#C0D8F6] p-2">
                      {booking.fullName}
                    </td>
                    <td className="border-l-4 border-[#C0D8F6] p-2">
                      {booking.location}
                    </td>
                    <td className="border-l-4 border-[#C0D8F6] p-2">
                      {new Date(booking.startDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="border-l-4 border-[#C0D8F6] p-2">
                      {booking.referralSource || "-"}
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
    </div>
  );
};

export default Page;

// ✅ Group helper
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
