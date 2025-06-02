import api from "./axiosInstance";

export const registerNurse = async (nurseData) => {
  try {
    const response = await api.post("/auth/admin/registration/page-1", nurseData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to register nurse.";
    throw new Error(errorMessage);
  }
};
