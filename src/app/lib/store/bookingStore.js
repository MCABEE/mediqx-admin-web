// src/lib/store/bookingStore.js

import { create } from "zustand";
import {
  getBookingDetails,
  createBooking,
  getBookingById,
  confirmBookingApi,
  assignNurseToBooking,
  cancelBookingApi,
  cancelNurseAssignment,
  searchCoordinatesByText,
  updateBooking,
  updateBookingLocation,
  getBookingsByPatientId,
  getDutyLogs,
  createBookingApi,
} from "@/api/bookingApi";

const useBookingStore = create((set, get) => ({
  bookings: [],
  selectedBooking: null, // New state to hold single booking details
  page: 1,
  limit: 10,
  totalPages: 0,
  totalBookings: 0,
  isLoading: false,
  error: null,
  coordinates: null,

  dutyLogs: [],

  // Fetch all bookings (existing)
  // fetchBookings: async (page = 1, limit = 10, status) => {
  //   set({ isLoading: true });
  //   try {
  //     const data = await getBookingDetails(page, limit, status);
  //     set({
  //       bookings: data.bookings || [],
  //       totalPages: data.totalPages || 0,
  //       totalBookings: data.total || 0,
  //       page: data.page,
  //       limit: data.limit,
  //       error: null,
  //     });
  //   } catch (err) {
  //     set({ error: err.message });
  //   } finally {
  //     set({ isLoading: false });
  //   }
  // },
   filters: {
    name: "",
    location: "",
    date: "",
  },

  setPage: (page) => set({ page }),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  clearFilters: () =>
    set({
      filters: { name: "", location: "", date: "" },
    }),

  // ✅ Updated fetch function
  fetchBookings: async (page = 1, limit = 10, status) => {
    set({ isLoading: true });
    try {
      const { name, location, date } = useBookingStore.getState().filters;
      const data = await getBookingDetails(page, limit, status, name, location, date);

      set({
        bookings: data.bookings || [],
        totalPages: data.totalPages || 0,
        totalBookings: data.total || 0,
        page: data.page,
        limit: data.limit,
        error: null,
      });
      console.log("Fetched bookings:", data.bookings);
    } catch (err) {
      set({ error: err.message });
      console.error("Error fetching bookings:", err);
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

  setCoordinates: (coords) => set({ coordinates: coords }),

  fetchCoordinatesByText: async (text) => {
    set({ coordinates: null });
    try {
      const result = await searchCoordinatesByText(text);
      set({ coordinates: result, error: null });
      return result;
    } catch (err) {
      set({ error: err.message });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  cancelBooking: async (bookingId, payload) => {
    try {
      set({ isLoading: true });
      const res = await cancelBookingApi(bookingId, payload);
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

  cancelAssignment: async (assignmentId) => {
    try {
      set({ isLoading: true });
      const response = await cancelNurseAssignment(assignmentId);
      set({ isLoading: false });
      return { success: true, data: response };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, error: err.message };
    }
  },

  updateExistingBooking: async (bookingId, payload) => {
    set({ isLoading: true, error: null });
    try {
      const result = await updateBooking(bookingId, payload);
      set({ isLoading: false });

      // Optionally update the local store
      set((state) => ({
        bookings: state.bookings.map((b) => (b.id === bookingId ? result : b)),
      }));

      return { success: true, data: result };
    } catch (err) {
      set({ isLoading: false, error: err.message });
      return { success: false, error: err.message };
    }
  },

  updateBookingLocation: async (bookingId, payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await updateBookingLocation(bookingId, payload);
      set({ isLoading: false });
      return { success: true, data: response };
    } catch (err) {
      set({ isLoading: false, error: err.message });
      return { success: false, error: err.message };
    }
  },

  fetchBookingsByPatient: async (patientId, page = 1, limit = 10) => {
    set({ isLoading: true });
    try {
      const data = await getBookingsByPatientId(patientId, page, limit);
      set({
        patientBookings: data || [],
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

  dutyLogs: [],
  fetchDutyLogs: async (serviceId, page = 1, limit = 10) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getDutyLogs(serviceId, page, limit);
      set({ dutyLogs: data || [], isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },





  loading: false,
  success: false,
  error: null,
  createBooking: async ({ userId, payload }) => {
    console.log(userId);
    set({ loading: true, error: null, success: false });
    try {
      await createBookingApi({ userId, payload });
      set({ loading: false, success: true });
      return { success: true };
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message || "Booking failed",
      });
      return { success: false };
    }
  },
  resetBookingState: () =>
    set({
      loading: false,
      success: false,
      error: null,
    }),
}));

export default useBookingStore;

