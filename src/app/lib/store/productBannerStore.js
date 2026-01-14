import { create } from "zustand";
import {
  generateFileUploadUrlAPI,
  confirmFileUploadAPI,
  createProductBannerAPI,
  fetchProductBannersAPI,
} from "@/api/productBannerApi"; 

const useProductBannerStore = create((set, get) => ({
  banners: [],
  loading: false,
  uploading: false,

//   fetchBanner: async (page = 1, limit = 10) => {
//     try {
//       set({ loading: true });
//       const res = await fetchProductBannersAPI(page, limit);
//       set({ banners: res.data, loading: false });
//     } catch (err) {
//       console.error(err);
//       set({ loading: false });
//     }
//   },


fetchBanner: async (page = 1, limit = 10) => {
  try {
    set({ loading: true });

    const res = await fetchProductBannersAPI(page, limit);

    const banners = res?.data?.banners || [];
    const banner = banners[0] || null;

    set({
      banners,
      bannerId: banner?.id || null,
      bannerImage: banner?.fileUrl || null,
      loading: false,
    });
  } catch (err) {
    console.error(err);
    set({ loading: false });
  }
},


  generateUploadUrl: async ({ bannerId, title, file }) => {
    try {
      set({ uploading: true });

      // 1) generate upload URL
      const { signedUrl, fileId } = await generateFileUploadUrlAPI({
        bannerId,
        fileName: file.name,
        contentType: file.type,
        type: "PRODUCTS_PAGE_BANNER",
      });

      // 2) upload file via PUT
      const uploadRes = await fetch(signedUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!uploadRes.ok) throw new Error("Upload failed");

      // 3) confirm upload
      const confirmed = await confirmFileUploadAPI(fileId, "PRODUCTS_PAGE_BANNER");
      const confirmedFileId = confirmed.data?.data?.fileId;

      if (!confirmedFileId) throw new Error("No confirmed fileId");

      // 4) save banner record
      await createProductBannerAPI({
        title,
        page: "PRODUCTS_PAGE",
        fileId: confirmedFileId,
      });

      set({ uploading: false });
      return true;
    } catch (err) {
      console.error(err);
      set({ uploading: false });
      return false;
    }
  },
}));

export default useProductBannerStore;
