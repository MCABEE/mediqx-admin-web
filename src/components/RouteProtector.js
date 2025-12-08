// "use client";

// import { useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { useAuthStore } from "@/app/lib/store/authStore";

// export default function RouteProtector({ children }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const { accessToken, } = useAuthStore();

//   useEffect(() => {
//     // If no token → redirect to login
//     if (!accessToken ) {
//       if (pathname !== "/") {
//         router.replace("/");
//       }
//         router.replace("/");

//       return;
//     }

//     // // If token exists and user visits login page → go to dashboard
//     // if (accessToken) {
//     //   router.replace("/controlpanel/dashboard");
//     // }
//   }, [accessToken, router]);

//   return <>{children}</>;
// }










"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/app/lib/store/authStore";

export default function RouteProtector({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const { accessToken, hydrated } = useAuthStore();

  // Always call hooks first — NO conditional returns above this.

  useEffect(() => {
    if (!hydrated) return; // Wait for store to hydrate

    if (!accessToken) {
      if (pathname !== "/") router.replace("/");
      return;
    }

    if (pathname === "/") {
      router.replace("/controlpanel/dashboard");
    }
  }, [hydrated, accessToken, pathname]);

  // Safe to conditionally render UI AFTER hooks
  if (!hydrated) {
    return null; // can show a loader too
  }

  return <>{children}</>;
}
