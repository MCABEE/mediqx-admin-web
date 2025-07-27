"use client";
import React, { useEffect, useState } from "react";
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

  const router = useRouter();
  const [popupStatus, setPopupStatus] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("COMPLETED"); // Default tab

  useEffect(() => {
    fetchBookings(page, 10, selectedStatus);
  }, [page, selectedStatus]);

  const groupedBookings = groupBookingsByDate(bookings);

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
    setPage(1); // Reset to page 1 on status change
  };

  const handleStatusIconClick = (status, booking) => {
    setPopupStatus(status);
    setSelectedBooking(booking);
  };

  const statusTabs = [
    { label: "On Going", value: "ONGOING" },
    { label: "To be Started", value: "UPCOMING" },
    { label: "Completed Cases", value: "COMPLETED" },
  ];

  const getTabClass = (status) =>
    selectedStatus === status
      ? "text-[#3674B5]"
      : "text-black";

  return (
    <div>
      {/* Tabs Header */}
      <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex gap-[50px] px-6 pt-6 rounded-[15px]">
            {/* New Bookings */}
            <p
              className="h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 border-b-8 border-[#3674B5]"
            >
              Assigned Cases
            </p>
            </div>
      <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="flex gap-[48px] pt-[23px] pb-[19px]">
          {statusTabs.map((tab) => (
            <p
              key={tab.value}
              onClick={() => handleStatusClick(tab.value)}
              className={`cursor-pointer ${getTabClass(tab.value)}`}
            >
              {tab.label}
            </p>
          ))}
        </div>
        {/* <div className="flex gap-2 justify-center items-center">
          <p className="text-black font-semibold pt-[23px] pb-[19px]">Clear</p>
          <input type="checkbox" className="size-[20px]" />
        </div> */}
      </div>

      {/* Total count */}
      <div className="w-full bg-white border border-[#8888888c] rounded-[15px] mt-2 pt-[23px] pb-[19px] px-6 text-black font-semibold text-[32px] flex justify-between">
        <p>{totalBookings}</p>
      </div>

      {/* Bookings Table */}
      <table className="w-full border-spacing-y-2 border-separate text-black">
        <thead className="bg-[#C0D8F6]">
          <tr className="p-2">
            <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">No</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">Patient Name</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">Location</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">Service Date</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">Staff</th>
            <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
                <img src="/detail-btn.svg" alt="arrow" />
            </th>

          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="6" className="text-center py-6">Loading...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="6" className="text-center py-6 text-red-500">{error}</td>
            </tr>
          ) : bookings.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-6">No bookings found</td>
            </tr>
          ) : (
            Object.entries(groupedBookings).map(([date, bookingsList]) => (
              <React.Fragment key={date}>
                <tr>
                  <td colSpan="6" className="rounded-t-2xl p-2 bg-[#C0D8F6] text-[16px] font-semibold">
                    {date}
                  </td>
                </tr>
                {bookingsList.map((booking, i) => (
                  <tr
                    key={booking.id}
                    className={`bg-white ${
                      booking.staffAssignmentStatus !== "GREEN" ? "hover:bg-gray-100" : "opacity-70"
                    }`}
                  >
                    <td className="p-2">{i + 1}</td>
                    <td className="border-l-4 border-[#C0D8F6] p-2 hover:underline">{booking.fullName}</td>
                    <td className="border-l-4 border-[#C0D8F6] p-2">{booking.location}</td>
                    <td className="border-l-4 border-[#C0D8F6] p-2">
                      {new Date(booking.startDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="border-l-4 border-[#C0D8F6] p-2">
                      {/* {["GREEN", "RED", "YELLOW", "BLUE"].includes(booking.assignmentStatus) ? (
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
                          onClick={() => handleStatusIconClick(booking.assignmentStatus, booking)}
                        />
                        
                      ) : (
                        <span className="text-xs text-gray-400">N/A</span>
                      )} */}
                      <img src="/tick.svg" alt="tick" />
                    </td>
                    <td
  className="border-l-4 border-[#C0D8F6] p-2 text-blue-600 underline cursor-pointer"
  onClick={() =>
    router.push(`/controlpanel/cases/case-list-details/${booking.id}`)
  }
>
<img src="/detail-btn.svg" alt="arrow" />
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

// Helper: Group bookings by formatted date
const groupBookingsByDate = (bookings) => {
  return bookings.reduce((acc, booking) => {
    const dateKey = new Date(booking.requestedAt || booking.startDate).toLocaleDateString("en-IN", {
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
