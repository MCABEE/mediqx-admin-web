"use client";

import { getAgentPatientReferralDetails, getAgentStaffReferralDetails, getAgentStaffReferrals, getNewAgentPatientReferrals } from "@/api/referralManagementApi";
import { create } from "zustand";


const useReferralManagementStore = create((set) => ({
  // ---------- STATE ----------
  referralsPatient: [],
  referralsStaff: [],
  agentInfo: null,
  agentDetails: null,
  totalPages: 1,
  loading: false,
  error: null,

  referralDetails:null,
  patientReferralDetails:null,
  // ---------- ACTIONS ----------

  // ✅ Fetch all patient referrals
  // fetchAgentPatientReferrals: async (
  //   page = 1,
  //   limit = 10,
  //   referralStatus = "ALL"
  // ) => {
  //   set({ loading: true, error: null });
  //   try {
  //     const response = await getNewAgentPatientReferrals(
  //       page,
  //       limit,
  //       referralStatus
  //     );
  //     set({
  //       referralsPatient: response?.data?.referrals || [],
  //       agentInfo: response?.data?.agentInfo || null,
  //       totalPages: response?.data?.totalPages || 1,
  //       loading: false,
  //     });
  //   } catch (err) {
  //     set({ error: err.message, loading: false });
  //   }
  // },
// ✅ Fetch all patient referrals (with optional filters)
fetchAgentPatientReferrals: async (
  page = 1,
  limit = 10,
  referralStatus = "ALL",
  referredBy = "",
  serviceType = ""
) => {
  set({ loading: true, error: null });
  try {
    const response = await getNewAgentPatientReferrals(
      page,
      limit,
      referralStatus,
      referredBy,
      serviceType
    );
    set({
      referralsPatient: response?.data?.referrals || [],
      agentInfo: response?.data?.agentInfo || null,
      totalPages: response?.data?.totalPages || 1,
      loading: false,
    });
  } catch (err) {
    set({ error: err.message, loading: false });
  }
},

  // ✅ Fetch all staff referrals
  // fetchAgentStaffReferrals: async (
  //   page = 1,
  //   limit = 10,
  //   referralStatus = "ALL"
  // ) => {
  //   set({ loading: true, error: null });
  //   try {
  //     const response = await getAgentStaffReferrals(
  //       page,
  //       limit,
  //       referralStatus
  //     );
  //     set({
  //       referralsStaff: response?.data?.referrals || [],
  //       agentInfo: response?.data?.agentInfo || null,
  //       totalPages: response?.data?.totalPages || 1,
  //       loading: false,
  //     });
  //   } catch (err) {
  //     set({ error: err.message, loading: false });
  //   }
  // },

  // ✅ Fetch all staff referrals (with filters)
fetchAgentStaffReferrals: async (
  page = 1,
  limit = 10,
  referralStatus = "ALL",
  referredBy = "",
  specialization = "",
  search = ""
) => {
  set({ loading: true, error: null });
  try {
    const response = await getAgentStaffReferrals(
      page,
      limit,
      referralStatus,
      referredBy,
      specialization,
      search
    );
    set({
      referralsStaff: response?.data?.referrals || [],
      agentInfo: response?.data?.agentInfo || null,
      totalPages: response?.data?.totalPages || 1,
      loading: false,
    });
  } catch (err) {
    set({ error: err.message, loading: false });
  }
},


  // ✅ Fetch a single staff referral’s details
  fetchAgentStaffReferralDetails: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await getAgentStaffReferralDetails(id);
      set({
        referralDetails: response?.data || null,
        loading: false,
      });
    } catch (err) {
      set({
        error: err.message,
        loading: false,
      });
    }
  },
  fetchAgentPatientReferralDetails: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await getAgentPatientReferralDetails(id);
      set({
        patientReferralDetails: response?.data || null,
        loading: false,
      });
    } catch (err) {
      set({
        error: err.message,
        loading: false,
      });
    }
  },
}));

export default useReferralManagementStore;
