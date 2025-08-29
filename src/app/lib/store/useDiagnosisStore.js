import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createManyDiagnoses,
  fetchDiagnoses,
  updateDiagnosis,
  deleteDiagnosis,
} from "@/api/diagnosisApi";

const useDiagnosisStore = create(
  persist(
    (set, get) => ({
      diagnosisInputs: [""],
      isLoading: false,
      error: null,
      success: false,

      setDiagnosisInputs: (arr) => set({ diagnosisInputs: arr }),
      addDiagnosisInput: () =>
        set((state) => ({ diagnosisInputs: [...state.diagnosisInputs, ""] })),
      setDiagnosisInputValue: (idx, value) =>
        set((state) => {
          const arr = [...state.diagnosisInputs];
          arr[idx] = value;
          return { diagnosisInputs: arr };
        }),

      addDiagnoses: async () => {
        set({ isLoading: true, error: null, success: false });
        try {
          const filtered = Array.from(
            new Set(
              get()
                .diagnosisInputs.filter((d) => d.trim() !== "")
                .map((d) => ({ diagnosis: d.trim() }))
            )
          );
          if (filtered.length === 0) {
            set({
              error: "Please enter at least one diagnosis.",
              isLoading: false,
            });
            return;
          }
          await createManyDiagnoses(filtered);
          set({ success: true, diagnosisInputs: [""], error: null });
        } catch (error) {
          set({ error: error.message, success: false });
        } finally {
          set({ isLoading: false });
        }
      },

      resetSuccess: () => set({ success: false }),

      listedDiagnoses: [],
      page: 1,
      limit: 10,
      totalPages: 0,
      totalDiagnoses: 0,

      checkedIds: [],

      fetchDiagnosesList: async (page = 1, limit = 10) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetchDiagnoses(page, limit);
          set({
            listedDiagnoses: response.data.patientDiagnoses || [],
            page: response.data.page || page,
            limit: response.data.limit || limit,
            totalPages: response.data.totalPages || 0,
            totalDiagnoses: response.data.total || 0,
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

      deleteDiagnosisById: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await deleteDiagnosis(id);
          const { page, limit, fetchDiagnosesList, listedDiagnoses } = get();
          const newPage =
            listedDiagnoses.length === 1 && page > 1 ? page - 1 : page;
          set({ checkedIds: [] });
          await fetchDiagnosesList(newPage, limit);
          set({ page: newPage });
        } catch (error) {
          set({ error: error.message });
        } finally {
          set({ isLoading: false });
        }
      },

      updateDiagnosisById: async (id, diagnosis) => {
        set({ isLoading: true, error: null });
        try {
          await updateDiagnosis(id, diagnosis);
          const { page, limit, fetchDiagnosesList } = get();
          await fetchDiagnosesList(page, limit);
          set({ success: true });
        } catch (error) {
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "diagnosis-storage",
      partialize: (state) => ({
        diagnosisInputs: state.diagnosisInputs,
        listedDiagnoses: state.listedDiagnoses,
        page: state.page,
        limit: state.limit,
        totalPages: state.totalPages,
        totalDiagnoses: state.totalDiagnoses,
        checkedIds: state.checkedIds,
        isLoading: state.isLoading,
        error: state.error,
      }),
    }
  )
);

export default useDiagnosisStore;
