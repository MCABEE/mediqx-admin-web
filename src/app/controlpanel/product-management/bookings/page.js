
"use client";

import Navlink from "@/components/productManagement/Navlink";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import useProductStore from "@/app/lib/store/useProductStore";

function Page() {
  const router = useRouter();

  const {
    bookings,
    page,
    totalPages,
    loading,
    fetchBookings,
  } = useProductStore();

  useEffect(() => {
    fetchBookings(1);
  }, []);

  return (
    <div>
      <Navlink />

      {/* TABLE */}
      <table className="w-full border-spacing-y-2 border-separate text-black mt-2">
        <thead className="bg-[#C0D8F6]">
          <tr>
            <th className="text-base rounded-l-2xl p-2">No</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Patient / Customer Name
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Products
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
              Source
            </th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td
                colSpan={4}
                className="text-center p-4 text-black"
              >
                Loading...
              </td>
            </tr>
          )}

          {!loading && bookings.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="text-center p-4 text-black"
              >
                No bookings found
              </td>
            </tr>
          )}

          {!loading &&
            bookings.map((item, index) => (
              <tr
                key={item.id}
                onClick={() =>
                  router.push(
                    `/controlpanel/product-management/booking-details/${item.productCartId}`
                  )
                }
                className="bg-white hover:bg-[#E8F1FD] transition cursor-pointer"
              >
                <td className="p-2 text-center">
                  {(page - 1) * 10 + index + 1}
                </td>
                <td className="p-2 border-l-4 text-center border-[#C0D8F6]">
                  {item.patientName}
                </td>
                <td className="p-2 border-l-4 text-center border-[#C0D8F6]">
                  {item.productName}
                </td>
                <td className="p-2 border-l-4 text-center border-[#C0D8F6]">
                  {item.sourceType || "-"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1 || loading}
          onClick={() => fetchBookings(page - 1)}
          className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages || loading}
          onClick={() => fetchBookings(page + 1)}
          className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Page;