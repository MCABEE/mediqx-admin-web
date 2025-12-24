// import api from "./axiosInstance";


// /* ---------- CREATE CO-ADMIN ---------- */
// export const createCoAdminAPI = async (payload) => {
//   try {
//     const res = await api.post(
//       "/admin/user-access/co-admins",
//       payload
//     );
//     return res.data;
//   } catch (err) {
//     throw new Error(
//       err.response?.data?.message || "Failed to create co-admin"
//     );
//   }
// };

// /* ---------- LIST CO-ADMINS ---------- */
// export const fetchCoAdminsAPI = async ({ page, limit }) => {
//   try {
//     const res = await api.get(
//       `/admin/user-access/co-admins?page=${page}&limit=${limit}`
//     );
//     return res.data;
//   } catch (err) {
//     throw new Error(
//       err.response?.data?.message || "Failed to fetch co-admins"
//     );
//   }
// };





import api from "./axiosInstance";

/* -------- ADD CO ADMIN -------- */
// export const addCoAdminAPI = async (payload) => {
//   const res = await api.post("/admin/user-access/co-admins", payload);
//   return res.data;
// };
export const addCoAdminAPI = async (payload) => {
  try {
    const res = await api.post(
      "/admin/user-access/co-admins",
      payload
    );
    return res.data;
  } catch (err) {
    // 🔴 IMPORTANT FIX
    const apiMessage =
      err.response?.data?.message ||
      "Failed to create co-admin";

    throw new Error(apiMessage);
  }
};
/* -------- LIST CO ADMINS -------- */
export const fetchCoAdminsAPI = async ({ page, limit }) => {
  const res = await api.get(
    `/admin/user-access/co-admins?page=${page}&limit=${limit}`
  );
  return res.data;
};

/* -------- VIEW CO ADMIN -------- */
export const getCoAdminByIdAPI = async (id) => {
  const res = await api.get(`/admin/user-access/co-admins/${id}`);
  return res.data;
};

/* -------- UPDATE CO ADMIN -------- */
export const updateCoAdminAPI = async (id, payload) => {
  const res = await api.put(
    `/admin/user-access/co-admins/${id}`,
    payload
  );
  return res.data;
};

/* -------- DELETE CO ADMIN -------- */
export const deleteCoAdminAPI = async (id) => {
  const res = await api.delete(`/admin/user-access/co-admins/${id}`);
  return res.data;
};








