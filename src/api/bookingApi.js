// src/api/bookingApi.js
import api from "./axiosInstance";

export const getBookingDetails = async (page = 1, limit = 10) => {
  const response = await api.get(`/admin/bookings?page=${page}&limit=${limit}`, {
    headers: { accept: "application/json" },
  });

  return response.data.data; // directly return the data object
};
