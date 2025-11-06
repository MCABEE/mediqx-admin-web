"use client";

import AddPaymentPopup from "@/components/billing/AddPaymentPopup";
import ViewPaymentPopup from "@/components/billing/ViewPaymentPopup";
import React, { useState } from "react";

function Page() {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleRowClick = (payment) => {
    setSelectedPayment(payment);
    setIsViewPopupOpen(true);
  };

  return (
    <div>
      {/* Top Tabs */}
      <div className="w-full bg-white border border-[#8888888c] text-base text-black font-semibold flex gap-[40px] px-6 pt-6 rounded-[15px]">
        {[
          "Regd Nurse",
          "Assistant Nurse",
          "Technicians",
          "Therapy",
          "Ancillary Pros",
        ].map((tab, i) => (
          <p
            key={i}
            className={`h-full box-border flex justify-center items-center text-base text-black cursor-pointer px-2 pb-4 ${
              i === 0 ? "border-b-8 border-[#3674B5]" : ""
            }`}
          >
            {tab}
          </p>
        ))}
      </div>

      {/* Filter Section */}
      <div className="w-full bg-white border border-[#8888888c] text-base text-black flex justify-between items-center px-6 py-4 mt-2 rounded-[15px]">
        <div className="flex gap-[10px]">
          <select className="w-[192px] h-[40px] rounded-[15px] text-[14px] border border-[#bbbbbb] outline-none px-4">
            <option>Gradient</option>
          </select>
          <select className="w-[192px] h-[40px] rounded-[15px] text-[14px] border border-[#bbbbbb] outline-none px-4">
            <option>Duty Schedule</option>
          </select>
        </div>
        <button
          onClick={() => setIsAddPopupOpen(true)}
          className="size-[40px] bg-[#3674B5] text-white text-xl rounded-[10px]"
        >
          +
        </button>
      </div>

      {/* Table */}
      <table className="w-full border-spacing-y-2 border-separate text-black mt-2">
        <thead className="bg-[#C0D8F6]">
          <tr>
            <th className="text-base rounded-l-2xl p-2">Services</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Charge
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Final Bill
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Staff Pay
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              S. Referral
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
              P. Referral
            </th>
          </tr>
        </thead>

        <tbody>
          {/* Example Row */}
          <tr
            className="bg-white cursor-pointer hover:bg-[#E8F1FD] transition"
            onClick={() =>
              handleRowClick({
                service: "Home Nursing",
                charge: "₹1000",
                finalBill: "₹950",
                staffPay: "₹700",
                sReferral: "₹100",
                pReferral: "₹50",
              })
            }
          >
            <td className="p-2 text-center">Home Nursing</td>
            <td className="border-l-4 text-center border-[#C0D8F6] p-2">
              ₹1000
            </td>
            <td className="border-l-4 text-center border-[#C0D8F6] p-2">
              ₹950
            </td>
            <td className="border-l-4 text-center border-[#C0D8F6] p-2">
              ₹700
            </td>
            <td className="border-l-4 text-center border-[#C0D8F6] p-2">
              ₹100
            </td>
            <td className="border-l-4 text-center border-[#C0D8F6] p-2">₹50</td>
          </tr>
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between my-4 gap-4">
        <button className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50">
          Previous
        </button>
        <span className="text-black font-semibold text-lg">2 / 3</span>
        <button className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50">
          Next
        </button>
      </div>

      {/* Popups */}
      {isAddPopupOpen && (
        <AddPaymentPopup onClose={() => setIsAddPopupOpen(false)} />
      )}
      {isViewPopupOpen && (
        <ViewPaymentPopup
          payment={selectedPayment}
          onClose={() => setIsViewPopupOpen(false)}
        />
      )}
    </div>
  );
}

export default Page;
