import api from "./axiosInstance";

export const createManyDiagnoses = async (patientDiagnoses) => {
  try {
    const response = await api.post("/admin/patient-diagnosis/create-many", {
      patientDiagnoses,
    });
    return response.data;
  } catch (error) {
    console.error("createManyDiagnoses API error:", error.response?.data);

    // Keep full backend error object
    const backendError = error.response?.data || {
      message: "Failed to add diagnoses.",
    };
    throw backendError; // ⚠️ throw full response, not just message
  }
};

// Fetch diagnoses list with pagination
export const fetchDiagnoses = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(
      `/admin/patient-diagnosis?page=${page}&limit=${limit}`,
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch diagnoses.";
    throw new Error(message);
  }
};

// Update a diagnosis by ID
export const updateDiagnosis = async (id, diagnosis) => {
  try {
    const response = await api.put(`/admin/patient-diagnosis/${id}`, {
      diagnosis,
    });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to update diagnosis.";
    throw new Error(message);
  }
};

// Delete a diagnosis by ID
export const deleteDiagnosis = async (id) => {
  try {
    const response = await api.delete(`/admin/patient-diagnosis/${id}`);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to delete diagnosis.";
    throw new Error(message);
  }
};
