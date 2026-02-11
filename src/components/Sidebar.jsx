// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { IoIosArrowDown } from "react-icons/io";
// import { useRouter, usePathname } from "next/navigation";
// import { menus } from "../app/lib/Menu";

// function Sidebar() {
//   const [active, setActive] = useState("Home");
//   const [openSubmenu, setOpenSubmenu] = useState(null);

//   const router = useRouter();
//   const pathname = usePathname();

//   /* ===================== PERMISSIONS ===================== */
//   const permissions = useMemo(() => {
//     try {
//       return JSON.parse(localStorage.getItem("permissions")) || [];
//     } catch {
//       return [];
//     }
//   }, []);

//   /* ===================== FILTER MENUS ===================== */
//   const allowedMenus = useMemo(() => {
//     return menus.filter(
//       (menu) =>
//         menu.permission === null || permissions.includes(menu.permission)
//     );
//   }, [permissions]);

//   /* ===================== ACTIVE PATH LOGIC (UNCHANGED) ===================== */
//   useEffect(() => {
//     if (pathname === "/controlpanel/staffManagement") {
//       setActive("Healthcare Staff");
//       setOpenSubmenu("Staff Manager");
//     } else if (pathname.includes("/controlpanel/staffManagement/supervisor")) {
//       setActive("Supervisors");
//       setOpenSubmenu("Staff Manager");
//     } else if (pathname.includes("/controlpanel/agentManagement")) {
//       setActive("Agent Manager");
//       setOpenSubmenu(null);
//     } else if (pathname.includes("/controlpanel/caseBooking")) {
//       setActive("Service Bookings");
//       setOpenSubmenu(null);
//     } else if (pathname.includes("/controlpanel/notifications")) {
//       setActive("Notifications");
//       setOpenSubmenu(null);
//     } else if (pathname.includes("/controlpanel/product-management")) {
//       setActive("Products");
//       setOpenSubmenu(null);
//     } else if (pathname.includes("/controlpanel/dashboard")) {
//       setActive("Home");
//       setOpenSubmenu(null);
//     } else if (pathname.includes("/controlpanel/cases")) {
//       setActive("Cases");
//       setOpenSubmenu(null);
//     } else if (pathname.includes("/controlpanel/patient-management")) {
//       setActive("Patient Data");
//       setOpenSubmenu(null);
//     } else if (pathname.includes("/controlpanel/referral-management")) {
//       setActive("Referrals Manager");
//       setOpenSubmenu(null);
//     } else if (pathname.includes("/controlpanel/ledger-management")) {
//       setActive("Ledger");
//       setOpenSubmenu(null);
//     } else if (pathname.includes("/controlpanel/ambulances")) {
//       setActive("Ambulances");
//       setOpenSubmenu(null);
//     } else if (pathname.includes("/controlpanel/rating-and-review")) {
//       setActive("Rating & Review");
//       setOpenSubmenu(null);
//     } else if (pathname.includes("/controlpanel/user-access-management")) {
//       setActive("User Access");
//       setOpenSubmenu(null);
//     } else if (pathname.includes("/controlpanel/billing/payment-structure")) {

//     /* ---------- Billing ---------- */
//       setActive("Payment Structure");
//       setOpenSubmenu("Billing");
//     } else if (
//       pathname.includes("/controlpanel/billing/staff-payments") ||
//       pathname.includes("/controlpanel/billing/staff-payment-details")
//     ) {
//       setActive("Staff Payments");
//       setOpenSubmenu("Billing");
//     } else if (pathname.includes("/controlpanel/billing/patient-bills")) {
//       setActive("Patient Bills");
//       setOpenSubmenu("Billing");
//     } else if (pathname.includes("/controlpanel/data-manager/general-data")) {

