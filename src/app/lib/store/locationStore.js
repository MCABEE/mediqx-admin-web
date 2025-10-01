


// "use client";

// import { create } from "zustand";
// import { addLocations } from "@/api/locationApi";

// const useLocationStore = create((set, get) => ({
//   locations: [
//     { state: "", district: "", city: "", pincode: "" }
//   ],
//   isLoading: false,
//   error: null,
//   success: false,

//   addLocationInput: () =>
//     set((state) => ({
//       locations: [...state.locations, { state: "", district: "", city: "", pincode: "" }]
//     })),

//   setLocationValue: (index, field, value) =>
//     set((state) => {
//       const updated = [...state.locations];
//       updated[index][field] = value;
//       return { locations: updated };
//     }),

//   setError: (msg) => set({ error: msg }),
//   resetSuccess: () => set({ success: false, error: null }),

//   saveLocations: async () => {
//     const { locations } = get();
//     set({ isLoading: true, error: null, success: false });

//     // Validate all fields
//     for (const loc of locations) {
//       if (!loc.state || !loc.district || !loc.city || !/^\d{6}$/.test(loc.pincode)) {
//         set({ isLoading: false, error: "All fields are required and pincode must be 6 digits" });
//         return;
//       }
//     }

//     try {
//       await addLocations(locations);
//       set({
//         success: true,
//         locations: [{ state: "", district: "", city: "", pincode: "" }],
//       });
//     } catch (err) {
//       set({ error: err.message || "Failed to add locations" });
//     } finally {
//       set({ isLoading: false });
//     }
//   },
// }));

// export default useLocationStore;





"use client";

import { create } from "zustand";
import {  getLocations, updateLocation, deleteLocation, addLocations } from "@/api/locationApi";

const useLocationStore = create((set, get) => ({
  locations: [
    { state: "", district: "", city: "", pincode: "" }
  ],
  listedLocations: [],
  page: 1,
  limit: 10,
  totalPages: 0,
  totalLocations: 0,
  checkedIds: [],
  isLoading: false,
  error: null,
  success: false,

  addLocationInput: () =>
    set((state) => ({
      locations: [...state.locations, { state: "", district: "", city: "", pincode: "" }]
    })),

  setLocationValue: (index, field, value) =>
    set((state) => {
      const updated = [...state.locations];
      updated[index][field] = value;
      return { locations: updated };
    }),

  setError: (msg) => set({ error: msg }),
  resetSuccess: () => set({ success: false, error: null }),

  saveLocations: async () => {
    const { locations } = get();
    set({ isLoading: true, error: null, success: false });

    for (const loc of locations) {
      if (!loc.state || !loc.district || !loc.city || !/^\d{6}$/.test(loc.pincode)) {
        set({ isLoading: false, error: "All fields required and pincode must be 6 digits" });
        return;
      }
    }

    try {
      await addLocations(locations);
      set({
        success: true,
        locations: [{ state: "", district: "", city: "", pincode: "" }],
      });
    } catch (err) {
      set({ error: err.message || "Failed to add locations" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchLocations: async (page = 1, limit = 10) => {
    set({ isLoading: true, error: null });
    try {
      const response = await getLocations(page, limit);
      set({
        listedLocations: response.data.locations || [],
        page: response.data.page || page,
        limit: response.data.limit || limit,
        totalPages: response.data.totalPages || 0,
        totalLocations: response.data.total || 0,
      });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),

  setCheckedIds: (ids) => set({ checkedIds: ids.length > 1 ? [ids[ids.length - 1]] : ids }),
  toggleCheckedId: (id) => {
    const checkedIds = get().checkedIds;
    set({ checkedIds: checkedIds.includes(id) ? [] : [id] });
  },
  resetChecked: () => set({ checkedIds: [] }),

  updateLocationById: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      if (!/^\d{6}$/.test(data.pincode)) {
        set({ error: "Pincode must be 6 digits" });
        return;
      }
      await updateLocation(id, data);
      await get().fetchLocations(get().page, get().limit);
      set({ success: true });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteLocationById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteLocation(id);
      await get().fetchLocations(get().page, get().limit);
      set({ checkedIds: [] });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useLocationStore;
