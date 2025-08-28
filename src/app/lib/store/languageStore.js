// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { addLanguages } from "@/api/languagesApi";

// const useLanguageStore = create(
//   persist(
//     (set) => ({
//       languages: [""],
//       isLoading: false,
//       error: null,
//       success: false,
//       setLanguages: (arr) => set({ languages: arr }),
//       addLanguageInput: () =>
//         set((state) => ({ languages: [...state.languages, ""] })),
//       setLanguageValue: (idx, value) =>
//         set((state) => {
//           const newArr = [...state.languages];
//           newArr[idx] = value;
//           return { languages: newArr };
//         }),
//       saveLanguages: async () => {
//         set({ isLoading: true, error: null, success: false });
//         try {
//           // Only non-empty unique languages
//           const filtered = Array.from(
//             new Set(
//               useLanguageStore
//                 .getState()
//                 .languages.filter((lang) => lang.trim() !== "")
//                 .map((lang) => ({ language: lang.trim() }))
//             )
//           );
//           if (filtered.length === 0) {
//             set({ error: "Please enter at least one language." });
//             return;
//           }
//           await addLanguages(filtered);
//           set({ success: true, languages: [""], error: null });
//         } catch (error) {
//           set({ error: error.message, success: false });
//         } finally {
//           set({ isLoading: false });
//         }
//       },
//       resetSuccess: () => set({ success: false }),
//     }),
//     {
//       name: "language-storage",
//       partialize: (state) => ({
//         languages: state.languages,
//       }),
//     }
//   )
// );

// export default useLanguageStore;





// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { addLanguages, getLanguages } from "@/api/languagesApi";

// const useLanguageStore = create(
//   persist(
//     (set, get) => ({
//       // --- Add Languages State ---
//       languages: [""], // Dynamic language inputs for adding
//       isLoading: false,
//       error: null,
//       success: false,

//       setLanguages: (arr) => set({ languages: arr }),
//       addLanguageInput: () =>
//         set((state) => ({ languages: [...state.languages, ""] })),
//       setLanguageValue: (idx, value) =>
//         set((state) => {
//           const arr = [...state.languages];
//           arr[idx] = value;
//           return { languages: arr };
//         }),
//       saveLanguages: async () => {
//         set({ isLoading: true, error: null, success: false });
//         try {
//           const filtered = Array.from(
//             new Set(
//               get()
//                 .languages
//                 .filter((lang) => lang.trim() !== "")
//                 .map((lang) => ({ language: lang.trim() }))
//             )
//           );
//           if (filtered.length === 0) {
//             set({ error: "Please enter at least one language." });
//             return;
//           }
//           await addLanguages(filtered);
//           set({ success: true, languages: [""], error: null });
//         } catch (error) {
//           set({ error: error.message, success: false });
//         } finally {
//           set({ isLoading: false });
//         }
//       },
//       resetSuccess: () => set({ success: false }),

//       // --- Listing & Pagination State ---
//       listedLanguages: [],   // List fetched from GET API
//       page: 1,
//       limit: 10,
//       totalPages: 0,
//       totalLanguages: 0,
//       checkedIds: [],

//       fetchLanguages: async (page = 1, limit = 10) => {
//         set({ isLoading: true, error: null });
//         try {
//           const response = await getLanguages(page, limit);
//           console.log(response);
          
//           set({
//             listedLanguages: response.data.languages || [],
//             page: response.data.page || page,
//             limit: response.data.limit || limit,
//             totalPages: response.data.totalPages || 0,
//             totalLanguages: response.data.total || 0,
//           });
//         } catch (error) {
//           set({ error: error.message });
//         } finally {
//           set({ isLoading: false });
//         }
//       },

//       setPage: (newPage) => set({ page: newPage }),
//       setLimit: (newLimit) => set({ limit: newLimit }),

//       setCheckedIds: (ids) => set({ checkedIds: ids }),

//       toggleCheckedId: (id) => {
//         const checkedIds = get().checkedIds;
//         set({
//           checkedIds: checkedIds.includes(id)
//             ? checkedIds.filter((item) => item !== id)
//             : [...checkedIds, id],
//         });
//       },

//       resetChecked: () => set({ checkedIds: [] }),
//     }),
//     {
//       name: "language-storage",
//       partialize: (state) => ({
//         languages: state.languages,
//         listedLanguages: state.listedLanguages,
//         page: state.page,
//         limit: state.limit,
//         totalPages: state.totalPages,
//         totalLanguages: state.totalLanguages,
//         checkedIds: state.checkedIds,
//       }),
//     }
//   )
// );

// export default useLanguageStore;







// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { addLanguages, getLanguages, deleteLanguage } from "@/api/languagesApi";

// const useLanguageStore = create(
//   persist(
//     (set, get) => ({
//       // --- Add Languages State ---
//       languages: [""],
//       isLoading: false,
//       error: null,
//       success: false,

//       setLanguages: (arr) => set({ languages: arr }),
//       addLanguageInput: () =>
//         set((state) => ({ languages: [...state.languages, ""] })),
//       setLanguageValue: (idx, value) =>
//         set((state) => {
//           const arr = [...state.languages];
//           arr[idx] = value;
//           return { languages: arr };
//         }),
//       saveLanguages: async () => {
//         set({ isLoading: true, error: null, success: false });
//         try {
//           const filtered = Array.from(
//             new Set(
//               get()
//                 .languages
//                 .filter((lang) => lang.trim() !== "")
//                 .map((lang) => ({ language: lang.trim() }))
//             )
//           );
//           if (filtered.length === 0) {
//             set({ error: "Please enter at least one language." });
//             return;
//           }
//           await addLanguages(filtered);
//           set({ success: true, languages: [""], error: null });
//         } catch (error) {
//           set({ error: error.message, success: false });
//         } finally {
//           set({ isLoading: false });
//         }
//       },
//       resetSuccess: () => set({ success: false }),

