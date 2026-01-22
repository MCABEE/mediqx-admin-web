"use client";
import React, { useEffect, useState } from "react";
import useBookingStore from "@/app/lib/store/bookingStore";
import { useRouter } from "next/navigation";
import Navlink from "@/components/patientManagement/Navlink";

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
  const [selectedStatus, setSelectedStatus] = useState("ONGOING");

  // Filters state
  const [filters, setFilters] = useState({
    name: "",
    location: "",
    date: "",
  });

  useEffect(() => {
    fetchBookings(page, 10, selectedStatus);
  }, [page, selectedStatus]);

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
    setPage(1);
  };

  const handleStatusIconClick = (status, booking) => {
    setPopupStatus(status);
    setSelectedBooking(booking);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ name: "", location: "", date: "" });
  };

  // Filtered bookings
  const filteredBookings = bookings.filter((b) => {
    const matchName = b.fullName.toLowerCase().includes(filters.name.toLowerCase());
    const matchLocation = b.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchDate = filters.date
      ? new Date(b.startDate).toLocaleDateString("en-CA") === filters.date
      : true;
    return matchName && matchLocation && matchDate;
  });

  const groupedBookings = groupBookingsByDate(filteredBookings);

  const statusTabs = [
    { label: "Ongoing Patients", value: "ONGOING" },
    { label: "To be Start", value: "UPCOMING" },
    { label: "Completed Cases", value: "COMPLETED" },
  ];

  const getTabClass = (status) =>
    selectedStatus === status
      ? "border-b-8 border-[#3674B5]"
      : "border-b-2 border-transparent";

  return (
    <div>
      {/* Tabs Header */}
      <div className="w-full bg-white border border-[#8888888c] text-base font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <Navlink
          tabs={statusTabs}
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusClick}
        />
      </div>

      {/* Total count */}
      <div className="w-full bg-white border border-[#8888888c] rounded-[15px] mt-2 pt-[20px] pb-[17px] px-6 text-black font-semibold text-[32px] flex justify-between">
        <p>{filteredBookings.length}</p>
         <button
                onClick={handleClearFilters}
                  className="bg-[#C0D8F6] px-4 py-1 rounded-md text-sm font-medium hover:bg-[#aac4ec]"

              >
                Clear Filters
              </button>
      </div>

      {/* Bookings Table */}
      <table className="w-full border-spacing-y-2 border-separate text-black mt-4">
        <thead className="bg-[#C0D8F6]">
          <tr>
            <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">No</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">Patient Name</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">Location</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">Service Date</th>
            <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">Staff</th>
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
                    className="text-black bg-white hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      router.push(
                        `/controlpanel/patient-management/patient-details/${booking.id}`
                      )
                    }
                  >
                    <td className="p-2">{i + 1}</td>
                    <td className="border-l-4 border-[#C0D8F6] p-2 hover:underline">
                      {booking.fullName}
                    </td>
                    <td className="border-l-4 border-[#C0D8F6] p-2">{booking.location}</td>
                    <td className="border-l-4 border-[#C0D8F6] p-2">
                      {new Date(booking.startDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="border-l-4 border-[#C0D8F6] p-2">
                      {booking.assignedNurseName}
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
    const dateKey = new Date(booking.requestedAt || booking.startDate).toLocaleDateString(
      "en-IN",
      {
        year: "numeric",
        month: "long",
        day: "2-digit",
        weekday: "long",
      }
    );
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(booking);
    return acc;
  }, {});
};
