import { create } from "zustand";
import {
  fetchSupervisorDetails,
  fetchSupervisors,
  registerSupervisor,
  submitSupervisorPageTwo,
} from "@/api/addSupervisorApi";
import {
  confirmFileUploadAPI,
  generateFileUploadUrlAPI,
} from "@/api/addStaffNurseApi";

const useSupervisorRegistrationStore = create((set, get) => ({
  isLoading: false,
  error: null,
  successData: null,
  userId: null,
  supervisorId: null,

  // PAGE 1
  registerSupervisor: async (data) => {
    set({ isLoading: true, error: null, successData: null, userId: null });
    try {
      const result = await registerSupervisor(data);
      // Expecting API shape: { success: true, data: { userId: "..." } } OR { userId: "..." }
      // Normalize: try result.data.userId then result.userId
      const userId = result?.data?.userId || result?.userId || null;
      set({ successData: result, userId });
      return result;
    } catch (err) {
      set({ error: err.message || String(err) });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  // PAGE 2
  submitSupervisorPageTwo: async (pageTwoData) => {
    set({ isLoading: true, error: null });
    try {
      const userId = get().userId;
      if (!userId) throw new Error("User ID missing. Complete page 1 first.");
      const payload = { ...pageTwoData, userId };
      const res = await submitSupervisorPageTwo(payload);
      console.log(res.data.supervisorId);

      set({
        successData: res,
        supervisorId: res.data.supervisorId,
      });
      return res;
    } catch (err) {
      set({ error: err.message || String(err) });
      throw err;
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

  generateUploadUrlDetail: async ({ userId, fileName, contentType, type }) => {
    if (!userId) throw new Error("User ID not found");

    const result = await generateFileUploadUrlAPI({
      userId,
      fileName,
      contentType,
      type,
    });

    if (!result.success) throw new Error(result.error);
    return result.data; // { signedUrl, fileId }
  },

  // confirmFileUpload: async (fileId, type) => {
  //   const result = await confirmFileUploadAPI(fileId, type);
  //   if (!result.success) throw new Error(result.error);
  //   return result.data;

  // },

  confirmFileUpload: async (fileId, type) => {
    const result = await confirmFileUploadAPI(fileId, type);

    if (!result.success) throw new Error(result.error);

    // Extract the actual fileId from nested response
    const confirmedFileId = result.data?.data?.fileId;
    if (!confirmedFileId)
      throw new Error("File ID not returned from confirm API");

    return { fileId: confirmedFileId };
  },

  setUploadedFile: (field, fileId) => {
    set((state) => ({
      uploadedFiles: {
        ...state.uploadedFiles,
        [field]: fileId,
      },
    }));
  },

  clearStatus: () => set({ error: null, successData: null, userId: null }),



   supervisors: [],
  total: 0,
  page: 1,
  limit: 10,
  filter: "ALL",
  search: "",
  loading: false,
  error: null,
  supervisor:null,  

  getSupervisors: async () => {
    const { page, limit, filter, search } = get();

    set({ loading: true, error: null });

    try {
      const res = await fetchSupervisors({ page, limit, filter, search });

      set({
        supervisors: res?.data?.supervisors || [],
        total: res?.data?.total || 0,
      });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
    getSupervisorDetails: async (id) => {
    set({ loading: true, error: null });

    try {
      const res = await fetchSupervisorDetails(id);

      set({
        supervisor: res?.data || null,
      });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  setPage: (page) => set({ page }),
  setSearch: (search) => set({ search }),
  setFilter: (filter) => set({ filter }),
  clearFilters: () => set({ search: "", filter: "ALL", page: 1 }),
}));

export default useSupervisorRegistrationStore;
