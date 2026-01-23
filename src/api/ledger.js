import api from "./axiosInstance";

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

export const fetchStaffPaymentsReportAPI = async ({
  year,
  month,
  category,
  page = 1,
  limit = 10,
}) => {
  try {
    const response = await api.get("/admin/ledger/staff-payments/report", {
      params: {
        year,
        month,
        category,
        page,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to fetch staff payments report",
      }
    );
  }
};

export const fetchLedgerByPatientAPI = async ({
  page = 1,
  limit = 10,
  year,
  month,
}) => {
  try {
    const response = await api.get("/admin/ledger/by-patient", {
      params: {
        page,
        limit,
        year,
        month,
      },
    });

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to fetch patient ledger",
      }
    );
  }
};

export const fetchBookingSalesAPI = async ({
  page = 1,
  limit = 10,
  year,
  month,
  filter = "ALL",
}) => {
  try {
    const response = await api.get("/admin/ledger/booking-sales", {
      params: {
        page,
        limit,
        year,
        month,
        filter, // ALL | SOLD | CANCELLED | ON_HOLD
      },
    });

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        status: "error",
        message: "Failed to fetch booking sales",
      }
    );
  }
};
