import Navlink from "@/components/caseBooking/NavLink";
import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <Navlink />
   
      <div className="w-full bg-white border border-[#8888888c] rounded-[15px] mt-2 pt-[23px] pb-[19px]  px-6 text-black font-semibold text-[32px] flex justify-between">
        <p>14</p>
      </div>

      <table className="w-full border-spacing-y-2 border-separate text-black">
        <thead className="bg-[#C0D8F6]">
          <tr className="p-2 bg-[#C0D8F6]">
            <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">No</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              {" "}
              Patient Name
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              {" "}
              Location
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              {" "}
              Service Date
            </th>

            <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
              Type
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
              <td className="border-l-4 border-[#C0D8F6] p-2">
                Pradeep Kumar N
              </td>
            <td className="border-l-4 border-[#C0D8F6] p-2">Bengaluru</td>
            <td className="border-l-4 border-[#C0D8F6] p-2">12 April</td>
            <td className="border-l-4 border-[#C0D8F6] p-2">Referral</td>
          </tr>
          <tr className="bg-white">
            <td className="p-2">03</td>
              <td className="border-l-4 border-[#C0D8F6] p-2">Sai Krishna G</td>
            <td className="border-l-4 border-[#C0D8F6] p-2">Kannur</td>
            <td className="border-l-4 border-[#C0D8F6] p-2">14 April</td>
            <td className="border-l-4 border-[#C0D8F6] p-2">Direct</td>
         
          </tr>
          <tr className="bg-white">
            <td className="p-2">03</td>
              <td className="border-l-4 border-[#C0D8F6] p-2">
                Sruthi Lakshmi N
              </td>
            <td className="border-l-4 border-[#C0D8F6] p-2">Wayanad</td>
            <td className="border-l-4 border-[#C0D8F6] p-2">Today</td>
            <td className="border-l-4 border-[#C0D8F6] p-2">Direct</td>
          
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default page;
