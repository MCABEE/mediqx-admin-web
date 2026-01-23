// app/lib/store/useDashboardStore.js
import { fetchDashboardAPI } from "@/api/dashboardApi";
import { create } from "zustand";

const useDashboardStore = create((set) => ({
  loading: false,

  patientBookings: null,
  todaysCases: null,
  newStaffApplications: null,
  activeStaffStrength: null,
  payments: null,
  totalAgents: null,

  fetchDashboard: async () => {
    set({ loading: true });

    const res = await fetchDashboardAPI();

    if (res.success) {
      set({
        patientBookings: res.data.patientBookings,
        todaysCases: res.data.todaysCases,
        newStaffApplications: res.data.newStaffApplications,
        activeStaffStrength: res.data.activeStaffStrength,
        payments: res.data.payments,
        totalAgents: res.data.totalAgents,
        loading: false,
      });
    } else {
      set({ loading: false });
    }
  },
}));

export default useDashboardStore;
