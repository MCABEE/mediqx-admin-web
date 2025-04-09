import Navlink from "@/components/caseBooking/NavLink";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <Navlink />
      <div className="w-full h-[48px] bg-[#C0D8F6] mt-2 rounded-[15px] flex ">
        <div className="text-[16px] text-black border-r-2 border-[#F0F4F9] flex justify-center items-center px-[38px]">
          Back
        </div>
        <div className="w-full flex text-[16px] text-black justify-between items-center ps-[19px] pe-[73px] ">
          <p className="font-semibold">Pradeep Kumar N</p>
          <div className="flex justify-center items-center gap-[92px]">
            <p>12 April</p>
            <p>Direct</p>
          </div>
        </div>
      </div>
      <div className=" w-full mt-2 bg-white rounded-[15px] border border-[#BBBBBB]">
        <div className="w-full h-[72px] flex items-center bg-white px-8 rounded-t-[15px] border-b-2">
          <h1 className="text-[16px] font-semibold text-black">
            Patient Details
          </h1>
        </div>
        <div className="flex gap-10 p-8">
          <div className="flex flex-col gap-[10px] text-[16px]  text-black">
            <span className="text-[16px]  text-black">
              Service Period (From)
            </span>
            <span className="text-[16px]  text-black">Service Period (To)</span>
            <span className="text-[16px]  text-black">Service Required</span>
            <span className="text-[16px]  text-black">Daily Schedule</span>
            <span className="text-[16px]  text-black">Staff Preference</span>
            <span className="text-[16px]  text-black">Language</span>
            <span className="text-[16px]  text-black">Location</span>
            <span className="text-[16px]  text-black">
              Service period (From)
            </span>
            <span className="text-[16px]  text-black">Service period (To)</span>
          </div>
          <div className="flex flex-col gap-[10px] text-[16px]  text-black">
            <span className="text-[16px]  text-black">Krishnakumar P</span>
            <span className="text-[16px]  text-black">Male</span>
            <span className="text-[16px]  text-black">Nursing Assistant</span>
            <span className="text-[16px]  text-black">24 Hrs</span>
            <span className="text-[16px]  text-black">Male</span>
            <span className="text-[16px]  text-black">Kannada, English</span>
            <span className="text-[16px]  text-black">SN Puram, Bangalore</span>
            <span className="text-[16px]  text-black">02 April 2025</span>
            <span className="text-[16px]  text-black">17 April 2025</span>
          </div>
        </div>
      </div>
      <div className="w-full h-[56px] bg-[#C0D8F6] flex justify-between items-center rounded-[15px] ps-[19px] pe-[13px] mt-4">
        <span className="text-[16px] text-black font-semibold">
          Check Availability
        </span>
        <button className="w-[192px] h-[40px] rounded-[15px] bg-[#3674B5] flex justify-center items-center border text-[16px] text-white font-semibold">
          Search
        </button>
      </div>
      <div className="w-full h-[398px] rounded-[15px] overflow-hidden mt-2">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.90089943376!2d77.46612593299314!3d12.953945614011557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1744177352473!5m2!1sen!2sin"
          loading="lazy"
          className="w-full h-full "
        ></iframe>
      </div>

      <div className="w-full bg-white border border-[#8888888c] rounded-[15px] my-4 pt-[23px] pb-[19px]  px-6 text-[#3674B5] font-semibold text-[32px] flex justify-between">
        <p>05 Results found</p>
      </div>

      <table className="w-full border-spacing-y-2 border-separate text-black mb-[200px] ">
        <thead className="bg-[#C0D8F6]">
          <tr className="p-2 bg-[#C0D8F6]">
            <th className="text-base border-[#F0F4F9] rounded-l-2xl p-2">No</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              {" "}
              Staff Name
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              {" "}
              Location
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              {" "}
              Qualification
            </th>

            <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="p-2">01</td>
              <td className="border-l-4 border-[#C0D8F6] p-2">
                Pradeep Kumar N
              </td>
            <td className="border-l-4 border-[#C0D8F6] p-2">Whitefield</td>
            <td className="border-l-4 border-[#C0D8F6] p-2">GNM</td>
            <Link href={"/controlpanel/caseBooking/availabilityCalender"}>
              <td className="border-l-4 border-[#C0D8F6] p-2">Assign</td>
            </Link>
          </tr>
          <tr className="bg-white">
            <td className="p-2">02</td>
              <td className="border-l-4 border-[#C0D8F6] p-2">Sai Krishna G</td>
            <td className="border-l-4 border-[#C0D8F6] p-2">Indiranagar</td>
            <td className="border-l-4 border-[#C0D8F6] p-2">GNM</td>
            <Link href={"/controlpanel/caseBooking/availabilityCalender"}>
              <td className="border-l-4 border-[#C0D8F6] p-2">Assign</td>
            </Link>
          </tr>
          <tr className="bg-white">
            <td className="p-2">03</td>
              <td className="border-l-4 border-[#C0D8F6] p-2">
                Sruthi Lakshmi N
              </td>
            <td className="border-l-4 border-[#C0D8F6] p-2">
              Electronics City
            </td>
            <td className="border-l-4 border-[#C0D8F6] p-2">GNM</td>
            <Link href={"/controlpanel/caseBooking/availabilityCalender"}>
              <td className="border-l-4 border-[#C0D8F6] p-2">Assign</td>
            </Link>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default page;
