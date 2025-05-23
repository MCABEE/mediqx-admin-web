import { create } from "zustand";

export const useAuthStore = create((set) => ({
  accessToken: null,
  isAuthenticated: false,

  login: (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    set({ accessToken: accessToken, isAuthenticated: true });
  },

  logout: () => {
    localStorage.clear(); // Clear all local storage data
    set({ accessToken: null, isAuthenticated: false });
  },

  loadToken: () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      set({ accessToken: accessToken, isAuthenticated: true });
    }
  },
}));