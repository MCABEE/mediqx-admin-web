// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import nurseStore from "@/app/lib/store/nurseStore";

// const AssignStaffTable = ({ onSelectNurse }) => {
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

//   // Confirmation popup state
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [selectedNurse, setSelectedNurse] = useState(null);

//   useEffect(() => {
//     fetchNurses(currentPage, limit, "APPROVED");
//   }, [currentPage, fetchNurses, limit]);

//   const handleNameClick = async (userId) => {
//     await fetchNurseById(userId);
//     router.push(`/controlpanel/staffManagement/allStaffDetails/${userId}`);
//   };

//   const handleAssignClick = (nurse) => {
//     setSelectedNurse(nurse);
//     setShowConfirm(true);
//   };
//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };
//   // const handleConfirm = () => {
//   //   if (selectedNurse) {
//   //     onSelectNurse?.(selectedNurse.userId);
      
//   //   }
//   //   setShowConfirm(false);
//   // };

//   const handleConfirm = async () => {
//   if (selectedNurse) {
//     await onSelectNurse?.(selectedNurse.userId);
//     router.push("/controlpanel/caseBooking/confirmedBooking");
//   }
//   setShowConfirm(false);
// };

//   const handleCancel = () => {
//     setSelectedNurse(null);
//     setShowConfirm(false);
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   const groupedUsers = users?.reduce((acc, nurse) => {
//     const dateKey = new Date(nurse.createdAt).toISOString().split("T")[0];
//     if (!acc[dateKey]) acc[dateKey] = [];
//     acc[dateKey].push(nurse);
//     return acc;
//   }, {});

//   return (
//     <>
//       {/* Confirmation Popup */}
//       {showConfirm && (
//         <div className="fixed inset-0 z-50  bg-[#1a191959] backdrop-blur-xs flex items-center justify-center">
//           <div className="bg-white w-[500px] h-[200px] p-8 rounded-xl shadow-md  text-center flex justify-center items-center flex-col">
//             <p className=" font-thin  text-black">
//             Are You Sure that you want to assign nurse <br/> <span className="font-semibold  text-black">"{selectedNurse?.fullName}"</span>?
//             </p>
//             <div className="flex justify-center gap-4 mt-8 ">
//               <button
//                 onClick={handleConfirm}
//                 className=" text-white font-semibold text-[16px] w-[152px] h-[40px] bg-[#3674B5] rounded-[15px] cursor-pointer"
//               >
//                 Assign
//               </button>
//               <button
//                 onClick={handleCancel}
//                 className=" text-black font-semibold text-[16px] w-[152px] h-[40px] bg-gray-300 rounded-[15px] cursor-pointer"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Table */}
//       <div className="w-full bg-white border border-[#8888888c] rounded-[15px] my-4 pt-[23px] pb-[19px] px-6 text-[#3674B5] font-semibold text-[32px] flex justify-between">
//         <p>{totalUsers} &nbsp; Results found</p>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full border-spacing-y-2 border-separate text-black">
//           <thead className="bg-[#C0D8F6]">
//             <tr className="p-2 bg-[#C0D8F6]">
//               <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">No</th>
//               <th className="text-base border-l-4 border-[#F0F4F9] p-2">Name</th>
//               <th className="text-base border-l-4 border-[#F0F4F9] p-2">Location</th>
//               <th className="text-base border-l-4 border-[#F0F4F9] p-2">Gender</th>
//               <th className="text-base border-l-4 border-[#F0F4F9] p-2">Qualification</th>
//               <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">Action</th>
//             </tr>
//           </thead>
// <tbody>
//   {groupedUsers &&
//     Object.values(groupedUsers).flat().map((nurse, index) => {
//       const name = nurse.fullName || "";
//       const location = nurse.location || "";
//       const gender = nurse.gender || "";
//       const qualification = nurse.educationQualifications || "";

//       return (
//         <tr key={nurse.userId || index} className="bg-white">
//           <td className="p-2">{index + 1}</td>
//           <td
//             className="border-l-4 border-[#C0D8F6] p-2 cursor-pointer hover:underline"
//             onClick={() => handleNameClick(nurse.userId)}
//           >
//             {name}
//           </td>
//           <td className="border-l-4 border-[#C0D8F6] p-2">{location}</td>
//           <td className="border-l-4 border-[#C0D8F6] p-2">{gender}</td>
//           <td className="border-l-4 border-[#C0D8F6] p-2">{qualification}</td>
//           <td
//             className="border-l-4 border-[#C0D8F6] p-2 cursor-pointer text-blue-600 hover:underline"
//             onClick={() => handleAssignClick(nurse)}
//           >
//             Assign
//           </td>
//         </tr>
//       );
//     })}
// </tbody>

//         </table>

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

// export default AssignStaffTable;

"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import nurseStore from "@/app/lib/store/nurseStore";

const AssignStaffTable = ({ onSelectNurse }) => {
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

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const fetchedRef = useRef(false); // <-- to prevent multiple calls

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedNurse, setSelectedNurse] = useState(null);

  useEffect(() => {
    if (!fetchedRef.current) {
      fetchNurses(currentPage, limit, "APPROVED");
      fetchedRef.current = true;
    } else {
      // If page is changed
      fetchNurses(currentPage, limit, "APPROVED");
    }
  }, [currentPage]);

  const handleNameClick = async (userId) => {
    await fetchNurseById(userId);
    router.push(`/controlpanel/staffManagement/allStaffDetails/${userId}`);
  };

  const handleAssignClick = (nurse) => {
    setSelectedNurse(nurse);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    if (selectedNurse) {
      await onSelectNurse?.(selectedNurse.userId);
      router.push("/controlpanel/caseBooking/confirmedBooking");
    }
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setSelectedNurse(null);
    setShowConfirm(false);
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
      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-[#1a191959] backdrop-blur-xs flex items-center justify-center">
          <div className="bg-white w-[500px] h-[200px] p-8 rounded-xl shadow-md text-center flex justify-center items-center flex-col">
            <p className="font-thin text-black">
              Are You Sure that you want to assign nurse <br />
              <span className="font-semibold text-black">
                "{selectedNurse?.fullName}"
              </span>
              ?
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={handleConfirm}
                className="text-white font-semibold text-[16px] w-[152px] h-[40px] bg-[#3674B5] rounded-[15px] cursor-pointer"
              >
                Assign
              </button>
              <button
                onClick={handleCancel}
                className="text-black font-semibold text-[16px] w-[152px] h-[40px] bg-gray-300 rounded-[15px] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="w-full bg-white border border-[#8888888c] rounded-[15px] my-4 pt-[23px] pb-[19px] px-6 text-[#3674B5] font-semibold text-[32px] flex justify-between">
        <p>{totalUsers} &nbsp; Results found</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-spacing-y-2 border-separate text-black">
          <thead className="bg-[#C0D8F6]">
            <tr className="p-2 bg-[#C0D8F6]">
              <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">No</th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">Name</th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">Location</th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">Gender</th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">Qualification</th>
              <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {groupedUsers &&
              Object.values(groupedUsers).flat().map((nurse, index) => {
                return (
                  <tr key={nurse.userId || index} className="bg-white">
                    <td className="p-2">{index + 1}</td>
                    <td
                      className="border-l-4 border-[#C0D8F6] p-2 cursor-pointer hover:underline"
                      onClick={() => handleNameClick(nurse.userId)}
                    >
                      {nurse.fullName}
                    </td>
                    <td className="border-l-4 border-[#C0D8F6] p-2">{nurse.location}</td>
                    <td className="border-l-4 border-[#C0D8F6] p-2">{nurse.gender}</td>
                    <td className="border-l-4 border-[#C0D8F6] p-2">
                      {nurse.educationQualifications}
                    </td>
                    <td
                      className="border-l-4 border-[#C0D8F6] p-2 cursor-pointer text-blue-600 hover:underline"
                      onClick={() => handleAssignClick(nurse)}
                    >
                      Assign
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {/* Pagination */}
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

export default AssignStaffTable;
