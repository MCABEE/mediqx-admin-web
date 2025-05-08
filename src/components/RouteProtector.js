"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/axiosInstance"; // your configured Axios instance

const RouteProtector = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/");
      return;
    }

    // Add Axios interceptor to catch 401 errors
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.clear();
          router.push("/");
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor when component unmounts
    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [router]);

  return <>{children}</>;
};

export default RouteProtector;