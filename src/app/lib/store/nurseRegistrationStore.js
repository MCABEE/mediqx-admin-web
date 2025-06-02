import { create } from "zustand";
import { registerNurse } from "@/api/addStaffNurseApi";

const useNurseRegistrationStore = create((set) => ({
  isLoading: false,
  error: null,
  successData: null,
  userId: null,  // <-- add userId here

  registerNurse: async (nurseData) => {
    set({ isLoading: true, error: null, successData: null, userId: null });
    try {
      const result = await registerNurse(nurseData);
      set({ successData: result, userId: result?.data?.userId || null });

      // get current state
      const currentUserId = result?.data?.userId;
      console.log(currentUserId);

      return result;
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },    

  clearStatus: () => {
    set({ error: null, successData: null, userId: null });
  },
}));

export default useNurseRegistrationStore;
