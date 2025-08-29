import api from "./axiosInstance"; // Axios instance pre-configured with baseURL and Authorization headers

// Create many patient health statuses
export const createManyHealthStatuses = async (patientHealthStatuses) => {
  try {
    const response = await api.post("/admin/patient-health-status/create-many", {
      patientHealthStatuses,
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to add health statuses.";
    throw new Error(message);
  }
};

// Fetch health statuses list with pagination
export const fetchHealthStatuses = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/admin/patient-health-status?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to fetch health statuses.";
    throw new Error(message);
  }
};

// Update a health status by ID
export const updateHealthStatus = async (id, status) => {
  try {
    const response = await api.put(`/admin/patient-health-status/${id}`, { status });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to update health status.";
    throw new Error(message);
  }
};

// Delete a health status by ID
export const deleteHealthStatus = async (id) => {
  try {
    const response = await api.delete(`/admin/patient-health-status/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to delete health status.";
    throw new Error(message);
  }
};
