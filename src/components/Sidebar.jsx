"use client";

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation"; // Next.js navigation
import { menus } from "../app/lib/Menu";

function Sidebar() {
  const [active, setActive] = useState("Home");
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const [activeSubSubMenu, setActiveSubSubMenu] = useState("");

  const router = useRouter(); // Next.js router

  const handleMenuClick = (item) => {
    setActive((prev) => (prev !== item.name ? item.name : prev));
    if (item.subMenu && item.subMenu.length > 0 && active !== item.name) {
      setActiveSubMenu("");
      setActiveSubSubMenu("");
    }
    if (item.link) router.push(item.link); // Navigate using Next.js
  };

  const handleSubMenuClick = (subItem) => {
    setActiveSubMenu((prev) => (prev !== subItem.name ? subItem.name : prev));
    if (subItem.subSubMenus && subItem.subSubMenus.length > 0) {
      setActiveSubSubMenu("");
    } else if (subItem.link) {
      router.push(subItem.link);
    }
  };

  const handleSubSubMenuClick = (subSubItem) => {
    setActiveSubSubMenu((prev) =>
      prev !== subSubItem.name ? subSubItem.name : prev
    );
    if (subSubItem.link) {
      router.push(subSubItem.link);
    }
  };

  return (
    <div className="h-full  bg-white rounded-[16px] border-[#8888884d] border-[1px] ps-12 pe-8">
      <div className="h-[75%]">
        {menus.map((item) => (
          <div key={item.id}>
            <div
              className={`text-black rounded-lg p-x flex items-center justify-between mt-5  cursor-pointer ${
                active === item.name
                  ? "text-black bg-[#F0F4F9] p-2 "
                  : "border border-transparent text-black"
              }`}
              onClick={() => handleMenuClick(item)}
            >
              <div className="flex items-center gap-4">{item.name}</div>
              {item.subMenu && item.subMenu.length > 0 && (
                <IoIosArrowDown
                  className={`transition-transform duration-300 ${
                    active === item.name ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>

            {item.subMenu && item.subMenu.length > 0 && (
              <div
                className={`ml-6 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
                  active === item.name
                    ? "max-h-80 opacity-100 overflow-y-scroll scrollbar"
                    : "max-h-0 opacity-0"
                }`}
              >
                {item.subMenu.map((subItem) => (
                  <div key={subItem.id}>
                    <div
                      className={`rounded-lg p-2 flex items-center justify-between gap-4 cursor-pointer ${
                        activeSubMenu === subItem.name
                          ? "text-black bg-[#F0F4F9]"
                          : "border border-transparent text-black"
                      }`}
                      onClick={() => handleSubMenuClick(subItem)}
                    >
                      <div>{subItem.name}</div>
                      {subItem.subMenus && subItem.subMenus.length > 0 && (
                        <IoIosArrowDown
                          className={`transition-transform duration-300 ${
                            activeSubMenu === subItem.name ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>

                 
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
