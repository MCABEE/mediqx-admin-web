import { create } from "zustand";
import {
  createManyPatientServices,
  fetchPatientServices,
  updatePatientService,
  deletePatientService,
} from "@/api/servicesApi";

const usePatientServiceStore = create((set, get) => ({
  // Inputs
  servicesInputs: [""],
  isLoading: false,
  error: null,
  success: false,

 

setServicesInputs: (arr) => set({ servicesInputs: arr }),

addServiceInput: () =>
  set((state) => ({ servicesInputs: [...state.servicesInputs, ""] })),

setServiceInputValue: (idx, value) =>
  set((state) => {
    const arr = [...state.servicesInputs];
    arr[idx] = value;
    return { servicesInputs: arr };
  }),

addServices: async () => {
  set({ isLoading: true, error: null, success: false });
  try {
    const filtered = get()
      .servicesInputs
      .filter((s) => s.trim() !== "")
      .map((s) => ({ service: s.trim() }));

    if (filtered.length === 0) {
      set({
        error: { message: "Please enter at least one service." },
        isLoading: false,
      });
      return;
    }

    await createManyPatientServices(filtered);

    set({
      success: true,
      servicesInputs: [""],
      error: null,
    });
  }catch (err) {
  console.error("🛑 Store caught error:", err);

  const normalizedError = {
    message:
      typeof err === "string"
        ? err
        : typeof err?.message === "object"
        ? err?.message?.message || "An unknown error occurred."
        : err?.response?.data?.message ||
          err?.message ||
          "Failed to add services.",
    details:
      err?.response?.data?.details ||
      err?.error?.details ||
      err?.details ||
      null,
  };

  set({
    error: normalizedError,
    success: false,
  });
}

},

resetError: () => set({ error: null }),
resetSuccess: () => set({ success: false }),


  // Listing & pagination
  listedServices: [],
  page: 1,
  limit: 10,
  totalPages: 0,
  totalServices: 0,

  checkedIds: [],
  setCheckedIds: (ids) =>
    set({ checkedIds: ids.length > 1 ? [ids[ids.length - 1]] : ids }),
  toggleCheckedId: (id) => {
    const checkedIds = get().checkedIds;
    set({ checkedIds: checkedIds.includes(id) ? [] : [id] });
  },
  resetChecked: () => set({ checkedIds: [] }),

fetchServices: async (page = 1, limit = 10, search = "") => {
  set({ isLoading: true, error: null });
  try {
    const response = await fetchPatientServices(page, limit, search);
    set({
      listedServices: response.data.patientServices || [],
      page: response.data.page || page,
      limit: response.data.limit || limit,
      totalPages: response.data.totalPages || 0,
      totalServices: response.data.total || 0,
    });
  } catch (error) {
    set({ error: error.message });
  } finally {
    set({ isLoading: false });
  }
},


  deleteServiceById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deletePatientService(id);
      const { page, limit, fetchServices, listedServices } = get();
      const newPage = listedServices.length === 1 && page > 1 ? page - 1 : page;
      set({ checkedIds: [] });
      await fetchServices(newPage, limit);
      set({ page: newPage });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  updateServiceById: async (id, service) => {
    set({ isLoading: true, error: null });
    try {
      await updatePatientService(id, service);
      const { page, limit, fetchServices } = get();
      await fetchServices(page, limit);
      set({ success: true });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default usePatientServiceStore;
