"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/axiosInstance";

const isValidJWT = (token) => {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  return parts.length === 3;
};

const RouteProtector = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token || token.trim() === "" || !isValidJWT(token)) {
      localStorage.clear();
      router.push("/"); 
      return;
    }

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

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [router]);

  return <>{children}</>;
};

export default RouteProtector;
