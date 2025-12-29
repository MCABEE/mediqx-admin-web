import api from "./axiosInstance";

export const fetchPatientBills = async ({ page, limit, year, month }) => {
  try {
    const res = await api.get(
      `/admin/billing/patient-bills/by-patient`,
      {
        params: {
          page,
          limit,
          year,
          month,
        },
      }
    );

    return res.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch patient bills"
    );
  }
};


