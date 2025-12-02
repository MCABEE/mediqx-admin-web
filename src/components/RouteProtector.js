"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/app/lib/store/authStore";

export default function RouteProtector({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const { accessToken, } = useAuthStore();

  useEffect(() => {
    // If no token → redirect to login
    if (!accessToken ) {
      if (pathname !== "/") {
        router.replace("/");
      }
      return;
    }

    // // If token exists and user visits login page → go to dashboard
    // if (accessToken) {
    //   router.replace("/controlpanel/dashboard");
    // }
  }, [accessToken, router]);

  return <>{children}</>;
}
