"use client"
import StaffPaymentDetailsTable from "@/components/billing/staffPayments/StaffPaymentDetailsTable";
import { useRouter } from "next/navigation";
import React from 'react'

function page() {
    const router = useRouter();
  return (
    <div>
       <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex items-center">
        <h1
          onClick={() => router.back()}
          className="text-[16px] text-black px-[38px] font-semibold cursor-pointer"
        >
          Back
        </h1>
       
      </div>

      <StaffPaymentDetailsTable/>
    </div>
  )
}

export default page