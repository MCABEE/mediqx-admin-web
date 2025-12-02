"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./lib/store/authStore"; // adjust path if needed
import { login } from "@/api/auth"; // adjust path if needed

export default function Home() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { login: loginToStore, loadToken,accessToken } = useAuthStore();

  useEffect(() => {
    loadToken(); 
  }, [loadToken]);

  useEffect(()=>{
    if (accessToken) {
      router.replace("/controlpanel/dashboard");
    }
  },[accessToken]);

 
  //   setErrorMessage("");
  //   setLoading(true); 

  //   try {
  //     const data = await login(mobileNumber, password);
  //     const accessToken = data?.data.accessToken;

  //     if (accessToken) {
  //       loginToStore(accessToken);
  //       router.push("/controlpanel/dashboard");
  //     } else {
  //       setErrorMessage("Login failed: No token received.");
  //     }
  //   } catch (error) {
  //     console.error("Login failed", error);

  //     const message =
  //       error?.response?.data?.message ||
  //       error?.message ||
  //       "Login failed. Please try again.";

  //     setErrorMessage(message);
  //   } finally {
  //     setLoading(false); // Stop loading in any case
  //   }
  // };
const handleLogin = async (e) => {
  e.preventDefault();
  setErrorMessage("");
  setLoading(true);

  try {
    const data = await login(mobileNumber, password);

    const accessToken = data?.data?.accessToken;
    const userId = data?.data?.userId; // <-- get userId from API

    if (accessToken && userId) {
      loginToStore(accessToken, userId); // pass both to store
      router.push("/controlpanel/dashboard");
    } else {
      setErrorMessage("Login failed: Missing token or userId.");
    }
  } catch (error) {
    console.error("Login failed", error);
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Login failed. Please try again.";
    setErrorMessage(message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <main className="flex-grow px-5 md:px-20 md:py-20 flex justify-center">
        <section className="flex flex-col md:flex-row justify-between items-center px-5 md:px-16 py-12 bg-white rounded-[30px] mx-auto min-w-full">
          <div className="flex-1 flex justify-center mb-4 md:mb-0">
            <img
              loading="lazy"
              src={"/logo.svg"}
              alt="Master Control Panel Logo"
              className="object-contain max-w-full aspect-[0.63]"
            />
          </div>
          <div className="flex-1">
            <form
              onSubmit={handleLogin}
              className="flex flex-col w-full max-w-md mx-auto"
            >
              <h2 className="text-2xl md:text-3xl leading-10 text-zinc-800 text-left mb-6 font-semibold">
                Master <br /> Control Panel
              </h2>
              <div className="flex flex-col gap-5 mt-3">
                <input
                  id="email"
                  type="text"
                  className="px-4 py-3.5 w-full bg-white border border-neutral-400 rounded-xl text-[#333333]"
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
                <input
                  id="password"
                  type="text"
                  className="px-4 py-3.5 w-full bg-white border border-neutral-400 rounded-xl text-[#333333]"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="h-4">
                {errorMessage && (
                  <div className=" text-red-600 text-sm mt-2 ">
                    {errorMessage}
                  </div>
                )}
              </div>
              <div className="flex justify-center md:justify-end mt-5">
                <button
                  type="submit"
                  className={`w-[120px] py-2 text-white rounded-3xl ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-[#3674B5] cursor-pointer"
                  }`}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
