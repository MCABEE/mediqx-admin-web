// "use client";

// import { fetchStaffPaymentsReport } from "@/api/staffPaymentsApi";
// import { create } from "zustand";


// // Get current month & year defaults
// const now = new Date();
// const CURRENT_YEAR = now.getFullYear();
// const CURRENT_MONTH = now.getMonth() + 1; // 1–12

// const useStaffPaymentsStore = create((set, get) => ({
//   year: CURRENT_YEAR,
//   month: CURRENT_MONTH,
//   category: "all",

//   loading: false,
//   error: null,
//   report: null,

//   setYear: (year) => set({ year }),
//   setMonth: (month) => set({ month }),
//   setCategory: (category) => set({ category }),

//   fetchReport: async () => {
//     const { year, month, category } = get();
//     set({ loading: true, error: null });

//     try {
//       const data = await fetchStaffPaymentsReport({ year, month, category });
      
//       set({ report: data });
//       console.log(report);

//     } catch (err) {
//       set({ error: err?.response?.data?.message || "Failed to load report" });
//     } finally {
//       set({ loading: false });
//     }
//   },
// }));

// export default useStaffPaymentsStore;



// /app/lib/store/useStaffPaymentsStore.js
"use client";

import { fetchStaffPaymentDetails, fetchStaffPaymentsReport } from "@/api/staffPaymentsApi";
import { create } from "zustand";

// Get current month & year
const now = new Date();
const defaultYear = now.getFullYear();
const defaultMonth = now.getMonth() + 1;

const useStaffPaymentsStore = create((set, get) => ({
  year: defaultYear,
  month: defaultMonth,
  category: "all",

  loading: false,
  error: null,
  report: null,
 userId: null,
  page: 1,
  limit: 10,

  
  details: null,
  setYear: (year) => set({ year }),
  setMonth: (month) => set({ month }),
  setCategory: (category) => set({ category }),

  fetchReport: async () => {
    const { year, month, category } = get();

    try {
      set({ loading: true, error: null });

      const data = await fetchStaffPaymentsReport({ year, month, category });

      set({
        report: data,
        loading: false,
      });
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message || "Failed to load report.",
      });
    }
  },
  setUserId: (id) => set({ userId: id }),
  setPage: (page) => set({ page }),

  loadDetails: async () => {
    const { userId, page, limit } = get();

    if (!userId) return;

    try {
      set({ loading: true, error: null });

      const data = await fetchStaffPaymentDetails({ userId, page, limit });

      set({
        details: data,
        loading: false,
      });
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message || "Failed to load staff details.",
      });
    }
  },
}));

export default useStaffPaymentsStore;
