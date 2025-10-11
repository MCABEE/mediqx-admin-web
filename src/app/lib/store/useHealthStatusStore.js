import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createManyHealthStatuses,
  fetchHealthStatuses,
  updateHealthStatus,
  deleteHealthStatus,
} from "@/api/healthStatusApi";

const useHealthStatusStore = create(
  persist(
    (set, get) => ({
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
                .map((s) => ({ status: s.trim() }))
            )
          );
          if (filtered.length === 0) {
            set({ error: "Please enter at least one health status." });
            set({ isLoading: false });
            return;
          }
          await createManyHealthStatuses(filtered);
          set({ success: true, servicesInputs: [""], error: null });
        } catch (error) {
          set({ error: error.message, success: false });
        } finally {
          set({ isLoading: false });
        }
      },

      resetSuccess: () => set({ success: false }),
            listedHealthStatus: [],

      listedServices: [],
      page: 1,
      limit: 10,
      totalPages: 0,
      totalServices: 0,

      checkedIds: [],



       fetchHealthStatus: async (page = 1, limit = 10) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetchHealthStatuses(page, limit);
          set({
            listedHealthStatus: response.data.patientHealthStatuses || [],
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


      fetchServices: async (page = 1, limit = 10) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetchHealthStatuses(page, limit);
          set({
            listedServices: response.data.patientHealthStatuses || [],
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
          await deleteHealthStatus(id);
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

      updateServiceById: async (id, status) => {
        set({ isLoading: true, error: null });
        try {
          await updateHealthStatus(id, status);
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
      name: "health-status-storage",
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

export default useHealthStatusStore;
