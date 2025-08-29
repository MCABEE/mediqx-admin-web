import api from "./axiosInstance";

export const addDistricts = async (districts) => {
  try {
    const response = await api.post(
      "/admin/districts/create-many",
      { districts },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add districts.");
  }
};

export const getStates = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(
      `/admin/states?page=${page}&limit=${limit}`,
      {
        headers: { accept: "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch states.");
  }
};




// export const getDistricts = async (page = 1, limit = 10) => {
//   try {
//     const response = await api.get(`/admin/districts?page=${page}&limit=${limit}`, {
//       headers: { accept: "application/json" },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to fetch districts.");
//   }
// };
export const getDistricts = async (page = 1, limit = 10, stateId = null) => {
  let url = `/admin/districts?page=${page}&limit=${limit}`;
  if (stateId) url += `&stateId=${stateId}`;
  const response = await api.get(url, {
    headers: { accept: "application/json" },
  });
  return response.data;
};


export const updateDistrict = async (id, data) => {
  try {
    const response = await api.put(`/admin/districts/${id}`, data, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update district.");
  }
};

export const deleteDistrict = async (id) => {
  try {
    const response = await api.delete(`/admin/districts/${id}`, {
      headers: { accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete district.");
  }
};
