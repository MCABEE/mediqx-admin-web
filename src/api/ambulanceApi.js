import api from "./axiosInstance";

export const fetchAmbulancesAPI = async ({
  page = 1,
  limit = 10,
  filter = "ACTIVE",      // default safety
  ambulanceType = "",
  vehicleType = "",
}) => {
  const params = new URLSearchParams({
    page,
    limit,
    filter,
  });

  if (ambulanceType) params.append("ambulanceType", ambulanceType);
  if (vehicleType) params.append("vehicleType", vehicleType);

  const res = await api.get(
    `/admin/ambulance/ambulances?${params.toString()}`
  );

  return res.data;
};



export const updateAmbulanceAPI = async (ambulanceId, payload) => {
  const res = await api.put(
    `/admin/ambulance/ambulances/${ambulanceId}`,
    payload
  );
  return res.data;
};





/* DELETE (Cancel) */
export const deleteAmbulanceAPI = (id) =>
  api.delete(`/admin/ambulance/ambulances/${id}`);

/* APPROVE (Confirm) */
export const approveAmbulanceAPI = (id) =>
  api.patch(`/admin/ambulance/ambulances/${id}/approval-status`, {
    status: "APPROVED",
  });