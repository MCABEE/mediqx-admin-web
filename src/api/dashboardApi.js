import api from "./axiosInstance";

export const fetchDashboardAPI = async () => {
  try {
    const res = await api.get("/admin/dashboard");

    return {
      success: true,
      data: res.data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Something went wrong",
    };
  }
};