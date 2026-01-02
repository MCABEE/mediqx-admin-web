import {
  getServiceRatings,
  getServiceRatingsByServiceId,
  replyToServiceRating,
} from "@/api/serviceRatingApi";
import { create } from "zustand";

const useServiceRatingsStore = create((set) => ({
  ratings: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1,
  loading: false,
  error: null,
  fetchRatings: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const data = await getServiceRatings(page, limit);
      set({
        ratings: data?.ratings ?? [],
        page: data?.page ?? page,
        limit: data?.limit ?? limit,
        total: data?.total ?? 0,
        totalPages: data?.totalPages ?? 1,
        loading: false,
      });
    } catch (err) {
      set({
        error: err?.message || "Failed to fetch ratings",
        loading: false,
      });
    }
  },
  ratingDetails: null,
  loading: false,
  error: null,

  fetchRatingByServiceId: async (serviceId) => {
    set({ loading: true, error: null });

    try {
      const data = await getServiceRatingsByServiceId(serviceId);

      // API may return array → pick first item
      set({
        ratingDetails: Array.isArray(data) ? data[0] : data,
        loading: false,
      });
    } catch (err) {
      set({
        error: err?.message || "Failed to fetch rating details",
        loading: false,
      });
    }
  },

  resetRatingDetails: () =>
    set({
      ratingDetails: null,
      loading: false,
      error: null,
    }),

  submitReply: async ({ serviceId, ratingId, reply }) => {
    set({ loading: true, error: null });
    try {
      await replyToServiceRating({ serviceId, ratingId, reply });
      set({ loading: false });
      return { success: true };
    } catch (err) {
      set({
        error: err?.message || "Failed to submit reply",
        loading: false,
      });
      return { success: false };
    }
  },
}));

export default useServiceRatingsStore;
