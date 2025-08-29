import api from "./axiosInstance";

export const addStates = async (states) => {
  try {
    const response = await api.post(
      "/admin/states/create-many",
      { states },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add states.");
  }
};



// Get states with pagination
export const getStates = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/admin/states?page=${page}&limit=${limit}`, {
      headers: { accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch states.");
  }
};

// Delete a state by ID
export const deleteState = async (id) => {
  try {
    const response = await api.delete(`/admin/states/${id}`, {
      headers: { accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete state.");
  }
};

// Update a state by ID
export const updateState = async (id, data) => {
  try {
    const response = await api.put(`/admin/states/${id}`, data, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update state.");
  }
};