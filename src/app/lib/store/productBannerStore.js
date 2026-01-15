import { create } from "zustand";
import {
  createBannerInitAPI,
  generateBannerUploadUrlAPI,
  confirmBannerUploadAPI,
} from "@/api/productBannerApi";

const useProductBannerStore = create((set) => ({
  loading: false,
  uploading: false,
  bannerImage: null,

  uploadProductBanner: async (file) => {
    try {
      set({ uploading: true });

      /* STEP 1: CREATE BANNER → GET bannerId */
      const initRes = await createBannerInitAPI({
        title: "Add Banner (Products Page)",
        page: "PRODUCTS_PAGE",
        fileName: file.name,
        contentType: file.type,
        type: "PRODUCTS_PAGE_BANNER",
      });

      if (!initRes.success) throw new Error("Banner init failed");

      const { bannerId } = initRes.data;

      /* STEP 2: GENERATE UPLOAD URL */
      const uploadUrlRes = await generateBannerUploadUrlAPI({
        bannerId,
        fileName: file.name,
        contentType: file.type,
        type: "PRODUCTS_PAGE_BANNER",
      });

      if (!uploadUrlRes.success) throw new Error("Upload URL failed");

      const { signedUrl, fileId } = uploadUrlRes.data;

      /* STEP 3: UPLOAD FILE */
      const upload = await fetch(signedUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!upload.ok) throw new Error("File upload failed");

      /* STEP 4: CONFIRM UPLOAD */
      const confirmRes = await confirmBannerUploadAPI(
        fileId,
        "PRODUCTS_PAGE_BANNER"
      );

      if (!confirmRes.success) throw new Error("Confirm upload failed");

      set({ uploading: false });
      return true;
    } catch (err) {
      console.error("Banner upload error:", err);
      set({ uploading: false });
      return false;
    }
  },
}));

export default useProductBannerStore;
