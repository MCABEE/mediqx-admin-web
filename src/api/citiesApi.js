import api from "./axiosInstance";

export const addCities = async (cities) => {
  try {
    const response = await api.post(
      "/admin/cities/create-many",
      { cities },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add cities.");
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
  try {
    let url = `/admin/districts?page=${page}&limit=${limit}`;
    if (stateId) url += `&stateId=${stateId}`;
    const response = await api.get(url, {
      headers: { accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch districts.");
  }
};


// export const getCities = async (page = 1, limit = 10) => {
//   try {
//     const response = await api.get(`/admin/cities?page=${page}&limit=${limit}`, {
//       headers: { accept: "application/json" },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to fetch cities.");
//   }
// };
// In citiesApi.js:
export const getCities = async (page = 1, limit = 10, districtId = null) => {
  let url = `/admin/cities?page=${page}&limit=${limit}`;
  if (districtId) url += `&districtId=${districtId}`;
  const response = await api.get(url, {
    headers: { accept: "application/json" },
  });
  console.log(response.data);

  return response.data;
  
};


export const updateCity = async (id, data) => {
  try {
    const response = await api.put(`/admin/cities/${id}`, data, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update city.");
  }
};

export const deleteCity = async (id) => {
  try {
    const response = await api.delete(`/admin/cities/${id}`, {
      headers: { accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete city.");
  }
};