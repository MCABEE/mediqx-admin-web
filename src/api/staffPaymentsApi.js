import api from "./axiosInstance";

export const fetchStaffPaymentsReport = async ({ year, month, category }) => {
  const params = { year, month };

  // If "all" selected → do NOT send category
  if (category && category !== "all") {
    params.category = category;
  }

  const response = await api.get(`/admin/billing/staff-payments/report`, {
    params,
  });

  return response.data.data;
};
