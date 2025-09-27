// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter,useSearchParams } from "next/navigation";
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
//     const searchParams = useSearchParams();

//   const roleFromUrl = searchParams.get("role") || "REGISTERED_NURSE";
//   const [selectedRole, setSelectedRole] = useState(roleFromUrl);

//   // useEffect(() => {
//   //   fetchNurses(currentPage, limit, "NEW","NURSE");
//   // }, [currentPage, fetchNurses, limit]);

//   useEffect(() => {
//     fetchNurses(currentPage, limit, "NEW", selectedRole);
//   }, [currentPage, fetchNurses, limit, selectedRole]);

//   // const handleNameClick = async (userId) => {
//   //   await fetchNurseById(userId);
//   //   router.push(`/controlpanel/staffManagement/staffDetails/${userId}`);
//   // };

//    const handleNameClick = async (userId) => {
//   await fetchNurseById(userId);
//   router.push(`/controlpanel/staffManagement/staffDetails/${userId}?role=${selectedRole}`);
// };

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
//               selectedRole === "REGISTERED_NURSE" ? "text-blue-800" : ""
//             }`}
//             onClick={() => {
//               setSelectedRole("REGISTERED_NURSE");
//               setCurrentPage(1); // Reset to first page when role changes
//             }}
//           >
//             Registered Nurse
//           </p>
//           <p
//             className={`cursor-pointer ${
//               selectedRole === "NURSING_ASSISTANTS" ? "text-blue-800" : ""
//             }`}
//             onClick={() => {
//               setSelectedRole("NURSING_ASSISTANTS");
//               setCurrentPage(1);
//             }}
//           >
//             Nursing Assistants
//           </p>
//           <p
//             className={`cursor-pointer ${
//               selectedRole === "TECHNICIANS" ? "text-blue-800" : ""
//             }`}
//             onClick={() => {
//               setSelectedRole("TECHNICIANS");
//               setCurrentPage(1);
//             }}
//           >
//             Technicians
//           </p>
//            <p
//             className={`cursor-pointer ${
//               selectedRole === "THERAPY" ? "text-blue-800" : ""
//             }`}
//             onClick={() => {
//               setSelectedRole("THERAPY");
//               setCurrentPage(1);
//             }}
//           >
//             Therapy
//           </p> <p
//             className={`cursor-pointer ${
//               selectedRole === "ANCILLARY_PERSONAL" ? "text-blue-800" : ""
//             }`}
//             onClick={() => {
//               setSelectedRole("ANCILLARY_PERSONAL");
//               setCurrentPage(1);
//             }}
//           >
//             Ancillary Personal
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
import { useRouter, useSearchParams } from "next/navigation";
import nurseStore from "@/app/lib/store/nurseStore";

