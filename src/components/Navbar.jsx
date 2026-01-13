// "use client";

// import React, { useState } from "react";
// import { IoMdPower } from "react-icons/io";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/app/lib/store/authStore";

// const Navbar = () => {
//   const router = useRouter();
//   const [showLogout, setShowLogout] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const {logout} =useAuthStore()

//   const handleLogout = () => {
//     logout();
//     localStorage.clear(); // clear token or user data
//     router.replace("/"); // redirect
//   };

//   return (
//     <div className="w-full flex justify-between items-center px-[66px] mb-9 bg-white rounded-[15px] relative">
//       <img
//         src="/logo.svg"
//         alt="Logo"
//         className="pt-[18px] pb-[11px] w-[100px] h-[65px]"
//       />

//       <div className="flex gap-4 items-center relative">
//         <img src="/profile.svg" alt="Profile" />
//         <p className="text-base text-[#333333]">Administrator</p>

//         {/* Toggle logout options */}
//         <IoMdPower
//           className="size-4 text-[#333333] cursor-pointer"
//           onClick={() => setShowLogout((prev) => !prev)}
//         />

//         {/* Logout Button */}
//         {showLogout && (
//           <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded-md shadow-lg p-2 z-10">
//             <button
//               onClick={() => {
//                 setShowConfirm(true);
//                 setShowLogout(false);
//               }}
//               className="text-sm text-red-600 hover:underline cursor-pointer"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Confirmation Modal */}
//       {showConfirm && (
//         <div className="fixed inset-0 bg-[#0b010143] backdrop-blur-[2px] flex justify-center items-center z-20">
//           <div className="bg-white p-6 rounded-[15px] shadow-lg text-center w-[500px] h-[250px] flex justify-center items-center flex-col">
//             <p className="mb-4 text-gray-800 font-medium">
//               Are you sure you want to logout?
//             </p>
//             <div className="flex justify-center gap-4 mt-6">
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
//               >
//                 Logout
//               </button>
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;









"use client";

import React, { useState } from "react";
import { IoMdPower } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/lib/store/authStore";

const Navbar = () => {
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { logout, username, isMainAdmin } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <div className="w-full flex justify-between items-center px-[66px] mb-9 bg-white rounded-[15px] relative">
      {/* LEFT LOGO */}
      <img
        src="/logo.svg"
        alt="Logo"
        className="pt-[18px] pb-[11px] w-[100px] h-[65px]"
      />

      {/* RIGHT USER AREA */}
      <div className="flex gap-4 items-center relative">
        {/* PROFILE CIRCLE */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isMainAdmin ? "bg-[#dadbdc]" : "bg-gray-300"
          }`}
        >
          {isMainAdmin ? (
            <img
              src="/mediqx-profile.svg"
              alt="Admin"
              className="w-6 h-6 object-contain"
            />
          ) : (
            <span className="text-[#3674b5] text-xl font-semibold">
              {username?.charAt(0)?.toUpperCase()}
            </span>
          )}
        </div>

        {/* USER NAME */}
        <p className="text-base text-[#333333] font-medium">
          {username || "User"}
        </p>

        {/* POWER ICON */}
        <IoMdPower
          className="size-4 ms-8 text-[#333333] font-bold cursor-pointer hover:text-red-600"
          onClick={() => setShowLogout((prev) => !prev)}
        />

        {/* LOGOUT DROPDOWN */}
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

      {/* CONFIRM LOGOUT MODAL */}
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
