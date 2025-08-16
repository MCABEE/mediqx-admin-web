"use client";

import Navlink from "@/components/agentManagement/Navlink";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useAgentStore from "@/app/lib/store/agentManagementStore";

const Page = () => {
  const { agents, totalAgents, loading, error, fetchAgents } = useAgentStore();

  const [page, setPage] = useState(1);
  const limit = 10;
  const filter = "CONFIRMED";

  useEffect(() => {
    fetchAgents(page, limit, filter);
  }, [page, filter, fetchAgents]);

  return (
    <div>
      <Navlink />
      <div className="w-full h-[80px] flex items-center bg-white border border-[#888888] rounded-[15px] mt-2 text-black">
        <h1 className="text-[32px] font-semibold px-8">{totalAgents}</h1>
      </div>
      <table className="w-full border-spacing-y-2 border-separate text-black mt-4">
        <thead className="bg-[#C0D8F6]">
          <tr className="p-2 bg-[#C0D8F6]">
            <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">No</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">Name</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Location
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Category
            </th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={4} className="text-center p-4">
                Loading...
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={4} className="text-center text-red-600 p-4">
                {error}
              </td>
            </tr>
          )}
          {!loading && agents.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center p-4">
                No agents found
              </td>
            </tr>
          )}
          {agents.map((agent, index) => (
            <tr key={agent.id} className="bg-white">
              <td className="p-2">{(page - 1) * limit + index + 1}</td>
              <td className="border-l-4 border-[#C0D8F6] p-2">
                <Link
                  href={`/controlpanel/agentManagement/newAgentDetails/${agent.id}`}
                >
                  {agent.fullName}
                </Link>
              </td>
              <td className="border-l-4 border-[#C0D8F6] p-2">
                {agent.city || "-"}
              </td>
              <td className="border-l-4 border-[#C0D8F6] p-2">
                {agent.typeOfAgent || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
