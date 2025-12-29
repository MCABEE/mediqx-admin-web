import { fetchPatientBills } from "@/api/patientBillsApi";
import { create } from "zustand";

const usePatientBillsStore = create((set) => ({
  bills: [],
  page: 1,
  totalPages: 1,
  loading: false,

  fetchBills: async (page = 1) => {
    set({ loading: true });
    try {
      const res = await fetchPatientBills(page);

      set({
        bills: res.data.bills,
        page: res.data.page,
        totalPages: res.data.totalPages,
      });
    } catch (err) {
      console.error("Fetch bills error:", err);
    } finally {
      set({ loading: false });
    }
  },
}));

export default usePatientBillsStore;
