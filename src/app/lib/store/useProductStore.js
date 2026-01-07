

import {
  createProductAPI,
  fetchProductsAPI,
  deleteProductAPI,
  generateFileUploadUrlAPI,
  confirmFileUploadAPI,
  fetchProductBookings,
  fetchProductBookingDetails,
  updateProductSalesStatus,
  updateProduct,
} from "@/api/product";
import { create } from "zustand";

const useProductStore = create((set, get) => ({
  /* ---------------- STATE ---------------- */
  loading: false,
  error: null,

  products: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1,

  uploadedFiles: {
    PRODUCT_IMAGE: null,
  },

  /* ---------------- FETCH PRODUCTS ---------------- */
  // fetchProducts: async (page = 1) => {
  //   set({ loading: true, error: null });

  //   try {
  //     const res = await fetchProductsAPI({
  //       page,
  //       limit: get().limit,
  //     });

  //     if (!res.success) throw new Error(res.message);

  //     set({
  //       products: res.data,
  //       page: res.page,
  //       limit: res.limit,
  //       total: res.total,
  //       totalPages: res.totalPages,
  //     });
  //   } catch (err) {
  //     set({ error: err.message });
  //   } finally {
  //     set({ loading: false });
  //   }
  // },



  fetchProducts: async (page = 1, search = "") => {
  set({ loading: true, error: null });

  try {
    const res = await fetchProductsAPI({
      page,
      limit: get().limit,
      search,
    });

    if (!res.success) throw new Error(res.message);

    set({
      products: res.data,
      page: res.page,
      limit: res.limit,
      total: res.total,
      totalPages: res.totalPages,
    });
  } catch (err) {
    set({ error: err.message });
  } finally {
    set({ loading: false });
  }
},

  /* ---------------- CREATE PRODUCT ---------------- */
  addProduct: async (payload) => {
    set({ loading: true, error: null });

    try {
      const res = await createProductAPI(payload);
      if (!res.success) throw new Error(res.message);
      return res.data;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  /* ---------------- DELETE PRODUCT ---------------- */
  // deleteProduct: async (productId) => {
  //   set({ loading: true, error: null });

  //   try {
  //     const res = await deleteProductAPI(productId);
  //     if (!res.success) throw new Error(res.message);

  //     // ✅ THIS WILL NOW WORK
  //     await get().fetchProducts(get().page);

  //     return true;
  //   } catch (err) {
  //     set({ error: err.message });
  //     throw err;
  //   } finally {
  //     set({ loading: false });
  //   }
  // },
// deleteProduct: async (productId) => {
//   set({ loading: true, error: null });

//   try {
//     const res = await deleteProductAPI(productId);
//     if (!res.success) throw new Error(res.message);

//     // ✅ IMMEDIATE UI UPDATE (THIS IS THE KEY)
//     set((state) => ({
//       products: state.products.filter(
//         (item) => item.product.id !== productId
//       ),
//     }));

//     // ✅ OPTIONAL: refetch to sync pagination
//     await get().fetchProducts(get().page);

//     return true;
//   } catch (err) {
//     set({ error: err.message });
//     throw err;
//   } finally {
//     set({ loading: false });
//   }
// },
deleteProduct: async (productId) => {
  set({ loading: true, error: null });

  try {
    const res = await deleteProductAPI(productId);

    // ✅ correct success check
    if (res.status !== "success") {
      throw new Error(res.message || "Failed to delete product");
    }

    // ✅ update UI immediately
    set((state) => ({
      products: state.products.filter(
        (item) => item.product.id !== productId
      ),
    }));

    return true;
  } catch (err) {
    set({ error: err.message });
    throw err;
  } finally {
    set({ loading: false });
  }
},

  /* ---------------- FILE UPLOAD ---------------- */
  generateUploadUrl: async ({ productId, fileName, contentType, type }) => {
    if (!productId) throw new Error("Product ID missing");

    const res = await generateFileUploadUrlAPI({
      userId: productId,
      fileName,
      contentType,
      type,
      productId,
    });

    if (!res.success) throw new Error(res.message);
    return res.data;
  },

  confirmFileUpload: async (fileId, type) => {
    const res = await confirmFileUploadAPI(fileId, type);
    if (!res.success) throw new Error(res.message);
    return res.data?.data?.fileId;
  },

  setUploadedFile: (type, fileId) => {
    set((state) => ({
      uploadedFiles: {
        ...state.uploadedFiles,
        [type]: fileId,
      },
    }));
  },


   bookings: [],
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,

  fetchBookings: async (page = 1) => {
    set({ loading: true, error: null });

    try {
      const res = await fetchProductBookings({
        page,
        limit: 10,
      });

      set({
        bookings: res.data.bookings,
        page: res.data.page,
        totalPages: res.data.totalPages,
      });
    } catch (err) {
      console.error("Fetch product bookings error:", err);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },


   details: null,
  loading: false,
  error: null,

  fetchDetails: async (patientId) => {
    if (!patientId) return;

    set({ loading: true, error: null });

    try {
      const res = await fetchProductBookingDetails(patientId);
console.log(res);

      set({
        details: res.data,
      });
    } catch (err) {
      console.error("Fetch booking details error:", err);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

   details: null,
  loading: false,
  updatingId: null,

  fetchDetails: async (patientId) => {
    if (!patientId) return;

    set({ loading: true });

    try {
      const res = await fetchProductBookingDetails(patientId);
      set({ details: res.data });
    } finally {
      set({ loading: false });
    }
  },

  updateSalesStatus: async (productCartId, salesStatus) => {
    set({ updatingId: productCartId });

    try {
      await updateProductSalesStatus(productCartId, salesStatus);

      // update UI instantly
      const { details } = get();

      const updatedBookings = details.bookings.map((item) =>
        item.productCartId === productCartId
          ? { ...item, salesStatus }
          : item
      );

      set({
        details: { ...details, bookings: updatedBookings },
      });
    } finally {
      set({ updatingId: null });
    }
  },
    updateProduct: async (productId, payload) => {
    set({ editingId: productId });

    try {
      await updateProduct(productId, payload);

      // optimistic UI update
      const updated = get().products.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              product: { ...item.product, ...payload },
            }
          : item
      );

      set({ products: updated });
    } finally {
      set({ editingId: null });
    }
  },
}));

export default useProductStore;