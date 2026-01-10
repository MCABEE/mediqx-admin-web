// import { create } from "zustand";
// import { fetchLedgerBookingsAPI, fetchStaffPaymentsReportAPI } from "@/api/ledger";

// const useLedgerStore = create((set, get) => ({
//   /* ------------ STATE ------------ */
//   loading: false,
//   error: null,

//   bookings: [],
//   counts: {
//     total: 0,
//     confirmed: 0,
//     cancelledOrHold: 0,
//   },

//   page: 1,
//   limit: 10,
//   total: 0,
//   totalPages: 1,

//   year: new Date().getFullYear(),
//   month: "december",
//   filter: "ALL",

//   /* ------------ SETTERS ------------ */
//   setYear: (year) => set({ year }),
//   setMonth: (month) => set({ month }),
//   setFilter: (filter) => set({ filter }),
//   setPage: (page) => set({ page }),

//   /* ------------ FETCH ------------ */
//   fetchBookings: async () => {
//     set({ loading: true, error: null });

//     try {
//       const { year, month, page, limit, filter } = get();

//       const res = await fetchLedgerBookingsAPI({
//         year,
//         month,
//         page,
//         limit,
//         filter,
//       });

//       if (res.status !== "success") {
//         throw new Error(res.message);
//       }

//       const data = res.data;

//       set({
//         bookings: data.bookings || [],
//         counts: data.counts || {
//           total: 0,
//           confirmed: 0,
//           cancelledOrHold: 0,
//         },
//         page: data.page,
//         limit: data.limit,
//         total: data.total,
//         totalPages: data.totalPages,
//       });
//     } catch (err) {
//       set({ error: err.message || "Failed to fetch bookings" });
//     } finally {
//       set({ loading: false });
//     }
//   },

//    loading: false,
//   error: null,

//   report: {
//     payments: [],
//     totals: {},
//   },

//   year: new Date().getFullYear(),
//   month: new Date().getMonth() + 1, // numeric month
//   category: "",

//   page: 1,
//   limit: 10,
//   total: 0,
//   totalPages: 1,

//   /* ---------------- SETTERS ---------------- */
//   setYear: (year) => set({ year }),
//   setMonth: (month) => set({ month }),
//   setCategory: (category) => set({ category }),
//   setPage: (page) => set({ page }),

//   resetFilters: () =>
//     set({
//       year: new Date().getFullYear(),
//       month: new Date().getMonth() + 1,
//       category: "REG_NURSES",
//       page: 1,
//     }),

//   /* ---------------- FETCH ---------------- */
//   fetchReport: async () => {
//     set({ loading: true, error: null });

//     try {
//       const { year, month, category, page, limit } = get();

//       const res = await fetchStaffPaymentsReportAPI({
//         year,
//         month,
//         category,
//         page,
//         limit,
//       });

//       if (res.status !== "success") {
//         throw new Error(res.message);
//       }

//       const data = res.data;

//       set({
//         report: {
//           payments: data.payments || [],
//           totals: data.totals || {},
//         },
//         total: data.total || 0,
//         totalPages: data.totalPages || 1,
//       });
//     } catch (err) {
//       set({
//         error: err.message || "Failed to fetch staff payments report",
//       });
//     } finally {
//       set({ loading: false });
//     }
//   },
// }));

// export default useLedgerStore;























import { create } from "zustand";
import {
    fetchBookingSalesAPI,
  fetchLedgerBookingsAPI,
  fetchLedgerByPatientAPI,
  fetchStaffPaymentsReportAPI,
} from "@/api/ledger";

