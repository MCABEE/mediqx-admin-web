"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = () => {
  const pathname = usePathname();

  const isActive = (path) => pathname.startsWith(path); // Check if pathname starts with the given path

  return (
    <div className="w-full bg-white border border-[#888888] text-base text-black font-semibold flex gap-[72px] px-6 pt-6 rounded-[15px]">
      <Link
        href="/controlpanel/agentManagement/newAgentRequest"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          isActive("/controlpanel/agentManagement/newAgentRequest") ||
          isActive("/controlpanel/agentManagement/newAgentDetails")
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        New Agent Requests
      </Link>
      <Link
        href="/controlpanel/agentManagement/allAgent"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          isActive("/controlpanel/agentManagement/allAgent") ||
          isActive("/controlpanel/agentManagement/allAgentDetails")
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        All Agent
      </Link>
      <Link
        href="/controlpanel/agentManagement/addNewAgent"
        className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
          isActive("/controlpanel/agentManagement/addNewAgent")
            ? "border-b-8 border-[#3674B5]"
            : "border-b-2 border-transparent"
        }`}
      >
        Add New Agent
      </Link>
    </div>
  );
};

export default Navlink;