const Table = () => {
  const {
    users,
    fetchNurses,
    fetchNurseById,
    isLoading,
    error,
    limit,
    totalPages,
    totalUsers,
    clearFilters,
  } = nurseStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const roleFromUrl = searchParams.get("role") || "REGISTERED_NURSE";
  const [selectedRole, setSelectedRole] = useState(roleFromUrl);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [nameSearch, setNameSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [qualificationSearch, setQualificationSearch] = useState("");
  const [gender, setGender] = useState("");

  // Fetch nurses on role/page change without filters
  useEffect(() => {
    if (!nameSearch && !locationSearch && !qualificationSearch && !gender) {
      fetchNurses(currentPage, limit, "NEW", selectedRole);
    }
  }, [currentPage, selectedRole, limit]);

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      setCurrentPage(1);
      fetchNurses(currentPage, limit, "NEW", selectedRole, {
        search: nameSearch,
        location: locationSearch,
        qualifications: qualificationSearch,
        gender,
      });
    }, 500);
    return () => clearTimeout(handler);
  }, [nameSearch, locationSearch, qualificationSearch, gender, selectedRole]);

  const handleNameClick = async (userId) => {
    await fetchNurseById(userId);
    router.push(`/controlpanel/staffManagement/staffDetails/${userId}?role=${selectedRole}`);
  };

  const handlePrevPage = () => currentPage > 1 && setCurrentPage(prev => prev - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(prev => prev + 1);

  const groupedUsers = users?.reduce((acc, nurse) => {
    const dateKey = new Date(nurse.createdAt).toISOString().split("T")[0];
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(nurse);
    return acc;
  }, {});

  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="p-2"><div className="h-4 w-6 bg-gray-300 rounded"></div></td>
      <td className="p-2"><div className="h-4 w-32 bg-gray-300 rounded"></div></td>
      <td className="p-2"><div className="h-4 w-24 bg-gray-300 rounded"></div></td>
      <td className="p-2"><div className="h-4 w-16 bg-gray-300 rounded"></div></td>
      <td className="p-2"><div className="h-4 w-28 bg-gray-300 rounded"></div></td>
    </tr>
  );

  return (
    <>
      {/* Role Tabs */}
      <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex justify-between px-6 rounded-[15px] mt-2">
        <div className="flex text-black font-semibold gap-[48px] pt-[23px] pb-[19px]">
          {["REGISTERED_NURSE","NURSING_ASSISTANTS","TECHNICIANS","THERAPY","ANCILLARY_PERSONAL"].map(role => (
            <p
              key={role}
              className={`cursor-pointer ${selectedRole === role ? "text-blue-800" : ""}`}
              onClick={() => {
                setSelectedRole(role);
                setCurrentPage(1);
                setNameSearch(""); setLocationSearch(""); setQualificationSearch(""); setGender("");
                clearFilters();
              }}
            >
              {role.replace("_", " ")}
            </p>
          ))}
        </div>
      </div>

      {/* Total + Clear Filters */}
      <div className="w-full bg-white border border-[#8888888c] rounded-[15px] mt-2 pt-4 pb-4 px-6 text-black font-semibold text-[16px] flex justify-between items-center">
        <p>Total: {totalUsers}</p>
        <button
          onClick={() => {
            setNameSearch(""); setLocationSearch(""); setQualificationSearch(""); setGender("");
            setCurrentPage(1); clearFilters();
          }}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
        >
          Clear Filters
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-2">
        <table className="w-full border-spacing-y-2 border-separate text-black">
          <thead className="bg-[#C0D8F6]">
            <tr>
              <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">No</th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">Name</th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">Location</th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">Gender</th>
              <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">Qualification</th>
            </tr>

            {/* Filters Row */}
            <tr>
              <th></th>
              <th className="border-l-4 border-[#F0F4F9] p-2">
                <input type="text" placeholder="Search name" value={nameSearch} onChange={e => setNameSearch(e.target.value)}
                  className="w-full px-2 py-1 border border-[#0000003f] rounded focus:outline-none focus:ring-1 focus:ring-blue-500"/>
              </th>
              <th className="border-l-4 border-[#F0F4F9] p-2">
                <input type="text" placeholder="Search location" value={locationSearch} onChange={e => setLocationSearch(e.target.value)}
                  className="w-full px-2 py-1 border border-[#0000003f] rounded focus:outline-none focus:ring-1 focus:ring-blue-500"/>
              </th>
              <th className="border-l-4 border-[#F0F4F9] p-2">
                <select value={gender} onChange={e => setGender(e.target.value)}
                  className="border border-[#0000003f] rounded px-3 py-1 text-sm w-full outline-none">
                  <option value="">All</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </th>
              <th className="border-l-4 border-[#F0F4F9] p-2">
                <input type="text" placeholder="Search qualification" value={qualificationSearch} onChange={e => setQualificationSearch(e.target.value)}
                  className="w-full px-2 py-1 border border-[#0000003f] rounded focus:outline-none focus:ring-1 focus:ring-blue-500"/>
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, idx) => <SkeletonRow key={idx} />)
              : users?.length > 0
                ? Object.entries(groupedUsers).map(([date, nurses]) => (
                  <React.Fragment key={date}>
                    <tr>
                      <td colSpan="5" className="rounded-t-2xl p-2 bg-[#C0D8F6] text-[16px] font-semibold">
                        {new Date(date).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "2-digit", weekday: "long" })}
                      </td>
                    </tr>
                    {nurses.map((nurse, index) => (
                      <tr key={nurse.userId || index} className="bg-white cursor-pointer hover:bg-gray-100" onClick={() => handleNameClick(nurse.userId)}>
                        <td className="p-2">{(currentPage-1)*limit + index + 1}</td>
                        <td className="border-l-4 border-[#C0D8F6] p-2 hover:underline">{nurse.fullName || ""}</td>
                        <td className="border-l-4 border-[#C0D8F6] p-2">{nurse.location || ""}</td>
                        <td className="border-l-4 border-[#C0D8F6] p-2">{nurse.gender || ""}</td>
                        <td className="border-l-4 border-[#C0D8F6] p-2">{nurse.educationQualifications || ""}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
                : <tr><td colSpan="5" className="text-center py-6 text-gray-500 font-medium">No data found</td></tr>
            }
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between my-4 gap-4">
            <button onClick={handlePrevPage} disabled={currentPage===1} className="px-4 py-1 rounded bg-blue-500 text-white disabled:opacity-50">Prev</button>
            <span className="text-sm font-medium self-center">Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage===totalPages} className="px-4 py-1 rounded bg-blue-500 text-white disabled:opacity-50">Next</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
