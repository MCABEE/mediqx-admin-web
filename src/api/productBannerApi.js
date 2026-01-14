import api from "./axiosInstance";
/* generate upload URL */
export const generateFileUploadUrlAPI = async ({
  bannerId,
  fileName,
  contentType,
  type,
}) => {
  const response = await api.post("/files/upload/generate", {
    bannerId,
    fileName,
    contentType,
    type,
  });
  return {
    success: true,
    data: response.data.data, // { signedUrl, fileId }
  };
};

/* confirm uploaded file */
export const confirmFileUploadAPI = async (fileId, type) => {
  const response = await api.patch("/files/upload/confirm", {
    fileId,
    type,
  });
  return {
    success: true,
    data: response.data,
  };
};

/* create banner record */
export const createProductBannerAPI = async ({
  title,
  page,
  fileId,
}) => {
  const res = await api.post("/admin/products/banner", {
    title,
    page,
    fileId,
  });
  return res.data;
};

/* fetch banners */
export const fetchProductBannersAPI = async (page, limit) => {
  const res = await api.get(
    `/admin/products/banner?page=${page}&limit=${limit}&pageType=PRODUCTS_PAGE`
  );
  return res.data;
};