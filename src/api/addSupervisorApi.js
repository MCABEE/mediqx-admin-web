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



export const fetchSupervisors = async ({ page, limit, filter , search = "" }) => {
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



// UPDATE PAGE 1
export const updateSupervisorPageOne = async (id, payload) => {
  const res = await api.put(
    `/admin/supervisor/supervisors/${id}/update-supervisor-page-1`,
    payload
  );
  return res.data;
};

// UPDATE PAGE 2
// export const updateSupervisorPageTwo = async (id, payload) => {
//   const res = await api.put(
//     `/admin/supervisor/supervisors/${id}/update-supervisor-page-2`,
//     payload
//   );
//   return res.data;
// };


export const updateSupervisorPageTwo = async (id, payload) => {
  try {
    const res = await api.put(
      `/admin/supervisor/supervisors/${id}/update-supervisor-page-2`,
      payload
    );
    return res.data;
  } catch (err) {
    const message =
      err.response?.data?.message ||
      err.message ||
      "Failed to update supervisor experience";
    throw new Error(message);
  }
};



/**
 * Get supervisor billing services
 */
export const getSupervisorBilling = async ({
  supervisorId,
  year,
  month,
  page = 1,
  limit = 10,
}) => {
  const response = await api.get(`/admin/supervisor/supervisors/billing`, {
    params: {
      supervisorId,
      year,
      month,
      page,
      limit,
    },
    headers: {
      accept: "application/json",
    },
  });

  return response.data.data;
};

/**
 * Get supervisor service details by serviceId
 */
export const getSupervisorServiceDetails = async (serviceId) => {
  const response = await api.get(
    `/admin/supervisor/supervisors/services/${serviceId}`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  return response.data.data;
};