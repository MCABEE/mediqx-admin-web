import { create } from "zustand";

export const useAuthStore = create((set) => ({
  accessToken: null,
  isAuthenticated: false,

  login: (token) => {
    localStorage.setItem("accessToken", token);
    set({ accessToken: token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.clear(); // Clear all local storage data
    set({ accessToken: null, isAuthenticated: false });
  },

  loadToken: () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      set({ accessToken: token, isAuthenticated: true });
    }
  },
}));