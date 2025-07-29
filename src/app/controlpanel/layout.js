import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function RootLayout({ children }) {
  return (
    <>
      <div className="bg-[#F0F4F9]">
        <div className="w-full h-full bg-white rounded-2xl mt-[20px] xl:mt-[91px] ">
          <Navbar />
        </div>
        <div className="w-full h-full flex">
          <div className=" w-[28%] pr-[26px]">
            <Sidebar />
          </div>
          <div className="h-full w-[72%]">{children}</div>
        </div>
      </div>
    </>
  );
}
