// import { approveAmbulanceAPI, deleteAmbulanceAPI, fetchAmbulancesAPI, updateAmbulanceAPI } from "@/api/ambulanceApi";
// import { create } from "zustand";

// const useAmbulanceStore = create((set,get) => ({
//   ambulances: [],
//   page: 1,
//   totalPages: 1,
//   totalCount: 0,
//   loading: false,
//   editingId: null,
//   actionLoading: false,

//   fetchAmbulances: async (page = 1, filters = {}) => {
//     try {
//       set({ loading: true });

//       const res = await fetchAmbulancesAPI({
//         page,
//         limit: 10,
//         ...filters,   
//       });

//       set({
//         ambulances: res.data.ambulances || [],
//         page: res.data.page,
//         totalPages: res.data.totalPages,
//         totalCount: res.data.total,
//         loading: false,
//       });
//     } catch (error) {
//       console.error("Fetch ambulances error", error);
//       set({ loading: false });
//     }
//   },





//    updateAmbulance: async (ambulanceId, payload) => {
//     try {
//       set({ editingId: ambulanceId });

//       await updateAmbulanceAPI(ambulanceId, payload);

//       // refresh current list after update
//       const { page } = get();
//       await get().fetchAmbulances(page, { filter: "ALL" });

//       set({ editingId: null });
//       return true;
//     } catch (error) {
//       console.error("Update ambulance error", error);
//       set({ editingId: null });
//       return false;
//     }
//   },




//     /* CANCEL */
//   deleteAmbulance: async (id) => {
//     try {
//       set({ actionLoading: true });
//       await deleteAmbulanceAPI(id);

//       const { page } = get();
//       await get().fetchAmbulances(page, 10, { filter: "ALL" });

//       set({ actionLoading: false });
//       return true;
//     } catch (err) {
//       console.error(err);
//       set({ actionLoading: false });
//       return false;
//     }
//   },

//   /* CONFIRM */
//   approveAmbulance: async (id) => {
//     try {
//       set({ actionLoading: true });
//       await approveAmbulanceAPI(id);

//       const { page } = get();
//       await get().fetchAmbulances(page, 10, { filter: "ALL" });

//       set({ actionLoading: false });
//       return true;
//     } catch (err) {
//       console.error(err);
//       set({ actionLoading: false });
//       return false;
//     }
//   },
// }));

// export default useAmbulanceStore;











import { approveAmbulanceAPI, deleteAmbulanceAPI, fetchAmbulancesAPI, updateAmbulanceAPI } from "@/api/ambulanceApi";
import { create } from "zustand";

const useAmbulanceStore = create((set, get) => ({
  ambulances: [],
  page: 1,
  totalPages: 1,
  totalCount: 0,
  loading: false,
  editingId: null,
  actionLoading: false,

  fetchAmbulances: async (page = 1, filters = {}) => {
    try {
      set({ loading: true });

      const res = await fetchAmbulancesAPI({
        page,
        limit: 10,
        ...filters,
      });

      set({
        ambulances: res.data.ambulances || [],
        page: res.data.page,
        totalPages: res.data.totalPages,
        totalCount: res.data.total,
        loading: false,
      });
    } catch (error) {
      console.error("Fetch ambulances error", error);
      set({ loading: false });
    }
  },

  updateAmbulance: async (ambulanceId, payload) => {
    try {
      set({ editingId: ambulanceId });

      await updateAmbulanceAPI(ambulanceId, payload);

      // Refresh current list after update
      const { page } = get();
      await get().fetchAmbulances(page, { filter: "ALL" });

      set({ editingId: null });
      return true;
    } catch (error) {
      console.error("Update ambulance error", error);
      set({ editingId: null });
      return false;
    }
  },

  /* CANCEL */
  deleteAmbulance: async (id) => {
    try {
      set({ actionLoading: true });
      await deleteAmbulanceAPI(id);

      const { page } = get();
      // Refetch with filter ALL
      await get().fetchAmbulances(page, { filter: "ALL" });

      set({ actionLoading: false });
      return true;
    } catch (err) {
      console.error(err);
      set({ actionLoading: false });
      return false;
    }
  },

  /* CONFIRM */
  approveAmbulance: async (id) => {
    try {
      set({ actionLoading: true });
      await approveAmbulanceAPI(id, { status: "APPROVED" });

      const { page } = get();
      // Refetch with filter ALL
      await get().fetchAmbulances(page, { filter: "ALL" });

      set({ actionLoading: false });
      return true;
    } catch (err) {
      console.error(err);
      set({ actionLoading: false });
      return false;
    }
  },
}));

export default useAmbulanceStore;
