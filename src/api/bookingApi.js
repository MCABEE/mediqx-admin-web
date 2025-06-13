// src/api/bookingApi.js
import api from "./axiosInstance";

export const getBookingDetails = async (page = 1, limit = 10) => {
  const response = await api.get(`/admin/bookings?page=${page}&limit=${limit}`, {
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