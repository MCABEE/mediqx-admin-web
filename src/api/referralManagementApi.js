import api from "./axiosInstance";
// ==================== STAFF REFERRALS ====================

export const getAgentStaffReferrals = async (
  page = 1,
  limit = 10,
  referralStatus = "ALL",
  referredBy = "",
  specialization = "",
  search = "",
) => {
  const response = await api.get(
    `/admin/agent-staff-referral/referrals?page=${page}&limit=${limit}&referralStatus=${referralStatus}&referredBy=${referredBy}&specialization=${specialization}&search=${search}`,
  );
  return response.data;
};

// ✅ Get a single staff referral by ID (for popup/details view)
export const getAgentStaffReferralDetails = async (id) => {
  try {
    const response = await api.get(
      `/admin/agent-staff-referral/referrals/${id}`,
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Failed to fetch agent staff referral details.";
    throw new Error(message);
  }
};

// ==================== PATIENT REFERRALS ====================

// ✅ Get all patient referrals (with pagination + status filter)
// export const getNewAgentPatientReferrals = async (
//   page = 1,
//   limit = 10,
//   referralStatus = "ALL"
// ) => {
//   try {
//     const response = await api.get(
//       `/admin/agent-patient-referral/referrals?page=${page}&limit=${limit}&referralStatus=${referralStatus}`
//     );
//     return response.data;
//   } catch (error) {
//     const message =
//       error.response?.data?.message || "Failed to fetch patient referrals.";
//     throw new Error(message);
//   }
// };

// ✅ Get all patient referrals (with pagination + filters)
export const getNewAgentPatientReferrals = async (
  page = 1,
  limit = 10,
  referralStatus = "ALL",
  referredBy = "",
  serviceType = "",
) => {
  try {
    const response = await api.get(
      `/admin/agent-patient-referral/referrals?page=${page}&limit=${limit}&referralStatus=${referralStatus}&referredBy=${referredBy}&serviceType=${serviceType}`,
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch patient referrals.";
    throw new Error(message);
  }
};

// ✅ (Optional) Get single patient referral details
export const getAgentPatientReferralDetails = async (id) => {
  try {
    const response = await api.get(
      `/admin/agent-patient-referral/referrals/${id}`,
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Failed to fetch agent patient referral details.";
    throw new Error(message);
  }
};
