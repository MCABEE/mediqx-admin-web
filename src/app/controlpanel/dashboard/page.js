"use client";

import useDashboardStore from "@/app/lib/store/useDashboardStore";
import ActiveStaff from "@/components/dashboard/ActiveStaff";
import NewStaffApplications from "@/components/dashboard/NewStaffApplications";
import PatientBookings from "@/components/dashboard/PatientBookings";
import Payments from "@/components/dashboard/Payments";
import TodayCases from "@/components/dashboard/TodayCases";
import TotalAgents from "@/components/dashboard/TotalAgents";
import React, { useEffect } from "react";

const Page = () => {
  const {
    fetchDashboard,
    loading,
    patientBookings,
    todaysCases,
    newStaffApplications,
    activeStaffStrength,
    payments,
    totalAgents,
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="pb-12">
      <PatientBookings data={patientBookings} />

      <div className="pt-8">
        <TodayCases data={todaysCases} />
      </div>

      <div className="flex mt-8 gap-8">
        <NewStaffApplications data={newStaffApplications} />
        <ActiveStaff data={activeStaffStrength} />
      </div>

      <div className="flex mt-8 gap-8">
        <Payments data={payments} />
        <TotalAgents data={totalAgents} />
      </div>
    </div>
  );
};

export default Page;