//       // --- Listing & Pagination State ---
//       listedLanguages: [],
//       page: 1,
//       limit: 10,
//       totalPages: 0,
//       totalLanguages: 0,

//       checkedIds: [],

//       fetchLanguages: async (page = 1, limit = 10) => {
//         set({ isLoading: true, error: null });
//         try {
//           const response = await getLanguages(page, limit);
//           set({
//             listedLanguages: response.data.languages || [],
//             page: response.data.page || page,
//             limit: response.data.limit || limit,
//             totalPages: response.data.totalPages || 0,
//             totalLanguages: response.data.total || 0,
//           });
//         } catch (error) {
//           set({ error: error.message });
//         } finally {
//           set({ isLoading: false });
//         }
//       },

//       setPage: (newPage) => set({ page: newPage }),
//       setLimit: (newLimit) => set({ limit: newLimit }),

//       setCheckedIds: (ids) => set({ checkedIds: ids }),

//       toggleCheckedId: (id) => {
//         const checkedIds = get().checkedIds;
//         set({
//           checkedIds: checkedIds.includes(id)
//             ? checkedIds.filter((item) => item !== id)
//             : [...checkedIds, id],
//         });
//       },

//       resetChecked: () => set({ checkedIds: [] }),

//       // --- Delete Language By ID ---
//       deleteLanguageById: async (id) => {
//         set({ isLoading: true, error: null });
//         try {
//           await deleteLanguage(id);
//           const { page, limit, fetchLanguages, listedLanguages } = get();
//           // If last item on last page deleted, update page to previous if possible
//           const newPage =
//             listedLanguages.length === 1 && page > 1 ? page - 1 : page;
//           set({ checkedIds: [] });
//           await fetchLanguages(newPage, limit);
//           set({ page: newPage });
//         } catch (error) {
//           set({ error: error.message });
//         } finally {
//           set({ isLoading: false });
//         }
//       },
//     }),
//     {
//       name: "language-storage",
//       partialize: (state) => ({
//         languages: state.languages,
//         listedLanguages: state.listedLanguages,
//         page: state.page,
//         limit: state.limit,
//         totalPages: state.totalPages,
//         totalLanguages: state.totalLanguages,
//         checkedIds: state.checkedIds,
//       }),
//     }
//   )
// );

// export default useLanguageStore;






import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addLanguages, getLanguages, deleteLanguage, updateLanguage } from "@/api/languagesApi";

const useLanguageStore = create(
  persist(
    (set, get) => ({
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
          const filtered = Array.from(
            new Set(
              get()
                .languages
                .filter((lang) => lang.trim() !== "")
                .map((lang) => ({ language: lang.trim() }))
            )
          );
          if (filtered.length === 0) {
            set({ error: "Please enter at least one language." });
            return;
          }
          await addLanguages(filtered);
          set({ success: true, languages: [""], error: null });
        } catch (error) {
          set({ error: error.message, success: false });
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
      setCheckedIds: (ids) => set({ checkedIds: ids.length > 1 ? [ids[ids.length - 1]] : ids }),

      toggleCheckedId: (id) => {
        const checkedIds = get().checkedIds;
        if (checkedIds.includes(id)) {
          // uncheck the only one
          set({ checkedIds: [] });
        } else {
          // select only one at a time
          set({ checkedIds: [id] });
        }
      },

      resetChecked: () => set({ checkedIds: [] }),

      deleteLanguageById: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await deleteLanguage(id);
          const { page, limit, fetchLanguages, listedLanguages } = get();
          const newPage = listedLanguages.length === 1 && page > 1 ? page - 1 : page;
          set({ checkedIds: [] });
          await fetchLanguages(newPage, limit);
          set({ page: newPage });
        } catch (error) {
          set({ error: error.message });
        } finally {
          set({ isLoading: false });
        }
      },

    //   updateLanguageById: async (id, language) => {
    //     set({ isLoading: true, error: null });
    //     try {
    //       await updateLanguage(id, { language });
    //       const { page, limit, fetchLanguages } = get();
    //       await fetchLanguages(page, limit);
    //       set({ success: true });
    //     } catch (error) {
    //       set({ error: error.message });
    //     } finally {
    //       set({ isLoading: false });
    //     }
    //   },

    updateLanguageById: async (id, language) => {
  set({ isLoading: true, error: null });
  try {
    await updateLanguage(id, { language });
    const { page, limit, fetchLanguages } = get();
    await fetchLanguages(page, limit);
    set({ success: true });
  } catch (error) {
    set({ error: error.message });
    throw error;   // <-- Propagate error to component for catching
  } finally {
    set({ isLoading: false });
  }
},

    }),
    {
      name: "language-storage",
      partialize: (state) => ({
        languages: state.languages,
        listedLanguages: state.listedLanguages,
        page: state.page,
        limit: state.limit,
        totalPages: state.totalPages,
        totalLanguages: state.totalLanguages,
        checkedIds: state.checkedIds,
      }),
    }
  )
);

export default useLanguageStore;
