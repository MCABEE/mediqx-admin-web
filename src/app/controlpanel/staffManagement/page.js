import Navlink from "@/components/staffManagement/Navlink";
import React from "react";
import Link from "next/link";

function page() {
  return (
    <div>
      <Navlink />
      <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex justify-between  px-6  rounded-[15px] mt-2  ">
        <div className="flex text-black font-semibold gap-[48px] pt-[23px] pb-[19px]">
          <p>All</p>
          <p>Nurse</p>
          <p>Paramedical</p>
          <p>Doctor</p>
          <p>Supervisor</p>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <p className=" text-black font-semibold pt-[23px] pb-[19px]">Clear</p>
          <input type="checkbox" className="size-[20px] " />
        </div>
      </div>
      <div className="w-full bg-white border border-[#8888888c] rounded-[15px] mt-2 pt-[23px] pb-[19px]  px-6 text-black font-semibold text-[32px]">
        <p>14</p>
      </div>

      <table className="w-full border-spacing-y-2 border-separate text-black">
        <thead className="bg-[#C0D8F6]">
          <tr className="p-2 bg-[#C0D8F6]">
            <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">No</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2"> Name</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              {" "}
              Location
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              {" "}
              Gender
            </th>

            <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
              Qualification
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
            <Link href={"/controlpanel/staffManagement/staffDetails"}>
              <td className="border-l-4 border-[#C0D8F6] p-2">
                Pradeep Kumar N
              </td>
            </Link>
            <td className="border-l-4 border-[#C0D8F6] p-2">Bengaluru</td>
            <td className="border-l-4 border-[#C0D8F6] p-2">M</td>
            <td className="border-l-4 border-[#C0D8F6] p-2">Bsc Science</td>
          </tr>
          <tr className="bg-white">
            <td className="p-2">03</td>
            <Link href={"/controlpanel/staffManagement/staffDetails"}>
              <td className="border-l-4 border-[#C0D8F6] p-2">Sai Krishna G</td>
            </Link>
            <td className="border-l-4 border-[#C0D8F6] p-2">Kannur</td>
            <td className="border-l-4 border-[#C0D8F6] p-2">M</td>
            <td className="border-l-4 border-[#C0D8F6] p-2">GNM</td>
          </tr>
          <tr className="bg-white">
            <td className="p-2">03</td>
            <Link href={"/controlpanel/staffManagement/staffDetails"}>
              <td className="border-l-4 border-[#C0D8F6] p-2">
                Sruthi Lakshmi N
              </td>
            </Link>
            <td className="border-l-4 border-[#C0D8F6] p-2">Wayanad</td>
            <td className="border-l-4 border-[#C0D8F6] p-2">M</td>
            <td className="border-l-4 border-[#C0D8F6] p-2">ANM</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default page;
