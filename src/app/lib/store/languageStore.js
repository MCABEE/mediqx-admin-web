import { create } from "zustand";
import {
  addLanguages,
  getLanguages,
  deleteLanguage,
  updateLanguage,
  updateNurseLanguages,
} from "@/api/languagesApi";

const useLanguageStore = create((set, get) => ({
  languages: [""],
  isLoading: false,
  error: null,
  success: false,

  setLanguages: (arr) => set({ languages: arr }),
  addLanguageInput: () =>
    set((state) => ({ languages: [...state.languages, ""] })),
  setLanguageValue: (idx, value) =>
    set((state) => {
      const arr = [...state.languages];
      arr[idx] = value;
      return { languages: arr };
    }),

  saveLanguages: async () => {
    set({ isLoading: true, error: null, success: false });

    try {
      const languages = get().languages.map((l) => l.trim()).filter(Boolean);

      if (languages.length === 0) {
        set({ error: "Please enter at least one language." });
        return;
      }

      // Remove local duplicates before sending
      const uniqueLanguages = Array.from(new Set(languages)).map((l) => ({
        language: l,
      }));

      await addLanguages(uniqueLanguages);

      set({ success: true, languages: [""], error: null });
    } catch (error) {
      // Handle API duplicates (409)
      const duplicates =
        error.response?.data?.error?.details?.duplicates?.map(
          (d) => d.value
        ) || [];

      if (duplicates.length > 0) {
        set({ error: "Some languages already exist: " + duplicates.join(", ") });
      } else {
        set({ error: error.message });
      }

      set({ success: false });
      throw error; // re-throw so component can mark duplicates
    } finally {
      set({ isLoading: false });
    }
  },

  resetSuccess: () => set({ success: false }),

  listedLanguages: [],
  page: 1,
  limit: 10,
  totalPages: 0,
  totalLanguages: 0,

  checkedIds: [], // now always max one selected

  fetchLanguages: async (page = 1, limit = 10) => {
    set({ isLoading: true, error: null });
    try {
      const response = await getLanguages(page, limit);
      set({
        listedLanguages: response.data.languages || [],
        page: response.data.page || page,
        limit: response.data.limit || limit,
        totalPages: response.data.totalPages || 0,
        totalLanguages: response.data.total || 0,
      });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  setPage: (newPage) => set({ page: newPage }),
  setLimit: (newLimit) => set({ limit: newLimit }),

  // Select only one language at a time
  setCheckedIds: (ids) =>
    set({ checkedIds: ids.length > 1 ? [ids[ids.length - 1]] : ids }),

  toggleCheckedId: (id) => {
    const checkedIds = get().checkedIds;
    if (checkedIds.includes(id)) {
      set({ checkedIds: [] });
    } else {
      set({ checkedIds: [id] });
    }
  },

  resetChecked: () => set({ checkedIds: [] }),

  deleteLanguageById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteLanguage(id);
      const { page, limit, fetchLanguages, listedLanguages } = get();
      const newPage =
        listedLanguages.length === 1 && page > 1 ? page - 1 : page;
      set({ checkedIds: [] });
      await fetchLanguages(newPage, limit);
      set({ page: newPage });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  updateLanguageById: async (id, language) => {
    set({ isLoading: true, error: null });
    try {
      await updateLanguage(id, { language });
      const { page, limit, fetchLanguages } = get();
      await fetchLanguages(page, limit);
      set({ success: true });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },






  // update languages for nurses

    updateNurseLanguages: async (userId, languageIds) => {
    try {
      const res = await updateNurseLanguages(userId, languageIds);
      return res;
    } catch (err) {
      console.error("❌ Failed to update nurse languages", err);
      throw err;
    }
  },



}));

export default useLanguageStore;
