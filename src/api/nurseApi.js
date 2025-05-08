import api from "./axiosInstance";
export const getNurses = async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/users?page=${page}&limit=${limit}`);
      console.log(response);
      
      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch users.";
      throw new Error(errorMessage);
    }
  };
 
  export const getNurseById = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      console.log(".....................",response);
      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch nurse details.";
      throw new Error(errorMessage);
    }
  };
  