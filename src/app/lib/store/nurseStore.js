import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getNurses,
  getNurseById,
  verifyNurseStatus,
  updateNurse,
  updateNurseAvailability,
  updateNurseExperience,
  getAssignableNurses,
  getNurseCalendar,
  searchNurses,
  getNurseProfileById,
  getNurseQualificationById
} from "@/api/nurseApi";

const useNurseStore = create(
  persist(
    (set, get) => ({
      users: [],
      isLoading: false,
      error: null,
      page: 1,
      limit: 10,
      totalPages: 0,
      totalUsers: 0,
      selectedNurse: null,
      calendarData: null,
      selectedNurseProfile:null, 
      selectedNurseQualification:null, 


      // fetchNurses: async (page = 1, limit = 10, status , role) => {
      //   set({ isLoading: true, error: null });
      //   try {
      //     const response = await getNurses(page, limit, status,role);
      //     const nurseData = response?.data?.data?.users || [];
      //     set({
      //       users: nurseData,
      //       page,
      //       limit,
      //       totalPages: response?.data?.data?.totalPages || 0,
      //       totalUsers: response?.data?.data?.total || 0,
      //     });
      //     console.log("Fetched nurses:", nurseData);
      //   } catch (error) {
      //     set({ error: error.message });
      //     console.error("Error fetching nurses:", error);
      //   } finally {
      //     set({ isLoading: false });
      //   }
      // },


  // Filters
  search: "",
  location: "",
  qualifications: "",
  gender: "",

  // Actions
  setFilter: (key, value) => set({ [key]: value, page: 1 }),

  clearFilters: () =>
    set({
      search: "",
      location: "",
      qualifications: "",
      gender: "",
      page: 1,
    }),

  setPage: (page) => set({ page }),

  // Fetch Nurses
  fetchNurses: async (
    page = get().page,
    limit = get().limit,
    status = "ALL",
    role = "REGISTERED_NURSE",
    filters
  ) => {
    set({ isLoading: true, error: null });

    const currentFilters = filters || {
      search: get().search,
      location: get().location,
      qualifications: get().qualifications,
      gender: get().gender,
    };

    try {
      const response = await getNurses(page, limit, status, role, currentFilters);
      const nurseData = response?.data?.data?.users || [];
      set({
        users: nurseData,
        page,
        limit,
        totalPages: response?.data?.data?.totalPages || 0,
        totalUsers: response?.data?.data?.total || 0,
      });
    } catch (error) {
      set({ error: error.message, users: [], totalPages: 0, totalUsers: 0 });
      console.error("Error fetching nurses:", error);
    } finally {
      set({ isLoading: false });
    }
  },
      fetchNurseById: async (userId) => {
        set({ isLoading: true, error: null });
        try {
          const nurseDetails = await getNurseById(userId);
          set({ selectedNurse: nurseDetails });
          console.log("Fetched nurse details:", nurseDetails);
        } catch (error) {
          set({ error: error.message });
          console.error("Error fetching nurse details:", error);
        } finally {
          set({ isLoading: false });
        }
      },

       fetchNurseProfileById: async (userId) => {
        set({ isLoading: true, error: null });
        try {
          const nurseDetails = await getNurseProfileById(userId);
          set({ selectedNurseProfile: nurseDetails });
          console.log("Fetched nurse details:", nurseDetails);
        } catch (error) {
          set({ error: error.message });
          console.error("Error fetching nurse details:", error);
        } finally {
          set({ isLoading: false });
        }
      },

         fetchNurseQualificationById: async (userId) => {
        set({ isLoading: true, error: null });
        try {
          const nurseDetails = await getNurseQualificationById(userId);
          set({ selectedNurseQualification: nurseDetails });
          console.log("Fetched nurse details:", nurseDetails);
        } catch (error) {
          set({ error: error.message });
          console.error("Error fetching nurse details:", error);
        } finally {
          set({ isLoading: false });
        }
      },


      verifyNurse: async (nurseId, status) => {
        set({ isLoading: true, error: null });
        try {
          const result = await verifyNurseStatus(nurseId, status);
          console.log(`Nurse status updated to ${status}:`, result);

          // Optional: refresh nurse list or details after update
          await get().fetchNurses(get().page, get().limit);
        } catch (error) {
          set({ error: error.message });
          console.error("Verification error:", error.message);
        } finally {
          set({ isLoading: false });
        }
      },

      updateAvailability: async (userId, payload) => {
        set({ isLoading: true, error: null });
        try {
          const result = await updateNurseAvailability(
            userId,
            payload.availabilities
          ); // pass only the array
          console.log("✅ Availability updated:", result);
          await get().fetchNurseById(userId);
          return result;
        } catch (error) {
          set({ error: error.message });
          throw new Error(error.message);
        } finally {
          set({ isLoading: false });
        }
      },

      updateNurseDetails: async (userId, nurseData) => {
        set({ isLoading: true, error: null });
        try {
          const result = await updateNurse(userId, nurseData);
          console.log("Nurse updated successfully:", result);

          // Optionally refresh nurse details or list
          await get().fetchNurseById(userId);
          await get().fetchNurses(get().page, get().limit);

          return result;
        } catch (error) {
          set({ error: error.message });
          throw new Error(error.message);
        } finally {
          set({ isLoading: false });
        }
      },

      updateExperience: async (userId, payload) => {
        set({ isLoading: true, error: null });
        try {
          const result = await updateNurseExperience(userId, payload);
          console.log("Experience updated successfully:", result);

          // Refresh nurse details if needed
          await get().fetchNurseById(userId);
          return result;
        } catch (error) {
          set({ error: error.message });
          throw new Error(error.message);
        } finally {
          set({ isLoading: false });
        }
      },

    
      fetchAssignableNurses: async (params) => {
    set({ isLoading: true, error: null });

    try {
      const data = await getAssignableNurses(params);
      set({
        users: data?.data?.users || [], 
        totalPages: data?.data?.totalPages || 0,
        totalUsers: data?.data?.total || 0,
      });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
      fetchNurseCalendar: async (userId, monthStart, monthEnd) => {
        set({ isLoading: true, error: null });
        try {
          const data = await getNurseCalendar(userId, monthStart, monthEnd);
          set({ calendarData: data });
          return data;
        } catch (error) {
          set({ error: error.message });
          throw new Error(error.message);
        } finally {
          set({ isLoading: false });
        }
      },

      searchNurses: async (page = 1, limit = 10, status, search = "") => {
        set({ isLoading: true, error: null });
        try {
          const response = await searchNurses(page, limit, status, search);
          const nurseData = response?.data?.data?.users || [];
          set({
            users: nurseData,
            page,
            limit,
            totalPages: response?.data?.data?.totalPages || 0,
            totalUsers: response?.data?.data?.total || 0,
          });
        } catch (error) {
          set({ error: error.message });
        } finally {
          set({ isLoading: false });
        }
      },

      setPage: (newPage) => set({ page: newPage }),
      setLimit: (newLimit) => set({ limit: newLimit }),
    }),
    {
      name: "nurse-storage", // Name of the key in localStorage
      partialize: (state) => ({
        users: state.users,
        page: state.page,
        limit: state.limit,
        totalPages: state.totalPages,
        totalUsers: state.totalUsers,
        selectedNurse: state.selectedNurse,
      }),
    }
  )
);

export default useNurseStore;
