// src/api/bookingApi.js
import api from "./axiosInstance";

export const getBookingDetails = async (page = 1, limit = 10,status) => {
  const response = await api.get(`/admin/bookings?page=${page}&limit=${limit}&status=${status}`, {
    headers: { accept: "application/json" },
  });

  return response.data.data; // directly return the data object
};


export const createBooking = async (payload) => {
  const response = await api.post("/admin/bookings", payload, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response.data.data;
};






export const getBookingById = async (id) => {
  const response = await api.get(`/service-requests/${id}`, {
    headers: {
      accept: "application/json",
    },
  });
  return response.data.data; // Assuming `data` is the nested object
};







export const confirmBookingApi = async (bookingId, payload) => {
  const response = await api.put(`/admin/bookings/${bookingId}/confirm`, payload);
  return response.data;
};