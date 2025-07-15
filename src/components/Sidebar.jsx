"use client";

import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter, usePathname } from "next/navigation";
import { menus } from "../app/lib/Menu";

function Sidebar() {
  const [active, setActive] = useState("Home");

  const router = useRouter();
  const pathname = usePathname();

  // Auto-select menu based on pathname
  useEffect(() => {
    if (pathname.includes("/controlpanel/staffManagement")) {
      setActive("Staff Management (HR)");
    } else if (pathname.includes("/controlpanel/agentManagement")) {
      setActive("Agent Management");
    } else if (pathname.includes("/controlpanel/caseBooking")) {
      setActive("Service Bookings");
    } else if (pathname.includes("/controlpanel/dashboard")) {
      setActive("Home");
    }  else if (pathname.includes("/controlpanel/cases")) {
      setActive("Cases");
    }  else if (pathname.includes("/controlpanel/patient-management/ongoing-patients")) {
      setActive("Patient Management");
    } else {
      // fallback: match from menu links if more are added later
      const matched = menus.find(
        (item) => item.link && pathname.startsWith(item.link)
      );
      if (matched) setActive(matched.name);
    }
  }, [pathname]);

  const handleMenuClick = (item) => {
    setActive(item.name);
    if (item.link) router.push(item.link);
  };

  return (
    <div className="h-full bg-white rounded-[16px] border-[#8888884d] border-[1px] ps-12 pe-8 pb-8">
      <div className="h-[75%]">
        {menus.map((item) => (
          <div key={item.id}>
            <div
              className={`text-black rounded-lg p-x flex items-center justify-between mt-5 cursor-pointer ${
                active === item.name
                  ? "text-black bg-[#F0F4F9] p-2"
                  : "border border-transparent text-black"
              }`}
              onClick={() => handleMenuClick(item)}
            >
              <div className="flex items-center gap-4">{item.name}</div>
              {/* Optional submenu icon logic (not needed now) */}
              {item.hasSubmenu && (
                <IoIosArrowDown
                  className={`transition-transform duration-300 ${
                    active === item.name ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
