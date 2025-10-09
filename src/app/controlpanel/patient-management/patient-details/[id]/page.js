"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import useBookingStore from "@/app/lib/store/bookingStore";
import Link from "next/link";

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
  const { fetchBookingById, selectedBooking, isLoading, error } =
    useBookingStore();
  const router = useRouter();

  useEffect(() => {
    if (id) fetchBookingById(id);
  }, [id]);

  if (isLoading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-500">Error: {error}</p>;
  if (!selectedBooking) return <p className="p-8">No booking found.</p>;

  const booking = selectedBooking;

  return (
    <div>
      <div className="w-full h-[48px] bg-[#C0D8F6] rounded-[15px] flex ">
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
            <span className="w-[250px] font-medium">Residential Address</span>
            <span>{booking.city} </span>
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

          <Link
            href={{
              pathname: `/controlpanel/patient-management/patient-services/${booking.userId}`,
            }}
            className="w-[192px] h-[40px] rounded-[15px] text-white bg-[#3674B5] mt-8 flex items-center justify-center cursor-pointer"
          >
            View Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
