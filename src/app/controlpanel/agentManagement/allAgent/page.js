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

  const totalPages = Math.ceil(totalAgents / limit) || 1;

  const goToNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const goToPrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

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
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">Location</th>
            <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">Category</th>
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

          {agents.map((agent, index) => {
            const url = `/controlpanel/agentManagement/allAgentDetails/${agent.id}`;

            return (
              <Link key={agent.id} href={url} passHref legacyBehavior>
                <tr
                  className="bg-white cursor-pointer hover:bg-blue-100"
                  tabIndex={0}
                  role="link"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      window.location.href = url;
                    }
                  }}
                >
                  <td className="p-2">{(page - 1) * limit + index + 1}</td>
                  <td className="border-l-4 border-[#C0D8F6] p-2">{agent.fullName}</td>
                  <td className="border-l-4 border-[#C0D8F6] p-2">{agent.city || "-"}</td>
                  <td className="border-l-4 border-[#C0D8F6] p-2">{agent.typeOfAgent || "-"}</td>
                </tr>
              </Link>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 px-4 mb-2">
        <button
          disabled={page === 1}
          onClick={goToPrevPage}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={goToNextPage}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
