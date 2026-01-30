import api from "./axiosInstance";

export const addLocations = async (locations) => {
  try {
    console.log("📤 Sending locations to API:", locations);
    const response = await api.post(
      "/admin/locations/create-many",
      { locations },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    console.log("✅ API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API Error:", error);
    throw error;
  }
};
// Get locations with pagination

export const getLocations = async (page = 1, limit = 10, search = "") => {
  try {
    const response = await api.get(
      `/admin/locations?page=${page}&limit=${limit}${
        search ? `&search=${encodeURIComponent(search)}` : ""
      }`,
      {
        headers: { accept: "application/json" },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch locations.",
    );
  }
};
// Update a location by ID
export const updateLocation = async (id, data) => {
  try {
    const response = await api.put(`/admin/locations/${id}`, data, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update location.",
    );
  }
};

// Delete a location by ID
export const deleteLocation = async (id) => {
  try {
    const response = await api.delete(`/admin/locations/${id}`, {
      headers: { accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete location.",
    );
  }
};
