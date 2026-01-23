import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      /* ===================== STATE ===================== */
      accessToken: null,
      userId: null,
      permissions: [],
      username: "",
      isMainAdmin: null,

      isAuthenticated: false,
      isLoggedIn: false,
      hydrated: false,

      /* ===================== LOGIN ===================== */
      login: (
        accessToken,
        userId,
        permissions = [],
        username = "",
        isMainAdmin = false
      ) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", userId);
        localStorage.setItem("permissions", JSON.stringify(permissions));
        localStorage.setItem("username", username);
        localStorage.setItem(
          "isMainAdmin",
          JSON.stringify(isMainAdmin)
        );

        set({
          accessToken,
          userId,
          permissions,
          username,
          isMainAdmin,
          isAuthenticated: true,
          isLoggedIn: true,
        });
      },

      /* ===================== LOGOUT ===================== */
      logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("permissions");
        localStorage.removeItem("username");
        localStorage.removeItem("isMainAdmin");

        set({
          accessToken: null,
          userId: null,
          permissions: [],
          username: "",
          isMainAdmin: false,
          isAuthenticated: false,
          isLoggedIn: false,
        });
      },

      /* ===================== RESTORE SESSION ===================== */
      loadToken: () => {
        const accessToken = localStorage.getItem("accessToken");
        const userId = localStorage.getItem("userId");
        const permissions =
          JSON.parse(localStorage.getItem("permissions")) || [];
        const username = localStorage.getItem("username") || "";
        const isMainAdmin =
          JSON.parse(localStorage.getItem("isMainAdmin")) || "";

        if (accessToken && userId) {
          set({
            accessToken,
            userId,
            permissions,
            username,
            isMainAdmin,
            isAuthenticated: true,
            isLoggedIn: true,
          });
        }
      },
    }),

    {
      name: "auth-storage",

      partialize: (state) => ({
        accessToken: state.accessToken,
        userId: state.userId,
        permissions: state.permissions,
        username: state.username,
        isMainAdmin: state.isMainAdmin,
        isAuthenticated: state.isAuthenticated,
        isLoggedIn: state.isLoggedIn,
      }),

      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
        }
      },
    }
  )
);
