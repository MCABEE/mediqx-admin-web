import { create } from "zustand";
import {
  registerNurse,
  submitNursePageTwo,
  submitNursePageThree,
   generateFileUploadUrlAPI,
  confirmFileUploadAPI,
} from "@/api/addStaffNurseApi";

const useNurseRegistrationStore = create((set, get) => ({
  isLoading: false,
  error: null,
  successData: null,
  userId: null,

  // Page 1 Registration
  registerNurse: async (nurseData) => {
    set({ isLoading: true, error: null, successData: null, userId: null });
    try {
      const result = await registerNurse(nurseData);
      const userId = result?.data?.userId;
      set({ successData: result, userId });
      return result;
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Page 2 Experience Submission
  submitNursePageTwo: async (pageTwoData) => {
    set({ isLoading: true, error: null });
    try {
      const userId = get().userId;
      if (!userId) throw new Error("User ID is missing");

      const payload = { ...pageTwoData, userId };
      const result = await submitNursePageTwo(payload);
      return result;
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Page 3 Submission
  submitNursePageThree: async (pageThreeData) => {
    set({ isLoading: true, error: null });
    try {
      const userId = get().userId;
      if (!userId) throw new Error("User ID is missing");

      const payload = { ...pageThreeData, userId };
      const result = await submitNursePageThree(payload);
      return result;
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },



  uploadedFiles: {
    nursingCertificate: null,
    councilRegistration: null,
    experienceCertificate: null,
    photo: null,
  },

  generateUploadUrl: async ({ fileName, contentType, type }) => {
    const userId = get().userId;
    if (!userId) throw new Error("User ID not found");

    const result = await generateFileUploadUrlAPI({
      userId,
      fileName,
      contentType,
      type,
    });

    if (!result.success) throw new Error(result.error);
    return result.data;
  },

  confirmFileUpload: async (fileId,type) => {
    const result = await confirmFileUploadAPI(fileId,type);
    if (!result.success) throw new Error(result.error);
    return result.data;
  },

  setUploadedFile: (field, fileId) => {
    set((state) => ({
      uploadedFiles: {
        ...state.uploadedFiles,
        [field]: fileId,
      },
    }));
  },

  // Reset error/success/userId
  clearStatus: () => {
    set({ error: null, successData: null, userId: null });
  },
}));

export default useNurseRegistrationStore;