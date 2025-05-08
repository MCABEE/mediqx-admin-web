import api from "./axiosInstance"; // assuming api.js is in the same folder

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/email/login", {
      email,
      password,
    });

    return response.data; // Contains token, refreshToken, user, etc.
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Login failed. Please try again.";
    throw new Error(errorMessage);
  }
};