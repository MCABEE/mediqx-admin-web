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

  useEffect(() => {
    // Direct matches for parent menus
    if (pathname === "/controlpanel/staffManagement") {
      setActive("Healthcare Staff");
      setOpenSubmenu("Staff Management (HR)");
   } else if (pathname.includes("/controlpanel/staffManagement/supervisor")) {
      setActive("Supervisors");
      setOpenSubmenu("Staff Management (HR)");
    } else if (pathname.includes("/controlpanel/agentManagement")) {
      setActive("Agent Management");
      setOpenSubmenu(null);
    } else if (pathname.includes("/controlpanel/caseBooking")) {
      setActive("Service Bookings");
      setOpenSubmenu(null);
    } else if (pathname.includes("/controlpanel/dashboard")) {
      setActive("Home");
      setOpenSubmenu(null);
    } else if (pathname.includes("/controlpanel/cases")) {
      setActive("Cases");
      setOpenSubmenu(null);
    } else if (pathname.includes("/controlpanel/patient-management")) {
      setActive("Patient Management");
      setOpenSubmenu(null);
    } else if (pathname.includes("/controlpanel/referral-management")) {
      setActive("Referrals Management");
      setOpenSubmenu(null);
      // ✅ Handle billing submenus
    } else if (pathname.includes("/controlpanel/billing/payment-structure")) {
      setActive("Payment Structure");
      setOpenSubmenu("Billing"); // parent
    } else if (pathname.includes("/controlpanel/billing/staff-payments")) {
      setActive("Staff Payments");
      setOpenSubmenu("Billing");
      } else if (pathname.includes("/controlpanel/billing/staff-payment-details")) {
      setActive("Staff Payments");
      setOpenSubmenu("Billing");
      } else if (pathname.includes("/controlpanel/billing/patient-bills")) {
      setActive("Patient Bills");
      setOpenSubmenu("Billing");
      // ✅ Handle data-manager submenus
    } else if (pathname.includes("/controlpanel/data-manager/general-data")) {
      setActive("General Data");
      setOpenSubmenu("Data Manager"); // parent
    } else if (pathname.includes("/controlpanel/data-manager/patient-data")) {
      setActive("Patient Data");
      setOpenSubmenu("Data Manager"); // parent
    } else if (
      pathname.includes("/controlpanel/data-manager/professionals-data")
    ) {
      setActive("Professionals Data");
      setOpenSubmenu("Data Manager"); // parent
    } else {
      // Check submenus for match
      let matchedSubmenu = null;
      let matchedParent = null;

      menus.some((menu) => {
        if (menu.hasSubmenu && menu.submenu) {
          return menu.submenu.some((sub) => {
            if (pathname.startsWith(sub.link)) {
              matchedSubmenu = sub.name;
              matchedParent = menu.name;
              return true; // break inner loop
            }
            return false;
          });
        }
        return false;
      });

      if (matchedSubmenu) {
        setActive(matchedSubmenu);
        setOpenSubmenu(matchedParent);
      } else {
        // No submenu match found - try matching parents normally
        const matchedParentMenu = menus.find(
          (menu) => menu.link && pathname.startsWith(menu.link)
        );
        if (matchedParentMenu) {
          setActive(matchedParentMenu.name);
          setOpenSubmenu(null);
        } else {
          // Default fallback
          setActive("Home");
          setOpenSubmenu(null);
        }
      }
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
