// src/lib/store/bookingStore.js

import { create } from "zustand";
import { getBookingDetails, createBooking, getBookingById,confirmBookingApi,assignNurseToBooking } from "@/api/bookingApi";

const useBookingStore = create((set) => ({
  bookings: [],
  selectedBooking: null,     // New state to hold single booking details
  page: 1,
  limit: 10,
  totalPages: 0,
  totalBookings: 0,
  isLoading: false,
  error: null,

  // Fetch all bookings (existing)
  fetchBookings: async (page = 1, limit = 10,status) => {
    set({ isLoading: true });
    try {
      const data = await getBookingDetails(page, limit,status);
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

  // Fetch a single booking by ID
  fetchBookingById: async (id) => {
    set({ isLoading: true, selectedBooking: null, error: null });
    try {
      const data = await getBookingById(id); 
      set({ selectedBooking: data });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // Set page
  setPage: (page) => set({ page }),

  // Create a new booking
  submitBooking: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await createBooking(formData);
      set((state) => ({
        bookings: [data, ...state.bookings],
        totalBookings: state.totalBookings + 1,
        error: null,
        isLoading: false,
      }));
      return { success: true, data };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, error: err.message };
    }
  },






 confirmBooking: async (bookingId, payload) => {
    try {
      set({ isLoading: true });
      const res = await confirmBookingApi(bookingId, payload);
      set({ isLoading: false });
      return res;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },



  assignNurse: async (bookingId, nurseId) => {
  try {
    
    set({ isLoading: true });
    const response = await assignNurseToBooking(bookingId, nurseId);
    console.log(response);

    set({ isLoading: false });

    return { success: true, data: response };
    
  } catch (err) {
    set({ error: err.message, isLoading: false });
    console.log(err);

    return { success: false, error: err.message };
  }
},


}));

export default useBookingStore;
