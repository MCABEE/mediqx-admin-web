import api from "./axiosInstance";

export const getNurses = async (
  page = 1,
  limit = 50,
  status = "ALL",
  role = "REGISTERED_NURSE",
  filters = { search: "", location: "", qualifications: "", gender: "" }
) => {
  try {
    const response = await api.get("/admin/users", {
      params: {
        page,
        limit,
        filter: status,
        role,
        search: filters.search,
        location: filters.location,
        qualifications: filters.qualifications,
        gender: filters.gender,
      },
    });
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
    console.log(".....................", response);

    return response.data.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch nurse details.";
    throw new Error(errorMessage);
  }
};

export const getNurseProfileById = async (userId) => {
  try {
    const response = await api.get(`/admin/nurses/nurse-profile/${userId}`);
    console.log(".....................", response);

    return response.data.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch nurse details.";
    throw new Error(errorMessage);
  }
};

export const getNurseQualificationById = async (userId) => {
  try {
    const response = await api.get(
      `/admin/nurses/nurse-qualification/${userId}`
    );

    return response.data.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch nurse details.";
    throw new Error(errorMessage);
  }
};

export const verifyNurseStatus = async (nurseId, status) => {
  try {
    const response = await api.patch(
      `/admin/users/${nurseId}/approval-status`,
      {
        status: status,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Verification update failed.";
    throw new Error(message);
  }
};

export const updateNurse = async (userId, data) => {
  try {
    const response = await api.put(
      `/admin/nurses/update-nurse/page-1/${userId}`,
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
    const message =
      error.response?.data?.message || "Failed to update nurse details.";
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
    const message =
      error.response?.data?.message || "Failed to update experience.";
    throw new Error(message);
  }
};

export const getAssignableNurses = async ({
  page = 1,
  limit = 10,
  role,
  gender,
  languages,
  date,
  radius,
  centerLatitude,
  centerLongitude,
  durationType,
  durationValue,
  frequency,
  scheduleType,
  startTime,
  endTime,
}) => {
  try {
    const response = await api.get("/admin/nurse-assignment/nurses", {
      params: {
        page,
        limit,
        role,
        gender,
        languages, // pass array or string as is
        date,
        radius,
        centerLatitude,
        centerLongitude,
        durationType,
        durationValue,
        frequency, // pass array or string as is
        scheduleType,
        startTime,
        endTime,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch assignable nurses"
    );
  }
};

export const getNurseCalendar = async (userId, monthStart, monthEnd) => {
  try {
    const response = await api.get(
      `/admin/availability/${userId}/calender?monthStart=${monthStart}&monthEnd=${monthEnd}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch nurse calendar"
    );
  }
};

export const searchNurses = async (
  page = 1,
  limit = 10,
  status,
  search = ""
) => {
  try {
    const response = await api.get(
      `/admin/users?page=${page}&limit=${limit}&filter=${status}&search=${encodeURIComponent(
        search
      )}`
    );
    return response;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch users.";
    throw new Error(errorMessage);
  }
};
