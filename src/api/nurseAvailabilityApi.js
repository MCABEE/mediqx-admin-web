import api from "./axiosInstance";

export const fetchNurseAvailabilityAPI = async ({ nurseId, year, month }) => {
  const date = `${year}-${String(month).padStart(2, "0")}-01`;

  const res = await api.get(`/admin/nurses/${nurseId}/availability`, {
    params: { date },
  });

  return res.data;
};
