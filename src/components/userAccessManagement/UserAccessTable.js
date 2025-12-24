// import React from 'react'

// function UserAccessTable() {
//   return (
//     <div>
//       <div className='bg-[#C0D8F6] font-semibold rounded-[15px] mt-2 px-8 py-2'>
//         All Co-Admin
//       </div>
//          {/* Table */}
//       <div className="overflow-x-auto mt-2">
//         <table className="w-full border-spacing-y-2 border-separate text-black">
          // <thead className="bg-[#C0D8F6]">
          //   <tr>
          //     <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">
          //       No
          //     </th>
          //     <th className="text-base border-l-4 border-[#F0F4F9] p-2">
          //       Name
          //     </th>
          //     <th className="text-base border-l-4 border-[#F0F4F9] p-2">
          //       Email ID
          //     </th>
          //     <th className="text-base border-l-4 border-[#F0F4F9] p-2">
          //       Role
          //     </th>
          //     <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
          //       Manage
          //     </th>
          //   </tr>

         
          // </thead>
//           <tbody>
//              <tr
//               className="bg-white cursor-pointer hover:bg-gray-100"
//             >
//               <td className="p-2">1</td>
//               <td className="border-l-4 border-[#C0D8F6] p-2 hover:underline">
//                 Sevv
//               </td>
//               <td className="border-l-4 border-[#C0D8F6] p-2">kejkhg@gmail,.ke</td>
//               <td className="border-l-4 border-[#C0D8F6] p-2">Hr Managerere</td>
//               <td className="border-l-4 border-[#C0D8F6] p-2">{">"}</td>
//             </tr>
//           </tbody>
//         </table>

//         {/* Pagination */}

//         <div className="flex justify-between my-4 gap-4">
//           <button className="px-4 py-1 rounded bg-[#5f9de9] text-white disabled:opacity-50">
//             Prev
//           </button>
//           <span className="text-sm font-medium self-center">Page 3 of 9</span>
//           <button className="px-4 py-1 rounded bg-[#5f9de9] text-white disabled:opacity-50">
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserAccessTable







// "use client";

// import React, { useEffect } from "react";
// import useUserAccessStore from "@/app/lib/store/useUserAccessStore";

// function UserAccessTable() {
//   const {
//     coAdmins,
//     fetchCoAdmins,
//     page,
//     totalPages,
//     loading,
//   } = useUserAccessStore();

//   useEffect(() => {
//     fetchCoAdmins(1);
//   }, [fetchCoAdmins]);

//   return (
//     <div>
//       <div className="bg-[#C0D8F6] font-semibold rounded-[15px] mt-2 px-8 py-2">
//         All Co-Admin
//       </div>

//       <div className="overflow-x-auto mt-2">
//         <table className="w-full border-spacing-y-2 border-separate">
          // <thead className="bg-[#C0D8F6]">
          //   <tr>
          //     <th className="p-2 rounded-l-2xl">No</th>
          //     <th className="p-2 border-l-4">Name</th>
          //     <th className="p-2 border-l-4">Email</th>
          //     <th className="p-2 border-l-4">Role</th>
          //     <th className="p-2 border-l-4 rounded-r-2xl">
          //       Manage
          //     </th>
          //   </tr>
          // </thead>

//           <tbody>
//             {!loading &&
//               coAdmins.map((u, i) => (
//                 <tr
//                   key={u.id}
//                   className="bg-white hover:bg-gray-100"
//                 >
//                   <td className="p-2">{i + 1}</td>
//                   <td className="p-2 border-l-4">
//                     {u.name}
//                   </td>
//                   <td className="p-2 border-l-4">
//                     {u.email}
//                   </td>
//                   <td className="p-2 border-l-4">
//                     {u.role}
//                   </td>
//                   <td className="p-2 border-l-4">{">"}</td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>

//         {/* PAGINATION */}
//         <div className="flex justify-between my-4 gap-4">
//           <button
//             disabled={page === 1}
//             onClick={() => fetchCoAdmins(page - 1)}
//             className="px-4 py-1 bg-[#5f9de9] text-white rounded disabled:opacity-50"
//           >
//             Prev
//           </button>

//           <span className="self-center">
//             Page {page} of {totalPages}
//           </span>

//           <button
//             disabled={page === totalPages}
//             onClick={() => fetchCoAdmins(page + 1)}
//             className="px-4 py-1 bg-[#5f9de9] text-white rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserAccessTable;








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
