import api from "./axiosInstance"; 



export const login = async (identifier, password) => {
  try {
    const isEmail = /^\S+@\S+\.\S+$/.test(identifier);
    const isPhone = /^\d{10}$/.test(identifier);

    const payload = { password };

    if (isEmail) {
      payload.email = identifier;
    } else if (isPhone) {
      payload.mobileNumber = `+91${identifier}`; // ✅ hardcoded +91
    } else {
      throw new Error("Enter valid email or 10 digit mobile number");
    }

    const response = await api.post("/auth/admin/login", payload);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Login failed. Please try again.";
    throw new Error(errorMessage);
  }
};