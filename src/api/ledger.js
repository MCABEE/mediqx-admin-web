import api from "./axiosInstance";

/**
 * Fetch ledger bookings
 */
export const fetchLedgerBookingsAPI = async ({
  year,
  month,
  page = 1,
  limit = 10,
  filter = "ALL",
}) => {
  try {
    const response = await api.get("/admin/ledger/bookings", {
      params: {
        year,
        month,
        page,
        limit,
        filter,
      },
    });

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to fetch ledger bookings",
      }
    );
  }
};