import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getNurses, getNurseById, verifyNurseStatus } from "@/api/nurseApi"; // Make sure this path is correct

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

      fetchNurses: async (page = 1, limit = 10) => {
        set({ isLoading: true, error: null });
        try {
          const response = await getNurses(page, limit);
          const nurseData = response?.data?.data?.users || [];
          set({
            users: nurseData,
            page, 
            limit,
            totalPages: response?.data?.data?.totalPages || 0,
            totalUsers: response?.data?.data?.total || 0,
          
          });
          console.log("Fetched nurses:", nurseData);
        } catch (error) {
          set({ error: error.message });
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
