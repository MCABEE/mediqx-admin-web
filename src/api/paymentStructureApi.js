// import api from "./axiosInstance";

// // Create Payment Structure
// export const createPaymentStructure = async (payload) => {
//   try {
//     const response = await api.post(
//       "/admin/billing/payment-structure/structures",
//       payload,
//       {
//         headers: {
//           accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.message ||
//         "Failed to create payment structure."
//     );
//   }
// };

// // Fetch all payment structures (optional for listing page)
// export const getPaymentStructures = async (page = 1, limit = 10) => {
//   try {
//     const response = await api.get(
//       `/admin/billing/payment-structure/structures?page=${page}&limit=${limit}`
//     );
//     return response.data;
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.message ||
//         "Failed to fetch payment structures."
//     );
//   }
// };

// // Delete structure
// export const deletePaymentStructure = async (id) => {
//   try {
//     const response = await api.delete(
//       `/admin/billing/payment-structure/structures/${id}`
//     );
//     return response.data;
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.message ||
//         "Failed to delete structure."
//     );
//   }
// };








// src/api/paymentStructureApi.js
import api from "./axiosInstance";

/**
 * Create Payment Structure
 * @param {object} payload
 */
export const createPaymentStructure = async (payload) => {
  try {
    const res = await api.post("/admin/billing/payment-structure/structures", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "Failed to create payment structure."
    );
  }
};

/**
 * Get Payment Structures with optional filters
 * @param {object} options { page, limit, role, category, dutySchedule }
 */
export const getPaymentStructures = async (options = {}) => {
  const { page = 1, limit = 10, role, category, dutySchedule } = options;
  try {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);
    if (role) params.append("role", role);
    if (category) params.append("category", category);
    if (dutySchedule) params.append("dutySchedule", dutySchedule);

    const res = await api.get(`/admin/billing/payment-structure/structures?${params.toString()}`);
  console.log(res);
  
    // Assuming API returns { data: [...], page: X, totalPages: Y, total: Z } — adjust if differs
    return res.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch payment structures."
    );
  }
};


export const getPaymentStructureById = async (id, role) => {
  try {
    const url = role
      ? `/admin/billing/payment-structure/structures/${id}?role=${encodeURIComponent(role)}`
      : `/admin/billing/payment-structure/structures/${id}`;
    const res = await api.get(url);
    return res.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || `Failed to fetch payment structure ${id}.`
    );
  }
};




export const updatePaymentStructure = async (id, payload) => {
  try {
    const res = await api.patch(
      `/admin/billing/payment-structure/structures/${id}`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data ?? res;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || `Failed to update payment structure ${id}.`
    );
  }
};



/**
 * Delete Payment Structure by id
 * @param {string|number} id
 */
export const deletePaymentStructure = async (id) => {
  try {
    const res = await api.delete(`/admin/billing/payment-structure/structures/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "Failed to delete payment structure."
    );
  }
};
