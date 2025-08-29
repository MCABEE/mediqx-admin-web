import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getStates, addStates, deleteState, updateState,  } from "@/api/statesApi";

const useStateStore = create(
  persist(
    (set, get) => ({
      // Add states inputs
      states: [""],
      isLoading: false,
      error: null,
      success: false,

      setStates: (arr) => set({ states: arr }),
      addStateInput: () =>
        set((state) => ({ states: [...state.states, ""] })),
      setStateValue: (idx, value) =>
        set((state) => {
          const arr = [...state.states];
          arr[idx] = value;
          return { states: arr };
        }),

      saveStates: async () => {
        set({ isLoading: true, error: null, success: false });
        try {
          const filtered = Array.from(
            new Set(
              get().states.filter((s) => s.trim() !== "").map((s) => ({ name: s.trim() }))
            )
          );
          if (filtered.length === 0) {
            set({ error: "Please enter at least one state." });
            return;
          }
          await addStates(filtered);
          set({ success: true, states: [""], error: null });
        } catch (error) {
          set({ error: error.message, success: false });
        } finally {
          set({ isLoading: false });
        }
      },

      resetSuccess: () => set({ success: false }),

      // Paginated listing
      listedStates: [],
      page: 1,
      limit: 10,
      totalPages: 0,
      totalStates: 0,

      checkedIds: [],

      fetchStates: async (page = 1, limit = 10) => {
        set({ isLoading: true, error: null });
        try {
          const response = await getStates(page, limit);
          set({
            listedStates: response.data.states || [],
            page: response.data.page || page,
            limit: response.data.limit || limit,
            totalPages: response.data.totalPages || 0,
            totalStates: response.data.total || 0,
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
      setCheckedIds: (ids) => set({ checkedIds: ids.length > 1 ? [ids[ids.length - 1]] : ids }),
      toggleCheckedId: (id) => {
        const checkedIds = get().checkedIds;
        set({
          checkedIds: checkedIds.includes(id) ? [] : [id],
        });
      },

      resetChecked: () => set({ checkedIds: [] }),

      deleteStateById: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await deleteState(id);
          const { page, limit, fetchStates, listedStates } = get();
          const newPage = listedStates.length === 1 && page > 1 ? page - 1 : page;
          set({ checkedIds: [] });
          await fetchStates(newPage, limit);
          set({ page: newPage });
        } catch (error) {
          set({ error: error.message });
        } finally {
          set({ isLoading: false });
        }
      },

      updateStateById: async (id, name) => {
        set({ isLoading: true, error: null });
        try {
          await updateState(id, { name });
          const { page, limit, fetchStates } = get();
          await fetchStates(page, limit);
          set({ success: true });
        } catch (error) {
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "state-storage",
      partialize: (state) => ({
        states: state.states,
        listedStates: state.listedStates,
        page: state.page,
        limit: state.limit,
        totalPages: state.totalPages,
        totalStates: state.totalStates,
        checkedIds: state.checkedIds,
        isLoading: state.isLoading,
        error: state.error,
      }),
    }
  )
);

export default useStateStore;
