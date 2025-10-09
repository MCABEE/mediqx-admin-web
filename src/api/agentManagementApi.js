// src/api/agentApi.js
import api from "./axiosInstance";

export const registerAgent = async (agentData) => {
  try {
    const response = await api.post("/admin/agent/registration", agentData);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to register agent.";
    throw new Error(message);
  }
};

export const getAgents = async (page = 1, limit = 10, filter = "ALL") => {
  try {
    const response = await api.get(
      `/admin/agent?page=${page}&limit=${limit}&filter=${filter}`
    );
    return response.data.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to fetch agents.";
    throw new Error(message);
  }
};

// Get agent by ID
export const getAgentById = async (id) => {
  try {
    const response = await api.get(`/admin/agent/${id}`);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch agent details.";
    throw new Error(message);
  }
};

// Update agent by ID
export const updateAgent = async (id, agentData) => {
  try {
    const response = await api.put(`/admin/agentupdate/${id}`, agentData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to update agent.";
    throw new Error(message);
  }
};

//  Update Agent Approval Status
export const updateAgentApprovalStatus = async (agentId, status) => {
  try {
    const response = await api.patch(
      `/admin/agent/${agentId}/approval-status`,
      { status },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; 
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to update approval status.";
    throw new Error(message);
  }
};

export const updateAgentReferralStatus = async (agentId, status,referralSignupStaffId) => {
  try {
    const response = await api.patch(
      `/admin/agent/${agentId}/referral-status`,
      { status,referralSignupStaffId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to update approval status.";
    throw new Error(message);
  }
};



// lib/api/agent.js

export const getAgentReferrals = async (
  agentId,
  page = 1,
  limit = 10,
  referralStatus = "ALL" // ✅ default added
) => {
  try {
    const response = await api.get(
      `/admin/agent/referral/${agentId}?page=${page}&limit=${limit}&referralStatus=${referralStatus}`
    );
    return response.data; 
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch referrals.";
    throw new Error(message);
  }
};



// Search staff referrals with pagination and search text
export const searchStaffReferrals = async (agentId, search = "", page = 1, limit = 10) => {
  try {
    const response = await api.get(
      `/admin/users/${agentId}/referral`,
      {
        params: {
          page,
          limit,
          search,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
