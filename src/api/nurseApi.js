import api from "./axiosInstance";
export const getNurses = async (page = 1, limit = 10,status) => {
    try {
      const response = await api.get(`/admin/users?page=${page}&limit=${limit}&filter=${status}&role=NURSE`);
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
      const response = await api.get(`/nurses/${userId}`);
      console.log(".....................",response);
      
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch nurse details.";
      throw new Error(errorMessage);
    }
  };
  
export const verifyNurseStatus = async (nurseId, status) => {
  try {
    const response = await api.patch(`/admin/users/${nurseId}/approval-status`, {
      status: status,
    }, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    console.log(response);

    return response.data;
    
  } catch (error) {
    const message = error.response?.data?.message || "Verification update failed.";
    throw new Error(message);
  }
};



export const updateNurse = async (userId, data) => {
  try {
    const response = await api.put(`/admin/nurses/update-nurse/page-1/${userId}`, data, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }); 
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to update nurse details.";
    throw new Error(message);
  }
};



export const updateNurseAvailability = async (userId, availabilities) => {
  try {
    const response = await api.put(
      `/admin/nurses/availability-update/${userId}`,
      {
        availabilities: availabilities.map((a) => ({
          ...a,
          isRecurring: true,
          recurrenceRules: {},
        })),
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to update availability.";
    throw new Error(message);
  }
};




export const updateNurseExperience = async (userId, data) => {
  try {
    const response = await api.put(
      `/admin/nurses/update-qualification/${userId}`,
      data,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to update experience.";
    throw new Error(message);
  }
};
 



export const getAssignableNurses = async ({
  page = 1,
  limit = 10,
  from,
  to,
  radius,
  centerLatitude,
  centerLongitude
}) => {
  try {
    const response = await api.get(
      `/admin/nurse-assignment/nurses?page=${page}&limit=${limit}&role=NURSE&date=${from}&to=${to}&radius=${radius}&centerLatitude=${centerLatitude}&centerLongitude=${centerLongitude}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch assignable nurses");
  }
};
