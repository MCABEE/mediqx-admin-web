// "use client";

// import React, { useState, useEffect } from "react";
// import { IoIosArrowDown } from "react-icons/io";
// import { useRouter, usePathname } from "next/navigation";
// import { menus } from "../app/lib/Menu";

// function Sidebar() {
//   const [active, setActive] = useState("Home");

//   const router = useRouter();
//   const pathname = usePathname();

//   // Auto-select menu based on pathname
//   useEffect(() => {
//     if (pathname.includes("/controlpanel/staffManagement")) {
//       setActive("Staff Management (HR)");
//     } else if (pathname.includes("/controlpanel/agentManagement")) {
//       setActive("Agent Management");
//     } else if (pathname.includes("/controlpanel/caseBooking")) {
//       setActive("Service Bookings");
//     } else if (pathname.includes("/controlpanel/dashboard")) {
//       setActive("Home");
//     } else if (pathname.includes("/controlpanel/cases")) {
//       setActive("Cases");
//     } else if (pathname.includes("/controlpanel/patient-management")) {
//       setActive("Patient Management");
//     } else if (pathname.includes("/controlpanel/referral-management")) {
//       setActive("Referrals Management");
//     } else {
//       // fallback: match from menu links if more are added later
//       const matched = menus.find(
//         (item) => item.link && pathname.startsWith(item.link)
//       );
//       if (matched) setActive(matched.name);
//     }
//   }, [pathname]);

//   const handleMenuClick = (item) => {
//     setActive(item.name);
//     if (item.link) router.push(item.link);
//   };

//   return (
//     <div className="h-full bg-white rounded-[16px] border-[#8888884d] border-[1px] ps-12 pe-8 pb-8">
//       <div className="h-[75%]">
//         {menus.map((item) => (
//           <div key={item.id}>
//             <div
//               className={`text-black rounded-lg p-x flex items-center justify-between mt-5 cursor-pointer ${
//                 active === item.name
//                   ? "text-black bg-[#F0F4F9] p-2"
//                   : "border border-transparent text-black"
//               }`}
//               onClick={() => handleMenuClick(item)}
//             >
//               <div className="flex items-center gap-4">{item.name}</div>
//               {/* Optional submenu icon logic (not needed now) */}
//               {item.hasSubmenu && (
//                 <IoIosArrowDown
//                   className={`transition-transform duration-300 ${
//                     active === item.name ? "rotate-180" : ""
//                   }`}
//                 />
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Sidebar;





"use client";

import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter, usePathname } from "next/navigation";
import { menus } from "../app/lib/Menu";

function Sidebar() {
  const [active, setActive] = useState("Home");
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const router = useRouter();
  const pathname = usePathname();

  // Auto-select menu based on pathname
  useEffect(() => {
    // Direct matches for parent menus
    if (pathname.includes("/controlpanel/staffManagement")) {
      setActive("Staff Management (HR)");
    } else if (pathname.includes("/controlpanel/agentManagement")) {
      setActive("Agent Management");
    } else if (pathname.includes("/controlpanel/caseBooking")) {
      setActive("Service Bookings");
    } else if (pathname.includes("/controlpanel/dashboard")) {
      setActive("Home");
    } else if (pathname.includes("/controlpanel/cases")) {
      setActive("Cases");
    } else if (pathname.includes("/controlpanel/patient-management")) {
      setActive("Patient Management");
    } else if (pathname.includes("/controlpanel/referral-management")) {
      setActive("Referrals Management");
    // } else if (pathname.includes("/controlpanel/data-manager")) {
    //   setActive("Data Manager");
    } else {
      // Fallback: match submenu links first
      menus.forEach((menu) => {
        if (menu.hasSubmenu && menu.submenu) {
          menu.submenu.forEach((sub) => {
            if (pathname.startsWith(sub.link)) {
              setActive(sub.name);
              setOpenSubmenu(menu.name); // auto open parent
            }
          });
        }
      });

      // Then match top-level menus
      const matched = menus.find(
        (item) => item.link && pathname.startsWith(item.link)
      );
      if (matched) setActive(matched.name);
    }
  }, [pathname]);

  const handleMenuClick = (item) => {
    if (item.hasSubmenu) {
      setOpenSubmenu(openSubmenu === item.name ? null : item.name);
    } else {
      setActive(item.name);
      if (item.link) router.push(item.link);
    }
  };

  const handleSubmenuClick = (sub) => {
    setActive(sub.name);
    if (sub.link) router.push(sub.link);
  };

  return (
    <div className="h-full bg-white rounded-[16px] border-[#8888884d] border-[1px] ps-12 pe-8 pb-8">
      <div className="h-[75%]">
        {menus.map((item) => (
          <div key={item.id}>
        {/* Parent Menu */}
<div
  className={`rounded-lg flex items-center justify-between mt-5 cursor-pointer ${
    active === item.name ||
    (item.hasSubmenu &&
      item.submenu?.some((sub) => sub.name === active))
      ? "text-[#3674B5] font-semibold bg-[#F0F4F9] p-2"
      : "border border-transparent text-black"
  }`}
  onClick={() => handleMenuClick(item)}
>
  <div className="flex items-center gap-4">{item.name}</div>
  {item.hasSubmenu && (
    <IoIosArrowDown
      className={`transition-transform duration-300 ${
        openSubmenu === item.name ? "rotate-180" : ""
      }`}
    />
  )}
</div>

{/* Submenu */}
{/* Submenu */}
{item.hasSubmenu && openSubmenu === item.name && (
  <div className="ml-6 mt-2">
    {item.submenu?.map((sub) => (
      <div
        key={sub.id}
        className={`p-2 rounded-lg cursor-pointer ${
          active === sub.name
            ? "bg-[#E6ECF5] text-[#3674B5]"
            : "text-gray-600 hover:bg-[#F7F9FC]"
        }`}
        onClick={(e) => {
          e.stopPropagation(); // ✅ prevent parent toggle
          handleSubmenuClick(sub);
        }}
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
