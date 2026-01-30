import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchList, updateItem, deleteItem } from "@/api/professionalsApi";

const CATEGORIES = [
  "specializations",
  "qualifications",
  "working-departments",
  "skills",
];

const STORE_TO_API_MAP = {
  specializations: "specializations",
  qualifications: "qualifications",
  "working-departments": "workingDepartments",
  skills: "skills",
};

const useManageProfessionalsStore = create(
  persist(
    (set, get) => ({
      listedItems: {
        specializations: [],
        qualifications: [],
        "working-departments": [],
        skills: [],
      },
      pagination: {
        specializations: { page: 1, limit: 10, totalPages: 0, totalItems: 0 },
        qualifications: { page: 1, limit: 10, totalPages: 0, totalItems: 0 },
        "working-departments": {
          page: 1,
          limit: 10,
          totalPages: 0,
          totalItems: 0,
        },
        skills: { page: 1, limit: 10, totalPages: 0, totalItems: 0 },
      },

      isLoading: false,
      error: null,
      success: false,

      // fetchItems: async (
      //   category,
      //   page = 1,
      //   limit = 10,
      //   professionalCategory
      // ) => {
      //   if (!CATEGORIES.includes(category)) {
      //     set({ error: `Unknown category: ${category}` });
      //     return;
      //   }
      //   set({ isLoading: true, error: null, success: false });
      //   try {
      //     // Pass professionalCategory as query param in API call
      //     const response = await fetchList(
      //       category,
      //       page,
      //       limit,
      //       professionalCategory
      //     );
      //     const data = response.data;
      //     const key = STORE_TO_API_MAP[category];
      //     set((state) => ({
      //       listedItems: {
      //         ...state.listedItems,
      //         [category]: data?.[key] || [],
      //       },
      //       pagination: {
      //         ...state.pagination,
      //         [category]: {
      //           page: data.page || page,
      //           limit: data.limit || limit,
      //           totalPages: data.totalPages || 0,
      //           totalItems: data.total || 0,
      //         },
      //       },
      //       error: null,
      //     }));
      //   } catch (error) {
      //     set({ error: error.message || "Failed to fetch data." });
      //   } finally {
      //     set({ isLoading: false });
      //   }
      // },
fetchItems: async (
  category,
  page = 1,
  limit = 10,
  professionalCategory,
  search = ""
) => {
  if (!CATEGORIES.includes(category)) {
    set({ error: `Unknown category: ${category}` });
    return;
  }

  set({ isLoading: true, error: null, success: false });

  try {
    const response = await fetchList(
      category,
      page,
      limit,
      professionalCategory,
      search
    );

    const data = response.data;
    const key = STORE_TO_API_MAP[category];

    set((state) => ({
      listedItems: {
        ...state.listedItems,
        [category]: data?.[key] || [],
      },
      pagination: {
        ...state.pagination,
        [category]: {
          page: data.page || page,
          limit: data.limit || limit,
          totalPages: data.totalPages || 0,
          totalItems: data.total || 0,
        },
      },
      error: null,
    }));
  } catch (error) {
    set({ error: error.message || "Failed to fetch data." });
  } finally {
    set({ isLoading: false });
  }
},

      setPage: (category, page) =>
        set((state) => ({
          pagination: {
            ...state.pagination,
            [category]: {
              ...state.pagination[category],
              page,
            },
          },
        })),

  
      updateItemId: async (category, id, data, professionalCategory) => {
        if (!CATEGORIES.includes(category)) {
          set({ error: `Unknown category: ${category}` });
          return;
        }
        set({ isLoading: true, error: null, success: false });
        try {
          // Update the item without adding 'category' key to the data payload
          await updateItem(category, id, data);

          // Fetch updated list, passing back category and professionalCategory explicitly
          const { page, limit } = get().pagination[category];
          await get().fetchItems(category, page, limit, professionalCategory);

          set({ success: true });
        } catch (error) {
          set({
            error: error.message || "Failed to update item",
            success: false,
          });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      deleteItemId: async (category, id, professionalCategory) => {
        if (!CATEGORIES.includes(category)) {
          set({ error: `Unknown category: ${category}` });
          return;
        }
        set({ isLoading: true, error: null, success: false });
        try {
          await deleteItem(category, id);
          const { page, limit, totalItems } = get().pagination[category];
          const newTotal = totalItems - 1;
          const newPage =
            newTotal <= (page - 1) * limit && page > 1 ? page - 1 : page;
          set({ error: null });
          await get().fetchItems(
            category,
            newPage,
            limit,
            professionalCategory
          );
          // This calls the public setPage method to update pagination
          get().setPage(category, newPage);
        } catch (error) {
          set({ error: error.message || "Failed to delete item" });
        } finally {
          set({ isLoading: false });
        }
      },

      resetSuccess: () => set({ success: false }),
      clearError: () => set({ error: null }),
    }),
    {
      name: "professionals-management-storage",
      partialize: (state) => ({
        listedItems: state.listedItems,
        pagination: state.pagination,
      }),
    }
  )
);

export default useManageProfessionalsStore;
