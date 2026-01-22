import api from "./axiosInstance";

/* ===== COUNT API ===== */
export const fetchMatchingUsersCountAPI = (payload) => {
  return api.post(
    "/admin/notification/matching-users/count",
    payload
  );
};

/* ===== SEND API ===== */
export const sendCustomNotificationAPI = (payload) => {
  return api.post(
    "/admin/notification/send-custom",
    payload
  );
};



export const fetchNotificationsAPI = async ({ page = 1, limit = 10, year, month }) => {
  const res = await api.get(
    `/admin/notification?page=${page}&limit=${limit}&year=${year}&month=${month}`,
   
  );
  return res.data;
};