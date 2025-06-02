
"use client";

import React, { useState } from "react";
import { IoMdPower } from "react-icons/io";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.clear(); // clear token or user data
    router.push("/"); // redirect
  };

  return (
    <div className="w-full flex justify-between items-center px-[66px] mb-9 bg-white rounded-[15px] relative">
      <img
        src="/logo.svg"
        alt="Logo"
        className="pt-[22px] pb-[11px] w-[200px] h-[65px]"
      />

      <div className="flex gap-4 items-center relative">
        <img src="/profile.svg" alt="Profile" />
        <p className="text-base text-[#333333]">Administrator</p>

        {/* Toggle logout options */}
        <IoMdPower
          className="size-4 text-[#333333] cursor-pointer"
          onClick={() => setShowLogout((prev) => !prev)}
        />

        {/* Logout Button */}
        {showLogout && (
          <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded-md shadow-lg p-2 z-10">
            <button
              onClick={() => {
                setShowConfirm(true);
                setShowLogout(false);
              }}
              className="text-sm text-red-600 hover:underline cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-[#0b010143] backdrop-blur-[2px] flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-[15px] shadow-lg text-center w-[500px] h-[250px] flex justify-center items-center flex-col">
            <p className="mb-4 text-gray-800 font-medium">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
              >
                Logout
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
