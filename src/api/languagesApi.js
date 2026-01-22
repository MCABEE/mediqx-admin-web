import api from "./axiosInstance";

export const addLanguages = async (languages) => {
  try {
    const response = await api.post(
      "/admin/languages/create-many",
      { languages },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    // Keep original API error details for component to use
    console.error("Failed to add languages:", error);
    throw error;
  }
};

// Get all languages with pagination
export const getLanguages = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(
      `/admin/languages?page=${page}&limit=${limit}`,
      {
        headers: { accept: "application/json" },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch languages.",
    );
  }
};

export const deleteLanguage = async (id) => {
  try {
    const response = await api.delete(`/admin/languages/${id}`, {
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete language.",
    );
  }
};

export const updateLanguage = async (id, data) => {
  try {
    const response = await api.put(`/admin/languages/${id}`, data, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update language.",
    );
  }
};
