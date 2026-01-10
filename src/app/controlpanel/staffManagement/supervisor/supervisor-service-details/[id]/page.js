


"use client";

import useSupervisorRegistrationStore from "@/app/lib/store/useSupervisorRegistrationStore";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect } from "react";

function Page() {
  const router = useRouter();
  const { id: serviceId } = useParams();

  const {
    fetchSupervisorServiceDetails,
    serviceDetails,
    productDetails,
    loading,
    error,
  } = useSupervisorRegistrationStore();

  useEffect(() => {
    if (serviceId) {
      fetchSupervisorServiceDetails(serviceId);
    }
  }, [serviceId]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!serviceDetails) return null;

  return (
    <>
      {/* Back */}
      <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex items-center">
        <h1
          onClick={() => router.back()}
          className="text-[16px] text-black px-[38px] font-semibold cursor-pointer"
        >
          Back
        </h1>
      </div>

      {/* SUMMARY ROW */}
      <table className="w-full border-spacing-y-2 border-separate text-black mt-2">
        <tbody>
          <tr className="bg-white">
            <td className="p-2">1</td>
            <td className="border-l-4 border-[#C0D8F6] p-2 hover:underline">
              {serviceDetails.patientName}
            </td>
            <td className="border-l-4 border-[#C0D8F6] p-2">
              {serviceDetails.service}
            </td>
            <td className="border-l-4 border-[#C0D8F6] p-2">
              {serviceDetails.products}
            </td>
            <td className="border-l-4 border-[#C0D8F6] p-2">
              ₹ {serviceDetails.billing}
            </td>
          </tr>
        </tbody>
      </table>

      {/* SERVICE DETAILS */}
      <div className="mb-2 bg-white border border-[#BBBBBB] rounded-[15px] mt-2">
        <div className="flex border-b border-[#BBBBBB] py-4 w-full px-4">
          <p className="font-semibold">Service Details</p>
        </div>

        <div className="flex p-6 gap-20">
          <div className="flex flex-col gap-[10px] text-[16px]">
            <span>Diagnosis</span>
            <span>Service Period From</span>
            <span>Duration</span>
            <span>Duration Value</span>
            <span>Daily Schedule</span>
            <span>Frequency</span>
            <span>Flexibility</span>
            <span>Time</span>
          </div>

          <div className="flex flex-col gap-[10px] text-[16px]">
            <span>{serviceDetails.diagnosis}</span>
            <span>{serviceDetails.servicePeriodFrom}</span>
            <span>{serviceDetails.duration}</span>
            <span>{serviceDetails.durationValue}</span>
            <span>{serviceDetails.dailySchedule}</span>
            <span>{serviceDetails.frequency}</span>
            <span>{serviceDetails.flexibility}</span>
            <span>{serviceDetails.time}</span>
          </div>
        </div>
      </div>

      {/* PRODUCTS DETAILS */}
      <div className="mb-6 bg-white border border-[#BBBBBB] rounded-[15px]">
        <div className="flex border-b border-[#BBBBBB] py-4 w-full px-4">
          <p className="font-semibold">Products Details</p>
        </div>

        {productDetails.length === 0 ? (
          <p className="p-6 text-gray-500">No products used</p>
        ) : (
          productDetails.map((product, index) => (
            <div key={index} className="flex p-6 gap-20">
              <div className="flex flex-col gap-[10px] text-[16px]">
                <span>Product Name</span>
                <span>Quantity</span>
                <span>Price</span>
              </div>
              <div className="flex flex-col gap-[10px] text-[16px]">
                <span>{product.productName}</span>
                <span>{product.quantity}</span>
                <span>₹ {product.finalPrice}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Page;