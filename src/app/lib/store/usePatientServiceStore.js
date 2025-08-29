import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createManyPatientServices,
  fetchPatientServices,
  updatePatientService,
  deletePatientService,
} from "@/api/servicesApi";

const usePatientServiceStore = create(
  persist(
    (set, get) => ({
      // Add services inputs
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
          const filtered = Array.from(
            new Set(
              get()
                .servicesInputs.filter((s) => s.trim() !== "")
                .map((s) => ({ service: s.trim() }))
            )
          );
          if (filtered.length === 0) {
            set({ error: "Please enter at least one service." });
            return;
          }
          await createManyPatientServices(filtered);
          set({ success: true, servicesInputs: [""], error: null });
        } catch (error) {
          set({ error: error.message, success: false });
        } finally {
          set({ isLoading: false });
        }
      },

      resetSuccess: () => set({ success: false }),

      // Paginated listing
      listedServices: [],
      page: 1,
      limit: 10,
      totalPages: 0,
      totalServices: 0,

      checkedIds: [],

      fetchServices: async (page = 1, limit = 10) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetchPatientServices(page, limit);
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

      setPage: (page) => set({ page }),
      setLimit: (limit) => set({ limit }),

      // Single checkbox selection
      setCheckedIds: (ids) =>
        set({ checkedIds: ids.length > 1 ? [ids[ids.length - 1]] : ids }),
      toggleCheckedId: (id) => {
        const checkedIds = get().checkedIds;
        set({
          checkedIds: checkedIds.includes(id) ? [] : [id],
        });
      },

      resetChecked: () => set({ checkedIds: [] }),

      deleteServiceById: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await deletePatientService(id);
          const { page, limit, fetchServices, listedServices } = get();
          const newPage =
            listedServices.length === 1 && page > 1 ? page - 1 : page;
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
    }),
    {
      name: "service-storage",
      partialize: (state) => ({
        servicesInputs: state.servicesInputs,
        listedServices: state.listedServices,
        page: state.page,
        limit: state.limit,
        totalPages: state.totalPages,
        totalServices: state.totalServices,
        checkedIds: state.checkedIds,
        isLoading: state.isLoading,
        error: state.error,
      }),
    }
  )
);

export default usePatientServiceStore;
