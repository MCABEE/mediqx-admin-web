"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useNurseStore from "@/app/lib/store/nurseStore";

function RemoveSupervisorPopup({ onClose, staffId, staffName }) {
  const router = useRouter();
  const { deleteStaff, loading } = useNurseStore();
  const [reason, setReason] = useState("Self resignation");

  const handleDelete = async () => {
    const res = await deleteStaff(staffId, reason);

    if (res.success) {
      router.back(); 
    } else {
      console.log("Failed to delete staff");
      console.log(res.error);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#03030347] backdrop-blur-xs flex items-center justify-center z-50">
      <div className="rounded-[15px] w-[762px] h-[446px] shadow-xl bg-white">
        <div className="rounded-t-[15px] h-[100px] relative bg-[#3674B5] ">
          <div
            className="bg-white hover:bg-[#e2e0e0] size-[24px] flex justify-center items-center absolute rounded right-6 top-6 cursor-pointer"
            onClick={onClose}
          >
            <h1 className="rotate-45 text-2xl">+</h1>
          </div>
          <h1 className="text-white text-[20px] font-semibold text-center pt-14">
            {staffName}
          </h1>
        </div>

        <div className="flex flex-col items-center gap-4 mt-[24px] border-b border-[#BBBBBB] pb-[56px]">
          <p className="text-[20px] text-center text-black font-semibold">
            Do you want to remove this employee?
          </p>
          <p className="text-black text-[14px]">
            Please choose a reason from below, then continue
          </p>

          <select
            className="border-[#BBBBBB] w-[350px] px-8 border rounded-2xl p-4 outline-none"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="Self resignation">Self resignation</option>
            <option value="Termination">Termination</option>
            <option value="Contract over">Contract over</option>
          </select>
        </div>

        <div className="flex justify-center items-center">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="mt-[41px] text-white font-semibold text-[16px] w-[192px] h-[40px] bg-[#3674B5] rounded-[15px] cursor-pointer"
          >
            {loading ? "Deleting..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemoveSupervisorPopup;
