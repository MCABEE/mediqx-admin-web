"use client";
import React from "react";
import { GoArrowUp, GoArrowDown } from "react-icons/go";

const Payments = ({ data }) => {
  if (!data) return null;

  const { total = 0, referralPayments = 0, percentageChange = 0 } = data;

  const isPositive = percentageChange >= 0;

  return (
    <div className="bg-white py-[29px] w-1/2 rounded-2xl">
      {/* Header */}
      <div className="px-[71px] w-full flex justify-between border-b border-[#8888888c]">
        <div className="flex flex-col gap-5 text-[#333333] font-semibold">
          <p className="text-base">Payments</p>
          <p className="text-[32px]">{total}</p>
        </div>

        <div className="flex justify-center items-center flex-col">
          <div
            className={`flex gap-1 ${
              isPositive ? "text-[#09B438]" : "text-[#FE1940]"
            }`}
          >
            {isPositive ? (
              <GoArrowUp className="size-9" />
            ) : (
              <GoArrowDown className="size-9" />
            )}
            <p className="text-2xl pt-2">{Math.abs(percentageChange)}%</p>
          </div>
          <div className="text-[#333333] text-center text-[14px] font-semibold">
            <p>
              Compared <br /> to last period
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-[71px] pt-6 flex gap-[94px] font-semibold">
        <div className="flex flex-col text-[#333333] gap-3.5">
          <p className="text-base">Referral Payments</p>
          <p className="text-[32px]">{referralPayments}</p>
        </div>
      </div>
    </div>
  );
};

export default Payments;
