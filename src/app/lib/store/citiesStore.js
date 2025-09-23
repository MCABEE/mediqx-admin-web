import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  addCities,
  getDistricts,
  getCities,
  updateCity,
  deleteCity,
} from "@/api/citiesApi";

const useCityStore = create(
  persist(
    (set, get) => ({
      // City inputs for adding cities
      cities: [{ name: "", districtId: "" }],
      isLoading: false,
      error: null,
      success: false,

      // Paginated districts list for dropdown
      districtsList: [],
      districtsPage: 1,
      districtsTotalPages: 0,
      isDistrictsLoading: false,

      // Paginated cities list for manage page
      listedCities: [],
      scrollListedCities:[],
      page: 1,
      limit: 10,
      totalPages: 0,
      

      // Selected district for adding cities
      selectedDistrictId: "",

      // Selected city ids for edit/delete (single selection)
      checkedIds: [],

      setCities: (arr) => set({ cities: arr }),
      addCityInput: () =>
        set((state) => ({
          cities: [...state.cities, { name: "", districtId: "" }],
        })),
      setCityValue: (idx, key, value) =>
        set((state) => {
          const arr = [...state.cities];
          arr[idx][key] = value;
          return { cities: arr };
        }),

      setSelectedDistrictId: (id) => set({ selectedDistrictId: id }),

      // fetchDistricts: async (page = 1) => {
      //   set({ isDistrictsLoading: true, error: null });
      //   try {
      //     const res = await getDistricts(page, get().limit);
      //     set((state) => ({
      //       districtsList:
      //         page === 1
      //           ? res.data.districts || []
      //           : [...state.districtsList, ...(res.data.districts || [])],
      //       districtsPage: res.data.page || page,
      //       districtsTotalPages: res.data.totalPages || 0,
      //     }));
      //   } catch (error) {
      //     set({ error: error.message || "Failed to fetch districts." });
      //   } finally {
      //     set({ isDistrictsLoading: false });
      //   }
      // },
      scrollFetchCities: async (page = 1, districtId = null) => {
  set({ isLoading: true, error: null });
  try {
    const res = districtId
      ? await getCities(page, get().limit, districtId)
      : await getCities(page, get().limit);
      console.log(res);
      
    set((state) => ({
      scrollListedCities:
        page === 1
          ? res.data.cities || []
          : [...state.listedCities, ...(res.data.cities || [])],
      page: res.data.page || page,
      totalPages: res.data.totalPages || 0,
      
    })
  
  );
    
  } catch (error) {
    set({ error: error.message || "Failed to fetch cities." });
  } finally {
    set({ isLoading: false });
  }
},

      fetchDistricts: async (page = 1, stateId = null) => {
        set({ isDistrictsLoading: true, error: null });
        try {
          const res = await getDistricts(page, get().limit, stateId);
          set((state) => ({
            districtsList:
              page === 1
                ? res.data.districts || []
                : [...state.districtsList, ...(res.data.districts || [])],
            districtsPage: res.data.page || page,
            districtsTotalPages: res.data.totalPages || 0,
          }));
        } catch (error) {
          set({ error: error.message || "Failed to fetch districts." });
        } finally {
          set({ isDistrictsLoading: false });
        }
      },

      // fetchCities: async (page = 1) => {
      //   set({ isLoading: true, error: null });
      //   try {
      //     const res = await getCities(page, get().limit);
      //     set({
      //       listedCities: res.data.cities || [],
      //       page: res.data.page || page,
      //       totalPages: res.data.totalPages || 0,
      //     });
      //   } catch (error) {
      //     set({ error: error.message || "Failed to fetch cities." });
      //   } finally {
      //     set({ isLoading: false });
      //   }
      // },

      // --- Store code snippet ---
      fetchCities: async (page = 1, districtId = null) => {
        set({ isLoading: true, error: null });
        try {
          const res = districtId
            ? await getCities(page, get().limit, districtId)
            : await getCities(page, get().limit);
          set({
            listedCities: res.data.cities || [],
            page: res.data.page || page,
            totalPages: res.data.totalPages || 0,
          });
        } catch (error) {
          set({ error: error.message || "Failed to fetch cities." });
        } finally {
          set({ isLoading: false });
        }
      },

      

      toggleCheckedId: (id) => {
        const checkedIds = get().checkedIds;
        set({ checkedIds: checkedIds.includes(id) ? [] : [id] });
      },

      saveCities: async () => {
        set({ isLoading: true, error: null, success: false });
        try {
          const filtered = get()
            .cities.filter(
              (c) => c.name.trim() !== "" && get().selectedDistrictId !== ""
            )
            .map((c) => ({
              name: c.name.trim(),
              districtId: get().selectedDistrictId,
            }));
          if (filtered.length === 0) {
            set({
              error: "Please enter at least one city and select a district.",
            });
            return;
          }
          await addCities(filtered);
          set({
            success: true,
            cities: [{ name: "", districtId: "" }],
            error: null,
          });
        } catch (error) {
          set({
            error: error.message || "Failed to save cities.",
            success: false,
          });
        } finally {
          set({ isLoading: false });
        }
      },

      // updateCityById: async (id, data) => {
      //   set({ isLoading: true, error: null });
      //   try {
      //     await updateCity(id, data);
      //     await get().fetchCities(get().page);
      //     set({ success: true, checkedIds: [] });
      //   } catch (error) {
      //     set({ error: error.message || "Failed to update city." });
      //     throw error;
      //   } finally {
      //     set({ isLoading: false });
      //   }
      // },

      // deleteCityById: async (id) => {
      //   set({ isLoading: true, error: null });
      //   try {
      //     await deleteCity(id);
      //     const { page, fetchCities, listedCities } = get();
      //     const newPage = listedCities.length === 1 && page > 1 ? page - 1 : page;
      //     set({ checkedIds: [] });
      //     await fetchCities(newPage);
      //     set({ page: newPage });
      //   } catch (error) {
      //     set({ error: error.message || "Failed to delete city." });
      //   } finally {
      //     set({ isLoading: false });
      //   }
      // },

      updateCityById: async (id, data, districtId, page) => {
        set({ isLoading: true, error: null });
        try {
          await updateCity(id, data);
          await get().fetchCities(page, districtId);
          set({ success: true, checkedIds: [] });
        } catch (error) {
          set({ error: error.message || "Failed to update city." });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      deleteCityById: async (id, districtId, page) => {
        set({ isLoading: true, error: null });
        try {
          await deleteCity(id);
          const st = get();
          // recalculate new page if the last city is deleted
          const newPage =
            st.listedCities.length === 1 && page > 1 ? page - 1 : page;
          set({ checkedIds: [] });
          await get().fetchCities(newPage, districtId);
          set({ page: newPage });
        } catch (error) {
          set({ error: error.message || "Failed to delete city." });
        } finally {
          set({ isLoading: false });
        }
      },

      resetSuccess: () => set({ success: false }),
      setPage: (page) => set({ page }),
    }),
    {
      name: "city-storage",
      partialize: (state) => ({
        cities: state.cities,
        districtsList: state.districtsList,
        districtsPage: state.districtsPage,
        districtsTotalPages: state.districtsTotalPages,
        listedCities: state.listedCities,
        page: state.page,
        totalPages: state.totalPages,
        limit: state.limit,
        checkedIds: state.checkedIds,
        // selectedDistrictId: state.selectedDistrictId,
        isLoading: state.isLoading,
        isDistrictsLoading: state.isDistrictsLoading,
        error: state.error,
        success: state.success,
      }),
    }
  )
);

export default useCityStore;
