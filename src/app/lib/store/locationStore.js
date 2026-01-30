"use client";

import { create } from "zustand";
import {
  getLocations,
  updateLocation,
  deleteLocation,
  addLocations,
} from "@/api/locationApi";

const useLocationStore = create((set, get) => ({
  locations: [{ state: "", district: "", city: "", pincode: "" }],
  listedLocations: [],
  page: 1,
  limit: 10,
  totalPages: 0,
  totalLocations: 0,
  checkedIds: [],
  isLoading: false,
  error: null,
  success: false,
  duplicateIndexes: [], // 🔴 new field to highlight duplicates

  // ➕ Add a new empty location row
  addLocationInput: () =>
    set((state) => ({
      locations: [
        ...state.locations,
        { state: "", district: "", city: "", pincode: "" },
      ],
    })),

  // ❌ Remove a specific location row
  removeLocationInput: (index) =>
    set((state) => ({
      locations: state.locations.filter((_, i) => i !== index),
    })),

  // 🔄 Update input value
  setLocationValue: (index, field, value) =>
    set((state) => {
      const updated = [...state.locations];
      updated[index][field] = value;
      return { locations: updated };
    }),

  setError: (msg) => set({ error: msg }),
  resetSuccess: () => set({ success: false, error: null, duplicateIndexes: [] }),

  // 💾 Save all locations
  saveLocations: async () => {
    const { locations } = get();
    set({ isLoading: true, error: null, success: false, duplicateIndexes: [] });

    // basic validation
    for (const loc of locations) {
      if (
        !loc.state ||
        !loc.district ||
        !loc.city ||
        !/^\d{6}$/.test(loc.pincode)
      ) {
        set({
          isLoading: false,
          error: "All fields required and pincode must be 6 digits",
        });
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
      // 🔴 Handle duplicate composite key error (409)
      if (
        err.response?.status === 409 &&
        err.response?.data?.error?.type === "DUPLICATE_ENTRY"
      ) {
        const duplicates = err.response.data.error.details.duplicates || [];

        const duplicateIndexes = [];
        duplicates.forEach((dup) => {
          const composite = dup.value.split(",").map((v) => v.trim());
          get().locations.forEach((loc, idx) => {
            if (
              loc.state === composite[0] &&
              loc.district === composite[1] &&
              loc.city === composite[2] &&
              loc.pincode === composite[3]
            ) {
              duplicateIndexes.push(idx);
            }
          });
        });

        set({
          error: "Duplicate location found. ",
          duplicateIndexes,
        });
      } else {
        set({ error: err.message || "Failed to add locations" });
      }
    } finally {
      set({ isLoading: false });
    }
  },
 
  fetchLocations: async (page = 1, limit = 10, search = "") => {
  set({ isLoading: true, error: null });
  try {
    const response = await getLocations(page, limit, search);
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

  // updateLocationById: async (id, data) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     if (!/^\d{6}$/.test(data.pincode)) {
  //       set({ error: "Pincode must be 6 digits" });
  //       return;
  //     }
  //     await updateLocation(id, data);
  //     await get().fetchLocations(get().page, get().limit);
  //     set({ success: true });
  //   } catch (err) {
  //     set({ error: err.message });
  //   } finally {
  //     set({ isLoading: false });
  //   }
  // },
updateLocationById: async (id, data) => {
  set({ isLoading: true, error: null });
  try {
    if (!/^\d{6}$/.test(data.pincode)) {
      set({ error: "Pincode must be 6 digits" });
      return;
    }

    await updateLocation(id, data); // call API

    await get().fetchLocations(get().page, get().limit);
    set({ success: true });
  } catch (err) {
    // check for duplicate error from backend
    if (err.response?.status === 409 && err.response?.data?.error?.type === "DUPLICATE_ENTRY") {
      throw new Error("Location already exists");
    }
    throw err;
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