//     /* ---------- Data Manager ---------- */
//       setActive("General Data");
//       setOpenSubmenu("Data Manager");
//     } else if (pathname.includes("/controlpanel/data-manager/patient-data")) {
//       setActive("Patient Data");
//       setOpenSubmenu("Data Manager");
//     } else if (
//       pathname.includes("/controlpanel/data-manager/professionals-data")
//     ) {
//       setActive("Professionals Data");
//       setOpenSubmenu("Data Manager");
//     }
//   }, [pathname]);

//   /* ===================== HANDLERS ===================== */
//   const handleMenuClick = (item) => {
//     if (item.hasSubmenu) {
//       setOpenSubmenu(openSubmenu === item.name ? null : item.name);
//     } else {
//       setActive(item.name);
//       item.link && router.push(item.link);
//     }
//   };

//   const handleSubmenuClick = (sub) => {
//     setActive(sub.name);
//     sub.link && router.push(sub.link);
//   };

//   /* ===================== RENDER ===================== */
//   return (
//     <div className="h-full bg-white text-[16px] font-semibold rounded-[16px] border border-[#8888884d]  pb-8">
//       <div className="h-[75%]">
//         {allowedMenus.map((item) => (
//           <div key={item.id}>
//             {/* Parent Menu */}
//             <div
//               onClick={() => handleMenuClick(item)}
//               className={`flex  ps-[31px] pe-4 items-center justify-between mt-5 cursor-pointer ${
//                 active === item.name ||
//                 item.submenu?.some((sub) => sub.name === active)
//                   ? "text-black font-semibold bg-[#F0F4F9] p-2"
//                   : "text-[#666666]"
//               }`}
//             >
//               <span>{item.name}</span>

//               {item.hasSubmenu && (
//                 <IoIosArrowDown
//                   className={`transition-transform duration-300 ${
//                     openSubmenu === item.name ? "rotate-180" : ""
//                   }`}
//                 />
//               )}
//             </div>

//             {/* Submenu */}
//             {item.hasSubmenu && openSubmenu === item.name && (
//               <div className="ml-6 mt-2 ms-[8px]">
//                 {item.submenu.map((sub) => (
//                   <div
//                     key={sub.id}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleSubmenuClick(sub);
//                     }}
//                     className={`p-2 ps-4 me-4 rounded-lg cursor-pointer ${
//                       active === sub.name
//                         ? "bg-[#F0F4F9] text-[#000000]"
//                         : "text-gray-600 hover:bg-[#F7F9FC]"
//                     }`}
//                   >
//                     {sub.name}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Sidebar;









"use client";

import React, { useState, useEffect, useMemo } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter, usePathname } from "next/navigation";
import { menus } from "../app/lib/Menu";

