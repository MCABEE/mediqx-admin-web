import api from "./axiosInstance";

/* 1. CREATE BANNER (GET bannerId) */
export const createBannerInitAPI = async (payload) => {
  try {
    const res = await api.post("/admin/products/banner", payload);
    return { success: true, data: res.data.data };
  } catch (err) {
    return { success: false, error: err };
  }
};

/* 2. GENERATE UPLOAD URL */
export const generateBannerUploadUrlAPI = async ({
  bannerId,
  fileName,
  contentType,
  type,
}) => {
  try {
    const res = await api.post("/files/upload/generate", {
      bannerId,
      fileName,
      contentType,
      type,
    });
    return { success: true, data: res.data.data };
  } catch (err) {
    return { success: false, error: err };
  }
};

/* 3. CONFIRM UPLOAD */
export const confirmBannerUploadAPI = async (fileId, type) => {
  try {
    const res = await api.patch("/files/upload/confirm", { fileId, type });
    return { success: true, data: res.data.data };
  } catch (err) {
    return { success: false, error: err };
  }
};
