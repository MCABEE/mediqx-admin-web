// import { confirmFileUploadAPI, createProductAPI, fetchProductsAPI, generateFileUploadUrlAPI } from "@/api/product";
// import { create } from "zustand";


// const useProductStore = create((set) => ({
//   loading: false,
//   error: null,

//   uploadedFiles: {
//     PRODUCT_IMAGE: null,
//   },

//   /* ---------------- CREATE PRODUCT ---------------- */

//   addProduct: async (payload) => {
//     set({ loading: true, error: null });

//     try {
//       const res = await createProductAPI(payload);
//       if (!res.success) throw new Error(res.message);

//       return res.data; // { id }
//     } catch (err) {
//       set({ error: err.message });
//       throw err;
//     } finally {
//       set({ loading: false });
//     }
//   },

//   /* ---------------- GENERATE UPLOAD URL ---------------- */
//   // ✅ productId is passed as userId

//   generateUploadUrl: async ({
//     productId,
//     fileName,
//     contentType,
//     type,
//   }) => {
//     if (!productId) throw new Error("Product ID missing");

//     const result = await generateFileUploadUrlAPI({
//       userId: productId, // ✅ IMPORTANT FIX
//       fileName,
//       contentType,
//       type, // PRODUCT_IMAGE
//       productId:productId,
//     });

//     if (!result.success) throw new Error(result.message);
//     return result.data; // { signedUrl, fileId }
//   },

//   /* ---------------- CONFIRM FILE ---------------- */

//   confirmFileUpload: async (fileId, type) => {
//     const result = await confirmFileUploadAPI(fileId, type);
//     if (!result.success) throw new Error(result.message);

//     return result.data?.data?.fileId;
//   },

//   /* ---------------- SET FILE ---------------- */

//   setUploadedFile: (type, fileId) => {
//     set((state) => ({
//       uploadedFiles: {
//         ...state.uploadedFiles,
//         [type]: fileId,
//       },
//     }));
//   },



//    products: [],
//   loading: false,
//   error: null,

//   page: 1,
//   limit: 10,
//   total: 0,
//   totalPages: 1,

//   fetchProducts: async (page = 1) => {
//     set({ loading: true, error: null });

//     try {
//       const res = await fetchProductsAPI({
//         page,
//         limit: get().limit,
//       });
//       console.log("jhgfd");
      

//       if (!res.success) throw new Error(res.message);

//       set({
//         products: res.data,
//         page: res.page,
//         limit: res.limit,
//         total: res.total,
//         totalPages: res.totalPages,
//       });
//     } catch (err) {
//       set({ error: err.message });
//     } finally {
//       set({ loading: false });
//     }
//   },
// }));

// export default useProductStore;









// import { create } from "zustand";
// import {
//   createProductAPI,
//   generateFileUploadUrlAPI,
//   confirmFileUploadAPI,
//   fetchProductsAPI,
//   deleteProductAPI,
// } from "@/api/product";

// const useProductStore = create((set, get) => ({
//   /* ---------------- COMMON STATE ---------------- */
//   loading: false,
//   error: null,

//   /* ---------------- FILE STATE ---------------- */
//   uploadedFiles: {
//     PRODUCT_IMAGE: null,
//   },

//   /* ---------------- PRODUCT LIST ---------------- */
//   products: [],
//   page: 1,
//   limit: 10,
//   total: 0,
//   totalPages: 1,

//   /* =================================================
//      CREATE PRODUCT
//      ================================================= */

//   addProduct: async (payload) => {
//     set({ loading: true, error: null });

//     try {
//       const res = await createProductAPI(payload);
//       if (!res.success) throw new Error(res.message);

//       return res.data; // { id }
//     } catch (err) {
//       set({ error: err.message });
//       throw err;
//     } finally {
//       set({ loading: false });
//     }
//   },

//   /* =================================================
//      GENERATE UPLOAD URL
//      productId is passed as userId (INTENTIONAL)
//      ================================================= */

//   generateUploadUrl: async ({
//     productId,
//     fileName,
//     contentType,
//     type,
//   }) => {
//     if (!productId) throw new Error("Product ID missing");

//     const result = await generateFileUploadUrlAPI({
//       userId: productId, // ✅ productId reused as userId
//       fileName,
//       contentType,
//       type, // PRODUCT_IMAGE
//       productId:productId,
//     });

//     if (!result.success) throw new Error(result.message);

//     return result.data; // { signedUrl, fileId }
//   },

//   /* =================================================
//      CONFIRM FILE UPLOAD
//      ================================================= */

//   confirmFileUpload: async (fileId, type) => {
//     const result = await confirmFileUploadAPI(fileId, type);
//     if (!result.success) throw new Error(result.message);

//     return result.data?.data?.fileId;
//   },

//   /* =================================================
//      STORE UPLOADED FILE
//      ================================================= */

//   setUploadedFile: (type, fileId) => {
//     set((state) => ({
//       uploadedFiles: {
//         ...state.uploadedFiles,
//         [type]: fileId,
//       },
//     }));
//   },

