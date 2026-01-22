import { create } from "zustand";
import {
  addCoAdminAPI,
  fetchCoAdminsAPI,
  getCoAdminByIdAPI,
  updateCoAdminAPI,
  deleteCoAdminAPI,
} from "@/api/userAccess";

const useUserAccessStore = create((set, get) => ({
  loading: false,
  error: null,

  /* ---------- LIST ---------- */
  coAdmins: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1,

  fetchCoAdmins: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      const res = await fetchCoAdminsAPI({
        page,
        limit: get().limit,
      });

      set({
        coAdmins: res.data.coAdmins,
        page: res.data.page,
        total: res.data.total,
        totalPages: res.data.totalPages,
      });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  /* ---------- ADD ---------- */
//   addCoAdmin: async (payload) => {
//     set({ loading: true });
//     try {
//       await addCoAdminAPI(payload);
//     } finally {
//       set({ loading: false });
//     }
//   },

addCoAdmin: async (payload) => {
  set({ loading: true, error: null });

  try {
    await addCoAdminAPI(payload);
  } catch (err) {
    // ✅ KEEP ORIGINAL MESSAGE
    set({ error: err.message });
    throw err;
  } finally {
    set({ loading: false });
  }
},

  /* ---------- VIEW ---------- */
  selectedCoAdmin: null,

  fetchCoAdminById: async (id) => {
    set({ loading: true });
    try {
      const res = await getCoAdminByIdAPI(id);
      set({ selectedCoAdmin: res.data.coAdmin });
    } finally {
      set({ loading: false });
    }
  },

  /* ---------- UPDATE ---------- */
  updateCoAdmin: async (id, payload) => {
    set({ loading: true });
    try {
      await updateCoAdminAPI(id, payload);
      await get().fetchCoAdmins(get().page);
    } finally {
      set({ loading: false });
    }
  },

  /* ---------- DELETE ---------- */
  deleteCoAdmin: async (id) => {
    set({ loading: true });
    try {
      await deleteCoAdminAPI(id);
      await get().fetchCoAdmins(get().page);
    } finally {
      set({ loading: false });
    }
  },

  clearSelected: () => set({ selectedCoAdmin: null }),
}));

export default useUserAccessStore;
