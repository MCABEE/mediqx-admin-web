import { create } from "zustand";

export const useAuthStore = create((set) => ({
  accessToken: null,
  isAuthenticated: false,
  userId: null, // added

  login: (accessToken, userId) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userId", userId);
    set({ accessToken, isAuthenticated: true, userId });
  },

  logout: () => {
    localStorage.clear(); // Clear all local storage data
    set({ accessToken: null, isAuthenticated: false, userId: null });
  },

  loadToken: () => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId"); // load userId
    if (accessToken && userId) {
      set({ accessToken, isAuthenticated: true, userId });
    }
  },
}));