//   /* =================================================
//      FETCH PRODUCTS WITH PAGINATION
//      ================================================= */

//   fetchProducts: async (page = 1) => {
//     set({ loading: true, error: null });

//     try {
//       const res = await fetchProductsAPI({
//         page,
//         limit: get().limit,
//       });

//       if (!res.success) throw new Error(res.message);

//       set({
//         products: res.data,
//         page: res.page,
//         limit: res.limit,
//         total: res.total,
//         totalPages: res.totalPages,
//       });
//     } catch (err) {
//       set({ error: err.message });
//     } finally {
//       set({ loading: false });
//     }
//   },


// deleteProduct: async (productId) => {
//   set({ loading: true, error: null });

//   try {
//     const res = await deleteProductAPI(productId);
//     if (!res.success) throw new Error(res.message);

//     // refresh list after delete
//     await get().fetchProducts(get().page);

//     return true;
//   } catch (err) {
//     set({ error: err.message });
//     throw err;
//   } finally {
//     set({ loading: false });
//   }
// },
//   /* =================================================
//      RESET STORE (OPTIONAL)
//      ================================================= */

//   resetProductState: () =>
//     set({
//       uploadedFiles: { PRODUCT_IMAGE: null },
//       error: null,
//     }),
// }));

// export default useProductStore;










// import {
//   createProductAPI,
//   fetchProductsAPI,
//   deleteProductAPI,
//   generateFileUploadUrlAPI,
//   confirmFileUploadAPI,
// } from "@/api/product";
// import { create } from "zustand";

// const useProductStore = create((set, get) => ({
//   /* ---------------- STATE ---------------- */
//   products: [],
//   loading: false,
//   error: null,

//   page: 1,
//   limit: 10,
//   total: 0,
//   totalPages: 1,

//   uploadedFiles: {
//     PRODUCT_IMAGE: null,
//   },

//   /* ---------------- FETCH PRODUCTS ---------------- */
//   fetchProducts: async (page = 1) => {
//     set({ loading: true, error: null });

//     try {
//       const res = await fetchProductsAPI({ page, limit: get().limit });
// console.log(res);

//       if (!res.success) throw new Error(res.message);

//       set({
//         products: res.data,
//         page: res.page,
//         limit: res.limit,
//         total: res.total,
//         totalPages: res.totalPages,
//       });
//     } catch (err) {
//       set({ error: err.message });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   /* ---------------- CREATE PRODUCT ---------------- */
//   addProduct: async (payload) => {
//     set({ loading: true, error: null });

//     try {
//       const res = await createProductAPI(payload);
//       if (!res.success) throw new Error(res.message);
//       return res.data; // { id }
//     } catch (err) {
//       set({ error: err.message });
//       throw err;
//     } finally {
//       set({ loading: false });
//     }
//   },

//   /* ---------------- FILE UPLOAD ---------------- */
//   generateUploadUrl: async ({ productId, fileName, contentType, type }) => {
//     if (!productId) throw new Error("Product ID missing");

//     const res = await generateFileUploadUrlAPI({
//       userId: productId, // ✅ productId used as userId
//       fileName,
//       contentType,
//       type,
//       productId,
//     });

//     if (!res.success) throw new Error(res.message);
//     return res.data; // { signedUrl, fileId }
//   },

//   confirmFileUpload: async (fileId, type) => {
//     const res = await confirmFileUploadAPI(fileId, type);
//     if (!res.success) throw new Error(res.message);
//     return res.data?.data?.fileId;
//   },

//   setUploadedFile: (type, fileId) => {
//     set((state) => ({
//       uploadedFiles: {
//         ...state.uploadedFiles,
//         [type]: fileId,
//       },
//     }));
//   },

//   /* ---------------- DELETE PRODUCT ---------------- */
//   deleteProduct: async (productId) => {
//     set({ loading: true, error: null });

//     try {
//       const res = await deleteProductAPI(productId);
//       if (!res.success) throw new Error(res.message);

//       // ✅ Refresh list AFTER delete
//       await get().fetchProducts(get().page);
//       return true;
//     } catch (err) {
//       set({ error: err.message });
//       throw err;
//     } finally {
//       set({ loading: false });
//     }
//   },
// }));

// export default useProductStore;





import {
  createProductAPI,
  fetchProductsAPI,
  deleteProductAPI,
  generateFileUploadUrlAPI,
  confirmFileUploadAPI,
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
  fetchProducts: async (page = 1) => {
    set({ loading: true, error: null });

    try {
      const res = await fetchProductsAPI({
        page,
        limit: get().limit,
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
  deleteProduct: async (productId) => {
    set({ loading: true, error: null });

    try {
      const res = await deleteProductAPI(productId);
      if (!res.success) throw new Error(res.message);

      // ✅ THIS WILL NOW WORK
      await get().fetchProducts(get().page);

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
}));

export default useProductStore;
