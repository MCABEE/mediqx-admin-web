import { create } from "zustand";
import { fetchLedgerBookingsAPI } from "@/api/ledger";

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
}));

export default useLedgerStore;