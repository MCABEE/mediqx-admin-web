import api from "./axiosInstance";



export const createManyPatientServices = async (patientServices) => {
  try {
    const response = await api.post("/admin/patient-service/create-many", {
      patientServices,
    });
    return response.data;
  } catch (error) {
    // Include full backend response if available
    const backendError = error.response?.data || {
      message: "Failed to add services.",
    };
    throw backendError;
  }
};


// Fetch patient services list with pagination
export const fetchPatientServices = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(
      `/admin/patient-service?page=${page}&limit=${limit}`
    );
    return response.data; // Adjust as needed
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch services.";
    throw new Error(message);
  }
};

// Update a patient service by ID
export const updatePatientService = async (id, service) => {
  try {
    const response = await api.put(`/admin/patient-service/${id}`, {
      service,
    });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to update service.";
    throw new Error(message);
  }
};

// Delete a patient service by ID
export const deletePatientService = async (id) => {
  try {
    const response = await api.delete(`/admin/patient-service/${id}`);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to delete service.";
    throw new Error(message);
  }
};
