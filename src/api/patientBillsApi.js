import api from "./axiosInstance";

export const fetchPatientBills = async ({
  page = 1,
  limit = 10,
  year,
  month,
  search = "",
}) => {
  try {
    const res = await api.get(
      "/admin/billing/patient-bills/by-patient",
      {
        params: {
          page,
          limit,
          year,
          month,
          search,
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


export const fetchPatientBillServices = async ({
  patientId,
  page = 1,
  limit = 10,
  status = "ALL",
}) => {
  try {
    const res = await api.get(
      `/admin/billing/patient-bills/${patientId}/services`,
      {
        params: {
          page,
          limit,
          status,
        },
      }
    );

    return res.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
        "Failed to fetch patient bill services"
    );
  }
};


export const fetchPatientBillServiceDetails = async (serviceId) => {
  try {
    const res = await api.get(
      `/admin/billing/patient-bills/${serviceId}/details`
    );

    return res.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
        "Failed to fetch patient bill service details"
    );
  }
};