"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import usePatientBillsStore from "@/app/lib/store/patientBillingStore";
import { CiSearch } from "react-icons/ci";

export default function PatientBillsByPatientTable() {
  const router = useRouter();

  const { bills, fetchBills, page, totalPages, loading, search, setSearch } =
    usePatientBillsStore();

  useEffect(() => {
    fetchBills(1);
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchBills(1);
  };

  return (
    <div>
      {/* SEARCH */}
      <div className="w-full bg-white border border-[#8888888c] flex items-center px-6 py-4 mt-2 rounded-[15px]">
       <div className="flex items-center gap-2 border border-[#8888888c] w-[260px] h-[40px] rounded-[15px] px-4">
         <CiSearch/>
        <input
          type="search"
          placeholder="Search patient"
          value={search}
          onChange={handleSearch}
          className="   outline-none"
        />
       </div>
      </div>

      {/* TABLE */}
      <table className="w-full border-spacing-y-2 border-separate text-black mt-2">
        <thead className="bg-[#C0D8F6]">
          <tr>
            <th className="text-base rounded-l-2xl p-2">Patient Name</th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Services
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Payment
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] p-2">
              Discount
            </th>
            <th className="text-base border-l-4 border-[#F0F4F9] rounded-r-2xl p-2">
              Net Pay
            </th>
          </tr>
        </thead>

        <tbody>
          {bills.map((item) => (
            <tr
              key={item.patientId}
              onClick={() =>
                router.push(
                  `/controlpanel/billing/patient-bills/patient-bills-details/${item.patientId}`
                )
              }
              className="bg-white hover:bg-[#E8F1FD] transition cursor-pointer"
            >
              <td className="p-2 font-medium text-center">{item.patientName}</td>
              <td className="p-2 border-l-4 text-center border-[#C0D8F6] ">{item.servicesCount}</td>
              <td className="p-2 border-l-4 text-center border-[#C0D8F6] ">{item.payment}</td>
              <td className="p-2 border-l-4 text-center border-[#C0D8F6] ">{item.discount}</td>
              <td className="p-2 border-l-4 text-center border-[#C0D8F6] ">{item.netPay}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1 || loading}
          onClick={() => fetchBills(page - 1)}
          className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages || loading}
          onClick={() => fetchBills(page + 1)}
          className="bg-[#C0D8F6] px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}




