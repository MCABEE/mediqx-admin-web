"use client";
import AssignStaffPage from "@/components/caseBooking/AssignStaffPage";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading assignment page...</div>}>
      <AssignStaffPage />
    </Suspense>
  );
}
