"use client";

import React, { useEffect, useState } from "react";
import useUserAccessStore from "@/app/lib/store/useUserAccessStore";
import CoAdminPopup from "./CoAdminPopup";
import { GrLinkNext } from "react-icons/gr";

export default function UserAccessTable() {
  const {
    coAdmins,
    fetchCoAdmins,
    page,
    totalPages,
  } = useUserAccessStore();

  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchCoAdmins(1);
  }, []);

  return (
    <div>
      <div className="bg-[#C0D8F6] font-semibold rounded-[15px] mt-2 px-8 py-2">
        All Co-Admin
      </div>

      <div className="overflow-x-auto mt-2">
        <table className="w-full border-separate border-spacing-y-2 text-black">
             <thead className="bg-[#C0D8F6]">
            <tr>
              <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">
                No
              </th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                Name
              </th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                Email ID
              </th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                Role
              </th>
              <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
                Manage
              </th>
            </tr>

         
          </thead>

         
          <tbody>
            {coAdmins.map((c, i) => (
              <tr key={c.id} className="bg-white">
                <td className="p-2">{i + 1}</td>
                <td className="border-l-4 border-[#C0D8F6] p-2">{c.name}</td>
                <td className="border-l-4 border-[#C0D8F6] p-2">{c.email}</td>
                <td className="border-l-4 border-[#C0D8F6] p-2">{c.role}</td>
                <td
                  className="border-l-4 border-[#C0D8F6] p-2 ps-10 hover:text-2xl cursor-pointer"
                  onClick={() => setSelectedId(c.id)}
                >
                  <GrLinkNext className=" "/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between my-4">
          <button
            disabled={page === 1}
            onClick={() => fetchCoAdmins(page - 1)}
          className="px-4 py-2 border bg-blue-500 text-white rounded disabled:opacity-50"
            
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => fetchCoAdmins(page + 1)}
          className="px-4 py-2 border bg-blue-500 text-white rounded disabled:opacity-50"

          >
            Next
          </button>
        </div>
      </div>

      {/* POPUP */}
      {selectedId && (
        <CoAdminPopup
          id={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
