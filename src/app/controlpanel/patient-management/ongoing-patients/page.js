import Navlink from "@/components/patientManagement/Navlink";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div>
      {/* <Navlink/> */}
      {/* Filter header */}
      <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex justify-between  px-6  rounded-[15px] mt-2">
        <div className="flex text-black font-semibold gap-[48px] pt-[23px] pb-[19px]">
          <p className="text-blue-800">All</p>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <p className="text-black font-semibold pt-[23px] pb-[19px]">Clear</p>
          <input type="checkbox" className="size-[20px]" />
        </div>
      </div>

      {/* Total count */}
      <div className="w-full bg-white border border-[#8888888c] rounded-[15px] mt-2 pt-[23px] pb-[19px]  px-6 text-black font-semibold text-[32px] flex justify-between">
        {/* <p>{totalBookings}</p> */}
        <p>123</p>
        <input
          type="search"
          name=""
          placeholder="Search patient Name"
          className="w-[360px] h-[48px] border-1 border-[#888888] rounded-[15px] placeholder:text-[#888888] text-[14px] px-4 outline-none"
          id=""
        />
      </div>

      {/* Bookings table */}
      <table className="w-full border-spacing-y-2 border-separate text-black">
        <thead className="bg-[#C0D8F6]">
          <tr className="p-2">
            <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">No</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Patient Name
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Location
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Service Date
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
              Staff
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td
              className="rounded-t-2xl p-2 bg-[#C0D8F6] text-[16px] font-semibold"
              colSpan="5"
            >
              2024 September 01, Sunday
            </td>
          </tr>

          <tr className="bg-white">
            <td className="p-2">03</td>
            <Link href={"/controlpanel/patient-management/patient-details"}>
              <td className="border-l-4 border-[#C0D8F6] p-2">
                Pradeep Kumar N
              </td>
            </Link>
            <td className="border-l-4 border-[#C0D8F6] p-2">Bengaluru</td>
            <td className="border-l-4 border-[#C0D8F6] p-2">12 April</td>
            <td className="border-l-4 border-[#C0D8F6] p-2">Jsmes k</td>
          </tr>
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between my-4 gap-4">
        <button
          //   onClick={() => setPage(Math.max(page - 1, 1))}
          //   disabled={page === 1}
          className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        {/* <span className="text-black font-semibold text-lg">{page} / {totalPages}</span> */}
        <button
         
          className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default page;
