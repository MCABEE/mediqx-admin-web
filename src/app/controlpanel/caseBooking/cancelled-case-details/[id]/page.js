"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navlink from "@/components/caseBooking/NavLink";
import useBookingStore from "@/app/lib/store/bookingStore";
import { useRouter } from "next/navigation";

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



  useEffect(() => {
    if (id) fetchBookingById(id);
  }, [id]);
 

  if (isLoading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-500">Error: {error}</p>;
  if (!selectedBooking) return <p className="p-8">No booking found.</p>;

  const booking = selectedBooking;
  const router = useRouter();

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
            <span className="w-[250px] font-medium">Residential Address</span>
            <span>{booking.city} </span>
          </div>
          {/* <div className="flex">
    <span className="w-[250px] font-medium">Pincode</span>
    <span>{booking.pincode}</span>
  </div> */}
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
            <span className="w-[200px] font-medium">Duration</span>
            <span>
              {booking.durationType} 
              {/* ({booking.durationValue} ) */}
            </span>
          </div>

          {/* <div className="flex">
    <span className="w-[200px] font-medium">End Time</span>
    <span>{formatTime(booking.endTime)}</span>
  </div> */}
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
      <div className="w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB] mb-10">
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
            <span>{booking.preferredLanguages?.join(", ") || "-"}</span>
          </div>
        </div>
      </div>

    

     
    </div>
  );
};

export default BookingDetailsPage;
