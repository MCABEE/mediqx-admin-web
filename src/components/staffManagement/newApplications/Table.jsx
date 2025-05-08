// import React from 'react'
// import Link from 'next/link'
// const Table = () => {
//   return (
//     <div>

//       <table className="w-full border-spacing-y-2 border-separate text-black">
//         <thead className="bg-[#C0D8F6]">
//           <tr className="p-2 bg-[#C0D8F6]">
//             <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">No</th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2"> Name</th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               {" "}
//               Location
//             </th>
//             <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//               {" "}
//               Gender
//             </th>

//             <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
//               Qualification
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td
//               className="rounded-t-2xl p-2 bg-[#C0D8F6] text-[16px] font-semibold"
//               colSpan="5"
//             >
//               2024 September 01, Sunday
//             </td>
//           </tr>

//           <tr className="bg-white">
//             <td className="p-2">03</td>
//             <Link href={"/controlpanel/staffManagement/staffDetails"}>
//               <td className="border-l-4 border-[#C0D8F6] p-2">
//                 Pradeep Kumar N
//               </td>
//             </Link>
//             <td className="border-l-4 border-[#C0D8F6] p-2">Bengaluru</td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">M</td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">Bsc Science</td>
//           </tr>
//           <tr className="bg-white">
//             <td className="p-2">03</td>
//             <Link href={"/controlpanel/staffManagement/staffDetails"}>
//               <td className="border-l-4 border-[#C0D8F6] p-2">Sai Krishna G</td>
//             </Link>
//             <td className="border-l-4 border-[#C0D8F6] p-2">Kannur</td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">M</td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">GNM</td>
//           </tr>
//           <tr className="bg-white">
//             <td className="p-2">03</td>
//             <Link href={"/controlpanel/staffManagement/staffDetails"}>
//               <td className="border-l-4 border-[#C0D8F6] p-2">
//                 Sruthi Lakshmi N
//               </td>
//             </Link>
//             <td className="border-l-4 border-[#C0D8F6] p-2">Wayanad</td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">M</td>
//             <td className="border-l-4 border-[#C0D8F6] p-2">ANM</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default Table

"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import nurseStore from "@/app/lib/store/nurseStore";

const Table = () => {
  const { users, fetchNurses, fetchNurseById, isLoading, error } = nurseStore();
  const router = useRouter();

  useEffect(() => {
    fetchNurses();
  }, [fetchNurses]);

  const handleNameClick = async (userId) => {
    await fetchNurseById(userId);
    router.push(`/controlpanel/staffManagement/staffDetails`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-spacing-y-2 border-separate text-black">
        <thead className="bg-[#C0D8F6]">
          <tr className="p-2 bg-[#C0D8F6]">
            <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">No</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">Name</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Location
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Gender
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
              Qualification
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.length > 0 && (
            <tr>
              <td
                colSpan="5"
                className="rounded-t-2xl p-2 bg-[#C0D8F6] text-[16px] font-semibold"
              >
                {new Date().toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                  weekday: "long",
                })}
              </td>
            </tr>
          )}
          {users?.map((nurse, index) => {
            const name = `${nurse.firstName || ""} ${nurse.lastName || ""}`;
            const location = nurse.addresses?.[0]?.city || "N/A";
            const gender = nurse.gender || "N/A";
            const qualification =
              nurse.nurse?.[0]?.qualifications?.[0]?.qualification_details
                ?.qualification || "N/A";

            return (
              <tr key={nurse.user_id} className="bg-white">
                <td className="p-2">{index + 1}</td>
                <td
                  className="border-l-4 border-[#C0D8F6] p-2 cursor-pointer hover:underline"
                  onClick={() => handleNameClick(nurse.user_id)}
                >
                  {name}
                </td>
                <td className="border-l-4 border-[#C0D8F6] p-2">{location}</td>
                <td className="border-l-4 border-[#C0D8F6] p-2">{gender}</td>
                <td className="border-l-4 border-[#C0D8F6] p-2">
                  {qualification}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
