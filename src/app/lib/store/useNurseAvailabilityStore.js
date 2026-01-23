import { fetchNurseAvailabilityAPI } from "@/api/nurseAvailabilityApi";
import { create } from "zustand";

const getInitialMonthYear = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  };
};

const useNurseAvailabilityStore = create((set, get) => ({
  availabilities: [],
  loading: false,
  error: null,

  ...getInitialMonthYear(),

  fetchAvailability: async (nurseId) => {
    const { year, month } = get();
    set({ loading: true, error: null });

    try {
      const res = await fetchNurseAvailabilityAPI({
        nurseId,
        year,
        month,
      });

      const data = res?.data || [];

      // Attach local Date object
      const normalized = data.map((item) => ({
        ...item,
        dateObj: new Date(item.date),
      }));

      set({ availabilities: normalized });
    } catch (err) {
      set({ error: err.message || "Failed to load availability" });
    } finally {
      set({ loading: false });
    }
  },

  nextMonth: () => {
    const { month, year } = get();
    if (month === 12) {
      set({ month: 1, year: year + 1 });
    } else {
      set({ month: month + 1 });
    }
  },

  prevMonth: () => {
    const { month, year } = get();
    if (month === 1) {
      set({ month: 12, year: year - 1 });
    } else {
      set({ month: month - 1 });
    }
  },
}));

export default useNurseAvailabilityStore;
