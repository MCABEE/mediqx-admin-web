// src/store/useBookingStore.js
import { create } from "zustand";
import { getBookingDetails } from "@/api/bookingApi";

const useBookingStore = create((set) => ({
  bookings: [],
  page: 1,
  limit: 10,
  totalPages: 0,
  totalBookings: 0,
  isLoading: false,
  error: null,

  fetchBookings: async (page = 1, limit = 10) => {
    set({ isLoading: true });
    try {
      const data = await getBookingDetails(page, limit);
      set({
        bookings: data.bookings || [],
        totalPages: data.totalPages || 0,
        totalBookings: data.total || 0,
        page: data.page,
        limit: data.limit,
        error: null,
      });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  setPage: (page) => set({ page }),
}));

export default useBookingStore;
