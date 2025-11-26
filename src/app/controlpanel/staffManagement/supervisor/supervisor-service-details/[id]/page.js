"use client";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const router = useRouter();

  return (
    <>
      <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex items-center">
        <h1
          onClick={() => router.back()}
          className="text-[16px] text-black px-[38px] font-semibold cursor-pointer"
        >
          Back
        </h1>
      </div>

      <table className="w-full border-spacing-y-2 border-separate text-black">
        <tbody>
          <tr className="bg-white">
            <td className="p-2">1</td>
            <td className="border-l-4 border-[#C0D8F6] p-2 hover:underline">
              Sevv
            </td>
            <td className="border-l-4 border-[#C0D8F6] p-2">keke</td>
            <td className="border-l-4 border-[#C0D8F6] p-2">male</td>
            <td className="border-l-4 border-[#C0D8F6] p-2">bhyu hjh hj</td>
          </tr>
        </tbody>
      </table>
      <div className="mb-2 bg-white border border-[#BBBBBB] rounded-[15px]">
        <div className="flex border-b border-[#BBBBBB] py-4 w-full px-4 gap-40">
          <p className="text-black flex items-center font-semibold">
            Service Details
          </p>
        </div>

        <div className="flex p-6 gap-20">
          <div className="flex flex-col gap-[10px] text-[16px] text-black">
            <span>Diagnosis</span>
            <span>Service Period From</span>
            <span>Single Visit / Periodically</span>
            <span>Duration</span>
            <span>Daily Schedule</span>
            <span>Frequency</span>
            <span>Flexibility</span>
            <span>Time</span>
          </div>
          <div className="flex flex-col gap-[10px] text-[16px] text-black">
            <span>opiuhy</span>
            <span>opiuhy</span>
            <span>opiuhy</span>
            <span>opiuhy</span>
            <span>opiuhy</span>
            <span>opiuhy</span>
            <span>opiuhy</span>
            <span>opiuhy</span>
          </div>
        </div>
      </div>
      <div className="mb-6 bg-white border border-[#BBBBBB] rounded-[15px]">
        <div className="flex border-b border-[#BBBBBB] py-4 w-full px-4 gap-40">
          <p className="text-black flex items-center font-semibold">
            Products Details
          </p>
        </div>

        <div className="flex p-6 gap-20">
          <div className="flex flex-col gap-[10px] text-[16px] text-black">
            <span>Diagnosis</span>
            <span>Service Period From</span>
            <span>Single Visit / Periodically</span>
            <span>Duration</span>
            <span>Daily Schedule</span>
            <span>Frequency</span>
            <span>Flexibility</span>
            <span>Time</span>
          </div>
          <div className="flex flex-col gap-[10px] text-[16px] text-black">
            <span>opiuhy</span>
            <span>opiuhy</span>
            <span>opiuhy</span>
            <span>opiuhy</span>
            <span>opiuhy</span>
            <span>opiuhy</span>
            <span>opiuhy</span>
            <span>opiuhy</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