const useLedgerStore = create((set, get) => ({
  /* ------------ STATE ------------ */
  loading: false,
  error: null,

  bookings: [],
  counts: {
    total: 0,
    confirmed: 0,
    cancelledOrHold: 0,
  },

  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1,

  year: new Date().getFullYear(),
  month: "december",
  filter: "ALL",

  /* ------------ SETTERS ------------ */
  setYear: (year) => set({ year }),
  setMonth: (month) => set({ month }),
  setFilter: (filter) => set({ filter }),
  setPage: (page) => set({ page }),

  /* ------------ FETCH ------------ */
  fetchBookings: async () => {
    set({ loading: true, error: null });

    try {
      const { year, month, page, limit, filter } = get();

      const res = await fetchLedgerBookingsAPI({
        year,
        month,
        page,
        limit,
        filter,
      });

      if (res.status !== "success") {
        throw new Error(res.message);
      }

      const data = res.data;

      set({
        bookings: data.bookings || [],
        counts: data.counts || {
          total: 0,
          confirmed: 0,
          cancelledOrHold: 0,
        },
        page: data.page,
        limit: data.limit,
        total: data.total,
        totalPages: data.totalPages,
      });
    } catch (err) {
      set({ error: err.message || "Failed to fetch bookings" });
    } finally {
      set({ loading: false });
    }
  },

  loading: false,
  error: null,

  report: {
    payments: [],
    totals: {},
  },

  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1, // numeric month
  category: "",

  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1,

  /* ---------------- SETTERS ---------------- */
  setYear: (year) => set({ year }),
  setMonth: (month) => set({ month }),
  setCategory: (category) => set({ category }),
  setPage: (page) => set({ page }),

  resetFilters: () =>
    set({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      category: "REG_NURSES",
      page: 1,
    }),

  /* ---------------- FETCH ---------------- */
  fetchReport: async () => {
    set({ loading: true, error: null });

    try {
      const { year, month, category, page, limit } = get();

      const res = await fetchStaffPaymentsReportAPI({
        year,
        month,
        category,
        page,
        limit,
      });

      if (res.status !== "success") {
        throw new Error(res.message);
      }

      const data = res.data;

      set({
        report: {
          payments: data.payments || [],
          totals: data.totals || {},
        },
        total: data.total || 0,
        totalPages: data.totalPages || 1,
      });
    } catch (err) {
      set({
        error: err.message || "Failed to fetch staff payments report",
      });
    } finally {
      set({ loading: false });
    }
  },

  loading: false,
  error: null,

  report: null, // { rows: [], totals: {} }

  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1,

  year: new Date().getFullYear(),
  month: "December",

  /* ---------- SETTERS ---------- */
  setYear: (year) => set({ year, page: 1 }),
  setMonth: (month) => set({ month, page: 1 }),
  setPage: (page) => set({ page }),

  /* ---------- FETCH ---------- */
 fetchReport: async () => {
  set({ loading: true, error: null });

  try {
    const { page, limit, year, month } = get();

    const res = await fetchLedgerByPatientAPI({
      page,
      limit,
      year,
      month,
    });

    if (res.status !== "success") {
      throw new Error(res.message);
    }

    const data = res.data;

    console.log("Ledger Report Data:", data);

    set({
      report: {
        rows: data.bills || [],        // ✅ FIXED
        totals: data.summary || {},    // ✅ FIXED
      },
      page: data.page,
      limit: data.limit,
      total: data.total,
      totalPages: data.totalPages,
    });
  } catch (err) {
    set({
      error: err.message || "Failed to fetch patient ledger",
    });
  } finally {
    set({ loading: false });
  }
},


  loading: false,
  error: null,

  data: {
    bills: [],
    summary: {},
  },

  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1,

  year: 2025,
  month: "November",
  filter: "ALL", // ALL | SOLD | CANCELLED | ON_HOLD

  /* ---------------- SETTERS ---------------- */
  setYear: (year) => set({ year, page: 1 }),
  setMonth: (month) => set({ month, page: 1 }),
  setFilter: (filter) => set({ filter, page: 1 }),
  setPage: (page) => set({ page }),

  /* ---------------- FETCH ---------------- */
fetchBookingSales: async () => {
  set({ loading: true, error: null });

  try {
    const { page, limit, year, month, filter } = get();

    const res = await fetchBookingSalesAPI({
      page,
      limit,
      year,
      month,
      filter,
    });

    if (res.status !== "success") {
      throw new Error(res.message);
    }

    const data = res.data;
    console.log("Booking Sales Data:", data);

    set({
      data: {
        bills: data.items || [],        // ✅ FIX
        summary: data.summary || {},    // ✅ OK
        counts: data.counts || {},      // ✅ NEW (for tabs)
      },
      total: data.total || 0,
      totalPages: data.totalPages || 1,
      page: data.page,
      limit: data.limit,
    });
  } catch (err) {
    set({
      error: err.message || "Failed to load booking sales",
    });
  } finally {
    set({ loading: false });
  }
},

}));

export default useLedgerStore;