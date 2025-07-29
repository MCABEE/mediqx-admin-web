"use client";
import Navlink from "@/components/patientManagement/Navlink";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect } from "react";
import useBookingStore from "@/app/lib/store/bookingStore";

export default function Page() {
  const router = useRouter();
  const { id: patientId } = useParams();

  const {
    fetchBookingsByPatient,
    patientBookings = {},
    isLoading,
    error,
  } = useBookingStore();

  useEffect(() => {
    if (patientId) {
      fetchBookingsByPatient(patientId, 1, 10);
    }
  }, [patientId, fetchBookingsByPatient]);

  if (isLoading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-500">Error: {error}</p>;

  const bookingsArray = patientBookings?.serviceRequests || [];

  if (!Array.isArray(bookingsArray) || bookingsArray.length === 0) {
    return <p className="p-8">No bookings found.</p>;
  }

  const formatTime12h = (timeStr) => {
    if (!timeStr) return "-";
    try {
      const match = timeStr.match(/\d{2}:\d{2}:\d{2}/);
      if (!match) return "-";
      const [hours, minutes] = match[0].split(":");
      const date = new Date();
      date.setHours(Number(hours), Number(minutes));
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return "-";
    }
  };

  return (
    <div>
      <Navlink />

      {bookingsArray.map((booking, index) => {
        const queryParams = new URLSearchParams({
          diagnosis: booking.diagnosis || "-",
          startDate: booking.startDate ? booking.startDate.split("T")[0] : "-",
          scheduleType: booking.scheduleType || "-",
          durationType: booking.durationType || "-",
          serviceType: booking.serviceType || "-",
          weekdays: Array.isArray(booking.weekdays)
            ? booking.weekdays.join(", ")
            : "-",
          flexibility: booking.flexibility || "-",
          startTime: booking.startTime || "",
          endTime: booking.endTime || "",
        }).toString();

        return (
          <div key={booking.id}>
            {/* HEADER */}
            <div className="w-full h-[48px] bg-[#C0D8F6] rounded-[15px] flex">
              <div
                onClick={() => router.back()}
                className="text-[16px] text-black border-r-2 border-[#F0F4F9] flex justify-center items-center px-[38px] cursor-pointer"
              >
                Back
              </div>
              <div className="w-full flex text-[16px] text-black justify-between items-center ps-[19px] pe-[73px]">
                <p className="font-semibold">Patient Services Details</p>
              </div>
            </div>

            {/* BOOKING CARD */}
            <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
              <div className="w-full h-[72px] flex items-center bg-white px-8 rounded-t-[15px] border-b border-[#BBBBBB]">
                <h1 className="text-[16px] font-semibold text-black bg-[#C0D8F6] p-2 rounded-[4px]">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </h1>
              </div>

              <div className="flex flex-col gap-[10px] p-8 text-[16px] text-black">
                <div className="flex">
                  <span className="w-[250px] font-medium">Diagnosis</span>
                  <span>{booking.diagnosis || "-"}</span>
                </div>

                <div className="flex">
                  <span className="w-[250px] font-medium">
                    Service Period From
                  </span>
                  <span>
                    {booking.startDate ? booking.startDate.split("T")[0] : "-"}
                  </span>
                </div>

                <div className="flex">
                  <span className="w-[250px] font-medium">
                    Single visit / periodically
                  </span>
                  <span>{booking.scheduleType || "-"}</span>
                </div>

                <div className="flex">
                  <span className="w-[250px] font-medium">Duration</span>
                  <span>{booking.durationType || "-"}</span>
                </div>

                <div className="flex">
                  <span className="w-[250px] font-medium">Daily Schedule</span>
                  <span>{booking.serviceType || "-"}</span>
                </div>

                <div className="flex">
                  <span className="w-[250px] font-medium">Frequency</span>
                  <span>
                    {Array.isArray(booking.weekdays)
                      ? booking.weekdays.join(", ")
                      : "-"}
                  </span>
                </div>

                <div className="flex">
                  <span className="w-[250px] font-medium">Flexibility</span>
                  <span>{booking.flexibility || "-"}</span>
                </div>

                <div className="flex">
                  <span className="w-[250px] font-medium">Time</span>
                  <span>
                    {formatTime12h(booking.startTime)} -{" "}
                    {formatTime12h(booking.endTime)}
                  </span>
                </div>

                <Link
                  href={`/controlpanel/patient-management/case-history/${booking.id}?${queryParams}`}
                  className="w-[192px] h-[40px] rounded-[15px] text-white bg-[#3674B5] mt-8 flex items-center justify-center cursor-pointer"
                >
                  View Case History
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
