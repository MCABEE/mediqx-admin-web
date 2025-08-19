// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import nurseStore from "@/app/lib/store/nurseStore";

// const Table = () => {
//   const {
//     users,
//     fetchNurses,
//     fetchNurseById,
//     isLoading, 
//     error,
//     limit,
//     totalPages,
//     totalUsers,
//   } = nurseStore();
//   const router = useRouter();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedRole, setSelectedRole] = useState("NURSE");
  

//   useEffect(() => {
//     fetchNurses(currentPage, limit, "APPROVED",selectedRole);
//   }, [currentPage, fetchNurses, limit,selectedRole]);

//   const handleNameClick = async (userId) => {
//     await fetchNurseById(userId);
//     router.push(`/controlpanel/staffManagement/allStaffDetails/${userId}`);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   // Group users by formatted creation date
//   const groupedUsers = users?.reduce((acc, nurse) => {
//     const dateKey = new Date(nurse.createdAt).toISOString().split("T")[0]; // e.g., "2025-05-23"
//     if (!acc[dateKey]) acc[dateKey] = [];
//     acc[dateKey].push(nurse);
//     return acc;
//   }, {});

//   return (
//     <>
//       <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex justify-between  px-6  rounded-[15px] mt-2  ">
//         <div className="flex text-black font-semibold gap-[48px] pt-[23px] pb-[19px]">
//           <p
//             className={`cursor-pointer ${
//               selectedRole === "NURSE" ? "text-blue-800" : ""
//             }`}
//             onClick={() => {
//               setSelectedRole("NURSE");
//               setCurrentPage(1); // Reset to first page when role changes
//             }}
//           >
//             Nurse
//           </p>
//           <p
//             className={`cursor-pointer ${
//               selectedRole === "PARAMEDICAL" ? "text-blue-800" : ""
//             }`}
//             onClick={() => {
//               setSelectedRole("PARAMEDICAL");
//               setCurrentPage(1);
//             }}
//           >
//             Paramedical
//           </p>
//           <p
//             className={`cursor-pointer ${
//               selectedRole === "PHYSIOTHERAPIST" ? "text-blue-800" : ""
//             }`}
//             onClick={() => {
//               setSelectedRole("PHYSIOTHERAPIST");
//               setCurrentPage(1);
//             }}
//           >
//             Physiotherapist
//           </p>
//         </div>
//       </div>
//       <div className="w-full bg-white border border-[#8888888c] rounded-[15px] mt-2 pt-[23px] pb-[19px] px-6 text-black font-semibold text-[32px]">
//         <p>{totalUsers}</p>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full border-spacing-y-2 border-separate text-black">
//           <thead className="bg-[#C0D8F6]">
//             <tr className="p-2 bg-[#C0D8F6]">
//               <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">
//                 No
//               </th>
//               <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//                 Name
//               </th>
//               <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//                 Location
//               </th>
//               <th className="text-base border-l-4 border-[#F0F4F9] p-2">
//                 Gender
//               </th>
//               <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
//                 Qualification
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {groupedUsers &&
//               Object.entries(groupedUsers).map(([date, nurses]) => (
//                 <React.Fragment key={date}>
//                   <tr>
//                     <td
//                       colSpan="5"
//                       className="rounded-t-2xl p-2 bg-[#C0D8F6] text-[16px] font-semibold"
//                     >
//                       {new Date(date).toLocaleDateString("en-GB", {
//                         year: "numeric",
//                         month: "long",
//                         day: "2-digit",
//                         weekday: "long",
//                       })}
//                     </td>
//                   </tr>
//                   {nurses.map((nurse, index) => {
//                     const name = nurse.fullName || "";
//                     const location = nurse.location || "";
//                     const gender = nurse.gender || "";
//                     const qualification = nurse.educationQualifications || "";

//                     return (
//                       <tr
//                         key={nurse.userId || index}
//                         className="bg-white cursor-pointer hover:bg-gray-100"
//                         onClick={() => handleNameClick(nurse.userId)}
//                       >
//                         <td className="p-2">
//                           {(currentPage - 1) * limit + index + 1}
//                         </td>
//                         <td className="border-l-4 border-[#C0D8F6] p-2 hover:underline">
//                           {name}
//                         </td>
//                         <td className="border-l-4 border-[#C0D8F6] p-2">
//                           {location}
//                         </td>
//                         <td className="border-l-4 border-[#C0D8F6] p-2">
//                           {gender}
//                         </td>
//                         <td className="border-l-4 border-[#C0D8F6] p-2">
//                           {qualification}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </React.Fragment>
//               ))}
//           </tbody>
//         </table>

//         {/* Pagination Controls */}
//         {totalPages > 1 && (
//           <div className="flex justify-between my-4 gap-4">
//             <button
//               onClick={handlePrevPage}
//               disabled={currentPage === 1}
//               className="px-4 py-1 rounded bg-blue-500 text-white disabled:opacity-50"
//             >
//               Prev
//             </button>
//             <span className="text-sm font-medium self-center">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages}
//               className="px-4 py-1 rounded bg-blue-500 text-white disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Table;










"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import nurseStore from "@/app/lib/store/nurseStore";

const Table = () => {
  const router = useRouter();

  const {
    users,
    fetchNurses,
    fetchNurseById,
    isLoading,
    error,
    limit,
    totalPages,
    totalUsers,
  } = nurseStore();

  // Initialize state locally with defaults
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRole, setSelectedRole] = useState("NURSE");

  useEffect(() => {
    fetchNurses(currentPage, limit, "APPROVED", selectedRole);
  }, [currentPage, selectedRole, limit, fetchNurses]);

  // const handleNameClick = async (userId) => {
  //   await fetchNurseById(userId);
  //   router.push(`/controlpanel/staffManagement/allStaffDetails/${userId}`);
  // };

  const handleNameClick = async (userId) => {
  await fetchNurseById(userId);
  router.push(`/controlpanel/staffManagement/allStaffDetails/${userId}?role=${selectedRole}`);
};


  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const groupedUsers = users?.reduce((acc, nurse) => {
    const dateKey = new Date(nurse.createdAt).toISOString().split("T")[0];
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(nurse);
    return acc;
  }, {});

  return (
    <>
      <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="flex text-black font-semibold gap-[48px] pt-[23px] pb-[19px]">
          <p
            className={`cursor-pointer ${
              selectedRole === "NURSE" ? "text-blue-800" : ""
            }`}
            onClick={() => {
              setSelectedRole("NURSE");
              setCurrentPage(1);
            }}
          >
            Nurse
          </p>
          <p
            className={`cursor-pointer ${
              selectedRole === "PARAMEDICAL" ? "text-blue-800" : ""
            }`}
            onClick={() => {
              setSelectedRole("PARAMEDICAL");
              setCurrentPage(1);
            }}
          >
            Paramedical
          </p>
          <p
            className={`cursor-pointer ${
              selectedRole === "PHYSIOTHERAPIST" ? "text-blue-800" : ""
            }`}
            onClick={() => {
              setSelectedRole("PHYSIOTHERAPIST");
              setCurrentPage(1);
            }}
          >
            Physiotherapist
          </p>
        </div>
      </div>

      <div className="w-full bg-white border border-[#8888888c] rounded-[15px] mt-2 pt-[23px] pb-[19px] px-6 text-black font-semibold text-[32px]">
        <p>{totalUsers}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-spacing-y-2 border-separate text-black">
          <thead className="bg-[#C0D8F6]">
            <tr className="p-2 bg-[#C0D8F6]">
              <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">No</th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">Name</th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">Location</th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">Gender</th>
              <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
                Qualification
              </th>
            </tr>
          </thead>

          <tbody>
            {groupedUsers &&
              Object.entries(groupedUsers).map(([date, nurses]) => (
                <React.Fragment key={date}>
                  <tr>
                    <td
                      colSpan="5"
                      className="rounded-t-2xl p-2 bg-[#C0D8F6] text-[16px] font-semibold"
                    >
                      {new Date(date).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                        weekday: "long",
                      })}
                    </td>
                  </tr>
                  {nurses.map((nurse, index) => (
                    <tr
                      key={nurse.userId || index}
                      className="bg-white cursor-pointer hover:bg-gray-100"
                      onClick={() => handleNameClick(nurse.userId)}
                    >
                      <td className="p-2">
                        {(currentPage - 1) * limit + index + 1}
                      </td>
                      <td className="border-l-4 border-[#C0D8F6] p-2 hover:underline">
                        {nurse.fullName || ""}
                      </td>
                      <td className="border-l-4 border-[#C0D8F6] p-2">
                        {nurse.location || ""}
                      </td>
                      <td className="border-l-4 border-[#C0D8F6] p-2">
                        {nurse.gender || ""}
                      </td>
                      <td className="border-l-4 border-[#C0D8F6] p-2">
                        {nurse.educationQualifications || ""}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex justify-between my-4 gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-1 rounded bg-blue-500 text-white disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm font-medium self-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-1 rounded bg-blue-500 text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
