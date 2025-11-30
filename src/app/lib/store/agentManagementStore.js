// src/store/agentStore.js
import { create } from "zustand";
import { registerAgent,getAgents ,getAgentById,updateAgent,updateAgentApprovalStatus,getAgentReferrals,searchStaffReferrals,updateAgentReferralStatus, updateAgentPatientReferralStatus, getAgentPatientReferrals, searchLocationByPincode} from "@/api/agentManagementApi";

const useAgentStore = create((set, get) => ({
  agents: [],
  agentDetails: null,
  referrals: [],
  loading: false,
  error: null,
  successMessage: "",
   staffReferralList: [],
  staffReferralLoading: false,
  staffReferralError: null,
  staffReferralTotalPages: 1,
  referralsPatient:[],

 
 fetchAgents: async (page = 1, limit = 10, filter = "ALL") => {
  set({ loading: true, error: null });
  try {
    // Now response is { agents, total, page, ... }
    const response = await getAgents(page, limit, filter);
    set({
      agents: response.agents || [],
      totalAgents: response.total || 0,
      loading: false,
    });
  } catch (err) {
    set({ error: err.message, loading: false });
  }
},


    // Fetch agent by ID
  fetchAgentById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await getAgentById(id);
      set({ agentDetails: response?.data || null, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },


  // Register new agent
  createAgent: async (formData) => {
    set({ loading: true, error: null, successMessage: "" });
    try {
      const response = await registerAgent(formData);
      set({
        successMessage: "Agent registered successfully!",
        loading: false,
      });
      // Refresh list after registration
      get().fetchAgents();
      return response;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  
//  Update agent
updateAgent: async (id, formData) => {
  set({ loading: true, error: null, successMessage: "" });
  try {
    const response = await updateAgent(id, formData);

    // Check if backend returns updated data
    let updatedAgent = response?.data || response;

    // If not returned, fetch fresh details again
    if (!updatedAgent || !updatedAgent.agentId) {
      await get().fetchAgentById(id);
    } else {
      set({
        agentDetails: updatedAgent,
        successMessage: "Agent updated successfully!",
        loading: false,
      });
    }

    return { success: true, data: updatedAgent };
  } catch (err) {
    set({ error: err.message, loading: false });
    return { success: false };
  }
},


 // Approve/Reject agent status
  updateAgentApprovalStatus: async (agentId, status) => {
    set({ loading: true, error: null });
    try {
      const res = await updateAgentApprovalStatus(agentId, status);

      // Optionally refetch agent details to update state
      await get().fetchAgentById(agentId);

      set({ loading: false });
      return { success: true };
    } catch (err) {
      set({ error: err.message, loading: false });
      return { success: false };
    }
  },

    updateAgentReferralStatus: async (agentId, status,referralSignupStaffId) => {
    set({ loading: true, error: null });
    try {
      const res = await updateAgentReferralStatus(agentId, status,referralSignupStaffId);

      // Optionally refetch agent details to update state
      await get().fetchAgentById(agentId); 

      set({ loading: false });
      return { success: true };
    } catch (err) {
      set({ error: err.message, loading: false });
      return { success: false };
    }
  },

updateAgentPatientReferralStatus: async (referralId, status, referralSignupStaffId) => {
  set({ loading: true, error: null });
  try {
    const updatedReferral = await updateAgentPatientReferralStatus(referralId, status, referralSignupStaffId);

    // Update local state instead of full refetch
    set((prev) => ({
      referralsPatient: prev.referralsPatient.map((ref) =>
        ref.id === referralId ? updatedReferral : ref
      ),
      loading: false,
    }));

    return { success: true };
  } catch (err) {
    set({ error: err.message, loading: false });
    return { success: false };
  }
},

fetchAgentReferrals: async (
  agentId,
  page = 1,
  limit = 10,
  referralStatus = "ALL"
) => {
  set({ loading: true, error: null });
  try {
    const response = await getAgentReferrals(agentId, page, limit, referralStatus);
    set({
      referrals: response?.data?.referrals || [],
      agentInfo: response?.data?.agentInfo || null,
      totalPages: response?.data?.totalPages || 1,
      loading: false,
    });
  } catch (err) {
    set({ error: err.message, loading: false });
  }
},


fetchAgentPatientReferrals: async (
  agentId,
  page = 1,
  limit = 10,
  referralStatus = "ALL"
) => {
  set({ loading: true, error: null });
  try {
    const response = await getAgentPatientReferrals(agentId, page, limit, referralStatus);
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

fetchStaffReferrals: async (referralId, search, page, limit) => {
  set({ staffReferralLoading: true, staffReferralError: null });
  try {
    const res = await searchStaffReferrals(referralId, search, page, limit);
    // Extract users array from nested data object
    const users = Array.isArray(res.data?.users) ? res.data.users : [];
    set({ staffReferralList: users, staffReferralLoading: false });
  } catch (error) {
    set({ staffReferralError: error.message, staffReferralLoading: false });
  }
},

 
  locationResults: [],
  locationLoading: false,
  locationError: null,

fetchLocationByPincode: async (pincode) => {
  if (!pincode) return;
  set({ locationLoading: true, locationError: null });

  try {
    console.log("Fetching pincode:", pincode); // 👈 Check this
    const locations = await searchLocationByPincode(pincode);
    console.log("Fetched locations:", locations); // 👈 See what it returns

    set({ locationResults: locations, locationLoading: false });
  } catch (err) {
    console.error("Error fetching locations:", err);
    set({ locationError: err.message, locationLoading: false });
  }
},



}));

export default useAgentStore;