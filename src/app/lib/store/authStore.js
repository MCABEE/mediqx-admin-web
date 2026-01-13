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









// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export const useAuthStore = create(
//   persist(
//     (set) => ({
//       accessToken: null,
//       isAuthenticated: false,
//       userId: null,
//       isLoggedIn: false,
//        hydrated: false,

//       // LOGIN
//     //   login: (accessToken, userId) => {
//     //     localStorage.setItem("accessToken", accessToken);
//     // localStorage.setItem("userId", userId);
//     //     set({
//     //       accessToken,
//     //       userId,
//     //       isAuthenticated: true,
//     //       isLoggedIn: true,
//     //     });
//     //   },
// login: (accessToken, userId, permissions = []) => {
//   localStorage.setItem("accessToken", accessToken);
//   localStorage.setItem("userId", userId);
//   localStorage.setItem("permissions", JSON.stringify(permissions));

//   set({
//     accessToken,
//     userId,
//     permissions,
//     isAuthenticated: true,
//     isLoggedIn: true,
//   });
// },

//       // LOGOUT
//   //     logout: () => {
//   //         localStorage.removeItem("accessToken");
//   // localStorage.removeItem("userId");
//   //       set({
//   //         accessToken: null,
//   //         userId: null,
//   //         isAuthenticated: false,
//   //         isLoggedIn: false,
//   //       });
//   //     },

//   logout: () => {
//   localStorage.removeItem("accessToken");
//   localStorage.removeItem("userId");
//   localStorage.removeItem("permissions");

//   set({
//     accessToken: null,
//     userId: null,
//     permissions: [],
//     isAuthenticated: false,
//     isLoggedIn: false,
//   });
// },


//       // OPTIONAL: Restore manually (not required when using persist)
//       loadToken: () => {
//         const accessToken = localStorage.getItem("accessToken");
//         const userId = localStorage.getItem("userId");

//         if (accessToken && userId) {
//           set({
//             accessToken,
//             userId,
//             isAuthenticated: true,
//             isLoggedIn: true,
//           });
//         }
//       },
//     }),

//     {
//       name: "auth-storage", // key in localStorage
//       // partialize: (state) => ({
//       //   accessToken: state.accessToken,
//       //   userId: state.userId,
//       //   isAuthenticated: state.isAuthenticated,
//       //   isLoggedIn: state.isLoggedIn,
//       // }),
//       partialize: (state) => ({
//   accessToken: state.accessToken,
//   userId: state.userId,
//   permissions: state.permissions,
//   isAuthenticated: state.isAuthenticated,
//   isLoggedIn: state.isLoggedIn,
// }),
//        onRehydrateStorage: () => (state) => {
//         state.hydrated = true; // mark hydration done
//       },
//     }
//   )
// );






// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export const useAuthStore = create(
//   persist(
//     (set) => ({
//       accessToken: null,
//       userId: null,
//       permissions: [],

//       isAuthenticated: false,
//       isLoggedIn: false,
//       hydrated: false,

//       /* ===================== LOGIN ===================== */
//       login: (accessToken, userId, permissions = []) => {
//         localStorage.setItem("accessToken", accessToken);
//         localStorage.setItem("userId", userId);
//         localStorage.setItem("permissions", JSON.stringify(permissions));

//         set({
//           accessToken,
//           userId,
//           permissions,
//           isAuthenticated: true,
//           isLoggedIn: true,
//         });
//       },

//       /* ===================== LOGOUT ===================== */
//       logout: () => {
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("userId");
//         localStorage.removeItem("permissions");

//         set({
//           accessToken: null,
//           userId: null,
//           permissions: [],
//           isAuthenticated: false,
//           isLoggedIn: false,
//         });
//       },

//       /* ===================== RESTORE SESSION ===================== */
//       loadToken: () => {
//         const accessToken = localStorage.getItem("accessToken");
//         const userId = localStorage.getItem("userId");
//         const permissions =
//           JSON.parse(localStorage.getItem("permissions")) || [];

//         if (accessToken && userId) {
//           set({
//             accessToken,
//             userId,
//             permissions,
//             isAuthenticated: true,
//             isLoggedIn: true,
//           });
//         }
//       },
//     }),

//     {
//       name: "auth-storage",

//       partialize: (state) => ({
//         accessToken: state.accessToken,
//         userId: state.userId,
//         permissions: state.permissions,
//         isAuthenticated: state.isAuthenticated,
//         isLoggedIn: state.isLoggedIn,
//       }),

//       onRehydrateStorage: () => (state) => {
//         if (state) {
//           state.hydrated = true;
//         }
//       },
//     }
//   )
// );







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
