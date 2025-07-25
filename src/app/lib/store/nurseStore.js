import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getNurses, getNurseById, verifyNurseStatus,updateNurse,updateNurseAvailability ,updateNurseExperience } from "@/api/nurseApi"; 

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

      fetchNurses: async (page = 1, limit = 10,status) => {
        set({ isLoading: true, error: null });
        try {
          const response = await getNurses(page, limit,status);
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




updateAvailability: async (userId, payload) => {
  set({ isLoading: true, error: null });
  try {
    const result = await updateNurseAvailability(userId, payload.availabilities); // pass only the array
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
