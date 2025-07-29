"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AssignStaffTable = ({
  nurses = [],
  isLoading,
  onSelectNurse,
  radius,
  setRadius,
  currentPage,
  setCurrentPage,
  onApplyRadius, 
}) => {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedNurse, setSelectedNurse] = useState(null);

  const nursesPerPage = 50;
  const totalPages = Math.ceil(nurses.length / nursesPerPage);

  const indexOfLastNurse = currentPage * nursesPerPage;
  const indexOfFirstNurse = indexOfLastNurse - nursesPerPage;
  const currentNurses = nurses.slice(indexOfFirstNurse, indexOfLastNurse);

  const handleNameClick = (userId) => {
    router.push(`/controlpanel/staffManagement/allStaffDetails/${userId}`);
  };

  const handleAssignClick = (nurse) => {
    setSelectedNurse(nurse);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    if (selectedNurse) {
      await onSelectNurse?.(selectedNurse.userId);
    }
    setShowConfirm(false);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {/* Confirm Popup */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-[#1a191959] backdrop-blur-xs flex items-center justify-center">
          <div className="bg-white w-[500px] h-[200px] p-8 rounded-xl shadow-md text-center flex justify-center items-center flex-col">
            <p className="font-thin text-black">
              Are you sure you want to assign nurse <br />
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
                onClick={() => setShowConfirm(false)}
                className="text-black font-semibold text-[16px] w-[152px] h-[40px] bg-gray-300 rounded-[15px] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header with Radius */}
      <div className="w-full bg-white border border-[#8888888c] rounded-[15px] my-4 py-2 px-6 text-[#3674B5] font-semibold text-[24px] flex justify-between items-center">
        <p>{nurses.length} Results found</p>
        {/* 
       <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-md border border-gray-200">
  <label className="text-base font-medium text-gray-700">Radius (km)</label>

  <input
    type="number"
    value={radius}
    onChange={(e) => setRadius(Number(e.target.value))}
    className="w-24 text-sm px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 shadow-sm"
  />

  <button
    onClick={onApplyRadius}
    className="px-2 py-1 bg-blue-500 text-sm text-white rounded-lg shadow hover:bg-blue-600 hover:shadow-lg transition-all duration-200"
  >
    Apply
  </button>
</div> */}

        <div className=" bg-white p-2 rounded-xl ">
          <label className="text-base font-semibold text-gray-700 mb-3 block">
            Select Radius
          </label>

          <div className="flex flex-col items-center gap-3">
            {/* Selected Radius Label */}

            <div className="relative flex items-center justify-between w-[350px]">
              {/* Gray Line */}
              <div className="absolute top-3 left-0 w-full h-[3px] bg-gray-300 rounded-full" />

              {[10, 20, 30, 40, 50].map((value) => (
                <button
                  key={value}
                  onClick={() => {
                    setRadius(value); // update state for UI
                    onApplyRadius(value); // pass the same value directly to API
                  }}
                  className="relative flex flex-col items-center group"
                >
                  {/* Dot */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10 cursor-pointer
            ${
              radius === value
                ? "bg-blue-500 border-blue-500 scale-125 shadow-lg"
                : "bg-white border-gray-400 group-hover:border-blue-400"
            }`}
                  >
                    {radius === value && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`mt-2 text-xs transition-colors duration-300 ${
                      radius === value
                        ? "text-blue-600 font-semibold"
                        : "text-gray-600 group-hover:text-gray-800"
                    }`}
                  >
                    {value} km
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-spacing-y-2 border-separate text-black">
          <thead className="bg-[#C0D8F6]">
            <tr className="p-2 bg-[#C0D8F6]">
              <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">
                No
              </th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                Name
              </th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                Location
              </th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                Gender
              </th>
              <th className="text-base border-l-4 border-[#F0F4F9] p-2">
                Qualification
              </th>
              <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentNurses.map((nurse, index) => (
              <tr key={nurse.userId || index} className="bg-white">
                <td className="p-2">{indexOfFirstNurse + index + 1}</td>
                <td
                  className="border-l-4 border-[#C0D8F6] p-2 cursor-pointer hover:underline"
                  onClick={() => handleNameClick(nurse.userId)}
                >
                  {nurse.fullName}
                </td>
                <td className="border-l-4 border-[#C0D8F6] p-2">
                  {nurse.location}
                </td>
                <td className="border-l-4 border-[#C0D8F6] p-2">
                  {nurse.gender}
                </td>
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
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between my-4 gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-1 rounded bg-blue-500 text-white disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm font-medium self-center">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => p + 1)}
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
