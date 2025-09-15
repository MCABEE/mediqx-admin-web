import { create } from "zustand";
import {
  addDistricts,
  getDistricts,
  updateDistrict,
  deleteDistrict,
  getStates,
} from "@/api/districtsApi";

const useDistrictStore = create((set, get) => ({
  // District inputs, used for add page (optional)
  districts: [{ name: "", stateId: "" }],
  isLoading: false,
  error: null,
  success: false,

  // Listed districts for manage page with pagination
  listedDistricts: [],
  page: 1,
  limit: 10,
  totalPages: 0,

  // States for dropdown with pagination
  statesList: [],
  statesPage: 1,
  statesTotalPages: 0,

  checkedIds: [],

  setDistricts: (arr) => set({ districts: arr }),
  // addDistrictInput: () =>
  //   set((state) => ({
  //     districts: [...state.districts, { name: "", stateId: "" }],
  //   })),
  addDistrictInput: () => {
  set((state) => {
    const currentStateId = state.districts[0]?.stateId || "";
    return {
      districts: [
        ...state.districts,
        { name: "", stateId: currentStateId }, // inherit stateId
      ],
    };
  });
},

  setDistrictValue: (idx, key, value) =>
    set((state) => {
      const arr = [...state.districts];
      arr[idx][key] = value;
      return { districts: arr };
    }),

  // saveDistricts: async () => {
  //   set({ isLoading: true, error: null, success: false });
  //   try {
  //     const filtered = get().districts.filter(
  //       (d) => d.name.trim() !== "" && d.stateId.trim() !== ""
  //     );
  //     if (filtered.length === 0) {
  //       set({
  //         error:
  //           "Please enter at least one valid district with state selected.",
  //       });
  //       return;
  //     }
  //     await addDistricts(filtered);
  //     set({
  //       success: true,
  //       districts: [{ name: "", stateId: "" }],
  //       error: null,
  //     });
  //   } catch (error) {
  //     set({
  //       error: error.message || "Failed to save districts.",
  //       success: false,
  //     });
  //   } finally {
  //     set({ isLoading: false });
  //   }
  // },
saveDistricts: async () => {
  set({ isLoading: true, error: null, success: false });
  try {
    const filtered = get().districts.filter(
      (d) => d.name.trim() !== "" && d.stateId.trim() !== ""
    );

    if (filtered.length === 0) {
      set({
        error: "Please enter at least one valid district with state selected.",
      });
      return;
    }

    await addDistricts(filtered);

    set((state) => ({
      success: true,
      districts: state.districts.map((d) => ({ name: "", stateId: d.stateId })), // reset names but keep state
      error: null,
    }));
  } catch (error) {
    set({
      error: error.message || "Failed to save districts.",
      success: false,
    });
  } finally {
    set({ isLoading: false });
  }
},

  fetchDistricts: async (page = 1, stateId = null) => {
    set({ isLoading: true, error: null });
    try {
      // If no stateId, omit filtering
      const response = stateId
        ? await getDistricts(page, get().limit, stateId)
        : await getDistricts(page, get().limit);

      set({
        listedDistricts: response.data.districts || [],
        page: response.data.page || page,
        limit: response.data.limit || get().limit,
        totalPages: response.data.totalPages || 0,
      });
    } catch (error) {
      set({ error: error.message || "Failed to fetch districts." });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchStates: async (page = 1) => {
    set({ isStatesLoading: true, error: null });
    try {
      const response = await getStates(page, 50);
      set((state) => ({
        statesList:
          page === 1
            ? response.data.states || []
            : [...state.statesList, ...(response.data.states || [])],
        statesPage: response.data.page || page,
        statesTotalPages: response.data.totalPages || 0,
      }));
    } catch (error) {
      set({ error: error.message || "Failed to fetch states." });
    } finally {
      set({ isStatesLoading: false });
    }
  },

  setCheckedIds: (ids) =>
    set({ checkedIds: ids.length > 1 ? [ids[ids.length - 1]] : ids }),

  toggleCheckedId: (id) => {
    const checkedIds = get().checkedIds;
    set({
      checkedIds: checkedIds.includes(id) ? [] : [id],
    });
  },

  //   updateDistrictById: async (id, data) => {
  //     set({ isLoading: true, error: null });
  //     try {
  //       await updateDistrict(id, data);
  //       await get().fetchDistricts(get().page);
  //       set({ success: true, checkedIds: [] });
  //     } catch (error) {
  //       set({ error: error.message || "Update failed." });
  //       throw error;
  //     } finally {
  //       set({ isLoading: false });
  //     }
  //   },

  //   deleteDistrictById: async (id) => {
  //     set({ isLoading: true, error: null });
  //     try {
  //       await deleteDistrict(id);
  //       const { page, fetchDistricts, listedDistricts } = get();
  //       const newPage = listedDistricts.length === 1 && page > 1 ? page - 1 : page;
  //       set({ checkedIds: [] });
  //       await fetchDistricts(newPage);
  //       set({ page: newPage });
  //     } catch (error) {
  //       set({ error: error.message || "Delete failed." });
  //     } finally {
  //       set({ isLoading: false });
  //     }
  //   },
  updateDistrictById: async (id, data, selectedStateId) => {
    set({ isLoading: true, error: null });
    try {
      await updateDistrict(id, data);
      // Refetch districts filtered by current selected stateId
      await get().fetchDistricts(get().page, selectedStateId);
      set({ success: true, checkedIds: [] });
    } catch (error) {
      set({ error: error.message || "Update failed." });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteDistrictById: async (id, selectedStateId) => {
    set({ isLoading: true, error: null });
    try {
      await deleteDistrict(id);
      const { page, fetchDistricts, listedDistricts } = get();
      const newPage =
        listedDistricts.length === 1 && page > 1 ? page - 1 : page;
      set({ checkedIds: [] });
      await fetchDistricts(newPage, selectedStateId);
      set({ page: newPage });
    } catch (error) {
      set({ error: error.message || "Delete failed." });
    } finally {
      set({ isLoading: false });
    }
  },

  resetSuccess: () => set({ success: false }),
  setPage: (page) => set({ page }),
}));

export default useDistrictStore;
