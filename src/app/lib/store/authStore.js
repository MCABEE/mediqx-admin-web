// import { create } from "zustand";

// export const useAuthStore = create((set) => ({
//   accessToken: null,
//   isAuthenticated: false,
//   userId: null, 
//   isLoggedIn: false,

//   // login: (accessToken, userId) => {
//   //   localStorage.setItem("accessToken", accessToken);
//   //   localStorage.setItem("userId", userId);
//   //   set({ accessToken, isAuthenticated: true, userId });
//   // },
//     login: (accessToken, userId) => {
//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem("userId", userId);

//     set({
//       accessToken,
//       userId,
//       isAuthenticated: true,
//       isLoggedIn: true,
//     });
//   },

//   // logout: () => {
//   //   localStorage.clear(); // Clear all local storage data
//   //   set({ accessToken: null, isAuthenticated: false, userId: null });
//   // },
// logout: () => {
//   localStorage.removeItem("accessToken");
//   localStorage.removeItem("userId");

//   set({
//     accessToken: null,
//     userId: null,
//     isAuthenticated: false,
//     isLoggedIn: false,
//   });
// },

//   loadToken: () => {
//     const accessToken = localStorage.getItem("accessToken");
//     const userId = localStorage.getItem("userId"); // load userId
//     if (accessToken && userId) {
//       set({ accessToken, isAuthenticated: true, userId });
//     }
//   },
// }));









import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      userId: null,
      isLoggedIn: false,
       hydrated: false,

      // LOGIN
      login: (accessToken, userId) => {
        localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userId", userId);
        set({
          accessToken,
          userId,
          isAuthenticated: true,
          isLoggedIn: true,
        });
      },

      // LOGOUT
      logout: () => {
          localStorage.removeItem("accessToken");
  localStorage.removeItem("userId");
        set({
          accessToken: null,
          userId: null,
          isAuthenticated: false,
          isLoggedIn: false,
        });
      },

      // OPTIONAL: Restore manually (not required when using persist)
      loadToken: () => {
        const accessToken = localStorage.getItem("accessToken");
        const userId = localStorage.getItem("userId");

        if (accessToken && userId) {
          set({
            accessToken,
            userId,
            isAuthenticated: true,
            isLoggedIn: true,
          });
        }
      },
    }),

    {
      name: "auth-storage", // key in localStorage
      partialize: (state) => ({
        accessToken: state.accessToken,
        userId: state.userId,
        isAuthenticated: state.isAuthenticated,
        isLoggedIn: state.isLoggedIn,
      }),
       onRehydrateStorage: () => (state) => {
        state.hydrated = true; // mark hydration done
      },
    }
  )
);
