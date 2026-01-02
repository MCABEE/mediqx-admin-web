
"use client";


import useServiceRatingsStore from "@/app/lib/store/useServiceRatingStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page() {
  const router = useRouter();

  const {
    ratings,
    fetchRatings,
    page,
    totalPages,
    loading,
    error,
  } = useServiceRatingsStore();

  useEffect(() => {
    fetchRatings(1, 10);
  }, []);

  const handleRowClick = (serviceId) => {
    router.push(
      `/controlpanel/rating-and-review/rating-and-review-reply/${serviceId}`
    );
  };

  const handlePrev = () => {
    if (page > 1) {
      fetchRatings(page - 1, 10);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      fetchRatings(page + 1, 10);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto mt-2">
      <div className="w-full bg-[#C0D8F6] py-2.5 px-[23px] rounded-t-[15px] flex items-center">
        <p className="text-[16px] font-semibold text-black">
          Rating and Reviews
        </p>
      </div>

      <table className="w-full border-spacing-y-2 border-separate text-black">
        <thead className="bg-white border border-[#888888]">
          <tr>
            <th className="p-2">No</th>
            <th className="p-2 border-l-4 border-[#C0D8F6] text-left">
              Staff Name
            </th>
            <th className="p-2 border-l-4 border-[#C0D8F6] text-left">
              Rating
            </th>
            <th className="p-2 border-l-4 border-[#C0D8F6] text-left">
              Date
            </th>
            <th className="p-2 border-l-4 border-[#C0D8F6] text-left">
              Patient Name
            </th>
          </tr>
        </thead>

        <tbody>
          {ratings.map((item, index) => (
            <tr
              key={item.id}
              onClick={() => handleRowClick(item.serviceId)}
              className="bg-white hover:bg-gray-100 cursor-pointer"
            >
              <td className="p-2 text-center">
                {(page - 1) * 10 + index + 1}
              </td>

              <td className="p-2 border-l-4 border-[#C0D8F6]">
                {item.staffName}
              </td>

              <td className="p-2 border-l-4 border-[#C0D8F6]">
                {item.rating} ★
              </td>

              <td className="p-2 border-l-4 border-[#C0D8F6]">
                {item.createdAt
                  ? new Date(item.createdAt)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")
                  : "-"}
              </td>

              <td className="p-2 border-l-4 border-[#C0D8F6]">
                {item.patientName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex justify-between my-4 px-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`px-4 py-1 rounded text-white ${
            page === 1
              ? "bg-[#5F9DE9] opacity-50 cursor-not-allowed"
              : "bg-[#5F9DE9]"
          }`}
        >
          Prev
        </button>

        <span className="text-sm font-medium self-center">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className={`px-4 py-1 rounded text-white ${
            page === totalPages
              ? "bg-[#5F9DE9] opacity-50 cursor-not-allowed"
              : "bg-[#5F9DE9]"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Page;