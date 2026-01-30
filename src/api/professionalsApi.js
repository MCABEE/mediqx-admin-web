import api from "./axiosInstance";

// Create many specializations
export const createManySpecializations = async (specializations) => {
  try {
    const response = await api.post("/admin/specializations/create-many", {
      specializations,
    });
    return response.data;
  } catch (error) {
    // Throw the entire Axios error instead of just message
    throw error;
  }
};

// Create many qualifications
export const createManyQualifications = async (qualifications) => {
  try {
    const response = await api.post("/admin/qualifications/create-many", {
      qualifications,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create many working departments
export const createManyWorkingDepartments = async (workingDepartments) => {
  try {
    const response = await api.post("/admin/working-departments/create-many", {
      workingDepartments,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create many skills
export const createManySkills = async (skills) => {
  try {
    const response = await api.post("/admin/skills/create-many", {
      skills,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch list
// export const fetchList = async (
//   category,
//   page,
//   limit,
//   professionalCategory,
// ) => {
//   const response = await api.get(
//     `/admin/${category}?page=${page}&limit=${limit}&category=${professionalCategory}`,
//   );
//   return response.data;
// };

export const fetchList = async (
  category,
  page,
  limit,
  professionalCategory,
  search = ""
) => {
  const response = await api.get(
    `/admin/${category}?page=${page}&limit=${limit}&category=${professionalCategory}&search=${encodeURIComponent(
      search
    )}`,
  );
  return response.data;
};


// Update item by ID
export const updateItem = async (category, id, data) => {
  try {
    const response = await api.put(`/admin/${category}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete item by ID
export const deleteItem = async (category, id) => {
  try {
    const response = await api.delete(`/admin/${category}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
