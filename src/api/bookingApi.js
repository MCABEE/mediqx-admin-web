import api from "./axiosInstance";

// export const getBookingDetails = async (page = 1, limit = 10, status) => {
//      const response = await api.get(`/admin/bookings?page=${page}&limit=${limit}&filter=${status}`, 
//     {
     

//       headers: { accept: "application/json" },
//     }
//   );

//   return response.data.data;
// };



export const getBookingDetails = async (
  page = 1,
  limit = 10,
  status,
  name = "",
  location = "",
  date = ""
) => {
  try {
    const response = await api.get(
      `/admin/bookings?page=${page}&limit=${limit}&filter=${status}&name=${name}&location=${location}&date=${date}`,
      {
        headers: { accept: "application/json" },
      }
    );

    return response.data.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch bookings.";
    console.error("Booking fetch error:", errorMessage);
    throw new Error(errorMessage);
  }
};


export const createBooking = async (payload) => {
  const response = await api.post("/admin/bookings", payload, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response.data.data;
};

export const getBookingById = async (id) => {
  const response = await api.get(`/service-requests/${id}`, {
    headers: {
      accept: "application/json",
    },
  });
  return response.data.data;
};

export const confirmBookingApi = async (bookingId, payload) => {
  const response = await api.put(
    `/admin/bookings/${bookingId}/confirm`,
    payload
  );
  return response.data;
};
export const cancelBookingApi = async (bookingId, payload) => {
  const response = await api.put(
    `/admin/bookings/${bookingId}/cancel`,
    payload
  );
  return response.data;
};

export const assignNurseToBooking = async (bookingId, nurseId) => {
  const response = await api.post(
    `/admin/nurse-assignment/${bookingId}/nurses`,
    { nurseId },
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};


export const cancelNurseAssignment = async (assignmentId) => {
  const response = await api.put(
    `/admin/nurse-assignment/${assignmentId}/cancel`,
    null,
    {
      headers: {
        accept: "application/json",
      },
    }
  );
  return response.data;
};




export const searchCoordinatesByText = async (text) => {
  try {
    const response = await api.get(
      `/admin/bookings/coordinates?text=${encodeURIComponent(text)}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    return response.data.data; 
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};




export const updateBooking = async (bookingId, payload) => {
  const response = await api.put(`/admin/bookings/${bookingId}`, payload, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.data;
};




export const updateBookingLocation = async (bookingId, payload) => {
  const response = await api.patch(
    `/admin/bookings/update-current-location/${bookingId}`,
    payload,
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};


export const getBookingsByPatientId = async (patientId, page = 1, limit = 10) => {
  const response = await api.get(
    `/admin/bookings/${patientId}/bookings?page=${page}&limit=${limit}`,
    {
      headers: { accept: "application/json" },
    }
  );
  return response.data.data;
};



export const getDutyLogs = async (serviceId, page = 1, limit = 10) => {
  const response = await api.get(
    `/admin/duty-logs/${serviceId}/logs?page=${page}&limit=${limit}`,
    {
      headers: { accept: "application/json" },
    }
  );
  return response.data.data;
};



export const createBookingApi = async ({ userId, payload }) => {
  const response = await api.post(
    "/admin/bookings/create",
    payload,
    {
      params: { userId }, // :white_tick: REQUIRED BY BACKEND
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};




export const fetchBillingByServiceIdAPI = async (serviceId) => {
  try {
    const res = await api.get(
      `/admin/billing/patient-bills/service/${serviceId}`
    );
    return res.data;
  } catch (err) {
   
    if (err?.response?.status === 404) {
      return null;
    }
    throw err;
  }
};