function Sidebar() {
  const [active, setActive] = useState("Home");
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const router = useRouter();
  const pathname = usePathname();

  /* ===================== PERMISSIONS ===================== */
  const permissions = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("permissions")) || [];
    } catch {
      return [];
    }
  }, []);

  /* ===================== FILTER MENUS ===================== */
  const allowedMenus = useMemo(() => {
    return menus.filter(
      (menu) =>
        menu.permission === null || permissions.includes(menu.permission)
    );
  }, [permissions]);

  /* ===================== ACTIVE PATH LOGIC ===================== */
  useEffect(() => {
    if (pathname.includes ("/controlpanel/staffManagement")) {
      setActive("Healthcare Staff");
      setOpenSubmenu("Staff Manager");
    } else if (pathname.includes("/controlpanel/staffManagement/supervisor")) {
      setActive("Supervisors");
      setOpenSubmenu("Staff Manager");
    } else if (pathname.includes("/controlpanel/agentManagement")) {
      setActive("Agent Manager");
      setOpenSubmenu(null);
    } else if (pathname.includes("/controlpanel/caseBooking")) {
      setActive("Service Bookings");
      setOpenSubmenu(null);
    } else if (pathname.includes("/controlpanel/notifications")) {
      setActive("Notifications");
      setOpenSubmenu(null);
    } else if (pathname.includes("/controlpanel/product-management")) {
      setActive("Products");
      setOpenSubmenu(null);
    } else if (pathname.includes("/controlpanel/dashboard")) {
      setActive("Home");
      setOpenSubmenu(null);
    } else if (pathname.includes("/controlpanel/cases")) {
      setActive("Cases");
      setOpenSubmenu(null);
    } else if (pathname.includes("/controlpanel/patient-management")) {
      setActive("Patient Data");
      setOpenSubmenu(null);
    } else if (pathname.includes("/controlpanel/referral-management")) {
      setActive("Referrals Manager");
      setOpenSubmenu(null);
    } else if (pathname.includes("/controlpanel/ledger-management")) {
      setActive("Ledger");
      setOpenSubmenu(null);
    } else if (pathname.includes("/controlpanel/ambulances")) {
      setActive("Ambulances");
      setOpenSubmenu(null);
    } else if (pathname.includes("/controlpanel/rating-and-review")) {
      setActive("Rating & Review");
      setOpenSubmenu(null);
    } else if (pathname.includes("/controlpanel/user-access-management")) {
      setActive("User Access");
      setOpenSubmenu(null);
    } else if (pathname.includes("/controlpanel/billing/payment-structure")) {
      setActive("Payment Structure");
      setOpenSubmenu("Billing");
    } else if (
      pathname.includes("/controlpanel/billing/staff-payments") ||
      pathname.includes("/controlpanel/billing/staff-payment-details")
    ) {
      setActive("Staff Payments");
      setOpenSubmenu("Billing");
    } else if (pathname.includes("/controlpanel/billing/patient-bills")) {
      setActive("Patient Bills");
      setOpenSubmenu("Billing");
    } else if (pathname.includes("/controlpanel/data-manager/general-data")) {
      setActive("General Data");
      setOpenSubmenu("Data Manager");
    } else if (pathname.includes("/controlpanel/data-manager/patient-data")) {
      setActive("Patients Data");
      setOpenSubmenu("Data Manager");
    } else if (
      pathname.includes("/controlpanel/data-manager/professionals-data")
    ) {
      setActive("Professionals Data");
      setOpenSubmenu("Data Manager");
    }
  }, [pathname]);

  /* ===================== HANDLERS ===================== */
  const handleMenuClick = (item) => {
    if (item.hasSubmenu) {
      setOpenSubmenu(openSubmenu === item.name ? null : item.name);
    } else {
      setActive(item.name);
      item.link && router.push(item.link);
    }
  };

  const handleSubmenuClick = (sub) => {
    setActive(sub.name);
    sub.link && router.push(sub.link);
  };

  /* ===================== RENDER ===================== */
  return (
    <div className="h-full bg-white text-[16px] font-semibold rounded-[16px] border border-[#8888884d] pb-8">
      <div className="h-[75%]">
        {allowedMenus.map((item) => (
          <div key={item.id}>
            {/* Parent Menu */}
            <div
              onClick={() => handleMenuClick(item)}
              className={`flex ps-[31px] pe-4 items-center justify-between mt-5 cursor-pointer ${
                active === item.name ||
                (openSubmenu === item.name &&
                  item.submenu?.some((sub) => sub.name === active))
                  ? "text-black font-semibold bg-[#F0F4F9] p-2"
                  : "text-[#666666]"
              }`}
            >
              <span>{item.name}</span>

              {item.hasSubmenu && (
                <IoIosArrowDown
                  className={`transition-transform duration-300 ${
                    openSubmenu === item.name ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>

            {/* Submenu */}
            {item.hasSubmenu && openSubmenu === item.name && (
              <div className="ml-6 mt-2 ms-[8px]">
                {item.submenu.map((sub) => (
                  <div
                    key={sub.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubmenuClick(sub);
                    }}
                    className={`p-2 ps-4 me-4 rounded-lg cursor-pointer ${
                      active === sub.name
                        ? "bg-[#F0F4F9] text-[#000000]"
                        : "text-gray-600 hover:bg-[#F7F9FC]"
                    }`}
                  >
                    {sub.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
