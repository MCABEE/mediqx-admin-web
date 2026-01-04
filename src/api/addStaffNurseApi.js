import api from "./axiosInstance";

export const registerNurse = async (nurseData) => {
  try {
    const response = await api.post(
      "/auth/admin/registration/page-1",
      nurseData
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to register nurse.";
    throw new Error(errorMessage);
  }
};

export const submitNursePageTwo = async (data) => {
  try {
    const response = await api.post("/auth/admin/registration/page-2", data);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Page 2 submission failed.";
    throw new Error(errorMessage);
  }
};

export const submitNursePageThree = async (data) => {
  try {
    const response = await api.post("/auth/admin/registration/page-3", data);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Page 2 submission failed.";
    throw new Error(errorMessage);
  }
};

/**
 * File Upload: Generate S3 Upload URL
 */
export const generateFileUploadUrlAPI = async ({
  userId,
  fileName,
  contentType,
  type,
}) => { 
  try {
    const response = await api.post("/files/upload/generate", {
      userId,
      fileName,
      contentType,
      type,
    });

    console.log(response); 

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    console.error("Failed to generate upload URL:", error);
    return {
      success: false,
      error: error.response?.data || "Upload URL generation failed",
    };
  }
};

export const confirmFileUploadAPI = async (fileId,type) => {
  try {
    const response = await api.patch("/files/upload/confirm", { fileId,type });
    console.log(response, "confirm upload");

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("File upload confirmation failed:", error);
    return {
      success: false,
      error: error.response?.data || "Upload confirmation failed",
    };
  }
};


// ✅ Process Excel Upload
export const processExcelUploadAPI = async (fileId) => {
  try {
    const response = await api.post("/admin/locations/upload/excel/process", {
      fileId,
    });

    console.log("Excel process response:", response);

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    console.error("Excel processing failed:", error);
    return {
      success: false,
      error: error.response?.data || "Excel processing failed",
    };
  }
};
