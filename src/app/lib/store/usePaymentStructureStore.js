// import { create } from "zustand";
// import {
//   createPaymentStructure,
//   getPaymentStructures,
//   deletePaymentStructure,
// } from "@/api/paymentStructureApi";

// const usePaymentStructureStore = create((set, get) => ({
//   structures: [],
//   page: 1,
//   limit: 10,
//   totalPages: 0,
//   loading: false,
//   error: null,

//   // Fetch Payment Structures
//   fetchStructures: async (page = 1) => {
//     set({ loading: true, error: null });

//     try {
//       const res = await getPaymentStructures(page, get().limit);
//       set({
//         structures: res.data || [],
//         page: res.page,
//         totalPages: res.totalPages,
//       });
//     } catch (err) {
//       set({ error: err.message });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   // Create structure
//   saveStructure: async (payload) => {
//     set({ loading: true, error: null });

//     try {
//       await createPaymentStructure(payload);
//       return true;
//     } catch (err) {
//       set({ error: err.message });
//       return false;
//     } finally {
//       set({ loading: false });
//     }
//   },

//   // Delete Structure
//   removeStructure: async (id) => {
//     set({ loading: true, error: null });

//     try {
//       await deletePaymentStructure(id);
//       get().fetchStructures();
//     } catch (err) {
//       set({ error: err.message });
//     } finally {
//       set({ loading: false });
//     }
//   },
// }));

// export default usePaymentStructureStore;






// src/lib/store/usePaymentStructureStore.js
import { create } from "zustand";
import {
  createPaymentStructure,
  getPaymentStructures,
  deletePaymentStructure,
  getPaymentStructureById,
  updatePaymentStructure,
} from "@/api/paymentStructureApi";

const usePaymentStructureStore = create((set, get) => ({
  // data
  structures: [],
  page: 1,
  limit: 10,
  totalPages: 0,
  total: 0,

  // filters
  role: "REG_NURSES",
  category: "",
  dutySchedule: "",

  // ui
  loading: false,
  error: null,

  // setters for filters (will refetch)
  setRole: (role) => set((s) => ({ role }), false),
  setCategory: (category) => set((s) => ({ category }), false),
  setDutySchedule: (dutySchedule) => set((s) => ({ dutySchedule }), false),
  setLimit: (limit) => set((s) => ({ limit }), false),

  // Fetch Payment Structures
  fetchStructures: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      const opts = {
        page,
        limit: get().limit,
        role: get().role,
        category: get().category,
        dutySchedule: get().dutySchedule,
      };
      const res = await getPaymentStructures(opts);
      // Map response to expected shape - adapt these keys if your API returns differently
      // Expecting res to include: data (array), page, totalPages, total
      set({
        structures: res.data.structures || [],
        page: res.data.page || page,
        totalPages: res.data.totalPages ?? 0,
        total: res.data.total ?? (res.data?.length || 0),
      });
    } catch (err) {
      set({ error: err.message || String(err) });
    } finally {
      set({ loading: false });
    }
  },

  // Create / Save structure
  saveStructure: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await createPaymentStructure(payload);
      // After success, refresh current page
      await get().fetchStructures(get().page);
      return res;
    } catch (err) {
      set({ error: err.message || String(err) });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

    fetchStructureById: async (id, role) => {
    set({ loading: true, error: null });
    try {
      const res = await getPaymentStructureById(id, role);
      // res.data or res depending on your API shape
      // Normalize and return the item to caller
      const item = res.data ?? res;
      return item;
    } catch (err) {
      set({ error: err.message || String(err) });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

    updateStructure: async (id, payload) => {
    set({ loading: true, error: null });
    try {
      const res = await updatePaymentStructure(id, payload);
      // refresh current page after update
      await get().fetchStructures(get().page);
      return res;
    } catch (err) {
      set({ error: err.message || String(err) });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
  // Delete Structure
  removeStructure: async (id) => {
    set({ loading: true, error: null });
    try {
      await deletePaymentStructure(id);
      // refetch current page (or go to previous page if last item removed)
      await get().fetchStructures(get().page);
    } catch (err) {
      set({ error: err.message || String(err) });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));

export default usePaymentStructureStore;
