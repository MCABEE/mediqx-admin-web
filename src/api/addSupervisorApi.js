import api from "./axiosInstance";

/**
 * Page-1: Supervisor registration
 * POST /v1/auth/supervisor/registration/page-1
 */
export const registerSupervisor = async (payload) => {
  try {
    const res = await api.post("/auth/supervisor/registration/page-1", payload);
    // return the response body (axios response.data)
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Registration failed";
    throw new Error(message);
  }
};

/**
 * Page-2: Supervisor experience submission
 * POST /v1/auth/supervisor/registration/page-2
 */
export const submitSupervisorPageTwo = async (payload) => {
  try {
    const res = await api.post("/auth/supervisor/registration/page-2", payload);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Page 2 submission failed";
    throw new Error(message);
  }
};



export const fetchSupervisors = async ({ page = 1, limit = 10, filter = "ALL", search = "" }) => {
  try {
    const res = await api.get(
      `/admin/supervisor/supervisors?page=${page}&limit=${limit}&filter=${filter}&search=${search}`
    );

    return res.data; // { data: { supervisors: [], total: number } }
  } catch (err) {
    const message = err.response?.data?.message || "Failed to fetch supervisors";
    throw new Error(message);
  }
};


export const fetchSupervisorDetails = async (id) => {
  try {
    const res = await api.get(`/admin/supervisor/supervisors/${id}`);
    return res.data;    // { data: { ...supervisorDetails } }
  } catch (err) {
    const msg =
      err.response?.data?.message || err.message || "Failed to fetch supervisor details";
    throw new Error(msg);
  }
};
